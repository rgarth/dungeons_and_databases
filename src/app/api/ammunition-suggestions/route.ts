import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET() {
  try {
    const ammunitionSuggestions = dndDataService.getAmmunitionSuggestions();
    
    // Add IDs to match the weapons API mapping
    const ammunitionWithIds = ammunitionSuggestions.map((ammo, index) => ({
      id: index + 1, // Use 1-based IDs to match weapons API
      name: ammo.name,
      description: ammo.description
    }));
    
    // Add caching headers for better performance
    const response = NextResponse.json(ammunitionWithIds);
    response.headers.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    response.headers.set('ETag', `ammunition-${Date.now()}`); // Simple ETag for cache validation
    
    return response;
  } catch (error) {
    console.error('Error fetching ammunition suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch ammunition suggestions' }, { status: 500 });
  }
} 