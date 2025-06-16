import { PrismaClient } from '@prisma/client';
import { classWeaponSuggestionsData } from './data/weapon-suggestions-data';

const prisma = new PrismaClient();

export async function seedWeaponSuggestions() {
  console.log('Starting weapon suggestions seed...');

  // First, update DndClass with PHB descriptions
  for (const classData of classWeaponSuggestionsData) {
    await prisma.dndClass.update({
      where: { name: classData.className },
      data: { phbDescription: classData.phbDescription }
    });
  }

  // Clear existing suggestions
  await prisma.classWeaponSuggestion.deleteMany();
  console.log('Cleared existing weapon suggestions');

  // Then create weapon suggestions without PHB descriptions
  for (const classData of classWeaponSuggestionsData) {
    const dndClass = await prisma.dndClass.findUnique({
      where: { name: classData.className }
    });

    if (!dndClass) {
      console.error(`Class ${classData.className} not found`);
      continue;
    }

    // Create weapon suggestions
    for (const suggestion of classData.suggestions) {
      await prisma.classWeaponSuggestion.create({
        data: {
          classId: dndClass.id,
          weaponName: suggestion.weaponName,
          quantity: suggestion.quantity,
          reason: suggestion.reason
        }
      });
    }

    // Create ammunition suggestions if any
    if (classData.ammunition) {
      for (const ammo of classData.ammunition) {
        await prisma.classWeaponSuggestion.create({
          data: {
            classId: dndClass.id,
            weaponName: ammo.ammunitionName,
            quantity: ammo.quantity,
            reason: ammo.reason
          }
        });
      }
    }
  }

  console.log('Weapon suggestions seed completed');
}

// Only run if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedWeaponSuggestions()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} 