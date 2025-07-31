"use client";

import { User, BarChart3, Swords, X, Package, Coins, FileText, ChevronDown, MoreVertical } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { getModifier } from "@/lib/dnd/core";
import { Spell } from "@/lib/dnd/spells";
import { Weapon, MagicalWeapon, InventoryItem, MAGICAL_WEAPON_TEMPLATES, createMagicalWeapon, Armor, Ammunition, calculateArmorClass } from "@/lib/dnd/equipment";
import { Action, canEquipArmor } from "@/lib/dnd/combat";
import { useCharacterMutations, useAvatar } from "@/hooks/use-character-mutations";
import { Treasure } from "@/lib/dnd/data";
import { MagicalItem, EquippedMagicalItem, applyMagicalItemEffects } from "@/lib/dnd/magical-items";
import { ActiveCondition } from "@/lib/dnd/conditions";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { LevelUpWizard } from "./character-sheet/LevelUpWizard";
import { getSpellcastingType, getSpellsPreparedCount } from "@/lib/dnd/level-up";
import { getMaxSpellLevel, getSpellcastingAbility } from "@/lib/dnd/spells";
import { getSpellsByClass } from "@/lib/dnd/spell-data-helper";
import { StatsTab, ActionsTab, GearTab, InventoryTab, BackgroundTab } from "./character-sheet/";
import { ClassLevel, SelectedFeature } from "@/lib/dnd/progression";


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
    // Multiclass fields
    classes?: ClassLevel[];
    totalLevel?: number;
    selectedFeatures?: SelectedFeature[];
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
    usedSpellSlots?: Record<number, number>;
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
    deathSaveSuccesses?: boolean[];
    deathSaveFailures?: boolean[];
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
  initialTab?: "stats" | "actions" | "gear" | "inventory" | "background";
}

