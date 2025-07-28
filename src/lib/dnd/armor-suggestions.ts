import { prisma } from '../prisma';

export interface ArmorSuggestion {
  armorName: string;
  reason?: string | null;
}

interface ClassArmorSuggestion {
  armorName: string;
  reason?: string | null;
}

export async function getArmorSuggestionsForClass(className: string): Promise<ArmorSuggestion[]> {
  try {
    const suggestions = await (prisma as unknown as { classArmorSuggestion: { findMany: (args: { where: { class: { name: string } }; select: { armorName: boolean; reason: boolean }; orderBy: { armorName: string } }) => Promise<ClassArmorSuggestion[]> } }).classArmorSuggestion.findMany({
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

    return suggestions.map((s: ClassArmorSuggestion) => ({
      armorName: s.armorName,
      reason: s.reason || undefined
    }));
  } catch (error) {
    console.error('Error fetching armor suggestions:', error);
    return [];
  }
} 