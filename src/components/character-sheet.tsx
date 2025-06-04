"use client";

import { Shield, Zap, User, Sword, Package, Trash2, Plus, Minus, Coins, BarChart3, Swords, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getModifier } from "@/lib/dnd/core";
import { Spell, getClassSpells } from "@/lib/dnd/spells";
import { Weapon, MagicalWeapon, InventoryItem, WEAPONS, MAGICAL_WEAPON_TEMPLATES, createMagicalWeapon, Armor, ARMOR, calculateArmorClass, EQUIPMENT, EQUIPMENT_CATEGORIES, getEquipmentByCategory } from "@/lib/dnd/equipment";
import { Action, canEquipWeapon, canEquipArmor } from "@/lib/dnd/combat";
import { Treasure, COMMON_TREASURES, STORY_TREASURES } from "@/lib/dnd/data";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { LevelUpModal } from "./level-up-modal";
import { getSpellcastingType, canPrepareSpells, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import { StatsTab, ActionsTab } from "./character-sheet/";

interface CharacterSheetProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    level: number;
    background?: string;
    alignment?: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    hitPoints: number;
    maxHitPoints: number;
    temporaryHitPoints?: number;
    armorClass: number;
    speed: number;
    proficiencyBonus: number;
    skills?: string[];
    inventory?: InventoryItem[] | string[];
    equipment?: string[];
    weapons?: (Weapon | MagicalWeapon)[];
    inventoryWeapons?: (Weapon | MagicalWeapon)[];
    armor?: Armor[];
    inventoryArmor?: Armor[];
    spellsKnown?: Spell[]; // All spells known or in spellbook
    spellsPrepared?: Spell[]; // Currently prepared/equipped spells
    spellSlots?: Record<number, number>;
    spellcastingAbility?: string;
    spellSaveDC?: number;
    spellAttackBonus?: number;
    actions?: Action[];
    bonusActions?: Action[];
    reactions?: Action[];
    copperPieces?: number;
    silverPieces?: number;
    goldPieces?: number;
    treasures?: Treasure[];
    appearance?: string;
    personality?: string;
    backstory?: string;
    notes?: string;
    equippedWeapons?: (Weapon | MagicalWeapon)[];
  };
  onClose: () => void;
  onCharacterDeleted?: () => void;
}

