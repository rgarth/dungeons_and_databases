import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

// GET all armor from in-memory TypeScript data
export async function GET() {
  try {
    const armor = dndDataService.getArmor();
    
    // Transform to match the expected API structure (add database-compatible fields)
    const transformedArmor = armor.map(item => ({
      id: item.id || `armor_${item.name.toLowerCase().replace(/\s+/g, '_')}`,
      name: item.name,
      type: item.type,
      baseAC: item.baseAC,
      maxDexBonus: item.maxDexBonus,
      minStrength: item.minStrength,
      stealthDisadvantage: item.stealthDisadvantage,
      weight: item.weight,
      cost: item.cost,
      description: item.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    return NextResponse.json(transformedArmor);
  } catch (error) {
    console.error('Error fetching armor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch armor' }, 
      { status: 500 }
    );
  }
} 