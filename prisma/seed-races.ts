import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const racesData = [
  {
    name: 'Human',
    abilityScoreIncrease: 'All ability scores increase by 1',
    description: 'Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common']),
    age: 'Humans reach adulthood in their late teens and live less than a century.'
  },
  {
    name: 'Elf',
    abilityScoreIncrease: 'Dexterity +2',
    description: 'Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Elvish']),
    age: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.'
  },
  {
    name: 'Dwarf',
    abilityScoreIncrease: 'Constitution +2',
    description: 'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.',
    size: 'Medium',
    speed: 25,
    languages: JSON.stringify(['Common', 'Dwarvish']),
    age: 'Dwarves mature at the same rate as humans, but they\'re considered young until they reach the age of 50. On average, they live about 350 years.'
  },
  {
    name: 'Halfling',
    abilityScoreIncrease: 'Dexterity +2',
    description: 'The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense.',
    size: 'Small',
    speed: 25,
    languages: JSON.stringify(['Common', 'Halfling']),
    age: 'A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.'
  },
  {
    name: 'Dragonborn',
    abilityScoreIncrease: 'Strength +2, Charisma +1',
    description: 'Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Draconic']),
    age: 'Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.'
  },
  {
    name: 'Gnome',
    abilityScoreIncrease: 'Intelligence +2',
    description: 'A gnome\'s energy and enthusiasm for living shines through every inch of his or her tiny body.',
    size: 'Small',
    speed: 25,
    languages: JSON.stringify(['Common', 'Gnomish']),
    age: 'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.'
  },
  {
    name: 'Half-Elf',
    abilityScoreIncrease: 'Charisma +2, Two other ability scores of your choice +1',
    description: 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Elvish']),
    age: 'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.'
  },
  {
    name: 'Half-Orc',
    abilityScoreIncrease: 'Strength +2, Constitution +1',
    description: 'Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Orc']),
    age: 'Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.'
  },
  {
    name: 'Tiefling',
    abilityScoreIncrease: 'Intelligence +1, Charisma +2',
    description: 'To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Infernal']),
    age: 'Tieflings mature at the same rate as humans but live a few years longer.'
  },
  {
    name: 'Aasimar',
    abilityScoreIncrease: 'Charisma +2',
    description: 'Aasimar are placed in the world to serve as guardians of law and good. Their patrons expect them to strike at evil, lead by example, and further the cause of justice.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Celestial']),
    age: 'Aasimar mature at the same rate as humans but live a few years longer.'
  },
  {
    name: 'Goliath',
    abilityScoreIncrease: 'Strength +2, Constitution +1',
    description: 'The goliaths are a nomadic race of mountain-dwelling giants who have adapted to life in the highest mountain ranges.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Giant']),
    age: 'Goliaths have lifespans comparable to humans. They enter adulthood in their late teens and usually live less than a century.'
  },
  {
    name: 'Tabaxi',
    abilityScoreIncrease: 'Dexterity +2, Charisma +1',
    description: 'Hailing from a strange and distant land, wandering tabaxi are catlike humanoids driven by curiosity to collect interesting objects, gather tales and stories, and lay eyes on all the world\'s wonders.',
    size: 'Medium',
    speed: 30,
    languages: JSON.stringify(['Common', 'Tabaxi']),
    age: 'Tabaxi have lifespans equivalent to humans.'
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