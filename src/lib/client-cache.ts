// Client-side cache for D&D data
// This cache is built on first load and persists during the session

import { Character } from '@/types/character';

interface Race {
  name: string;
  size: string;
  speed: number;
  traits: string[];
  abilityScoreIncrease: string;
  languages: string[];
  description: string;
}

interface Class {
  name: string;
  hitDie: number;
  startingGoldFormula?: string;
  description?: string;
}

interface Background {
  name: string;
  description: string;
  skillProficiencies: string[];
  startingGold?: number;
  languages?: string[];
}

interface Alignment {
  name: string;
  description?: string;
}

interface EquipmentPack {
  id: string;
  name: string;
  description: string;
  cost: string;
  items: Array<{
    name: string;
    quantity: number;
    type: string;
    cost: string;
    weight: number;
    description: string | null;
  }>;
}

interface Armor {
  name: string;
  type: string;
  armorClass: number;
  cost: string;
  weight: number;
  description?: string;
}

interface Weapon {
  name: string;
  type: string;
  category: string;
  damage: string;
  damageType: string;
  properties: string;
  cost: string;
  weight: number;
  description?: string;
  stackable?: boolean;
  ammunitionTypeId?: number | null;
  suggestedQuantity?: number | null;
}

interface MagicalItem {
  id: number;
  name: string;
  type: string;
  rarity: string;
  attunement: boolean;
  description?: string;
  magicalProperties?: string;
  cost?: number;
  weight?: number;
}

interface Treasure {
  name: string;
  type: string;
  description?: string;
}

interface Subrace {
  name: string;
  raceName: string;
  description: string;
  abilityScoreIncrease: string;
  traits: string[];
  languages?: string[] | null;
}

interface Language {
  name: string;
  description?: string;
}

interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string[];
  duration: string;
  description: string;
}

interface SpellLimits {
  maxCantrips: number;
  maxSpells: number;
  spellSlots: Record<number, number>;
}

interface Game {
  id: string;
  name: string;
  description?: string;
  gameNotes?: string;
  dmNotes?: string;
  dm: {
    id: string;
    name?: string;
    email: string;
  };
  participants: Array<{
    id: string;
    user: {
      id: string;
      name?: string;
      email: string;
    };
    characters: Array<{
      id: string;
      name: string;
      class: string;
      level: number;
      race: string;
      avatarUrl?: string;
    }>;
    isDm: boolean;
  }>;
  _count: {
    participants: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Monster {
  // Basic Information
  name: string;
  size: 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';
  type: string;
  subtype?: string;
  alignment: string;
  challengeRating: string;
  xp: number;
  
  // Ability Scores
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  
  // Combat Stats
  armorClass: number;
  armorType?: string;
  hitPoints: number;
  hitDice: string;
  speed: {
    walk?: number;
    fly?: number;
    swim?: number;
    climb?: number;
    burrow?: number;
    hover?: boolean;
  };
  
  // Proficiencies
  savingThrows?: {
    strength?: number;
    dexterity?: number;
    constitution?: number;
    intelligence?: number;
    wisdom?: number;
    charisma?: number;
  };
  skills?: Record<string, number>;
  damageResistances?: string[];
  damageImmunities?: string[];
  conditionImmunities?: string[];
  damageVulnerabilities?: string[];
  
  // Senses
  senses: {
    darkvision?: number;
    blindsight?: number;
    tremorsense?: number;
    truesight?: number;
    passivePerception: number;
  };
  
  // Languages
  languages: string[];
  telepathy?: number;
  
  // Challenge Rating Details
  proficiencyBonus: number;
  
  // Actions and Abilities
  traits?: Array<{
    name: string;
    description: string;
  }>;
  actions?: Array<{
    name: string;
    description: string;
    attackBonus?: number;
    damage?: {
      type: string;
      roll: string;
      average?: number;
    };
    reach?: string;
    target?: string;
    savingThrow?: {
      ability: string;
      dc: number;
      effect: string;
    };
    recharge?: string;
    legendary?: boolean;
    lair?: boolean;
  }>;
  legendaryActions?: Array<{
    name: string;
    cost?: number;
    description: string;
  }>;
  lairActions?: Array<{
    name: string;
    description: string;
    initiative?: number;
  }>;
  regionalEffects?: Array<{
    description: string;
  }>;
  
  // Spellcasting
  spellcasting?: {
    level: number;
    spellcastingAbility: string;
    spellSaveDc: number;
    spellAttackBonus: number;
    spells: {
      cantrips?: string[];
      1?: string[];
      2?: string[];
      3?: string[];
      4?: string[];
      5?: string[];
      6?: string[];
      7?: string[];
      8?: string[];
      9?: string[];
    };
  };
  
  // Description and Lore
  description?: string;
  background?: string;
  
  // Image Generation
  imagePrompt?: string;
  imageStyle?: string;
  
  // Metadata
  source: string;
  page?: number;
  tags?: string[];
}

interface CacheData {
  races: Race[];
  classes: Class[];
  backgrounds: Background[];
  alignments: Alignment[];
  equipmentPacks: EquipmentPack[];
  armor: Armor[];
  weapons: Weapon[];
  magicalItems: MagicalItem[];
  treasures: Treasure[];
  subraces: Subrace[];
  languages: Language[];
  weaponSuggestions: Record<string, Weapon[]>; // Class name -> weapon suggestions
  armorSuggestions: Record<string, Armor[]>; // Class name -> armor suggestions
  spells: Spell[]; // All spells
  spellLimits: Record<string, SpellLimits>; // Class name -> spell limits for level 1
  games: Game[]; // User's games
  monsters: Monster[]; // All monsters
  characters: Character[]; // User's characters
}

class ClientCache {
  private cache: Partial<CacheData> = {};
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;

  async initialize() {
    if (this.initialized) {
      return;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.loadAllData();
    await this.initializationPromise;
    this.initialized = true;
  }

  private async fetchWithTimeout(url: string, timeout = 10000): Promise<any> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error(`⏱️ Request timeout for ${url}`);
        throw new Error(`Request timeout for ${url}`);
      }
      throw error;
    }
  }

