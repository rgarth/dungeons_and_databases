// Helper functions for accessing spell database data
import { spellsData } from '../../../prisma/data/spells-data';
import type { Spell } from './spells';

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
    classes: typeof spell.classes === 'string' ? JSON.parse(spell.classes) : spell.classes
  }));
}

export function getSpellsByClass(characterClass: string, maxLevel: number = 9): Spell[] {
  return spellsData
    .filter(spell => {
      // Parse classes array (stored as JSON string in database)
      let spellClasses: string[] = [];
      try {
        spellClasses = typeof spell.classes === 'string' ? JSON.parse(spell.classes) : spell.classes;
      } catch {
        spellClasses = [];
      }
      
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
      classes: typeof spell.classes === 'string' ? JSON.parse(spell.classes) : spell.classes
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
    classes: typeof spell.classes === 'string' ? JSON.parse(spell.classes) : spell.classes
  };
} 