import { CharacterCreationService } from '../character/creation';
import { Weapon, Armor } from '@/lib/dnd/equipment';

// Mock fetch globally
global.fetch = jest.fn();

// Helper function to set up all required API mocks for database integration tests
function setupApiMocks(characterClass: string, race: string, background: string) {
  // 1. RacialFeaturesService.applyRacialAbilityScores - single race endpoint (object)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      name: race,
      abilityScoreIncrease: race === 'Human' ? 'All +1' : 'Dexterity +2',
      description: `${race} description`,
      equipment: []
    })
  });

  // 2. RacialFeaturesService.getRacialTraits - single race endpoint (object)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      name: race,
      abilityScoreIncrease: race === 'Human' ? 'All +1' : 'Dexterity +2',
      description: `${race} description`,
      equipment: [],
      traits: []
    })
  });

  // 3. CharacterCreationService - classes list endpoint (array)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ([
      {
        name: characterClass,
        hitDie: characterClass === 'Fighter' ? 10 : 6
      }
    ])
  });

  // 4. getEquipmentPacksFromDatabase - equipment packs (array)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
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
  });

  // 5. CharacterCreationService - races list endpoint (array)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ([
      {
        name: race,
        equipment: []
      }
    ])
  });

  // 6. CharacterCreationService - backgrounds list endpoint (array, first call)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
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
  });

  // 7. CharacterCreationService - backgrounds list endpoint (array, second call for skills)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
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
  });

  // 8. CharacterCreationService - single class endpoint (object, for gold formula)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      name: characterClass,
      startingGoldFormula: characterClass === 'Fighter' ? '5d4*10' : '4d4*10',
      hitDie: characterClass === 'Fighter' ? 10 : 6
    })
  });

  // 9. CharacterCreationService - backgrounds list endpoint (array, third call for gold formula)
  (global.fetch as jest.Mock).mockResolvedValueOnce({
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
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name', 'Test Fighter');
      expect(result).toHaveProperty('race', 'Human');
      expect(result).toHaveProperty('class', 'Fighter');
      expect(result).toHaveProperty('background', 'Noble');
      expect(result).toHaveProperty('alignment', 'Lawful Good');
      expect(result).toHaveProperty('gender', 'Male');
      expect(result).toHaveProperty('level', 1);
      expect(result).toHaveProperty('experience', 0);
      expect(result).toHaveProperty('strength', 15);
      expect(result).toHaveProperty('dexterity', 14);
      expect(result).toHaveProperty('constitution', 13);
      expect(result).toHaveProperty('intelligence', 12);
      expect(result).toHaveProperty('wisdom', 10);
      expect(result).toHaveProperty('charisma', 8);
      expect(result).toHaveProperty('hitPoints', 12); // Fighter with 13 CON
      expect(result).toHaveProperty('maxHitPoints', 12);
      expect(result).toHaveProperty('goldPieces');
      expect(result).toHaveProperty('inventory');
      expect(result).toHaveProperty('weapons');
      expect(result).toHaveProperty('armor');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });

    it('should handle equipment pack selection correctly', async () => {
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
      expect(result.goldPieces).toBe(10);
      expect(result.goldRollDetails).toBeUndefined();
    });

    it('should handle weapon and armor selections correctly', async () => {
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

      // Verify ammunition is in inventory
      expect(result.inventory).toContainEqual({
        name: 'Crossbow Bolt',
        quantity: 20
      });
    });

    it('should handle spellcasting characters correctly', async () => {
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
      // Mock all API calls to fail
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

      // Mock race API response for the second call
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'Human',
          abilityScoreIncrease: 'All +1',
          description: 'Humans are the most adaptable and ambitious people among the common races.'
        })
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
      // Mock API responses with missing data
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            name: 'Fighter'
            // No startingGoldFormula field
          })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              startingGold: 25,
              startingGoldFormula: null
            }
          ])
        })
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
          json: async () => ([
            {
              name: 'Fighter',
              hitDie: 10
            }
          ])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Human',
              equipment: []
            }
          ])
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              name: 'Noble',
              equipment: [],
              skillProficiencies: ['History', 'Persuasion']
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
      expect(result.goldRollDetails).toBeUndefined();
    });
  });
}); 