  private async loadAllData() {
    console.log('🔄 Initializing client cache...');
    
    try {
      const [
        races,
        classes,
        backgrounds,
        alignments,
        equipmentPacks,
        armor,
        weapons,
        magicalItems,
        treasures,
        subraces,
        languages,
        spells,
        games,
        characters
      ] = await Promise.all([
        this.fetchWithTimeout('/api/races'),
        this.fetchWithTimeout('/api/classes'),
        this.fetchWithTimeout('/api/backgrounds'),
        this.fetchWithTimeout('/api/alignments'),
        this.fetchWithTimeout('/api/equipment-packs'),
        this.fetchWithTimeout('/api/armor'),
        this.fetchWithTimeout('/api/weapons'),
        this.fetchWithTimeout('/api/magical-items'),
        this.fetchWithTimeout('/api/treasures'),
        this.fetchWithTimeout('/api/subraces'),
        this.fetchWithTimeout('/api/languages'),
        this.fetchWithTimeout('/api/spells'),
        this.fetchWithTimeout('/api/games', 5000).catch((err) => {
          console.warn('⚠️ Failed to fetch games (may not be authenticated):', err.message);
          return [];
        }),
        this.fetchWithTimeout('/api/characters', 5000).catch((err) => {
          console.warn('⚠️ Failed to fetch characters (may not be authenticated):', err.message);
          return [];
        })
      ]);

      console.log('🔄 Client cache - Characters loaded:', characters.length);
      console.log('🔄 Client cache - Character IDs:', characters.map((c: Character) => ({ id: c.id, name: c.name })));

      // Pre-load weapon and armor suggestions for all classes
      const weaponSuggestions: Record<string, Weapon[]> = {};
      const armorSuggestions: Record<string, Armor[]> = {};
      const spellLimits: Record<string, SpellLimits> = {};
      
      const classNames = classes.map((c: Class) => c.name);
      
      // Fetch all weapon, armor suggestions, and spell limits in parallel
      const [weaponSuggestionPromises, armorSuggestionPromises, spellLimitPromises] = await Promise.all([
        Promise.all(
          classNames.map(async (className: string) => {
            try {
              const response = await fetch(`/api/weapon-suggestions?className=${encodeURIComponent(className)}`);
              const data = await response.json();
              return { className, data };
            } catch (error) {
              console.warn(`Failed to fetch weapon suggestions for ${className}:`, error);
              return { className, data: [] };
            }
          })
        ),
        Promise.all(
          classNames.map(async (className: string) => {
            try {
              const response = await fetch(`/api/armor-suggestions?className=${encodeURIComponent(className)}`);
              const data = await response.json();
              return { className, data };
            } catch (error) {
              console.warn(`Failed to fetch armor suggestions for ${className}:`, error);
              return { className, data: [] };
            }
          })
        ),
        Promise.all(
          classNames.map(async (className: string) => {
            try {
              const response = await fetch(`/api/classes/${encodeURIComponent(className)}/spell-limits?level=1`);
              const data = await response.json();
              return { className, data };
            } catch (error) {
              console.warn(`Failed to fetch spell limits for ${className}:`, error);
              return { className, data: null };
            }
          })
        )
      ]);

      // Build the suggestions and limits objects
      weaponSuggestionPromises.forEach(({ className, data }) => {
        weaponSuggestions[className] = data;
      });
      
      armorSuggestionPromises.forEach(({ className, data }) => {
        armorSuggestions[className] = data;
      });

      spellLimitPromises.forEach(({ className, data }) => {
        spellLimits[className] = data;
      });

      this.cache = {
        races,
        classes,
        backgrounds,
        alignments,
        equipmentPacks,
        armor,
        weapons,
        magicalItems,
        treasures,
        subraces,
        languages,
        weaponSuggestions,
        armorSuggestions,
        spells,
        spellLimits,
        games,
        characters
      };

      console.log('✅ Client cache initialized:', {
        races: races.length,
        classes: classes.length,
        backgrounds: backgrounds.length,
        alignments: alignments.length,
        equipmentPacks: equipmentPacks.length,
        armor: armor.length,
        weapons: weapons.length,
        magicalItems: magicalItems.length,
        treasures: treasures.length,
        subraces: subraces.length,
        languages: languages.length,
        spells: spells.length,
        weaponSuggestions: Object.keys(weaponSuggestions).length,
        armorSuggestions: Object.keys(armorSuggestions).length,
        spellLimits: Object.keys(spellLimits).length,
        games: games.length,
        characters: characters.length
      });
    } catch (error) {
      console.error('❌ Failed to initialize client cache:', error);
      // Set initialized to true anyway to prevent infinite loading
      // The cache will have partial data which is better than nothing
      this.initialized = true;
      throw error;
    }
  }

