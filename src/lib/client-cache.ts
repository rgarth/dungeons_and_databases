// Client-side cache for D&D data
// This cache is built on first load and persists during the session

interface CacheData {
  races: any[];
  classes: any[];
  backgrounds: any[];
  alignments: any[];
  equipmentPacks: any[];
  armor: any[];
  weapons: any[];
  magicalItems: any[];
  treasures: any[];
  subraces: any[];
  languages: any[];
  weaponSuggestions: Record<string, any[]>; // Class name -> weapon suggestions
  armorSuggestions: Record<string, any[]>; // Class name -> armor suggestions
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
        languages
      ] = await Promise.all([
        fetch('/api/races').then(res => res.json()),
        fetch('/api/classes').then(res => res.json()),
        fetch('/api/backgrounds').then(res => res.json()),
        fetch('/api/alignments').then(res => res.json()),
        fetch('/api/equipment-packs').then(res => res.json()),
        fetch('/api/armor').then(res => res.json()),
        fetch('/api/weapons').then(res => res.json()),
        fetch('/api/magical-items').then(res => res.json()),
        fetch('/api/treasures').then(res => res.json()),
        fetch('/api/subraces').then(res => res.json()),
        fetch('/api/languages').then(res => res.json())
      ]);

      // Pre-load weapon and armor suggestions for all classes
      const weaponSuggestions: Record<string, any[]> = {};
      const armorSuggestions: Record<string, any[]> = {};
      
      const classNames = classes.map((c: any) => c.name);
      
      // Fetch all weapon and armor suggestions in parallel
      const [weaponSuggestionPromises, armorSuggestionPromises] = await Promise.all([
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
        )
      ]);

      // Build the suggestions objects
      weaponSuggestionPromises.forEach(({ className, data }) => {
        weaponSuggestions[className] = data;
      });
      
      armorSuggestionPromises.forEach(({ className, data }) => {
        armorSuggestions[className] = data;
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
        armorSuggestions
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
        weaponSuggestions: Object.keys(weaponSuggestions).length,
        armorSuggestions: Object.keys(armorSuggestions).length
      });
    } catch (error) {
      console.error('❌ Failed to initialize client cache:', error);
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
    return allSubraces.filter((subrace: any) => 
      subrace.race?.name?.toLowerCase() === raceName.toLowerCase()
    );
  }

  getLanguages() {
    return this.cache.languages || [];
  }

  isInitialized() {
    return this.initialized;
  }
}

// Export singleton instance
export const clientCache = new ClientCache(); 