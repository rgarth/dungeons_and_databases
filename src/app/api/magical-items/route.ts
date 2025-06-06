import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const rarity = searchParams.get('rarity');
    const requiresAttunement = searchParams.get('requiresAttunement');
    const search = searchParams.get('search');

    const where: {
      type?: string;
      rarity?: string;
      requiresAttunement?: boolean;
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
      }>;
    } = {};

    // Filter by type
    if (type) {
      where.type = type;
    }

    // Filter by rarity
    if (rarity) {
      where.rarity = rarity;
    }

    // Filter by attunement requirement
    if (requiresAttunement !== null) {
      where.requiresAttunement = requiresAttunement === 'true';
    }

    // Search by name or description
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const magicalItems = await prisma.magicalItem.findMany({
      where,
      orderBy: [
        { rarity: 'asc' },
        { name: 'asc' }
      ]
    });

    // Parse the effects JSON for each item
    const itemsWithParsedEffects = magicalItems.map(item => ({
      ...item,
      effects: item.effects ? JSON.parse(item.effects as string) : []
    }));

    return NextResponse.json(itemsWithParsedEffects);
  } catch (error) {
    console.error('Error fetching magical items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch magical items' },
      { status: 500 }
    );
  }
} 