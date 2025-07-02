"use client";

import { User, BarChart3, Swords, X, Trash2, Package, Coins, TrendingUp, FileText, Dices, ChevronDown, MoreVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getModifier } from "@/lib/dnd/core";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, MagicalWeapon, InventoryItem, MAGICAL_WEAPON_TEMPLATES, createMagicalWeapon, Armor, Ammunition, calculateArmorClass } from "@/lib/dnd/equipment";
import { Action, canEquipArmor } from "@/lib/dnd/combat";
import { useCharacterMutations } from "@/hooks/use-character-mutations";
import { Treasure } from "@/lib/dnd/data";
import { MagicalItem, EquippedMagicalItem, applyMagicalItemEffects } from "@/lib/dnd/magical-items";
import { ActiveCondition } from "@/lib/dnd/conditions";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { LevelUpWizard } from "./character-sheet/LevelUpWizard";
import { getSpellcastingType, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import { StatsTab, ActionsTab, GearTab, InventoryTab, BackgroundTab } from "./character-sheet/";
import DiceRoller from "./dice-roller";
import { PDFExport } from "./character-sheet/PDFExport";
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { clientCache } from '@/lib/client-cache';


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
    gender?: string;
    age?: number;
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
    languageSources?: { [languageName: string]: 'background' | 'racial' | 'class' | 'feat' | 'other' };
    skillSources?: { [skillName: string]: 'class' | 'background' | 'racial' | 'feat' | 'other' };
    conditions?: ActiveCondition[];
    equippedWeapons?: (Weapon | MagicalWeapon)[];
    deathSaveSuccesses?: number;
    deathSaveFailures?: number;
    ammunition?: Ammunition[];
    // Background characteristics (stored as separate fields in database)
    personalityTraits?: string[];
    ideals?: string[];
    bonds?: string[];
    flaws?: string[];
    subrace?: string;
  };
  onClose: () => void;
  onCharacterDeleted?: () => void;
  onCharacterUpdated?: () => void;
}

