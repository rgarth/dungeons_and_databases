import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all treasures from database
export async function GET() {
  try {
    const treasures = await prisma.treasure.findMany({
      orderBy: [
        { type: 'asc' },
        { value: 'asc' },
        { name: 'asc' }
      ]
    });
    
    return NextResponse.json(treasures);
  } catch (error) {
    console.error('Error fetching treasures:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treasures' }, 
      { status: 500 }
    );
  }
} 