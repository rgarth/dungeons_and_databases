import { CharacterCreationService } from '../character/creation';

// Mock fetch globally
global.fetch = jest.fn();

// Helper function to set up all required API mocks
function setupApiMocks(characterClass: string, race: string, background: string, hasEquipmentPack: boolean = false) {
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
        startingGoldFormula: background === 'Custom Background' ? '2d4*10' : null,
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
        startingGoldFormula: background === 'Custom Background' ? '2d4*10' : null,
        equipment: [],
        skillProficiencies: ['History', 'Persuasion']
      }
    ])
  });

  if (hasEquipmentPack) {
    // 8. Equipment pack selected - backgrounds list endpoint (array, third call for starting gold)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        {
          name: background,
          startingGold: background === 'Noble' ? 25 : 10,
          startingGoldFormula: background === 'Custom Background' ? '2d4*10' : null,
          equipment: [],
          skillProficiencies: ['History', 'Persuasion']
        }
      ])
    });
  } else {
    // 8. No equipment pack - single class endpoint (object, for gold formula)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: characterClass,
        startingGoldFormula: characterClass === 'Fighter' ? '5d4*10' : '4d4*10',
        hitDie: characterClass === 'Fighter' ? 10 : 6
      })
    });

    // 9. No equipment pack - backgrounds list endpoint (array, third call for gold formula)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        {
          name: background,
          startingGold: background === 'Noble' ? 25 : 10,
          startingGoldFormula: background === 'Custom Background' ? '2d4*10' : null,
          equipment: [],
          skillProficiencies: ['History', 'Persuasion']
        }
      ])
    });
  }
}

describe('CharacterCreationService', () => {
  let service: CharacterCreationService;

  beforeEach(() => {
    service = CharacterCreationService.getInstance();
    jest.clearAllMocks();
  });

  describe('Starting Gold Formulas', () => {
    it('should roll class starting gold when no equipment pack is selected', async () => {
      setupApiMocks('Fighter', 'Human', 'Noble', false);

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
        selectedEquipmentPack: -1, // No pack selected
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      expect(result.goldPieces).toBeGreaterThan(0);
      expect(result.goldRollDetails).toContain('Fighter');
      expect(result.goldRollDetails).toContain('5d4×10');
      expect(result.goldRollDetails).toContain('gp');
    });

    it('should roll both class and background gold when both have formulas', async () => {
      setupApiMocks('Wizard', 'Elf', 'Custom Background', false);

      const characterData = {
        name: 'Test Wizard',
        race: 'Elf',
        class: 'Wizard',
        background: 'Custom Background',
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
        selectedEquipmentPack: -1,
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      expect(result.goldPieces).toBeGreaterThan(0);
      expect(result.goldRollDetails).toContain('Wizard');
      expect(result.goldRollDetails).toContain('Custom Background');
      expect(result.goldRollDetails).toContain('4d4×10');
      expect(result.goldRollDetails).toContain('2d4×10');
    });

    it('should use background starting gold when equipment pack is selected', async () => {
      setupApiMocks('Fighter', 'Human', 'Noble', true);

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
        selectedEquipmentPack: 0, // Equipment pack selected
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      expect(result.goldPieces).toBe(25); // Background starting gold
      expect(result.goldRollDetails).toBeUndefined(); // No roll details when pack is selected
    });
  });

  describe('Equipment Pack Handling', () => {
    it('should include equipment pack items when pack is selected', async () => {
      setupApiMocks('Fighter', 'Human', 'Folk Hero', true);

      const equipmentPackItems = [
        { name: 'Backpack', quantity: 1 },
        { name: 'Bedroll', quantity: 1 },
        { name: 'Rations', quantity: 10 }
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
        selectedEquipmentPack: 0,
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData, equipmentPackItems);

      expect(result.inventory).toHaveLength(3);
      expect(result.inventory).toContainEqual({ name: 'Backpack', quantity: 1 });
      expect(result.inventory).toContainEqual({ name: 'Bedroll', quantity: 1 });
      expect(result.inventory).toContainEqual({ name: 'Rations', quantity: 10 });
    });

    it('should not include equipment pack items when no pack is selected', async () => {
      setupApiMocks('Fighter', 'Human', 'Folk Hero', false);

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
        selectedEquipmentPack: -1, // No pack selected
        selectedWeapons: [],
        selectedArmor: [],
        selectedAmmunition: [],
        selectedSpells: []
      };

      const result = await service.createCharacter(characterData);

      expect(result.inventory).toHaveLength(0); // No equipment pack items
    });
  });

  describe('Ability Score Generation', () => {
    it('should generate standard array ability scores', () => {
      const { scores } = service.generateAbilityScores('standard');
      
      expect(scores.strength).toBeDefined();
      expect(scores.dexterity).toBeDefined();
      expect(scores.constitution).toBeDefined();
      expect(scores.intelligence).toBeDefined();
      expect(scores.wisdom).toBeDefined();
      expect(scores.charisma).toBeDefined();
      
      // Standard array should have specific values
      const values = Object.values(scores);
      expect(values).toContain(15);
      expect(values).toContain(14);
      expect(values).toContain(13);
      expect(values).toContain(12);
      expect(values).toContain(10);
      expect(values).toContain(8);
    });

    it('should generate rolled ability scores', () => {
      const { scores, randomArray } = service.generateAbilityScores('rolling-assign');
      
      expect(scores.strength).toBeDefined();
      expect(scores.dexterity).toBeDefined();
      expect(scores.constitution).toBeDefined();
      expect(scores.intelligence).toBeDefined();
      expect(scores.wisdom).toBeDefined();
      expect(scores.charisma).toBeDefined();
      
      expect(randomArray).toBeDefined();
      expect(randomArray).toHaveLength(6);
      
      // Each score should be between 3 and 18
      Object.values(scores).forEach(score => {
        expect(score).toBeGreaterThanOrEqual(3);
        expect(score).toBeLessThanOrEqual(18);
      });
    });

    it('should validate point buy scores', () => {
      const scores = {
        strength: 15,
        dexterity: 14,
        constitution: 13,
        intelligence: 12,
        wisdom: 10,
        charisma: 8
      };

      const validation = service.validatePointBuy(scores);
      expect(validation.isValid).toBe(true);
      expect(validation.remaining).toBe(0); // Standard array uses exactly 27 points
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      // Mock all API calls to fail
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

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
    });

    it('should handle missing starting gold formula', async () => {
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

      expect(result.goldPieces).toBe(0); // No gold rolled when formula is missing
      expect(result.goldRollDetails).toBeUndefined();
    });
  });
}); 