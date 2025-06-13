import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedAlignments } from '@/lib/server/init';

export async function GET() {
  try {
    // Return cached data if available
    if (cachedAlignments) {
      return NextResponse.json(cachedAlignments);
    }

    // Fallback to database if cache is not initialized
    const alignments = await prisma.alignment.findMany({
      select: {
        id: true,
        name: true,
        shortName: true,
        description: true,
        ethicalAxis: true,
        moralAxis: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(alignments);
  } catch (error) {
    console.error('Failed to fetch alignments:', error);
    return NextResponse.json({ error: 'Failed to fetch alignments' }, { status: 500 });
  }
} 