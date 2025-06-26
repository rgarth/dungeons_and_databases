import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedWeapons } from '@/lib/server/init';

export async function GET() {
  try {
    // Return cached data if available
    if (cachedWeapons) {
      return NextResponse.json(cachedWeapons);
    }

    // Fallback to database if cache is not initialized
    const weapons = await prisma.weapon.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(weapons);
  } catch (error) {
    console.error('Error fetching weapons:', error);
    return NextResponse.json({ error: 'Failed to fetch weapons' }, { status: 500 });
  }
} 