  getRaces() {
    return this.cache.races || [];
  }

  getClasses() {
    return this.cache.classes || [];
  }

  getBackgrounds() {
    return this.cache.backgrounds || [];
  }

  getAlignments() {
    return this.cache.alignments || [];
  }

  getEquipmentPacks() {
    return this.cache.equipmentPacks || [];
  }

  getArmor() {
    return this.cache.armor || [];
  }

  getWeapons() {
    return this.cache.weapons || [];
  }

  getWeaponSuggestions(className: string) {
    return this.cache.weaponSuggestions?.[className] || [];
  }

  getArmorSuggestions(className: string) {
    return this.cache.armorSuggestions?.[className] || [];
  }

  getMagicalItems() {
    return this.cache.magicalItems || [];
  }

  getTreasures() {
    return this.cache.treasures || [];
  }

  getSubraces(raceName?: string) {
    const allSubraces = this.cache.subraces || [];
    if (!raceName) {
      return allSubraces;
    }
    return allSubraces.filter((subrace: Subrace) => 
      subrace.raceName?.toLowerCase() === raceName.toLowerCase()
    );
  }

  getLanguages() {
    return this.cache.languages || [];
  }

  getSpells() {
    return this.cache.spells || [];
  }

  getSpellLimits(className: string) {
    return this.cache.spellLimits?.[className] || null;
  }

  getGames() {
    return this.cache.games || [];
  }

  getCharacters() {
    return this.cache.characters || [];
  }

  addCharacter(character: Character) {
    if (!this.cache.characters) {
      this.cache.characters = [];
    }
    this.cache.characters.push(character);
  }

  removeCharacter(characterId: string) {
    if (this.cache.characters) {
      this.cache.characters = this.cache.characters.filter(char => char.id !== characterId);
    }
  }

  async getMonsters() {
    if (!this.cache.monsters) {
      try {
        console.log('🔄 Loading monsters on demand...');
        const response = await fetch('/api/monsters');
        const monstersData = await response.json();
        this.cache.monsters = monstersData;
        console.log(`✅ Loaded ${monstersData.length} monsters`);
      } catch (error) {
        console.error('❌ Failed to load monsters:', error);
        this.cache.monsters = [];
      }
    }
    return this.cache.monsters ?? [];
  }

  isInitialized() {
    return this.initialized;
  }
}

// Export singleton instance
export const clientCache = new ClientCache(); 