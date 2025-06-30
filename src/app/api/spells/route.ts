import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedSpells } from '@/lib/server/init';

export async function GET(request: NextRequest) {
  try {
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

    // Fallback to database if cache is not initialized
    let whereClause = {};
    
    if (className) {
      whereClause = {
        classes: {
          contains: className
        }
      };
    }

    if (level) {
      whereClause = {
        ...whereClause,
        level: parseInt(level)
      };
    }

    const spells = await prisma.spell.findMany({
      where: whereClause,
      orderBy: [
        { level: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json(spells);
  } catch (error) {
    console.error('Error fetching spells:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spells' }, 
      { status: 500 }
    );
  }
} 