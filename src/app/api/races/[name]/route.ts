import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const raceName = decodeURIComponent(name);
    const race = dndDataService.getRaceByName(raceName);
    if (!race) {
      return NextResponse.json(
        { error: 'Race not found' },
        { status: 404 }
      );
    }
    // Attach subraces
    const subraces = dndDataService.getSubraces().filter((sub) => sub.raceName === race.name);
    return NextResponse.json({ ...race, subraces });
  } catch (error) {
    console.error('Error fetching race:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 