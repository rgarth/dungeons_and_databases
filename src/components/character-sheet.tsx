"use client";

import { User, BarChart3, Swords, X, Trash2, Package, Coins, TrendingUp, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { getModifier } from "@/lib/dnd/core";
import { Spell, getClassSpells } from "@/lib/dnd/spells";
import { Weapon, MagicalWeapon, InventoryItem, WEAPONS, MAGICAL_WEAPON_TEMPLATES, createMagicalWeapon, Armor, calculateArmorClass } from "@/lib/dnd/equipment";
import { Action, canEquipArmor } from "@/lib/dnd/combat";
import { Treasure } from "@/lib/dnd/data";
import { MagicalItem, EquippedMagicalItem, applyMagicalItemEffects } from "@/lib/dnd/magical-items";
import { ActiveCondition } from "@/lib/dnd/conditions";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { LevelUpWizard } from "./character-sheet/LevelUpWizard";
import { getSpellcastingType, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import { StatsTab, ActionsTab, GearTab, InventoryTab, BackgroundTab } from "./character-sheet/";


interface CharacterSheetProps {
  character: {
    id: string;
    name: string;
    race: string;
    class: string;
    subclass?: string;
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
    magicalItems?: EquippedMagicalItem[];
    inventoryMagicalItems?: MagicalItem[];
    attunedItems?: string[];
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
    avatar?: string | null;
    inspiration?: boolean;
    languages?: string[];
    conditions?: ActiveCondition[];
    equippedWeapons?: (Weapon | MagicalWeapon)[];
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
  };
  onClose: () => void;
  onCharacterDeleted?: () => void;
  onCharacterUpdated?: () => void;
}

export function CharacterSheet({ character, onClose, onCharacterDeleted, onCharacterUpdated }: CharacterSheetProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showSpellPreparationModal, setShowSpellPreparationModal] = useState(false);
  const [tempPreparedSpells, setTempPreparedSpells] = useState<Spell[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(character);
  
  // Sync currentCharacter with character prop when it changes (important for reopening characters)
  useEffect(() => {
    setCurrentCharacter(character);
  }, [character]);
  
  // Sync all other state variables with character prop changes
  useEffect(() => {
    setCopperPieces(character.copperPieces || 0);
    setSilverPieces(character.silverPieces || 0);
    setGoldPieces(character.goldPieces || 0);
    setTreasures(character.treasures || []);
    
    setInventoryWeapons(() => {
      if (!character.inventoryWeapons || !Array.isArray(character.inventoryWeapons)) {
        return [];
      }
      return character.inventoryWeapons.map(weapon => {
        if (typeof weapon === 'object' && weapon.name) {
          return weapon;
        }
        return weapon;
      });
    });
    
    setEquippedWeapons(character.weapons || []);
    setInventoryArmor(character.inventoryArmor || []);
    setEquippedArmor(character.armor || []);
    
    // Initialize magical items state
    setEquippedMagicalItems(character.magicalItems || []);
    setInventoryMagicalItems(character.inventoryMagicalItems || []);
    setAttunedItems(character.attunedItems || []);
    
    setInventory(() => {
      if (!character.inventory) return [];
      
      if (character.inventory.length > 0 && typeof character.inventory[0] === 'object' && 'quantity' in character.inventory[0]) {
        return character.inventory as InventoryItem[];
      }
      
      return (character.inventory as string[]).map(name => ({ name, quantity: 1 }));
    });
  }, [character]);
  
  // Use currentCharacter instead of character throughout the component
  const displayCharacter = currentCharacter;
  
  const [activeTab, setActiveTab] = useState<"stats" | "actions" | "gear" | "inventory" | "background">("stats");
  const [showWeaponCreator, setShowWeaponCreator] = useState(false);
  const [selectedBaseWeapon, setSelectedBaseWeapon] = useState("");
  const [selectedMagicalTemplate, setSelectedMagicalTemplate] = useState("");
  const [customWeaponName, setCustomWeaponName] = useState("");
  const [copperPieces, setCopperPieces] = useState(0);
  const [silverPieces, setSilverPieces] = useState(0);
  const [goldPieces, setGoldPieces] = useState(0);
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  
  // Debug logging for character data
  console.log('CharacterSheet rendered with character:', {
    id: character.id,
    name: character.name,
    inventoryWeapons: character.inventoryWeapons,
    inventoryArmor: character.inventoryArmor,
    equippedWeapons: character.equippedWeapons,
    armor: character.armor
  });
  
  const [inventoryWeapons, setInventoryWeapons] = useState<(Weapon | MagicalWeapon)[]>([]);
  const [equippedWeapons, setEquippedWeapons] = useState<(Weapon | MagicalWeapon)[]>([]);
  const [inventoryArmor, setInventoryArmor] = useState<Armor[]>([]);
  const [equippedArmor, setEquippedArmor] = useState<Armor[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [equippedMagicalItems, setEquippedMagicalItems] = useState<EquippedMagicalItem[]>([]);
  const [inventoryMagicalItems, setInventoryMagicalItems] = useState<MagicalItem[]>([]);
  const [attunedItems, setAttunedItems] = useState<string[]>([]);

  // Calculate stats with magical item effects
  const baseStats = {
    strength: displayCharacter.strength,
    dexterity: displayCharacter.dexterity,
    constitution: displayCharacter.constitution,
    intelligence: displayCharacter.intelligence,
    wisdom: displayCharacter.wisdom,
    charisma: displayCharacter.charisma,
    ac: displayCharacter.armorClass,
    speed: displayCharacter.speed
  };
  
  const modifiedStats = applyMagicalItemEffects(baseStats, equippedMagicalItems);
  
  // Calculate dynamic armor class based on equipped armor and magical items
  let currentArmorClass: number;
  
  // Check if any magical item sets a base AC (like Robe of the Archmagi)
  if (modifiedStats.ac_base && modifiedStats.ac_base > 0) {
    // Use magical base AC + Dex modifier
    const dexMod = Math.floor((modifiedStats.dexterity - 10) / 2);
    currentArmorClass = modifiedStats.ac_base + dexMod;
  } else {
    // Use regular armor calculation
    currentArmorClass = calculateArmorClass(equippedArmor, modifiedStats.dexterity);
  }
  
  // Add any AC bonuses from magical items
  currentArmorClass += (modifiedStats.ac - baseStats.ac);

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
    magicalItems?: EquippedMagicalItem[];
    inventoryMagicalItems?: MagicalItem[];
    attunedItems?: string[];
    hitPoints?: number;
    temporaryHitPoints?: number;
    spellsPrepared?: Spell[];
    avatar?: string | null;
    appearance?: string;
    personality?: string;
    backstory?: string;
    notes?: string;
    inspiration?: boolean;
    languages?: string[];
    conditions?: ActiveCondition[];
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
  } | Record<string, unknown>) => {
    try {
      const response = await fetch(`/api/characters?id=${character.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        console.error('Failed to update character:', response.status, response.statusText);
      } else {
        // Notify parent component to refetch character data
        onCharacterUpdated?.();
      }
    } catch (error) {
      console.error('Error updating character:', error);
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
    if (equippedWeapons.length >= weaponLimits.maxEquipped) {
      alert(`Cannot equip more weapons (max ${weaponLimits.maxEquipped})`);
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

  // Magical Item handlers
  const handleEquipMagicalItem = (item: MagicalItem, fromInventoryIndex: number) => {
    const updatedEquippedItems = [...equippedMagicalItems, { ...item, isAttuned: false }];
    const updatedInventoryItems = inventoryMagicalItems.filter((_, i) => i !== fromInventoryIndex);
    
    setEquippedMagicalItems(updatedEquippedItems);
    setInventoryMagicalItems(updatedInventoryItems);
    updateCharacter({ 
      magicalItems: updatedEquippedItems,
      inventoryMagicalItems: updatedInventoryItems 
    });
  };

  const handleUnequipMagicalItem = (itemIndex: number) => {
    const itemToUnequip = equippedMagicalItems[itemIndex];
    const updatedEquippedItems = equippedMagicalItems.filter((_, i) => i !== itemIndex);
    const updatedInventoryItems = [...inventoryMagicalItems, itemToUnequip];
    const updatedAttunedItems = attunedItems.filter(name => name !== itemToUnequip.name);
    
    setEquippedMagicalItems(updatedEquippedItems);
    setInventoryMagicalItems(updatedInventoryItems);
    setAttunedItems(updatedAttunedItems);
    updateCharacter({ 
      magicalItems: updatedEquippedItems,
      inventoryMagicalItems: updatedInventoryItems,
      attunedItems: updatedAttunedItems
    });
  };

  const handleRemoveMagicalItem = (index: number, isEquipped: boolean = false) => {
    if (isEquipped) {
      const itemToRemove = equippedMagicalItems[index];
      const updatedEquippedItems = equippedMagicalItems.filter((_, i) => i !== index);
      const updatedAttunedItems = attunedItems.filter(name => name !== itemToRemove.name);
      
      setEquippedMagicalItems(updatedEquippedItems);
      setAttunedItems(updatedAttunedItems);
      updateCharacter({ 
        magicalItems: updatedEquippedItems,
        attunedItems: updatedAttunedItems
      });
    } else {
      const updatedInventoryItems = inventoryMagicalItems.filter((_, i) => i !== index);
      setInventoryMagicalItems(updatedInventoryItems);
      updateCharacter({ inventoryMagicalItems: updatedInventoryItems });
    }
  };

  const handleToggleAttunement = (itemName: string) => {
    const isCurrentlyAttuned = attunedItems.includes(itemName);
    let updatedAttunedItems: string[];
    let updatedEquippedItems = [...equippedMagicalItems];

    if (isCurrentlyAttuned) {
      // Remove attunement
      updatedAttunedItems = attunedItems.filter(name => name !== itemName);
      updatedEquippedItems = updatedEquippedItems.map(item => 
        item.name === itemName ? { ...item, isAttuned: false } : item
      );
    } else {
      // Add attunement (if possible)
      if (attunedItems.length < 3) {
        updatedAttunedItems = [...attunedItems, itemName];
        updatedEquippedItems = updatedEquippedItems.map(item => 
          item.name === itemName ? { ...item, isAttuned: true } : item
        );
      } else {
        return; // Cannot attune more than 3 items
      }
    }

    setAttunedItems(updatedAttunedItems);
    setEquippedMagicalItems(updatedEquippedItems);
    updateCharacter({ 
      attunedItems: updatedAttunedItems,
      magicalItems: updatedEquippedItems
    });
  };

  const handleAddMagicalItem = (item: MagicalItem) => {
    const updatedInventoryItems = [...inventoryMagicalItems, item];
    setInventoryMagicalItems(updatedInventoryItems);
    updateCharacter({ inventoryMagicalItems: updatedInventoryItems });
  };

  const handleUpdateConditions = (conditions: ActiveCondition[]) => {
    setCurrentCharacter(prev => ({ ...prev, conditions }));
    updateCharacter({ conditions });
  };

  const handleUpdateDeathSaves = (successes: number, failures: number) => {
    setCurrentCharacter(prev => ({ ...prev, deathSaveSuccesses: successes, deathSaveFailures: failures }));
    updateCharacter({ deathSaveSuccesses: successes, deathSaveFailures: failures });
  };


  // Equipment state

  // Helper function to calculate weapon limits based on D&D 5e rules
  const getWeaponLimits = () => {
    const hasShield = equippedArmor.some(armor => armor.type === 'Shield');
    
    // In D&D 5e, you can carry multiple weapons and switch between them
    // The limitation is what you can actively use in combat, not what you can carry
    // We'll be more generous with carrying capacity but show warnings about hand usage
    
    if (hasShield) {
      // With shield: can carry multiple weapons but only use 1-handed weapons effectively
      return { 
        maxEquipped: 4,
        maxInventory: 10
      };
    } else {
      // Without shield: can carry multiple weapons and switch between them as needed
      return { 
        maxEquipped: 6,
        maxInventory: 15
      };
    }
  };
  
  const weaponLimits = getWeaponLimits();

  const handleLevelUp = async (updates: Record<string, unknown>) => {
    console.log('Applying level up updates:', updates);
    
    // Update local character state immediately
    setCurrentCharacter(prev => ({
      ...prev,
      ...updates
    } as typeof character));
    
    // Use centralized update function to ensure callback is triggered
    await updateCharacter(updates);
    
    // Close the modal
    setShowLevelUpModal(false);
    
    console.log('Level up completed successfully!');
  };

  const handleOpenSpellPreparation = () => {
    setTempPreparedSpells(currentCharacter.spellsPrepared || []);
    setShowSpellPreparationModal(true);
  };

  const handleUseSpellScroll = (scrollIndex: number) => {
    // Remove the spell scroll from inventory when used
    const updatedInventoryItems = inventoryMagicalItems.filter((_, i) => i !== scrollIndex);
    setInventoryMagicalItems(updatedInventoryItems);
    updateCharacter({ inventoryMagicalItems: updatedInventoryItems });
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
    // Update local character state
    setCurrentCharacter(prev => ({
      ...prev,
      spellsPrepared: tempPreparedSpells
    }));
    
    // Use centralized update function to ensure callback is triggered
    await updateCharacter({ spellsPrepared: tempPreparedSpells });
    
    setShowSpellPreparationModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
        <div className="bg-slate-800 rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <div className="flex items-center gap-4">
              {/* Avatar or default icon */}
              {displayCharacter.avatar ? (
                <img
                  src={`/avatars/${displayCharacter.avatar}`}
                  alt={`${displayCharacter.name} avatar`}
                  className="w-16 h-16 rounded-lg border-2 border-purple-400 object-cover"
                  onError={(e) => {
                    // Fallback to User icon if avatar fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <User className={`h-8 w-8 text-purple-400 ${displayCharacter.avatar ? 'hidden' : ''}`} />
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
                onClick={() => setShowLevelUpModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                title="Level Up"
              >
                <TrendingUp className="h-4 w-4" />
                Level Up
              </button>
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
          <div className="flex items-end border-b border-slate-700">
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
              onClick={() => setActiveTab("gear")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "gear"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Package className="h-4 w-4" />
              Gear & Spells
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
            <button
              onClick={() => setActiveTab("background")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === "background"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="h-4 w-4" />
              Background / Notes
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "stats" && (
              <StatsTab 
                character={displayCharacter}
                equippedArmor={equippedArmor}
                modifiedStats={modifiedStats}
                currentArmorClass={currentArmorClass}
                onUpdate={(updates) => {
                  setCurrentCharacter(prev => ({ ...prev, ...updates }));
                  updateCharacter(updates);
                }}
              />
            )}

            {activeTab === "actions" && (
              <ActionsTab
                character={displayCharacter}
                equippedWeapons={equippedWeapons}
                equippedMagicalItems={equippedMagicalItems}
                inventoryMagicalItems={inventoryMagicalItems}
                currentArmorClass={currentArmorClass}
                onOpenSpellPreparation={handleOpenSpellPreparation}
                onUseSpellScroll={handleUseSpellScroll}
                onUpdateConditions={handleUpdateConditions}
                onUpdateDeathSaves={handleUpdateDeathSaves}
              />
            )}

            {activeTab === "gear" && (
              <GearTab
                character={displayCharacter}
                equippedWeapons={equippedWeapons}
                inventoryWeapons={inventoryWeapons}
                equippedArmor={equippedArmor}
                inventoryArmor={inventoryArmor}
                equippedMagicalItems={equippedMagicalItems}
                inventoryMagicalItems={inventoryMagicalItems}
                attunedItems={attunedItems}
                onEquipWeapon={handleEquipWeapon}
                onUnequipWeapon={handleUnequipWeapon}
                onRemoveWeapon={handleRemoveWeapon}
                onEquipArmor={handleEquipArmor}
                onUnequipArmor={handleUnequipArmor}
                onRemoveArmor={handleRemoveArmor}
                onEquipMagicalItem={handleEquipMagicalItem}
                onUnequipMagicalItem={handleUnequipMagicalItem}
                onRemoveMagicalItem={handleRemoveMagicalItem}
                onToggleAttunement={handleToggleAttunement}
                onAddWeapon={(weapon) => {
                  const updatedInventoryWeapons = [...inventoryWeapons, weapon];
                  setInventoryWeapons(updatedInventoryWeapons);
                  updateCharacter({ inventoryWeapons: updatedInventoryWeapons });
                }}
                onAddArmor={(armor) => {
                  const updatedInventoryArmor = [...inventoryArmor, armor];
                  setInventoryArmor(updatedInventoryArmor);
                  updateCharacter({ inventoryArmor: updatedInventoryArmor });
                }}
                onAddMagicalItem={handleAddMagicalItem}
                onOpenSpellPreparation={handleOpenSpellPreparation}
                weaponLimits={weaponLimits}
              />
            )}

            {activeTab === "inventory" && (
              <InventoryTab
                inventory={inventory}
                copperPieces={copperPieces}
                silverPieces={silverPieces}
                goldPieces={goldPieces}
                treasures={treasures}
                onInventoryUpdate={(updatedInventory) => {
                  setInventory(updatedInventory);
                  updateCharacter({ inventory: updatedInventory });
                }}
                onMoneyUpdate={(updates) => {
                  if (updates.copperPieces !== undefined) setCopperPieces(updates.copperPieces);
                  if (updates.silverPieces !== undefined) setSilverPieces(updates.silverPieces);
                  if (updates.goldPieces !== undefined) setGoldPieces(updates.goldPieces);
                  updateCharacter(updates);
                }}
                onTreasuresUpdate={(updatedTreasures) => {
                  setTreasures(updatedTreasures);
                  updateCharacter({ treasures: updatedTreasures });
                }}
              />
            )}

            {activeTab === "background" && (
              <BackgroundTab
                character={displayCharacter}
                onUpdate={(updates) => {
                  setCurrentCharacter(prev => ({ ...prev, ...updates }));
                  updateCharacter(updates);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Magical Weapon Creator Modal */}
      {showWeaponCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
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

      {/* Level Up Wizard */}
      {showLevelUpModal && (
        <LevelUpWizard
          character={{
            ...displayCharacter,
            // Convert Spell[] to string[] for level-up service compatibility
            spellsKnown: displayCharacter.spellsKnown?.map(spell => spell.name),
            spellsPrepared: displayCharacter.spellsPrepared?.map(spell => spell.name)
          }}
          onClose={() => setShowLevelUpModal(false)}
          onLevelUp={handleLevelUp}
        />
      )}

      {/* Spell Preparation Modal */}
      {showSpellPreparationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
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