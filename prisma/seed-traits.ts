import { PrismaClient } from '@prisma/client';
import { traitsData } from '../prisma/data/traits-data';

const prisma = new PrismaClient();

export async function seedTraits() {
  console.log('🌱 Seeding traits...');
  
  try {
    // Check if traits already exist
    const existingTraits = await prisma.trait.count();
    if (existingTraits > 0) {
      console.log(`✅ Traits already seeded (${existingTraits} found). Skipping...`);
      return;
    }

    // Create all traits
    const createdTraits = await prisma.trait.createMany({
      data: traitsData,
      skipDuplicates: true
    });

    console.log(`✅ Seeded ${createdTraits.count} traits successfully`);
  } catch (error) {
    console.error('❌ Error seeding traits:', error);
    throw error;
  }
}

// Race-trait associations based on 5e SRD
export const raceTraitAssociations = [
  // Dwarf (Hill)
  { raceName: 'Dwarf', traitNames: ['Darkvision', 'Dwarven Resilience', 'Dwarven Combat Training', 'Tool Proficiency', 'Stonecunning', 'Dwarven Toughness'] },
  
  // Dwarf (Mountain)
  { raceName: 'Dwarf', traitNames: ['Darkvision', 'Dwarven Resilience', 'Dwarven Combat Training', 'Tool Proficiency', 'Stonecunning', 'Dwarven Armor Training'] },
  
  // Elf (High)
  { raceName: 'Elf', traitNames: ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance', 'Elf Weapon Training', 'High Elf Cantrip', 'Extra Language'] },
  
  // Elf (Wood)
  { raceName: 'Elf', traitNames: ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance', 'Elf Weapon Training', 'Wood Elf Fleet of Foot', 'Wood Elf Mask of the Wild'] },
  
  // Elf (Drow)
  { raceName: 'Elf', traitNames: ['Superior Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance', 'Drow Magic', 'Drow Weapon Training', 'Sunlight Sensitivity'] },
  
  // Halfling (Lightfoot)
  { raceName: 'Halfling', traitNames: ['Lucky', 'Brave', 'Halfling Nimbleness', 'Naturally Stealthy'] },
  
  // Halfling (Stout)
  { raceName: 'Halfling', traitNames: ['Lucky', 'Brave', 'Halfling Nimbleness', 'Stout Resilience'] },
  
  // Human
  { raceName: 'Human', traitNames: ['Extra Language'] },
  
  // Dragonborn
  { raceName: 'Dragonborn', traitNames: ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance'] },
  
  // Gnome (Forest)
  { raceName: 'Gnome', traitNames: ['Darkvision', 'Gnome Cunning', 'Forest Gnome Natural Illusionist', 'Speak with Small Beasts'] },
  
  // Gnome (Rock)
  { raceName: 'Gnome', traitNames: ['Darkvision', 'Gnome Cunning', 'Rock Gnome Artificer\'s Lore', 'Rock Gnome Tinker'] },
  
  // Half-Elf
  { raceName: 'Half-Elf', traitNames: ['Darkvision', 'Fey Ancestry', 'Skill Versatility'] },
  
  // Half-Orc
  { raceName: 'Half-Orc', traitNames: ['Darkvision', 'Menacing', 'Relentless Endurance', 'Savage Attacks'] },
  
  // Tiefling
  { raceName: 'Tiefling', traitNames: ['Darkvision', 'Hellish Resistance', 'Infernal Legacy'] }
];

export async function seedRaceTraitAssociations() {
  console.log('🔗 Seeding race-trait associations...');
  
  try {
    // Check if associations already exist
    const existingAssociations = await prisma.raceTrait.count();
    if (existingAssociations > 0) {
      console.log(`✅ Race-trait associations already seeded (${existingAssociations} found). Skipping...`);
      return;
    }

    const associationsToCreate = [];

    for (const association of raceTraitAssociations) {
      const race = await prisma.dndRace.findUnique({
        where: { name: association.raceName }
      });

      if (!race) {
        console.warn(`⚠️ Race "${association.raceName}" not found, skipping associations`);
        continue;
      }

      for (const traitName of association.traitNames) {
        const trait = await prisma.trait.findUnique({
          where: { name: traitName }
        });

        if (!trait) {
          console.warn(`⚠️ Trait "${traitName}" not found, skipping association`);
          continue;
        }

        associationsToCreate.push({
          raceId: race.id,
          traitId: trait.id
        });
      }
    }

    // Use createMany with skipDuplicates to avoid unique constraint errors
    const result = await prisma.raceTrait.createMany({
      data: associationsToCreate,
      skipDuplicates: true
    });

    console.log(`✅ Seeded ${result.count} race-trait associations successfully`);
  } catch (error) {
    console.error('❌ Error seeding race-trait associations:', error);
    throw error;
  }
} 