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
      inventoryArmor,
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
    } = body;

    // Validate required fields
    if (!name || !race || !characterClass) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

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
        strength: strength || 10,
        dexterity: dexterity || 10,
        constitution: constitution || 10,
        intelligence: intelligence || 10,
        wisdom: wisdom || 10,
        charisma: charisma || 10,
        hitPoints: hitPoints || 10,
        maxHitPoints: maxHitPoints || 10,
        armorClass: armorClass || 10,
        inventory: inventory || [],
        skills: skills || [],
        weapons: weapons || [],
        inventoryWeapons: inventoryWeapons || [],
        inventoryArmor: inventoryArmor || [],
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