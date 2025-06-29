import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const race = await prisma.dndRace.findUnique({
      where: { name }
    });

    if (!race) {
      return new NextResponse('Race not found', { status: 404 });
    }

    // Parse JSON fields manually to ensure they're properly formatted
    const parsedRace = {
      ...race,
      abilityScoreIncrease: typeof race.abilityScoreIncrease === 'string' 
        ? JSON.parse(race.abilityScoreIncrease) 
        : race.abilityScoreIncrease,
      traits: typeof race.traits === 'string' 
        ? JSON.parse(race.traits) 
        : race.traits,
      languages: typeof race.languages === 'string' 
        ? JSON.parse(race.languages) 
        : race.languages
    };

    return NextResponse.json(parsedRace);
  } catch (error) {
    console.error('Error fetching race:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 