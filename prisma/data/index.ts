// Consolidated D&D 5e SRD Content
// This file exports all game content for easy importing and management

import { weaponsData } from './weapons-data'
import { armorData } from './armor-data'
import { equipmentData } from './equipment-data'
import { spellsData } from './spells-data'

// Export all data
export { weaponsData, armorData, equipmentData, spellsData }

// Export counts for validation
export const contentCounts = {
  spells: spellsData.length,
  weapons: weaponsData.length,
  armor: armorData.length,
  equipment: equipmentData.length,
  total: spellsData.length + weaponsData.length + armorData.length + equipmentData.length
} 