// D&D 5e Data Service - Single Source of Truth
// Loads all TypeScript data files into memory for instant access
// Replaces database queries for static game data

import { racesData } from '../../prisma/data/races-data';
import { subracesData } from '../../prisma/data/subraces-data';
import { classesData } from '../../prisma/data/classes-data';
import { backgroundsData } from '../../prisma/data/backgrounds-data';
import { weaponsData } from '../../prisma/data/weapons-data';
import { armorData } from '../../prisma/data/armor-data';
import { equipmentData } from '../../prisma/data/equipment-data';
import { spellsData } from '../../prisma/data/spells-data';
import { traitsData } from '../../prisma/data/traits-data';
import { languagesData } from '../../prisma/data/languages-data';
import { treasureData } from '../../prisma/data/treasure-data';
import { equipmentPacksData } from '../../prisma/data/equipment-packs-data';
import { magicalItemsData } from '../../prisma/data/magical-items-data';
import { alignmentsData } from '../../prisma/data/alignments-data';
import { classWeaponSuggestionsData } from '../../prisma/data/weapon-suggestions-data';
import { classArmorSuggestionsData } from '../../prisma/data/armor-suggestions-data';
import { ammunitionSuggestionsData } from '../../prisma/data/ammunition-suggestions-data';
import { classSpellSuggestionsData } from '../../prisma/data/spell-suggestions-data';
import { classArmorProficiencies, classWeaponProficiencies } from '../../prisma/data/classes-data';
import { classSpellLimitsData } from '../../prisma/data/class-spell-limits-data';

// Data service class
export class DndDataService {
  private static instance: DndDataService;
  
  // Data storage
  private races = racesData;
  private subraces = subracesData;
  private classes = classesData;
  private backgrounds = backgroundsData;
  private weapons = weaponsData;
  private armor = armorData;
  private equipment = equipmentData;
  private spells = spellsData;
  private traits = traitsData;
  private languages = languagesData;
  private treasure = treasureData;
  private equipmentPacks = equipmentPacksData;
  private magicalItems = magicalItemsData;
  private alignments = alignmentsData;
  private weaponSuggestions = classWeaponSuggestionsData;
  private armorSuggestions = classArmorSuggestionsData;
  private ammunitionSuggestions = ammunitionSuggestionsData;
  private spellSuggestions = classSpellSuggestionsData;
  private armorProficiencies = classArmorProficiencies;
  private weaponProficiencies = classWeaponProficiencies;
  private spellLimits = classSpellLimitsData;

  private constructor() {
    // Initialize data with database-compatible IDs
    this.initializeData();
  }

  public static getInstance(): DndDataService {
    if (!DndDataService.instance) {
      DndDataService.instance = new DndDataService();
    }
    return DndDataService.instance;
  }

  private initializeData() {
    // No synthetic IDs needed - data is referenced by name
    // All data is already loaded and ready to use
  }

  // Public methods to access data
  public getRaces() {
    return this.races;
  }

  public getRaceByName(name: string) {
    return this.races.find(race => race.name === name) || null;
  }

  public getSubraces() {
    return this.subraces;
  }

  public getSubracesByRace(raceName: string) {
    return this.subraces.filter(subrace => subrace.raceName === raceName);
  }

  public getClasses() {
    return this.classes;
  }

  public getClassByName(name: string) {
    return this.classes.find(cls => cls.name === name) || null;
  }

  public getBackgrounds() {
    return this.backgrounds;
  }

  public getBackgroundByName(name: string) {
    return this.backgrounds.find(bg => bg.name === name) || null;
  }

  public getWeapons() {
    return this.weapons;
  }

  public getWeaponByName(name: string) {
    return this.weapons.find(weapon => weapon.name === name);
  }

  public getWeaponsByType(type: string) {
    return this.weapons.filter(weapon => weapon.type === type);
  }

  public getWeaponsByCategory(category: string) {
    return this.weapons.filter(weapon => weapon.category === category);
  }

  public getArmor() {
    return this.armor;
  }

  public getArmorByName(name: string) {
    return this.armor.find(armor => armor.name === name);
  }

  public getArmorByType(type: string) {
    return this.armor.filter(armor => armor.type === type);
  }

  public getEquipment() {
    return this.equipment;
  }

  public getEquipmentByName(name: string) {
    return this.equipment.find(item => item.name === name);
  }

  public getEquipmentByType(type: string) {
    return this.equipment.filter(item => item.type === type);
  }

  public getSpells() {
    return this.spells;
  }

  public getSpellByName(name: string) {
    return this.spells.find(spell => spell.name === name);
  }

  public getSpellsByLevel(level: number) {
    return this.spells.filter(spell => spell.level === level);
  }

  public getSpellsByClass(className: string) {
    return this.spells.filter(spell => {
      const classes = JSON.parse(spell.classes);
      return classes.includes(className);
    });
  }

  public getTraits() {
    return this.traits;
  }

