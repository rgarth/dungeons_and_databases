import { PrismaClient } from '@prisma/client';
import { backgroundsData } from './data/backgrounds-data';

const prisma = new PrismaClient();

async function seedBackgrounds() {
  console.log('🌱 Seeding backgrounds...');
  
  for (const background of backgroundsData) {
    await prisma.background.upsert({
      where: { name: background.name },
      update: {
        description: background.description,
        skillProficiencies: background.skillProficiencies,
        languages: background.languages,
        equipment: background.equipment,
        feature: background.feature,
        featureDescription: background.featureDescription,
        suggestedCharacteristics: background.suggestedCharacteristics || null,
      },
      create: {
        name: background.name,
        description: background.description,
        skillProficiencies: background.skillProficiencies,
        languages: background.languages,
        equipment: background.equipment,
        feature: background.feature,
        featureDescription: background.featureDescription,
        suggestedCharacteristics: background.suggestedCharacteristics || null,
      },
    });
  }
  
  console.log(`✅ Seeded ${backgroundsData.length} backgrounds`);
}

// Run if called directly
seedBackgrounds()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

export { seedBackgrounds }; 