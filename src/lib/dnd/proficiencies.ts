import { prisma } from '@/lib/prisma';
import { Weapon } from './equipment';

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
interface ArmorProficiency {
  armorType: string;
}

interface WeaponProficiency {
  proficiencyType: string;
  weaponName?: string;
}

interface DndClass {
  armorProficiencies: ArmorProficiency[];
  weaponProficiencies: WeaponProficiency[];
  savingThrows: string[];
}

export async function getClassProficiencies(className: string): Promise<ClassProficiencies | null> {
  try {
    const dndClass = await (prisma as unknown as { dndClass: { findUnique: (args: { where: { name: string }; include: { armorProficiencies: boolean; weaponProficiencies: boolean } }) => Promise<DndClass | null> } }).dndClass.findUnique({
      where: { name: className },
      include: {
        armorProficiencies: true,
        weaponProficiencies: true
      }
    });

    if (!dndClass) {
      return null;
    }

    const armorTypes = dndClass.armorProficiencies.map((prof: ArmorProficiency) => prof.armorType);
    
    const weaponProfs = dndClass.weaponProficiencies;
    const hasSimple = weaponProfs.some((prof: WeaponProficiency) => prof.proficiencyType === 'Simple');
    const hasMartial = weaponProfs.some((prof: WeaponProficiency) => prof.proficiencyType === 'Martial');
    const specificWeapons = weaponProfs
      .filter((prof: WeaponProficiency) => prof.proficiencyType === 'Specific' && prof.weaponName)
      .map((prof: WeaponProficiency) => prof.weaponName!);

    const savingThrows = dndClass.savingThrows as string[];

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
  return proficiencies.specific?.includes(weapon.name) || false;
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

export async function getClassArmorProficiencies(className: string): Promise<string[]> {
  const proficiencies = await getClassProficiencies(className);
  return proficiencies?.armor || [];
} 