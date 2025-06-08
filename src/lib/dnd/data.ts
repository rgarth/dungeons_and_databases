// Treasure data - now sourced from database instead of hardcoded arrays

export interface Treasure {
  id?: string;
  name: string;
  type: string; // "Gemstone", "Art Object", "Mundane Treasure"
  category?: string; // For gemstones: "10 gp", "50 gp", etc. For art objects: "25 gp", "250 gp", etc.
  value: number; // Value in gold pieces
  description: string;
  weight?: number; // Some treasures have no weight
  appearance?: string; // Physical description for immersion
} 