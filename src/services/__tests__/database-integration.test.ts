import { CharacterCreationService } from '../character/creation';
import { Weapon, Armor } from '@/lib/dnd/equipment';

// Mock fetch globally
global.fetch = jest.fn();

// Helper function to set up all required API mocks for database integration tests
function setupApiMocks(characterClass: string, race: string, background: string) {
  // Clear any existing mocks
  jest.clearAllMocks();
  
  // Set up URL-based mocking
  (global.fetch as jest.Mock).mockImplementation(async (url: string) => {
    // Single race endpoint
    if (url.includes(`/api/races/${encodeURIComponent(race)}`)) {
      return {
        ok: true,
        json: async () => ({
          name: race,
          abilityScoreIncrease: race === 'Human' ? 'All +1' : 'Dexterity +2',
          description: `${race} description`,
          equipment: []
        })
      };
    }
    
    // Classes list endpoint
    if (url === '/api/classes') {
      return {
        ok: true,
        json: async () => ([
          {
            name: characterClass,
            hitDie: characterClass === 'Fighter' ? 10 : 6
          }
        ])
      };
    }
    
    // Single class endpoint (for starting gold formula)
    if (url.includes(`/api/classes/${encodeURIComponent(characterClass)}`)) {
      return {
        ok: true,
        json: async () => ({
          name: characterClass,
          startingGoldFormula: characterClass === 'Fighter' ? '5d4*10' : '4d4*10',
          hitDie: characterClass === 'Fighter' ? 10 : 6
        })
      };
    }
    
    // Equipment packs endpoint
    if (url === '/api/equipment-packs') {
      return {
        ok: true,
        json: async () => ([
          {
            id: 0,
            name: 'Explorer\'s Pack',
            items: [
              { name: 'Backpack', quantity: 1 },
              { name: 'Bedroll', quantity: 1 },
              { name: 'Rations', quantity: 10 }
            ]
          }
        ])
      };
    }
    
    // Races list endpoint
    if (url === '/api/races') {
      return {
        ok: true,
        json: async () => ([
          {
            name: race,
            equipment: []
          }
        ])
      };
    }
    
    // Backgrounds list endpoint
    if (url === '/api/backgrounds') {
      return {
        ok: true,
        json: async () => ([
          {
            name: background,
            startingGold: background === 'Noble' ? 25 : 10,
            startingGoldFormula: null,
            equipment: [],
            skillProficiencies: ['History', 'Persuasion']
          }
        ])
      };
    }
    
    // Default fallback
    return {
      ok: false,
      status: 404,
      json: async () => ({ error: 'Not found' })
    };
  });
}

