// Helper functions for accessing spell data via cache or API
import { spellsData as rawSpellsData } from '../../../prisma/data/spells-data';

// Define Spell interface locally to avoid circular imports
interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  classes: string[];
}

const spellsData: Spell[] = rawSpellsData as unknown as Spell[];

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
  // Use static data
  return spellsData
    .filter((spell: Spell) => {
      const spellClasses = parseClasses(spell.classes as unknown as string);
      // Check if spell is available to this class and level
      return spellClasses.includes(characterClass) && spell.level <= maxLevel;
    })
    .map((spell: Spell) => ({
      name: spell.name,
      level: spell.level,
      school: spell.school,
      castingTime: spell.castingTime,
      range: spell.range,
      components: spell.components,
      duration: spell.duration,
      description: spell.description,
      classes: parseClasses(spell.classes as unknown as string)
    }));
}

export async function findSpellByName(spellName: string): Promise<Spell | null> {
  // Use static data
  const spell = spellsData.find((s: Spell) => s.name === spellName);
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
    classes: parseClasses(spell.classes as unknown as string)
  };
} 