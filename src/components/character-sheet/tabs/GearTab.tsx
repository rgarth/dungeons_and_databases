"use client";

import { useState } from "react";
import { Package, Shield, Wand2, Plus, X, Trash2, Sparkles, Scroll } from "lucide-react";
import { createCharacterEquipment } from "@/services/character/equipment";
import { createMagicalItemService, type DiceRoll } from "@/services/character/magical-items";
// Note: Using database data instead of hardcoded arrays


import { spellsData } from '../../../../prisma/data/spells-data';
import { magicalItemsData } from '../../../../prisma/data/magical-items-data';
import type { Weapon, MagicalWeapon, Armor } from "@/lib/dnd/equipment";
import type { Spell } from "@/lib/dnd/spells";
import { MagicalItem, EquippedMagicalItem, MagicalItemType, MagicalItemRarity, canAttuneMagicalItem, canEquipInSlot } from "@/lib/dnd/magical-items";
import { ArmorSelector } from "../../shared/ArmorSelector";
import { WeaponSelector } from "../../shared/WeaponSelector";

interface GearTabProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    dexterity: number;
    constitution: number;
    strength: number;
    spellsKnown?: Spell[];
    spellsPrepared?: Spell[];
    spellSlots?: Record<number, number>;
    spellcastingAbility?: string;
  };
  equippedWeapons: (Weapon | MagicalWeapon)[];
  inventoryWeapons: (Weapon | MagicalWeapon)[];
  equippedArmor: Armor[];
  inventoryArmor: Armor[];
  equippedMagicalItems: EquippedMagicalItem[];
  inventoryMagicalItems: MagicalItem[];
  attunedItems: string[];
  onEquipWeapon: (weapon: Weapon | MagicalWeapon, fromInventoryIndex: number) => void;
  onUnequipWeapon: (weaponIndex: number) => void;
  onRemoveWeapon: (index: number, isEquipped?: boolean) => void;
  onEquipArmor: (armor: Armor, fromInventoryIndex: number) => void;
  onUnequipArmor: (armorIndex: number) => void;
  onRemoveArmor: (index: number, isEquipped?: boolean) => void;
  onEquipMagicalItem: (item: MagicalItem, fromInventoryIndex: number) => void;
  onUnequipMagicalItem: (itemIndex: number) => void;
  onRemoveMagicalItem: (index: number, isEquipped?: boolean) => void;
  onToggleAttunement: (itemName: string) => void;
  onAddWeapon: (weapon: Weapon | MagicalWeapon) => void;
  onAddWeapons?: (weapons: (Weapon | MagicalWeapon)[]) => void;
  onAddArmor: (armor: Armor) => void;
  onAddMagicalItem: (item: MagicalItem) => void;
  onOpenSpellPreparation: () => void;
  weaponLimits: { maxEquipped: number; maxInventory: number };
}

