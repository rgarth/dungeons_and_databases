import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const races = await prisma.dndRace.findMany();
    return NextResponse.json(races);
  } catch (error) {
    console.error('Error fetching races:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 