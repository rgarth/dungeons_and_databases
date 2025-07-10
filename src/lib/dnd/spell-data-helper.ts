// Helper functions for accessing spell data via cache or API
import { enhancedSpellsData as rawSpellsData } from '../../../prisma/data/enhanced-spells-data';

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
  ritual?: boolean;
  concentration?: boolean;
  material?: string | null;
  somatic?: boolean;
  verbal?: boolean;
  higherLevels?: string | null;
  damageType?: string | null;
  saveType?: string | null;
  attackType?: 'melee' | 'ranged' | 'none';
  areaOfEffect?: {
    type: 'sphere' | 'cube' | 'cylinder' | 'line' | 'cone' | 'square';
    size: number;
    unit: 'feet' | 'miles';
  } | null;
  damageAtSlotLevel?: Record<number, string> | null;
  healAtSlotLevel?: Record<number, string> | null;
  targetsAtSlotLevel?: Record<number, number> | null;
  atHigherLevels?: string | null;
  source?: string;
  page?: number | null;
}

const spellsData: Spell[] = rawSpellsData as unknown as Spell[];



export async function getSpellsByClass(characterClass: string, maxLevel: number = 9): Promise<Spell[]> {
  // Use static data
  return spellsData
    .filter((spell: Spell) => {
      // Check if spell is available to this class and level
      return spell.classes.includes(characterClass) && spell.level <= maxLevel;
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
      classes: spell.classes,
      ritual: spell.ritual,
      concentration: spell.concentration,
      material: spell.material,
      somatic: spell.somatic,
      verbal: spell.verbal,
      higherLevels: spell.higherLevels,
      damageType: spell.damageType,
      saveType: spell.saveType,
      attackType: spell.attackType,
      areaOfEffect: spell.areaOfEffect,
      damageAtSlotLevel: spell.damageAtSlotLevel,
      healAtSlotLevel: spell.healAtSlotLevel,
      targetsAtSlotLevel: spell.targetsAtSlotLevel,
      atHigherLevels: spell.atHigherLevels,
      source: spell.source,
      page: spell.page
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
    classes: spell.classes,
    ritual: spell.ritual,
    concentration: spell.concentration,
    material: spell.material,
    somatic: spell.somatic,
    verbal: spell.verbal,
    higherLevels: spell.higherLevels,
    damageType: spell.damageType,
    saveType: spell.saveType,
    attackType: spell.attackType,
    areaOfEffect: spell.areaOfEffect,
    damageAtSlotLevel: spell.damageAtSlotLevel,
    healAtSlotLevel: spell.healAtSlotLevel,
    targetsAtSlotLevel: spell.targetsAtSlotLevel,
    atHigherLevels: spell.atHigherLevels,
    source: spell.source,
    page: spell.page
  };
} 