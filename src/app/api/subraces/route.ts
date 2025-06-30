import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedSubraces } from '@/lib/server/init';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raceName = searchParams.get('race');

    // Return cached data if available
    if (cachedSubraces) {
      let filteredSubraces = cachedSubraces;
      
      if (raceName) {
        // Filter by race name
        filteredSubraces = cachedSubraces.filter(subrace => 
          subrace.race.name?.toLowerCase() === raceName.toLowerCase()
        );
      }

      return NextResponse.json(filteredSubraces);
    }

    // Fallback to database if cache is not initialized
    if (raceName) {
      // Get subraces for a specific race
      const subraces = await prisma.subrace.findMany({
        where: {
          race: {
            name: raceName
          }
        },
        include: {
          race: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      return NextResponse.json(subraces);
    } else {
      // Get all subraces
      const subraces = await prisma.subrace.findMany({
        include: {
          race: {
            select: {
              name: true
            }
          }
        },
        orderBy: [
          {
            race: {
              name: 'asc'
            }
          },
          {
            name: 'asc'
          }
        ]
      });

      return NextResponse.json(subraces);
    }
  } catch (error) {
    console.error('Error fetching subraces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subraces' },
      { status: 500 }
    );
  }
} 