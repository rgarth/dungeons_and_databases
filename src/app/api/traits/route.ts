import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const race = searchParams.get('race');

    const where: Prisma.TraitWhereInput = {};

    // Filter by trait type if provided
    if (type) {
      where.type = type;
    }

    // Filter by race if provided
    if (race) {
      where.raceTraits = {
        some: {
          race: {
            name: race,
          },
        },
      };
    }

    const traits = await prisma.trait.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(traits);
  } catch (error) {
    console.error('Error fetching traits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traits' },
      { status: 500 }
    );
  }
} 