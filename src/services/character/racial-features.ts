import { AbilityScore } from '@/types/ability-scores';

export interface RacialAbilityScoreIncrease {
  ability: AbilityScore;
  increase: number;
}

export interface RacialTrait {
  name: string;
  description: string;
  type: 'passive' | 'active';
  effect?: Record<string, unknown>;
}

export class RacialFeaturesService {
  // Parse ability score increase string into structured data
  private static parseAbilityScoreIncrease(increaseStr: string): RacialAbilityScoreIncrease[] {
    const increases: RacialAbilityScoreIncrease[] = [];
    
    // Handle "All ability scores increase by X"
    if (increaseStr.toLowerCase().includes('all ability scores')) {
      const match = increaseStr.match(/increase by (\d+)/i);
      const value = match ? parseInt(match[1]) : 1;
      return ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((ability: string) => ({
        ability: ability as AbilityScore,
        increase: value
      }));
    }

    // Handle specific ability increases
    const parts = increaseStr.split(',').map((part: string) => part.trim());
    for (const part of parts) {
      const match = part.match(/(\w+)\s*\+\s*(\d+)/i);
      if (match) {
        const ability = match[1].toLowerCase() as AbilityScore;
        const increase = parseInt(match[2]);
        increases.push({ ability, increase });
      }
    }

    return increases;
  }

  // Apply racial ability score increases to base scores
  public static async applyRacialAbilityScores(abilityScores: Record<string, number>, race: string): Promise<Record<string, number>> {
    const raceData = await fetch(`/api/races/${encodeURIComponent(race)}`).then(res => res.json());
    if (!raceData) {
      console.warn(`Race ${race} not found`);
      return abilityScores;
    }

    if (!raceData.abilityScoreIncrease) {
      console.warn(`No ability score increase data for race ${race}`);
      return abilityScores;
    }

    // Use the existing parser to handle different formats
    const increases = this.parseAbilityScoreIncrease(raceData.abilityScoreIncrease);
    
    // Apply the increases
    for (const increase of increases) {
      const currentScore = abilityScores[increase.ability] || 10;
      abilityScores[increase.ability] = currentScore + increase.increase;
    }

    return abilityScores;
  }

  // Get racial traits for a race
  public static async getRacialTraits(race: string): Promise<RacialTrait[]> {
    const raceData = await fetch(`/api/races/${encodeURIComponent(race)}`).then(res => res.json());
    if (!raceData) {
      console.warn(`Race ${race} not found`);
      return [];
    }

    // Handle traits - they should now be properly parsed by Prisma
    let traitNames: string[];
    if (Array.isArray(raceData.traits)) {
      traitNames = raceData.traits;
    } else if (typeof raceData.traits === 'string') {
      // Handle case where traits are stored as JSON string
      try {
        traitNames = JSON.parse(raceData.traits);
      } catch {
        console.warn(`Invalid traits format for race ${race}:`, raceData.traits);
        return [];
      }
    } else {
      console.warn(`Unexpected traits format for race ${race}:`, raceData.traits);
      return [];
    }

    if (!Array.isArray(traitNames)) {
      console.warn(`Traits for race ${race} is not an array:`, traitNames);
      return [];
    }

    const traits: RacialTrait[] = [];
    
    for (const traitName of traitNames) {
      try {
        const traitData = await fetch(`/api/racial-traits/${encodeURIComponent(traitName)}`).then(res => res.json());
        if (traitData) {
          traits.push({
            name: traitData.name,
            description: traitData.description,
            type: this.getTraitType(traitName),
            effect: this.getTraitEffect(traitName)
          });
        } else {
          // Fallback to hardcoded data if API doesn't return data
          traits.push({
            name: traitName,
            description: this.getTraitDescription(traitName),
            type: this.getTraitType(traitName),
            effect: this.getTraitEffect(traitName)
          });
        }
      } catch (error) {
        console.warn(`Failed to fetch trait ${traitName} for race ${race}:`, error);
        // Fallback to hardcoded data
        traits.push({
          name: traitName,
          description: this.getTraitDescription(traitName),
          type: this.getTraitType(traitName),
          effect: this.getTraitEffect(traitName)
        });
      }
    }

    return traits;
  }

  // Helper to get trait descriptions
  private static getTraitDescription(trait: string): string {
    const descriptions: Record<string, string> = {
      'Darkvision': 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light.',
      'Dwarven Resilience': 'You have advantage on saving throws against poison, and you have resistance against poison damage.',
      'Fey Ancestry': 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
      'Gnome Cunning': 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
      'Hellish Resistance': 'You have resistance to fire damage.',
      'Lucky': 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
      'Stone\'s Endurance': 'When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total.',
      'Trance': 'You don\'t need to sleep. Instead, you meditate deeply, remaining semiconscious, for 4 hours a day.',
      'Two Skills': 'You gain proficiency in two skills of your choice.',
      'Extra Language': 'You can speak, read, and write one extra language of your choice.',
      'Extra Skill': 'You gain proficiency in one skill of your choice.',
      'Draconic Ancestry': 'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type.',
      'Breath Weapon': 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.',
      'Damage Resistance': 'You have resistance to the damage type associated with your draconic ancestry.',
      'Celestial Resistance': 'You have resistance to necrotic and radiant damage.',
      'Healing Hands': 'As an action, you can touch a creature and cause it to regain a number of hit points equal to your level.',
      'Natural Athlete': 'You have proficiency in the Athletics skill.',
      'Powerful Build': 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
      'Feline Agility': 'Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn.',
      'Cat\'s Claws': 'You have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes.',
      'Cat\'s Talents': 'You have proficiency in the Perception and Stealth skills.'
    };

    return descriptions[trait] || `${trait} - A racial trait specific to your race.`;
  }

  // Helper to determine if a trait is active or passive
  private static getTraitType(trait: string): 'passive' | 'active' {
    const activeTraits = [
      'Breath Weapon',
      'Healing Hands',
      'Feline Agility',
      'Cat\'s Claws'
    ];

    return activeTraits.includes(trait) ? 'active' : 'passive';
  }

  // Helper to get trait effects
  private static getTraitEffect(trait: string): RacialTrait['effect'] {
    const effects: Record<string, RacialTrait['effect']> = {
      'Darkvision': { type: 'darkvision', value: 60 },
      'Dwarven Resilience': { type: 'resistance', value: 'poison' },
      'Hellish Resistance': { type: 'resistance', value: 'fire' },
      'Celestial Resistance': { type: 'resistance', value: 'necrotic,radiant' },
      'Natural Athlete': { type: 'skill', value: 'Athletics' },
      'Cat\'s Talents': { type: 'skill', value: 'Perception,Stealth' }
    };

    return effects[trait] || { type: 'other' };
  }
} 