import { PrismaClient } from '@prisma/client';
import { classArmorSuggestionsData } from './data/armor-suggestions-data';

const prisma = new PrismaClient();

export async function seedArmorSuggestions() {
  console.log('🛡️  Seeding armor suggestions...');

  // Clear existing suggestions
  await prisma.classArmorSuggestion.deleteMany();
  console.log('✅ Cleared existing armor suggestions');

  for (const classData of classArmorSuggestionsData) {
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
      await prisma.classArmorSuggestion.create({
        data: {
          classId: dndClass.id,
          armorName: suggestion.armorName,
          reason: suggestion.reason
        }
      });
      console.log(`  ✅ Added suggestion: ${suggestion.armorName}`);
    }
  }

  console.log('\n✅ Armor suggestions seeding completed!');
}

// Keep the main function for direct execution
async function main() {
  try {
    await seedArmorSuggestions();
    console.log('🎉 Armor suggestions seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding armor suggestions:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 