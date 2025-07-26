import { prisma } from '../prisma';

export interface ArmorSuggestion {
  armorName: string;
  reason?: string | null;
}

export async function getArmorSuggestionsForClass(className: string): Promise<ArmorSuggestion[]> {
  try {
    const suggestions = await (prisma as unknown as any).classArmorSuggestion.findMany({
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

    return suggestions.map((s: any) => ({
      armorName: s.armorName,
      reason: s.reason || undefined
    }));
  } catch (error) {
    console.error('Error fetching armor suggestions:', error);
    return [];
  }
} 