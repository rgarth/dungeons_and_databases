// Consolidated D&D 5e SRD Content
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document
// This file exports all game content for easy importing and management

import { weaponsData } from './weapons-data'
import { armorData } from './armor-data'
import { equipmentData } from './equipment-data'
import { spellsData } from './spells-data'
import { treasureData } from './treasure-data'

// Export all data
export { weaponsData, armorData, equipmentData, spellsData, treasureData }

// Export counts for validation
export const contentCounts = {
  spells: spellsData.length,
  weapons: weaponsData.length,
  armor: armorData.length,
  equipment: equipmentData.length,
  treasures: treasureData.length,
  total: spellsData.length + weaponsData.length + armorData.length + equipmentData.length + treasureData.length
} 