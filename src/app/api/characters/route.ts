import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCharacterValidationService } from "@/services/api/character-validation";
import { getRacialLanguages } from "@/lib/dnd/languages";
import { getClassLanguages } from "@/lib/dnd/languages";
import { DndDataService } from "@/lib/dnd-data-service";

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

    // More debug logging
    console.log('User ID:', user.id);

    const characters = await prisma.character.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Log character count
    console.log('Found characters:', characters.length);

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
      subrace,
      class: characterClass,
      subclass,
      level,
      alignment,
      background,
      backgroundCharacteristics,
      gender,
      age,
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
      skillSources,
      weapons,
      inventoryWeapons,
      armor,
      inventoryArmor,
      ammunition,
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
      kiPoints,
      usedKiPoints,
      avatar,
      fullBodyAvatar,
      racialTraits,
      languageSources,
      appearance
    } = body;

    // Debug ability scores
    console.log('=== ABILITY SCORES DEBUG ===');
    console.log('Received ability scores:', {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma
    });
    console.log('Received subrace:', subrace);
    console.log('Ability score types:', {
      strength: typeof strength,
      dexterity: typeof dexterity,
      constitution: typeof constitution,
      intelligence: typeof intelligence,
      wisdom: typeof wisdom,
      charisma: typeof charisma
    });

    // Validate required fields
    if (!name || !race || !characterClass) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log('=== SERVER-SIDE EQUIPMENT PROCESSING ===');
    console.log('Raw inventory from client:', inventory);
    console.log('Client-provided weapons:', inventoryWeapons);
    console.log('Client-provided armor:', inventoryArmor);

    // Separate armor and weapons from general inventory (server-side database lookups)
    const processedInventory: Array<{name: string; quantity: number}> = [];

    // Process inventory items (equipment pack items) - no need to scan for weapons/armor
    if (inventory && Array.isArray(inventory)) {
      for (const item of inventory as Array<{equipment?: {name: string}; name?: string; quantity: number}>) {
        // Handle both direct name and nested equipment structure
        const itemName = item.name || item.equipment?.name;
        if (itemName) {
          console.log(`📦 Adding to general inventory: ${itemName}`);
          processedInventory.push({
            name: itemName,
            quantity: item.quantity || 1
          });
        } else {
          console.log(`⚠️ Skipping inventory item with no name:`, item);
        }
      }
    }

    // Use client-provided weapons and armor directly
    const clientArmor = armor || inventoryArmor || [];
    console.log('=== CLIENT-PROVIDED ARMOR ===');
    console.log('Client armor (with equipped boolean):', clientArmor);
    
    const clientWeapons = weapons || inventoryWeapons || [];
    console.log('=== CLIENT-PROVIDED WEAPONS ===');
    console.log('Client weapons:', clientWeapons);
    
    // Process weapons properly - flatten nested structure and handle quantities
    const weaponsWithEquipped: Array<{ name: string; type: string; category: string; damage: string; damageType: string; properties: string[]; weight: number; cost: string; equipped: boolean; quantity?: number; [key: string]: unknown }> = [];
    clientWeapons.forEach((weaponData: { weapon?: { name: string; type: string; category: string; damage: string; damageType: string; properties: string[]; weight: number; cost: string; [key: string]: unknown }; name?: string; quantity?: number; [key: string]: unknown }) => {
      if (weaponData.weapon) {
        // Handle nested weapon structure from weapon selector
        const weapon = weaponData.weapon;
        const quantity = weaponData.quantity || 1;
        
        // All weapons are now added individually (ammunition is handled separately)
        for (let i = 0; i < quantity; i++) {
          weaponsWithEquipped.push({
            ...weapon,
            equipped: false
          });
        }
      } else if (weaponData.name && weaponData.type && weaponData.category && weaponData.damage && weaponData.damageType && weaponData.properties && weaponData.weight && weaponData.cost) {
        // Handle direct weapon structure - only if all required properties are present
        weaponsWithEquipped.push({
          ...weaponData,
          equipped: false
        } as { name: string; type: string; category: string; damage: string; damageType: string; properties: string[]; weight: number; cost: string; equipped: boolean; quantity?: number; [key: string]: unknown });
      }
    });
    
    const armorWithEquipped = clientArmor.map((armor: { name: string; [key: string]: unknown }) => ({
      ...armor,
      equipped: false // All armor starts unequipped
    }));

    console.log('=== FINAL SERVER PROCESSING ===');
    console.log('General inventory:', processedInventory);
    console.log('Client weapon inventory:', clientWeapons.map((w: { weapon?: { name: string }; name?: string }) => w.name || w.weapon?.name));
    console.log('Combined weapon inventory:', weaponsWithEquipped.map((w: { name: string; equipped?: boolean }) => `${w.name} (equipped: ${w.equipped})`));
    console.log('Client armor inventory:', clientArmor.map((a: { name: string }) => a.name));
    console.log('Combined armor inventory:', armorWithEquipped.map((a: { name: string; equipped?: boolean }) => `${a.name} (equipped: ${a.equipped})`));
    
    // Debug the final processedInventory before saving
    console.log('=== FINAL INVENTORY BEFORE SAVE ===');
    console.log('processedInventory:', processedInventory);
    console.log('processedInventory.length:', processedInventory.length);
    console.log('processedInventory type:', typeof processedInventory);
    console.log('Is processedInventory array?', Array.isArray(processedInventory));

    // Use validation service for comprehensive validation
    const validationService = createCharacterValidationService();
    const validation = validationService.validateCharacterCreation({
      name,
      race,
      subrace,
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

    // Initialize languages based on race and background
    const initialLanguages: string[] = [];
    
    // Add racial languages
    const racialLanguages = getRacialLanguages(race);
    initialLanguages.push(...racialLanguages);
    
    // Add class-granted languages
    const classLanguages = getClassLanguages(characterClass);
    initialLanguages.push(...classLanguages);
    
    // Note: Background languages are not automatically added
    // They need to be selected by the user in the character sheet
    // The background language requirements will be shown in the UI

    // Get race data to calculate speed
    const dndDataService = DndDataService.getInstance();
    const raceData = dndDataService.getRaceByName(race);
    
    if (!raceData) {
      return NextResponse.json({ error: `Race '${race}' not found` }, { status: 400 });
    }
    
    if (raceData.speed === undefined || raceData.speed === null) {
      return NextResponse.json({ error: `Race '${race}' is missing speed data` }, { status: 500 });
    }
    
    const speed = raceData.speed;

    // Debug the data being passed to Prisma
    console.log('=== PRISMA CREATE DEBUG ===');
    console.log('processedInventory:', processedInventory);
    console.log('weaponsWithEquipped:', weaponsWithEquipped);
    console.log('armorWithEquipped:', armorWithEquipped);
    console.log('skills:', skills);
    console.log('actions:', actions);
    console.log('racialTraits:', racialTraits);
    console.log('initialLanguages:', initialLanguages);

    const character = await prisma.character.create({
      data: {
        name,
        race,
        subrace,
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
        // Personal information
        gender: gender || null,
        age: age || null,
        appearance: appearance || null,
        strength: strength ?? 10,
        dexterity: dexterity ?? 10,
        constitution: constitution ?? 10,
        intelligence: intelligence ?? 10,
        wisdom: wisdom ?? 10,
        charisma: charisma ?? 10,
        hitPoints: hitPoints ?? 10,
        maxHitPoints: maxHitPoints ?? 10,
        armorClass: armorClass ?? 10,
        speed: speed,
        inventory: processedInventory, // Use processed inventory without weapons or armor
        equipment: processedInventory, // Also set equipment field to match inventory
        skills: skills || [],
        skillSources: skillSources || {},
        languageSources: languageSources || {},
        weapons: weaponsWithEquipped,
        inventoryWeapons: weaponsWithEquipped,
        ammunition: ammunition || [],
        armor: armorWithEquipped,
        inventoryArmor: armorWithEquipped,
        spellsKnown: spellsKnown || null,
        spellsPrepared: spellsPrepared || null,
        spellSlots: spellSlots || null,
        spellcastingAbility: spellcastingAbility || null,
        spellSaveDC: spellSaveDC || null,
        spellAttackBonus: spellAttackBonus || null,
        actions: actions || [],
        bonusActions: bonusActions || [],
        reactions: reactions || [],
        racialTraits: racialTraits || [],
        copperPieces: copperPieces || 0,
        silverPieces: silverPieces || 0,
        goldPieces: goldPieces || 0,
        kiPoints: kiPoints || 0,
        usedKiPoints: usedKiPoints || 0,
        deathSaveSuccesses: [false, false, false],
        deathSaveFailures: [false, false, false],
        avatar: avatar || null,
        fullBodyAvatar: fullBodyAvatar || null,
        languages: initialLanguages, // Initialize with racial and class languages
        userId: user.id
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
    if (body.subrace !== undefined) {
      updateData.subrace = body.subrace;
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
    if (body.usedSpellSlots !== undefined) {
      updateData.usedSpellSlots = body.usedSpellSlots;
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
    if (body.fullBodyAvatar !== undefined) {
      updateData.fullBodyAvatar = body.fullBodyAvatar;
    }
    
    // Handle personal information updates
    if (body.name !== undefined) {
      updateData.name = body.name;
    }
    if (body.gender !== undefined) {
      updateData.gender = body.gender;
    }
    if (body.age !== undefined) {
      updateData.age = body.age;
    }
    if (body.alignment !== undefined) {
      updateData.alignment = body.alignment;
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

    // Handle skills updates
    if (body.skills !== undefined) {
      updateData.skills = body.skills;
    }

    // Handle skillSources updates
    if (body.skillSources !== undefined) {
      updateData.skillSources = body.skillSources;
    }

    // Handle languages updates
    if (body.languages !== undefined) {
      updateData.languages = body.languages;
    }

    // Handle languageSources updates
    if (body.languageSources !== undefined) {
      updateData.languageSources = body.languageSources;
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