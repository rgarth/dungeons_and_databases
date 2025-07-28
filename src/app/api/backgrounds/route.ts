import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET() {
  try {
    const backgrounds = dndDataService.getBackgrounds();
    
    // Transform to match the expected API structure
    const transformedBackgrounds = backgrounds.map(bg => ({
      id: `bg_${bg.name.toLowerCase().replace(/\s+/g, '_')}`,
      name: bg.name,
      description: bg.description,
      phbDescription: bg.phbDescription,
      skillProficiencies: bg.skillProficiencies,
      languages: bg.languages,
      equipment: bg.equipment,
      startingGold: bg.startingGold,
      feature: bg.feature,
      featureDescription: bg.featureDescription,
      suggestedCharacteristics: bg.suggestedCharacteristics,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    return NextResponse.json(transformedBackgrounds);
  } catch (error) {
    console.error('Failed to fetch backgrounds:', error);
    return NextResponse.json({ error: 'Failed to fetch backgrounds' }, { status: 500 });
  }
} 