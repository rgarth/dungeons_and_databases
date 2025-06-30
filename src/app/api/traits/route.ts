import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const traitName = searchParams.get('name');
    const race = searchParams.get('race');
    const subrace = searchParams.get('subrace');

    if (traitName) {
      // Get specific trait by name
      const trait = await prisma.trait.findUnique({
        where: { name: traitName }
      });

      if (!trait) {
        return NextResponse.json(
          { error: 'Trait not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(trait);
    }

    if (race || subrace) {
      // Get traits for a specific race or subrace using join table
      let traits: Array<{ id: string; name: string; description: string; type: string; createdAt: Date; updatedAt: Date }> = [];

      if (subrace) {
        // Get subrace traits via join table
        const subraceTraits = await prisma.subraceTrait.findMany({
          where: {
            subrace: {
              name: subrace
            }
          },
          include: {
            trait: true
          }
        });
        
        traits = subraceTraits.map(st => st.trait);
      } else if (race) {
        // Get race traits via join table (for races with no subraces, look for subrace with same name)
        const raceTraits = await prisma.subraceTrait.findMany({
          where: {
            subrace: {
              name: race
            }
          },
          include: {
            trait: true
          }
        });
        
        traits = raceTraits.map(st => st.trait);
      }

      return NextResponse.json(traits);
    }

    // Return all traits if no specific query
    const allTraits = await prisma.trait.findMany({
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(allTraits);
  } catch (error) {
    console.error('Error fetching traits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traits' },
      { status: 500 }
    );
  }
} 