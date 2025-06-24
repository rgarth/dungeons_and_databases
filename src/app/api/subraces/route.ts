import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raceName = searchParams.get('race');

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

      // Parse JSON fields
      const parsedSubraces = subraces.map(subrace => ({
        ...subrace,
        traits: JSON.parse(subrace.traits as string),
        languages: subrace.languages ? JSON.parse(subrace.languages as string) : null
      }));

      return NextResponse.json(parsedSubraces);
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

      // Parse JSON fields
      const parsedSubraces = subraces.map(subrace => ({
        ...subrace,
        traits: JSON.parse(subrace.traits as string),
        languages: subrace.languages ? JSON.parse(subrace.languages as string) : null
      }));

      return NextResponse.json(parsedSubraces);
    }
  } catch (error) {
    console.error('Error fetching subraces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subraces' },
      { status: 500 }
    );
  }
} 