// Static game data - treasures, loot, etc.

export interface Treasure {
  name: string;
  value: number; // Value in gold pieces
  description?: string;
}

// Common D&D Treasures
export const COMMON_TREASURES = [
  { name: "Ruby", value: 500, description: "A brilliant red gemstone" },
  { name: "Emerald", value: 1000, description: "A pristine green gemstone" },
  { name: "Diamond", value: 5000, description: "A flawless clear gemstone" },
  { name: "Sapphire", value: 1000, description: "A deep blue gemstone" },
  { name: "Pearl", value: 100, description: "A lustrous white pearl" },
  { name: "Gold Ring", value: 25, description: "A simple gold band" },
  { name: "Silver Necklace", value: 50, description: "An ornate silver chain" },
  { name: "Platinum Coin", value: 10, description: "A rare platinum piece" },
  { name: "Jade Figurine", value: 150, description: "A carved jade statuette" },
  { name: "Art Object", value: 250, description: "A valuable piece of art" },
  { name: "Ancient Coin", value: 75, description: "A coin from a lost civilization" },
  { name: "Crystal Vial", value: 100, description: "A delicate crystal container" }
];

// Story-specific treasure templates for common campaign themes
export const STORY_TREASURES = [
  { name: "Bejeweled Skull", value: 750, description: "An ornate skull encrusted with gems, once belonging to an ancient ruler" },
  { name: "Dragon Scale", value: 200, description: "A shimmering scale from a defeated dragon, still warm to the touch" },
  { name: "Cursed Medallion", value: 300, description: "A dark medallion that whispers ancient secrets" },
  { name: "Royal Crown", value: 2500, description: "A golden crown set with precious stones, symbol of fallen royalty" },
  { name: "Demon Horn", value: 400, description: "A twisted horn from a defeated fiend, radiating dark energy" },
  { name: "Angel Feather", value: 600, description: "A pure white feather that glows with divine light" },
  { name: "Ancient Tome", value: 800, description: "A leather-bound book filled with forgotten knowledge" },
  { name: "Elemental Crystal", value: 450, description: "A crystal that swirls with elemental energy" },
  { name: "Pirate's Treasure Map", value: 150, description: "A weathered map leading to buried treasure" },
  { name: "Vampire's Ring", value: 350, description: "A silver ring that once belonged to an undead lord" },
  { name: "Dwarf-forged Chalice", value: 500, description: "A masterwork chalice carved from a single block of stone" },
  { name: "Elven Moonstone", value: 650, description: "A stone that captures and reflects moonlight eternally" }
]; 