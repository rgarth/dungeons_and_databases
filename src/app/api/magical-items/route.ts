import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cachedMagicalItems } from '@/lib/server/init';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const rarity = searchParams.get('rarity');
    const requiresAttunement = searchParams.get('requiresAttunement');
    const search = searchParams.get('search');

    // Return cached data if available
    if (cachedMagicalItems) {
      // Filter from cached data instead of querying database
      let filteredItems = cachedMagicalItems;

      // Filter by type
      if (type) {
        filteredItems = filteredItems.filter(item => item.type === type);
      }

      // Filter by rarity
      if (rarity) {
        filteredItems = filteredItems.filter(item => item.rarity === rarity);
      }

      // Filter by attunement requirement
      if (requiresAttunement !== null) {
        const requiresAttunementBool = requiresAttunement === 'true';
        filteredItems = filteredItems.filter(item => item.requiresAttunement === requiresAttunementBool);
      }

      // Search by name or description
      if (search) {
        const searchLower = search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
        );
      }

      // Parse the effects JSON for each item
      const itemsWithParsedEffects = filteredItems.map(item => ({
        ...item,
        effects: item.effects ? JSON.parse(item.effects as string) : []
      }));

      return NextResponse.json(itemsWithParsedEffects);
    }

    // Fallback to database if cache is not initialized
    const magicalItems = await prisma.magicalItem.findMany({
      orderBy: { name: 'asc' }
    });

    // Filter from database data
    let filteredItems = magicalItems;

    // Filter by type
    if (type) {
      filteredItems = filteredItems.filter(item => item.type === type);
    }

    // Filter by rarity
    if (rarity) {
      filteredItems = filteredItems.filter(item => item.rarity === rarity);
    }

    // Filter by attunement requirement
    if (requiresAttunement !== null) {
      const requiresAttunementBool = requiresAttunement === 'true';
      filteredItems = filteredItems.filter(item => item.requiresAttunement === requiresAttunementBool);
    }

    // Search by name or description
    if (search) {
      const searchLower = search.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    // Parse the effects JSON for each item
    const itemsWithParsedEffects = filteredItems.map(item => ({
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