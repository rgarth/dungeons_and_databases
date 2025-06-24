import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const subracesData = [
  // Elf subraces
  {
    name: 'High Elf',
    raceName: 'Elf',
    description: 'High elves value scholarship and the pursuit of magical knowledge. They are often found in libraries and universities.',
    abilityScoreIncrease: 'Intelligence +1',
    traits: ['Elf Weapon Training', 'Cantrip', 'Extra Language'],
    languages: ['One extra language of your choice']
  },
  {
    name: 'Wood Elf',
    raceName: 'Elf',
    description: 'Wood elves are reclusive, living in small communities in the depths of forests. They are attuned to nature and magic.',
    abilityScoreIncrease: 'Wisdom +1',
    traits: ['Elf Weapon Training', 'Fleet of Foot', 'Mask of the Wild'],
    languages: null
  },
  {
    name: 'Drow',
    raceName: 'Elf',
    description: 'Drow are dark elves who live in the Underdark. They are known for their cruelty and their worship of Lolth.',
    abilityScoreIncrease: 'Charisma +1',
    traits: ['Superior Darkvision', 'Sunlight Sensitivity', 'Drow Magic', 'Drow Weapon Training'],
    languages: null
  },

  // Dwarf subraces
  {
    name: 'Hill Dwarf',
    raceName: 'Dwarf',
    description: 'Hill dwarves are the most common dwarves. They are known for their toughness and their love of ale and gold.',
    abilityScoreIncrease: 'Wisdom +1',
    traits: ['Dwarven Toughness'],
    languages: null
  },
  {
    name: 'Mountain Dwarf',
    raceName: 'Dwarf',
    description: 'Mountain dwarves are the most martial of dwarves. They are known for their skill with weapons and armor.',
    abilityScoreIncrease: 'Strength +2',
    traits: ['Dwarven Armor Training'],
    languages: null
  },

  // Halfling subraces
  {
    name: 'Lightfoot Halfling',
    raceName: 'Halfling',
    description: 'Lightfoot halflings are stealthy and quick. They are known for their ability to hide and their love of comfort.',
    abilityScoreIncrease: 'Charisma +1',
    traits: ['Naturally Stealthy'],
    languages: null
  },
  {
    name: 'Stout Halfling',
    raceName: 'Halfling',
    description: 'Stout halflings are hardier than other halflings. They are known for their resistance to poison and their love of food.',
    abilityScoreIncrease: 'Constitution +1',
    traits: ['Stout Resilience'],
    languages: null
  },

  // Gnome subraces
  {
    name: 'Forest Gnome',
    raceName: 'Gnome',
    description: 'Forest gnomes are reclusive and shy. They are known for their ability to communicate with small animals.',
    abilityScoreIncrease: 'Dexterity +1',
    traits: ['Natural Illusionist', 'Speak with Small Beasts'],
    languages: null
  },
  {
    name: 'Rock Gnome',
    raceName: 'Gnome',
    description: 'Rock gnomes are inventive and curious. They are known for their tinkering and their love of gadgets.',
    abilityScoreIncrease: 'Constitution +1',
    traits: ['Artificer\'s Lore', 'Tinker'],
    languages: null
  },

  // Tiefling subraces
  {
    name: 'Asmodeus Tiefling',
    raceName: 'Tiefling',
    description: 'Tieflings with the blood of Asmodeus are the most common. They are known for their infernal heritage.',
    abilityScoreIncrease: 'Intelligence +1',
    traits: ['Infernal Legacy'],
    languages: null
  },
  {
    name: 'Baalzebul Tiefling',
    raceName: 'Tiefling',
    description: 'Tieflings with the blood of Baalzebul are known for their cunning and their ability to manipulate others.',
    abilityScoreIncrease: 'Intelligence +1',
    traits: ['Infernal Legacy'],
    languages: null
  },
  {
    name: 'Mephistopheles Tiefling',
    raceName: 'Tiefling',
    description: 'Tieflings with the blood of Mephistopheles are known for their magical prowess and their fiery nature.',
    abilityScoreIncrease: 'Intelligence +1',
    traits: ['Infernal Legacy'],
    languages: null
  },

  // Aasimar subraces
  {
    name: 'Protector Aasimar',
    raceName: 'Aasimar',
    description: 'Protector aasimar are touched by the power of good. They are known for their healing abilities.',
    abilityScoreIncrease: 'Wisdom +1',
    traits: ['Radiant Soul', 'Healing Hands'],
    languages: null
  },
  {
    name: 'Scourge Aasimar',
    raceName: 'Aasimar',
    description: 'Scourge aasimar are touched by the power of justice. They are known for their ability to punish evil.',
    abilityScoreIncrease: 'Constitution +1',
    traits: ['Radiant Consumption', 'Healing Hands'],
    languages: null
  },
  {
    name: 'Fallen Aasimar',
    raceName: 'Aasimar',
    description: 'Fallen aasimar have turned away from their celestial heritage. They are known for their dark powers.',
    abilityScoreIncrease: 'Strength +1',
    traits: ['Necrotic Shroud', 'Healing Hands'],
    languages: null
  }
];

export async function seedSubraces() {
  console.log('🧝‍♀️ Seeding subraces...');
  
  // Clear existing subraces
  await prisma.subrace.deleteMany({});
  console.log('Cleared existing subraces');
  
  // Add subraces
  for (const subrace of subracesData) {
    // Find the race by name
    const race = await prisma.dndRace.findUnique({
      where: { name: subrace.raceName }
    });
    
    if (!race) {
      console.warn(`⚠️ Race "${subrace.raceName}" not found, skipping subrace "${subrace.name}"`);
      continue;
    }
    
    await prisma.subrace.create({
      data: {
        name: subrace.name,
        raceId: race.id,
        description: subrace.description,
        abilityScoreIncrease: subrace.abilityScoreIncrease,
        traits: JSON.stringify(subrace.traits),
        languages: subrace.languages ? JSON.stringify(subrace.languages) : undefined
      }
    });
  }
  
  console.log(`✅ Seeded ${subracesData.length} subraces`);
}

async function main() {
  await seedSubraces();
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} 