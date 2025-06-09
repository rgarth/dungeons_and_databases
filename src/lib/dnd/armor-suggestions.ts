import { prisma } from '../prisma';

export interface ArmorSuggestion {
  armorName: string;
  reason?: string | null;
}

export async function getArmorSuggestionsForClass(className: string): Promise<ArmorSuggestion[]> {
  try {
    const suggestions = await prisma.classArmorSuggestion.findMany({
      where: {
        class: {
          name: className
        }
      },
      select: {
        armorName: true,
        reason: true
      },
      orderBy: {
        armorName: 'asc'
      }
    });

    return suggestions.map(s => ({
      armorName: s.armorName,
      reason: s.reason || undefined
    }));
  } catch (error) {
    console.error('Error fetching armor suggestions:', error);
    return [];
  }
} 