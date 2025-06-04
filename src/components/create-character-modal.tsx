"use client";

import { useState, useEffect } from "react";
import { X, Dice6, RefreshCw, Plus, Minus } from "lucide-react";
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, ABILITY_SCORES, STANDARD_ARRAY } from "@/lib/dnd/core";
import { AbilityScore, generateAbilityScores, StatMethod, calculatePointBuyRemaining, getModifier, calculateHitPoints, getProficiencyBonus } from "@/lib/dnd/core";
import { getBackgroundSkills, generateFantasyName, getEquipmentPackOptions, getClassWeaponSuggestions, getClassArmorSuggestions } from "@/lib/dnd/character";
import { getSpellcastingAbility, getClassSpells, getSpellSlots, calculateSpellSaveDC, calculateSpellAttackBonus } from "@/lib/dnd/spells";
import { getSpellcastingType } from "@/lib/dnd/level-up";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, WEAPONS } from "@/lib/dnd/equipment";
import { canEquipWeapon, BASIC_ACTIONS, getClassActions } from "@/lib/dnd/combat";

interface CreateCharacterModalProps {
  onClose: () => void;
  onCharacterCreated: () => void;
}

export function CreateCharacterModal({ onClose, onCharacterCreated }: CreateCharacterModalProps) {
  const [name, setName] = useState("");
  const [race, setRace] = useState<typeof RACES[number]>(RACES[0]);
  const [characterClass, setCharacterClass] = useState<typeof CLASSES[number]>(CLASSES[0]);
  const [background, setBackground] = useState<typeof BACKGROUNDS[number]>(BACKGROUNDS[0]);
  const [alignment, setAlignment] = useState<typeof ALIGNMENTS[number]>(ALIGNMENTS[4]); // True Neutral
  const [gender, setGender] = useState<string>('');
  const [statMethod, setStatMethod] = useState<StatMethod>('rolling');
  const [abilityScores, setAbilityScores] = useState(generateAbilityScores('rolling'));
  const [loading, setLoading] = useState(false);
  const [generatingName, setGeneratingName] = useState(false);
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<Weapon[]>([]);
  const [selectedEquipmentPack, setSelectedEquipmentPack] = useState<number>(0);

  const handleStatMethodChange = (method: StatMethod) => {
    setStatMethod(method);
    setAbilityScores(generateAbilityScores(method));
  };

  const handleGenerateStats = () => {
    setAbilityScores(generateAbilityScores(statMethod));
  };

  const handleGenerateName = async () => {
    setGeneratingName(true);
    try {
      const generatedName = await generateFantasyName(race, gender || undefined);
      setName(generatedName);
    } catch (error) {
      console.error('Failed to generate name:', error);
    } finally {
      setGeneratingName(false);
    }
  };

  const handlePointBuyChange = (ability: AbilityScore, change: number) => {
    if (statMethod !== 'pointbuy') return;
    
    const newScore = abilityScores[ability] + change;
    if (newScore < 8 || newScore > 15) return;
    
    const newScores = { ...abilityScores, [ability]: newScore };
    const remaining = calculatePointBuyRemaining(newScores);
    
    if (remaining >= 0) {
      setAbilityScores(newScores);
    }
  };

  const handleStandardArrayAssign = (ability: AbilityScore, value: number) => {
    if (statMethod !== 'standard') return;
    
    // Find what ability currently has this value and swap
    const currentAbility = Object.entries(abilityScores).find(([, score]) => score === value)?.[0] as AbilityScore;
    if (currentAbility) {
      setAbilityScores(prev => ({
        ...prev,
        [ability]: value,
        [currentAbility]: prev[ability]
      }));
    }
  };

  const equipmentPacks = getEquipmentPackOptions();
  const backgroundSkills = getBackgroundSkills(background);
  const pointBuyRemaining = statMethod === 'pointbuy' ? calculatePointBuyRemaining(abilityScores) : 0;
  
  // Get class-based suggestions
  const armorSuggestions = getClassArmorSuggestions(characterClass);
  
  // Spellcasting calculations
  const spellcastingAbility = getSpellcastingAbility(characterClass);
  const proficiencyBonus = getProficiencyBonus(1); // Level 1
  const availableSpells = spellcastingAbility ? getClassSpells(characterClass, 1) : [];
  const spellSlots = spellcastingAbility ? getSpellSlots(characterClass, 1) : {};
  const spellSaveDC = spellcastingAbility ? calculateSpellSaveDC(abilityScores[spellcastingAbility as AbilityScore], proficiencyBonus) : undefined;
  const spellAttackBonus = spellcastingAbility ? calculateSpellAttackBonus(abilityScores[spellcastingAbility as AbilityScore], proficiencyBonus) : undefined;
  
  // Actions
  const classActions = getClassActions(characterClass, 1);
  const allActions = [...BASIC_ACTIONS, ...classActions];

  const handleSpellToggle = (spell: Spell) => {
    setSelectedSpells(prev => {
      const isSelected = prev.some(s => s.name === spell.name);
      if (isSelected) {
        return prev.filter(s => s.name !== spell.name);
      } else {
        // Limit spell selection based on class/level
        const maxSpells = characterClass === 'Wizard' ? 6 : 4; // Simplified
        if (prev.length < maxSpells) {
          return [...prev, spell];
        }
        return prev;
      }
    });
  };

  const handleWeaponToggle = (weapon: Weapon) => {
    setSelectedWeapons(prev => {
      const isSelected = prev.some(w => w.name === weapon.name);
      if (isSelected) {
        return prev.filter(w => w.name !== weapon.name);
      } else {
        // Limit to 3 weapons for simplicity
        if (prev.length < 3) {
          return [...prev, weapon];
        }
        return prev;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const maxHitPoints = calculateHitPoints(1, abilityScores.constitution, characterClass);
      const selectedPack = equipmentPacks[selectedEquipmentPack];
      
      // Categorize equipment properly from the start
      const generalInventory: {name: string, quantity: number}[] = [];
      
      // Process selected equipment pack (no weapons/armor, just general items)
      if (selectedPack) {
        selectedPack.items.forEach(packItem => {
          // Add items with their quantities to general inventory as InventoryItem objects
          generalInventory.push({
            name: packItem.name,
            quantity: packItem.quantity
          });
        });
      }
      
      // Add suggested armor to armor inventory (player can customize later)
      const startingArmor = [...armorSuggestions];
      
      // Verify weapons are being sent (temporary log)
      console.log('Creating character with weapons:', selectedWeapons.map(w => w.name));
      
      // Handle spells based on spellcasting type
      const spellcastingTypeValue = spellcastingAbility ? getSpellcastingType(characterClass) : 'none';
      let spellsKnownData = null;
      let spellsPreparedData = null;
      
      if (selectedSpells.length > 0) {
        switch (spellcastingTypeValue) {
          case 'known':
            // Bards, Sorcerers, Warlocks, Rangers, EKs, ATs - always have their spells "prepared"
            spellsKnownData = selectedSpells;
            spellsPreparedData = selectedSpells; // Known spells are always prepared
            break;
          case 'spellbook':
            // Wizards - spells go in spellbook, prepare subset daily
            spellsKnownData = selectedSpells;
            spellsPreparedData = selectedSpells.slice(0, 1 + getModifier(abilityScores.intelligence)); // Can prepare Int mod + level
            break;
          case 'prepared':
            // Clerics, Druids, Paladins - have access to all class spells, prepare subset
            spellsKnownData = null; // They know all class spells
            spellsPreparedData = selectedSpells; // What they chose to prepare initially
            break;
        }
      }
      
      const characterData = {
        name: name.trim(),
        race,
        class: characterClass,
        level: 1,
        alignment,
        background,
        ...abilityScores,
        hitPoints: maxHitPoints,
        maxHitPoints,
        armorClass: 10 + getModifier(abilityScores.dexterity),
        inventory: generalInventory, // Only non-weapon, non-armor items
        skills: backgroundSkills,
        weapons: [], // No weapons equipped initially - player chooses from storage
        inventoryWeapons: selectedWeapons, // Selected weapons go to storage for player to equip
        inventoryArmor: startingArmor, // Starting equipment armor (in armor storage)
        spellsKnown: spellsKnownData,
        spellsPrepared: spellsPreparedData,
        spellSlots,
        spellcastingAbility,
        spellSaveDC,
        spellAttackBonus,
        actions: allActions.filter(action => action.available),
        bonusActions: allActions.filter(action => action.type === 'Bonus Action' && action.available),
        reactions: allActions.filter(action => action.type === 'Reaction' && action.available),
        copperPieces: 0,
        silverPieces: 0,
        goldPieces: background === 'Noble' ? 25 : 15, // Nobles start with more money
      };
      
      const response = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(characterData),
      });

      if (response.ok) {
        onCharacterCreated();
      }
    } catch (error) {
      console.error("Failed to create character:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update weapon selection when character class changes
  useEffect(() => {
    // Pre-populate selected weapons with class suggestions
    const suggestions = getClassWeaponSuggestions(characterClass);
    setSelectedWeapons([...suggestions]);
  }, [characterClass]); // Only depend on characterClass, not weaponSuggestions

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">Create New Character</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Character Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 pr-12 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Enter character name"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateName}
                  disabled={generatingName}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-purple-400 transition-colors disabled:opacity-50"
                  title="Generate fantasy name"
                >
                  <RefreshCw className={`h-4 w-4 ${generatingName ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Gender (for name generation)
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">Not specified</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Race
              </label>
              <select
                value={race}
                onChange={(e) => setRace(e.target.value as typeof RACES[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {RACES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Class
              </label>
              <select
                value={characterClass}
                onChange={(e) => setCharacterClass(e.target.value as typeof CLASSES[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {CLASSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Background
              </label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value as typeof BACKGROUNDS[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {BACKGROUNDS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Alignment
              </label>
              <select
                value={alignment}
                onChange={(e) => setAlignment(e.target.value as typeof ALIGNMENTS[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {ALIGNMENTS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Gender (for name generation)
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">Not specified</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Ability Score Generation Method */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Ability Score Generation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <button
                type="button"
                onClick={() => handleStatMethodChange('rolling')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  statMethod === 'rolling' 
                    ? 'border-purple-500 bg-purple-900/30' 
                    : 'border-slate-600 bg-slate-700'
                }`}
              >
                <div className="text-white font-semibold mb-1">Rolling</div>
                <div className="text-sm text-slate-300">4d6 drop lowest</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleStatMethodChange('standard')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  statMethod === 'standard' 
                    ? 'border-purple-500 bg-purple-900/30' 
                    : 'border-slate-600 bg-slate-700'
                }`}
              >
                <div className="text-white font-semibold mb-1">Standard Array</div>
                <div className="text-sm text-slate-300">15, 14, 13, 12, 10, 8</div>
              </button>
              
              <button
                type="button"
                onClick={() => handleStatMethodChange('pointbuy')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  statMethod === 'pointbuy' 
                    ? 'border-purple-500 bg-purple-900/30' 
                    : 'border-slate-600 bg-slate-700'
                }`}
              >
                <div className="text-white font-semibold mb-1">Point Buy</div>
                <div className="text-sm text-slate-300">27 points to distribute</div>
              </button>
            </div>
          </div>

          {/* Ability Scores */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ability Scores</h3>
              <div className="flex items-center gap-4">
                {statMethod === 'pointbuy' && (
                  <span className="text-slate-300">Points Remaining: <span className="text-white font-bold">{pointBuyRemaining}</span></span>
                )}
                {statMethod === 'rolling' && (
                  <button
                    type="button"
                    onClick={handleGenerateStats}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition-colors"
                  >
                    <Dice6 className="h-4 w-4" />
                    Reroll
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {ABILITY_SCORES.map((ability) => (
                <div key={ability} className="bg-slate-700 rounded-lg p-3">
                  <div className="text-xs text-slate-400 uppercase font-medium mb-2 text-center">
                    {ability}
                  </div>
                  
                  {statMethod === 'standard' ? (
                    <select
                      value={abilityScores[ability]}
                      onChange={(e) => handleStandardArrayAssign(ability, parseInt(e.target.value))}
                      className="w-full bg-slate-600 text-white text-center text-xl font-bold rounded mb-1"
                    >
                      {STANDARD_ARRAY.map(value => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  ) : statMethod === 'pointbuy' ? (
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <button
                        type="button"
                        onClick={() => handlePointBuyChange(ability, -1)}
                        disabled={abilityScores[ability] <= 8}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                      >
                        <Minus className="h-3 w-3 mx-auto" />
                      </button>
                      <div className="text-xl font-bold text-white w-8 text-center">
                        {abilityScores[ability]}
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePointBuyChange(ability, 1)}
                        disabled={abilityScores[ability] >= 15 || pointBuyRemaining <= 0}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                      >
                        <Plus className="h-3 w-3 mx-auto" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-white mb-1 text-center">
                      {abilityScores[ability]}
                    </div>
                  )}
                  
                  <div className="text-sm text-slate-300 text-center">
                    {getModifier(abilityScores[ability]) >= 0 ? '+' : ''}{getModifier(abilityScores[ability])}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Background Skills */}
          {backgroundSkills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Background Skills</h3>
              <div className="flex flex-wrap gap-2">
                {backgroundSkills.map(skill => (
                  <span key={skill} className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Equipment Pack */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Equipment Pack</h3>
            <select
              value={selectedEquipmentPack}
              onChange={(e) => setSelectedEquipmentPack(parseInt(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              {equipmentPacks.map((equipmentPack, index) => (
                <option key={index} value={index}>{equipmentPack.name}</option>
              ))}
            </select>
            
            {/* Show selected pack contents */}
            {equipmentPacks[selectedEquipmentPack] && (
              <div className="mt-3 bg-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-300 mb-2">Pack Contents:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {equipmentPacks[selectedEquipmentPack].items.map((item, index) => (
                    <div key={index} className="text-slate-300 text-sm">• {item.name} x {item.quantity}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Weapon Selection */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Choose Weapons</h3>
            <div className="bg-slate-700 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-slate-400 text-sm mb-4">
                Weapons are suggested based on your class. Customize freely - want a club instead of an axe? Go for it! (up to 3 total)
              </p>
              
              {/* Proficient Weapons First */}
              <div className="mb-4">
                <h4 className="text-green-400 text-sm font-medium mb-2 flex items-center gap-2">
                  ✓ Proficient Weapons
                  <span className="text-xs bg-green-900/30 px-2 py-0.5 rounded">+Prof Bonus</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {WEAPONS.filter(weapon => canEquipWeapon(weapon, characterClass)).map((weapon) => (
                    <label key={weapon.name} className="flex items-center gap-3 p-2 rounded hover:bg-slate-600 cursor-pointer border-l-2 border-green-500">
                      <input
                        type="checkbox"
                        checked={selectedWeapons.some(w => w.name === weapon.name)}
                        onChange={() => handleWeaponToggle(weapon)}
                        disabled={!selectedWeapons.some(w => w.name === weapon.name) && selectedWeapons.length >= 3}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{weapon.name}</div>
                        <div className="text-slate-400 text-xs">
                          {weapon.damage} {weapon.damageType} • {weapon.type} {weapon.category}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Non-Proficient Weapons */}
              <div>
                <h4 className="text-yellow-400 text-sm font-medium mb-2 flex items-center gap-2">
                  ⚠️ Non-Proficient Weapons
                  <span className="text-xs bg-yellow-900/30 px-2 py-0.5 rounded">No Prof Bonus</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {WEAPONS.filter(weapon => !canEquipWeapon(weapon, characterClass)).map((weapon) => (
                    <label key={weapon.name} className="flex items-center gap-3 p-2 rounded hover:bg-slate-600 cursor-pointer border-l-2 border-yellow-500 opacity-75">
                      <input
                        type="checkbox"
                        checked={selectedWeapons.some(w => w.name === weapon.name)}
                        onChange={() => handleWeaponToggle(weapon)}
                        disabled={!selectedWeapons.some(w => w.name === weapon.name) && selectedWeapons.length >= 3}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{weapon.name}</div>
                        <div className="text-slate-400 text-xs">
                          {weapon.damage} {weapon.damageType} • {weapon.type} {weapon.category}
                        </div>
                        <div className="text-yellow-300 text-xs">Won&apos;t add proficiency bonus to attacks</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Spell Selection for Spellcasters */}
          {spellcastingAbility && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Choose Spells
                <span className="text-slate-400 text-sm font-normal ml-2">
                  (Spellcasting Ability: {spellcastingAbility.charAt(0).toUpperCase() + spellcastingAbility.slice(1)})
                </span>
              </h3>
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="text-slate-300 text-sm">
                    <strong>Spell Save DC:</strong> {spellSaveDC}
                  </div>
                  <div className="text-slate-300 text-sm">
                    <strong>Spell Attack Bonus:</strong> +{spellAttackBonus}
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-4">
                  Select starting spells (max {characterClass === 'Wizard' ? 6 : 4})
                </p>
                
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {availableSpells.map((spell) => (
                    <label key={spell.name} className="flex items-start gap-3 p-3 rounded hover:bg-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSpells.some(s => s.name === spell.name)}
                        onChange={() => handleSpellToggle(spell)}
                        disabled={!selectedSpells.some(s => s.name === spell.name) && 
                                 selectedSpells.length >= (characterClass === 'Wizard' ? 6 : 4)}
                        className="mt-1 rounded text-purple-600 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{spell.name}</span>
                          <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                            {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                          </span>
                        </div>
                        <div className="text-slate-400 text-xs mt-1">
                          {spell.school} • {spell.castingTime} • {spell.range}
                        </div>
                        <div className="text-slate-300 text-xs mt-1">{spell.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim() || (statMethod === 'pointbuy' && pointBuyRemaining !== 0)}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              {loading && <RefreshCw className="h-4 w-4 animate-spin" />}
              Create Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 