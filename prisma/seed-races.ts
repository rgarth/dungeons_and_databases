import { PrismaClient } from '@prisma/client';
import { racesData } from './data/races-data';

const prisma = new PrismaClient();

async function seedRaces() {
  console.log('🧙 Seeding D&D races...');

  // Clear existing races
  await prisma.dndRace.deleteMany();
  console.log('✅ Cleared existing races');

  // Seed races
  for (const race of racesData) {
    try {
      await prisma.dndRace.create({
        data: {
          name: race.name,
          size: race.size,
          speed: race.speed,
          traits: race.traits,
          abilityScoreIncrease: race.abilityScoreIncrease,
          languages: race.languages,
          description: race.description
        }
      });
      console.log(`  ✅ Added race: ${race.name}`);
    } catch (error) {
      console.error(`❌ Failed to add race ${race.name}:`, error);
    }
  }

  console.log(`✅ Seeded ${racesData.length} races`);
}

async function main() {
  try {
    await seedRaces();
    console.log('🎉 Race seeding completed successfully!');
  } catch (error) {
    console.error('❌ Race seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
main();

export { seedRaces }; 