export function CharacterSheet({ character, onClose, onCharacterDeleted }: CharacterSheetProps) {
  const { updateCharacter: updateCharacterMutation } = useCharacterMutations();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showSpellPreparationModal, setShowSpellPreparationModal] = useState(false);
  const [tempPreparedSpells, setTempPreparedSpells] = useState<Spell[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(character);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  
  // Add debouncing for character updates to prevent race conditions
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingUpdatesRef = useRef<Record<string, unknown>>({});
  const actionsMenuRef = useRef<HTMLDivElement>(null);
  
  // Sync currentCharacter with character prop when character ID changes (important for reopening characters)
  useEffect(() => {
    console.log('CharacterSheet: Loading character');
    console.log('CharacterSheet: Character prop data:', {
      id: character.id,
      name: character.name,
      languages: character.languages,
      languageSources: character.languageSources,
      skills: character.skills,
      skillSources: character.skillSources
    });
    setCurrentCharacter(character);
    setCopperPieces(character.copperPieces || 0);
    setSilverPieces(character.silverPieces || 0);
    setGoldPieces(character.goldPieces || 0);
    setTreasures(character.treasures || []);
    
    // Weapons and armor are now derived from character data
    // No need to set state for weapons/armor
    
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
  }, [character.id]); // Only sync when character ID changes, not when character data updates

  // Clean up all state when unmounting
  useEffect(() => {
    return () => {
      // Clear any pending timeouts
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      // Reset all state
      setShowDeleteDialog(false);
      setShowLevelUpModal(false);
      setShowSpellPreparationModal(false);
      setTempPreparedSpells([]);
      setIsDeleting(false);
      setShowActionsMenu(false);
      setCopperPieces(0);
      setSilverPieces(0);
      setGoldPieces(0);
      setTreasures([]);
      setInventory([]);
      setEquippedMagicalItems([]);
      setInventoryMagicalItems([]);
      setAttunedItems([]);
      
      // Clear refs
      pendingUpdatesRef.current = {};
    };
  }, []);

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsMenuRef.current && !actionsMenuRef.current.contains(event.target as Node)) {
        setShowActionsMenu(false);
      }
    };

    if (showActionsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showActionsMenu]);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);
  
  // Use currentCharacter instead of character throughout the component
  const displayCharacter = {
    ...currentCharacter,
    // Transform separate background characteristic fields into combined object for BackgroundTab
    backgroundCharacteristics: {
      personalityTraits: (currentCharacter.personalityTraits as string[]) || [],
      ideals: (currentCharacter.ideals as string[]) || [],
      bonds: (currentCharacter.bonds as string[]) || [],
      flaws: (currentCharacter.flaws as string[]) || []
    }
  };
  
  const [activeTab, setActiveTab] = useState<"stats" | "actions" | "gear" | "inventory" | "background" | "dice">("stats");
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
    weapons: character.weapons, // Database field for equipped weapons
    armor: character.armor // Database field for equipped armor
  });
  
  // Derived state from character weapons using equipped boolean
  const equippedWeapons = currentCharacter.weapons?.filter(weapon => weapon.equipped) || [];
  const inventoryWeapons = currentCharacter.weapons?.filter(weapon => !weapon.equipped) || [];
  
  // Derived state from character armor using equipped boolean  
  const equippedArmor = currentCharacter.armor?.filter(armor => armor.equipped) || [];
  const inventoryArmor = currentCharacter.armor?.filter(armor => !armor.equipped) || [];
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

  const updateCharacter = async (updates: Record<string, unknown>) => {
    // Update local state immediately for responsive UI
    setCurrentCharacter(prev => ({ ...prev, ...updates }));
    
    // Use the React Query mutation for proper cache management
    updateCharacterMutation.mutate({
      id: character.id,
      data: updates
    });
  };

  const handleCreateMagicalWeapon = () => {
    if (selectedBaseWeapon && selectedMagicalTemplate) {
      const weaponData = clientCache.getWeapons().find(w => w.name === selectedBaseWeapon);
      const template = MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate);
      
      if (weaponData && template) {
        const baseWeapon = {
          ...weaponData,
          type: weaponData.type as 'Simple' | 'Martial',
          category: weaponData.category as 'Melee' | 'Ranged',
          properties: weaponData.properties ? weaponData.properties.split(',').map((p: string) => p.trim()).filter(Boolean) : []
        } as Weapon;
        const magicalWeapon = createMagicalWeapon(baseWeapon, template, customWeaponName.trim() || undefined);
        
        // Add weapon to inventory (unequipped)
        const updatedWeapons = [...(currentCharacter.weapons || []), { ...magicalWeapon, equipped: false }];
        updateCharacter({ weapons: updatedWeapons });
        
        // Reset form
        setSelectedBaseWeapon("");
        setSelectedMagicalTemplate("");
        setCustomWeaponName("");
        setShowWeaponCreator(false);
      }
    }
  };

  const handleAddWeapons = (weapons: (Weapon | MagicalWeapon)[]) => {
    // Separate weapons from ammunition items
    const actualWeapons: (Weapon | MagicalWeapon)[] = [];
    const ammunitionItems: { name: string; quantity: number }[] = [];
    
    weapons.forEach(weapon => {
      console.log(`🔍 WEAPON DETECTION: "${weapon.name}" - damage: "${weapon.damage}", properties: ${JSON.stringify(weapon.properties)}`);
      
      // Check if this is actually ammunition (has "Ammunition" property and no damage)
      const hasAmmunitionProperty = weapon.properties.some((prop: string) => prop.startsWith('Ammunition'));
      if (hasAmmunitionProperty && weapon.damage === '—') {
        console.log(`✅ DETECTED AS AMMUNITION: ${weapon.name}`);
        // This is ammunition, not a weapon - use the weapon's quantity property
        const weaponQuantity = weapon.quantity || 1;
        console.log(`🔢 AMMUNITION QUANTITY: ${weapon.name} has quantity ${weaponQuantity} (from weapon.quantity: ${weapon.quantity})`);
        const existing = ammunitionItems.find(a => a.name === weapon.name);
        if (existing) {
          existing.quantity += weaponQuantity;
          console.log(`➕ ADDED TO EXISTING: ${weapon.name} now has ${existing.quantity} total`);
        } else {
          ammunitionItems.push({ name: weapon.name, quantity: weaponQuantity });
          console.log(`🆕 NEW AMMUNITION: ${weapon.name} with quantity ${weaponQuantity}`);
        }
      } else {
        console.log(`⚔️ DETECTED AS WEAPON: ${weapon.name}`);
        // This is a real weapon
        actualWeapons.push(weapon);
      }
    });
    
    // Process real weapons
    if (actualWeapons.length > 0) {
      const currentWeapons = [...(currentCharacter.weapons || [])];
      
      actualWeapons.forEach(weapon => {
        if (weapon.stackable) {
          // Find existing stackable weapon of same name
          const existingIndex = currentWeapons.findIndex(w => 
            w.name === weapon.name && w.stackable && 'quantity' in w
          );
          
          if (existingIndex >= 0) {
            // Increase quantity of existing stack
            const existing = currentWeapons[existingIndex];
            currentWeapons[existingIndex] = {
              ...existing,
              quantity: (existing.quantity || 1) + 1
            };
          } else {
            // Create new stack with quantity
            currentWeapons.push({
              ...weapon,
              equipped: weapon.stackable ? true : false, // Auto-equip stackable items
              quantity: 1
            });
          }
        } else {
          // Add non-stackable weapons individually
          currentWeapons.push({ ...weapon, equipped: false });
        }
      });
      
      updateCharacter({ weapons: currentWeapons });
    }
    
    // Process ammunition items
    if (ammunitionItems.length > 0) {
      console.log(`🏹 PROCESSING ${ammunitionItems.length} AMMUNITION ITEMS:`, ammunitionItems);
      
      // Use the current ammunition state, which includes any updates from previous calls
      setCurrentCharacter(prev => {
        const currentAmmunition = [...(prev.ammunition || [])];
        console.log(`📊 CURRENT AMMUNITION BEFORE PROCESSING:`, currentAmmunition.map(a => `${a.name}: ${a.quantity}`));
        
        ammunitionItems.forEach(({ name, quantity }) => {
          console.log(`📦 PROCESSING AMMUNITION: ${name} with quantity ${quantity}`);
          // Find existing ammunition of same type
          const existingIndex = currentAmmunition.findIndex(a => a.name === name);
          
          if (existingIndex >= 0) {
            // Add to existing ammunition
            currentAmmunition[existingIndex] = {
              ...currentAmmunition[existingIndex],
              quantity: currentAmmunition[existingIndex].quantity + quantity
            };
            console.log(`➕ UPDATED EXISTING: ${name} now has ${currentAmmunition[existingIndex].quantity} total`);
          } else {
            // Create new ammunition entry using database data
            // For now, use basic defaults - this could be enhanced with database lookup
            const ammo: Ammunition = {
              name,
              quantity,
              compatibleWeapons: [name], // Basic compatibility
              weight: 0.05, // Default weight
              cost: '5 cp each' // Default cost
            };
            
            currentAmmunition.push(ammo);
            console.log(`🆕 ADDED NEW: ${name} with quantity ${quantity}`);
          }
        });
        
        console.log(`📊 FINAL AMMUNITION AFTER PROCESSING:`, currentAmmunition.map(a => `${a.name}: ${a.quantity}`));
        
        // Update both local state and trigger database update
        const updatedCharacter = { ...prev, ammunition: currentAmmunition };
        updateCharacter({ ammunition: currentAmmunition });
        return updatedCharacter;
      });
    }
  };

  const handleAddArmor = (armor: Armor) => {
    // Add armor to inventory (unequipped)
    const updatedArmor = [...(currentCharacter.armor || []), { ...armor, equipped: false }];
    updateCharacter({ armor: updatedArmor });
  };

  const handleEquipWeapon = (weapon: Weapon | MagicalWeapon, fromInventoryIndex: number) => {
    // Check if at weapon limit
    if (equippedWeapons.length >= weaponLimits.maxEquipped) {
      alert(`Cannot equip more weapons (max ${weaponLimits.maxEquipped})`);
      return;
    }

    console.log('CharacterSheet: handleEquipWeapon called', { weapon: weapon.name, fromInventoryIndex });
    
    // Find the weapon in the full weapons array and toggle equipped status
    const currentWeapons = currentCharacter.weapons || [];
    const updatedWeapons = currentWeapons.map((w) => {
      // Find the weapon by matching the unequipped weapon at the given inventory index
      const unequippedWeapons = currentWeapons.filter(weapon => !weapon.equipped);
      if (w === unequippedWeapons[fromInventoryIndex]) {
        return { ...w, equipped: true };
      }
      return w;
    });

    console.log('CharacterSheet: Updated weapons:', updatedWeapons);
    updateCharacter({ weapons: updatedWeapons });
  };

  const handleUnequipWeapon = (weapon: Weapon | MagicalWeapon, fromEquippedIndex: number) => {
    console.log('CharacterSheet: handleUnequipWeapon called', { weapon: weapon.name, fromEquippedIndex });
    
    // Find the weapon in the full weapons array and toggle equipped status
    const currentWeapons = currentCharacter.weapons || [];
    const updatedWeapons = currentWeapons.map((w) => {
      // Find the weapon by matching the equipped weapon at the given equipped index
      const currentEquippedWeapons = currentWeapons.filter(weapon => weapon.equipped);
      if (w === currentEquippedWeapons[fromEquippedIndex]) {
        return { ...w, equipped: false };
      }
      return w;
    });

    console.log('CharacterSheet: Updated weapons:', updatedWeapons);
    updateCharacter({ weapons: updatedWeapons });
  };

  const handleEquipArmor = (armor: Armor, fromInventoryIndex: number) => {
    // Check if armor type can be equipped by class
    if (!canEquipArmor(armor.type, currentCharacter.class)) {
      alert(`${currentCharacter.class} cannot equip ${armor.type.toLowerCase()} armor!`);
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

    console.log('CharacterSheet: handleEquipArmor called', { armor: armor.name, fromInventoryIndex });
    
    // Find the armor in the full armor array and toggle equipped status
    const currentArmor = currentCharacter.armor || [];
    const updatedArmor = currentArmor.map((a) => {
      // Find the armor by matching the unequipped armor at the given inventory index
      const unequippedArmor = currentArmor.filter(armor => !armor.equipped);
      if (a === unequippedArmor[fromInventoryIndex]) {
        return { ...a, equipped: true };
      }
      return a;
    });

    console.log('CharacterSheet: Updated armor:', updatedArmor);
    updateCharacter({ armor: updatedArmor });

    // Show toast notification for AC change
    const acBonus = armor.type === 'Shield' ? `+${armor.baseAC}` : `+${armor.baseAC - 10}`;
    toast.success(`🛡️ Equipped ${armor.name} (${acBonus} AC)`, {
      duration: 3000,
      style: {
        background: '#1e293b',
        color: '#e2e8f0',
        border: '1px solid #475569'
      }
    });
  };

  const handleUnequipArmor = (armor: Armor, fromEquippedIndex: number) => {
    console.log('CharacterSheet: handleUnequipArmor called', { armor: armor.name, fromEquippedIndex });
    
    // Find the armor in the full armor array and toggle equipped status
    const currentArmor = currentCharacter.armor || [];
    const updatedArmor = currentArmor.map((a) => {
      // Find the armor by matching the equipped armor at the given equipped index
      const currentEquippedArmor = currentArmor.filter(armor => armor.equipped);
      if (a === currentEquippedArmor[fromEquippedIndex]) {
        return { ...a, equipped: false };
      }
      return a;
    });

    console.log('CharacterSheet: Updated armor:', updatedArmor);
    updateCharacter({ armor: updatedArmor });

    // Show toast notification for AC change
    const acLoss = armor.type === 'Shield' ? `-${armor.baseAC}` : `-${armor.baseAC - 10}`;
    toast.success(`🛡️ Unequipped ${armor.name} (${acLoss} AC)`, {
      duration: 3000,
      style: {
        background: '#1e293b',
        color: '#e2e8f0',
        border: '1px solid #475569'
      }
    });
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

  // Wrapper functions to match GearTab interface expectations
  const handleUnequipWeaponWrapper = (weaponIndex: number) => {
    const weapon = equippedWeapons[weaponIndex];
    if (weapon) {
      handleUnequipWeapon(weapon, weaponIndex);
    }
  };

  const handleUnequipArmorWrapper = (armorIndex: number) => {
    const armor = equippedArmor[armorIndex];
    if (armor) {
      handleUnequipArmor(armor, armorIndex);
    }
  };

  const handleRemoveWeapon = (index: number, isEquipped: boolean = false) => {
    const currentWeapons = currentCharacter.weapons || [];
    let updatedWeapons: (Weapon | MagicalWeapon)[];
    
    if (isEquipped) {
      // Remove from equipped weapons
      const weaponToRemove = equippedWeapons[index];
      updatedWeapons = currentWeapons.filter(w => w !== weaponToRemove);
    } else {
      // Remove from inventory weapons
      const weaponToRemove = inventoryWeapons[index];
      updatedWeapons = currentWeapons.filter(w => w !== weaponToRemove);
    }
    
    updateCharacter({ weapons: updatedWeapons });
  };

  const handleRemoveArmor = (index: number, isEquipped: boolean = false) => {
    const currentArmor = currentCharacter.armor || [];
    let updatedArmor: Armor[];
    
    if (isEquipped) {
      // Remove from equipped armor
      const armorToRemove = equippedArmor[index];
      updatedArmor = currentArmor.filter(a => a !== armorToRemove);
    } else {
      // Remove from inventory armor
      const armorToRemove = inventoryArmor[index];
      updatedArmor = currentArmor.filter(a => a !== armorToRemove);
    }
    
    updateCharacter({ armor: updatedArmor });
  };

  const handleUseAmmunition = (ammunitionName: string) => {
    const currentAmmunition = currentCharacter.ammunition || [];
    const ammoIndex = currentAmmunition.findIndex(a => a.name === ammunitionName);
    
    if (ammoIndex === -1 || currentAmmunition[ammoIndex].quantity <= 0) {
      return;
    }

    const updatedAmmunition = [...currentAmmunition];
    updatedAmmunition[ammoIndex] = {
      ...updatedAmmunition[ammoIndex],
      quantity: updatedAmmunition[ammoIndex].quantity - 1
    };
    
    setCurrentCharacter(prev => ({ ...prev, ammunition: updatedAmmunition }));
    updateCharacter({ ammunition: updatedAmmunition });
  };

  const handleRecoverAmmunition = (ammunitionName: string) => {
    const currentAmmunition = currentCharacter.ammunition || [];
    const ammoIndex = currentAmmunition.findIndex(a => a.name === ammunitionName);
    
    if (ammoIndex === -1) {
      return;
    }

    const updatedAmmunition = [...currentAmmunition];
    updatedAmmunition[ammoIndex] = {
      ...updatedAmmunition[ammoIndex],
      quantity: updatedAmmunition[ammoIndex].quantity + 1
    };
    
    setCurrentCharacter(prev => ({ ...prev, ammunition: updatedAmmunition }));
    updateCharacter({ ammunition: updatedAmmunition });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-8 z-50">
        <div className="bg-slate-800 rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header - Compact & Responsive */}
          <div className="p-4 border-b border-slate-700">
            {/* Main header row */}
            <div className="flex items-center justify-between">
              {/* Avatar and basic info - always visible */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Avatar or default icon */}
                {displayCharacter.avatar ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <Image 
                      src={displayCharacter.avatar} 
                      alt={`${displayCharacter.name}'s avatar`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top scale-150 translate-y-1/4"
                    />
                  </div>
                ) : null}
                <User className={`h-6 w-6 sm:h-7 sm:w-7 text-purple-400 flex-shrink-0 ${displayCharacter.avatar ? 'hidden' : ''}`} />
                
                {/* Character info */}
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{displayCharacter.name}</h1>
                  <p className="text-slate-300 text-sm sm:text-base truncate">
                    Level {displayCharacter.level} {displayCharacter.subrace || displayCharacter.race} {displayCharacter.class}
                    {displayCharacter.background && (
                      <span className="hidden sm:inline"> • {displayCharacter.background}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Actions - Desktop: buttons, Mobile: hamburger menu */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Desktop buttons */}
                <div className="hidden md:flex items-center gap-2">
                  <PDFExport character={displayCharacter} />
                  <button
                    onClick={() => setShowLevelUpModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                    title="Level Up"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden lg:inline">Level Up</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                    title="Delete Character"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Mobile hamburger menu */}
                <div className="md:hidden relative" ref={actionsMenuRef}>
                  <button
                    onClick={() => setShowActionsMenu(!showActionsMenu)}
                    className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700"
                    title="Actions"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  
                  {/* Dropdown menu */}
                  {showActionsMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-slate-700 rounded-lg border border-slate-600 shadow-lg z-10 min-w-[140px]">
                      <div className="px-3 py-2 border-b border-slate-600">
                        <PDFExport character={displayCharacter} className="w-full justify-center" />
                      </div>
                      <button
                        onClick={() => {
                          setShowLevelUpModal(true);
                          setShowActionsMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left text-white hover:bg-slate-600 transition-colors"
                      >
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        Level Up
                      </button>
                      <button
                        onClick={() => {
                          setShowDeleteDialog(true);
                          setShowActionsMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left text-red-400 hover:bg-slate-600 rounded-b-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Close button - always visible */}
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation - Responsive */}
          <div className="border-b border-slate-700">
            {/* Desktop: Show all tabs in a row */}
            <div className="hidden lg:flex items-end">
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "background"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="h-4 w-4" />
                Background / Notes
              </button>
              <button
                onClick={() => setActiveTab("dice")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "dice"
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Dices className="h-4 w-4" />
                Dice Roll
              </button>
            </div>

            {/* Mobile: Dropdown selector */}
            <div className="lg:hidden relative">
              <div className="relative">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as typeof activeTab)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white font-medium focus:border-purple-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="stats">📊 Stats</option>
                  <option value="actions">⚔️ Actions</option>
                  <option value="gear">📦 Gear & Spells</option>
                  <option value="inventory">🪙 Inventory</option>
                  <option value="background">📄 Background / Notes</option>
                  <option value="dice">🎲 Dice Roll</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
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
                onUseAmmunition={handleUseAmmunition}
                onRecoverAmmunition={handleRecoverAmmunition}
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
                onUnequipWeapon={handleUnequipWeaponWrapper}
                onRemoveWeapon={handleRemoveWeapon}
                onEquipArmor={handleEquipArmor}
                onUnequipArmor={handleUnequipArmorWrapper}
                onRemoveArmor={handleRemoveArmor}
                onEquipMagicalItem={handleEquipMagicalItem}
                onUnequipMagicalItem={handleUnequipMagicalItem}
                onRemoveMagicalItem={handleRemoveMagicalItem}
                onToggleAttunement={handleToggleAttunement}
                onAddWeapon={(weapon) => handleAddWeapons([weapon])}
                onAddArmor={handleAddArmor}
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

            {activeTab === "dice" && (
              <div className="p-6 h-full">
                <DiceRoller />
              </div>
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
                  {clientCache.getWeapons().map(weapon => (
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
                  : []; // For non-spellbook classes, we'll handle this differently
                
                // Group spells by level
                const spellsByLevel: Record<number, Spell[]> = {};
                availableSpells.forEach((spell: Spell) => {
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