// Consolidated D&D 5e SRD Content
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document
// This file exports all game content for easy importing and management

import { weaponsData } from './weapons-data'
import { armorData } from './armor-data'
import { equipmentData } from './equipment-data'
import { enhancedSpellsData } from './enhanced-spells-data'
import { treasureData } from './treasure-data'
import { classesData, classArmorProficiencies, classWeaponProficiencies } from './classes-data'
import { backgroundsData } from './backgrounds-data'
import { racesData } from './races-data'
import { alignmentsData } from './alignments-data'
import { magicalItemsData } from './magical-items-data'
import { equipmentPacksData } from './equipment-packs-data'
import { classWeaponSuggestionsData } from './weapon-suggestions-data'
import { classArmorSuggestionsData } from './armor-suggestions-data'
import { ammunitionSuggestionsData } from './ammunition-suggestions-data'
import { traitsData } from './traits-data'
import { spellLevelLimitsData } from './spell-level-limits-data'
import { classSpellLimitsData } from './spell-limits-data'
import { subracesData } from './subraces-data'
import { languagesData } from './languages-data'

// Export all data
export {
  weaponsData,
  armorData,
  equipmentData,
  enhancedSpellsData as spellsData,
  treasureData,
  classesData,
  classArmorProficiencies,
  classWeaponProficiencies,
  backgroundsData,
  racesData,
  alignmentsData,
  magicalItemsData,
  equipmentPacksData,
  classWeaponSuggestionsData,
  classArmorSuggestionsData,
  ammunitionSuggestionsData,
  traitsData,
  spellLevelLimitsData,
  classSpellLimitsData,
  subracesData,
  languagesData
}

// Export counts for validation
export const contentCounts = {
  spells: enhancedSpellsData.length,
  weapons: weaponsData.length,
  armor: armorData.length,
  equipment: equipmentData.length,
  treasures: treasureData.length,
  classes: classesData.length,
  backgrounds: backgroundsData.length,
  races: racesData.length,
  alignments: alignmentsData.length,
  magicalItems: magicalItemsData.length,
  equipmentPacks: equipmentPacksData.length,
  weaponSuggestions: classWeaponSuggestionsData.length,
  armorSuggestions: classArmorSuggestionsData.length,
  traits: traitsData.length,
  spellLevelLimits: spellLevelLimitsData.length,
  classSpellLimits: classSpellLimitsData.length,
  subraces: subracesData.length,
  languages: languagesData.length,
  total: enhancedSpellsData.length + 
         weaponsData.length + 
         armorData.length + 
         equipmentData.length + 
         treasureData.length +
         classesData.length +
         backgroundsData.length +
         racesData.length +
         alignmentsData.length +
         magicalItemsData.length +
         equipmentPacksData.length +
         classWeaponSuggestionsData.length +
         classArmorSuggestionsData.length +
         traitsData.length +
         spellLevelLimitsData.length +
         classSpellLimitsData.length +
         subracesData.length +
         languagesData.length
} 