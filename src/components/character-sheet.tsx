"use client";

import { Heart, Shield, Zap, User, BookOpen, Sword, Package, Trash2, Plus, Minus, Coins, BarChart3, Swords } from "lucide-react";
import { useState, useEffect } from "react";
import { getModifier, getProficiencyBonus } from "@/lib/dnd/core";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, MagicalWeapon, InventoryItem, WEAPONS, MAGICAL_WEAPON_TEMPLATES, createMagicalWeapon, Armor, ARMOR, calculateArmorClass, EQUIPMENT, EQUIPMENT_CATEGORIES, getEquipmentByCategory } from "@/lib/dnd/equipment";
import { Action, canEquipWeapon, canEquipArmor } from "@/lib/dnd/combat";
import { Treasure, COMMON_TREASURES, STORY_TREASURES } from "@/lib/dnd/data";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";

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
    spells?: Spell[];
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
  const [isDeleting, setIsDeleting] = useState(false);
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
  const [inventoryWeapons, setInventoryWeapons] = useState<(Weapon | MagicalWeapon)[]>(character.inventoryWeapons || []);
  const [equippedWeapons, setEquippedWeapons] = useState<(Weapon | MagicalWeapon)[]>(
    character.equippedWeapons || []
  );
  const [inventoryArmor, setInventoryArmor] = useState<Armor[]>(character.inventoryArmor || []);
  const [equippedArmor, setEquippedArmor] = useState<Armor[]>(character.armor || []);
  
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

  // Run migration on component mount
  useEffect(() => {
    // Migrate armor
    const hasArmorInGeneralInventory = inventory.some(item => 
      ARMOR.find(armor => armor.name === item.name)
    );
    const hasArmorInArmorInventory = inventoryArmor.length > 0;
    
    if (hasArmorInGeneralInventory && !hasArmorInArmorInventory) {
      console.log('Migrating armor from general inventory to armor inventory...');
      migrateArmorFromInventory();
    }

    // Migrate weapons
    const hasWeaponsInGeneralInventory = inventory.some(item => 
      WEAPONS.find(weapon => weapon.name === item.name)
    );
    const hasWeaponsInWeaponInventory = inventoryWeapons.length > 0;
    
    if (hasWeaponsInGeneralInventory && !hasWeaponsInWeaponInventory) {
      console.log('Migrating weapons from general inventory to weapon inventory...');
      migrateWeaponsFromInventory();
    }
  }, [character.id]); // Only run when character changes

  const abilities = [
    { name: 'Strength', short: 'STR', value: character.strength },
    { name: 'Dexterity', short: 'DEX', value: character.dexterity },
    { name: 'Constitution', short: 'CON', value: character.constitution },
    { name: 'Intelligence', short: 'INT', value: character.intelligence },
    { name: 'Wisdom', short: 'WIS', value: character.wisdom },
    { name: 'Charisma', short: 'CHA', value: character.charisma },
  ];

  const proficiencyBonus = getProficiencyBonus(character.level);
  const hpPercentage = (character.hitPoints / character.maxHitPoints) * 100;
  
  // Calculate dynamic armor class based on equipped armor
  const currentArmorClass = calculateArmorClass(equippedArmor, character.dexterity);

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
    const hasShield = inventoryArmor.some(armor => armor.type === 'Shield' && equippedArmor.some(equipped => equipped.name === armor.name));
    const hasTwoHandedWeapon = equippedWeapons.some(weapon => weapon.properties.includes('Two-Handed'));
    
    if (hasShield) {
      return { max: 1, reason: "Shield equipped - only one weapon can be wielded" };
    } else if (hasTwoHandedWeapon) {
      return { max: 1, reason: "Two-handed weapon equipped" };
    } else {
      return { max: 2, reason: "Two hands available for weapons (two-weapon fighting possible)" };
    }
  };
  
  const weaponLimits = getWeaponLimits();

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-purple-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">{character.name}</h1>
                <p className="text-slate-300">
                  Level {character.level} {character.race} {character.class}
                  {character.background && ` • ${character.background}`}
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
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Core Stats */}
                <div className="space-y-6">
                  {/* Ability Scores */}
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Ability Scores
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {abilities.map((ability) => (
                        <div key={ability.short} className="bg-slate-600 rounded-lg p-3 text-center">
                          <div className="text-xs text-slate-400 font-medium mb-1">
                            {ability.short}
                          </div>
                          <div className="text-2xl font-bold text-white">{ability.value}</div>
                          <div className="text-sm text-slate-300">
                            {getModifier(ability.value) >= 0 ? '+' : ''}{getModifier(ability.value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Combat Stats */}
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sword className="h-5 w-5" />
                      Combat Stats
                    </h3>
                    <div className="space-y-4">
                      {/* Hit Points */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-300 flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-400" />
                            Hit Points
                          </span>
                          <span className="text-white font-semibold">
                            {character.hitPoints}/{character.maxHitPoints}
                          </span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div
                            className="bg-red-500 h-3 rounded-full transition-all"
                            style={{ width: `${hpPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Armor Class */}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-400" />
                          Armor Class
                        </span>
                        <span className="text-white font-semibold text-xl">{currentArmorClass}</span>
                      </div>

                      {/* Speed */}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Speed</span>
                        <span className="text-white font-semibold">{character.speed} ft</span>
                      </div>

                      {/* Proficiency Bonus */}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Proficiency Bonus</span>
                        <span className="text-white font-semibold">+{proficiencyBonus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {character.skills && character.skills.length > 0 && (
                    <div className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Skill Proficiencies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {character.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-lg text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Character Details */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Character Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-400 text-sm">Race:</span>
                        <p className="text-white">{character.race}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Class:</span>
                        <p className="text-white">{character.class}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-sm">Level:</span>
                        <p className="text-white">{character.level}</p>
                      </div>
                      {character.background && (
                        <div>
                          <span className="text-slate-400 text-sm">Background:</span>
                          <p className="text-white">{character.background}</p>
                        </div>
                      )}
                      {character.alignment && (
                        <div>
                          <span className="text-slate-400 text-sm">Alignment:</span>
                          <p className="text-white">{character.alignment}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Character Descriptions */}
                  {(character.appearance || character.personality || character.backstory || character.notes) && (
                    <div className="space-y-4">
                      {character.appearance && (
                        <div className="bg-slate-700 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-white mb-3">Appearance</h3>
                          <p className="text-slate-300 leading-relaxed">{character.appearance}</p>
                        </div>
                      )}

                      {character.personality && (
                        <div className="bg-slate-700 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-white mb-3">Personality</h3>
                          <p className="text-slate-300 leading-relaxed">{character.personality}</p>
                        </div>
                      )}

                      {character.backstory && (
                        <div className="bg-slate-700 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-white mb-3">Backstory</h3>
                          <p className="text-slate-300 leading-relaxed">{character.backstory}</p>
                        </div>
                      )}

                      {character.notes && (
                        <div className="bg-slate-700 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
                          <p className="text-slate-300 leading-relaxed">{character.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "actions" && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  
                  {/* Weapon Attacks */}
                  {equippedWeapons && equippedWeapons.length > 0 && (
                    <div className="bg-slate-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Sword className="h-6 w-6" />
                        Weapon Attacks
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {equippedWeapons.map((weapon, index) => {
                          const isMagical = 'magicalName' in weapon;
                          const isProficient = canEquipWeapon(weapon, character.class);
                          const abilityMod = weapon.category === 'Ranged' ? getModifier(character.dexterity) : getModifier(character.strength);
                          const profBonus = isProficient ? proficiencyBonus : 0;
                          const magicalAttackBonus = isMagical ? (weapon as MagicalWeapon).attackBonus || 0 : 0;
                          const magicalDamageBonus = isMagical ? (weapon as MagicalWeapon).damageBonus || 0 : 0;
                          const totalAttackBonus = abilityMod + profBonus + magicalAttackBonus;

                          // Extract range from properties
                          const rangeProperty = weapon.properties.find(prop => prop.includes('Ammunition') || prop.includes('Thrown'));
                          const weaponRange = rangeProperty ? rangeProperty : weapon.category === 'Melee' ? '5 ft' : 'Varies';

                          return (
                            <div key={index} className="bg-slate-600 p-4 rounded-lg border-l-4 border-red-500">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-white font-bold text-lg">{weapon.name}</span>
                                {isMagical && (
                                  <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                    {(weapon as MagicalWeapon).rarity}
                                  </span>
                                )}
                                {!isProficient && (
                                  <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
                                    No Proficiency
                                  </span>
                                )}
                              </div>
                              
                              {/* Attack Stats */}
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div className="text-center bg-slate-700 rounded p-2">
                                  <div className="text-2xl font-bold text-green-400">
                                    {totalAttackBonus >= 0 ? '+' : ''}{totalAttackBonus}
                                  </div>
                                  <div className="text-xs text-slate-400">Attack Bonus</div>
                                </div>
                                <div className="text-center bg-slate-700 rounded p-2">
                                  <div className="text-2xl font-bold text-red-400">
                                    {weapon.damage}{magicalDamageBonus > 0 && `+${magicalDamageBonus}`}
                                  </div>
                                  <div className="text-xs text-slate-400">{weapon.damageType} Damage</div>
                                </div>
                              </div>

                              {/* Attack Breakdown */}
                              <div className="text-xs text-slate-300 space-y-1">
                                <div>To Hit: 1d20 {abilityMod >= 0 ? '+' : ''}{abilityMod} ({weapon.category === 'Ranged' ? 'DEX' : 'STR'}) {profBonus > 0 && `+${profBonus} (Prof)`} {magicalAttackBonus > 0 && `+${magicalAttackBonus} (Magic)`}</div>
                                <div>Damage: {weapon.damage} + {abilityMod >= 0 ? '+' : ''}{abilityMod} ({weapon.category === 'Ranged' ? 'DEX' : 'STR'}) {magicalDamageBonus > 0 && `+${magicalDamageBonus} (Magic)`}</div>
                                <div className="text-slate-400">Range: {weaponRange} • {weapon.category} {weapon.type}</div>
                              </div>

                              {/* Magical Properties */}
                              {isMagical && (weapon as MagicalWeapon).magicalProperties && (
                                <div className="mt-3 p-2 bg-purple-900/20 rounded border border-purple-500/30">
                                  <div className="text-purple-300 text-xs font-medium mb-1">Magical Properties:</div>
                                  <div className="text-purple-200 text-xs">{(weapon as MagicalWeapon).magicalProperties}</div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Spell Slots & Spellcasting */}
                  {character.spellcastingAbility && character.spells && character.spells.length > 0 && (
                    <div className="bg-slate-700 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <Zap className="h-6 w-6" />
                        Spellcasting
                      </h3>
                      
                      {/* Spellcasting Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center bg-slate-600 rounded p-3">
                          <div className="text-xl font-bold text-blue-400">{character.spellSaveDC}</div>
                          <div className="text-xs text-slate-400">Spell Save DC</div>
                        </div>
                        <div className="text-center bg-slate-600 rounded p-3">
                          <div className="text-xl font-bold text-green-400">+{character.spellAttackBonus}</div>
                          <div className="text-xs text-slate-400">Spell Attack</div>
                        </div>
                        <div className="text-center bg-slate-600 rounded p-3">
                          <div className="text-xl font-bold text-purple-400">{character.spellcastingAbility?.toUpperCase()}</div>
                          <div className="text-xs text-slate-400">Casting Ability</div>
                        </div>
                      </div>

                      {/* Spell Slots */}
                      {character.spellSlots && Object.keys(character.spellSlots).length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-white mb-3">Spell Slots</h4>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            {Object.entries(character.spellSlots).map(([level, total]) => (
                              <div key={level} className="bg-slate-600 rounded p-3">
                                <div className="text-center">
                                  <div className="text-sm text-slate-400 mb-1">Level {level}</div>
                                  <div className="text-lg font-bold text-white">{total}</div>
                                  <div className="text-xs text-slate-400">Available</div>
                                </div>
                                {/* Spell slot dots for visual tracking */}
                                <div className="flex justify-center gap-1 mt-2">
                                  {Array.from({length: total}, (_, i) => (
                                    <div key={i} className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Known Spells */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Known Spells</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                          {character.spells.map((spell, index) => (
                            <div key={index} className="bg-slate-600 p-3 rounded border-l-4 border-blue-500">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-white font-medium">{spell.name}</span>
                                <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                  {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                </span>
                              </div>
                              <div className="text-slate-400 text-xs mb-2">
                                {spell.school} • {spell.castingTime} • {spell.range}
                              </div>
                              <div className="text-slate-300 text-xs">{spell.description}</div>
                              {spell.level === 0 && (
                                <div className="text-green-300 text-xs mt-1 font-medium">
                                  ✓ Unlimited Use
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Combat Actions Reference */}
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Swords className="h-6 w-6" />
                      Combat Actions Reference
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Actions */}
                      <div className="bg-slate-600 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-3 text-center">Actions</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          <div className="text-slate-300 text-sm">• Attack</div>
                          <div className="text-slate-300 text-sm">• Cast a Spell</div>
                          <div className="text-slate-300 text-sm">• Dash</div>
                          <div className="text-slate-300 text-sm">• Disengage</div>
                          <div className="text-slate-300 text-sm">• Dodge</div>
                          <div className="text-slate-300 text-sm">• Help</div>
                          <div className="text-slate-300 text-sm">• Hide</div>
                          <div className="text-slate-300 text-sm">• Ready</div>
                          <div className="text-slate-300 text-sm">• Search</div>
                          <div className="text-slate-300 text-sm">• Use an Object</div>
                          {character.actions?.filter(a => 
                            a.type === 'Action' && 
                            !['Attack', 'Cast a Spell', 'Dash', 'Disengage', 'Dodge', 'Help', 'Hide', 'Ready', 'Search', 'Use an Object'].includes(a.name)
                          ).map((action, i) => (
                            <div key={i} className="text-purple-300 text-sm">• {action.name}</div>
                          ))}
                        </div>
                      </div>

                      {/* Bonus Actions */}
                      <div className="bg-slate-600 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-3 text-center">Bonus Actions</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          <div className="text-slate-300 text-sm">• Off-hand Attack</div>
                          <div className="text-slate-300 text-sm">• Two-Weapon Fighting</div>
                          {character.bonusActions?.map((action, i) => (
                            <div key={i} className="text-yellow-300 text-sm">• {action.name}</div>
                          ))}
                        </div>
                      </div>

                      {/* Reactions */}
                      <div className="bg-slate-600 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-3 text-center">Reactions</h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          <div className="text-slate-300 text-sm">• Opportunity Attack</div>
                          {character.reactions?.map((action, i) => (
                            <div key={i} className="text-blue-300 text-sm">• {action.name}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center text-slate-400 text-sm">
                      Quick reference for available combat actions - no dice rolling here!
                    </div>
                  </div>

                  {/* Combat Stats Summary */}
                  <div className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <Shield className="h-6 w-6" />
                      Combat Summary
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center bg-slate-600 rounded p-3">
                        <div className="text-2xl font-bold text-blue-400">{currentArmorClass}</div>
                        <div className="text-xs text-slate-400">Armor Class</div>
                      </div>
                      <div className="text-center bg-slate-600 rounded p-3">
                        <div className="text-2xl font-bold text-red-400">{character.hitPoints}/{character.maxHitPoints}</div>
                        <div className="text-xs text-slate-400">Hit Points</div>
                      </div>
                      <div className="text-center bg-slate-600 rounded p-3">
                        <div className="text-2xl font-bold text-green-400">+{proficiencyBonus}</div>
                        <div className="text-xs text-slate-400">Proficiency</div>
                      </div>
                      <div className="text-center bg-slate-600 rounded p-3">
                        <div className="text-2xl font-bold text-yellow-400">{character.speed} ft</div>
                        <div className="text-xs text-slate-400">Speed</div>
                      </div>
                    </div>
                  </div>

                  {/* Empty State */}
                  {(!equippedWeapons || equippedWeapons.length === 0) && 
                   (!character.spells || character.spells.length === 0) && (
                    <div className="text-center py-12">
                      <Swords className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-slate-300 mb-2">No Combat Options</h3>
                      <p className="text-slate-500">Equip weapons or learn spells to see combat actions here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "equipment" && (
              <div className="p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Inventory & Weapons */}
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

                  {/* Right Column - Weapons and Spells */}
                  <div className="space-y-6">
                    {/* Equipped Weapons Section */}
                    {equippedWeapons && equippedWeapons.length > 0 && (
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Sword className="h-5 w-5" />
                          Equipped Weapons ({equippedWeapons.length}/{weaponLimits.max})
                        </h3>
                        
                        {/* Show weapon limits info */}
                        {weaponLimits.max < 2 && (
                          <div className="mb-3 text-sm text-orange-300 bg-orange-900/20 p-2 rounded">
                            ⚠️ {weaponLimits.reason}
                          </div>
                        )}
                        
                        {/* Current Equipped Weapons */}
                        <div className="space-y-2 mb-4">
                          {equippedWeapons.map((weapon, index) => {
                            const isMagical = 'magicalName' in weapon;
                            return (
                              <div key={index} className="bg-slate-600 p-3 rounded">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <div className="text-white font-medium">{weapon.name}</div>
                                      {isMagical && (
                                        <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                          {(weapon as MagicalWeapon).rarity}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-slate-300 text-sm">
                                      {weapon.damage}{isMagical && (weapon as MagicalWeapon).damageBonus > 0 && `+${(weapon as MagicalWeapon).damageBonus}`} {weapon.damageType}
                                      {isMagical && (weapon as MagicalWeapon).attackBonus > 0 && (
                                        <span className="text-purple-300"> • +{(weapon as MagicalWeapon).attackBonus} to hit</span>
                                      )}
                                    </div>
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
                    {character.spells && character.spells.length > 0 && (
                      <div className="bg-slate-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Spells
                        </h3>
                        {character.spellSaveDC && (
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="text-slate-300">
                              <strong>Spell Save DC:</strong> {character.spellSaveDC}
                            </div>
                            <div className="text-slate-300">
                              <strong>Spell Attack:</strong> +{character.spellAttackBonus}
                            </div>
                          </div>
                        )}
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {character.spells.map((spell, index) => (
                            <div key={index} className="bg-slate-600 p-3 rounded">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-medium">{spell.name}</span>
                                <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                                  {spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`}
                                </span>
                              </div>
                              <div className="text-slate-400 text-xs mb-1">
                                {spell.school} • {spell.castingTime} • {spell.range}
                              </div>
                              <p className="text-slate-300 text-sm">{spell.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "inventory" && (
              <div className="p-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <div className="space-y-2 max-h-64 overflow-y-auto">
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
    </>
  );
} 