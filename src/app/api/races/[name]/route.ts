import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const race = await prisma.dndRace.findUnique({
      where: { name: params.name }
    });

    if (!race) {
      return new NextResponse('Race not found', { status: 404 });
    }

    return NextResponse.json(race);
  } catch (error) {
    console.error('Error fetching race:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 