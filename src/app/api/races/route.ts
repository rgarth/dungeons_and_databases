import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET() {
  try {
    // Get all races from the in-memory data service
    const races = dndDataService.getRaces();
    // Optionally, attach subraces to each race if needed
    const subraces = dndDataService.getSubraces();
    const racesWithSubraces = races.map((race: any) => ({
      ...race,
      subraces: subraces.filter((sub: any) => sub.race === race.name)
    }));
    return NextResponse.json(racesWithSubraces);
  } catch (error) {
    console.error('Error fetching races:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 