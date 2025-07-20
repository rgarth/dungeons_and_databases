import { NextRequest, NextResponse } from 'next/server';
import { allMonsters } from '../../../data/monsters';

// GET /api/monsters - Get all monsters with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const name = searchParams.get('name');
    const type = searchParams.get('type');
    const size = searchParams.get('size');
    const challengeRating = searchParams.get('challengeRating');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '1000'); // Return all monsters by default
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let filteredMonsters = [...allMonsters];
    
    // Apply filters
    if (name) {
      const monster = filteredMonsters.find(m => m.name.toLowerCase() === name.toLowerCase());
      if (monster) {
        return NextResponse.json([monster]);
      } else {
        return NextResponse.json([]);
      }
    }
    
    if (type) {
      filteredMonsters = filteredMonsters.filter(monster => {
        const monsterType = monster.type.toLowerCase();
        const filterType = type.toLowerCase();
        
        // Special handling for swarm type
        if (filterType === 'swarm') {
          return monsterType.startsWith('swarm');
        }
        
        return monsterType === filterType;
      });
    }
    
    if (size) {
      filteredMonsters = filteredMonsters.filter(monster => 
        monster.size.toLowerCase() === size.toLowerCase()
      );
    }
    
    if (challengeRating) {
      filteredMonsters = filteredMonsters.filter(monster => 
        monster.challengeRating === challengeRating
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredMonsters = filteredMonsters.filter(monster => 
        monster.name.toLowerCase().includes(searchLower) ||
        monster.type.toLowerCase().includes(searchLower) ||
        (monster.description && monster.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply pagination
    const paginatedMonsters = filteredMonsters.slice(offset, offset + limit);
    
    // Return just the array for now to match frontend expectations
    return NextResponse.json(paginatedMonsters);
    
  } catch (error) {
    console.error('Error fetching monsters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 