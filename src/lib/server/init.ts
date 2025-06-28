import { prisma } from '@/lib/db';
import { DndRace, DndClass, Alignment, EquipmentPack, Armor, MagicalItem, Treasure, Subrace, Weapon } from '@prisma/client';
import { BackgroundData } from '@/components/shared/BackgroundSelector';
import { withRetry } from '@/lib/db-helpers';

// Cache objects
export let cachedRaces: DndRace[] | null = null;
export let cachedClasses: DndClass[] | null = null;
export let cachedBackgrounds: BackgroundData[] | null = null;
export let cachedAlignments: Alignment[] | null = null;
export let cachedEquipmentPacks: EquipmentPack[] | null = null;
export let cachedArmor: Armor[] | null = null;
export let cachedWeapons: Weapon[] | null = null;
export let cachedMagicalItems: MagicalItem[] | null = null;
export let cachedTreasures: Treasure[] | null = null;
export let cachedSubraces: (Subrace & { race: { name: string } })[] | null = null;

// Guard to prevent multiple initializations
let isInitializing = false;
let isInitialized = false;

// Helper function to safely parse JSON
function safeParse<T>(value: unknown): T {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return [] as unknown as T;
    }
  }
  return value as T;
}

export async function initializeServerCache() {
  // Prevent multiple simultaneous initializations
  if (isInitializing) {
    console.log('🔄 Cache initialization already in progress, waiting...');
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return;
  }

  // Prevent multiple initializations
  if (isInitialized) {
    console.log('✅ Cache already initialized, skipping...');
    return;
  }

  isInitializing = true;
  console.log('🔄 Initializing server cache...');
  
  try {
    // Fetch all static D&D data in parallel with retries
    const [
      races,
      classes,
      backgrounds,
      alignments,
      equipmentPacks,
      armor,
      weapons,
      magicalItems,
      treasures,
      subraces
    ] = await Promise.all([
      withRetry(() => prisma.dndRace.findMany({
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.dndClass.findMany({
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.background.findMany({
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.alignment.findMany({
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.equipmentPack.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          cost: true,
          items: {
            select: {
              quantity: true,
              itemName: true
            }
          },
          createdAt: true,
          updatedAt: true
        },
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.armor.findMany({
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.weapon.findMany({
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.magicalItem.findMany({
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.treasure.findMany({
        select: {
          id: true,
          name: true,
          type: true,
          value: true,
          description: true,
          weight: true,
          appearance: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { name: 'asc' }
      })),
      withRetry(() => prisma.subrace.findMany({
        include: {
          race: {
            select: {
              name: true
            }
          }
        },
        orderBy: [
          {
            race: {
              name: 'asc'
            }
          },
          {
            name: 'asc'
          }
        ]
      }))
    ]);

    // Parse JSON fields in backgrounds
    const parsedBackgrounds: BackgroundData[] = backgrounds.map(background => ({
      name: background.name,
      description: background.description,
      skillProficiencies: safeParse<string[]>(background.skillProficiencies),
      languages: safeParse<string[]>(background.languages),
      equipment: safeParse<string[]>(background.equipment),
      feature: background.feature,
      featureDescription: background.featureDescription,
      suggestedCharacteristics: background.suggestedCharacteristics ? safeParse<{
        personalityTraits: string[];
        ideals: string[];
        bonds: string[];
        flaws: string[];
      }>(background.suggestedCharacteristics) : undefined
    }));

    // Cache the results
    cachedRaces = races;
    cachedClasses = classes;
    cachedBackgrounds = parsedBackgrounds;
    cachedAlignments = alignments;
    cachedEquipmentPacks = equipmentPacks;
    cachedArmor = armor;
    cachedWeapons = weapons;
    cachedMagicalItems = magicalItems;
    cachedTreasures = treasures;
    cachedSubraces = subraces;

    isInitialized = true;
    console.log('✅ Server cache initialized:');
    console.log('- Races:', races.length);
    console.log('- Classes:', classes.length);
    console.log('- Backgrounds:', backgrounds.length);
    console.log('- Alignments:', alignments.length);
    console.log('- Equipment Packs:', equipmentPacks.length);
    console.log('- Armor:', armor.length);
    console.log('- Weapons:', weapons.length);
    console.log('- Magical Items:', magicalItems.length);
    console.log('- Treasures:', treasures.length);
    console.log('- Subraces:', subraces.length);

  } catch (error) {
    console.error('❌ Failed to initialize server cache:', error);
    throw error;
  } finally {
    isInitializing = false;
  }
} 