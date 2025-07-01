import { NextRequest, NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const rarity = searchParams.get('rarity');
    const requiresAttunement = searchParams.get('requiresAttunement');
    const search = searchParams.get('search');

    let magicalItems = dndDataService.getMagicalItems();

    // Filter by type
    if (type) {
      magicalItems = magicalItems.filter(item => item.type === type);
    }

    // Filter by rarity
    if (rarity) {
      magicalItems = magicalItems.filter(item => item.rarity === rarity);
    }

    // Filter by attunement requirement
    if (requiresAttunement !== null) {
      const requiresAttunementBool = requiresAttunement === 'true';
      magicalItems = magicalItems.filter(item => item.requiresAttunement === requiresAttunementBool);
    }

    // Search by name or description
    if (search) {
      const searchLower = search.toLowerCase();
      magicalItems = magicalItems.filter(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(magicalItems);
  } catch (error) {
    console.error('Error fetching magical items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch magical items' },
      { status: 500 }
    );
  }
} 