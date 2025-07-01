import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET() {
  try {
    const weapons = dndDataService.getWeapons();
    
    // Transform to match the expected API structure (add database-compatible fields)
    const transformedWeapons = weapons.map(weapon => ({
      id: weapon.id || `weapon_${weapon.name.toLowerCase().replace(/\s+/g, '_')}`,
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
      suggestedQuantity: weapon.suggestedQuantity,
      stackable: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    return NextResponse.json(transformedWeapons);
  } catch (error) {
    console.error('Error fetching weapons:', error);
    return NextResponse.json({ error: 'Failed to fetch weapons' }, { status: 500 });
  }
} 