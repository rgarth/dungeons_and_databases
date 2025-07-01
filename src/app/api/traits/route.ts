import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const traitName = searchParams.get('name');
    const race = searchParams.get('race');
    const subrace = searchParams.get('subrace');

    if (traitName) {
      // Get specific trait by name
      const traits = dndDataService.getTraits();
      const trait = traits.find(t => t.name === traitName);

      if (!trait) {
        return NextResponse.json(
          { error: 'Trait not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(trait);
    }

    if (race || subrace) {
      // Get traits for a specific race or subrace
      if (subrace) {
        // Get subrace traits
        const traits = dndDataService.getTraitsBySubrace(subrace);
        return NextResponse.json(traits);
      } else if (race) {
        // Get race traits
        const traits = dndDataService.getTraitsByRace(race);
        return NextResponse.json(traits);
      }
    }

    // Return all traits if no specific query
    const allTraits = dndDataService.getTraits();
    return NextResponse.json(allTraits);
  } catch (error) {
    console.error('Error fetching traits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traits' },
      { status: 500 }
    );
  }
} 