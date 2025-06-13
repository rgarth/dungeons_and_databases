import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DndRace } from '@prisma/client';
import { cachedRaces } from '@/lib/server/init';

export async function GET() {
  try {
    // Return cached data if available
    if (cachedRaces) {
      return NextResponse.json(cachedRaces);
    }

    // Fallback to database if cache is not initialized
    const races = await prisma.dndRace.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        abilityScoreIncrease: true,
        size: true,
        speed: true,
        traits: true,
        languages: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Parse JSON fields
    const parsedRaces = races.map(race => ({
      ...race,
      traits: JSON.parse(race.traits as string),
      languages: JSON.parse(race.languages as string)
    }));

    return NextResponse.json(parsedRaces);
  } catch (error) {
    console.error('Failed to fetch races:', error);
    return NextResponse.json({ error: 'Failed to fetch races' }, { status: 500 });
  }
} 