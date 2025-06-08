"use client";

import { useState, useEffect } from "react";
import { X, Dice6, RefreshCw, Plus, Minus } from "lucide-react";
import { RACES, CLASSES, BACKGROUNDS, ALIGNMENTS, ABILITY_SCORES } from "@/lib/dnd/core";
import { AbilityScore } from "@/lib/dnd/core";
import { generateFantasyName } from "@/lib/dnd/character";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, WEAPONS } from "@/lib/dnd/equipment";
import { 
  characterCreationService, 
  type StatMethod, 
  type CharacterCreationData 
} from "@/services/character/creation";


interface CreateCharacterModalProps {
  onClose: () => void;
  onCharacterCreated: () => void;
}

export function CreateCharacterModal({ onClose, onCharacterCreated }: CreateCharacterModalProps) {
  // Basic character info
  const [name, setName] = useState("");
  const [race, setRace] = useState<typeof RACES[number]>(RACES[0]);
  const [characterClass, setCharacterClass] = useState<typeof CLASSES[number]>(CLASSES[0]);
  const [subclass, setSubclass] = useState<string>("");
  const [background, setBackground] = useState<typeof BACKGROUNDS[number]>(BACKGROUNDS[0]);
  const [alignment, setAlignment] = useState<typeof ALIGNMENTS[number]>(ALIGNMENTS[4]); // True Neutral
  const [gender, setGender] = useState<string>('');
  
  // Ability scores
  const [statMethod, setStatMethod] = useState<StatMethod>('rolling-assign');
  const [abilityScores, setAbilityScores] = useState({} as Record<AbilityScore, number>);
  const [randomScoreArray, setRandomScoreArray] = useState<number[]>([]);
  
  // Equipment and spells
  const [selectedSpells, setSelectedSpells] = useState<Spell[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<{weapon: Weapon, quantity: number}[]>([]);
  const [selectedEquipmentPack, setSelectedEquipmentPack] = useState<number>(0);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [generatingName, setGeneratingName] = useState(false);

  // Get creation options from service
  const creationOptions = characterCreationService.getCreationOptions(characterClass);
  const { subclasses, needsSubclassAtCreation, spellcasting } = creationOptions;

  // Initialize ability scores on mount
  useEffect(() => {
    const { scores, randomArray } = characterCreationService.generateAbilityScores(statMethod);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
  }, []);

  // Update weapon suggestions when class changes
  useEffect(() => {
    setSelectedWeapons(
      creationOptions.weaponSuggestions.map(weapon => ({ weapon, quantity: 1 }))
    );
    
    // Reset subclass when class changes
    setSubclass("");
  }, [characterClass]);

  const handleStatMethodChange = (method: StatMethod) => {
    setStatMethod(method);
    const { scores, randomArray } = characterCreationService.generateAbilityScores(method);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
  };

  const handleGenerateStats = () => {
    const { scores, randomArray } = characterCreationService.generateAbilityScores(statMethod);
    setAbilityScores(scores);
    if (randomArray) {
      setRandomScoreArray(randomArray);
    }
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
    
    const newScores = characterCreationService.applyPointBuyChange(abilityScores, ability, change);
    if (newScores) {
      setAbilityScores(newScores);
    }
  };

  const handleDragStart = (e: React.DragEvent, fromAbility: AbilityScore) => {
    e.dataTransfer.setData('text/plain', fromAbility);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toAbility: AbilityScore) => {
    e.preventDefault();
    const fromAbility = e.dataTransfer.getData('text/plain') as AbilityScore;
    
    if (fromAbility && fromAbility !== toAbility) {
      const newScores = characterCreationService.swapAbilityScores(abilityScores, fromAbility, toAbility);
      setAbilityScores(newScores);
    }
  };

  const handleSpellToggle = (spell: Spell) => {
    setSelectedSpells(prev => {
      const isSelected = prev.some(s => s.name === spell.name);
      if (isSelected) {
        return prev.filter(s => s.name !== spell.name);
      } else {
        const { maxSpells } = characterCreationService.validateSpellSelection(characterClass, prev);
        if (prev.length < maxSpells) {
          return [...prev, spell];
        }
        return prev;
      }
    });
  };

  const handleWeaponQuantityChange = (weapon: Weapon, quantity: number) => {
    setSelectedWeapons(prev => {
      const existingIndex = prev.findIndex(w => w.weapon.name === weapon.name);
      if (quantity === 0) {
        return prev.filter(w => w.weapon.name !== weapon.name);
      } else if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { weapon, quantity };
        return updated;
      } else {
        return [...prev, { weapon, quantity }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Validate required subclass selection
    if (needsSubclassAtCreation && !subclass) {
      alert(`Please select a ${characterClass} subclass.`);
      return;
    }

    setLoading(true);
    try {
      const creationData: CharacterCreationData = {
        name,
        race,
        class: characterClass,
        subclass: subclass || undefined,
        background,
        alignment,
        gender,
        statMethod,
        abilityScores,
        randomScoreArray,
        selectedEquipmentPack,
        selectedWeapons,
        selectedSpells
      };

      const characterData = characterCreationService.createCharacter(creationData);
      
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

  // Calculate derived values
  const pointBuyValidation = characterCreationService.validatePointBuy(abilityScores);
  const spellcastingStats = characterCreationService.calculateSpellcastingStats(characterClass, abilityScores);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
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

            {needsSubclassAtCreation && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Subclass *
                </label>
                <select
                  value={subclass}
                  onChange={(e) => setSubclass(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  required={needsSubclassAtCreation}
                >
                  <option value="">Choose subclass...</option>
                  {subclasses.map((sub) => (
                    <option key={sub.name} value={sub.name}>{sub.name}</option>
                  ))}
                </select>
                {subclass && (
                  <p className="text-xs text-slate-400 mt-1">
                    {subclasses.find(s => s.name === subclass)?.description}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Background
              </label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value as typeof BACKGROUNDS[number])}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {BACKGROUNDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

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
          </div>

          {/* Ability Scores */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ability Scores</h3>
              <div className="flex items-center gap-2">
                <select
                  value={statMethod}
                  onChange={(e) => handleStatMethodChange(e.target.value as StatMethod)}
                  className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white text-sm focus:border-purple-500 focus:outline-none"
                >
                  <option value="rolling-assign">Roll & Assign</option>
                  <option value="standard">Standard Array</option>
                  <option value="pointbuy">Point Buy</option>
                </select>
                <button
                  type="button"
                  onClick={handleGenerateStats}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                >
                  <Dice6 className="h-4 w-4" />
                  {statMethod === 'rolling-assign' ? 'Reroll' : 'Regenerate'}
                </button>
              </div>
            </div>

            {statMethod === 'rolling-assign' && randomScoreArray.length > 0 && (
              <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-300 mb-2">Rolled scores (drag to assign):</p>
                <div className="flex gap-2">
                  {randomScoreArray.map((score, index) => (
                    <div key={index} className="bg-slate-600 px-2 py-1 rounded text-center text-white font-mono">
                      {score}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {statMethod === 'pointbuy' && (
              <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-300">
                  Points remaining: <span className={`font-bold ${pointBuyValidation.remaining === 0 ? 'text-green-400' : pointBuyValidation.remaining < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {pointBuyValidation.remaining}
                  </span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              {ABILITY_SCORES.map((ability) => (
                <div
                  key={ability}
                  className="bg-slate-700 rounded-lg p-3"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, ability)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">{ability}</span>
                    <span className="text-lg font-bold text-white">{abilityScores[ability] || 10}</span>
                  </div>
                  
                  {statMethod === 'pointbuy' && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePointBuyChange(ability, -1)}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white text-sm"
                        disabled={(abilityScores[ability] || 10) <= 8}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePointBuyChange(ability, 1)}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white text-sm"
                        disabled={(abilityScores[ability] || 10) >= 15}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  )}

                  {(statMethod === 'rolling-assign' || statMethod === 'standard') && (
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, ability)}
                      className="w-full text-center py-1 text-xs text-slate-400 cursor-move"
                    >
                      Drag to swap
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spellcasting */}
          {spellcasting.canCastAtLevel1 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Spellcasting</h3>
              <div className="mb-4 p-3 bg-slate-700 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div>Spellcasting Ability: <span className="text-white">{spellcasting.ability}</span></div>
                  <div>Spell Save DC: <span className="text-white">{spellcastingStats?.spellSaveDC || '--'}</span></div>
                  <div>Spell Attack Bonus: <span className="text-white">+{spellcastingStats?.spellAttackBonus || '--'}</span></div>
                  <div>Selected Spells: <span className="text-white">{selectedSpells.length}</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {spellcasting.availableSpells.map((spell) => (
                  <label
                    key={spell.name}
                    className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                      selectedSpells.some(s => s.name === spell.name)
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSpells.some(s => s.name === spell.name)}
                      onChange={() => handleSpellToggle(spell)}
                      className="sr-only"
                    />
                    <div>
                      <div className="font-medium text-sm">{spell.name}</div>
                      <div className="text-xs opacity-75">{spell.school} {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Equipment */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Starting Equipment</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Equipment Pack
              </label>
              <select
                value={selectedEquipmentPack}
                onChange={(e) => setSelectedEquipmentPack(Number(e.target.value))}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {creationOptions.equipmentPacks.map((pack, index) => (
                  <option key={index} value={index}>{pack.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Starting Weapons
              </label>
              
              {/* Add Weapon Selector */}
              <div className="mb-3 p-3 bg-slate-700 rounded-lg">
                <div className="flex gap-2">
                  <select
                    value=""
                    onChange={(e) => {
                      const weapon = WEAPONS.find(w => w.name === e.target.value);
                      if (weapon) {
                        handleWeaponQuantityChange(weapon, 1);
                        e.target.value = ""; // Reset selection
                      }
                    }}
                    className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Add weapon...</option>
                    {WEAPONS.map(weapon => (
                      <option key={weapon.name} value={weapon.name}>
                        {weapon.name} ({weapon.damage} {weapon.damageType})
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Choose your starting weapons. Pre-selected weapons are suggestions for your class.
                </p>
              </div>

              {/* Selected Weapons */}
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedWeapons.map(({ weapon, quantity }) => (
                  <div key={weapon.name} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                    <span className="text-white text-sm">{weapon.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleWeaponQuantityChange(weapon, Math.max(0, quantity - 1))}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-white font-mono w-6 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleWeaponQuantityChange(weapon, quantity + 1)}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center text-white"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim() || (needsSubclassAtCreation && !subclass) || (statMethod === 'pointbuy' && !pointBuyValidation.isValid)}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
            >
              {loading ? 'Creating...' : 'Create Character'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 