// Helper functions for accessing spell database data
import { prisma } from '@/lib/prisma';
import { cachedSpells } from '@/lib/server/init';
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

export async function getAllSpellsFromDatabase(): Promise<Spell[]> {
  const spells = await prisma.spell.findMany({
    orderBy: [
      { level: 'asc' },
      { name: 'asc' }
    ]
  });

  return spells.map((spell) => ({
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

export async function getSpellsByClass(characterClass: string, maxLevel: number = 9): Promise<Spell[]> {
  // Use cached data if available
  if (cachedSpells) {
    return cachedSpells
      .filter((spell) => {
        const spellClasses = parseClasses(spell.classes);
        
        // Check if spell is available to this class and level
        return spellClasses.includes(characterClass) && spell.level <= maxLevel;
      })
      .map((spell) => ({
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

  // Fallback to database if cache is not initialized
  const spells = await prisma.spell.findMany({
    where: {
      level: {
        lte: maxLevel
      }
    },
    orderBy: [
      { level: 'asc' },
      { name: 'asc' }
    ]
  });

  return spells
    .filter((spell) => {
      const spellClasses = parseClasses(spell.classes);
      
      // Check if spell is available to this class and level
      return spellClasses.includes(characterClass) && spell.level <= maxLevel;
    })
    .map((spell) => ({
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

export async function findSpellByName(spellName: string): Promise<Spell | null> {
  const spell = await prisma.spell.findUnique({
    where: { name: spellName }
  });
  
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