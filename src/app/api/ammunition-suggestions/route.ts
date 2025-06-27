import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Simply return all ammunition suggestions from the database
    const allAmmunitionSuggestions = await prisma.ammunitionSuggestion.findMany({
      orderBy: { name: 'asc' }
    });

    // Add caching headers for better performance
    const response = NextResponse.json(allAmmunitionSuggestions);
    response.headers.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    response.headers.set('ETag', `ammunition-${Date.now()}`); // Simple ETag for cache validation
    
    return response;
  } catch (error) {
    console.error('Error fetching ammunition suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch ammunition suggestions' }, { status: 500 });
  }
} 