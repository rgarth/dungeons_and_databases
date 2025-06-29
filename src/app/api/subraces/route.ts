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

      // Parse JSON fields manually to ensure they're properly formatted
      const parsedSubraces = filteredSubraces.map(subrace => ({
        ...subrace,
        abilityScoreIncrease: typeof subrace.abilityScoreIncrease === 'string' 
          ? JSON.parse(subrace.abilityScoreIncrease) 
          : subrace.abilityScoreIncrease,
        traits: typeof subrace.traits === 'string' 
          ? JSON.parse(subrace.traits) 
          : subrace.traits,
        languages: subrace.languages && typeof subrace.languages === 'string' 
          ? JSON.parse(subrace.languages) 
          : subrace.languages
      }));

      return NextResponse.json(parsedSubraces);
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

      // Parse JSON fields manually to ensure they're properly formatted
      const parsedSubraces = subraces.map(subrace => ({
        ...subrace,
        abilityScoreIncrease: typeof subrace.abilityScoreIncrease === 'string' 
          ? JSON.parse(subrace.abilityScoreIncrease) 
          : subrace.abilityScoreIncrease,
        traits: typeof subrace.traits === 'string' 
          ? JSON.parse(subrace.traits) 
          : subrace.traits,
        languages: subrace.languages && typeof subrace.languages === 'string' 
          ? JSON.parse(subrace.languages) 
          : subrace.languages
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

      // Parse JSON fields manually to ensure they're properly formatted
      const parsedSubraces = subraces.map(subrace => ({
        ...subrace,
        abilityScoreIncrease: typeof subrace.abilityScoreIncrease === 'string' 
          ? JSON.parse(subrace.abilityScoreIncrease) 
          : subrace.abilityScoreIncrease,
        traits: typeof subrace.traits === 'string' 
          ? JSON.parse(subrace.traits) 
          : subrace.traits,
        languages: subrace.languages && typeof subrace.languages === 'string' 
          ? JSON.parse(subrace.languages) 
          : subrace.languages
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