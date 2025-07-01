import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

// Spellcasting classes in D&D 5e
const SPELLCASTING_CLASSES = [
  'Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'
];

/**
 * Check if a class can cast spells
 */
function canClassCastSpells(className: string): boolean {
  return SPELLCASTING_CLASSES.includes(className);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ className: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const level = parseInt(searchParams.get('level') || '1');
    const { className } = await params;
    const decodedClassName = decodeURIComponent(className);

    // Check if this class can cast spells using application logic
    if (!canClassCastSpells(decodedClassName)) {
      // Return default values for non-spellcasting classes
      return NextResponse.json({
        cantripsKnown: 0,
        spellsKnown: 0,
        spellcastingType: 'none',
        maxSpellLevel: 0,
        spellLevelLimits: {}
      });
    }

    // Get spell limits from TypeScript data service
    const spellLimits = dndDataService.getSpellLimits(decodedClassName, level);

    if (!spellLimits) {
      // Return default values for spellcasting classes that don't have data for this level
      // This handles cases like Paladin/Ranger level 1 which don't have spellcasting yet
      return NextResponse.json({
        cantripsKnown: 0,
        spellsKnown: 0,
        spellcastingType: 'none',
        maxSpellLevel: 0,
        spellLevelLimits: {}
      });
    }

    return NextResponse.json(spellLimits);
  } catch (error) {
    console.error('Error fetching spell limits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spell limits' }, 
      { status: 500 }
    );
  }
} 