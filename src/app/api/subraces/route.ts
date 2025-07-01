import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raceName = searchParams.get('race');

    if (raceName) {
      // Get subraces for a specific race
      const subraces = dndDataService.getSubracesByRace(raceName);
      return NextResponse.json(subraces);
    } else {
      // Get all subraces
      const subraces = dndDataService.getSubraces();
      return NextResponse.json(subraces);
    }
  } catch (error) {
    console.error('Error fetching subraces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subraces' },
      { status: 500 }
    );
  }
} 