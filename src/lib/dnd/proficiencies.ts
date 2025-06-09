import { PrismaClient } from '@prisma/client';
import { Weapon } from './equipment';

const prisma = new PrismaClient();

export interface ClassProficiencies {
  armor: string[];
  weapons: {
    simple: boolean;
    martial: boolean;
    specific: string[];
  };
  savingThrows: string[];
}

// Database-driven proficiency functions
export async function getClassProficiencies(className: string): Promise<ClassProficiencies | null> {
  try {
    const dndClass = await prisma.dndClass.findUnique({
      where: { name: className },
      include: {
        armorProficiencies: true,
        weaponProficiencies: true
      }
    });

    if (!dndClass) {
      return null;
    }

    const armorTypes = dndClass.armorProficiencies.map(prof => prof.armorType);
    
    const weaponProfs = dndClass.weaponProficiencies;
    const hasSimple = weaponProfs.some(prof => prof.proficiencyType === 'Simple');
    const hasMartial = weaponProfs.some(prof => prof.proficiencyType === 'Martial');
    const specificWeapons = weaponProfs
      .filter(prof => prof.proficiencyType === 'Specific' && prof.weaponName)
      .map(prof => prof.weaponName!);

    const savingThrows = JSON.parse(dndClass.savingThrows as string) as string[];

    return {
      armor: armorTypes,
      weapons: {
        simple: hasSimple,
        martial: hasMartial,
        specific: specificWeapons
      },
      savingThrows
    };
  } catch (error) {
    console.error('Error fetching class proficiencies:', error);
    return null;
  }
}

export async function getClassWeaponProficiencies(className: string): Promise<{
  simple: boolean;
  martial: boolean;
  specific: string[];
}> {
  const proficiencies = await getClassProficiencies(className);
  return proficiencies?.weapons || { simple: false, martial: false, specific: [] };
}

export function isWeaponProficient(weapon: Weapon, proficiencies: { simple: boolean; martial: boolean; specific: string[] }): boolean {
  // Check if proficient with weapon type
  if (weapon.type === 'Simple' && proficiencies.simple) return true;
  if (weapon.type === 'Martial' && proficiencies.martial) return true;
  
  // Check specific weapon proficiencies
  return proficiencies.specific.includes(weapon.name);
}

export function categorizeWeaponsByProficiency(weapons: Weapon[], proficiencies: { simple: boolean; martial: boolean; specific: string[] }) {
  const proficient: Weapon[] = [];
  const nonProficient: Weapon[] = [];

  weapons.forEach(weapon => {
    if (isWeaponProficient(weapon, proficiencies)) {
      proficient.push(weapon);
    } else {
      nonProficient.push(weapon);
    }
  });

  return { proficient, nonProficient };
} 