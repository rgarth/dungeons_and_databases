// Helper functions for accessing spell database data
import { spellsData } from '../../../prisma/data/spells-data';
import type { Spell } from './spells';

// Helper function to safely parse classes from JSON string
function parseClasses(classesData: string | string[]): string[] {
  if (Array.isArray(classesData)) {
    return classesData;
  }
  if (typeof classesData === 'string') {
    try {
      return JSON.parse(classesData);
    } catch {
      return [];
    }
  }
  return [];
}

export function getAllSpellsFromDatabase(): Spell[] {
  return spellsData.map(spell => ({
    name: spell.name,
    level: spell.level,
    school: spell.school,
    castingTime: spell.castingTime,
    range: spell.range,
    components: spell.components,
    duration: spell.duration,
    description: spell.description,
    classes: parseClasses(spell.classes)
  }));
}

export function getSpellsByClass(characterClass: string, maxLevel: number = 9): Spell[] {
  return spellsData
    .filter(spell => {
      const spellClasses = parseClasses(spell.classes);
      
      // Check if spell is available to this class and level
      return spellClasses.includes(characterClass) && spell.level <= maxLevel;
    })
    .map(spell => ({
      name: spell.name,
      level: spell.level,
      school: spell.school,
      castingTime: spell.castingTime,
      range: spell.range,
      components: spell.components,
      duration: spell.duration,
      description: spell.description,
      classes: parseClasses(spell.classes)
    }));
}

export function findSpellByName(spellName: string): Spell | null {
  const spell = spellsData.find(s => s.name === spellName);
  if (!spell) return null;
  
  return {
    name: spell.name,
    level: spell.level,
    school: spell.school,
    castingTime: spell.castingTime,
    range: spell.range,
    components: spell.components,
    duration: spell.duration,
    description: spell.description,
    classes: parseClasses(spell.classes)
  };
} 