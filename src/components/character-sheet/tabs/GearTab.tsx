"use client";

import { useState, useEffect } from "react";
import { Package, Shield, Wand2, Plus, X, Trash2, Sparkles, Scroll, AlertTriangle, CheckCircle } from "lucide-react";
import { createCharacterEquipment } from "@/services/character/equipment";
import { createMagicalItemService, type DiceRoll } from "@/services/character/magical-items";
import { createEquipmentRulesEngine, type EquipmentValidationResult } from "@/lib/dnd/equipment-rules";
import type { Weapon, MagicalWeapon, Armor } from "@/lib/dnd/equipment";
import type { Spell } from "@/lib/dnd/spells";
import { MagicalItem, EquippedMagicalItem, MagicalItemType, MagicalItemRarity, canAttuneMagicalItem, canEquipInSlot } from "@/lib/dnd/magical-items";
import { ArmorSelector } from "../../shared/ArmorSelector";
import { WeaponSelector } from "../../shared/WeaponSelector";
import { CustomWeaponCreator } from "../components/CustomWeaponCreator";
import { findSpellByName, getSpellsByClass } from "@/lib/dnd/spell-data-helper";
import { getSpellcastingType } from "@/lib/dnd/level-up";
import { useStatusStyles, useInteractiveButtonStyles } from "@/hooks/use-theme";
import { getRarityColor } from "@/lib/theme-utils";

