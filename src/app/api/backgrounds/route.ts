import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedBackgrounds } from '@/lib/server/init';

export async function GET() {
  try {
    // Return cached data if available
    if (cachedBackgrounds) {
      return NextResponse.json(cachedBackgrounds);
    }

    // Fallback to database if cache is not initialized
    const backgrounds = await prisma.background.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        phbDescription: true,
        skillProficiencies: true,
        languages: true,
        equipment: true,
        startingGold: true,
        startingGoldFormula: true,
        feature: true,
        featureDescription: true,
        suggestedCharacteristics: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    const parsedBackgrounds = backgrounds.map(background => ({
      ...background,
      skillProficiencies: JSON.parse(background.skillProficiencies as string),
      languages: JSON.parse(background.languages as string),
      equipment: JSON.parse(background.equipment as string),
      suggestedCharacteristics: background.suggestedCharacteristics 
        ? JSON.parse(background.suggestedCharacteristics as string) 
        : null
    }));

    return NextResponse.json(parsedBackgrounds);
  } catch (error) {
    console.error('Failed to fetch backgrounds:', error);
    return NextResponse.json({ error: 'Failed to fetch backgrounds' }, { status: 500 });
  }
} 