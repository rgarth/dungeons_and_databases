import { Treasure } from "@/lib/dnd/data";

// Re-export the Treasure interface for compatibility
export type { Treasure };

// Database helper functions for D&D 5e treasure data
// This replaces hardcoded treasure arrays with database queries

async function getTreasuresFromDatabase() {
  try {
    const response = await fetch('/api/treasures');
    if (!response.ok) {
      throw new Error('Failed to fetch treasures');
    }
    const treasures = await response.json();
    return treasures;
  } catch (error) {
    console.error('Error fetching treasures:', error);
    return [];
  }
}

// Get all treasures by type
export async function getTreasuresByType(type: string): Promise<Treasure[]> {
  const treasures = await getTreasuresFromDatabase();
  return treasures.filter((treasure: Treasure) => treasure.type === type);
}

// Get all gemstones
export async function getGemstones(): Promise<Treasure[]> {
  return getTreasuresByType('Gemstone');
}

// Get gemstones by value category
export async function getGemstonesByValue(category: string): Promise<Treasure[]> {
  const gemstones = await getGemstones();
  return gemstones.filter((gem: Treasure) => gem.category === category);
}

// Get all art objects
export async function getArtObjects(): Promise<Treasure[]> {
  return getTreasuresByType('Art Object');
}

// Get art objects by value category
export async function getArtObjectsByValue(category: string): Promise<Treasure[]> {
  const artObjects = await getArtObjects();
  return artObjects.filter((art: Treasure) => art.category === category);
}

// Get all mundane treasures
export async function getMundaneTreasures(): Promise<Treasure[]> {
  return getTreasuresByType('Mundane Treasure');
}

// Get all treasures (replaces COMMON_TREASURES and STORY_TREASURES)
export async function getAllTreasures(): Promise<Treasure[]> {
  return getTreasuresFromDatabase();
}

// Find treasure by name
export async function findTreasureByName(name: string): Promise<Treasure | undefined> {
  const treasures = await getTreasuresFromDatabase();
  return treasures.find((treasure: Treasure) => 
    treasure.name.toLowerCase() === name.toLowerCase()
  );
}

// Get random treasures by type and count
export async function getRandomTreasures(type: string, count: number): Promise<Treasure[]> {
  const treasures = await getTreasuresByType(type);
  const shuffled = treasures.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Get treasures by value range
export async function getTreasuresByValueRange(minValue: number, maxValue: number): Promise<Treasure[]> {
  const treasures = await getTreasuresFromDatabase();
  return treasures.filter((treasure: Treasure) => 
    treasure.value >= minValue && treasure.value <= maxValue
  );
} 