export function CharacterSheet({ character, onClose, onCharacterDeleted, initialTab }: CharacterSheetProps) {
  const { updateCharacter: updateCharacterMutation } = useCharacterMutations();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showSpellPreparationModal, setShowSpellPreparationModal] = useState(false);
  const [tempPreparedSpells, setTempPreparedSpells] = useState<Spell[]>([]);
  const [availableSpells, setAvailableSpells] = useState<Spell[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState(character);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  // Use React Query for avatar fetching
  const { data: avatarUrl } = useAvatar(character.id);
  
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
      skillSources: character.skillSources,
      ammunition: character.ammunition
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
  }, [character.id, character]); // Include character in dependencies

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
    const timeoutRef = updateTimeoutRef.current;
    return () => {
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, []);


  
  // Use currentCharacter instead of character throughout the component
  const displayCharacter = useMemo(() => ({
    ...currentCharacter,
    // Transform separate background characteristic fields into combined object for BackgroundTab
    backgroundCharacteristics: {
      personalityTraits: (currentCharacter.personalityTraits as string[]) || [],
      ideals: (currentCharacter.ideals as string[]) || [],
      bonds: (currentCharacter.bonds as string[]) || [],
      flaws: (currentCharacter.flaws as string[]) || []
    }
  }), [currentCharacter]);
  
  const [activeTab, setActiveTab] = useState<"stats" | "actions" | "gear" | "inventory" | "background">(initialTab || "stats");
  const [showWeaponCreator, setShowWeaponCreator] = useState(false);
  const [selectedBaseWeapon, setSelectedBaseWeapon] = useState("");
  const [selectedMagicalTemplate, setSelectedMagicalTemplate] = useState("");
  const [customWeaponName, setCustomWeaponName] = useState("");
  const [copperPieces, setCopperPieces] = useState(0);
  const [silverPieces, setSilverPieces] = useState(0);
  const [goldPieces, setGoldPieces] = useState(0);
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  

  
  // Derived state from character weapons using equipped boolean - include stackable weapons for Actions tab
  const equippedWeapons = currentCharacter.weapons?.filter(weapon => 
    weapon.equipped || (weapon.stackable && weapon.quantity && weapon.quantity > 0)
  ) || [];
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
        // Remove character from client cache
        clientCache.removeCharacter(character.id);
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
      
      // Convert properties to array if it's a string
      const propertiesArray = Array.isArray(weapon.properties) 
        ? weapon.properties 
        : (typeof weapon.properties === 'string' && weapon.properties)
          ? (weapon.properties as string).split(',').map((p: string) => p.trim()).filter(Boolean)
          : [];
      
      // Check if this is actually ammunition (has "Ammunition" property and no damage)
      const hasAmmunitionProperty = propertiesArray.some((prop: string) => prop.startsWith('Ammunition'));
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
        background: 'var(--color-card)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)'
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
        background: 'var(--color-card)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)'
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

  const handleUpdateDeathSaves = (successes: boolean[], failures: boolean[]) => {
    setCurrentCharacter(prev => ({ ...prev, deathSaveSuccesses: successes, deathSaveFailures: failures }));
    updateCharacter({ deathSaveSuccesses: successes, deathSaveFailures: failures });
  };

  const handleUpdateHitPoints = (hitPoints: number) => {
    setCurrentCharacter(prev => ({ ...prev, hitPoints }));
    updateCharacter({ hitPoints });
  };

  const handleUpdateTemporaryHitPoints = (temporaryHitPoints: number) => {
    setCurrentCharacter(prev => ({ ...prev, temporaryHitPoints }));
    updateCharacter({ temporaryHitPoints });
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

  const handleOpenSpellPreparation = async () => {
    try {
      const spellcastingType = getSpellcastingType(currentCharacter.class);
      let availableSpells: Spell[] = [];
      
      if (spellcastingType === 'spellbook') {
        // Wizards prepare from their spellbook
        availableSpells = currentCharacter.spellsKnown || [];
      } else if (spellcastingType === 'prepared') {
        // Clerics, Druids, Paladins prepare from their entire class spell list
        const maxSpellLevel = getMaxSpellLevel(currentCharacter.class, currentCharacter.level);
        const allClassSpells = await getSpellsByClass(currentCharacter.class, maxSpellLevel);
        
        // For prepared spellcasters, they can prepare from all class spells
        // But cantrips are limited to what they know
        const allCantrips = allClassSpells.filter(spell => spell.level === 0);
        const allSpells = allClassSpells.filter(spell => spell.level > 0);
        
        // Get the cantrips they know (from prepared spells, since that's where cantrips are stored)
        const knownCantrips = (currentCharacter.spellsPrepared || []).filter(spell => spell.level === 0);
        
        // If they don't have any cantrips prepared yet, they should see the cantrips they can choose from
        // This would be based on their class spell limits
        const spellLimitsResponse = await fetch(`/api/classes/${encodeURIComponent(currentCharacter.class)}/spell-limits?level=${currentCharacter.level}`);
        const spellLimits = await spellLimitsResponse.json();
        const maxCantrips = spellLimits?.cantripsKnown || 0;
        
        // If they have fewer cantrips than their limit, show available cantrips to choose from
        if (knownCantrips.length < maxCantrips) {
          // Show cantrips they don't know yet
          const unknownCantrips = allCantrips.filter(cantrip => 
            !knownCantrips.some(known => known.name === cantrip.name)
          );
          availableSpells = [...knownCantrips, ...unknownCantrips, ...allSpells];
        } else {
          // They have their full cantrip complement, just show what they know + all spells
          availableSpells = [...knownCantrips, ...allSpells];
        }
      } else {
        // Known spellcasters don't prepare spells
        availableSpells = [];
      }
      
      // Get current prepared spells
      const currentPreparedSpells = currentCharacter.spellsPrepared || [];
      
      // For prepared spellcasters, ensure cantrips are always included
      let initialPreparedSpells = currentPreparedSpells;
      if (spellcastingType === 'prepared') {
        const currentSpells = currentPreparedSpells.filter(spell => spell.level > 0);
        const knownCantrips = currentPreparedSpells.filter(spell => spell.level === 0);
        
        // Only include the cantrips they actually know, not all available cantrips
        initialPreparedSpells = [...knownCantrips, ...currentSpells];
      }
      
      setTempPreparedSpells(initialPreparedSpells);
      setAvailableSpells(availableSpells);
      setShowSpellPreparationModal(true);
    } catch (error) {
      console.error('Error loading spells:', error);
    }
  };

  const handleOpenSpellManagement = () => {
    const spellcastingType = getSpellcastingType(currentCharacter.class);
    
    if (spellcastingType === 'prepared') {
      // For prepared spellcasters, they don't have "known spells" - they know all class spells
      // We only manage cantrips, which are stored in spellsPrepared
      const knownCantrips = (currentCharacter.spellsPrepared || []).filter(spell => spell.level === 0);
      setTempKnownSpells(knownCantrips);
    } else {
      // For known spellcasters, use spellsKnown
      setTempKnownSpells(currentCharacter.spellsKnown || []);
    }
    
    setShowSpellManagementModal(true);
  };

  const handleOpenCantripManagement = async () => {
    try {
      // Get spell limits for this class and level
      const spellLimitsResponse = await fetch(`/api/classes/${encodeURIComponent(currentCharacter.class)}/spell-limits?level=${currentCharacter.level}`);
      const spellLimits = await spellLimitsResponse.json();
      const maxCantrips = spellLimits?.cantripsKnown || 2; // Default to 2 if not found
      
      // Get current cantrips from prepared spells
      const currentCantrips = currentCharacter.spellsPrepared?.filter(spell => spell.level === 0) || [];
      
      setTempKnownCantrips(currentCantrips);
      setMaxCantrips(maxCantrips);
      setShowCantripManagementModal(true);
    } catch (error) {
      console.error('Error loading cantrips:', error);
    }
  };

  const handleReplaceSpell = async (spellToReplace: Spell) => {
    try {
      const spellcastingType = getSpellcastingType(currentCharacter.class);
      
      if (spellcastingType === 'prepared') {
        // For prepared spellcasters, get available cantrips from class spell list
        const availableCantrips = await getSpellsByClass(currentCharacter.class, 0); // Level 0 = cantrips
        
        // Filter out cantrips the character already knows (except the one being replaced)
        const currentCantripNames = tempKnownSpells.map(s => s.name);
        const replacementOptions = availableCantrips.filter(cantrip => 
          cantrip.name !== spellToReplace.name && 
          cantrip.level === 0 &&
          !currentCantripNames.includes(cantrip.name)
        );
        
        setSpellToReplace(spellToReplace);
        setAvailableReplacementSpells(replacementOptions);
        setSelectedReplacementSpell('');
        setShowSpellReplacementModal(true);
      } else {
        // For known spellcasters, get available spells for this class
        const maxSpellLevel = getMaxSpellLevel(currentCharacter.class, currentCharacter.level);
        const availableSpells = await getSpellsByClass(currentCharacter.class, maxSpellLevel);
        
        // Filter out spells the character already knows (except the one being replaced)
        const currentSpellNames = tempKnownSpells.map(s => s.name);
        const replacementOptions = availableSpells.filter(spell => 
          spell.name !== spellToReplace.name && 
          spell.level === spellToReplace.level &&
          !currentSpellNames.includes(spell.name)
        );
        
        setSpellToReplace(spellToReplace);
        setAvailableReplacementSpells(replacementOptions);
        setSelectedReplacementSpell('');
        setShowSpellReplacementModal(true);
      }
    } catch (error) {
      console.error('Error loading replacement spells:', error);
    }
  };

  const handleReplaceCantrip = async (cantripToReplace: Spell) => {
    try {
      // Get available cantrips for this class
      const availableCantrips = await getSpellsByClass(currentCharacter.class, 0); // Level 0 = cantrips
      
      // Filter out cantrips the character already knows (except the one being replaced)
      const currentCantripNames = tempKnownCantrips.map(s => s.name);
      const replacementOptions = availableCantrips.filter(cantrip => 
        cantrip.name !== cantripToReplace.name && 
        cantrip.level === 0 &&
        !currentCantripNames.includes(cantrip.name)
      );
      
      setCantripToReplace(cantripToReplace);
      setAvailableReplacementCantrips(replacementOptions);
      setSelectedReplacementCantrip('');
      setShowCantripReplacementModal(true);
    } catch (error) {
      console.error('Error loading replacement cantrips:', error);
    }
  };

  const handleConfirmSpellReplacement = () => {
    if (!spellToReplace || !selectedReplacementSpell) return;
    
    const replacementSpell = availableReplacementSpells.find(s => s.name === selectedReplacementSpell);
    if (!replacementSpell) return;
    
    // Replace the spell in the temporary list
    const updatedSpells = tempKnownSpells.map(spell => 
      spell.name === spellToReplace.name ? replacementSpell : spell
    );
    
    setTempKnownSpells(updatedSpells);
    setShowSpellReplacementModal(false);
    setSpellToReplace(null);
    setSelectedReplacementSpell('');
  };

  const handleConfirmCantripReplacement = () => {
    if (!selectedReplacementCantrip) return;
    
    const replacementCantrip = availableReplacementCantrips.find(c => c.name === selectedReplacementCantrip);
    if (!replacementCantrip) return;
    
    let updatedCantrips: Spell[];
    
    if (cantripToReplace) {
      // Replacing an existing cantrip
      updatedCantrips = tempKnownCantrips.map(cantrip => 
        cantrip.name === cantripToReplace.name ? replacementCantrip : cantrip
      );
    } else {
      // Adding a new cantrip to an empty slot
      updatedCantrips = [...tempKnownCantrips, replacementCantrip];
    }
    
    setTempKnownCantrips(updatedCantrips);
    setShowCantripReplacementModal(false);
    setCantripToReplace(null);
    setSelectedReplacementCantrip('');
  };

  const handleSaveSpellChanges = async () => {
    try {
      const spellcastingType = getSpellcastingType(currentCharacter.class);
      
      if (spellcastingType === 'prepared') {
        // For prepared spellcasters, update the cantrips in spellsPrepared
        const currentPreparedSpells = currentCharacter.spellsPrepared || [];
        const nonCantripSpells = currentPreparedSpells.filter(spell => spell.level > 0);
        const updatedPreparedSpells = [...nonCantripSpells, ...tempKnownSpells];
        
        await updateCharacter({ spellsPrepared: updatedPreparedSpells });
      } else {
        // For known spellcasters, update spellsKnown
        await updateCharacter({ spellsKnown: tempKnownSpells });
      }
      
      setShowSpellManagementModal(false);
    } catch (error) {
      console.error('Error saving spell changes:', error);
    }
  };

  const handleSelectCantripForEmptySlot = async () => {
    try {
      // Get available cantrips for this class
      const availableCantrips = await getSpellsByClass(currentCharacter.class, 0); // Level 0 = cantrips
      
      // Filter out cantrips the character already knows
      const currentCantripNames = tempKnownCantrips.map(s => s.name);
      const selectionOptions = availableCantrips.filter(cantrip => 
        cantrip.level === 0 &&
        !currentCantripNames.includes(cantrip.name)
      );
      
      setCantripToReplace(null); // null indicates this is for adding, not replacing
      setAvailableReplacementCantrips(selectionOptions);
      setSelectedReplacementCantrip('');
      setShowCantripReplacementModal(true);
    } catch (error) {
      console.error('Error loading cantrips for selection:', error);
    }
  };

  const handleSaveCantripChanges = async () => {
    try {
      // For prepared spellcasters, we need to update the prepared spells
      // Replace cantrips in the prepared spells list
      const currentPreparedSpells = currentCharacter.spellsPrepared || [];
      const nonCantripSpells = currentPreparedSpells.filter(spell => spell.level > 0);
      const updatedPreparedSpells = [...nonCantripSpells, ...tempKnownCantrips];
      
      await updateCharacter({ spellsPrepared: updatedPreparedSpells });
      setShowCantripManagementModal(false);
    } catch (error) {
      console.error('Error saving cantrip changes:', error);
    }
  };

  const handleUseSpellScroll = (scrollIndex: number) => {
    // Remove the spell scroll from inventory when used
    const updatedInventoryItems = inventoryMagicalItems.filter((_, i) => i !== scrollIndex);
    setInventoryMagicalItems(updatedInventoryItems);
    updateCharacter({ inventoryMagicalItems: updatedInventoryItems });
  };

  const handleTogglePreparedSpell = (spell: Spell) => {
    // Cantrips are always prepared and cannot be toggled
    if (spell.level === 0) {
      return;
    }
    
    const isCurrentlyPrepared = tempPreparedSpells.some(s => s.name === spell.name);
    const spellcastingAbility = getSpellcastingAbility(currentCharacter.class) || 'intelligence';
    const abilityValue = currentCharacter[spellcastingAbility as keyof typeof currentCharacter] as number || 10;
    const abilityModifier = getModifier(abilityValue);
    const maxPrepared = getSpellsPreparedCount(currentCharacter.class, currentCharacter.level, abilityModifier);
    
    // Count only non-cantrip spells toward the preparation limit
    const currentNonCantripsPrepared = tempPreparedSpells.filter(s => s.level > 0).length;
    
    // DEBUG: Log toggle logic
    console.log('🔄 TOGGLE SPELL DEBUG:', {
      spellName: spell.name,
      isCurrentlyPrepared,
      spellcastingAbility,
      abilityValue,
      abilityModifier,
      maxPrepared,
      currentNonCantripsPrepared,
      willAdd: !isCurrentlyPrepared && currentNonCantripsPrepared < maxPrepared,
      willRemove: isCurrentlyPrepared
    });
    
    if (isCurrentlyPrepared) {
      // Remove from prepared spells
      setTempPreparedSpells(prev => prev.filter(s => s.name !== spell.name));
    } else {
      // Add to prepared spells if under limit (only check limit for non-cantrips)
      if (currentNonCantripsPrepared < maxPrepared) {
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
    
    const updatedAmmunition = [...currentAmmunition];
    
    if (ammoIndex === -1) {
      // Create new ammunition entry if it doesn't exist
      const newAmmo: Ammunition = {
        name: ammunitionName,
        quantity: 1,
        compatibleWeapons: [ammunitionName], // Basic compatibility
        weight: 0.05, // Default weight
        cost: '5 cp each' // Default cost
      };
      updatedAmmunition.push(newAmmo);
    } else {
      // Update existing ammunition
      updatedAmmunition[ammoIndex] = {
        ...updatedAmmunition[ammoIndex],
        quantity: updatedAmmunition[ammoIndex].quantity + 1
      };
    }
    
    setCurrentCharacter(prev => ({ ...prev, ammunition: updatedAmmunition }));
    updateCharacter({ ammunition: updatedAmmunition });
  };

  const handleUseStackableWeapon = (weaponName: string) => {
    const currentWeapons = currentCharacter.weapons || [];
    const weaponIndex = currentWeapons.findIndex(w => w.name === weaponName && w.stackable);
    
    if (weaponIndex === -1 || !currentWeapons[weaponIndex]?.quantity || (currentWeapons[weaponIndex]?.quantity ?? 0) <= 0) {
      return;
    }

    const updatedWeapons = [...currentWeapons];
    const currentQuantity = updatedWeapons[weaponIndex].quantity || 0;
    updatedWeapons[weaponIndex] = {
      ...updatedWeapons[weaponIndex],
      quantity: currentQuantity - 1
    };
    
    setCurrentCharacter(prev => ({ ...prev, weapons: updatedWeapons }));
    updateCharacter({ weapons: updatedWeapons });
  };

  const handleRecoverStackableWeapon = (weaponName: string) => {
    const currentWeapons = currentCharacter.weapons || [];
    const weaponIndex = currentWeapons.findIndex(w => w.name === weaponName && w.stackable);
    
    if (weaponIndex === -1) {
      return;
    }

    const updatedWeapons = [...currentWeapons];
    updatedWeapons[weaponIndex] = {
      ...updatedWeapons[weaponIndex],
      quantity: (updatedWeapons[weaponIndex].quantity || 0) + 1
    };
    
    setCurrentCharacter(prev => ({ ...prev, weapons: updatedWeapons }));
    updateCharacter({ weapons: updatedWeapons });
  };

  // Spell slot management functions
  const handleUseSpellSlot = (level: number) => {
    try {
      const currentUsedSlots = currentCharacter.usedSpellSlots || {};
      const currentTotalSlots = currentCharacter.spellSlots?.[level] || 0;
      const currentUsed = currentUsedSlots[level] || 0;
      
      if (currentUsed >= currentTotalSlots) {
        console.log(`No level ${level} spell slots available`);
        return; // No slots available
      }

      const updatedUsedSlots = {
        ...currentUsedSlots,
        [level]: currentUsed + 1
      };
      
      // Update local state immediately for responsive UI
      setCurrentCharacter(prev => ({ ...prev, usedSpellSlots: updatedUsedSlots }));
      
      // Try to update the database, but don't let it break the dice rolling
      try {
        updateCharacter({ usedSpellSlots: updatedUsedSlots });
      } catch (error) {
        console.error('Failed to update usedSpellSlots in database:', error);
        // Don't throw - just log the error and continue
      }
    } catch (error) {
      console.error('Error in handleUseSpellSlot:', error);
      // Don't let this break the dice rolling
    }
  };

  const handleSpellSlotUsed = (spell: Spell, slotLevel: number) => {
    // This is the new handler that matches the SpellDiceRoller interface
    handleUseSpellSlot(slotLevel);
  };

  const handleRecoverSpellSlot = (level: number) => {
    try {
      const currentUsedSlots = currentCharacter.usedSpellSlots || {};
      const currentUsed = currentUsedSlots[level] || 0;
      
      if (currentUsed <= 0) {
        console.log(`No level ${level} spell slots to recover`);
        return; // No slots to recover
      }

      const updatedUsedSlots = {
        ...currentUsedSlots,
        [level]: currentUsed - 1
      };
      
      // Update local state immediately for responsive UI
      setCurrentCharacter(prev => ({ ...prev, usedSpellSlots: updatedUsedSlots }));
      
      // Try to update the database, but don't let it break the UI
      try {
        updateCharacter({ usedSpellSlots: updatedUsedSlots });
      } catch (error) {
        console.error('Failed to update usedSpellSlots in database:', error);
        // Don't throw - just log the error and continue
      }
    } catch (error) {
      console.error('Error in handleRecoverSpellSlot:', error);
      // Don't let this break the UI
    }
  };

  // New state for spell management (for known spell classes)
  const [showSpellManagementModal, setShowSpellManagementModal] = useState(false);
  const [tempKnownSpells, setTempKnownSpells] = useState<Spell[]>([]);
  const [spellManagementTabActive, setSpellManagementTabActive] = useState<'cantrips' | 'spells'>('cantrips');
  
  // Spell replacement state
  const [showSpellReplacementModal, setShowSpellReplacementModal] = useState(false);
  const [spellToReplace, setSpellToReplace] = useState<Spell | null>(null);
  const [availableReplacementSpells, setAvailableReplacementSpells] = useState<Spell[]>([]);
  const [selectedReplacementSpell, setSelectedReplacementSpell] = useState<string>('');
  
  // Cantrip management state (for prepared spellcasters)
  const [showCantripManagementModal, setShowCantripManagementModal] = useState(false);
  const [showCantripReplacementModal, setShowCantripReplacementModal] = useState(false);
  const [tempKnownCantrips, setTempKnownCantrips] = useState<Spell[]>([]);
  const [cantripToReplace, setCantripToReplace] = useState<Spell | null>(null);
  const [availableReplacementCantrips, setAvailableReplacementCantrips] = useState<Spell[]>([]);
  const [selectedReplacementCantrip, setSelectedReplacementCantrip] = useState<string>('');
  const [maxCantrips, setMaxCantrips] = useState<number>(0);

  return (
    <>
      <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
        <div className="bg-[var(--color-card)] rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header - Compact & Responsive */}
          <div className="p-4 border-b border-[var(--color-border)]">
            {/* Main header row */}
            <div className="flex items-center justify-between">
              {/* Avatar and basic info - always visible */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Avatar or default icon */}
                {avatarUrl ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <Image 
                      src={avatarUrl} 
                      alt={`${displayCharacter.name}'s avatar`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top scale-150 translate-y-1/4"
                    />
                  </div>
                ) : null}
                <User className={`h-6 w-6 sm:h-7 sm:w-7 text-[var(--color-accent)] flex-shrink-0 ${avatarUrl ? 'hidden' : ''}`} />
                
                {/* Character info */}
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] truncate">{displayCharacter.name}</h1>
                  <p className="text-[var(--color-text-secondary)] text-sm sm:text-base truncate">
                    {(() => {
                      // Format class information for multiclass support
                      let classText = displayCharacter.class;
                      let levelText = `Level ${displayCharacter.level}`;
                      
                      if (displayCharacter.classes) {
                        let classes: ClassLevel[] = [];
                        
                        if (Array.isArray(displayCharacter.classes)) {
                          classes = displayCharacter.classes;
                        } else if (typeof displayCharacter.classes === 'string') {
                          try {
                            classes = JSON.parse(displayCharacter.classes);
                          } catch (e) {
                            console.warn('Failed to parse classes JSON:', e);
                          }
                        }
                        
                        if (classes.length > 0) {
                          classText = classes.map(cls => `${cls.class} ${cls.level}`).join(', ');
                          const totalLevel = displayCharacter.totalLevel || classes.reduce((sum, cls) => sum + cls.level, 0);
                          levelText = `Level ${totalLevel}`;
                        }
                      }
                      
                      return `${levelText} ${displayCharacter.subrace || displayCharacter.race} ${classText}`;
                    })()}
                    {displayCharacter.background && (
                      <span className="hidden sm:inline"> • {displayCharacter.background}</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Actions - Desktop: buttons, Mobile: hamburger menu */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Level Up button */}
                <button
                  onClick={() => setShowLevelUpModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] rounded-lg transition-colors text-sm"
                  title="Level Up"
                >
                  <span>Level Up</span>
                </button>

                {/* Hamburger menu for all screen sizes */}
                <div className="relative" ref={actionsMenuRef}>
                  <button
                    onClick={() => setShowActionsMenu(!showActionsMenu)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-2 rounded-lg hover:bg-[var(--color-card-secondary)]"
                    title="Actions"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  
                  {/* Dropdown menu */}
                  {showActionsMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-[var(--color-card)] rounded-lg border border-[var(--color-border)] shadow-lg z-10 min-w-[140px]">
                      <button
                        onClick={() => {
                          // Trigger PDF export
                          const pdfButton = document.querySelector('[title="Export to PDF"]') as HTMLButtonElement;
                          if (pdfButton) pdfButton.click();
                          setShowActionsMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-[var(--color-text-primary)] hover:bg-[var(--color-card-secondary)] transition-colors border-b border-[var(--color-border)]"
                      >
                        Export PDF
                      </button>

                      <button
                        onClick={() => {
                          setShowDeleteDialog(true);
                          setShowActionsMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-[var(--color-danger)] hover:bg-[var(--color-card-secondary)] rounded-b-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Close button - always visible */}
                <button
                  onClick={onClose}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-2 rounded-lg hover:bg-[var(--color-card-secondary)]"
                  title="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation - Responsive */}
          <div className="border-b border-transparent">
            {/* Desktop: Show all tabs in a row */}
            <div className="hidden lg:flex items-end">
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "stats"
                    ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                Stats
              </button>
              <button
                onClick={() => setActiveTab("actions")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "actions"
                    ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Swords className="h-4 w-4" />
                Actions
              </button>
              <button
                onClick={() => setActiveTab("gear")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "gear"
                    ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Package className="h-4 w-4" />
                Gear & Spells
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "inventory"
                    ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Coins className="h-4 w-4" />
                Inventory
              </button>
              <button
                onClick={() => setActiveTab("background")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === "background"
                    ? "text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <FileText className="h-4 w-4" />
                Background / Notes
              </button>

            </div>

            {/* Mobile: Dropdown selector */}
            <div className="lg:hidden relative">
              <div className="relative">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as typeof activeTab)}
                  className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] font-medium focus:border-[var(--color-accent)] focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="stats">📊 Stats</option>
                  <option value="actions">⚔️ Actions</option>
                  <option value="gear">📦 Gear & Spells</option>
                  <option value="inventory">🪙 Inventory</option>
                  <option value="background">📄 Background / Notes</option>

                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)] pointer-events-none" />
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
                onUseStackableWeapon={handleUseStackableWeapon}
                onRecoverStackableWeapon={handleRecoverStackableWeapon}
                onSpellSlotUsed={handleSpellSlotUsed}
                onRecoverSpellSlot={handleRecoverSpellSlot}
                onUpdateHitPoints={handleUpdateHitPoints}
                onUpdateTemporaryHitPoints={handleUpdateTemporaryHitPoints}
                onSwitchTab={setActiveTab}
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
                onOpenSpellManagement={handleOpenSpellManagement}
                onOpenCantripManagement={handleOpenCantripManagement}
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
        <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Create Magical Weapon</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Base Weapon</label>
                <select
                  value={selectedBaseWeapon}
                  onChange={(e) => setSelectedBaseWeapon(e.target.value)}
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
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
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Magical Enhancement</label>
                <select
                  value={selectedMagicalTemplate}
                  onChange={(e) => setSelectedMagicalTemplate(e.target.value)}
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
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
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Custom Name (Optional)</label>
                <input
                  type="text"
                  value={customWeaponName}
                  onChange={(e) => setCustomWeaponName(e.target.value)}
                  placeholder="e.g., 'Dawnbreaker' or leave empty for default"
                  className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>

              {selectedMagicalTemplate && (
                <div className="bg-[var(--color-card-secondary)] p-3 rounded">
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">Enhancement Description:</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {MAGICAL_WEAPON_TEMPLATES.find(t => t.name === selectedMagicalTemplate)?.description}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowWeaponCreator(false)}
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-secondary)]/80 text-[var(--color-text-primary)] py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMagicalWeapon}
                disabled={!selectedBaseWeapon || !selectedMagicalTemplate}
                className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] py-2 px-4 rounded transition-colors"
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

      {/* Spell Management Modal (for known spell classes) */}
      {showSpellManagementModal && (
        <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Manage Known Spells</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {currentCharacter.class}s have a limited number of spells they know. You can replace existing spells with new ones from your class spell list.
                </p>
              </div>
              <button
                onClick={() => setShowSpellManagementModal(false)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Spell Management with Tabs */}
              {(() => {
                const spellcastingType = getSpellcastingType(currentCharacter.class);
                
                if (spellcastingType === 'prepared') {
                  // For prepared spellcasters (Clerics, Druids, Paladins), they know all class spells
                  // So we only show cantrip management
                  return (
                    <div>
                      <div className="mb-4 p-4 bg-[var(--color-card-secondary)] rounded-lg">
                        <h4 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
                          {currentCharacter.class} Spellcasting
                        </h4>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          As a {currentCharacter.class}, you know all spells on your class spell list. 
                          You don&apos;t need to manage &quot;known spells&quot; - you can prepare any spell from your class list each day.
                        </p>
                      </div>
                      
                      <h4 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">Current Cantrips</h4>
                      <div className="space-y-2">
                        {tempKnownSpells
                          .filter(spell => spell.level === 0)
                          .map((spell, index) => (
                            <div key={index} className="bg-[var(--color-card-secondary)] p-3 rounded">
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium text-[var(--color-text-primary)]">{spell.name}</span>
                                  <div className="text-sm text-[var(--color-text-secondary)]">{spell.school} • {spell.castingTime}</div>
                                </div>
                                <button
                                  onClick={() => handleReplaceSpell(spell)}
                                  className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm"
                                >
                                  Replace
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                }
                
                // For known spellcasters (Bards, Sorcerers, etc.), show the full spell management
                return (
                  <>
                    <div className="mb-4">
                      <div className="flex border-b border-[var(--color-border)]">
                        <button
                          onClick={() => setSpellManagementTabActive('cantrips')}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            spellManagementTabActive === 'cantrips'
                              ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]'
                              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                          }`}
                        >
                          Cantrips ({tempKnownSpells.filter(s => s.level === 0).length})
                        </button>
                        <button
                          onClick={() => setSpellManagementTabActive('spells')}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            spellManagementTabActive === 'spells'
                              ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]'
                              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                          }`}
                        >
                          Spells ({tempKnownSpells.filter(s => s.level > 0).length})
                        </button>
                      </div>
                    </div>

                    {spellManagementTabActive === 'cantrips' && (
                      <div>
                        <h4 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">Current Cantrips</h4>
                        <div className="space-y-2">
                          {tempKnownSpells
                            .filter(spell => spell.level === 0)
                            .map((spell, index) => (
                              <div key={index} className="bg-[var(--color-card-secondary)] p-3 rounded">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium text-[var(--color-text-primary)]">{spell.name}</span>
                                    <div className="text-sm text-[var(--color-text-secondary)]">{spell.school} • {spell.castingTime}</div>
                                  </div>
                                  <button
                                    onClick={() => handleReplaceSpell(spell)}
                                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm"
                                  >
                                    Replace
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {spellManagementTabActive === 'spells' && (
                      <div>
                        <h4 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">Current Spells</h4>
                        <div className="space-y-2">
                          {tempKnownSpells
                            .filter(spell => spell.level > 0)
                            .sort((a, b) => a.level - b.level)
                            .map((spell, index) => (
                              <div key={index} className="bg-[var(--color-card-secondary)] p-3 rounded">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <span className="font-medium text-[var(--color-text-primary)]">{spell.name}</span>
                                    <div className="text-sm text-[var(--color-text-secondary)]">
                                      Level {spell.level} • {spell.school} • {spell.castingTime}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleReplaceSpell(spell)}
                                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm"
                                  >
                                    Replace
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            <div className="flex gap-3 p-6 border-t border-[var(--color-border)]">
              <button
                onClick={() => setShowSpellManagementModal(false)}
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-secondary)]/80 text-[var(--color-text-primary)] py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSpellChanges}
                className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] py-2 px-4 rounded transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spell Replacement Modal */}
      {showSpellReplacementModal && spellToReplace && (
        <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Replace Spell</h3>
              <button
                onClick={() => setShowSpellReplacementModal(false)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                Replace <span className="font-medium text-[var(--color-text-primary)]">{spellToReplace.name}</span> with:
              </p>
              
              <select
                value={selectedReplacementSpell}
                onChange={(e) => setSelectedReplacementSpell(e.target.value)}
                className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
              >
                <option value="">Select a replacement spell...</option>
                {availableReplacementSpells.map((spell) => (
                  <option key={spell.name} value={spell.name}>
                    {spell.name} (Level {spell.level} {spell.school})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSpellReplacementModal(false)}
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-secondary)]/80 text-[var(--color-text-primary)] py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSpellReplacement}
                disabled={!selectedReplacementSpell}
                className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] py-2 px-4 rounded transition-colors"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spell Preparation Modal */}
      {showSpellPreparationModal && (
        <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-card rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Prepare Spells</h3>
                <p className="text-muted-foreground text-sm">
                  {(() => {
                    const spellcastingType = getSpellcastingType(currentCharacter.class);
                    if (spellcastingType === 'known') {
                      return `${currentCharacter.class}s don't prepare spells - all known spells are always available`;
                    }
                    const spellcastingAbility = getSpellcastingAbility(currentCharacter.class) || 'intelligence';
                    const abilityValue = currentCharacter[spellcastingAbility as keyof typeof currentCharacter] as number || 10;
                    const abilityModifier = getModifier(abilityValue);
                    const maxPrepared = getSpellsPreparedCount(currentCharacter.class, currentCharacter.level, abilityModifier);
                    return `Choose spells to prepare for the day (${tempPreparedSpells.filter(s => s.level > 0).length} / ${maxPrepared} prepared) • Cantrips are always available`;
                  })()}
                </p>
              </div>
              <button
                onClick={() => setShowSpellPreparationModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Spell Selection with Tabs */}
              {(() => {
                const spellcastingType = getSpellcastingType(currentCharacter.class);
                
                // Use the availableSpells state that was loaded when opening the modal
                if (spellcastingType === 'known') {
                  // Known spellcasters (Sorcerers, Bards, etc.) don't prepare spells
                  return (
                    <div className="text-center py-8">
                      <div className="text-muted-foreground text-lg mb-4">
                        {currentCharacter.class}s don&apos;t prepare spells daily
                      </div>
                      <div className="text-muted-foreground/60 text-sm">
                        As a {currentCharacter.class}, all your known spells are always available to cast.
                      </div>
                    </div>
                  );
                }
                
                if (availableSpells.length === 0) {
                  return (
                    <div className="text-center py-8">
                      <div className="text-muted-foreground text-lg mb-4">
                        Loading spells...
                      </div>
                      <div className="text-muted-foreground/60 text-sm">
                        Please wait while we load your available spells.
                      </div>
                    </div>
                  );
                }
                
                // Separate cantrips and spells
                const spells = availableSpells.filter(spell => spell.level > 0);
                
                // Group spells by level
                const spellsByLevel: Record<number, Spell[]> = {};
                spells.forEach((spell: Spell) => {
                  if (!spellsByLevel[spell.level]) {
                    spellsByLevel[spell.level] = [];
                  }
                  spellsByLevel[spell.level].push(spell);
                });
                

                
                return (
                  <div className="space-y-6">
                    {/* Explanation */}
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <p className="text-accent-foreground text-sm">
                        {spellcastingType === 'spellbook' 
                          ? 'As a Wizard, you prepare spells from your spellbook. Cantrips are always available.'
                          : `As a ${currentCharacter.class}, you can prepare spells from your entire spell list. Cantrips are always available.`
                        }
                      </p>
                      {(() => {
                        const knownCantrips = tempPreparedSpells.filter(s => s.level === 0);
                        // For now, use a default value - we can enhance this later with proper API call
                        const maxCantrips = 2; // Default for most classes, can be enhanced
                        
                        if (knownCantrips.length === 0 && maxCantrips > 0) {
                          return (
                            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                              <p className="text-yellow-700 text-sm mb-2">
                                You haven&apos;t selected your cantrips yet. You can choose {maxCantrips} cantrip{maxCantrips > 1 ? 's' : ''} from your class spell list.
                              </p>
                              <button
                                onClick={() => {
                                  setShowSpellPreparationModal(false);
                                  handleOpenCantripManagement();
                                }}
                                className="bg-[var(--color-warning)] hover:bg-[var(--color-warning)]/80 text-[var(--color-warning-text)] px-3 py-1 rounded text-sm transition-colors"
                              >
                                Select Cantrips
                              </button>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    
                    {/* Spell Content */}
                    <div className="max-h-[50vh] overflow-y-auto">
                      <div className="space-y-6">
                        {Object.entries(spellsByLevel)
                          .sort(([a], [b]) => parseInt(a) - parseInt(b))
                          .map(([level, levelSpells]) => (
                            <div key={level}>
                              <h4 className="text-lg font-medium text-foreground mb-3">
                                Level {level} Spells
                              </h4>
                              <div className="space-y-2">
                                {levelSpells.map((spell, index) => {
                                  const isSelected = tempPreparedSpells.some(s => s.name === spell.name);
                                  const spellcastingAbility = getSpellcastingAbility(currentCharacter.class) || 'intelligence';
                                  const abilityValue = currentCharacter[spellcastingAbility as keyof typeof currentCharacter] as number || 10;
                                  const abilityModifier = getModifier(abilityValue);
                                  const maxPrepared = getSpellsPreparedCount(
                                    currentCharacter.class, 
                                    currentCharacter.level, 
                                    abilityModifier
                                  );
                                  // Count only non-cantrip spells toward the preparation limit
                                  const currentNonCantripsPrepared = tempPreparedSpells.filter(s => s.level > 0).length;
                                  const canSelect = isSelected || currentNonCantripsPrepared < maxPrepared;
                                  
                                  // DEBUG: Log spell preparation logic
                                  console.log('🔮 SPELL PREPARATION DEBUG:', {
                                    spellName: spell.name,
                                    isSelected,
                                    spellcastingAbility,
                                    abilityValue,
                                    abilityModifier,
                                    maxPrepared,
                                    currentNonCantripsPrepared,
                                    canSelect,
                                    characterClass: currentCharacter.class,
                                    characterLevel: currentCharacter.level
                                  });
                                  
                                  return (
                                    <div
                                      key={index}
                                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                        isSelected 
                                          ? 'border-[var(--color-accent)] bg-[var(--color-accent-bg)]' 
                                          : canSelect 
                                            ? 'border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-card)]'
                                            : 'border-[var(--color-border)] bg-[var(--color-muted)] opacity-50 cursor-not-allowed'
                                      }`}
                                      onClick={() => {
                                        if (canSelect) {
                                          handleTogglePreparedSpell(spell);
                                        }
                                      }}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <span className="text-foreground font-medium">{spell.name}</span>
                                          <span className="text-xs bg-muted px-2 py-1 rounded">
                                            {spell.school}
                                          </span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${
                                          isSelected 
                                            ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]' 
                                            : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)]'
                                        }`}>
                                          {isSelected ? 'Prepared' : 'Prepare'}
                                        </span>
                                      </div>
                                      <div className="text-muted-foreground text-xs mb-2">
                                        {spell.castingTime} • {spell.range} • {spell.duration}
                                      </div>
                                      <div className="text-foreground text-sm">
                                        {spell.description}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="flex gap-3 p-6 border-t border-border">
              {(() => {
                const spellcastingType = getSpellcastingType(currentCharacter.class);
                if (spellcastingType === 'known') {
                  return (
                    <button
                      onClick={() => setShowSpellPreparationModal(false)}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded transition-colors"
                    >
                      Close
                    </button>
                  );
                }
                return (
                  <>
                    <button
                      onClick={handleSaveSpellPreparation}
                      className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] py-2 px-4 rounded transition-colors"
                    >
                      Save Prepared Spells
                    </button>
                    <button
                      onClick={() => setShowSpellPreparationModal(false)}
                      className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2 px-4 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Cantrip Management Modal (for prepared spellcasters) */}
      {showCantripManagementModal && (
        <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] flex-shrink-0">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">Manage Cantrips</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {currentCharacter.class}s can swap cantrips when they gain levels. You can replace existing cantrips with new ones from your class spell list.
                </p>
              </div>
              <button
                onClick={() => setShowCantripManagementModal(false)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {/* Cantrip Slots Section */}
                <div>
                  <h4 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">
                    Cantrip Slots ({tempKnownCantrips.length}/{maxCantrips})
                  </h4>
                  
                  <div className="space-y-3">
                    {/* Show existing cantrips */}
                    {tempKnownCantrips.map((cantrip, index) => (
                      <div
                        key={index}
                        className="p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-card-secondary)]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--color-text-primary)] font-medium">{cantrip.name}</span>
                            <span className="text-xs bg-[var(--color-muted)] px-2 py-1 rounded">
                              {cantrip.school}
                            </span>
                          </div>
                          <button
                            onClick={() => handleReplaceCantrip(cantrip)}
                            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm transition-colors"
                          >
                            Replace
                          </button>
                        </div>
                        <div className="text-[var(--color-text-secondary)] text-xs mb-2">
                          {cantrip.castingTime} • {cantrip.range} • {cantrip.duration}
                        </div>
                        <div className="text-[var(--color-text-secondary)] text-sm">
                          {cantrip.description}
                        </div>
                      </div>
                    ))}
                    
                    {/* Show empty slots */}
                    {Array.from({ length: Math.max(0, maxCantrips - tempKnownCantrips.length) }, (_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="p-4 border border-dashed border-[var(--color-border)] rounded-lg bg-[var(--color-card-secondary)] opacity-50 cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={handleSelectCantripForEmptySlot}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[var(--color-text-secondary)] font-medium">Empty Cantrip Slot</span>
                          </div>
                          <span className="text-[var(--color-accent)] text-sm">
                            Select
                          </span>
                        </div>
                        <div className="text-[var(--color-text-secondary)] text-sm">
                          Click to choose a cantrip from the available options
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-[var(--color-border)] flex-shrink-0">
              <button
                onClick={handleSaveCantripChanges}
                className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] py-2 px-4 rounded transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowCantripManagementModal(false)}
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-secondary)]/80 text-[var(--color-text-primary)] py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cantrip Replacement Modal */}
      {showCantripReplacementModal && (
        <div className="fixed inset-0 flex items-start justify-center p-4 pt-8 z-50" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="bg-[var(--color-card)] rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Replace Cantrip</h3>
              <button
                onClick={() => setShowCantripReplacementModal(false)}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                {cantripToReplace ? (
                  <>Replace <span className="font-medium text-[var(--color-text-primary)]">{cantripToReplace.name}</span> with:</>
                ) : (
                  <>Select a cantrip to add:</>
                )}
              </p>
              
              <select
                value={selectedReplacementCantrip}
                onChange={(e) => setSelectedReplacementCantrip(e.target.value)}
                className="w-full bg-[var(--color-card-secondary)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none"
              >
                <option value="">{cantripToReplace ? 'Select a replacement cantrip...' : 'Select a cantrip to add...'}</option>
                {availableReplacementCantrips.map((cantrip) => (
                  <option key={cantrip.name} value={cantrip.name}>
                    {cantrip.name} ({cantrip.school})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCantripReplacementModal(false)}
                className="flex-1 bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-secondary)]/80 text-[var(--color-text-primary)] py-2 px-4 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCantripReplacement}
                disabled={!selectedReplacementCantrip}
                className="flex-1 bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--color-button-text)] py-2 px-4 rounded transition-colors"
              >
                {cantripToReplace ? 'Replace' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 