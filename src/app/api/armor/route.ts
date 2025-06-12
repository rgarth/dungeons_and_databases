import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all armor from database
export async function GET() {
  try {
    const armor = await prisma.armor.findMany({
      orderBy: [
        { type: 'asc' },
        { baseAC: 'asc' },
        { name: 'asc' }
      ]
    });
    
    return NextResponse.json(armor);
  } catch (error) {
    console.error('Error fetching armor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch armor' }, 
      { status: 500 }
    );
  }
} 