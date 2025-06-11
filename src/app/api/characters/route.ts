import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCharacterValidationService } from "@/services/api/character-validation";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by email since session.user.id might not be available
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const characters = await prisma.character.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by email since session.user.id might not be available
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      race,
      class: characterClass,
      subclass,
      level,
      alignment,
      background,
      backgroundCharacteristics,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      hitPoints,
      maxHitPoints,
      armorClass,
      inventory,
      skills,
      weapons,
      inventoryWeapons,
      armor, // Client-provided armor with equipped boolean
      inventoryArmor, // Legacy - client-provided armor from suggestions
      ammunition, // Client-provided ammunition
      spellsKnown,
      spellsPrepared,
      spellSlots,
      spellcastingAbility,
      spellSaveDC,
      spellAttackBonus,
      actions,
      bonusActions,
      reactions,
      copperPieces,
      silverPieces,
      goldPieces,
      avatar,
    } = body;

    // Validate required fields
    if (!name || !race || !characterClass) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log('=== SERVER-SIDE EQUIPMENT PROCESSING ===');
    console.log('Raw inventory from client:', inventory);

    // Helper method to check if an item is a placeholder that needs resolution
    const isPlaceholderItem = (itemName: string): boolean => {
      const placeholders = [
        'Simple Weapon',
        'Martial Weapon', 
        'Light Armor',
        'Medium Armor',
        'Heavy Armor',
        'Any Weapon',
        'Any Armor'
      ];
      return placeholders.includes(itemName);
    };

    // Helper method to normalize equipment names (handle naming differences between client and database)
    const normalizeEquipmentName = (itemName: string): string => {
      const nameMap: Record<string, string> = {
        'Leather Armor': 'Leather',
        'Studded Leather Armor': 'Studded Leather',
        'Scale Mail': 'Scale Mail',
        'Chain Mail': 'Chain Mail',
        'Splint Armor': 'Splint',
        'Plate Armor': 'Plate',
        'Arrow (20)': 'Arrows (20)',
        'Quiver of 20 Arrows': 'Arrows (20)',
        'Quiver of 20 Bolts': 'Crossbow Bolts (20)'
      };
      return nameMap[itemName] || itemName;
    };

    // Separate armor and weapons from general inventory (server-side database lookups)
    const processedInventory: Array<{name: string; quantity: number}> = [];
    const processedInventoryArmor: Array<{
      name: string;
      type: string;
      baseAC: number;
      maxDexBonus: number | null;
      minStrength: number | null;
      stealthDisadvantage: boolean;
      weight: number;
      cost: string;
      description: string;
    }> = [];
    const processedInventoryWeapons: Array<{
      name: string;
      type: string;
      category: string;
      damage: string;
      damageType: string;
      properties: string[];
      weight: number;
      cost: string;
      stackable: boolean;
    }> = [];

    if (inventory && Array.isArray(inventory)) {
      for (const item of inventory as Array<{name: string; quantity: number}>) {
        const itemName = item.name;
        const normalizedName = normalizeEquipmentName(itemName);
        console.log(`🔍 Checking if "${itemName}" (normalized: "${normalizedName}") is equipment...`);
        
        // Handle placeholder items that need resolution
        if (isPlaceholderItem(itemName)) {
          console.log(`⚠️ Skipping placeholder item: ${itemName} (needs manual selection)`);
          continue; // Skip placeholder items for now
        }
        
        // Check if this item exists in the weapons database
        const weaponData = await prisma.weapon.findFirst({
          where: {
            name: {
              equals: normalizedName
            }
          }
        });

        if (weaponData) {
          console.log(`✅ Found weapon in database: ${weaponData.name}`);
          // Convert to weapon object and add to inventoryWeapons
          const weaponObject = {
            name: weaponData.name,
            type: weaponData.type,
            category: weaponData.category,
            damage: weaponData.damage,
            damageType: weaponData.damageType,
            properties: weaponData.properties ? JSON.parse(weaponData.properties) : [],
            weight: weaponData.weight,
            cost: weaponData.cost,
            stackable: weaponData.stackable
          };
          processedInventoryWeapons.push(weaponObject);
          console.log(`✅ Added to weapon inventory: ${weaponObject.name}`);
          continue; // Skip to next item
        }
        
        // Check if this item exists in the armor database
        const armorData = await prisma.armor.findFirst({
          where: {
            name: {
              equals: normalizedName
            }
          }
        });

        if (armorData) {
          console.log(`✅ Found armor in database: ${armorData.name}`);
          // Convert to armor object and add to inventoryArmor
          const armorObject = {
            name: armorData.name,
            type: armorData.type,
            baseAC: armorData.baseAC,
            maxDexBonus: armorData.maxDexBonus,
            minStrength: armorData.minStrength,
            stealthDisadvantage: armorData.stealthDisadvantage,
            weight: armorData.weight,
            cost: armorData.cost,
            description: armorData.description
          };
          processedInventoryArmor.push(armorObject);
          console.log(`✅ Added to armor inventory: ${armorObject.name}`);
        } else {
          console.log(`➡️ Not weapon or armor, adding to general inventory: ${itemName}`);
          // Keep in general inventory
          processedInventory.push(item);
        }
      }
    }

    // Also include client-provided armor (with equipped boolean)
    const clientArmor = armor || inventoryArmor || [];
    console.log('=== CLIENT-PROVIDED ARMOR ===');
    console.log('Client armor (with equipped boolean):', clientArmor);
    
    // Combine processed armor (from inventory) with client-provided armor
    const allInventoryArmor = [...processedInventoryArmor, ...clientArmor];

    console.log('=== FINAL SERVER PROCESSING ===');
    console.log('General inventory:', processedInventory.map(item => typeof item === 'string' ? item : item.name));
    console.log('Weapon inventory:', processedInventoryWeapons.map(weapon => weapon.name));
    console.log('Processed armor inventory:', processedInventoryArmor.map(armor => armor.name));
    console.log('Client armor inventory:', clientArmor.map((armor: { name: string }) => armor.name));
    console.log('Combined armor inventory:', allInventoryArmor.map(armor => armor.name));

    // Use validation service for comprehensive validation
    const validationService = createCharacterValidationService();
    const validation = validationService.validateCharacterCreation({
      name,
      race,
      class: characterClass,
      subclass,
      level,
      alignment,
      background,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      hitPoints,
      maxHitPoints,
      armorClass,
    });

    if (!validation.isValid) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.errors 
      }, { status: 400 });
    }

    const character = await prisma.character.create({
      data: {
        name,
        race,
        class: characterClass,
        ...(subclass && { subclass }),
        level: level || 1,
        // Initialize multiclass structure for new characters (JSON fields)
        classes: JSON.stringify([{
          class: characterClass,
          level: level || 1,
        }]),
        totalLevel: level || 1,
        selectedFeatures: JSON.stringify([]),
        alignment,
        background,
        // Background characteristics  
        personalityTraits: backgroundCharacteristics?.personalityTraits || [],
        ideals: backgroundCharacteristics?.ideals || [],
        bonds: backgroundCharacteristics?.bonds || [],
        flaws: backgroundCharacteristics?.flaws || [],
        strength: strength || 10,
        dexterity: dexterity || 10,
        constitution: constitution || 10,
        intelligence: intelligence || 10,
        wisdom: wisdom || 10,
        charisma: charisma || 10,
        hitPoints: hitPoints || 10,
        maxHitPoints: maxHitPoints || 10,
        armorClass: armorClass || 10,
        inventory: processedInventory, // Use processed inventory without weapons or armor
        skills: skills || [],
        weapons: weapons || [],
        inventoryWeapons: [...(inventoryWeapons || []), ...processedInventoryWeapons], // Merge client weapons with processed weapons
        armor: allInventoryArmor, // New system: all armor with equipped boolean
        inventoryArmor: allInventoryArmor, // Legacy compatibility
        ammunition: ammunition || [], // Ammunition array
        spellsKnown,
        spellsPrepared,
        spellSlots: spellSlots || {},
        spellcastingAbility,
        spellSaveDC,
        spellAttackBonus,
        actions: actions || [],
        bonusActions: bonusActions || [],
        reactions: reactions || [],
        copperPieces: copperPieces || 0,
        silverPieces: silverPieces || 0,
        goldPieces: goldPieces || 0,
        deathSaveSuccesses: 0,
        deathSaveFailures: 0,
        avatar: avatar || null,
        user: {
          connect: { id: user.id }
        },
      },
    });

    return NextResponse.json(character, { status: 201 });
  } catch (error) {
    console.error("Error creating character:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by email since session.user.id might not be available
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const characterId = searchParams.get('id');

    if (!characterId) {
      return NextResponse.json({ error: "Character ID is required" }, { status: 400 });
    }

    // Verify the character belongs to the current user
    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
        userId: user.id,
      },
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // Delete the character
    await prisma.character.delete({
      where: { id: characterId },
    });

    return NextResponse.json({ message: "Character deleted successfully" });
  } catch (error) {
    console.error("Error deleting character:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by email since session.user.id might not be available
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const characterId = searchParams.get('id');

    if (!characterId) {
      return NextResponse.json({ error: "Character ID is required" }, { status: 400 });
    }

    const body = await request.json();
    
    // Validate update data using validation service
    const validationService = createCharacterValidationService();
    
    // Get current character data for context
    const currentCharacter = await prisma.character.findFirst({
      where: {
        id: characterId,
        userId: user.id,
      },
      select: {
        class: true,
        level: true,
      },
    });

    if (!currentCharacter) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // Validate the update
    const validation = validationService.validateCharacterUpdate(
      {
        level: body.level,
        subclass: body.subclass,
        appearance: body.appearance,
        personality: body.personality,
        backstory: body.backstory,
        notes: body.notes,
      },
      currentCharacter
    );

    if (!validation.isValid) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.errors 
      }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};

    // Handle level up updates
    if (body.level !== undefined) {
      updateData.level = body.level;
    }
    
    // Handle subclass updates
    if (body.subclass !== undefined) {
      updateData.subclass = body.subclass;
    }
    if (body.hitPoints !== undefined) {
      updateData.hitPoints = body.hitPoints;
    }
    if (body.maxHitPoints !== undefined) {
      updateData.maxHitPoints = body.maxHitPoints;
    }
    if (body.temporaryHitPoints !== undefined) {
      updateData.temporaryHitPoints = body.temporaryHitPoints;
    }
    if (body.proficiencyBonus !== undefined) {
      updateData.proficiencyBonus = body.proficiencyBonus;
    }

    // Handle ability score updates
    if (body.strength !== undefined) {
      updateData.strength = body.strength;
    }
    if (body.dexterity !== undefined) {
      updateData.dexterity = body.dexterity;
    }
    if (body.constitution !== undefined) {
      updateData.constitution = body.constitution;
    }
    if (body.intelligence !== undefined) {
      updateData.intelligence = body.intelligence;
    }
    if (body.wisdom !== undefined) {
      updateData.wisdom = body.wisdom;
    }
    if (body.charisma !== undefined) {
      updateData.charisma = body.charisma;
    }

    // Handle spell updates
    if (body.spellsKnown !== undefined) {
      updateData.spellsKnown = body.spellsKnown;
    }
    if (body.spellsPrepared !== undefined) {
      updateData.spellsPrepared = body.spellsPrepared;
    }
    if (body.spellSlots !== undefined) {
      updateData.spellSlots = body.spellSlots;
    }

    // Handle inventory updates (support both old string[] and new InventoryItem[] formats)
    if (body.inventory !== undefined) {
      updateData.inventory = body.inventory;
    }

    // Handle money updates
    if (body.copperPieces !== undefined) {
      updateData.copperPieces = body.copperPieces;
    }
    if (body.silverPieces !== undefined) {
      updateData.silverPieces = body.silverPieces;
    }
    if (body.goldPieces !== undefined) {
      updateData.goldPieces = body.goldPieces;
    }

    // Handle treasures updates
    if (body.treasures !== undefined) {
      updateData.treasures = body.treasures;
    }

    // Handle weapons updates (support both regular and magical weapons)
    if (body.weapons !== undefined) {
      updateData.weapons = body.weapons;
    }

    // Handle inventory weapons updates (unequipped weapons)
    if (body.inventoryWeapons !== undefined) {
      updateData.inventoryWeapons = body.inventoryWeapons;
    }

    // Handle armor updates (equipped armor)
    if (body.armor !== undefined) {
      updateData.armor = body.armor;
    }

    // Handle inventory armor updates (unequipped armor)
    if (body.inventoryArmor !== undefined) {
      updateData.inventoryArmor = body.inventoryArmor;
    }

    // Handle ammunition updates
    if (body.ammunition !== undefined) {
      updateData.ammunition = body.ammunition;
    }

    // Handle magical items updates (equipped magical items)
    if (body.magicalItems !== undefined) {
      updateData.magicalItems = body.magicalItems;
    }

    // Handle inventory magical items updates (unequipped magical items)
    if (body.inventoryMagicalItems !== undefined) {
      updateData.inventoryMagicalItems = body.inventoryMagicalItems;
    }

    // Handle attuned items updates (list of attuned magical item names)
    if (body.attunedItems !== undefined) {
      updateData.attunedItems = body.attunedItems;
    }

    // Handle character background/detail updates
    if (body.appearance !== undefined) {
      updateData.appearance = body.appearance;
    }
    if (body.personality !== undefined) {
      updateData.personality = body.personality;
    }
    if (body.backstory !== undefined) {
      updateData.backstory = body.backstory;
    }
    if (body.notes !== undefined) {
      updateData.notes = body.notes;
    }
    if (body.avatar !== undefined) {
      updateData.avatar = body.avatar;
    }
    if (body.inspiration !== undefined) {
      updateData.inspiration = body.inspiration;
    }

    // Handle death saves updates
    if (body.deathSaveSuccesses !== undefined) {
      updateData.deathSaveSuccesses = body.deathSaveSuccesses;
    }
    if (body.deathSaveFailures !== undefined) {
      updateData.deathSaveFailures = body.deathSaveFailures;
    }

    // Handle languages updates
    if (body.languages !== undefined) {
      updateData.languages = body.languages;
    }

    // Handle conditions updates
    if (body.conditions !== undefined) {
      updateData.conditions = body.conditions;
    }

    // Handle background characteristics updates
    if (body.backgroundCharacteristics !== undefined) {
      updateData.personalityTraits = body.backgroundCharacteristics.personalityTraits || [];
      updateData.ideals = body.backgroundCharacteristics.ideals || [];
      updateData.bonds = body.backgroundCharacteristics.bonds || [];
      updateData.flaws = body.backgroundCharacteristics.flaws || [];
    }

    // Verify the character belongs to the current user and update
    const character = await prisma.character.updateMany({
      where: {
        id: characterId,
        userId: user.id,
      },
      data: updateData,
    });

    if (character.count === 0) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // Return the updated character
    const updatedCharacter = await prisma.character.findUnique({
      where: { id: characterId },
    });

    return NextResponse.json(updatedCharacter);
  } catch (error) {
    console.error("Error updating character:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}