export function CharacterSheet({ character, onClose, onCharacterDeleted }: CharacterSheetProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showSpellPreparationModal, setShowSpellPreparationModal] = useState(false);
  const [tempPreparedSpells, setTempPreparedSpells] = useState<Spell[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(character);
  
  // Use currentCharacter instead of character throughout the component
  const displayCharacter = currentCharacter;
  
  const [activeTab, setActiveTab] = useState<"stats" | "actions" | "equipment" | "inventory">("stats");
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Adventuring Gear");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [addMode, setAddMode] = useState<"equipment" | "custom">("equipment");
  const [newTreasureName, setNewTreasureName] = useState("");
  const [newTreasureValue, setNewTreasureValue] = useState("");
  const [selectedTreasure, setSelectedTreasure] = useState("");
  const [treasureAddMode, setTreasureAddMode] = useState<"common" | "story" | "custom">("common");
  const [showWeaponCreator, setShowWeaponCreator] = useState(false);
  const [selectedBaseWeapon, setSelectedBaseWeapon] = useState("");
  const [selectedMagicalTemplate, setSelectedMagicalTemplate] = useState("");
  const [customWeaponName, setCustomWeaponName] = useState("");
  const [copperPieces, setCopperPieces] = useState(character.copperPieces || 0);
  const [silverPieces, setSilverPieces] = useState(character.silverPieces || 0);
  const [goldPieces, setGoldPieces] = useState(character.goldPieces || 0);
  const [treasures, setTreasures] = useState<Treasure[]>(character.treasures || []);
  
  // Debug logging for character data
  console.log('CharacterSheet rendered with character:', {
    id: character.id,
    name: character.name,
    inventoryWeapons: character.inventoryWeapons,
    inventoryArmor: character.inventoryArmor,
    equippedWeapons: character.equippedWeapons,
    armor: character.armor
  });
  
  const [inventoryWeapons, setInventoryWeapons] = useState<(Weapon | MagicalWeapon)[]>(() => {
    console.log('Character inventoryWeapons received:', character.inventoryWeapons);
    
    // Handle case where inventoryWeapons might be null/undefined or not properly loaded
    if (!character.inventoryWeapons || !Array.isArray(character.inventoryWeapons)) {
      console.log('No inventoryWeapons found or not an array');
      return [];
    }
    
    console.log('Processing', character.inventoryWeapons.length, 'weapons from database');
    
    // If the data comes from JSON, it might need to be converted back to proper Weapon objects
    return character.inventoryWeapons.map(weapon => {
      // Ensure the weapon has all required properties
      if (typeof weapon === 'object' && weapon.name) {
        return weapon;
      }
      return weapon;
    });
  });
  const [equippedWeapons, setEquippedWeapons] = useState<(Weapon | MagicalWeapon)[]>(() => {
    console.log('Character equipped weapons received:', character.weapons);
    return character.weapons || [];
  });
  const [inventoryArmor, setInventoryArmor] = useState<Armor[]>(() => {
    console.log('Character inventoryArmor received:', character.inventoryArmor);
    return character.inventoryArmor || [];
  });
  const [equippedArmor, setEquippedArmor] = useState<Armor[]>(() => {
    console.log('Character equipped armor received:', character.armor);
    return character.armor || [];
  });
  
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    if (!character.inventory) return [];
    
    if (character.inventory.length > 0 && typeof character.inventory[0] === 'object' && 'quantity' in character.inventory[0]) {
      return character.inventory as InventoryItem[];
    }
    
    return (character.inventory as string[]).map(name => ({ name, quantity: 1 }));
  });

  // Migration function to move armor from general inventory to armor inventory
  const migrateArmorFromInventory = () => {
    const armorNamesToMigrate: string[] = [];
    const nonArmorInventory: InventoryItem[] = [];
    
    // Check if we need to migrate
    inventory.forEach(item => {
      const armorItem = ARMOR.find(armor => armor.name === item.name);
      if (armorItem) {
        armorNamesToMigrate.push(item.name);
      } else {
        nonArmorInventory.push(item);
      }
    });
    
    if (armorNamesToMigrate.length > 0) {
      const newArmorObjects = armorNamesToMigrate.map(name => 
        ARMOR.find(armor => armor.name === name)!
      );
      
      const updatedInventoryArmor = [...inventoryArmor, ...newArmorObjects];
      
      // Update state
      setInventory(nonArmorInventory);
      setInventoryArmor(updatedInventoryArmor);
      
      // Save to database
      updateCharacter({ 
        inventory: nonArmorInventory,
        inventoryArmor: updatedInventoryArmor 
      });
    }
  };

  // Migration function to move weapons from general inventory to weapon inventory
  const migrateWeaponsFromInventory = () => {
    const weaponNamesToMigrate: string[] = [];
    const nonWeaponInventory: InventoryItem[] = [];
    
    // Check if we need to migrate
    inventory.forEach(item => {
      const weaponItem = WEAPONS.find(weapon => weapon.name === item.name);
      if (weaponItem) {
        weaponNamesToMigrate.push(item.name);
      } else {
        nonWeaponInventory.push(item);
      }
    });
    
    if (weaponNamesToMigrate.length > 0) {
      const newWeaponObjects = weaponNamesToMigrate.map(name => 
        WEAPONS.find(weapon => weapon.name === name)!
      );
      
      const updatedInventoryWeapons = [...inventoryWeapons, ...newWeaponObjects];
      
      // Update state
      setInventory(nonWeaponInventory);
      setInventoryWeapons(updatedInventoryWeapons);
      
      // Save to database
      updateCharacter({ 
        inventory: nonWeaponInventory,
        inventoryWeapons: updatedInventoryWeapons 
      });
    }
  };

  // Run migration on component mount (only for armor - weapons now categorized during creation)
  useEffect(() => {
    // Migrate armor (keep this for backward compatibility with existing characters)
    const hasArmorInGeneralInventory = inventory.some(item => 
      ARMOR.find(armor => armor.name === item.name)
    );
    const hasArmorInArmorInventory = inventoryArmor.length > 0;
    
    if (hasArmorInGeneralInventory && !hasArmorInArmorInventory) {
      console.log('Migrating armor from general inventory to armor inventory...');
      migrateArmorFromInventory();
    }

    // Legacy weapon migration (only for old characters that still have weapons in general inventory)
    const hasWeaponsInGeneralInventory = inventory.some(item => 
      WEAPONS.find(weapon => weapon.name === item.name)
    );
    
    if (hasWeaponsInGeneralInventory) {
      console.log('Migrating weapons from general inventory to weapon inventory (legacy)...');
      migrateWeaponsFromInventory();
    }
  }, [character.id]); // Only run when character changes


  // Calculate dynamic armor class based on equipped armor
  const currentArmorClass = calculateArmorClass(equippedArmor, displayCharacter.dexterity);


  const handleDeleteCharacter = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/characters?id=${character.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setShowDeleteDialog(false);
        onClose();
        onCharacterDeleted?.();
      } else {
        console.error('Failed to delete character');
      }
    } catch (error) {
      console.error('Error deleting character:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const updateCharacter = async (updates: {
    inventory?: InventoryItem[];
    copperPieces?: number;
    silverPieces?: number;
    goldPieces?: number;
    treasures?: Treasure[];
    weapons?: (Weapon | MagicalWeapon)[];
    inventoryWeapons?: (Weapon | MagicalWeapon)[];
    armor?: Armor[];
    inventoryArmor?: Armor[];
    hitPoints?: number;
    temporaryHitPoints?: number;
    spellsPrepared?: Spell[];
  }) => {
    try {
      const response = await fetch(`/api/characters?id=${character.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        console.error('Failed to update character');
      }
    } catch (error) {
      console.error('Error updating character:', error);
    }
  };

  const handleAddItem = () => {
    if (addMode === "equipment" && selectedEquipment) {
      const equipment = EQUIPMENT.find(e => e.name === selectedEquipment);
      if (equipment) {
        const existingItemIndex = inventory.findIndex(item => item.name === equipment.name);
        let updatedInventory: InventoryItem[];
        
        if (existingItemIndex >= 0 && equipment.stackable) {
          updatedInventory = [...inventory];
          updatedInventory[existingItemIndex].quantity += 1;
        } else if (existingItemIndex >= 0 && !equipment.stackable) {
          return;
        } else {
          updatedInventory = [...inventory, { name: equipment.name, quantity: 1 }];
        }
        
        setInventory(updatedInventory);
        updateCharacter({ inventory: updatedInventory });
        setSelectedEquipment("");
      }
    } else if (addMode === "custom" && newItem.trim()) {
      const existingItemIndex = inventory.findIndex(item => item.name === newItem.trim());
      let updatedInventory: InventoryItem[];
      
      if (existingItemIndex >= 0) {
        updatedInventory = [...inventory];
        updatedInventory[existingItemIndex].quantity += 1;
      } else {
        updatedInventory = [...inventory, { name: newItem.trim(), quantity: 1 }];
      }
      
      setInventory(updatedInventory);
      updateCharacter({ inventory: updatedInventory });
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
    updateCharacter({ inventory: updatedInventory });
  };

  const handleQuantityChange = (index: number, change: number) => {
    const updatedInventory = [...inventory];
    const newQuantity = updatedInventory[index].quantity + change;
    
    if (newQuantity <= 0) {
      updatedInventory.splice(index, 1);
    } else {
      updatedInventory[index].quantity = newQuantity;
    }
    
    setInventory(updatedInventory);
    updateCharacter({ inventory: updatedInventory });
  };

  const handleMoneyChange = (type: 'copper' | 'silver' | 'gold', change: number) => {
    const updates: {
      copperPieces?: number;
      silverPieces?: number;
      goldPieces?: number;
    } = {};
    
    if (type === 'copper') {
      const newValue = Math.max(0, copperPieces + change);
      setCopperPieces(newValue);
      updates.copperPieces = newValue;
    } else if (type === 'silver') {
      const newValue = Math.max(0, silverPieces + change);
      setSilverPieces(newValue);
      updates.silverPieces = newValue;
    } else if (type === 'gold') {
      const newValue = Math.max(0, goldPieces + change);
      setGoldPieces(newValue);
      updates.goldPieces = newValue;
    }
    
    updateCharacter(updates);
  };

  const handleAddTreasure = () => {
    let treasureTemplate: Treasure | undefined;
    
    if (treasureAddMode === "common" && selectedTreasure) {
      treasureTemplate = COMMON_TREASURES.find(t => t.name === selectedTreasure);
    } else if (treasureAddMode === "story" && selectedTreasure) {
      treasureTemplate = STORY_TREASURES.find(t => t.name === selectedTreasure);
    } else if (treasureAddMode === "custom" && newTreasureName.trim() && newTreasureValue.trim()) {
      const value = parseInt(newTreasureValue);
      if (!isNaN(value) && value > 0) {
        treasureTemplate = {
          name: newTreasureName.trim(),
          value: value
        };
      }
    }
    
    if (treasureTemplate) {
      const updatedTreasures = [...treasures, { ...treasureTemplate }];
      setTreasures(updatedTreasures);
      updateCharacter({ treasures: updatedTreasures });
      setSelectedTreasure("");
      setNewTreasureName("");
      setNewTreasureValue("");
    }
  };

  const handleCreateMagicalWeapon = () => {
    if (selectedBaseWeapon && selectedMagicalTemplate) {
      const baseWeapon = WEAPONS.find(w => w.name === selectedBaseWeapon);
      const template = MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate);
      
      if (baseWeapon && template) {
        const magicalWeapon = createMagicalWeapon(baseWeapon, template, customWeaponName.trim() || undefined);
        const updatedInventoryWeapons = [...inventoryWeapons, magicalWeapon];
        setInventoryWeapons(updatedInventoryWeapons);
        updateCharacter({ inventoryWeapons: updatedInventoryWeapons });
        
        // Reset form
        setSelectedBaseWeapon("");
        setSelectedMagicalTemplate("");
        setCustomWeaponName("");
        setShowWeaponCreator(false);
      }
    }
  };

  const handleEquipWeapon = (weapon: Weapon | MagicalWeapon, fromInventoryIndex: number) => {
    // Check if at weapon limit
    if (equippedWeapons.length >= weaponLimits.max) {
      alert(`Cannot equip more weapons: ${weaponLimits.reason}`);
      return;
    }

    // Move from inventory to equipped
    const updatedInventoryWeapons = inventoryWeapons.filter((_, i) => i !== fromInventoryIndex);
    const updatedEquippedWeapons = [...equippedWeapons, weapon];
    
    setInventoryWeapons(updatedInventoryWeapons);
    setEquippedWeapons(updatedEquippedWeapons);
    updateCharacter({ 
      weapons: updatedEquippedWeapons,
      inventoryWeapons: updatedInventoryWeapons 
    });
  };

  const handleUnequipWeapon = (weaponIndex: number) => {
    const weapon = equippedWeapons[weaponIndex];
    const updatedEquippedWeapons = equippedWeapons.filter((_, i) => i !== weaponIndex);
    const updatedInventoryWeapons = [...inventoryWeapons, weapon];
    
    setEquippedWeapons(updatedEquippedWeapons);
    setInventoryWeapons(updatedInventoryWeapons);
    updateCharacter({ 
      weapons: updatedEquippedWeapons,
      inventoryWeapons: updatedInventoryWeapons 
    });
  };

  const handleRemoveWeapon = (index: number, isEquipped: boolean = false) => {
    if (isEquipped) {
      const updatedWeapons = equippedWeapons.filter((_, i) => i !== index);
      setEquippedWeapons(updatedWeapons);
      updateCharacter({ weapons: updatedWeapons });
    } else {
      const updatedWeapons = inventoryWeapons.filter((_, i) => i !== index);
      setInventoryWeapons(updatedWeapons);
      updateCharacter({ inventoryWeapons: updatedWeapons });
    }
  };

  const handleRemoveTreasure = (index: number) => {
    const updatedTreasures = treasures.filter((_, i) => i !== index);
    setTreasures(updatedTreasures);
    updateCharacter({ treasures: updatedTreasures });
  };

  const handleEquipArmor = (armor: Armor, fromInventoryIndex: number) => {
    // Check if armor type can be equipped by class
    if (!canEquipArmor(armor.type, character.class)) {
      alert(`${character.class} cannot equip ${armor.type.toLowerCase()} armor!`);
      return;
    }

    // Check for conflicts - can only have one body armor and one shield
    const hasBodyArmor = equippedArmor.some(a => a.type !== 'Shield');
    const hasShield = equippedArmor.some(a => a.type === 'Shield');
    
    if (armor.type === 'Shield' && hasShield) {
      alert("Can only equip one shield!");
      return;
    }
    
    if (armor.type !== 'Shield' && hasBodyArmor) {
      alert("Can only equip one piece of body armor!");
      return;
    }

    // Check strength requirement
    if (armor.minStrength && character.strength < armor.minStrength) {
      alert(`Requires ${armor.minStrength} Strength to equip this armor!`);
      return;
    }

    // Move from inventory to equipped
    const updatedInventoryArmor = inventoryArmor.filter((_, i) => i !== fromInventoryIndex);
    const updatedEquippedArmor = [...equippedArmor, armor];
    
    setInventoryArmor(updatedInventoryArmor);
    setEquippedArmor(updatedEquippedArmor);
    updateCharacter({ 
      armor: updatedEquippedArmor,
      inventoryArmor: updatedInventoryArmor 
    });
  };

  const handleUnequipArmor = (armorIndex: number) => {
    const armor = equippedArmor[armorIndex];
    const updatedEquippedArmor = equippedArmor.filter((_, i) => i !== armorIndex);
    const updatedInventoryArmor = [...inventoryArmor, armor];
    
    setEquippedArmor(updatedEquippedArmor);
    setInventoryArmor(updatedInventoryArmor);
    updateCharacter({ 
      armor: updatedEquippedArmor,
      inventoryArmor: updatedInventoryArmor 
    });
  };

  const handleRemoveArmor = (index: number, isEquipped: boolean = false) => {
    if (isEquipped) {
      const updatedArmor = equippedArmor.filter((_, i) => i !== index);
      setEquippedArmor(updatedArmor);
      updateCharacter({ armor: updatedArmor });
    } else {
      const updatedArmor = inventoryArmor.filter((_, i) => i !== index);
      setInventoryArmor(updatedArmor);
      updateCharacter({ inventoryArmor: updatedArmor });
    }
  };

  const handleAddArmorFromEquipment = (armorName: string) => {
    const armor = ARMOR.find(a => a.name === armorName);
    if (armor) {
      const updatedInventoryArmor = [...inventoryArmor, armor];
      setInventoryArmor(updatedInventoryArmor);
      updateCharacter({ inventoryArmor: updatedInventoryArmor });
    }
  };

  // Equipment state
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  // Helper function to calculate weapon limits based on D&D 5e rules
  const getWeaponLimits = () => {
    const hasShield = equippedArmor.some(armor => armor.type === 'Shield');
    
    // In D&D 5e, you can carry multiple weapons and switch between them
    // The limitation is what you can actively use in combat, not what you can carry
    // We'll be more generous with carrying capacity but show warnings about hand usage
    
    if (hasShield) {
      // With shield: can carry multiple weapons but only use 1-handed weapons effectively
      return { 
        max: 4, 
        reason: "Shield equipped - can carry multiple weapons but only use one-handed weapons effectively" 
      };
    } else {
      // Without shield: can carry multiple weapons and switch between them as needed
      return { 
        max: 6, 
        reason: "Can carry multiple weapons - switch between melee and ranged as needed" 
      };
    }
  };
  
  const weaponLimits = getWeaponLimits();

  const handleLevelUp = async (updates: Record<string, unknown>) => {
    try {
      console.log('Applying level up updates:', updates);
      
      // Save updates to database
      const response = await fetch(`/api/characters?id=${character.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        console.error('Failed to save level up updates');
        return;
      }
      
      // Update local character state immediately
      setCurrentCharacter(prev => ({
        ...prev,
        ...updates
      } as typeof character));
      
      // Close the modal
      setShowLevelUpModal(false);
      
      console.log('Level up completed successfully!');
      
    } catch (error) {
      console.error('Error saving level up updates:', error);
    }
  };

  const handleOpenSpellPreparation = () => {
    // Initialize temp prepared spells with current selection
    setTempPreparedSpells([...(currentCharacter.spellsPrepared || [])]);
    setShowSpellPreparationModal(true);
  };

  const handleTogglePreparedSpell = (spell: Spell) => {
    const isCurrentlyPrepared = tempPreparedSpells.some(s => s.name === spell.name);
    const spellcastingAbility = currentCharacter.spellcastingAbility || 'intelligence';
    const abilityValue = currentCharacter[spellcastingAbility as keyof typeof currentCharacter] as number || 10;
    const abilityModifier = getModifier(abilityValue);
    const maxPrepared = getSpellsPreparedCount(currentCharacter.class, currentCharacter.level, abilityModifier);
    
    // Count only non-cantrip spells toward the preparation limit
    const currentNonCantripsPrepared = tempPreparedSpells.filter(s => s.level > 0).length;
    
    if (isCurrentlyPrepared) {
      // Remove from prepared spells
      setTempPreparedSpells(prev => prev.filter(s => s.name !== spell.name));
    } else {
      // Add to prepared spells if under limit (only check limit for non-cantrips)
      if (spell.level === 0 || currentNonCantripsPrepared < maxPrepared) {
        setTempPreparedSpells(prev => [...prev, spell]);
      }
    }
  };

  const handleSaveSpellPreparation = async () => {
    try {
      const response = await fetch(`/api/characters?id=${character.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spellsPrepared: tempPreparedSpells }),
      });
      
      if (!response.ok) {
        console.error('Failed to save spell preparation');
        return;
      }
      
      // Update local character state
      setCurrentCharacter(prev => ({
        ...prev,
        spellsPrepared: tempPreparedSpells
      }));
      
      setShowSpellPreparationModal(false);
      
    } catch (error) {
      console.error('Error saving spell preparation:', error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-purple-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">{displayCharacter.name}</h1>
                <p className="text-slate-300">
                  Level {displayCharacter.level} {displayCharacter.race} {displayCharacter.class}
                  {displayCharacter.background && ` • ${displayCharacter.background}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                title="Delete Character"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "stats"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Stats
            </button>
            <button
              onClick={() => setActiveTab("actions")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "actions"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Swords className="h-4 w-4" />
              Actions
            </button>
            <button
              onClick={() => setActiveTab("equipment")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "equipment"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Package className="h-4 w-4" />
              Equipment and Spells
            </button>
            <button
              onClick={() => setActiveTab("inventory")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "inventory"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Coins className="h-4 w-4" />
              Inventory
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "stats" && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <StatsTab 
                    character={displayCharacter}
                    equippedArmor={equippedArmor}
                    onUpdate={(updates) => {
                      setCurrentCharacter(prev => ({ ...prev, ...updates }));
                      updateCharacter(updates);
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === "actions" && (
              <ActionsTab
                character={displayCharacter}
                equippedWeapons={equippedWeapons}
                currentArmorClass={currentArmorClass}
                onOpenSpellPreparation={handleOpenSpellPreparation}
              />
            )}

            {activeTab === "equipment" && (
              <div className="p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Weapons */}
                  <div className="space-y-6">
                    {/* Equipped Weapons Section */}
                    {equippedWeapons && equippedWeapons.length > 0 && (
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Sword className="h-5 w-5" />
                          Equipped Weapons ({equippedWeapons.length}/{weaponLimits.max})
                        </h3>
                        
                        {/* D&D Combat Usage Information */}
                        <div className="mb-4 text-sm text-blue-300 bg-blue-900/20 p-3 rounded">
                          <div className="font-medium mb-1">⚔️ D&D 5e Combat:</div>
                          <div className="text-xs space-y-1">
                            <div>• <strong>Melee weapons:</strong> Used when adjacent to enemies</div>
                            <div>• <strong>Ranged weapons:</strong> Used for distant targets (crossbows, bows)</div>
                            <div>• <strong>Two-handed weapons:</strong> Require both hands when attacking</div>
                            <div>• <strong>Switching:</strong> Free to draw/sheath weapons once per turn</div>
                          </div>
                        </div>
                        
                        {/* Show shield compatibility warning if relevant */}
                        {equippedArmor.some(armor => armor.type === 'Shield') && 
                         equippedWeapons.some(weapon => weapon.properties.includes('Two-handed')) && (
                          <div className="mb-3 text-sm text-orange-300 bg-orange-900/20 p-2 rounded">
                            ⚠️ Shield + Two-handed weapon: Can&apos;t use both simultaneously in combat
                          </div>
                        )}
                        
                        {/* Current Equipped Weapons */}
                        <div className="space-y-2 mb-4">
                          {equippedWeapons.map((weapon, index) => {
                            const isMagical = 'magicalName' in weapon;
                            const isProficient = canEquipWeapon(weapon, character.class);
                            const isTwoHanded = weapon.properties.includes('Two-handed');
                            
                            return (
                              <div key={index} className="bg-slate-600 p-3 rounded">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <div className="text-white font-medium">{weapon.name}</div>
                                      {weapon.category === 'Ranged' && (
                                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                          Ranged
                                        </span>
                                      )}
                                      {isTwoHanded && (
                                        <span className="text-xs bg-orange-900/50 text-orange-300 px-2 py-1 rounded">
                                          Two-handed
                                        </span>
                                      )}
                                      {isMagical && (
                                        <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                          {(weapon as MagicalWeapon).rarity}
                                        </span>
                                      )}
                                      {!isProficient && (
                                        <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                                          No Prof Bonus
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-slate-300 text-sm">
                                      {weapon.damage}{isMagical && (weapon as MagicalWeapon).damageBonus > 0 && `+${(weapon as MagicalWeapon).damageBonus}`} {weapon.damageType}
                                      {isMagical && (weapon as MagicalWeapon).attackBonus > 0 && (
                                        <span className="text-purple-300"> • +{(weapon as MagicalWeapon).attackBonus} to hit</span>
                                      )}
                                    </div>
                                    {!isProficient && (
                                      <div className="text-yellow-300 text-xs mt-1">
                                        ⚠️ No proficiency - won&apos;t add proficiency bonus to attacks
                                      </div>
                                    )}
                                    {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                                      <div className="text-purple-300 text-xs mt-1 italic">
                                        {(weapon as MagicalWeapon).magicalProperties}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleUnequipWeapon(index)}
                                      className="bg-slate-500 hover:bg-slate-400 text-white text-xs px-2 py-1 rounded"
                                    >
                                      Unequip
                                    </button>
                                    <button
                                      onClick={() => handleRemoveWeapon(index, true)}
                                      className="text-red-400 hover:text-red-300 transition-colors p-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Weapon Inventory Section */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Weapon Storage
                        <span className="text-xs bg-slate-600 text-slate-300 px-2 py-1 rounded">
                          Click &quot;Equip&quot; to use
                        </span>
                      </h3>
                      
                      {/* Add Magical Weapon Button */}
                      <button
                        onClick={() => setShowWeaponCreator(true)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
                      >
                        <Plus className="h-4 w-4" />
                        Create Magical Weapon
                      </button>

                      {/* Add Basic Weapon Selector */}
                      <div className="mb-4">
                        <div className="flex gap-2">
                          <select
                            value={selectedWeapon ? selectedWeapon.name : ""}
                            onChange={(e) => {
                              const weapon = WEAPONS.find(w => w.name === e.target.value);
                              setSelectedWeapon(weapon || null);
                            }}
                            className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                          >
                            <option value="">Select basic weapon to add...</option>
                            {WEAPONS.map(weapon => (
                              <option key={weapon.name} value={weapon.name}>
                                {weapon.name} ({weapon.damage} {weapon.damageType})
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => {
                              if (selectedWeapon) {
                                const updatedInventoryWeapons = [...inventoryWeapons, selectedWeapon];
                                setInventoryWeapons(updatedInventoryWeapons);
                                updateCharacter({ inventoryWeapons: updatedInventoryWeapons });
                                setSelectedWeapon(null);
                              }
                            }}
                            disabled={!selectedWeapon}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium"
                          >
                            Add Weapon
                          </button>
                        </div>
                      </div>
                      
                      {/* Weapons in Storage */}
                      <div className="space-y-2">
                        {inventoryWeapons && inventoryWeapons.length > 0 ? inventoryWeapons.map((weapon, index) => {
                          const isMagical = 'magicalName' in weapon;
                          const isProficient = canEquipWeapon(weapon, character.class);
                          const atLimit = equippedWeapons.length >= weaponLimits.max;
                          
                          return (
                            <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-orange-500">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <div className="text-white font-medium">{weapon.name}</div>
                                    {isMagical && (
                                      <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                        {(weapon as MagicalWeapon).rarity}
                                      </span>
                                    )}
                                    {!isProficient && (
                                      <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                                        No Prof Bonus
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-300 text-sm">
                                    {weapon.damage}{isMagical && (weapon as MagicalWeapon).damageBonus > 0 && `+${(weapon as MagicalWeapon).damageBonus}`} {weapon.damageType}
                                    {isMagical && (weapon as MagicalWeapon).attackBonus > 0 && (
                                      <span className="text-purple-300"> • +{(weapon as MagicalWeapon).attackBonus} to hit</span>
                                    )}
                                  </div>
                                  {!isProficient && (
                                    <div className="text-yellow-300 text-xs mt-1">
                                      ⚠️ No proficiency - won&apos;t add proficiency bonus to attacks
                                    </div>
                                  )}
                                  {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                                    <div className="text-purple-300 text-xs mt-1 italic">
                                      {(weapon as MagicalWeapon).magicalProperties}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEquipWeapon(weapon, index)}
                                    disabled={atLimit}
                                    className="bg-green-600 hover:bg-green-700 disabled:bg-slate-500 disabled:opacity-50 text-white text-sm px-3 py-1 rounded font-medium"
                                    title={atLimit ? "At weapon limit" : "Equip weapon"}
                                  >
                                    {atLimit ? "Limit Reached" : "Equip"}
                                  </button>
                                  <button
                                    onClick={() => handleRemoveWeapon(index, false)}
                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }) : (
                          <div className="text-center py-6 border-2 border-dashed border-slate-600 rounded-lg">
                            <Sword className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">No weapons in storage</p>
                            <p className="text-slate-600 text-xs">Create magical weapons above</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spells Section */}
                    {displayCharacter.spellsKnown && displayCharacter.spellsKnown.length > 0 && (
                      <div className="bg-slate-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Spells
                          </h3>
                          {canPrepareSpells(character.class) && (
                            <button
                              onClick={handleOpenSpellPreparation}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded font-medium transition-colors"
                              title="Change prepared spells"
                            >
                              Prepare Spells
                            </button>
                          )}
                        </div>
                        
                        {displayCharacter.spellSaveDC && (
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="text-slate-300">
                              <strong>Spell Save DC:</strong> {displayCharacter.spellSaveDC}
                            </div>
                            <div className="text-slate-300">
                              <strong>Spell Attack:</strong> +{displayCharacter.spellAttackBonus}
                            </div>
                          </div>
                        )}
                        
                        {/* Show preparation status for preparation-based casters */}
                        {canPrepareSpells(character.class) && (
                          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                            <div className="text-blue-300 text-sm">
                              <strong>Prepared Spells:</strong> {(displayCharacter.spellsPrepared || []).filter(s => s.level > 0).length} / {
                                getSpellsPreparedCount(
                                  character.class, 
                                  character.level, 
                                  getModifier(displayCharacter[displayCharacter.spellcastingAbility as keyof typeof displayCharacter] as number)
                                )
                              }
                            </div>
                            <div className="text-blue-200 text-xs mt-1">
                              You can change prepared spells during a long rest
                            </div>
                          </div>
                        )}
                        
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {displayCharacter.spellsKnown?.map((spell, index) => {
                            const isPrepared = displayCharacter.spellsPrepared?.some(s => s.name === spell.name);
                            const requiresPreparation = canPrepareSpells(character.class) && spell.level > 0;
                            
                            return (
                              <div 
                                key={index} 
                                className={`bg-slate-600 p-3 rounded ${requiresPreparation && !isPrepared ? 'opacity-60' : ''}`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-medium">{spell.name}</span>
                                  <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                    {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                  </span>
                                  {requiresPreparation && (
                                    <span className={`text-xs px-2 py-1 rounded ${
                                      isPrepared 
                                        ? 'bg-green-900/50 text-green-300' 
                                        : 'bg-gray-900/50 text-gray-400'
                                    }`}>
                                      {isPrepared ? 'Prepared' : 'Not Prepared'}
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-xs mb-1">
                                  {spell.school} • {spell.castingTime} • {spell.range}
                                </div>
                                <p className="text-slate-300 text-sm">{spell.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Armor */}
                  <div className="space-y-6">
                    {/* Armor Section */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Armor & Protection
                      </h3>
                      
                      {/* Current Armor */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-slate-300">Equipped</h4>
                        {equippedArmor && equippedArmor.length > 0 ? equippedArmor.map((armor, index) => (
                          <div key={index} className="bg-slate-600 p-3 rounded">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <div className="text-white font-medium">{armor.name}</div>
                                  <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                    {armor.type}
                                  </span>
                                </div>
                                <div className="text-slate-300 text-sm">
                                  AC {armor.type === 'Shield' ? `+${armor.baseAC}` : armor.baseAC}
                                  {armor.maxDexBonus !== undefined && ` (Max Dex +${armor.maxDexBonus})`}
                                  {armor.minStrength && ` • Str ${armor.minStrength}`}
                                  {armor.stealthDisadvantage && ` • Stealth Disadvantage`}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleUnequipArmor(index)}
                                  className="bg-slate-500 hover:bg-slate-400 text-white text-xs px-2 py-1 rounded"
                                >
                                  Unequip
                                </button>
                                <button
                                  onClick={() => handleRemoveArmor(index, true)}
                                  className="text-red-400 hover:text-red-300 transition-colors p-1"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <p className="text-slate-500 text-sm italic">No armor equipped</p>
                        )}
                      </div>

                      {/* Armor in Storage */}
                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium text-slate-300">Storage</h4>
                        {inventoryArmor && inventoryArmor.length > 0 ? inventoryArmor.map((armor, index) => {
                          const canEquip = canEquipArmor(armor.type, character.class);
                          const hasStrengthReq = !armor.minStrength || character.strength >= armor.minStrength;
                          
                          return (
                            <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-orange-500">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <div className="text-white font-medium">{armor.name}</div>
                                    <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                      {armor.type}
                                    </span>
                                    {!canEquip && (
                                      <span className="text-xs bg-red-900/50 text-red-300 px-2 py-1 rounded">
                                        No Proficiency
                                      </span>
                                    )}
                                    {!hasStrengthReq && (
                                      <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                                        Str Req: {armor.minStrength}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-slate-300 text-sm">{armor.description}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleEquipArmor(armor, index)}
                                    disabled={!canEquip || !hasStrengthReq}
                                    className="bg-green-600 hover:bg-green-700 disabled:bg-slate-500 disabled:opacity-50 text-white text-sm px-3 py-1 rounded font-medium"
                                    title={!canEquip ? "Class cannot use this armor" : !hasStrengthReq ? "Insufficient strength" : "Equip armor"}
                                  >
                                    {!canEquip ? "Can't Use" : !hasStrengthReq ? "Too Heavy" : "Equip"}
                                  </button>
                                  <button
                                    onClick={() => handleRemoveArmor(index, false)}
                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }) : (
                          <div className="text-center py-4 border-2 border-dashed border-slate-600 rounded-lg">
                            <Shield className="h-6 w-6 text-slate-500 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">No armor in storage</p>
                            <p className="text-slate-600 text-xs">Add armor below to get started</p>
                          </div>
                        )}
                      </div>

                      {/* Add New Armor Section */}
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Plus className="h-5 w-5" />
                          Add New Armor
                        </h3>
                        <p className="text-slate-400 text-sm mb-3">Add armor to your inventory from the equipment database</p>
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAddArmorFromEquipment(e.target.value);
                              e.target.value = "";
                            }
                          }}
                          className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                        >
                          <option value="">Select armor to add to inventory...</option>
                          {ARMOR.map(armor => (
                            <option key={armor.name} value={armor.name}>
                              {armor.name} - {armor.cost} ({armor.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Enhanced AC Display */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Armor Class Calculator
                      </h3>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          {calculateArmorClass(equippedArmor, character.dexterity)}
                        </div>
                        <div className="text-sm text-slate-400">
                          Base: {equippedArmor.find(a => a.type !== 'Shield')?.baseAC || 10}
                          {equippedArmor.find(a => a.type !== 'Shield')?.maxDexBonus !== undefined 
                            ? ` + Dex (max +${equippedArmor.find(a => a.type !== 'Shield')?.maxDexBonus})`
                            : ` + Dex ${getModifier(character.dexterity) >= 0 ? '+' : ''}${getModifier(character.dexterity)}`
                          }
                          {equippedArmor.find(a => a.type === 'Shield') && ` + Shield +${equippedArmor.find(a => a.type === 'Shield')?.baseAC}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "inventory" && (
              <div className="p-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - General Inventory */}
                  <div className="space-y-6">
                    {/* General Inventory Section */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        General Items & Tools
                      </h3>
                      
                      {/* Add Item Controls */}
                      <div className="mb-4 space-y-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setAddMode("equipment")}
                            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                              addMode === "equipment" 
                                ? "bg-purple-600 text-white" 
                                : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                            }`}
                          >
                            Equipment
                          </button>
                          <button
                            onClick={() => setAddMode("custom")}
                            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                              addMode === "custom" 
                                ? "bg-purple-600 text-white" 
                                : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                            }`}
                          >
                            Custom
                          </button>
                        </div>

                        {addMode === "equipment" ? (
                          <div className="space-y-2">
                            <select
                              value={selectedCategory}
                              onChange={(e) => setSelectedCategory(e.target.value)}
                              className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                            >
                              {EQUIPMENT_CATEGORIES.filter(cat => cat !== 'Armor').map(category => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                            <div className="flex gap-2">
                              <select
                                value={selectedEquipment}
                                onChange={(e) => setSelectedEquipment(e.target.value)}
                                className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                              >
                                <option value="">Select item...</option>
                                {getEquipmentByCategory(selectedCategory).filter(equipment => equipment.type !== 'Armor').map(equipment => (
                                  <option key={equipment.name} value={equipment.name}>
                                    {equipment.name} ({equipment.cost})
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={handleAddItem}
                                disabled={!selectedEquipment}
                                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newItem}
                              onChange={(e) => setNewItem(e.target.value)}
                              placeholder="Enter custom item name..."
                              className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                            />
                            <button
                              onClick={handleAddItem}
                              disabled={!newItem.trim()}
                              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Inventory Items */}
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {inventory.map((item, index) => (
                          <div key={index} className="bg-slate-600 p-3 rounded flex items-center justify-between">
                            <div className="flex-1">
                              <span className="text-white font-medium">{item.name}</span>
                              {item.quantity > 1 && (
                                <span className="text-slate-400 text-sm ml-2">x{item.quantity}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(index, -1)}
                                className="w-6 h-6 bg-slate-500 hover:bg-slate-400 rounded text-white text-xs"
                              >
                                <Minus className="h-3 w-3 mx-auto" />
                              </button>
                              <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(index, 1)}
                                className="w-6 h-6 bg-slate-500 hover:bg-slate-400 rounded text-white text-xs"
                              >
                                <Plus className="h-3 w-3 mx-auto" />
                              </button>
                              <button
                                onClick={() => handleRemoveItem(index)}
                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                        {inventory.length === 0 && (
                          <div className="text-center py-6 border-2 border-dashed border-slate-600 rounded-lg">
                            <Package className="h-8 w-8 text-slate-500 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">No items in inventory</p>
                            <p className="text-slate-600 text-xs">Add equipment or custom items above</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Money & Treasures */}
                  <div className="space-y-6">
                    {/* Money */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Coins className="h-5 w-5 text-yellow-400" />
                        Money
                      </h3>
                      <div className="space-y-3">
                        {/* Gold */}
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 font-medium">Gold Pieces</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMoneyChange('gold', -1)}
                              disabled={goldPieces <= 0}
                              className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                            >
                              <Minus className="h-3 w-3 mx-auto" />
                            </button>
                            <span className="text-white font-bold w-8 text-center">{goldPieces}</span>
                            <button
                              onClick={() => handleMoneyChange('gold', 1)}
                              className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded text-white text-sm"
                            >
                              <Plus className="h-3 w-3 mx-auto" />
                            </button>
                          </div>
                        </div>
                        {/* Silver */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 font-medium">Silver Pieces</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMoneyChange('silver', -1)}
                              disabled={silverPieces <= 0}
                              className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                            >
                              <Minus className="h-3 w-3 mx-auto" />
                            </button>
                            <span className="text-white font-bold w-8 text-center">{silverPieces}</span>
                            <button
                              onClick={() => handleMoneyChange('silver', 1)}
                              className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded text-white text-sm"
                            >
                              <Plus className="h-3 w-3 mx-auto" />
                            </button>
                          </div>
                        </div>
                        {/* Copper */}
                        <div className="flex items-center justify-between">
                          <span className="text-orange-400 font-medium">Copper Pieces</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMoneyChange('copper', -1)}
                              disabled={copperPieces <= 0}
                              className="w-6 h-6 bg-slate-600 hover:bg-slate-500 disabled:opacity-50 rounded text-white text-sm"
                            >
                              <Minus className="h-3 w-3 mx-auto" />
                            </button>
                            <span className="text-white font-bold w-8 text-center">{copperPieces}</span>
                            <button
                              onClick={() => handleMoneyChange('copper', 1)}
                              className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded text-white text-sm"
                            >
                              <Plus className="h-3 w-3 mx-auto" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Treasures */}
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-400" />
                        Treasures & Valuables
                      </h3>
                      
                      {/* Add Treasure Mode Toggle */}
                      <div className="flex gap-1 mb-4">
                        <button
                          onClick={() => setTreasureAddMode("common")}
                          className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors ${
                            treasureAddMode === "common" 
                              ? "bg-purple-600 text-white" 
                              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                          }`}
                        >
                          Common
                        </button>
                        <button
                          onClick={() => setTreasureAddMode("story")}
                          className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors ${
                            treasureAddMode === "story" 
                              ? "bg-purple-600 text-white" 
                              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                          }`}
                        >
                          Story
                        </button>
                        <button
                          onClick={() => setTreasureAddMode("custom")}
                          className={`flex-1 py-2 px-2 rounded text-xs font-medium transition-colors ${
                            treasureAddMode === "custom" 
                              ? "bg-purple-600 text-white" 
                              : "bg-slate-600 text-slate-300 hover:bg-slate-500"
                          }`}
                        >
                          Custom
                        </button>
                      </div>

                      {/* Add Treasure */}
                      {(treasureAddMode === "common" || treasureAddMode === "story") ? (
                        <div className="flex gap-2 mb-4">
                          <select
                            value={selectedTreasure}
                            onChange={(e) => setSelectedTreasure(e.target.value)}
                            className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                          >
                            <option value="">Select treasure...</option>
                            {(treasureAddMode === "common" ? COMMON_TREASURES : STORY_TREASURES).map(treasure => (
                              <option key={treasure.name} value={treasure.name}>
                                {treasure.name} ({treasure.value} gp)
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={handleAddTreasure}
                            disabled={!selectedTreasure}
                            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 mb-4">
                          <input
                            type="text"
                            value={newTreasureName}
                            onChange={(e) => setNewTreasureName(e.target.value)}
                            placeholder="Treasure name..."
                            className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                          />
                          <div className="flex gap-2">
                            <input
                              type="number"
                              value={newTreasureValue}
                              onChange={(e) => setNewTreasureValue(e.target.value)}
                              placeholder="Value in gold..."
                              className="flex-1 bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white text-sm focus:border-purple-500 focus:outline-none"
                            />
                            <button
                              onClick={handleAddTreasure}
                              disabled={!newTreasureName.trim() || !newTreasureValue.trim()}
                              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Treasure List */}
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {treasures.map((treasure, index) => (
                          <div key={index} className="bg-slate-600 p-3 rounded flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-300 text-sm">💎 {treasure.name}</span>
                                <span className="text-yellow-400 text-sm font-medium">{treasure.value} gp</span>
                              </div>
                              {treasure.description && (
                                <div className="text-xs text-slate-500 mt-1">{treasure.description}</div>
                              )}
                            </div>
                            <button
                              onClick={() => handleRemoveTreasure(index)}
                              className="text-red-400 hover:text-red-300 transition-colors p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {treasures.length === 0 && (
                          <p className="text-slate-500 text-sm italic">No treasures collected</p>
                        )}
                      </div>

                      {/* Total Treasure Value */}
                      {treasures.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300 font-medium">Total Treasure Value:</span>
                            <span className="text-yellow-400 font-bold">
                              {treasures.reduce((total, treasure) => total + treasure.value, 0)} gp
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Magical Weapon Creator Modal */}
      {showWeaponCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Create Magical Weapon</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Base Weapon</label>
                <select
                  value={selectedBaseWeapon}
                  onChange={(e) => setSelectedBaseWeapon(e.target.value)}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select base weapon...</option>
                  {WEAPONS.map(weapon => (
                    <option key={weapon.name} value={weapon.name}>
                      {weapon.name} ({weapon.damage} {weapon.damageType})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Magical Enhancement</label>
                <select
                  value={selectedMagicalTemplate}
                  onChange={(e) => setSelectedMagicalTemplate(e.target.value)}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select enhancement...</option>
                  {MAGICAL_WEAPON_TEMPLATES.map(template => (
                    <option key={template.name} value={template.name}>
                      {template.name} ({template.rarity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Custom Name (Optional)</label>
                <input
                  type="text"
                  value={customWeaponName}
                  onChange={(e) => setCustomWeaponName(e.target.value)}
                  placeholder="e.g., 'Dawnbreaker' or leave empty for default"
                  className="w-full bg-slate-600 border border-slate-500 rounded px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              {selectedMagicalTemplate && (
                <div className="bg-slate-700 p-3 rounded">
                  <div className="text-xs text-slate-400 mb-1">Enhancement Description:</div>
                  <div className="text-sm text-slate-300">
                    {MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate)?.description}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowWeaponCreator(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMagicalWeapon}
                disabled={!selectedBaseWeapon || !selectedMagicalTemplate}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded transition-colors"
              >
                Create Weapon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        characterName={character.name}
        onConfirm={handleDeleteCharacter}
        onCancel={() => setShowDeleteDialog(false)}
        isDeleting={isDeleting}
      />

      {/* Level Up Modal */}
      {showLevelUpModal && (
        <LevelUpModal
          character={displayCharacter}
          onClose={() => setShowLevelUpModal(false)}
          onLevelUp={handleLevelUp}
        />
      )}

      {/* Spell Preparation Modal */}
      {showSpellPreparationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-600">
              <div>
                <h3 className="text-xl font-semibold text-white">Prepare Spells</h3>
                <p className="text-slate-400 text-sm">
                  Choose spells to prepare for the day ({tempPreparedSpells.filter(s => s.level > 0).length} / {
                    (() => {
                      const spellcastingAbility = currentCharacter.spellcastingAbility || 'intelligence';
                      const abilityValue = currentCharacter[spellcastingAbility as keyof typeof currentCharacter] as number || 10;
                      const abilityModifier = getModifier(abilityValue);
                      return getSpellsPreparedCount(currentCharacter.class, currentCharacter.level, abilityModifier);
                    })()
                  } prepared) • Cantrips are always available
                </p>
              </div>
              <button
                onClick={() => setShowSpellPreparationModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Spell Selection */}
              {(() => {
                const spellcastingType = getSpellcastingType(currentCharacter.class);
                const availableSpells = spellcastingType === 'spellbook' 
                  ? (currentCharacter.spellsKnown || [])  // Wizards prepare from spellbook
                  : getClassSpells(currentCharacter.class, currentCharacter.level); // Clerics/Druids from class list
                
                // Group spells by level
                const spellsByLevel: Record<number, Spell[]> = {};
                availableSpells.forEach(spell => {
                  if (!spellsByLevel[spell.level]) {
                    spellsByLevel[spell.level] = [];
                  }
                  spellsByLevel[spell.level].push(spell);
                });
                
                return (
                  <div className="space-y-6">
                    {/* Explanation */}
                    <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                      <p className="text-blue-300 text-sm">
                        {spellcastingType === 'spellbook' 
                          ? 'As a Wizard, you prepare spells from your spellbook. Cantrips are always available.'
                          : `As a ${currentCharacter.class}, you can prepare spells from your entire spell list. Cantrips are always available.`
                        }
                      </p>
                    </div>
                    
                    {Object.entries(spellsByLevel)
                      .sort(([a], [b]) => parseInt(a) - parseInt(b))
                      .map(([level, spells]) => (
                      <div key={level}>
                        <h4 className="text-lg font-medium text-white mb-3">
                          {level === '0' ? 'Cantrips' : `Level ${level} Spells`}
                        </h4>
                        <div className="space-y-2">
                          {spells.map((spell, index) => {
                            const isSelected = tempPreparedSpells.some(s => s.name === spell.name);
                            const isCantrip = spell.level === 0;
                            const spellcastingAbility = currentCharacter.spellcastingAbility || 'intelligence';
                            const abilityValue = currentCharacter[spellcastingAbility as keyof typeof currentCharacter] as number || 10;
                            const abilityModifier = getModifier(abilityValue);
                            const maxPrepared = getSpellsPreparedCount(
                              currentCharacter.class, 
                              currentCharacter.level, 
                              abilityModifier
                            );
                            // Count only non-cantrip spells toward the preparation limit
                            const currentNonCantripsPrepared = tempPreparedSpells.filter(s => s.level > 0).length;
                            const canSelect = isSelected || isCantrip || currentNonCantripsPrepared < maxPrepared;
                            
                            // Debug logging
                            if (index === 0 && level !== '0') {
                              console.log('Spell preparation debug:', {
                                spellName: spell.name,
                                spellLevel: spell.level,
                                isCantrip,
                                isSelected,
                                tempPreparedLength: tempPreparedSpells.length,
                                maxPrepared,
                                abilityModifier,
                                spellcastingAbility,
                                abilityValue,
                                canSelect
                              });
                            }
                            
                            return (
                              <div
                                key={index}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                  isSelected 
                                    ? 'border-green-500 bg-green-900/20' 
                                    : canSelect 
                                      ? 'border-slate-600 hover:border-blue-400 bg-slate-700'
                                      : 'border-slate-600 bg-slate-700 opacity-50 cursor-not-allowed'
                                }`}
                                onClick={() => {
                                  // Allow all spells to be clicked
                                  if (canSelect) {
                                    handleTogglePreparedSpell(spell);
                                    if (isCantrip) {
                                      console.log('Cantrip toggled - always available regardless');
                                    }
                                  } else {
                                    console.log('Spell not selectable:', { 
                                      canSelect, 
                                      maxPrepared, 
                                      currentNonCantrips: currentNonCantripsPrepared,
                                      totalPrepared: tempPreparedSpells.length,
                                      isCantrip,
                                      spellLevel: spell.level
                                    });
                                  }
                                }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-white font-medium">{spell.name}</span>
                                    <span className="text-xs bg-slate-600 px-2 py-1 rounded">
                                      {spell.school}
                                    </span>
                                    {isCantrip && (
                                      <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                                        Always Available
                                      </span>
                                    )}
                                  </div>
                                  {!isCantrip && (
                                    <span className={`text-xs px-2 py-1 rounded ${
                                      isSelected 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-slate-600 text-slate-300'
                                    }`}>
                                      {isSelected ? 'Prepared' : 'Prepare'}
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-xs mb-2">
                                  {spell.castingTime} • {spell.range} • {spell.duration}
                                </div>
                                <div className="text-slate-300 text-sm">
                                  {spell.description}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-600">
              <button
                onClick={handleSaveSpellPreparation}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
              >
                Save Prepared Spells
              </button>
              <button
                onClick={() => setShowSpellPreparationModal(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 