  public getTraitsByRace(raceName: string) {
    // Get traits for a specific race
    const race = this.races.find(r => r.name === raceName);
    if (!race) return [];
    
    // Find traits by name from the race's traits array
    return this.traits.filter(trait => race.traits.includes(trait.name));
  }

  public getTraitsBySubrace(subraceName: string) {
    // Get traits for a specific subrace
    const subrace = this.subraces.find(s => s.name === subraceName);
    if (!subrace) return [];
    
    // Find traits by name from the subrace's traits array
    return this.traits.filter(trait => subrace.traits.includes(trait.name));
  }

  public getCombinedTraits(raceName: string, subraceName?: string) {
    // Get race traits
    const raceTraits = this.getTraitsByRace(raceName);
    
    // Get subrace traits if provided
    const subraceTraits = subraceName ? this.getTraitsBySubrace(subraceName) : [];
    
    // Combine and deduplicate by name
    const allTraits = [...raceTraits, ...subraceTraits];
    const uniqueTraits = allTraits.filter((trait, index, self) => 
      index === self.findIndex(t => t.name === trait.name)
    );
    
    // Log if duplicates were found (for debugging)
    if (allTraits.length !== uniqueTraits.length) {
      console.warn(`⚠️ Duplicate traits found for ${raceName}${subraceName ? ` + ${subraceName}` : ''}:`, {
        original: allTraits.map(t => t.name),
        unique: uniqueTraits.map(t => t.name),
        duplicates: allTraits.filter((trait, index, self) => 
          index !== self.findIndex(t => t.name === trait.name)
        ).map(t => t.name)
      });
    }
    
    return uniqueTraits;
  }

  public getLanguages() {
    return this.languages;
  }

  public getLanguageByName(name: string) {
    return this.languages.find(lang => lang.name === name);
  }

  public getTreasure() {
    return this.treasure;
  }

  public getTreasureByValue(value: number) {
    return this.treasure.filter(item => item.value === value);
  }

  public getEquipmentPacks() {
    return this.equipmentPacks;
  }

  public getEquipmentPackByName(name: string) {
    return this.equipmentPacks.find(pack => pack.name === name);
  }

  public getMagicalItems() {
    return this.magicalItems;
  }

  public getMagicalItemByName(name: string) {
    return this.magicalItems.find(item => item.name === name);
  }

  public getMagicalItemsByRarity(rarity: string) {
    return this.magicalItems.filter(item => item.rarity === rarity);
  }

  public getAlignments() {
    return this.alignments;
  }

  public getAlignmentByName(name: string) {
    return this.alignments.find(alignment => alignment.name === name);
  }

  public getWeaponSuggestionsByClass(className: string) {
    const classSuggestions = this.weaponSuggestions.find(s => s.className === className);
    return classSuggestions ? classSuggestions.suggestions : [];
  }

  public getArmorSuggestionsByClass(className: string) {
    const classSuggestions = this.armorSuggestions.find(s => s.className === className);
    return classSuggestions ? classSuggestions.suggestions : [];
  }

  public getAmmunitionSuggestions() {
    return this.ammunitionSuggestions;
  }

  public getSpellSuggestionsByClass(className: string) {
    const classSuggestions = this.spellSuggestions.find(s => s.className === className);
    return classSuggestions ? classSuggestions.suggestions : [];
  }

  public getClassProficiencies(className: string, includeArmor: boolean = false) {
    const classData = this.classes.find(c => c.name === className);
    if (!classData) return null;

    const weaponProficiencies = this.weaponProficiencies.filter(p => p.className === className);
    
    const proficiencies: {
      weapons: { simple: boolean; martial: boolean; specific: string[] };
      savingThrows: string[];
      armor?: string[];
    } = {
      weapons: {
        simple: weaponProficiencies.some(p => p.proficiencyType === 'Simple'),
        martial: weaponProficiencies.some(p => p.proficiencyType === 'Martial'),
        specific: weaponProficiencies
          .filter(p => p.proficiencyType === 'Specific' && p.weaponName)
          .map(p => p.weaponName!)
      },
      savingThrows: classData.savingThrows
    };

    if (includeArmor) {
      const armorProficiencies = this.armorProficiencies.filter(p => p.className === className);
      proficiencies.armor = armorProficiencies.map(p => p.armorType);
    }

    return proficiencies;
  }

  public getSpellLimits(className: string, level: number) {
    return this.spellLimits.find(limit => 
      limit.className === className && limit.level === level
    ) || null;
  }

  // Utility methods
  public searchWeapons(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.weapons.filter(weapon => 
      weapon.name.toLowerCase().includes(lowerQuery) ||
      weapon.description.toLowerCase().includes(lowerQuery)
    );
  }

  public searchArmor(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.armor.filter(armor => 
      armor.name.toLowerCase().includes(lowerQuery) ||
      armor.description.toLowerCase().includes(lowerQuery)
    );
  }

  public searchEquipment(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.equipment.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
  }

  public searchSpells(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.spells.filter(spell => 
      spell.name.toLowerCase().includes(lowerQuery) ||
      spell.description.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export singleton instance
export const dndDataService = DndDataService.getInstance(); 