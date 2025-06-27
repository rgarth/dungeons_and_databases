import { PrismaClient } from '@prisma/client';
import { ammunitionSuggestionsData } from './data/ammunition-suggestions-data';

const prisma = new PrismaClient();

async function seedAmmunitionSuggestions() {
  console.log('🌱 Seeding ammunition suggestions...');

  for (const ammunition of ammunitionSuggestionsData) {
    await prisma.ammunitionSuggestion.upsert({
      where: { name: ammunition.name },
      update: ammunition,
      create: ammunition,
    });
  }

  console.log('✅ Ammunition suggestions seeded successfully!');
}

async function main() {
  try {
    await seedAmmunitionSuggestions();
  } catch (error) {
    console.error('❌ Error seeding ammunition suggestions:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
} 