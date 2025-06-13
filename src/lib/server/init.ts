import { prisma } from '@/lib/prisma';
import { DndRace, DndClass, Background, Alignment, EquipmentPack, Armor, MagicalItem, Treasure } from '@prisma/client';

// Cache objects
export let cachedRaces: DndRace[] | null = null;
export let cachedClasses: DndClass[] | null = null;
export let cachedBackgrounds: Background[] | null = null;
export let cachedAlignments: Alignment[] | null = null;
export let cachedEquipmentPacks: EquipmentPack[] | null = null;
export let cachedArmor: Armor[] | null = null;
export let cachedMagicalItems: MagicalItem[] | null = null;
export let cachedTreasures: Treasure[] | null = null;

export async function initializeServerCache() {
  console.log('🔄 Initializing server cache...');
  
  try {
    // Fetch all static D&D data in parallel
    const [
      races,
      classes,
      backgrounds,
      alignments,
      equipmentPacks,
      armor,
      magicalItems,
      treasures
    ] = await Promise.all([
      prisma.dndRace.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.dndClass.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.background.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.alignment.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.equipmentPack.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          cost: true,
          items: {
            select: {
              quantity: true,
              equipment: {
                select: {
                  name: true,
                  type: true,
                  cost: true,
                  weight: true,
                  description: true
                }
              }
            }
          },
          createdAt: true,
          updatedAt: true
        },
        orderBy: { name: 'asc' }
      }),
      prisma.armor.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.magicalItem.findMany({
        orderBy: { name: 'asc' }
      }),
      prisma.treasure.findMany({
        orderBy: { name: 'asc' }
      })
    ]);

    // Cache the results
    cachedRaces = races;
    cachedClasses = classes;
    cachedBackgrounds = backgrounds;
    cachedAlignments = alignments;
    cachedEquipmentPacks = equipmentPacks;
    cachedArmor = armor;
    cachedMagicalItems = magicalItems;
    cachedTreasures = treasures;

    console.log('✅ Server cache initialized:');
    console.log('- Races:', races.length);
    console.log('- Classes:', classes.length);
    console.log('- Backgrounds:', backgrounds.length);
    console.log('- Alignments:', alignments.length);
    console.log('- Equipment Packs:', equipmentPacks.length);
    console.log('- Armor:', armor.length);
    console.log('- Magical Items:', magicalItems.length);
    console.log('- Treasures:', treasures.length);

  } catch (error) {
    console.error('❌ Failed to initialize server cache:', error);
    throw error;
  }
} 