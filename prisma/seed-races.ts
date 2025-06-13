import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const racesData = [
  {
    name: 'Human',
    abilityScoreIncrease: 'All ability scores increase by 1',
    traits: JSON.stringify(['Extra Language', 'Extra Skill']),
    description: 'Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common'])
  },
  {
    name: 'Elf',
    abilityScoreIncrease: 'Dexterity +2',
    traits: JSON.stringify(['Darkvision', 'Fey Ancestry', 'Trance']),
    description: 'Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Elvish'])
  },
  {
    name: 'Dwarf',
    abilityScoreIncrease: 'Constitution +2',
    traits: JSON.stringify(['Darkvision', 'Dwarven Resilience', 'Stone\'s Endurance']),
    description: 'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.',
    size: 'Medium',
    speed: 25,
    languages: JSON.stringify(['Common', 'Dwarvish'])
  },
  {
    name: 'Halfling',
    abilityScoreIncrease: 'Dexterity +2',
    traits: JSON.stringify(['Lucky', 'Brave', 'Halfling Nimbleness']),
    description: 'The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.',
    size: 'Small',
    speed: 25,
    languages: JSON.stringify(['Common', 'Halfling'])
  },
  {
    name: 'Dragonborn',
    abilityScoreIncrease: 'Strength +2, Charisma +1',
    traits: JSON.stringify(['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance']),
    description: 'Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Draconic'])
  },
  {
    name: 'Gnome',
    abilityScoreIncrease: 'Intelligence +2',
    traits: JSON.stringify(['Darkvision', 'Gnome Cunning']),
    description: 'A gnome\'s energy and enthusiasm for living shines through every inch of his or her tiny body.',
    size: 'Small',
    speed: 25,
    languages: JSON.stringify(['Common', 'Gnomish'])
  },
  {
    name: 'Half-Elf',
    abilityScoreIncrease: 'Charisma +2, Two other ability scores of your choice +1',
    traits: JSON.stringify(['Darkvision', 'Fey Ancestry', 'Skill Versatility']),
    description: 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Elvish'])
  },
  {
    name: 'Half-Orc',
    abilityScoreIncrease: 'Strength +2, Constitution +1',
    traits: JSON.stringify(['Darkvision', 'Menacing', 'Relentless Endurance', 'Savage Attacks']),
    description: 'Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Orc'])
  },
  {
    name: 'Tiefling',
    abilityScoreIncrease: 'Intelligence +1, Charisma +2',
    traits: JSON.stringify(['Darkvision', 'Hellish Resistance', 'Infernal Legacy']),
    description: 'To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Infernal'])
  },
  {
    name: 'Aasimar',
    abilityScoreIncrease: 'Charisma +2',
    traits: JSON.stringify(['Darkvision', 'Celestial Resistance', 'Healing Hands', 'Light Bearer']),
    description: 'Aasimar are placed in the world to serve as guardians of law and good. Their patrons expect them to strike at evil, lead by example, and further the cause of justice.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Celestial'])
  },
  {
    name: 'Goliath',
    abilityScoreIncrease: 'Strength +2, Constitution +1',
    traits: JSON.stringify(['Stone\'s Endurance', 'Powerful Build', 'Natural Athlete']),
    description: 'The goliaths are a nomadic race of mountain-dwelling giants who have adapted to life in the highest mountain ranges.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Giant'])
  },
  {
    name: 'Tabaxi',
    abilityScoreIncrease: 'Dexterity +2, Charisma +1',
    traits: JSON.stringify(['Darkvision', 'Feline Agility', 'Cat\'s Claws', 'Cat\'s Talents']),
    description: 'Hailing from a strange and distant land, wandering tabaxi are catlike humanoids driven by curiosity to collect interesting objects, gather tales and stories, and lay eyes on all the world\'s wonders.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Tabaxi'])
  }
];

export async function seedRaces() {
  console.log('Starting race seeding...');
  
  // Clear existing races
  await prisma.dndRace.deleteMany({});
  console.log('Cleared existing races');
  
  // Add races
  for (const race of racesData) {
    await prisma.dndRace.create({
      data: race
    });
  }
  console.log(`Added ${racesData.length} races`);
  
  console.log('Race seeding completed successfully');
}

// Remove the require.main block. Only export seedRaces for use by the complete seed script.
// No code should run automatically in this file. 