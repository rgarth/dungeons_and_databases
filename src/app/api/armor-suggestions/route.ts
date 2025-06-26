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
        // Get armor suggestions from the cached class data
        const suggestions = await prisma.classArmorSuggestion.findMany({
          where: {
            classId: classData.id
          },
          select: {
            armorName: true,
            reason: true
          },
          orderBy: {
            armorName: 'asc'
          }
        });

        return NextResponse.json(suggestions);
      }
    }

    // Fallback to database if cache is not initialized
    const suggestions = await prisma.classArmorSuggestion.findMany({
      where: {
        class: {
          name: className
        }
      },
      select: {
        armorName: true,
        reason: true
      },
      orderBy: {
        armorName: 'asc'
      }
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error fetching armor suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch armor suggestions' }, { status: 500 });
  }
} 