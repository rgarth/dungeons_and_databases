export interface RaceData {
  name: string;
  size: string;
  speed: number;
  traits: string[];
  abilityScoreIncrease: string;
  languages: string[];
  description: string;
}

export const racesData: RaceData[] = [
  {
    name: "Human",
    size: "Medium",
    speed: 30,
    traits: ["Extra Language", "Extra Skill"],
    abilityScoreIncrease: "All ability scores increase by 1",
    languages: ["Common"],
    description: "Humans are the most adaptable and ambitious people among the common races. They have widely varying tastes, morals, and customs in the many different lands where they have settled."
  },
  {
    name: "Elf",
    size: "Medium", 
    speed: 30,
    traits: ["Darkvision", "Keen Senses", "Fey Ancestry", "Trance"],
    abilityScoreIncrease: "Dexterity +2",
    languages: ["Common", "Elvish"],
    description: "Elves are a magical people of otherworldly grace, living in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light."
  },
  {
    name: "Dwarf",
    size: "Medium",
    speed: 25,
    traits: ["Darkvision", "Dwarven Resilience", "Dwarven Combat Training", "Stonecunning"],
    abilityScoreIncrease: "Constitution +2",
    languages: ["Common", "Dwarvish"],
    description: "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human."
  },
  {
    name: "Halfling",
    size: "Small",
    speed: 25,
    traits: ["Lucky", "Brave", "Halfling Nimbleness"],
    abilityScoreIncrease: "Dexterity +2",
    languages: ["Common", "Halfling"],
    description: "The diminutive halflings survive in a world full of larger creatures by avoiding notice or, barring that, avoiding offense. They appear relatively harmless and so have managed to survive for centuries."
  },
  {
    name: "Dragonborn",
    size: "Medium",
    speed: 30,
    traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance"],
    abilityScoreIncrease: "Strength +2, Charisma +1",
    languages: ["Common", "Draconic"],
    description: "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension."
  },
  {
    name: "Gnome",
    size: "Small",
    speed: 25,
    traits: ["Darkvision", "Gnome Cunning"],
    abilityScoreIncrease: "Intelligence +2",
    languages: ["Common", "Gnomish"],
    description: "A gnome's energy and enthusiasm for living shines through every inch of his or her tiny body. Gnomes average slightly over 3 feet tall and weigh 40 to 45 pounds."
  },
  {
    name: "Half-Elf",
    size: "Medium",
    speed: 30,
    traits: ["Darkvision", "Fey Ancestry", "Two Skills"],
    abilityScoreIncrease: "Charisma +2, and two other ability scores +1",
    languages: ["Common", "Elvish"],
    description: "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents."
  },
  {
    name: "Half-Orc",
    size: "Medium",
    speed: 30,
    traits: ["Darkvision", "Relentless Endurance", "Savage Attacks"],
    abilityScoreIncrease: "Strength +2, Constitution +1",
    languages: ["Common", "Orc"],
    description: "Half-orcs' grayish pigmentation, sloping foreheads, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see."
  },
  {
    name: "Tiefling",
    size: "Medium",
    speed: 30,
    traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
    abilityScoreIncrease: "Charisma +2, Intelligence +1",
    languages: ["Common", "Infernal"],
    description: "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling."
  },
  {
    name: "Aasimar",
    size: "Medium",
    speed: 30,
    traits: ["Darkvision", "Celestial Resistance", "Healing Hands"],
    abilityScoreIncrease: "Charisma +2",
    languages: ["Common", "Celestial"],
    description: "Aasimar are touched by the power of good. They are often descended from humans with a touch of the power of Mount Celestia, the divine realm of many lawful good deities."
  },
  {
    name: "Goliath",
    size: "Medium",
    speed: 30,
    traits: ["Natural Athlete", "Stone's Endurance", "Powerful Build"],
    abilityScoreIncrease: "Strength +2, Constitution +1",
    languages: ["Common", "Giant"],
    description: "At the highest mountain peaks—far above the slopes where trees grow and where the air is thin and the frigid winds howl—dwell the reclusive goliaths."
  },
  {
    name: "Tabaxi",
    size: "Medium",
    speed: 30,
    traits: ["Darkvision", "Feline Agility", "Cat's Claws", "Cat's Talents"],
    abilityScoreIncrease: "Dexterity +2, Charisma +1",
    languages: ["Common", "Tabaxi"],
    description: "Hailing from a strange and distant land, wandering tabaxi are catlike humanoids driven by curiosity to collect interesting artifacts, gather tales and stories, and lay eyes on all the world's wonders."
  }
]; 