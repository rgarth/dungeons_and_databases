import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedClasses } from '@/lib/server/init';

export async function GET() {
  try {
    // Return cached data if available
    if (cachedClasses) {
      return NextResponse.json(cachedClasses);
    }

    // Fallback to database if cache is not initialized
    const classes = await prisma.dndClass.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        hitDie: true,
        primaryAbility: true,
        savingThrows: true,
        skillChoices: true,
        armorProficiencies: {
          select: {
            armorType: true
          }
        },
        weaponProficiencies: {
          select: {
            proficiencyType: true,
            weaponName: true
          }
        },
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Transform relations (no need to parse JSON fields - Prisma handles this automatically)
    const parsedClasses = classes.map(dndClass => ({
      ...dndClass,
      armorProficiencies: dndClass.armorProficiencies.map(prof => prof.armorType),
      weaponProficiencies: dndClass.weaponProficiencies.map(prof => ({
        type: prof.proficiencyType,
        weapon: prof.weaponName
      }))
    }));

    return NextResponse.json(parsedClasses);
  } catch (error) {
    console.error('Failed to fetch classes:', error);
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
} 