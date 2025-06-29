import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedClasses } from '@/lib/server/init';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get('className');

    if (!className) {
      return NextResponse.json({ error: 'className parameter is required' }, { status: 400 });
    }

    // Use cached data if available
    if (cachedClasses) {
      const classData = cachedClasses.find(c => c.name === className);
      if (classData) {
        // Get spell suggestions from the cached class data
        const suggestions = await prisma.classSpellSuggestion.findMany({
          where: {
            classId: classData.id
          },
          select: {
            spellName: true,
            level: true,
            reason: true
          },
          orderBy: [
            { level: 'asc' },
            { spellName: 'asc' }
          ]
        });

        return NextResponse.json(suggestions);
      }
    }

    // Fallback to database if cache is not initialized
    const suggestions = await prisma.classSpellSuggestion.findMany({
      where: {
        class: {
          name: className
        }
      },
      select: {
        spellName: true,
        level: true,
        reason: true
      },
      orderBy: [
        { level: 'asc' },
        { spellName: 'asc' }
      ]
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error fetching spell suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch spell suggestions' }, { status: 500 });
  }
} 