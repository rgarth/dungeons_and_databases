import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
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