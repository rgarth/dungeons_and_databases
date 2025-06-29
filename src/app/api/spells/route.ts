import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');
    const level = searchParams.get('level');

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