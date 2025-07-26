import { prisma } from '@/lib/prisma';

export interface WeaponSuggestion {
  weaponName: string;
  quantity: number;
  reason?: string | null;
}

// Cache for weapon suggestions
const weaponSuggestionsCache = new Map<string, {
  data: WeaponSuggestion[];
  timestamp: number;
}>();

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getWeaponSuggestionsForClass(className: string): Promise<WeaponSuggestion[]> {
  // Check cache first
  const cached = weaponSuggestionsCache.get(className);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const suggestions = await (prisma as unknown as any).classWeaponSuggestion.findMany({
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

    // Update cache
    weaponSuggestionsCache.set(className, {
      data: suggestions,
      timestamp: Date.now()
    });

    return suggestions;
  } catch (error) {
    console.error('Error fetching weapon suggestions:', error);
    return [];
  }
} 