describe('Database Integration Tests', () => {
  let service: CharacterCreationService;

  beforeEach(() => {
    service = CharacterCreationService.getInstance();
    jest.clearAllMocks();
  });

  describe('Character Creation Database Flow', () => {
    it('should create character with proper database structure', async () => {
      jest.clearAllMocks();
      setupApiMocks('Fighter', 'Human', 'Noble');

      const characterData = {
        name: 'Test Fighter',
        race: 'Human',
        class: 'Fighter',
        background: 'Noble',
        alignment: 'Lawful Good',
        gender: 'Male',
        statMethod: 'standard' as const,
        abilityScores: {
          strength: 15,
          dexterity: 14,
          constitution: 13,
          intelligence: 12,
          wisdom: 10,
          charisma: 8
        },
        selectedEquipmentPack: -1,
        selectedWeapons: [
          {
            weapon: {
              name: 'Longsword',
              type: 'Martial' as const,
              category: 'Melee' as const,
              damage: '1d8',
              damageType: 'slashing',
              properties: ['versatile'],
              weight: 3,
              cost: '15 gp'
            } as Weapon,
            quantity: 1
          }
        ],
        selectedArmor: [
          {
            name: 'Chain Mail',
            type: 'Heavy' as const,
            baseAC: 16,
            strengthRequirement: 13,
            stealthDisadvantage: true,
            weight: 55,
            cost: '75 gp',
            description: 'Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows.'
          } as Armor
        ],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      // Verify the character has all required fields for database storage
      expect(result).toHaveProperty('name', 'Test Fighter');
      expect(result).toHaveProperty('race', 'Human');
      expect(result).toHaveProperty('class', 'Fighter');
      expect(result).toHaveProperty('background', 'Noble');
      expect(result).toHaveProperty('alignment', 'Lawful Good');
      expect(result).toHaveProperty('level', 1);
      expect(result).toHaveProperty('strength', 15);
      expect(result).toHaveProperty('dexterity', 14);
      expect(result).toHaveProperty('constitution', 13);
      expect(result).toHaveProperty('intelligence', 12);
      expect(result).toHaveProperty('wisdom', 10);
      expect(result).toHaveProperty('charisma', 8);
      expect(result).toHaveProperty('hitPoints', 11); // Fighter with 13 CON
      expect(result).toHaveProperty('maxHitPoints', 11);
      expect(result).toHaveProperty('goldPieces');
      expect(result).toHaveProperty('inventory');
      expect(result).toHaveProperty('weapons');
      expect(result).toHaveProperty('armor');
    });

    it('should handle equipment pack selection correctly', async () => {
      jest.clearAllMocks();
      setupApiMocks('Fighter', 'Human', 'Folk Hero');

      const equipmentPackItems = [
        { name: 'Backpack', quantity: 1 },
        { name: 'Bedroll', quantity: 1 },
        { name: 'Rations', quantity: 10 },
        { name: 'Tinderbox', quantity: 1 },
        { name: 'Torches', quantity: 10 }
      ];

      const characterData = {
        name: 'Test Character',
        race: 'Human',
        class: 'Fighter',
        background: 'Folk Hero',
        alignment: 'Good',
        gender: 'Male',
        statMethod: 'standard' as const,
        abilityScores: {
          strength: 15,
          dexterity: 14,
          constitution: 13,
          intelligence: 12,
          wisdom: 10,
          charisma: 8
        },
        selectedEquipmentPack: 0, // Equipment pack selected
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData, equipmentPackItems);

      // Verify equipment pack items are included in inventory
      expect(result.inventory).toHaveLength(5);
      expect(result.inventory).toContainEqual({ name: 'Backpack', quantity: 1 });
      expect(result.inventory).toContainEqual({ name: 'Bedroll', quantity: 1 });
      expect(result.inventory).toContainEqual({ name: 'Rations', quantity: 10 });
      expect(result.inventory).toContainEqual({ name: 'Tinderbox', quantity: 1 });
      expect(result.inventory).toContainEqual({ name: 'Torches', quantity: 10 });

      // Verify starting gold is from background, not rolled
      expect(result.goldPieces).toBe(10); // Background starting gold when equipment pack is selected
      expect(result.goldRollDetails).toBeUndefined();
    });

    it('should handle weapon and armor selections correctly', async () => {
      jest.clearAllMocks();
      setupApiMocks('Fighter', 'Human', 'Noble');

      const characterData = {
        name: 'Test Character',
        race: 'Human',
        class: 'Fighter',
        background: 'Noble',
        alignment: 'Lawful Good',
        gender: 'Male',
        statMethod: 'standard' as const,
        abilityScores: {
          strength: 15,
          dexterity: 14,
          constitution: 13,
          intelligence: 12,
          wisdom: 10,
          charisma: 8
        },
        selectedEquipmentPack: 0,
        selectedWeapons: [
          {
            weapon: {
              name: 'Longsword',
              type: 'Martial' as const,
              category: 'Melee' as const,
              damage: '1d8',
              damageType: 'slashing',
              properties: ['versatile'],
              weight: 3,
              cost: '15 gp'
            } as Weapon,
            quantity: 1
          },
          {
            weapon: {
              name: 'Light Crossbow',
              type: 'Simple' as const,
              category: 'Ranged' as const,
              damage: '1d8',
              damageType: 'piercing',
              properties: ['ammunition', 'loading', 'two-handed'],
              weight: 5,
              cost: '25 gp'
            } as Weapon,
            quantity: 1
          }
        ],
        selectedArmor: [
          {
            name: 'Chain Mail',
            type: 'Heavy' as const,
            baseAC: 16,
            strengthRequirement: 13,
            stealthDisadvantage: true,
            weight: 55,
            cost: '75 gp',
            description: 'Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows.'
          } as Armor,
          {
            name: 'Shield',
            type: 'Shield' as const,
            baseAC: 2,
            strengthRequirement: null,
            stealthDisadvantage: false,
            weight: 6,
            cost: '10 gp',
            description: 'A shield made of wood or metal, carried in one hand.'
          } as Armor
        ],
        selectedAmmunition: [
          {
            name: 'Crossbow Bolt',
            quantity: 20,
            compatibleWeapons: ['Light Crossbow', 'Heavy Crossbow'],
            weight: 0.075,
            cost: '1 cp each'
          }
        ],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      // Verify weapons are properly stored
      expect(result.weapons).toHaveLength(2);
      expect(result.weapons[0]).toHaveProperty('name', 'Longsword');
      expect(result.weapons[0]).toHaveProperty('equipped', false);
      expect(result.weapons[1]).toHaveProperty('name', 'Light Crossbow');
      expect(result.weapons[1]).toHaveProperty('equipped', false);

      // Verify armor is properly stored
      expect(result.armor).toHaveLength(2);
      expect(result.armor[0]).toHaveProperty('name', 'Chain Mail');
      expect(result.armor[0]).toHaveProperty('equipped', false);
      expect(result.armor[1]).toHaveProperty('name', 'Shield');
      expect(result.armor[1]).toHaveProperty('equipped', false);

      // Verify ammunition is in ammunition field
      expect(result.ammunition).toContainEqual({
        name: 'Crossbow Bolt',
        quantity: 20,
        compatibleWeapons: ['Light Crossbow', 'Heavy Crossbow'],
        weight: 0.075,
        cost: '1 cp each'
      });
      // Also verify equipment pack items are included in inventory
      expect(result.inventory).toContainEqual({ name: 'Backpack', quantity: 1 });
      expect(result.inventory).toContainEqual({ name: 'Bedroll', quantity: 1 });
      expect(result.inventory).toContainEqual({ name: 'Rations', quantity: 10 });
    });

    it('should handle spellcasting characters correctly', async () => {
      jest.clearAllMocks();
      setupApiMocks('Wizard', 'Elf', 'Sage');

      const characterData = {
        name: 'Test Wizard',
        race: 'Elf',
        class: 'Wizard',
        background: 'Sage',
        alignment: 'Neutral',
        gender: 'Female',
        statMethod: 'standard' as const,
        abilityScores: {
          strength: 8,
          dexterity: 14,
          constitution: 12,
          intelligence: 16,
          wisdom: 10,
          charisma: 12
        },
        selectedEquipmentPack: 0,
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      // Verify spellcasting ability is set
      expect(result.spellcastingAbility).toBe('intelligence');
    });
  });

  describe('Error Handling', () => {
    it('should handle API failures gracefully', async () => {
      // Mock race API calls to succeed (needed for character creation)
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            name: 'Human',
            abilityScoreIncrease: 'All +1',
            description: 'Humans are the most adaptable and ambitious people among the common races.'
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            name: 'Human',
            abilityScoreIncrease: 'All +1',
            description: 'Humans are the most adaptable and ambitious people among the common races.',
            traits: []
          })
        })
        // Mock class API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Fighter',
              hitDie: 10
            }
          ])
        })
        // Mock equipment packs API to fail
        .mockRejectedValueOnce(new Error('API Error'))
        // Mock race equipment API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Human',
              equipment: []
            }
          ])
        })
        // Mock background equipment API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              equipment: [],
              skillProficiencies: ['History', 'Persuasion']
            }
          ])
        })
        // Mock background skills API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              equipment: [],
              skillProficiencies: ['History', 'Persuasion']
            }
          ])
        })
        // Mock class starting gold API to fail
        .mockRejectedValueOnce(new Error('API Error'))
        // Mock background starting gold API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              startingGold: 25,
              startingGoldFormula: null
            }
          ])
        });

      const characterData = {
        name: 'Test Character',
        race: 'Human',
        class: 'Fighter',
        background: 'Noble',
        alignment: 'Good',
        gender: 'Male',
        statMethod: 'standard' as const,
        abilityScores: {
          strength: 15,
          dexterity: 14,
          constitution: 13,
          intelligence: 12,
          wisdom: 10,
          charisma: 8
        },
        selectedEquipmentPack: -1,
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      // Should still create character with default values
      expect(result.name).toBe('Test Character');
      expect(result.goldPieces).toBe(0); // Default when API fails
      expect(result.inventory).toEqual([]);
    });

    it('should handle missing data gracefully', async () => {
      // Mock race API calls to succeed
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            name: 'Human',
            abilityScoreIncrease: 'All +1',
            description: 'Humans are the most adaptable and ambitious people among the common races.'
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            name: 'Human',
            abilityScoreIncrease: 'All +1',
            description: 'Humans are the most adaptable and ambitious people among the common races.',
            traits: []
          })
        })
        // Mock class API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Fighter',
              hitDie: 10
            }
          ])
        })
        // Mock equipment packs API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              id: 0,
              name: 'Explorer\'s Pack',
              items: []
            }
          ])
        })
        // Mock race equipment API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Human',
              equipment: []
            }
          ])
        })
        // Mock background equipment API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              equipment: [],
              skillProficiencies: ['History', 'Persuasion']
            }
          ])
        })
        // Mock background skills API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              equipment: [],
              skillProficiencies: ['History', 'Persuasion']
            }
          ])
        })
        // Mock class starting gold API with missing formula
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            name: 'Fighter'
            // No startingGoldFormula field
          })
        })
        // Mock background starting gold API to succeed
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              startingGold: 25,
              startingGoldFormula: null
            }
          ])
        });

      const characterData = {
        name: 'Test Character',
        race: 'Human',
        class: 'Fighter',
        background: 'Noble',
        alignment: 'Good',
        gender: 'Male',
        statMethod: 'standard' as const,
        abilityScores: {
          strength: 15,
          dexterity: 14,
          constitution: 13,
          intelligence: 12,
          wisdom: 10,
          charisma: 8
        },
        selectedEquipmentPack: -1,
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      // Should handle missing data gracefully
      expect(result.name).toBe('Test Character');
      expect(result.goldPieces).toBe(0); // No gold rolled when formula is missing
      expect(result.goldRollDetails).toMatch(/^Class: Fighter/);
    });
  });
}); 