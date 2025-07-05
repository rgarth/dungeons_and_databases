import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

interface Race {
  name: string;
  size: string;
  speed: number;
  traits: string[];
  abilityScoreIncrease: string;
  languages: string[];
  description: string;
}

interface Subrace {
  name: string;
  raceName: string;
  description: string;
  abilityScoreIncrease: string;
  traits: string[];
  languages?: string[] | null;
}

export async function GET() {
  try {
    // Get all races from the in-memory data service
    const races = dndDataService.getRaces();
    // Optionally, attach subraces to each race if needed
    const subraces = dndDataService.getSubraces();
    const racesWithSubraces = races.map((race: Race) => ({
      ...race,
      subraces: subraces.filter((sub: Subrace) => sub.raceName === race.name)
    }));
    return NextResponse.json(racesWithSubraces);
  } catch (error) {
    console.error('Error fetching races:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 