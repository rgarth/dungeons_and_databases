import { prisma } from '../prisma';

export interface WeaponSuggestion {
  weaponName: string;
  quantity: number;
  reason?: string | null;
}

export async function getWeaponSuggestionsForClass(className: string): Promise<WeaponSuggestion[]> {
  try {
    const suggestions = await prisma.classWeaponSuggestion.findMany({
      where: {
        class: {
          name: className
        }
      },
      select: {
        weaponName: true,
        quantity: true,
        reason: true
      },
      orderBy: {
        weaponName: 'asc'
      }
    });

    return suggestions;
  } catch (error) {
    console.error('Error fetching weapon suggestions:', error);
    return [];
  }
} 