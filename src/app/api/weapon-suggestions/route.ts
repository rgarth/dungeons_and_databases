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
        // Get weapon suggestions from the cached class data
        const suggestions = await prisma.classWeaponSuggestion.findMany({
          where: {
            classId: classData.id
          },
          select: {
            weaponName: true,
            quantity: true,
            reason: true
          },
          orderBy: {
            weaponName: 'asc'
          }
        });

        return NextResponse.json(suggestions);
      }
    }

    // Fallback to database if cache is not initialized
    const suggestions = await prisma.classWeaponSuggestion.findMany({
      where: {
        class: {
          name: className
        }
      },
      select: {
        weaponName: true,
        quantity: true,
        reason: true
      },
      orderBy: {
        weaponName: 'asc'
      }
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error fetching weapon suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch weapon suggestions' }, { status: 500 });
  }
} 