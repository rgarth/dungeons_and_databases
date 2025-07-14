import { NextRequest, NextResponse } from 'next/server';
import { monstersData, getMonsterByName, getMonstersByType, searchMonsters } from '@/data/monsters-data';

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
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let filteredMonsters = [...monstersData];
    
    // Apply filters
    if (name) {
      const monster = getMonsterByName(name);
      if (monster) {
        return NextResponse.json([monster]);
      } else {
        return NextResponse.json([]);
      }
    }
    
    if (type) {
      filteredMonsters = getMonstersByType(type);
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
      filteredMonsters = searchMonsters(search);
    }
    
    // Apply pagination
    const paginatedMonsters = filteredMonsters.slice(offset, offset + limit);
    
    return NextResponse.json({
      monsters: paginatedMonsters,
      total: filteredMonsters.length,
      limit,
      offset,
      hasMore: offset + limit < filteredMonsters.length
    });
    
  } catch (error) {
    console.error('Error fetching monsters:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 