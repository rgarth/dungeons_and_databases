import { DndDataService } from '../dnd-data-service';

describe('DndDataService', () => {
  let service: DndDataService;

  beforeEach(() => {
    service = DndDataService.getInstance();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = DndDataService.getInstance();
      const instance2 = DndDataService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Races Data', () => {
    it('should return all races', () => {
      const races = service.getRaces();
      expect(races).toBeDefined();
      expect(Array.isArray(races)).toBe(true);
      expect(races.length).toBeGreaterThan(0);
    });

    it('should return race by name', () => {
      const human = service.getRaceByName('Human');
      expect(human).toBeDefined();
      expect(human?.name).toBe('Human');
      expect(human?.size).toBe('Medium');
      expect(human?.speed).toBe(30);
    });

    it('should return null for non-existent race', () => {
      const nonExistent = service.getRaceByName('NonExistentRace');
      expect(nonExistent).toBeNull();
    });

    it('should have valid race data structure', () => {
      const races = service.getRaces();
      races.forEach(race => {
        expect(race).toHaveProperty('name');
        expect(race).toHaveProperty('size');
        expect(race).toHaveProperty('speed');
        expect(race).toHaveProperty('traits');
        expect(race).toHaveProperty('abilityScoreIncrease');
        expect(race).toHaveProperty('languages');
        expect(typeof race.name).toBe('string');
        expect(typeof race.size).toBe('string');
        expect(typeof race.speed).toBe('number');
        expect(Array.isArray(race.traits)).toBe(true);
      });
    });
  });

  describe('Subraces Data', () => {
    it('should return all subraces', () => {
      const subraces = service.getSubraces();
      expect(subraces).toBeDefined();
      expect(Array.isArray(subraces)).toBe(true);
      expect(subraces.length).toBeGreaterThan(0);
    });

    it('should return subraces by race', () => {
      const elfSubraces = service.getSubracesByRace('Elf');
      expect(elfSubraces).toBeDefined();
      expect(Array.isArray(elfSubraces)).toBe(true);
      expect(elfSubraces.length).toBeGreaterThan(0);
      elfSubraces.forEach(subrace => {
        expect(subrace.raceName).toBe('Elf');
      });
    });

    it('should return base race as subrace for races without meaningful subraces', () => {
      const humanSubraces = service.getSubracesByRace('Human');
      expect(humanSubraces).toBeDefined();
      expect(Array.isArray(humanSubraces)).toBe(true);
      expect(humanSubraces.length).toBe(1);
      expect(humanSubraces[0].name).toBe('Human');
      expect(humanSubraces[0].raceName).toBe('Human');
    });

    it('should have valid subrace data structure', () => {
      const subraces = service.getSubraces();
      subraces.forEach(subrace => {
        expect(subrace).toHaveProperty('name');
        expect(subrace).toHaveProperty('raceName');
        expect(subrace).toHaveProperty('description');
        expect(subrace).toHaveProperty('abilityScoreIncrease');
        expect(subrace).toHaveProperty('traits');
        expect(typeof subrace.name).toBe('string');
        expect(typeof subrace.raceName).toBe('string');
        expect(typeof subrace.description).toBe('string');
        expect(typeof subrace.abilityScoreIncrease).toBe('string');
        expect(Array.isArray(subrace.traits)).toBe(true);
      });
    });
  });

  describe('Classes Data', () => {
    it('should return all classes', () => {
      const classes = service.getClasses();
      expect(classes).toBeDefined();
      expect(Array.isArray(classes)).toBe(true);
      expect(classes.length).toBeGreaterThan(0);
    });

    it('should return class by name', () => {
      const fighter = service.getClassByName('Fighter');
      expect(fighter).toBeDefined();
      expect(fighter?.name).toBe('Fighter');
      expect(fighter?.hitDie).toBe(10);
      expect(fighter?.primaryAbility).toBe('Strength or Dexterity');
    });

    it('should return null for non-existent class', () => {
      const nonExistent = service.getClassByName('NonExistentClass');
      expect(nonExistent).toBeNull();
    });

    it('should have valid class data structure', () => {
      const classes = service.getClasses();
      classes.forEach(cls => {
        expect(cls).toHaveProperty('name');
        expect(cls).toHaveProperty('description');
        expect(cls).toHaveProperty('hitDie');
        expect(cls).toHaveProperty('primaryAbility');
        expect(cls).toHaveProperty('savingThrows');
        expect(cls).toHaveProperty('skillChoices');
        expect(typeof cls.name).toBe('string');
        expect(typeof cls.description).toBe('string');
        expect(typeof cls.hitDie).toBe('number');
        expect(typeof cls.primaryAbility).toBe('string');
        expect(Array.isArray(cls.savingThrows)).toBe(true);
        expect(cls.skillChoices).toHaveProperty('available');
        expect(cls.skillChoices).toHaveProperty('choose');
      });
    });
  });

  describe('Backgrounds Data', () => {
    it('should return all backgrounds', () => {
      const backgrounds = service.getBackgrounds();
      expect(backgrounds).toBeDefined();
      expect(Array.isArray(backgrounds)).toBe(true);
      expect(backgrounds.length).toBeGreaterThan(0);
    });

    it('should return background by name', () => {
      const acolyte = service.getBackgroundByName('Acolyte');
      expect(acolyte).toBeDefined();
      expect(acolyte?.name).toBe('Acolyte');
      expect(acolyte?.description).toContain('You have spent your life');
    });

    it('should return null for non-existent background', () => {
      const nonExistent = service.getBackgroundByName('NonExistentBackground');
      expect(nonExistent).toBeNull();
    });
  });

  describe('Weapons Data', () => {
    it('should return all weapons', () => {
      const weapons = service.getWeapons();
      expect(weapons).toBeDefined();
      expect(Array.isArray(weapons)).toBe(true);
      expect(weapons.length).toBeGreaterThan(0);
    });

    it('should return weapon by name', () => {
      const longsword = service.getWeaponByName('Longsword');
      expect(longsword).toBeDefined();
      expect(longsword?.name).toBe('Longsword');
      expect(longsword?.type).toBe('Martial');
      expect(longsword?.category).toBe('Melee');
      expect(longsword?.damage).toBe('1d8');
    });

    it('should return weapons by type', () => {
      const simpleWeapons = service.getWeaponsByType('Simple');
      expect(simpleWeapons).toBeDefined();
      expect(Array.isArray(simpleWeapons)).toBe(true);
      simpleWeapons.forEach(weapon => {
        expect(weapon.type).toBe('Simple');
      });
    });

    it('should return weapons by category', () => {
      const meleeWeapons = service.getWeaponsByCategory('Melee');
      expect(meleeWeapons).toBeDefined();
      expect(Array.isArray(meleeWeapons)).toBe(true);
      meleeWeapons.forEach(weapon => {
        expect(weapon.category).toBe('Melee');
      });
    });
  });

  describe('Armor Data', () => {
    it('should return all armor', () => {
      const armor = service.getArmor();
      expect(armor).toBeDefined();
      expect(Array.isArray(armor)).toBe(true);
      expect(armor.length).toBeGreaterThan(0);
    });

    it('should return armor by name', () => {
      const chainMail = service.getArmorByName('Chain Mail');
      expect(chainMail).toBeDefined();
      expect(chainMail?.name).toBe('Chain Mail');
      expect(chainMail?.type).toBe('Heavy');
      expect(chainMail?.baseAC).toBe(16);
    });

    it('should return armor by type', () => {
      const lightArmor = service.getArmorByType('Light');
      expect(lightArmor).toBeDefined();
      expect(Array.isArray(lightArmor)).toBe(true);
      lightArmor.forEach(armor => {
        expect(armor.type).toBe('Light');
      });
    });
  });

  describe('Spells Data', () => {
    it('should return all spells', () => {
      const spells = service.getSpells();
      expect(spells).toBeDefined();
      expect(Array.isArray(spells)).toBe(true);
      expect(spells.length).toBeGreaterThan(0);
    });

    it('should return spell by name', () => {
      const fireball = service.getSpellByName('Fireball');
      expect(fireball).toBeDefined();
      expect(fireball?.name).toBe('Fireball');
      expect(fireball?.level).toBe(3);
      expect(fireball?.school).toBe('Evocation');
    });

    it('should return spells by level', () => {
      const cantrips = service.getSpellsByLevel(0);
      expect(cantrips).toBeDefined();
      expect(Array.isArray(cantrips)).toBe(true);
      cantrips.forEach(spell => {
        expect(spell.level).toBe(0);
      });
    });

    it('should return spells by class', () => {
      const wizardSpells = service.getSpellsByClass('Wizard');
      expect(wizardSpells).toBeDefined();
      expect(Array.isArray(wizardSpells)).toBe(true);
      wizardSpells.forEach(spell => {
        const classes = JSON.parse(spell.classes);
        expect(classes).toContain('Wizard');
      });
    });
  });

  describe('Traits Data', () => {
    it('should return all traits', () => {
      const traits = service.getTraits();
      expect(traits).toBeDefined();
      expect(Array.isArray(traits)).toBe(true);
      expect(traits.length).toBeGreaterThan(0);
    });

    it('should return traits by race', () => {
      const humanTraits = service.getTraitsByRace('Human');
      expect(humanTraits).toBeDefined();
      expect(Array.isArray(humanTraits)).toBe(true);
    });

    it('should return traits by subrace', () => {
      const drowTraits = service.getTraitsBySubrace('Drow');
      expect(drowTraits).toBeDefined();
      expect(Array.isArray(drowTraits)).toBe(true);
    });

    it('should return empty array for non-existent race/subrace', () => {
      const nonExistentRaceTraits = service.getTraitsByRace('NonExistentRace');
      const nonExistentSubraceTraits = service.getTraitsBySubrace('NonExistentSubrace');
      expect(nonExistentRaceTraits).toEqual([]);
      expect(nonExistentSubraceTraits).toEqual([]);
    });
  });

  describe('Equipment Packs Data', () => {
    it('should return all equipment packs', () => {
      const packs = service.getEquipmentPacks();
      expect(packs).toBeDefined();
      expect(Array.isArray(packs)).toBe(true);
      expect(packs.length).toBeGreaterThan(0);
    });

    it('should return equipment pack by name', () => {
      const explorersPack = service.getEquipmentPackByName('Explorer\'s Pack');
      expect(explorersPack).toBeDefined();
      expect(explorersPack?.name).toBe('Explorer\'s Pack');
      expect(explorersPack?.items).toBeDefined();
      expect(Array.isArray(explorersPack?.items)).toBe(true);
    });
  });

  describe('Magical Items Data', () => {
    it('should return all magical items', () => {
      const items = service.getMagicalItems();
      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });

    it('should return magical item by name', () => {
      const potionOfHealing = service.getMagicalItemByName('Potion of Healing');
      expect(potionOfHealing).toBeDefined();
      expect(potionOfHealing?.name).toBe('Potion of Healing');
      expect(potionOfHealing?.type).toBe('Potion');
      expect(potionOfHealing?.rarity).toBe('Common');
    });

    it('should return magical items by rarity', () => {
      const commonItems = service.getMagicalItemsByRarity('Common');
      expect(commonItems).toBeDefined();
      expect(Array.isArray(commonItems)).toBe(true);
      commonItems.forEach(item => {
        expect(item.rarity).toBe('Common');
      });
    });
  });

  describe('Suggestions Data', () => {
    it('should return weapon suggestions by class', () => {
      const fighterSuggestions = service.getWeaponSuggestionsByClass('Fighter');
      expect(fighterSuggestions).toBeDefined();
      expect(Array.isArray(fighterSuggestions)).toBe(true);
      fighterSuggestions.forEach(suggestion => {
        expect(suggestion).toHaveProperty('weaponName');
        expect(suggestion).toHaveProperty('quantity');
        expect(suggestion).toHaveProperty('reason');
      });
    });

    it('should return armor suggestions by class', () => {
      const fighterArmorSuggestions = service.getArmorSuggestionsByClass('Fighter');
      expect(fighterArmorSuggestions).toBeDefined();
      expect(Array.isArray(fighterArmorSuggestions)).toBe(true);
    });

    it('should return spell suggestions by class', () => {
      const wizardSpellSuggestions = service.getSpellSuggestionsByClass('Wizard');
      expect(wizardSpellSuggestions).toBeDefined();
      expect(Array.isArray(wizardSpellSuggestions)).toBe(true);
      wizardSpellSuggestions.forEach(suggestion => {
        expect(suggestion).toHaveProperty('spellName');
        expect(suggestion).toHaveProperty('level');
        expect(suggestion).toHaveProperty('reason');
      });
    });

    it('should return ammunition suggestions', () => {
      const ammunitionSuggestions = service.getAmmunitionSuggestions();
      expect(ammunitionSuggestions).toBeDefined();
      expect(Array.isArray(ammunitionSuggestions)).toBe(true);
      ammunitionSuggestions.forEach(suggestion => {
        expect(suggestion).toHaveProperty('name');
        expect(suggestion).toHaveProperty('description');
      });
    });
  });

  describe('Class Proficiencies', () => {
    it('should return class proficiencies without armor', () => {
      const fighterProficiencies = service.getClassProficiencies('Fighter');
      expect(fighterProficiencies).toBeDefined();
      expect(fighterProficiencies?.weapons).toBeDefined();
      expect(fighterProficiencies?.savingThrows).toBeDefined();
      expect(fighterProficiencies?.weapons.simple).toBe(true);
      expect(fighterProficiencies?.weapons.martial).toBe(true);
      expect(fighterProficiencies?.savingThrows).toContain('Strength');
      expect(fighterProficiencies?.savingThrows).toContain('Constitution');
    });

    it('should return class proficiencies with armor', () => {
      const fighterProficiencies = service.getClassProficiencies('Fighter', true);
      expect(fighterProficiencies).toBeDefined();
      expect(fighterProficiencies?.armor).toBeDefined();
      expect(Array.isArray(fighterProficiencies?.armor)).toBe(true);
      expect(fighterProficiencies?.armor).toContain('Light');
      expect(fighterProficiencies?.armor).toContain('Medium');
      expect(fighterProficiencies?.armor).toContain('Heavy');
      expect(fighterProficiencies?.armor).toContain('Shield');
    });

    it('should return null for non-existent class', () => {
      const nonExistent = service.getClassProficiencies('NonExistentClass');
      expect(nonExistent).toBeNull();
    });
  });

  describe('Search Methods', () => {
    it('should search weapons', () => {
      const swordResults = service.searchWeapons('sword');
      expect(swordResults).toBeDefined();
      expect(Array.isArray(swordResults)).toBe(true);
      if (swordResults.length > 0) {
        swordResults.forEach(weapon => {
          const searchableText = `${weapon.name} ${weapon.description}`.toLowerCase();
          expect(searchableText).toContain('sword');
        });
      }
    });

    it('should search armor', () => {
      const leatherResults = service.searchArmor('leather');
      expect(leatherResults).toBeDefined();
      expect(Array.isArray(leatherResults)).toBe(true);
      if (leatherResults.length > 0) {
        leatherResults.forEach(armor => {
          const searchableText = `${armor.name} ${armor.description}`.toLowerCase();
          expect(searchableText).toContain('leather');
        });
      }
    });

    it('should search equipment', () => {
      const packResults = service.searchEquipment('pack');
      expect(packResults).toBeDefined();
      expect(Array.isArray(packResults)).toBe(true);
      packResults.forEach(item => {
        expect(item.name.toLowerCase()).toContain('pack');
      });
    });

    it('should search spells', () => {
      const fireResults = service.searchSpells('fire');
      expect(fireResults).toBeDefined();
      expect(Array.isArray(fireResults)).toBe(true);
      if (fireResults.length > 0) {
        fireResults.forEach(spell => {
          const searchableText = `${spell.name} ${spell.description}`.toLowerCase();
          expect(searchableText).toContain('fire');
        });
      }
    });
  });

  describe('Data Integrity', () => {
    it('should not have synthetic IDs in any data', () => {
      const races = service.getRaces();
      const classes = service.getClasses();
      const weapons = service.getWeapons();
      const armor = service.getArmor();

      // Check that no data has synthetic IDs
      races.forEach(race => {
        expect(race).not.toHaveProperty('id');
      });

      classes.forEach(cls => {
        expect(cls).not.toHaveProperty('id');
      });

      weapons.forEach(weapon => {
        expect(weapon).not.toHaveProperty('id');
      });

      armor.forEach(armorItem => {
        expect(armorItem).not.toHaveProperty('id');
      });
    });

    it('should have consistent data structures', () => {
      const races = service.getRaces();
      const classes = service.getClasses();
      const weapons = service.getWeapons();

      // All races should have the same structure
      races.forEach(race => {
        expect(Object.keys(race)).toEqual(
          expect.arrayContaining(['name', 'size', 'speed', 'traits', 'abilityScoreIncrease', 'languages'])
        );
      });

      // All classes should have the same structure
      classes.forEach(cls => {
        expect(Object.keys(cls)).toEqual(
          expect.arrayContaining(['name', 'description', 'hitDie', 'primaryAbility', 'savingThrows', 'skillChoices'])
        );
      });

      // All weapons should have the same structure
      weapons.forEach(weapon => {
        expect(Object.keys(weapon)).toEqual(
          expect.arrayContaining(['name', 'type', 'category', 'damage', 'damageType', 'properties', 'weight', 'cost'])
        );
      });
    });
  });
}); 