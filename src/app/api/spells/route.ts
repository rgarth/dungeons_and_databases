import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const level = searchParams.get('level');

    let spells = dndDataService.getSpells();
    
    if (className) {
      spells = dndDataService.getSpellsByClass(className);
    }

    if (level) {
      const levelNum = parseInt(level);
      spells = spells.filter(spell => spell.level === levelNum);
    }

    return NextResponse.json(spells);
  } catch (error) {
    console.error('Error fetching spells:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spells' }, 
      { status: 500 }
    );
  }
} 