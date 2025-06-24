import { PrismaClient } from '@prisma/client';
import { classSpellLimitsData } from './data/class-spell-limits-data';

const prisma = new PrismaClient();

// D&D 5e spell progression rules
function calculateSpellProgression(level: number) {
  // Max spell level based on character level
  const maxSpellLevel = Math.min(Math.ceil(level / 2), 9);
  
  // Spell level limits based on character level
  const spellLevelLimits: Record<string, number> = {};
  
  if (level >= 1) spellLevelLimits["1"] = 2;
  if (level >= 3) spellLevelLimits["2"] = 2;
  if (level >= 5) spellLevelLimits["3"] = 2;
  if (level >= 7) spellLevelLimits["4"] = 1;
  if (level >= 9) spellLevelLimits["5"] = 1;
  if (level >= 11) spellLevelLimits["6"] = 1;
  if (level >= 13) spellLevelLimits["7"] = 1;
  if (level >= 15) spellLevelLimits["8"] = 1;
  if (level >= 17) spellLevelLimits["9"] = 1;
  
  return { maxSpellLevel, spellLevelLimits };
}

export async function seedClassSpellLimits() {
  console.log('🌱 Seeding class spell limits...');

  try {
    // Get all classes to map names to IDs
    const classes = await prisma.dndClass.findMany();
    const classMap = new Map(classes.map(c => [c.name, c.id]));

    // Clear existing class spell limits
    await prisma.classSpellLimits.deleteMany({});

    // Insert new class spell limits data
    for (const limitData of classSpellLimitsData) {
      const classId = classMap.get(limitData.className);
      if (!classId) {
        console.warn(`⚠️  Class not found: ${limitData.className}`);
        continue;
      }

      // Calculate spell progression for this level
      const { maxSpellLevel, spellLevelLimits } = calculateSpellProgression(limitData.level);

      await prisma.classSpellLimits.create({
        data: {
          classId,
          level: limitData.level,
          cantripsKnown: limitData.cantripsKnown,
          spellsKnown: limitData.spellsKnown,
          spellcastingType: limitData.spellcastingType,
          maxSpellLevel,
          spellLevelLimits
        }
      });
    }

    console.log('✅ Class spell limits seeded successfully!');
    
    // Log summary
    const totalLimits = await prisma.classSpellLimits.count();
    console.log(`📊 Total class spell limits created: ${totalLimits}`);
    
    // Show breakdown by class
    const limitsByClass = await prisma.classSpellLimits.groupBy({
      by: ['classId'],
      _count: { level: true }
    });
    
    for (const group of limitsByClass) {
      const className = classes.find(c => c.id === group.classId)?.name || 'Unknown';
      console.log(`  ${className}: ${group._count.level} levels`);
    }

  } catch (error) {
    console.error('❌ Error seeding class spell limits:', error);
    throw error;
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  seedClassSpellLimits()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
} 