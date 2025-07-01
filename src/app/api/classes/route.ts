import { NextResponse } from 'next/server';
import { dndDataService } from '@/lib/dnd-data-service';

export async function GET() {
  try {
    const classes = dndDataService.getClasses();
    
    // Return classes data directly without synthetic IDs
    const transformedClasses = classes.map(cls => ({
      name: cls.name,
      description: cls.description,
      hitDie: cls.hitDie,
      primaryAbility: cls.primaryAbility,
      savingThrows: cls.savingThrows,
      skillChoices: cls.skillChoices,
      armorProficiencies: [], // Will be populated from classArmorProficiencies if needed
      weaponProficiencies: [] // Will be populated from classWeaponProficiencies if needed
    }));

    return NextResponse.json(transformedClasses);
  } catch (error) {
    console.error('Failed to fetch classes:', error);
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
} 