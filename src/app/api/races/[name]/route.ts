import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const race = await prisma.dndRace.findUnique({
      where: { name }
    });

    if (!race) {
      return new NextResponse('Race not found', { status: 404 });
    }

    // No need to parse JSON fields - Prisma handles this automatically
    return NextResponse.json(race);
  } catch (error) {
    console.error('Error fetching race:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 