interface DatabaseMagicalItem {
  id: number;
  name: string;
  type: string;
  rarity: string;
  attunement: boolean;
  description?: string;
  magicalProperties?: string;
  cost?: number;
  weight?: number;
}

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
  onAddArmor: (armor: Armor) => void;
  onAddMagicalItem: (item: MagicalItem) => void;
  onOpenSpellPreparation: () => void;
  onOpenSpellManagement?: () => void;
  onOpenCantripManagement?: () => void;
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
  onAddArmor,
  onAddMagicalItem,
  onOpenSpellPreparation,
  onOpenSpellManagement,
  onOpenCantripManagement,
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
  
  // Service instances for equipment calculations (memoized to prevent re-creation)
  const [equipment] = useState(() => createCharacterEquipment(characterData));
  const [magicalItems] = useState(() => createMagicalItemService());
  
  // Memoize equipment rules engine to prevent infinite re-renders
  const [equipmentRules] = useState(() => createEquipmentRulesEngine({
    class: character.class,
    level: character.level,
    strength: character.strength,
    dexterity: character.dexterity
  }));

  const [activeSection, setActiveSection] = useState<"equipped" | "inventory">("equipped");
  const [showWeaponSelector, setShowWeaponSelector] = useState(false);
  const [showArmorSelector, setShowArmorSelector] = useState(false);
  const [showMagicalItemSelector, setShowMagicalItemSelector] = useState(false);
  const [showCustomWeaponCreator, setShowCustomWeaponCreator] = useState(false);

  const [selectedMagicalItem, setSelectedMagicalItem] = useState("");
  const [magicalItemsData, setMagicalItemsData] = useState<DatabaseMagicalItem[]>([]);

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

  // Equipment validation states
  const [equipmentConflicts, setEquipmentConflicts] = useState<{
    hasConflicts: boolean;
    conflictSummary: string[];
    suggestions: string[];
  }>({ hasConflicts: false, conflictSummary: [], suggestions: [] });
  const [pendingValidation, setPendingValidation] = useState<{
    type: 'weapon' | 'armor';
    item: Weapon | MagicalWeapon | Armor;
    validation: EquipmentValidationResult;
  } | null>(null);

  const currentArmorClass = equipment.calculateArmorClass(equippedArmor);

  // Theme hooks
  const statusStyles = useStatusStyles();
  const interactiveButtonStyles = useInteractiveButtonStyles();

  // Load magical items data from database
  useEffect(() => {
    const loadMagicalItemsData = async () => {
      try {
        const response = await fetch('/api/magical-items');
        if (response.ok) {
          const data = await response.json();
          setMagicalItemsData(data);
        }
      } catch (error) {
        console.error('Error loading magical items data:', error);
      }
    };
    loadMagicalItemsData();
  }, []);

  // Update equipment conflicts when equipment changes
  useEffect(() => {
    const updateConflicts = async () => {
      const conflicts = await equipmentRules.getEquipmentConflictSummary(equippedWeapons, equippedArmor);
      setEquipmentConflicts(conflicts);
    };
    updateConflicts();
  }, [equippedWeapons, equippedArmor, equipmentRules]);

  // Validate equipment before adding
  const validateAndAddWeapon = async (weapon: Weapon | MagicalWeapon, isEquipping: boolean = false): Promise<boolean> => {
    const validation = await equipmentRules.validateWeaponEquip(weapon, equippedWeapons, equippedArmor, isEquipping);
    
    // If just adding to inventory, warnings are fine
    if (!isEquipping) {
      if (validation.warnings.length > 0) {
        setPendingValidation({
          type: 'weapon',
          item: weapon,
          validation
        });
      }
      return true;
    }
    
    // If equipping, check for conflicts
    if (!validation.canEquip) {
      setPendingValidation({
        type: 'weapon',
        item: weapon,
        validation
      });
      return false;
    }
    
    // Show warnings but allow equipping
    if (validation.warnings.length > 0) {
      setPendingValidation({
        type: 'weapon', 
        item: weapon,
        validation
      });
      // Don't block equipping for warnings, just show them
    }
    
    return true;
  };

  const validateAndAddArmor = async (armor: Armor, isEquipping: boolean = false): Promise<boolean> => {
    const validation = await equipmentRules.validateArmorEquip(armor, equippedArmor, isEquipping);
    
    // If just adding to inventory, warnings are fine
    if (!isEquipping) {
      if (validation.warnings.length > 0) {
        setPendingValidation({
          type: 'armor',
          item: armor,
          validation
        });
      }
      return true;
    }
    
    // If equipping, check for conflicts
    if (!validation.canEquip) {
      setPendingValidation({
        type: 'armor',
        item: armor,
        validation  
      });
      return false;
    }
    
    return true;
  };

  // Enhanced weapon adding with validation
  const handleAddValidatedWeapons = async (weapons: (Weapon | MagicalWeapon)[]) => {
    for (const weapon of weapons) {
      const canAdd = await validateAndAddWeapon(weapon, false); // Adding to inventory, not equipping
      if (canAdd) {
        onAddWeapon(weapon);
      }
    }
  };

  // Enhanced armor adding with validation  
  const handleAddValidatedArmor = async (armor: Armor) => {
    const canAdd = await validateAndAddArmor(armor, false); // Adding to inventory, not equipping
    if (canAdd) {
      onAddArmor(armor);
    }
  };

  const handleAddMagicalItem = () => {
    const itemData = magicalItemsData.find(i => i.name === selectedMagicalItem);
    if (itemData) {
      const item = {
        id: itemData.id.toString(),
        name: itemData.name,
        type: itemData.type as MagicalItemType,
        rarity: itemData.rarity as MagicalItemRarity,
        description: itemData.description,
        weight: itemData.weight,
        cost: itemData.cost,
        effects: itemData.magicalProperties ? JSON.parse(itemData.magicalProperties) : [],
        requiresAttunement: itemData.attunement,
        stackable: false
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

  const handleCreateSpellScroll = async () => {
    const spellData = await findSpellByName(selectedSpell);
    if (spellData) {
      const scrollLevel = spellData.level === 0 ? "Cantrip" : `${spellData.level}${magicalItems.getOrdinalSuffix(spellData.level)} Level`;
      const rarity: "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary" = 
        spellData.level === 0 ? "Common" : 
        spellData.level <= 1 ? "Common" :
        spellData.level <= 3 ? "Uncommon" :
        spellData.level <= 5 ? "Rare" :
        spellData.level <= 8 ? "Very Rare" : "Legendary";
      
      const customScroll: MagicalItem = {
        id: `spell-scroll-${spellData.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: `Spell Scroll (${spellData.name})`,
        type: 'Scroll',
        rarity: rarity,
        requiresAttunement: false,
        description: `A spell scroll containing ${spellData.name}. ${spellData.description}`,
        weight: 0,
        cost: spellData.level === 0 ? '25 gp' : `${50 * spellData.level} gp`,
        effects: [
          { type: 'spell_effect', target: spellData.name.toLowerCase().replace(/\s+/g, '_'), description: `Contains ${spellData.name} (${scrollLevel}, can be cast once)` }
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
  const [spellsForLevel, setSpellsForLevel] = useState<Spell[]>([]);
  
  useEffect(() => {
    const loadSpells = async () => {
      if (selectedSpellLevel >= 0) {
        const spells = await getSpellsByClass(character.class, 9);
        const filteredSpells = spells.filter(spell => spell.level === selectedSpellLevel);
        setSpellsForLevel(filteredSpells);
      } else {
        const spells = await getSpellsByClass(character.class, 9);
        setSpellsForLevel(spells);
      }
    };
    loadSpells();
  }, [selectedSpellLevel, character.class]);

  // Filter magical items based on search and filters
  const filteredMagicalItems = magicalItemsData.filter(item => {
    const matchesSearch = !magicalItemSearch || 
      item.name.toLowerCase().includes(magicalItemSearch.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(magicalItemSearch.toLowerCase()));
    
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
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Gear & Spells</h2>
        <p className="text-[var(--color-text-secondary)]">Manage your equipment, magical items, and spells</p>
      </div>

      {/* Equipment Conflicts Display */}
      {equipmentConflicts.hasConflicts && (
        <div 
          className="rounded-lg p-4 mb-6"
          style={statusStyles.warning}
        >
          <div className="flex items-start gap-3">
                          <AlertTriangle 
                className="h-5 w-5 mt-0.5 flex-shrink-0" 
                style={{ color: 'var(--color-warning)' }}
              />
            <div className="flex-1">
                              <h3 className="font-medium mb-2" style={{ color: 'var(--color-warning)' }}>Equipment Conflicts Detected</h3>
              <div className="space-y-1 mb-3">
                {equipmentConflicts.conflictSummary.map((conflict, index) => (
                  <div key={index} className="text-[var(--color-warning-text)] text-sm">{conflict}</div>
                ))}
              </div>
              {equipmentConflicts.suggestions.length > 0 && (
                <div className="space-y-1">
                  <div className="text-[var(--color-warning-text)] text-sm font-medium">Suggestions:</div>
                  {equipmentConflicts.suggestions.map((suggestion, index) => (
                    <div key={index} className="text-[var(--color-warning-text)] text-sm">{suggestion}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveSection("equipped")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSection === "equipped"
              ? "bg-[var(--color-accent)] text-[var(--color-accent-text)]"
              : "bg-[var(--color-card-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-tertiary)]"
          }`}
        >
          <Shield className="h-4 w-4 inline mr-2" />
          Equipped Gear
        </button>
        <button
          onClick={() => setActiveSection("inventory")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSection === "inventory"
              ? "bg-[var(--color-accent)] text-[var(--color-accent-text)]"
              : "bg-[var(--color-card-secondary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-tertiary)]"
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
            <div className="bg-[var(--color-card)] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-[var(--color-accent)]" />
                Equipped Weapons ({equippedWeapons.length}/{weaponLimits.maxEquipped})
              </h3>
              {equippedWeapons.length === 0 ? (
                <p className="text-[var(--color-text-secondary)] text-sm">No weapons equipped</p>
              ) : (
                <div className="space-y-2">
                  {equippedWeapons.map((weapon, index) => (
                    <div key={index} className="bg-[var(--color-card-secondary)] rounded p-3 flex justify-between items-center">
                      <div>
                        <span className="text-[var(--color-text-primary)] font-medium">
                          {weapon.name}
                          {weapon.stackable && weapon.quantity && weapon.quantity > 1 && (
                            <span 
                              className="ml-2 text-xs px-2 py-1 rounded"
                              style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'var(--color-accent-text)'
                              }}
                            >
                              {weapon.quantity}
                            </span>
                          )}
                        </span>
                        {'rarity' in weapon && (
                          <span className={`ml-2 text-xs ${getRarityColor(weapon.rarity)}`}>
                            {weapon.rarity}
                          </span>
                        )}
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          {weapon.damage} {weapon.damageType} • {weapon.type}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!weapon.stackable && (
                          <button
                            onClick={() => onUnequipWeapon(index)}
                            className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-tertiary)] rounded"
                            title={`Unequip ${weapon.name}`}
                          >
                            <Package className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Armor */}
            <div className="bg-[var(--color-card)] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-[var(--color-accent)]" />
                Equipped Armor (AC: {currentArmorClass})
              </h3>
              {equippedArmor.length === 0 ? (
                <p className="text-[var(--color-text-secondary)] text-sm">No armor equipped</p>
              ) : (
                <div className="space-y-2">
                  {equippedArmor.map((armor, index) => (
                    <div key={index} className="bg-[var(--color-card-secondary)] rounded p-3 flex justify-between items-center">
                      <div>
                        <span className="text-[var(--color-text-primary)] font-medium">{armor.name}</span>
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          AC {armor.baseAC} • {armor.type}
                          {armor.type === 'Medium' && armor.maxDexBonus !== null && ` • Max Dex +${armor.maxDexBonus}`}
                          {armor.type === 'Light' && ` • Full Dex`}
                          {armor.type === 'Heavy' && ` • No Dex`}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onUnequipArmor(index)}
                          className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-tertiary)] rounded"
                        >
                          <Package className="h-4 w-4" />
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
            <div className="bg-[var(--color-card)] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
                Magical Items ({attunedItems.length}/3 attuned)
              </h3>
              {equippedMagicalItems.length === 0 ? (
                <p className="text-[var(--color-text-secondary)] text-sm">No magical items equipped</p>
              ) : (
                <div className="space-y-2">
                  {equippedMagicalItems.map((item, index) => (
                    <div key={index} className="bg-[var(--color-card-secondary)] rounded p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--color-text-primary)] font-medium">{item.name}</span>
                            <span className={`text-xs ${getRarityColor(item.rarity)}`}>
                              {item.rarity}
                            </span>
                            {item.requiresAttunement && (
                              <button
                                onClick={() => onToggleAttunement(item.name)}
                                className="text-xs px-2 py-1 rounded"
                                style={item.isAttuned ? {
                                  backgroundColor: 'var(--color-accent)',
                                  color: 'var(--color-accent-text)'
                                } : {
                                  backgroundColor: 'var(--color-card-secondary)',
                                  color: 'var(--color-text-secondary)'
                                }}
                              >
                                {item.isAttuned ? 'Attuned' : 'Attune'}
                              </button>
                            )}
                          </div>
                          <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                            {item.type} • {item.slot || 'No slot restriction'}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => onUnequipMagicalItem(index)}
                            className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-tertiary)] rounded"
                          >
                            <Package className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-[var(--color-text-secondary)]">
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
            <div className="bg-[var(--color-card)] rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-[var(--color-accent)]" />
                  Spells
                </h3>
                {(() => {
                  const spellcastingType = getSpellcastingType(character.class);
                  
                  if (spellcastingType === 'known') {
                    // For Sorcerers, Bards, Warlocks - show spell management
                    return (
                      <button
                        onClick={onOpenSpellManagement}
                        className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] px-3 py-1 rounded text-sm transition-colors"
                      >
                        Manage Known Spells
                      </button>
                    );
                  } else if (spellcastingType === 'prepared' || spellcastingType === 'spellbook') {
                    // For Wizards, Clerics, Druids, Paladins - show spell preparation and cantrip management
                    return (
                      <div className="flex gap-2">
                        <button
                          onClick={onOpenSpellPreparation}
                          className="bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] px-3 py-1 rounded text-sm transition-colors"
                        >
                          Prepare Spells
                        </button>
                        {onOpenCantripManagement && (
                          <button
                            onClick={onOpenCantripManagement}
                            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] px-3 py-1 rounded text-sm transition-colors"
                          >
                            Manage Cantrips
                          </button>
                        )}
                      </div>
                    );
                  } else if (spellcastingType === 'none') {
                    // For non-spellcasters - show cantrip management if they have cantrips
                    return onOpenCantripManagement ? (
                      <button
                        onClick={onOpenCantripManagement}
                        className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] px-3 py-1 rounded text-sm transition-colors"
                      >
                        Manage Cantrips
                      </button>
                    ) : null;
                  } else {
                    return null;
                  }
                })()}
              </div>
              
              {/* Paladin Spellcasting Setup Notice */}
              {character.class === 'Paladin' && character.level >= 2 && !character.spellcastingAbility && (
                <div 
                  className="mb-4 p-3 rounded-lg"
                  style={statusStyles.warning}
                >
                                      <div className="flex items-center gap-2 mb-2">
                      <Sparkles 
                        className="h-4 w-4" 
                        style={{ color: 'var(--color-warning)' }}
                      />
                      <span className="font-medium" style={{ color: 'var(--color-warning)' }}>Spellcasting Available!</span>
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--color-warning)' }}>
                    Your paladin has reached level 2 and can now cast spells! You need to set up your spellcasting ability and prepare your first spells.
                  </p>
                  <button
                    onClick={onOpenSpellPreparation}
                    className="text-sm px-3 py-1 rounded font-medium transition-colors"
                    style={interactiveButtonStyles.warning}
                  >
                    Set Up Spellcasting
                  </button>
                </div>
              )}
              
              <div className="space-y-3">
                <div>
                  <span className="text-[var(--color-text-secondary)] text-sm">Prepared Spells: </span>
                  <span className="text-[var(--color-text-primary)]">{(character.spellsPrepared?.filter(spell => spell.level > 0) || []).length}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)] text-sm">Cantrips Known: </span>
                  <span className="text-[var(--color-text-primary)]">{(character.spellsPrepared?.filter(spell => spell.level === 0) || []).length}</span>
                </div>
                <div>
                  <span className="text-[var(--color-text-secondary)] text-sm">Known Spells: </span>
                  <span className="text-[var(--color-text-primary)]">
                    {getSpellcastingType(character.class) === 'prepared' ? 'All 1st-level spells' : (character.spellsKnown?.length || 0)}
                  </span>
                </div>
                {character.spellSlots && Object.keys(character.spellSlots).filter(k => k && k !== 'undefined').length > 0 && (
                  <div>
                    <span className="text-[var(--color-text-secondary)] text-sm">Spell Slots: </span>
                    <div className="flex gap-2 mt-1">
                      {Object.entries(character.spellSlots)
                        .filter(([level, slots]) => level && level !== 'undefined' && slots > 0)
                        .map(([level, slots]) => (
                        <span key={level} className="bg-[var(--color-card-secondary)] px-2 py-1 rounded text-xs text-[var(--color-text-primary)]">
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
          <div className="bg-[var(--color-card)] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Weapons</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowWeaponSelector(true)}
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  }}
                  title="Add basic weapons"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowCustomWeaponCreator(true)}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] px-2 py-1 rounded"
                  title="Create magical weapons"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            </div>
            {inventoryWeapons.length === 0 ? (
              <div className="text-[var(--color-text-secondary)] text-sm">
                <p>No weapons in inventory</p>
                {equippedWeapons.length > 0 && (
                  <p className="text-xs mt-1 text-[var(--color-text-secondary)]">
                    💡 Equipped weapons ({equippedWeapons.length}) are shown in &quot;Equipped Gear&quot; tab
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {inventoryWeapons.map((weapon, index) => (
                  <div key={index} className="bg-[var(--color-card-secondary)] rounded p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[var(--color-text-primary)] font-medium">
                          {weapon.name}
                          {weapon.stackable && weapon.quantity && weapon.quantity > 1 && (
                            <span className="ml-2 text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] px-2 py-1 rounded">
                              {weapon.quantity}
                            </span>
                          )}
                        </span>
                        {'rarity' in weapon && (
                          <span className={`ml-2 text-xs ${getRarityColor(weapon.rarity)}`}>
                            {weapon.rarity}
                          </span>
                        )}
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          {weapon.damage} {weapon.damageType}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onEquipWeapon(weapon, index)}
                          className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-tertiary)] rounded"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveWeapon(index, false)}
                          className="p-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger-bg)] rounded"
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
          <div className="bg-[var(--color-card)] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Armor</h3>
              <button
                onClick={() => setShowArmorSelector(true)}
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] px-2 py-1 rounded"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {inventoryArmor.length === 0 ? (
              <div className="text-[var(--color-text-secondary)] text-sm">
                <p>No armor in inventory</p>
                {equippedArmor.length > 0 && (
                  <p className="text-xs mt-1 text-[var(--color-text-secondary)]">
                    💡 Equipped armor ({equippedArmor.length}) is shown in &quot;Equipped Gear&quot; tab
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {inventoryArmor.map((armor, index) => (
                  <div key={index} className="bg-[var(--color-card-secondary)] rounded p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[var(--color-text-primary)] font-medium">{armor.name}</span>
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          AC {armor.baseAC} • {armor.type}
                          {armor.type === 'Medium' && armor.maxDexBonus !== null && ` • Max Dex +${armor.maxDexBonus}`}
                          {armor.type === 'Light' && ` • Full Dex`}
                          {armor.type === 'Heavy' && ` • No Dex`}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onEquipArmor(armor, index)}
                          className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-tertiary)] rounded"
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveArmor(index, false)}
                          className="p-1 text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger-bg)] rounded"
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
          <div className="bg-[var(--color-card)] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Magical Items</h3>
              <div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowMagicalItemSelector(true)}
                    disabled={inventoryMagicalItems.length >= 50}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 text-[var(--color-button-text)] rounded"
                  >
                    <Plus className="h-4 w-4" />
                    Add Magical Item
                  </button>
                </div>
              </div>
            </div>
            {inventoryMagicalItems.length === 0 ? (
              <div className="text-[var(--color-text-secondary)] text-sm">
                <p>No magical items in inventory</p>
                {equippedMagicalItems.length > 0 && (
                  <p className="text-xs mt-1 text-[var(--color-text-secondary)]">
                    💡 Equipped magical items ({equippedMagicalItems.length}) are shown in &quot;Equipped Gear&quot; tab
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {inventoryMagicalItems.map((item, index) => (
                  <div key={index} className="bg-[var(--color-card-secondary)] rounded p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--color-text-primary)] font-medium">{item.name}</span>
                          <span className={`text-xs ${getRarityColor(item.rarity)} px-1 rounded`}>
                            {item.rarity}
                          </span>
                        </div>
                        <div className="text-sm text-[var(--color-text-secondary)]">
                          {item.type}
                          {item.requiresAttunement && (
                            <span className="ml-2 text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] px-1 rounded">
                              Requires Attunement
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {magicalItems.isConsumable(item) ? (
                          <button
                            onClick={() => handleUseItem(item, index)}
                            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] text-xs px-2 py-1 rounded font-medium transition-colors"
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
                                ? 'bg-[var(--color-card-secondary)] text-[var(--color-text-secondary)] cursor-not-allowed'
                                : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)]'
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
                          className="bg-[var(--color-danger)] hover:bg-[var(--color-danger-hover)] text-[var(--color-danger-text)] text-xs px-2 py-1 rounded font-medium transition-colors"
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
            <div className="bg-[var(--color-card-secondary)] rounded p-3 flex gap-2">
              <button
                onClick={() => setShowMagicalItemSelector(true)}
                disabled={inventoryMagicalItems.length >= 50}
                className="flex items-center gap-2 px-3 py-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 text-[var(--color-button-text)] rounded text-sm"
              >
                <Sparkles className="h-4 w-4" />
                Browse Items
              </button>
              <button
                onClick={() => setShowSpellScrollCreator(true)}
                className="flex items-center gap-2 px-3 py-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] rounded text-sm"
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
          selectedWeapons={[]}
          onConfirm={async (weapons) => {
            // Build complete list of weapons to add - preserve quantities for ammunition
            const weaponsToAdd: (Weapon | MagicalWeapon)[] = [];
            weapons.forEach(({ weapon, quantity }) => {
              // Check if this is ammunition (has "Ammunition" property and no damage)
              const hasAmmunitionProperty = weapon.properties.some(prop => prop.startsWith('Ammunition'));
              if (hasAmmunitionProperty && weapon.damage === '—') {
                // For ammunition, add once with the quantity property set
                weaponsToAdd.push({ ...weapon, quantity });
              } else {
                // For regular weapons, add individual copies (normal weapon behavior)
                for (let i = 0; i < quantity; i++) {
                  weaponsToAdd.push(weapon);
                }
              }
            });
            
            // Use validation instead of direct addition
            await handleAddValidatedWeapons(weaponsToAdd);
            setShowWeaponSelector(false);
          }}
          onCancel={() => setShowWeaponSelector(false)}
          characterClass={character.class}
          showSuggestions={false}
        />
      )}

      {showArmorSelector && (
        <ArmorSelector
          selectedArmor={[]}
          onArmorSelectionChange={async (armor) => {
            // Add selected armor to inventory with validation
            for (const item of armor) {
              await handleAddValidatedArmor(item);
            }
            setShowArmorSelector(false);
          }}
          onClose={() => setShowArmorSelector(false)}
          isOpen={showArmorSelector}
          characterClass={character.class}
          showProficiencies={true}
        />
      )}

      {showCustomWeaponCreator && (
        <CustomWeaponCreator
          isOpen={showCustomWeaponCreator}
          onClose={() => setShowCustomWeaponCreator(false)}
          onWeaponCreated={(customWeapon) => {
            // Convert custom weapon to MagicalWeapon format for the character
            const magicalWeapon: MagicalWeapon = {
              name: customWeapon.name,
              type: customWeapon.baseWeapon.type,
              category: customWeapon.baseWeapon.category,
              damage: customWeapon.baseWeapon.damage,
              damageType: customWeapon.baseWeapon.damageType,
              properties: customWeapon.baseWeapon.properties,
              weight: customWeapon.baseWeapon.weight,
              cost: customWeapon.baseWeapon.cost,
              stackable: false,
              baseName: customWeapon.baseWeapon.name,
              magicalName: customWeapon.name,
              attackBonus: customWeapon.modifier,
              damageBonus: customWeapon.modifier,
              magicalProperties: customWeapon.description || `A magical ${customWeapon.baseWeapon.name} with a +${customWeapon.modifier} enhancement bonus.`,
              rarity: customWeapon.modifier === 0 ? 'Common' : 
                     customWeapon.modifier === 1 ? 'Uncommon' :
                     customWeapon.modifier === 2 ? 'Rare' : 'Very Rare'
            };
            
            onAddWeapon(magicalWeapon);
          }}
        />
      )}

      {showMagicalItemSelector && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg w-full max-w-4xl p-6 max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Add Magical Item ({filteredMagicalItems.length} items)</h3>
              <button
                onClick={() => {
                  setShowMagicalItemSelector(false);
                  setMagicalItemSearch("");
                  setSelectedRarity("");
                  setSelectedType("");
                }}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={magicalItemSearch}
                  onChange={(e) => setMagicalItemSearch(e.target.value)}
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-card-tertiary)] rounded px-3 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">Rarity</label>
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-card-tertiary)] rounded px-3 py-2 text-[var(--color-text-primary)]"
                >
                  <option value="">All Rarities</option>
                  {availableRarities.map(rarity => (
                    <option key={rarity} value={rarity}>{rarity}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-card-tertiary)] rounded px-3 py-2 text-[var(--color-text-primary)]"
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
                        ? 'bg-[var(--color-accent)] border-[var(--color-accent-hover)]'
                        : 'bg-[var(--color-card-secondary)] border-[var(--color-card-tertiary)] hover:bg-[var(--color-card-tertiary)]'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[var(--color-text-primary)] font-medium">{item.name}</span>
                          <span className={`text-xs ${getRarityColor(item.rarity)} px-1 rounded`}>
                            {item.rarity}
                          </span>
                          {item.attunement && (
                            <span className="text-xs bg-[var(--color-accent)] text-[var(--color-accent-text)] px-1 rounded">
                              Requires Attunement
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[var(--color-text-secondary)]">{item.type}</div>
                        <div className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {filteredMagicalItems.length === 0 && (
                <div className="text-center text-[var(--color-text-secondary)] py-8">
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
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMagicalItem}
                disabled={!selectedMagicalItem}
                className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] py-2 px-4 rounded"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {showSpellScrollCreator && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Create Spell Scroll</h3>
              <button
                onClick={() => setShowSpellScrollCreator(false)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
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
              className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-card-tertiary)] rounded px-3 py-2 text-[var(--color-text-primary)] mb-4"
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
                className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-card-tertiary)] rounded px-3 py-2 text-[var(--color-text-primary)] mb-4"
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
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSpellScroll}
                disabled={selectedSpellLevel < 0 || !selectedSpell}
                className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] py-2 px-4 rounded"
              >
                Create Scroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Potion Usage Modal */}
      {showPotionUsage && selectedPotion && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Use {selectedPotion.name}</h3>
              <button
                onClick={() => {
                  setShowPotionUsage(false);
                  setSelectedPotion(null);
                  setPotionRolls(null);
                }}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {(() => {
              const effects = magicalItems.getPotionEffects(selectedPotion);
              
              return (
                <div className="space-y-4">
                  <div className="text-[var(--color-text-secondary)] text-sm">
                    {selectedPotion.description}
                  </div>
                  
                  {effects.dice && (
                    <div className="bg-[var(--color-card-secondary)] rounded p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[var(--color-text-primary)] font-medium">Roll: {effects.dice} + {effects.bonus}</span>
                        <button
                          onClick={handleRollPotion}
                          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-text)] text-sm px-3 py-1 rounded"
                        >
                          Roll Dice
                        </button>
                      </div>
                      
                      {potionRolls && (
                        <div className="text-center p-3 bg-[var(--color-card-secondary)] rounded">
                          <div className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                            {potionRolls.total}
                          </div>
                          <div className="text-xs text-[var(--color-text-secondary)]">
                            Rolled: {potionRolls.roll} + {effects.bonus} = {potionRolls.total}
                          </div>
                          <div className="text-sm text-[var(--color-text-secondary)] mt-2">
                            {effects.description}: {potionRolls.total}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!effects.dice && (
                    <div className="bg-[var(--color-card-secondary)] rounded p-4">
                      <div className="text-[var(--color-text-primary)] font-medium mb-2">Effect:</div>
                      <div className="text-[var(--color-text-secondary)]">{effects.description}</div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowPotionUsage(false);
                        setSelectedPotion(null);
                        setPotionRolls(null);
                      }}
                      className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConsumePotion}
                      className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] py-2 px-4 rounded"
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

      {/* Equipment Validation Modal */}
      {pendingValidation && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md p-6">
            <div className="flex items-start gap-3 mb-4">
              {pendingValidation.validation.canEquip ? (
                <CheckCircle className="h-6 w-6 text-[var(--color-warning-text)] mt-0.5 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-[var(--color-danger)] mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className={`font-semibold mb-2 ${
                  pendingValidation.validation.canEquip ? 'text-[var(--color-warning-text)]' : 'text-[var(--color-danger)]'
                }`}>
                  {pendingValidation.validation.canEquip ? 'Equipment Warning' : 'Cannot Equip Item'}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-2">
                  Attempting to add: <strong>{pendingValidation.item.name}</strong>
                </p>
                
                {/* Show conflicts */}
                {pendingValidation.validation.conflicts.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[var(--color-danger)] text-sm font-medium mb-1">Conflicts:</div>
                    {pendingValidation.validation.conflicts.map((conflict, index) => (
                      <div key={index} className="text-[var(--color-text-secondary)] text-sm mb-1">
                        • {conflict.message}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Show warnings */}
                {pendingValidation.validation.warnings.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[var(--color-warning-text)] text-sm font-medium mb-1">Warnings:</div>
                    {pendingValidation.validation.warnings.map((warning, index) => (
                      <div key={index} className="text-[var(--color-text-secondary)] text-sm mb-1">
                        • {warning.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setPendingValidation(null)}
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] py-2 px-4 rounded"
              >
                Cancel
              </button>
              {pendingValidation.validation.canEquip && (
                <button
                  onClick={() => {
                    // Allow equipping with warnings
                    if (pendingValidation?.type === 'weapon') {
                      onAddWeapon(pendingValidation.item as Weapon | MagicalWeapon);
                    } else if (pendingValidation?.type === 'armor') {
                      onAddArmor(pendingValidation.item as Armor);
                    }
                    setPendingValidation(null);
                  }}
                  className="flex-1 bg-[var(--color-warning)] hover:bg-[var(--color-warning-text)] text-[var(--color-warning-text)] py-2 px-4 rounded"
                >
                  Add Anyway
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 