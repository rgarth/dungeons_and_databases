import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedTreasures } from '@/lib/server/init';

// GET all treasures from database
export async function GET() {
  try {
    // Return cached data if available
    if (cachedTreasures) {
      return NextResponse.json(cachedTreasures);
    }

    // Fallback to database if cache is not initialized
    const treasures = await prisma.treasure.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        value: true,
        description: true,
        category: true,
        weight: true,
        appearance: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(treasures);
  } catch (error) {
    console.error('Failed to fetch treasures:', error);
    return NextResponse.json({ error: 'Failed to fetch treasures' }, { status: 500 });
  }
} 