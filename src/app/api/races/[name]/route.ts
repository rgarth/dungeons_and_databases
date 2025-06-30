import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const raceName = decodeURIComponent(params.name);
    
    const race = await prisma.dndRace.findUnique({
      where: { name: raceName },
      include: {
        subraces: {
          select: {
            id: true,
            name: true,
            description: true,
            abilityScoreIncrease: true,
            languages: true
          }
        }
      }
    });

    if (!race) {
      return NextResponse.json(
        { error: 'Race not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(race);
  } catch (error) {
    console.error('Error fetching race:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 