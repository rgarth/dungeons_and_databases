import { PrismaClient } from '@prisma/client';
import { alignmentsData } from './data/alignments-data';

const prisma = new PrismaClient();

async function seedAlignments() {
  console.log('🌱 Seeding alignments...');
  
  for (const alignment of alignmentsData) {
    await prisma.alignment.upsert({
      where: { name: alignment.name },
      update: {
        shortName: alignment.shortName,
        description: alignment.description,
        ethicalAxis: alignment.ethicalAxis,
        moralAxis: alignment.moralAxis,
      },
      create: {
        name: alignment.name,
        shortName: alignment.shortName,
        description: alignment.description,
        ethicalAxis: alignment.ethicalAxis,
        moralAxis: alignment.moralAxis,
      },
    });
  }
  
  console.log(`✅ Seeded ${alignmentsData.length} alignments`);
}

// Run if called directly
seedAlignments()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

export { seedAlignments }; 