export function GearTab({
  character,
  equippedWeapons,
  inventoryWeapons,
  equippedArmor,
  inventoryArmor,
  equippedMagicalItems,
  inventoryMagicalItems,
  attunedItems,
  onEquipWeapon,
  onUnequipWeapon,
  onRemoveWeapon,
  onEquipArmor,
  onUnequipArmor,
  onRemoveArmor,
  onEquipMagicalItem,
  onUnequipMagicalItem,
  onRemoveMagicalItem,
  onToggleAttunement,
  onAddWeapon,
  onAddWeapons,
  onAddArmor,
  onAddMagicalItem,
  onOpenSpellPreparation,
  weaponLimits
}: GearTabProps) {
  // Create service instances for clean calculations
  const characterData = {
    ...character,
    armorClass: 10, // Will be calculated by equipment service
    proficiencyBonus: Math.floor((character.level - 1) / 4) + 2,
    hitPoints: 1,
    maxHitPoints: 1,
    speed: 30,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  };
  
  // Service instances for equipment calculations
  const equipment = createCharacterEquipment(characterData);
  const magicalItems = createMagicalItemService();

  const [activeSection, setActiveSection] = useState<"equipped" | "inventory">("equipped");
  const [showWeaponSelector, setShowWeaponSelector] = useState(false);
  const [showArmorSelector, setShowArmorSelector] = useState(false);
  const [showMagicalItemSelector, setShowMagicalItemSelector] = useState(false);


  const [selectedMagicalItem, setSelectedMagicalItem] = useState("");

  // Filter states for magical items
  const [magicalItemSearch, setMagicalItemSearch] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Spell scroll creator states
  const [showSpellScrollCreator, setShowSpellScrollCreator] = useState(false);
  const [selectedSpellLevel, setSelectedSpellLevel] = useState(0);
  const [selectedSpell, setSelectedSpell] = useState("");

  // Potion usage states
  const [showPotionUsage, setShowPotionUsage] = useState(false);
  const [selectedPotion, setSelectedPotion] = useState<MagicalItem | null>(null);
  const [potionRolls, setPotionRolls] = useState<DiceRoll | null>(null);

  const currentArmorClass = equipment.calculateArmorClass(equippedArmor);


  const handleAddMagicalItem = () => {
    const itemData = magicalItemsData.find(i => i.name === selectedMagicalItem);
    if (itemData) {
      const item = {
        ...itemData,
        type: itemData.type as MagicalItemType,
        rarity: itemData.rarity as MagicalItemRarity,
        effects: itemData.effects ? JSON.parse(itemData.effects) : []
      } as MagicalItem;
      onAddMagicalItem(item);
      setSelectedMagicalItem("");
      setShowMagicalItemSelector(false);
      // Reset filters when closing
      setMagicalItemSearch("");
      setSelectedRarity("");
      setSelectedType("");
    }
  };

  const handleCreateSpellScroll = () => {
    const spellData = spellsData.find(s => s.name === selectedSpell);
    const spell = spellData ? {
      ...spellData,
      classes: spellData.classes ? JSON.parse(spellData.classes) : []
    } as Spell : null;
    if (spell) {
      const scrollLevel = spell.level === 0 ? "Cantrip" : `${spell.level}${magicalItems.getOrdinalSuffix(spell.level)} Level`;
      const rarity: "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" = 
        spell.level === 0 ? "Common" : 
        spell.level <= 1 ? "Common" :
        spell.level <= 3 ? "Uncommon" :
        spell.level <= 5 ? "Rare" :
        spell.level <= 8 ? "Very Rare" : "Legendary";
      
      const customScroll: MagicalItem = {
        id: `spell-scroll-${spell.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: `Spell Scroll (${spell.name})`,
        type: 'Scroll',
        rarity: rarity,
        requiresAttunement: false,
        description: `A spell scroll containing ${spell.name}. ${spell.description}`,
        weight: 0,
        cost: spell.level === 0 ? '25 gp' : `${50 * spell.level} gp`,
        effects: [
          { type: 'spell_effect', target: spell.name.toLowerCase().replace(/\s+/g, '_'), description: `Contains ${spell.name} (${scrollLevel}, can be cast once)` }
        ],
        stackable: true,
        consumable: true
      };
      
      onAddMagicalItem(customScroll);
      setSelectedSpell("");
      setSelectedSpellLevel(0);
      setShowSpellScrollCreator(false);
    }
  };

  // Filter spells by level for spell scroll creator
  const spellsForLevel = selectedSpellLevel >= 0 
    ? spellsData.filter(spell => spell.level === selectedSpellLevel)
    : spellsData;

  // Filter magical items based on search and filters
  const filteredMagicalItems = magicalItemsData.filter(item => {
    const matchesSearch = !magicalItemSearch || 
      item.name.toLowerCase().includes(magicalItemSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(magicalItemSearch.toLowerCase());
    
    const matchesRarity = !selectedRarity || item.rarity === selectedRarity;
    const matchesType = !selectedType || item.type === selectedType;
    
    return matchesSearch && matchesRarity && matchesType;
  });

  // Get unique rarities and types for filter options
  const availableRarities = [...new Set(magicalItemsData.map(item => item.rarity))];
  const availableTypes = [...new Set(magicalItemsData.map(item => item.type))];

  // Helper to check if item is consumable using service

  // Helper to handle using/consuming items
  const handleUseItem = (item: MagicalItem, index: number) => {
    if (item.type === 'Potion') {
      // Show potion usage modal with dice rolls
      setSelectedPotion(item);
      setShowPotionUsage(true);
    } else if (item.type === 'Scroll') {
      // For spell scrolls, show a message that they should be used from Actions tab
      alert('Spell scrolls should be cast from the Actions tab where you can see spell details and requirements!');
    } else {
      // For other consumables, just remove
      onRemoveMagicalItem(index, false);
    }
  };

  // Handle rolling for potion using service
  const handleRollPotion = () => {
    if (!selectedPotion) return;
    
    const rollResult = magicalItems.rollPotionEffects(selectedPotion);
    if (rollResult) {
      setPotionRolls(rollResult);
    }
  };

  // Handle consuming the potion
  const handleConsumePotion = () => {
    if (!selectedPotion) return;
    
    // Find the item in inventory and remove it
    const potionIndex = inventoryMagicalItems.findIndex(item => 
      item.id === selectedPotion.id && item.name === selectedPotion.name
    );
    
    if (potionIndex !== -1) {
      onRemoveMagicalItem(potionIndex, false);
    }
    
    // Reset modal state
    setShowPotionUsage(false);
    setSelectedPotion(null);
    setPotionRolls(null);
  };



  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Gear & Spells</h2>
        <p className="text-slate-400">Manage your equipment, magical items, and spells</p>
      </div>

      {/* Section Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveSection("equipped")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSection === "equipped"
              ? "bg-purple-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <Shield className="h-4 w-4 inline mr-2" />
          Equipped Gear
        </button>
        <button
          onClick={() => setActiveSection("inventory")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSection === "inventory"
              ? "bg-purple-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          <Package className="h-4 w-4 inline mr-2" />
          Gear Inventory
        </button>
      </div>

      {activeSection === "equipped" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Combat Gear */}
          <div className="space-y-6">
            {/* Weapons */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-yellow-400" />
                Equipped Weapons ({equippedWeapons.length}/{weaponLimits.maxEquipped})
              </h3>
              {equippedWeapons.length === 0 ? (
                <p className="text-slate-400 text-sm">No weapons equipped</p>
              ) : (
                <div className="space-y-2">
                  {equippedWeapons.map((weapon, index) => (
                    <div key={index} className="bg-slate-600 rounded p-3 flex justify-between items-center">
                      <div>
                        <span className="text-white font-medium">
                          {weapon.name}
                          {weapon.stackable && weapon.quantity && weapon.quantity > 1 && (
                            <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                              {weapon.quantity}
                            </span>
                          )}
                        </span>
                        {'rarity' in weapon && (
                          <span className={`ml-2 text-xs ${magicalItems.getRarityColor(weapon.rarity)}`}>
                            {weapon.rarity}
                          </span>
                        )}
                        <div className="text-sm text-slate-300">
                          {weapon.damage} {weapon.damageType} • {weapon.type}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!weapon.stackable && (
                          <button
                            onClick={() => onUnequipWeapon(index)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-500 rounded"
                            title={`Unequip ${weapon.name}`}
                          >
                            <Package className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onRemoveWeapon(index, true)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                          title={weapon.stackable ? `Use/Remove ${weapon.name}` : `Remove ${weapon.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Armor */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Equipped Armor (AC: {currentArmorClass})
              </h3>
              {equippedArmor.length === 0 ? (
                <p className="text-slate-400 text-sm">No armor equipped</p>
              ) : (
                <div className="space-y-2">
                  {equippedArmor.map((armor, index) => (
                    <div key={index} className="bg-slate-600 rounded p-3 flex justify-between items-center">
                      <div>
                        <span className="text-white font-medium">{armor.name}</span>
                        <div className="text-sm text-slate-300">
                          AC {armor.baseAC} • {armor.type}
                          {armor.maxDexBonus !== null && ` • Max Dex +${armor.maxDexBonus}`}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onUnequipArmor(index)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-500 rounded"
                        >
                          <Package className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveArmor(index, true)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Magical Items */}
          <div className="space-y-6">
            {/* Magical Items */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Magical Items ({attunedItems.length}/3 attuned)
              </h3>
              {equippedMagicalItems.length === 0 ? (
                <p className="text-slate-400 text-sm">No magical items equipped</p>
              ) : (
                <div className="space-y-2">
                  {equippedMagicalItems.map((item, index) => (
                    <div key={index} className="bg-slate-600 rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{item.name}</span>
                            <span className={`text-xs ${magicalItems.getRarityColor(item.rarity)}`}>
                              {item.rarity}
                            </span>
                            {item.requiresAttunement && (
                              <button
                                onClick={() => onToggleAttunement(item.name)}
                                className={`text-xs px-2 py-1 rounded ${
                                  item.isAttuned
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-slate-500 text-slate-300 hover:bg-slate-400'
                                }`}
                              >
                                {item.isAttuned ? 'Attuned' : 'Attune'}
                              </button>
                            )}
                          </div>
                          <div className="text-sm text-slate-300 mt-1">
                            {item.type} • {item.slot || 'No slot restriction'}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => onUnequipMagicalItem(index)}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-500 rounded"
                          >
                            <Package className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onRemoveMagicalItem(index, true)}
                            className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        {item.effects.map((effect, effectIndex) => (
                          <div key={effectIndex}>• {effect.description}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Spell Management */}
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-indigo-400" />
                  Spells
                </h3>
                <button
                  onClick={onOpenSpellPreparation}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Manage Spells
                </button>
              </div>
              
              {/* Paladin Spellcasting Setup Notice */}
              {character.class === 'Paladin' && character.level >= 2 && !character.spellcastingAbility && (
                <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-300 font-medium">Spellcasting Available!</span>
                  </div>
                  <p className="text-yellow-200 text-sm mb-3">
                    Your paladin has reached level 2 and can now cast spells! You need to set up your spellcasting ability and prepare your first spells.
                  </p>
                  <button
                    onClick={onOpenSpellPreparation}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded font-medium transition-colors"
                  >
                    Set Up Spellcasting
                  </button>
                </div>
              )}
              
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Prepared Spells: </span>
                  <span className="text-white">{character.spellsPrepared?.length || 0}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Known Spells: </span>
                  <span className="text-white">{character.spellsKnown?.length || 0}</span>
                </div>
                {character.spellSlots && Object.keys(character.spellSlots).filter(k => k && k !== 'undefined').length > 0 && (
                  <div>
                    <span className="text-slate-400 text-sm">Spell Slots: </span>
                    <div className="flex gap-2 mt-1">
                      {Object.entries(character.spellSlots)
                        .filter(([level, slots]) => level && level !== 'undefined' && slots > 0)
                        .map(([level, slots]) => (
                        <span key={level} className="bg-slate-600 px-2 py-1 rounded text-xs text-white">
                          L{level}: {slots}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "inventory" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weapons Inventory */}
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Weapons</h3>
              <button
                onClick={() => setShowWeaponSelector(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {inventoryWeapons.length === 0 ? (
              <div className="text-slate-400 text-sm">
                <p>No weapons in inventory</p>
                {equippedWeapons.length > 0 && (
                  <p className="text-xs mt-1 text-slate-500">
                    💡 Equipped weapons ({equippedWeapons.length}) are shown in &quot;Equipped Gear&quot; tab
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {inventoryWeapons.map((weapon, index) => (
                  <div key={index} className="bg-slate-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-white font-medium">
                          {weapon.name}
                          {weapon.stackable && weapon.quantity && weapon.quantity > 1 && (
                            <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                              {weapon.quantity}
                            </span>
                          )}
                        </span>
                        {'rarity' in weapon && (
                          <span className={`ml-2 text-xs ${magicalItems.getRarityColor(weapon.rarity)}`}>
                            {weapon.rarity}
                          </span>
                        )}
                        <div className="text-sm text-slate-300">
                          {weapon.damage} {weapon.damageType}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onEquipWeapon(weapon, index)}
                          className="p-1 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveWeapon(index, false)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Armor Inventory */}
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Armor</h3>
              <button
                onClick={() => setShowArmorSelector(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {inventoryArmor.length === 0 ? (
              <div className="text-slate-400 text-sm">
                <p>No armor in inventory</p>
                {equippedArmor.length > 0 && (
                  <p className="text-xs mt-1 text-slate-500">
                    💡 Equipped armor ({equippedArmor.length}) is shown in &quot;Equipped Gear&quot; tab
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {inventoryArmor.map((armor, index) => (
                  <div key={index} className="bg-slate-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-white font-medium">{armor.name}</span>
                        <div className="text-sm text-slate-300">
                          AC {armor.baseAC} • {armor.type}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onEquipArmor(armor, index)}
                          className="p-1 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveArmor(index, false)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Magical Items Inventory */}
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Magical Items</h3>
              <div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowMagicalItemSelector(true)}
                    disabled={inventoryMagicalItems.length >= 50}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded"
                  >
                    <Plus className="h-4 w-4" />
                    Add Magical Item
                  </button>
                </div>
              </div>
            </div>
            {inventoryMagicalItems.length === 0 ? (
              <div className="text-slate-400 text-sm">
                <p>No magical items in inventory</p>
                {equippedMagicalItems.length > 0 && (
                  <p className="text-xs mt-1 text-slate-500">
                    💡 Equipped magical items ({equippedMagicalItems.length}) are shown in &quot;Equipped Gear&quot; tab
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {inventoryMagicalItems.map((item, index) => (
                  <div key={index} className="bg-slate-600 rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{item.name}</span>
                          <span className={`text-xs ${magicalItems.getRarityColor(item.rarity)}`}>
                            {item.rarity}
                          </span>
                        </div>
                        <div className="text-sm text-slate-300">
                          {item.type}
                          {item.requiresAttunement && (
                            <span className="ml-2 text-xs bg-orange-600 text-white px-1 rounded">
                              Requires Attunement
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {magicalItems.isConsumable(item) ? (
                          <button
                            onClick={() => handleUseItem(item, index)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded font-medium transition-colors"
                            title={`Use ${item.name}`}
                          >
                            {item.type === 'Potion' ? 'Drink' : 'Use'}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const canEquip = !item.slot || canEquipInSlot(item, equippedMagicalItems);
                              const canAttune = !item.requiresAttunement || canAttuneMagicalItem(attunedItems, item.name);
                              const isAttuned = attunedItems.includes(item.name);
                              
                              if (canEquip && (canAttune || isAttuned)) {
                                onEquipMagicalItem(item, index);
                              }
                            }}
                            disabled={
                              (item.slot && !canEquipInSlot(item, equippedMagicalItems)) ||
                              (item.requiresAttunement && !canAttuneMagicalItem(attunedItems, item.name) && !attunedItems.includes(item.name))
                            }
                            className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                              (item.slot && !canEquipInSlot(item, equippedMagicalItems)) ||
                              (item.requiresAttunement && !canAttuneMagicalItem(attunedItems, item.name) && !attunedItems.includes(item.name))
                                ? 'bg-slate-500 text-slate-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                            title={
                              item.slot && !canEquipInSlot(item, equippedMagicalItems)
                                ? 'Slot already occupied'
                                : item.requiresAttunement && !canAttuneMagicalItem(attunedItems, item.name) && !attunedItems.includes(item.name)
                                ? 'Attunement limit reached'
                                : `Equip ${item.name}`
                            }
                          >
                            {(item.slot && !canEquipInSlot(item, equippedMagicalItems)) ||
                             (item.requiresAttunement && !canAttuneMagicalItem(attunedItems, item.name) && !attunedItems.includes(item.name))
                              ? "Can't Equip"
                              : 'Equip'}
                          </button>
                        )}
                        <button
                          onClick={() => onRemoveMagicalItem(index, false)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded font-medium transition-colors"
                          title={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-slate-600 rounded p-3 flex gap-2">
              <button
                onClick={() => setShowMagicalItemSelector(true)}
                disabled={inventoryMagicalItems.length >= 50}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Browse Items
              </button>
              <button
                onClick={() => setShowSpellScrollCreator(true)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
              >
                <Scroll className="h-4 w-4" />
                Create Scroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item Selector Modals */}
      {showWeaponSelector && (
        <WeaponSelector
          title="Add Weapons to Inventory"
          maxWeapons={50}
          selectedWeapons={[]}
          onConfirm={(weapons) => {
            // Build complete list of weapons to add - root cause solution
            const weaponsToAdd: (Weapon | MagicalWeapon)[] = [];
            weapons.forEach(({ weapon, quantity }) => {
              for (let i = 0; i < quantity; i++) {
                weaponsToAdd.push(weapon);
              }
            });
            
            // Use new multi-weapon interface if available, fallback to single
            if (onAddWeapons && weaponsToAdd.length > 0) {
              onAddWeapons(weaponsToAdd);
            } else {
              // Fallback for backward compatibility
              weaponsToAdd.forEach(weapon => onAddWeapon(weapon));
            }
            
            setShowWeaponSelector(false);
          }}
          onCancel={() => setShowWeaponSelector(false)}
          characterClass={character.class}
          showSuggestions={false}
          multiSelect={true}
        />
      )}

      {showArmorSelector && (
        <ArmorSelector
          selectedArmor={[]}
          onArmorSelectionChange={(armor) => {
            // Add selected armor to inventory (the handler will handle multiple selections)
            armor.forEach(item => onAddArmor(item));
            setShowArmorSelector(false);
          }}
          onClose={() => setShowArmorSelector(false)}
          isOpen={showArmorSelector}
          characterClass={character.class}
          showProficiencies={true}
        />
      )}

      {showMagicalItemSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-4xl p-6 max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Add Magical Item ({filteredMagicalItems.length} items)</h3>
              <button
                onClick={() => {
                  setShowMagicalItemSelector(false);
                  setMagicalItemSearch("");
                  setSelectedRarity("");
                  setSelectedType("");
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={magicalItemSearch}
                  onChange={(e) => setMagicalItemSearch(e.target.value)}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Rarity</label>
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                >
                  <option value="">All Rarities</option>
                  {availableRarities.map(rarity => (
                    <option key={rarity} value={rarity}>{rarity}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white"
                >
                  <option value="">All Types</option>
                  {availableTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[50vh] mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {filteredMagicalItems.map((item, index) => (
                  <button
                    key={`${item.name}-${index}`}
                    onClick={() => setSelectedMagicalItem(item.name)}
                    className={`text-left p-3 rounded border transition-colors ${
                      selectedMagicalItem === item.name
                        ? 'bg-purple-600 border-purple-500'
                        : 'bg-slate-600 border-slate-500 hover:bg-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-medium">{item.name}</span>
                          <span className={`text-xs ${magicalItems.getRarityColor(item.rarity)} px-1 rounded`}>
                            {item.rarity}
                          </span>
                          {item.requiresAttunement && (
                            <span className="text-xs bg-orange-600 text-white px-1 rounded">
                              Requires Attunement
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-slate-300">{item.type}</div>
                        <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {filteredMagicalItems.length === 0 && (
                <div className="text-center text-slate-400 py-8">
                  No items match your search criteria.
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowMagicalItemSelector(false);
                  setMagicalItemSearch("");
                  setSelectedRarity("");
                  setSelectedType("");
                }}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMagicalItem}
                disabled={!selectedMagicalItem}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 px-4 rounded"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {showSpellScrollCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Create Spell Scroll</h3>
              <button
                onClick={() => setShowSpellScrollCreator(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <select
              value={selectedSpellLevel}
              onChange={(e) => {
                setSelectedSpellLevel(Number(e.target.value));
                setSelectedSpell(""); // Reset spell selection when level changes
              }}
              className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white mb-4"
            >
              <option value="-1">Select spell level...</option>
              <option value="0">Cantrip (0 level)</option>
              <option value="1">1st Level</option>
              <option value="2">2nd Level</option>
              <option value="3">3rd Level</option>
              <option value="4">4th Level</option>
              <option value="5">5th Level</option>
              <option value="6">6th Level</option>
              <option value="7">7th Level</option>
              <option value="8">8th Level</option>
              <option value="9">9th Level</option>
            </select>
            {selectedSpellLevel >= 0 && (
              <select
                value={selectedSpell}
                onChange={(e) => setSelectedSpell(e.target.value)}
                className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white mb-4"
              >
                <option value="">Select spell...</option>
                {spellsForLevel.map(spell => (
                  <option key={spell.name} value={spell.name}>
                    {spell.name} ({spell.school})
                  </option>
                ))}
              </select>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowSpellScrollCreator(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSpellScroll}
                disabled={selectedSpellLevel < 0 || !selectedSpell}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded"
              >
                Create Scroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Potion Usage Modal */}
      {showPotionUsage && selectedPotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Use {selectedPotion.name}</h3>
              <button
                onClick={() => {
                  setShowPotionUsage(false);
                  setSelectedPotion(null);
                  setPotionRolls(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {(() => {
              const effects = magicalItems.getPotionEffects(selectedPotion);
              
              return (
                <div className="space-y-4">
                  <div className="text-slate-300 text-sm">
                    {selectedPotion.description}
                  </div>
                  
                  {effects.dice && (
                    <div className="bg-slate-700 rounded p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-medium">Roll: {effects.dice} + {effects.bonus}</span>
                        <button
                          onClick={handleRollPotion}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                        >
                          Roll Dice
                        </button>
                      </div>
                      
                      {potionRolls && (
                        <div className="text-center p-3 bg-slate-600 rounded">
                          <div className="text-2xl font-bold text-green-400 mb-1">
                            {potionRolls.total}
                          </div>
                          <div className="text-xs text-slate-400">
                            Rolled: {potionRolls.roll} + {effects.bonus} = {potionRolls.total}
                          </div>
                          <div className="text-sm text-slate-300 mt-2">
                            {effects.description}: {potionRolls.total}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!effects.dice && (
                    <div className="bg-slate-700 rounded p-4">
                      <div className="text-white font-medium mb-2">Effect:</div>
                      <div className="text-slate-300">{effects.description}</div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowPotionUsage(false);
                        setSelectedPotion(null);
                        setPotionRolls(null);
                      }}
                      className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConsumePotion}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                      Consume Potion
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
} 