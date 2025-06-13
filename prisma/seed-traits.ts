import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const traitsData = [
  {
    name: 'Darkvision',
    description: 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.',
    type: 'passive',
    effect: { type: 'darkvision', value: 60 }
  },
  {
    name: 'Dwarven Resilience',
    description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.',
    type: 'passive',
    effect: { type: 'resistance', value: 'poison' }
  },
  {
    name: 'Fey Ancestry',
    description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
    type: 'passive'
  },
  {
    name: 'Gnome Cunning',
    description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
    type: 'passive'
  },
  {
    name: 'Hellish Resistance',
    description: 'You have resistance to fire damage.',
    type: 'passive',
    effect: { type: 'resistance', value: 'fire' }
  },
  {
    name: 'Lucky',
    description: 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
    type: 'passive'
  },
  {
    name: 'Stone\'s Endurance',
    description: 'When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total.',
    type: 'active'
  },
  {
    name: 'Trance',
    description: 'You don\'t need to sleep. Instead, you meditate deeply, remaining semiconscious, for 4 hours a day.',
    type: 'passive'
  },
  {
    name: 'Two Skills',
    description: 'You gain proficiency in two skills of your choice.',
    type: 'passive'
  },
  {
    name: 'Extra Language',
    description: 'You can speak, read, and write one extra language of your choice.',
    type: 'passive'
  },
  {
    name: 'Extra Skill',
    description: 'You gain proficiency in one skill of your choice.',
    type: 'passive'
  },
  {
    name: 'Draconic Ancestry',
    description: 'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type.',
    type: 'passive'
  },
  {
    name: 'Breath Weapon',
    description: 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.',
    type: 'active'
  },
  {
    name: 'Damage Resistance',
    description: 'You have resistance to the damage type associated with your draconic ancestry.',
    type: 'passive'
  },
  {
    name: 'Celestial Resistance',
    description: 'You have resistance to necrotic and radiant damage.',
    type: 'passive',
    effect: { type: 'resistance', value: 'necrotic,radiant' }
  },
  {
    name: 'Healing Hands',
    description: 'As an action, you can touch a creature and cause it to regain a number of hit points equal to your level.',
    type: 'active'
  },
  {
    name: 'Natural Athlete',
    description: 'You have proficiency in the Athletics skill.',
    type: 'passive',
    effect: { type: 'skill', value: 'Athletics' }
  },
  {
    name: 'Powerful Build',
    description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
    type: 'passive'
  },
  {
    name: 'Feline Agility',
    description: 'Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn.',
    type: 'active'
  },
  {
    name: 'Cat\'s Claws',
    description: 'You have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes.',
    type: 'passive'
  },
  {
    name: 'Cat\'s Talents',
    description: 'You have proficiency in the Perception and Stealth skills.',
    type: 'passive',
    effect: { type: 'skill', value: 'Perception,Stealth' }
  }
];

export async function seedTraits() {
  console.log('Starting racial trait seeding...');
  
  // Clear existing traits
  await prisma.racialTrait.deleteMany({});
  console.log('Cleared existing traits');
  
  // Add traits
  for (const trait of traitsData) {
    await prisma.racialTrait.create({
      data: trait
    });
  }
  console.log(`Added ${traitsData.length} racial traits`);
  
  console.log('Racial trait seeding completed successfully');
} 