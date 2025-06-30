// Helper functions for accessing spell data via cache or API
import { cachedSpells } from '@/lib/server/init';
import type { Spell } from './spells';

// Helper function to parse classes JSON string
function parseClasses(classesString: string): string[] {
  try {
    return JSON.parse(classesString);
  } catch (error) {
    console.error('Error parsing classes string:', classesString, error);
    return [];
  }
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

  // Fallback to API call if cache is not available
  try {
    const response = await fetch(`/api/spells?className=${encodeURIComponent(characterClass)}&level=${maxLevel}`);
    if (response.ok) {
      const spells = await response.json();
      return spells.map((spell: { 
        name: string; 
        level: number; 
        school: string; 
        castingTime: string; 
        range: string; 
        components: string; 
        duration: string; 
        description: string; 
        classes: string; 
      }) => ({
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
  } catch (error) {
    console.error('Error fetching spells from API:', error);
  }
  
  return [];
}

export async function findSpellByName(spellName: string): Promise<Spell | null> {
  // Use cached data if available
  if (cachedSpells) {
    const spell = cachedSpells.find(s => s.name === spellName);
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

  // Fallback to API call if cache is not available
  try {
    const response = await fetch(`/api/spells`);
    if (response.ok) {
      const spells = await response.json();
      const spell = spells.find((s: { name: string }) => s.name === spellName);
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
  } catch (error) {
    console.error('Error fetching spell from API:', error);
  }
  
  return null;
} 