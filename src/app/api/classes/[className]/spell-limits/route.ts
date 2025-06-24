import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ className: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const level = parseInt(searchParams.get('level') || '1');
    const { className } = await params;
    const decodedClassName = decodeURIComponent(className);

    // Get spell limits using raw SQL query since Prisma client doesn't have the new model yet
    const result = await prisma.$queryRaw`
      SELECT 
        csl."cantripsKnown",
        csl."spellsKnown", 
        csl."spellcastingType",
        csl."maxSpellLevel",
        csl."spellLevelLimits"
      FROM "ClassSpellLimits" csl
      JOIN "DndClass" dc ON csl."classId" = dc.id
      WHERE dc.name = ${decodedClassName} AND csl."level" = ${level}
    `;

    if (!result || !Array.isArray(result) || result.length === 0) {
      return NextResponse.json(
        { error: 'Spell limits not found for this class and level' }, 
        { status: 404 }
      );
    }

    const spellLimits = result[0] as {
      cantripsKnown: number;
      spellsKnown: number;
      spellcastingType: string;
      maxSpellLevel: number;
      spellLevelLimits: Record<string, number>;
    };

    return NextResponse.json(spellLimits);
  } catch (error) {
    console.error('Error fetching spell limits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spell limits' }, 
      { status: 500 }
    );
  }
} 