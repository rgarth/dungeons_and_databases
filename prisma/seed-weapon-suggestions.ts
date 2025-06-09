import { PrismaClient } from '@prisma/client';
import { classWeaponSuggestionsData } from './data/weapon-suggestions-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🗡️  Seeding weapon suggestions...');

  // Clear existing suggestions
  await prisma.classWeaponSuggestion.deleteMany();
  console.log('✅ Cleared existing weapon suggestions');

  for (const classData of classWeaponSuggestionsData) {
    console.log(`\n📋 Processing ${classData.className}...`);

    // Find the class
    const dndClass = await prisma.dndClass.findUnique({
      where: { name: classData.className }
    });

    if (!dndClass) {
      console.log(`❌ Class '${classData.className}' not found, skipping...`);
      continue;
    }

    // Add suggestions for this class
    for (const suggestion of classData.suggestions) {
      await prisma.classWeaponSuggestion.create({
        data: {
          classId: dndClass.id,
          weaponName: suggestion.weaponName,
          quantity: suggestion.quantity,
          reason: suggestion.reason
        }
      });
      console.log(`  ✅ Added suggestion: ${suggestion.quantity}x ${suggestion.weaponName}`);
    }
  }

  console.log('\n✅ Weapon suggestions seeding completed!');
}

main()
  .catch((error) => {
    console.error('❌ Error seeding weapon suggestions:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 