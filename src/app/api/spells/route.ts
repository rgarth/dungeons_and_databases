import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedSpells, initializeServerCache } from '@/lib/server/init';

export async function GET(request: NextRequest) {
  try {
    // Initialize server cache if not already done
    if (!cachedSpells) {
      try {
        await initializeServerCache();
      } catch (error) {
        console.warn('Failed to initialize server cache, falling back to direct database queries:', error);
      }
    }

    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const level = searchParams.get('level');

    // Use cached data if available
    if (cachedSpells) {
      let filteredSpells = cachedSpells;
      
      if (className) {
        filteredSpells = filteredSpells.filter(spell => 
          spell.classes.includes(className)
        );
      }

      if (level) {
        const levelNum = parseInt(level);
        filteredSpells = filteredSpells.filter(spell => 
          spell.level === levelNum
        );
      }

      return NextResponse.json(filteredSpells);
    }

    // Fallback to direct database query if cache is not available
    const spells = await prisma.spell.findMany({
      orderBy: [
        { level: 'asc' },
        { name: 'asc' }
      ]
    });

    let filteredSpells = spells;
    
    if (className) {
      filteredSpells = filteredSpells.filter(spell => 
        spell.classes.includes(className)
      );
    }

    if (level) {
      const levelNum = parseInt(level);
      filteredSpells = filteredSpells.filter(spell => 
        spell.level === levelNum
      );
    }

    return NextResponse.json(filteredSpells);
  } catch (error) {
    console.error('Error fetching spells:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spells' }, 
      { status: 500 }
    );
  }
} 