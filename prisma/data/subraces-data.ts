// Complete D&D 5e SRD Subraces Data
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document

export interface SubraceData {
  name: string;
  raceName: string;
  description: string;
  abilityScoreIncrease: string;
  traits: string[];
  languages?: string[] | null;
}

export const subracesData: SubraceData[] = [
  // Elf subraces
  {
    name: "High Elf",
    raceName: "Elf",
    description: "High elves value scholarship and the pursuit of magical knowledge. They are often found in libraries and universities.",
    abilityScoreIncrease: "Intelligence +1",
    traits: ["Elf Weapon Training", "Cantrip", "Extra Language"],
    languages: ["One extra language of your choice"]
  },
  {
    name: "Wood Elf",
    raceName: "Elf",
    description: "Wood elves are reclusive, living in small communities in the depths of forests. They are attuned to nature and magic.",
    abilityScoreIncrease: "Wisdom +1",
    traits: ["Elf Weapon Training", "Fleet of Foot", "Mask of the Wild"],
    languages: null
  },
  {
    name: "Drow",
    raceName: "Elf",
    description: "Drow are dark elves who live in the Underdark. They are known for their cruelty and their worship of Lolth.",
    abilityScoreIncrease: "Charisma +1",
    traits: ["Superior Darkvision", "Sunlight Sensitivity", "Drow Magic", "Drow Weapon Training"],
    languages: null
  },

  // Dwarf subraces
  {
    name: "Hill Dwarf",
    raceName: "Dwarf",
    description: "Hill dwarves are the most common dwarves. They are known for their toughness and their love of ale and gold.",
    abilityScoreIncrease: "Wisdom +1",
    traits: ["Dwarven Toughness"],
    languages: null
  },
  {
    name: "Mountain Dwarf",
    raceName: "Dwarf",
    description: "Mountain dwarves are the most martial of dwarves. They are known for their skill with weapons and armor.",
    abilityScoreIncrease: "Strength +2",
    traits: ["Dwarven Armor Training"],
    languages: null
  },

  // Halfling subraces
  {
    name: "Lightfoot Halfling",
    raceName: "Halfling",
    description: "Lightfoot halflings are stealthy and quick. They are known for their ability to hide and their love of comfort.",
    abilityScoreIncrease: "Charisma +1",
    traits: ["Naturally Stealthy"],
    languages: null
  },
  {
    name: "Stout Halfling",
    raceName: "Halfling",
    description: "Stout halflings are hardier than other halflings. They are known for their resistance to poison and their love of food.",
    abilityScoreIncrease: "Constitution +1",
    traits: ["Stout Resilience"],
    languages: null
  },

  // Gnome subraces
  {
    name: "Forest Gnome",
    raceName: "Gnome",
    description: "Forest gnomes are reclusive and shy. They are known for their ability to communicate with small animals.",
    abilityScoreIncrease: "Dexterity +1",
    traits: ["Natural Illusionist", "Speak with Small Beasts"],
    languages: null
  },
  {
    name: "Rock Gnome",
    raceName: "Gnome",
    description: "Rock gnomes are inventive and curious. They are known for their tinkering and their love of gadgets.",
    abilityScoreIncrease: "Constitution +1",
    traits: ["Artificer's Lore", "Tinker"],
    languages: null
  },

  // Tiefling subraces
  {
    name: "Asmodeus Tiefling",
    raceName: "Tiefling",
    description: "Tieflings with the blood of Asmodeus are the most common. They are known for their infernal heritage.",
    abilityScoreIncrease: "Intelligence +1",
    traits: ["Infernal Legacy"],
    languages: null
  },
  {
    name: "Baalzebul Tiefling",
    raceName: "Tiefling",
    description: "Tieflings with the blood of Baalzebul are known for their cunning and their ability to manipulate others.",
    abilityScoreIncrease: "Intelligence +1",
    traits: ["Infernal Legacy"],
    languages: null
  },
  {
    name: "Mephistopheles Tiefling",
    raceName: "Tiefling",
    description: "Tieflings with the blood of Mephistopheles are known for their magical prowess and their fiery nature.",
    abilityScoreIncrease: "Intelligence +1",
    traits: ["Infernal Legacy"],
    languages: null
  },

  // Aasimar subraces
  {
    name: "Protector Aasimar",
    raceName: "Aasimar",
    description: "Protector aasimar are touched by the power of good. They are known for their healing abilities.",
    abilityScoreIncrease: "Wisdom +1",
    traits: ["Radiant Soul", "Healing Hands"],
    languages: null
  },
  {
    name: "Scourge Aasimar",
    raceName: "Aasimar",
    description: "Scourge aasimar are touched by the power of justice. They are known for their ability to punish evil.",
    abilityScoreIncrease: "Constitution +1",
    traits: ["Radiant Consumption", "Healing Hands"],
    languages: null
  },
  {
    name: "Fallen Aasimar",
    raceName: "Aasimar",
    description: "Fallen aasimar have turned away from their celestial heritage. They are known for their dark powers.",
    abilityScoreIncrease: "Strength +1",
    traits: ["Necrotic Shroud", "Healing Hands"],
    languages: null
  },

  // Dragonborn subraces (by dragon color)
  {
    name: "Black Dragonborn",
    raceName: "Dragonborn",
    description: "Black dragonborn are descended from black dragons. They are known for their acid breath and resistance to acid damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Acid)", "Damage Resistance (Acid)"],
    languages: null
  },
  {
    name: "Blue Dragonborn",
    raceName: "Dragonborn",
    description: "Blue dragonborn are descended from blue dragons. They are known for their lightning breath and resistance to lightning damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Lightning)", "Damage Resistance (Lightning)"],
    languages: null
  },
  {
    name: "Brass Dragonborn",
    raceName: "Dragonborn",
    description: "Brass dragonborn are descended from brass dragons. They are known for their fire breath and resistance to fire damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Fire)", "Damage Resistance (Fire)"],
    languages: null
  },
  {
    name: "Bronze Dragonborn",
    raceName: "Dragonborn",
    description: "Bronze dragonborn are descended from bronze dragons. They are known for their lightning breath and resistance to lightning damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Lightning)", "Damage Resistance (Lightning)"],
    languages: null
  },
  {
    name: "Copper Dragonborn",
    raceName: "Dragonborn",
    description: "Copper dragonborn are descended from copper dragons. They are known for their acid breath and resistance to acid damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Acid)", "Damage Resistance (Acid)"],
    languages: null
  },
  {
    name: "Gold Dragonborn",
    raceName: "Dragonborn",
    description: "Gold dragonborn are descended from gold dragons. They are known for their fire breath and resistance to fire damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Fire)", "Damage Resistance (Fire)"],
    languages: null
  },
  {
    name: "Green Dragonborn",
    raceName: "Dragonborn",
    description: "Green dragonborn are descended from green dragons. They are known for their poison breath and resistance to poison damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Poison)", "Damage Resistance (Poison)"],
    languages: null
  },
  {
    name: "Red Dragonborn",
    raceName: "Dragonborn",
    description: "Red dragonborn are descended from red dragons. They are known for their fire breath and resistance to fire damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Fire)", "Damage Resistance (Fire)"],
    languages: null
  },
  {
    name: "Silver Dragonborn",
    raceName: "Dragonborn",
    description: "Silver dragonborn are descended from silver dragons. They are known for their cold breath and resistance to cold damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Cold)", "Damage Resistance (Cold)"],
    languages: null
  },
  {
    name: "White Dragonborn",
    raceName: "Dragonborn",
    description: "White dragonborn are descended from white dragons. They are known for their cold breath and resistance to cold damage.",
    abilityScoreIncrease: "Strength +2, Charisma +1",
    traits: ["Draconic Ancestry", "Breath Weapon (Cold)", "Damage Resistance (Cold)"],
    languages: null
  },

  // Base races as subraces (for races with no subraces)
  // Note: Human is excluded because it has no subraces in D&D 5e

  {
    name: "Tiefling",
    raceName: "Tiefling",
    description: "Tieflings are touched by infernal power, with fiendish traits.",
    abilityScoreIncrease: "Charisma +2, Intelligence +1",
    traits: ["Darkvision", "Hellish Resistance", "Infernal Legacy"],
    languages: ["Common", "Infernal"]
  },
  {
    name: "Aasimar",
    raceName: "Aasimar",
    description: "Aasimar are touched by the power of good.",
    abilityScoreIncrease: "Charisma +2",
    traits: ["Darkvision", "Celestial Resistance", "Healing Hands"],
    languages: ["Common", "Celestial"]
  },


]; 