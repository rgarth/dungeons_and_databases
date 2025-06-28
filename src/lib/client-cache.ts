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
        languages
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
        languages: languages.length
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