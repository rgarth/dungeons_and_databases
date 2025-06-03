import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
      spells,
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

    const character = await prisma.character.create({
      data: {
        name,
        race,
        class: characterClass,
        level: level || 1,
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
        spells: spells || [],
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
        userId: user.id,
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
    const updateData: {
      inventory?: string[] | { name: string; quantity: number }[];
      copperPieces?: number;
      silverPieces?: number;
      goldPieces?: number;
      treasures?: { name: string; value: number; description?: string }[];
      weapons?: string[] | { name: string; quantity: number }[];
      inventoryWeapons?: string[] | { name: string; quantity: number }[];
      armor?: string[] | { name: string; quantity: number }[];
      inventoryArmor?: string[] | { name: string; quantity: number }[];
    } = {};

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