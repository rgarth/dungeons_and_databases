import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';
import { ammunitionSuggestionsData } from '../../../../prisma/data/ammunition-suggestions-data';

export async function GET() {
  try {
    const weapons = dndDataService.getWeapons();
    
    // Create a mapping from ammunition names to IDs
    const ammunitionNameToId: { [key: string]: number } = {};
    ammunitionSuggestionsData.forEach((ammo: { name: string; description: string }, index: number) => {
      ammunitionNameToId[ammo.name] = index + 1; // Use 1-based IDs to match existing system
    });
    
    // Transform to match the expected API structure (add database-compatible fields)
    const transformedWeapons = weapons.map(weapon => ({
      id: `weapon_${weapon.name.toLowerCase().replace(/\s+/g, '_')}`,
      name: weapon.name,
      type: weapon.type,
      category: weapon.category,
      cost: weapon.cost,
      damage: weapon.damage,
      damageType: weapon.damageType,
      weight: weapon.weight,
      properties: weapon.properties,
      description: weapon.description,
      ammunitionTypeName: weapon.ammunitionTypeName,
      ammunitionTypeId: weapon.ammunitionTypeName ? ammunitionNameToId[weapon.ammunitionTypeName] || null : null,
      suggestedQuantity: weapon.suggestedQuantity,
      stackable: false, // All weapons now use ammunition system instead of stacking
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    return NextResponse.json(transformedWeapons);
  } catch (error) {
    console.error('Error fetching weapons:', error);
    return NextResponse.json({ error: 'Failed to fetch weapons' }, { status: 500 });
  }
} 