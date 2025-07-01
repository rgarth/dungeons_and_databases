import { NextRequest } from 'next/server';
import { GET as getRaces } from '../races/route';
import { GET as getClasses } from '../classes/route';
import { GET as getBackgrounds } from '../backgrounds/route';
import { GET as getWeapons } from '../weapons/route';
import { GET as getArmor } from '../armor/route';
import { GET as getTraits } from '../traits/route';
import { GET as getSubraces } from '../subraces/route';
import { GET as getSpells } from '../spells/route';
import { GET as getLanguages } from '../languages/route';
import { GET as getEquipmentPacks } from '../equipment-packs/route';
import { GET as getTreasures } from '../treasures/route';
import { GET as getMagicalItems } from '../magical-items/route';
import { GET as getWeaponSuggestions } from '../weapon-suggestions/route';
import { GET as getArmorSuggestions } from '../armor-suggestions/route';
import { GET as getAmmunitionSuggestions } from '../ammunition-suggestions/route';
import { GET as getSpellSuggestions } from '../spell-suggestions/route';
import { GET as getClassProficiencies } from '../class-proficiencies/route';

// Mock NextRequest
const createMockRequest = (url: string): NextRequest => {
  return new NextRequest(url) as any;
};

describe('Static Data API Endpoints', () => {
  describe('Races Endpoint', () => {
    it('should return all races', async () => {
      const request = createMockRequest('http://localhost:3000/api/races');
      const response = await getRaces(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('size');
      expect(data[0]).toHaveProperty('speed');
    });

    it('should return specific race by name', async () => {
      const request = createMockRequest('http://localhost:3000/api/races/Human');
      const response = await getRaces(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.name).toBe('Human');
      expect(data.size).toBe('Medium');
      expect(data.speed).toBe(30);
    });
  });

  describe('Classes Endpoint', () => {
    it('should return all classes', async () => {
      const request = createMockRequest('http://localhost:3000/api/classes');
      const response = await getClasses(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('hitDie');
      expect(data[0]).toHaveProperty('primaryAbility');
    });

    it('should return specific class by name', async () => {
      const request = createMockRequest('http://localhost:3000/api/classes/Fighter');
      const response = await getClasses(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.name).toBe('Fighter');
      expect(data.hitDie).toBe(10);
      expect(data.primaryAbility).toBe('Strength or Dexterity');
    });
  });

  describe('Backgrounds Endpoint', () => {
    it('should return all backgrounds', async () => {
      const request = createMockRequest('http://localhost:3000/api/backgrounds');
      const response = await getBackgrounds(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('description');
    });
  });

  describe('Weapons Endpoint', () => {
    it('should return all weapons', async () => {
      const request = createMockRequest('http://localhost:3000/api/weapons');
      const response = await getWeapons(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('type');
      expect(data[0]).toHaveProperty('category');
      expect(data[0]).toHaveProperty('damage');
    });

    it('should filter weapons by type', async () => {
      const request = createMockRequest('http://localhost:3000/api/weapons?type=Simple');
      const response = await getWeapons(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(weapon => {
        expect(weapon.type).toBe('Simple');
      });
    });
  });

  describe('Armor Endpoint', () => {
    it('should return all armor', async () => {
      const request = createMockRequest('http://localhost:3000/api/armor');
      const response = await getArmor(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('type');
      expect(data[0]).toHaveProperty('baseAC');
    });

    it('should filter armor by type', async () => {
      const request = createMockRequest('http://localhost:3000/api/armor?type=Light');
      const response = await getArmor(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(armor => {
        expect(armor.type).toBe('Light');
      });
    });
  });

  describe('Traits Endpoint', () => {
    it('should return traits by race', async () => {
      const request = createMockRequest('http://localhost:3000/api/traits?race=Elf');
      const response = await getTraits(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(trait => {
        expect(trait).toHaveProperty('name');
        expect(trait).toHaveProperty('description');
        expect(trait).toHaveProperty('type');
      });
    });

    it('should return traits by subrace', async () => {
      const request = createMockRequest('http://localhost:3000/api/traits?subrace=Drow');
      const response = await getTraits(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe('Subraces Endpoint', () => {
    it('should return all subraces', async () => {
      const request = createMockRequest('http://localhost:3000/api/subraces');
      const response = await getSubraces(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('raceName');
    });

    it('should filter subraces by race', async () => {
      const request = createMockRequest('http://localhost:3000/api/subraces?race=Elf');
      const response = await getSubraces(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(subrace => {
        expect(subrace.raceName).toBe('Elf');
      });
    });
  });

  describe('Spells Endpoint', () => {
    it('should return all spells', async () => {
      const request = createMockRequest('http://localhost:3000/api/spells');
      const response = await getSpells(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('level');
      expect(data[0]).toHaveProperty('school');
    });

    it('should filter spells by class', async () => {
      const request = createMockRequest('http://localhost:3000/api/spells?className=Wizard');
      const response = await getSpells(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
    });

    it('should filter spells by level', async () => {
      const request = createMockRequest('http://localhost:3000/api/spells?level=0');
      const response = await getSpells(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(spell => {
        expect(spell.level).toBe(0);
      });
    });
  });

  describe('Languages Endpoint', () => {
    it('should return all languages', async () => {
      const request = createMockRequest('http://localhost:3000/api/languages');
      const response = await getLanguages(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('script');
    });
  });

  describe('Equipment Packs Endpoint', () => {
    it('should return all equipment packs', async () => {
      const request = createMockRequest('http://localhost:3000/api/equipment-packs');
      const response = await getEquipmentPacks(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('cost');
      expect(data[0]).toHaveProperty('items');
    });
  });

  describe('Treasures Endpoint', () => {
    it('should return all treasures', async () => {
      const request = createMockRequest('http://localhost:3000/api/treasures');
      const response = await getTreasures(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('type');
      expect(data[0]).toHaveProperty('value');
    });
  });

  describe('Magical Items Endpoint', () => {
    it('should return all magical items', async () => {
      const request = createMockRequest('http://localhost:3000/api/magical-items');
      const response = await getMagicalItems(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('type');
      expect(data[0]).toHaveProperty('rarity');
    });

    it('should filter magical items by rarity', async () => {
      const request = createMockRequest('http://localhost:3000/api/magical-items?rarity=Common');
      const response = await getMagicalItems(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(item => {
        expect(item.rarity).toBe('Common');
      });
    });
  });

  describe('Weapon Suggestions Endpoint', () => {
    it('should return weapon suggestions for a class', async () => {
      const request = createMockRequest('http://localhost:3000/api/weapon-suggestions?className=Fighter');
      const response = await getWeaponSuggestions(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(suggestion => {
        expect(suggestion).toHaveProperty('weaponName');
        expect(suggestion).toHaveProperty('quantity');
        expect(suggestion).toHaveProperty('reason');
      });
    });

    it('should return 400 for missing className parameter', async () => {
      const request = createMockRequest('http://localhost:3000/api/weapon-suggestions');
      const response = await getWeaponSuggestions(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('className parameter is required');
    });
  });

  describe('Armor Suggestions Endpoint', () => {
    it('should return armor suggestions for a class', async () => {
      const request = createMockRequest('http://localhost:3000/api/armor-suggestions?className=Fighter');
      const response = await getArmorSuggestions(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(suggestion => {
        expect(suggestion).toHaveProperty('armorName');
        expect(suggestion).toHaveProperty('reason');
      });
    });
  });

  describe('Ammunition Suggestions Endpoint', () => {
    it('should return all ammunition suggestions', async () => {
      const request = createMockRequest('http://localhost:3000/api/ammunition-suggestions');
      const response = await getAmmunitionSuggestions(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('description');
    });
  });

  describe('Spell Suggestions Endpoint', () => {
    it('should return spell suggestions for a class', async () => {
      const request = createMockRequest('http://localhost:3000/api/spell-suggestions?className=Wizard');
      const response = await getSpellSuggestions(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      data.forEach(suggestion => {
        expect(suggestion).toHaveProperty('spellName');
        expect(suggestion).toHaveProperty('level');
        expect(suggestion).toHaveProperty('reason');
      });
    });
  });

  describe('Class Proficiencies Endpoint', () => {
    it('should return class proficiencies without armor', async () => {
      const request = createMockRequest('http://localhost:3000/api/class-proficiencies?className=Fighter');
      const response = await getClassProficiencies(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('weapons');
      expect(data).toHaveProperty('savingThrows');
      expect(data.weapons).toHaveProperty('simple');
      expect(data.weapons).toHaveProperty('martial');
      expect(data.weapons).toHaveProperty('specific');
    });

    it('should return class proficiencies with armor', async () => {
      const request = createMockRequest('http://localhost:3000/api/class-proficiencies?className=Fighter&includeArmor=true');
      const response = await getClassProficiencies(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('armor');
      expect(Array.isArray(data.armor)).toBe(true);
    });

    it('should return 404 for non-existent class', async () => {
      const request = createMockRequest('http://localhost:3000/api/class-proficiencies?className=NonExistentClass');
      const response = await getClassProficiencies(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Class not found');
    });
  });
}); 