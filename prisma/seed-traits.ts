import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const traitsData = [
  {
    name: "Artificer's Lore",
    description: "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
    type: "passive"
  },
  {
    name: "Breath Weapon (Acid)",
    description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 acid damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.",
    type: "active"
  },
  {
    name: "Breath Weapon (Cold)",
    description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 cold damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.",
    type: "active"
  },
  {
    name: "Breath Weapon (Fire)",
    description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 fire damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.",
    type: "active"
  },
  {
    name: "Breath Weapon (Lightning)",
    description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 lightning damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.",
    type: "active"
  },
  {
    name: "Breath Weapon (Poison)",
    description: "You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 poison damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.",
    type: "active"
  },
  {
    name: "Cantrip",
    description: "You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.",
    type: "passive"
  },
  {
    name: "Damage Resistance (Acid)",
    description: "You have resistance to acid damage.",
    type: "passive"
  },
  {
    name: "Damage Resistance (Cold)",
    description: "You have resistance to cold damage.",
    type: "passive"
  },
  {
    name: "Damage Resistance (Fire)",
    description: "You have resistance to fire damage.",
    type: "passive"
  },
  {
    name: "Damage Resistance (Lightning)",
    description: "You have resistance to lightning damage.",
    type: "passive"
  },
  {
    name: "Damage Resistance (Poison)",
    description: "You have resistance to poison damage.",
    type: "passive"
  },
  {
    name: "Draconic Ancestry",
    description: "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type.",
    type: "passive"
  },
  {
    name: "Drow Magic",
    description: "You know the dancing lights cantrip. When you reach 3rd level, you can cast the faerie fire spell once per day. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.",
    type: "active"
  },
  {
    name: "Drow Weapon Training",
    description: "You have proficiency with rapiers, shortswords, and hand crossbows.",
    type: "passive"
  },
  {
    name: "Dwarven Armor Training",
    description: "You have proficiency with light and medium armor.",
    type: "passive"
  },
  {
    name: "Dwarven Toughness",
    description: "Your hit point maximum increases by 1, and it increases by 1 every time you gain a level.",
    type: "passive"
  },
  {
    name: "Elf Weapon Training",
    description: "You have proficiency with the longsword, shortsword, shortbow, and longbow.",
    type: "passive"
  },
  {
    name: "Extra Language",
    description: "You can speak, read, and write one extra language of your choice.",
    type: "passive"
  },
  {
    name: "Fleet of Foot",
    description: "Your base walking speed increases to 35 feet.",
    type: "passive"
  },
  {
    name: "Healing Hands",
    description: "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
    type: "active"
  },
  {
    name: "Infernal Legacy",
    description: "You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell once per day as a 2nd-level spell. When you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spellcasting ability for these spells.",
    type: "active"
  },
  {
    name: "Mask of the Wild",
    description: "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
    type: "passive"
  },
  {
    name: "Natural Illusionist",
    description: "You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.",
    type: "passive"
  },
  {
    name: "Naturally Stealthy",
    description: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.",
    type: "passive"
  },
  {
    name: "Necrotic Shroud",
    description: "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to turn into pools of darkness and two skeletal, ghostly, flightless wings to sprout from your back. The instant you transform, other creatures within 10 feet of you that can see you must succeed on a Charisma saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or become frightened of you until the end of your next turn. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, once on each of your turns, you can deal extra necrotic damage to one target when you deal damage to it with an attack or a spell. The extra necrotic damage equals your level. Once you use this trait, you can't use it again until you finish a long rest.",
    type: "active"
  },
  {
    name: "Radiant Consumption",
    description: "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and two luminous, incorporeal wings to sprout from your back. The instant you transform, other creatures within 10 feet of you that can see you must succeed on a Constitution saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or take 5 + your Charisma modifier radiant damage and be blinded until the end of their next turn. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level. Once you use this trait, you can't use it again until you finish a long rest.",
    type: "active"
  },
  {
    name: "Radiant Soul",
    description: "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and two luminous, incorporeal wings to sprout from your back. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level. Once you use this trait, you can't use it again until you finish a long rest.",
    type: "active"
  },
  {
    name: "Speak with Small Beasts",
    description: "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.",
    type: "passive"
  },
  {
    name: "Stout Resilience",
    description: "You have advantage on saving throws against poison, and you have resistance against poison damage.",
    type: "passive"
  },
  {
    name: "Sunlight Sensitivity",
    description: "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.",
    type: "passive"
  },
  {
    name: "Superior Darkvision",
    description: "Your darkvision has a radius of 120 feet.",
    type: "passive"
  },
  {
    name: "Tinker",
    description: "You have proficiency with artisan's tools (tinker's tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time. When you create a device, choose one of the following options: Clockwork Toy. This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents. Fire Starter. The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action. Music Box. When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song's end or when it is closed.",
    type: "active"
  }
];

async function seedTraits() {
  console.log('🌱 Seeding traits...');

  for (const trait of traitsData) {
    try {
      await prisma.trait.upsert({
        where: { name: trait.name },
        update: trait,
        create: trait,
      });
      console.log(`✅ Seeded trait: ${trait.name}`);
    } catch (error) {
      console.error(`❌ Error seeding trait ${trait.name}:`, error);
    }
  }

  console.log('🎉 Traits seeding completed!');
}

async function main() {
  try {
    await seedTraits();
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

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