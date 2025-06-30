import prisma from './client';
import { classSpellSuggestionsData } from './data/spell-suggestions-data';

export async function seedSpellSuggestions() {
  console.log('🧙‍♂️ Seeding spell suggestions...');

  try {
    // Clear existing suggestions
    await prisma.classSpellSuggestion.deleteMany();
    console.log('✅ Cleared existing spell suggestions');

    // Create spell suggestions
    for (const classData of classSpellSuggestionsData) {
      const dndClass = await prisma.dndClass.findUnique({
        where: { name: classData.className }
      });

      if (!dndClass) {
        console.error(`Class ${classData.className} not found`);
        continue;
      }

      // Create spell suggestions
      for (const suggestion of classData.suggestions) {
        await prisma.classSpellSuggestion.create({
          data: {
            classId: dndClass.id,
            spellName: suggestion.spellName,
            level: suggestion.level,
            reason: suggestion.reason
          }
        });
      }
    }

    console.log(`✅ Seeded ${classSpellSuggestionsData.reduce((sum, c) => sum + c.suggestions.length, 0)} spell suggestions`);
  } catch (error) {
    console.error('❌ Error seeding spell suggestions:', error);
    throw error;
  }
}

// Only run if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedSpellSuggestions()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
} 