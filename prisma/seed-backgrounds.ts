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
        skillProficiencies: JSON.stringify(background.skillProficiencies),
        languages: JSON.stringify(background.languages),
        equipment: JSON.stringify(background.equipment),
        startingGold: background.startingGold,
        feature: background.feature,
        featureDescription: background.featureDescription,
        suggestedCharacteristics: background.suggestedCharacteristics ? JSON.stringify(background.suggestedCharacteristics) : undefined,
      },
      create: {
        name: background.name,
        description: background.description,
        skillProficiencies: JSON.stringify(background.skillProficiencies),
        languages: JSON.stringify(background.languages),
        equipment: JSON.stringify(background.equipment),
        startingGold: background.startingGold,
        feature: background.feature,
        featureDescription: background.featureDescription,
        suggestedCharacteristics: background.suggestedCharacteristics ? JSON.stringify(background.suggestedCharacteristics) : undefined,
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