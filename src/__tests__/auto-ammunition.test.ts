import { describe, it, expect } from '@jest/globals';

interface MockWeapon {
  id: string;
  name: string;
  type: string;
  category: string;
  damage: string;
  damageType: string;
  properties: string;
  weight: number;
  cost: string;
  description: string;
  ammunitionTypeId: number | null;
  suggestedQuantity: number | null;
}

interface MockAmmunitionSuggestion {
  id: number;
  name: string;
  description: string;
}

describe('Auto-Ammunition Flow', () => {
  const mockWeapons: MockWeapon[] = [
    {
      id: '1',
      name: 'Shortbow',
      type: 'Simple',
      category: 'Ranged',
      damage: '1d6',
      damageType: 'Piercing',
      properties: 'Ammunition (range 80/320), Two-Handed',
      weight: 2,
      cost: '25 gp',
      description: 'A small bow designed for quick shots.',
      ammunitionTypeId: 87,
      suggestedQuantity: 20
    },
    {
      id: '2',
      name: 'Longbow',
      type: 'Martial',
      category: 'Ranged',
      damage: '1d8',
      damageType: 'Piercing',
      properties: 'Ammunition (range 150/600), Heavy, Two-Handed',
      weight: 2,
      cost: '50 gp',
      description: 'A large bow designed for long-range shots.',
      ammunitionTypeId: 87,
      suggestedQuantity: 20
    },
    {
      id: '3',
      name: 'Light Crossbow',
      type: 'Simple',
      category: 'Ranged',
      damage: '1d8',
      damageType: 'Piercing',
      properties: 'Ammunition (range 80/320), Loading, Two-Handed',
      weight: 5,
      cost: '25 gp',
      description: 'A small crossbow that fires bolts.',
      ammunitionTypeId: 88,
      suggestedQuantity: 20
    },
    {
      id: '4',
      name: 'Longsword',
      type: 'Martial',
      category: 'Melee',
      damage: '1d8',
      damageType: 'Slashing',
      properties: 'Versatile (1d10)',
      weight: 3,
      cost: '15 gp',
      description: 'A versatile sword that can be wielded with one or two hands.',
      ammunitionTypeId: null,
      suggestedQuantity: null
    }
  ];

  const mockAmmunitionSuggestions: MockAmmunitionSuggestion[] = [
    {
      id: 87,
      name: 'Arrows',
      description: 'Standard arrows for bows and crossbows'
    },
    {
      id: 88,
      name: 'Crossbow Bolts',
      description: 'Heavy bolts designed for crossbows'
    }
  ];

  describe('Weapon Ammunition Detection', () => {
    it('should detect weapons that need ammunition', () => {
      const shortbow = mockWeapons.find(w => w.name === 'Shortbow');
      const longsword = mockWeapons.find(w => w.name === 'Longsword');

      expect(shortbow?.ammunitionTypeId).toBe(87);
      expect(shortbow?.suggestedQuantity).toBe(20);
      expect(longsword?.ammunitionTypeId).toBeNull();
      expect(longsword?.suggestedQuantity).toBeNull();
    });

    it('should identify ammunition properties correctly', () => {
      const shortbow = mockWeapons.find(w => w.name === 'Shortbow');
      const properties = shortbow?.properties.split(', ').filter(Boolean) || [];
      
      const hasAmmunitionProperty = properties.some(prop => prop.startsWith('Ammunition'));
      expect(hasAmmunitionProperty).toBe(true);
    });

    it('should map ammunition types correctly', () => {
      const shortbow = mockWeapons.find(w => w.name === 'Shortbow');
      const lightCrossbow = mockWeapons.find(w => w.name === 'Light Crossbow');

      const arrows = mockAmmunitionSuggestions.find(a => a.id === shortbow?.ammunitionTypeId);
      const bolts = mockAmmunitionSuggestions.find(a => a.id === lightCrossbow?.ammunitionTypeId);

      expect(arrows?.name).toBe('Arrows');
      expect(bolts?.name).toBe('Crossbow Bolts');
    });
  });

  describe('Auto-Ammunition Generation', () => {
    it('should generate ammunition for ranged weapons', async () => {
      const selectedWeapons = [
        { weapon: mockWeapons[0], quantity: 1 }, // Shortbow
        { weapon: mockWeapons[2], quantity: 1 }  // Light Crossbow
      ];

      const autoAmmunition = [];
      const processedAmmoTypes = new Set();

      for (const weaponSelection of selectedWeapons) {
        const weapon = weaponSelection.weapon;
        const properties = weapon.properties.split(', ').filter(Boolean);
        const hasAmmunitionProperty = properties.some(prop => prop.startsWith('Ammunition'));

        if (hasAmmunitionProperty && weapon.ammunitionTypeId && weapon.suggestedQuantity) {
          if (!processedAmmoTypes.has(weapon.ammunitionTypeId)) {
            processedAmmoTypes.add(weapon.ammunitionTypeId);
            
            const ammoData = mockAmmunitionSuggestions.find(a => a.id === weapon.ammunitionTypeId);
            if (ammoData) {
              autoAmmunition.push({
                name: ammoData.name,
                quantity: weapon.suggestedQuantity,
                compatibleWeapons: [weapon.name],
                weight: 0.05,
                cost: '5 cp each'
              });
            }
          }
        }
      }

      expect(autoAmmunition).toHaveLength(2);
      expect(autoAmmunition[0]).toEqual({
        name: 'Arrows',
        quantity: 20,
        compatibleWeapons: ['Shortbow'],
        weight: 0.05,
        cost: '5 cp each'
      });
      expect(autoAmmunition[1]).toEqual({
        name: 'Crossbow Bolts',
        quantity: 20,
        compatibleWeapons: ['Light Crossbow'],
        weight: 0.05,
        cost: '5 cp each'
      });
    });

    it('should not generate ammunition for melee weapons', async () => {
      const selectedWeapons = [
        { weapon: mockWeapons[3], quantity: 1 } // Longsword
      ];

      const autoAmmunition = [];
      const processedAmmoTypes = new Set();

      for (const weaponSelection of selectedWeapons) {
        const weapon = weaponSelection.weapon;
        const properties = weapon.properties.split(', ').filter(Boolean);
        const hasAmmunitionProperty = properties.some(prop => prop.startsWith('Ammunition'));

        if (hasAmmunitionProperty && weapon.ammunitionTypeId && weapon.suggestedQuantity) {
          if (!processedAmmoTypes.has(weapon.ammunitionTypeId)) {
            processedAmmoTypes.add(weapon.ammunitionTypeId);
            
            const ammoData = mockAmmunitionSuggestions.find(a => a.id === weapon.ammunitionTypeId);
            if (ammoData) {
              autoAmmunition.push({
                name: ammoData.name,
                quantity: weapon.suggestedQuantity,
                compatibleWeapons: [weapon.name],
                weight: 0.05,
                cost: '5 cp each'
              });
            }
          }
        }
      }

      expect(autoAmmunition).toHaveLength(0);
    });

    it('should deduplicate ammunition for multiple weapons of same type', async () => {
      const selectedWeapons = [
        { weapon: mockWeapons[0], quantity: 1 }, // Shortbow
        { weapon: mockWeapons[1], quantity: 1 }  // Longbow (also uses arrows)
      ];

      const autoAmmunition = [];
      const processedAmmoTypes = new Set();

      for (const weaponSelection of selectedWeapons) {
        const weapon = weaponSelection.weapon;
        const properties = weapon.properties.split(', ').filter(Boolean);
        const hasAmmunitionProperty = properties.some(prop => prop.startsWith('Ammunition'));

        if (hasAmmunitionProperty && weapon.ammunitionTypeId && weapon.suggestedQuantity) {
          if (!processedAmmoTypes.has(weapon.ammunitionTypeId)) {
            processedAmmoTypes.add(weapon.ammunitionTypeId);
            
            const ammoData = mockAmmunitionSuggestions.find(a => a.id === weapon.ammunitionTypeId);
            if (ammoData) {
              autoAmmunition.push({
                name: ammoData.name,
                quantity: weapon.suggestedQuantity,
                compatibleWeapons: [weapon.name],
                weight: 0.05,
                cost: '5 cp each'
              });
            }
          }
        }
      }

      // Should only have one arrow entry, not two
      expect(autoAmmunition).toHaveLength(1);
      expect(autoAmmunition[0].name).toBe('Arrows');
      expect(autoAmmunition[0].compatibleWeapons).toContain('Shortbow');
    });
  });

  describe('Weapon Data Source Consistency', () => {
    it('should verify weapons have ammunitionTypeId field', () => {
      // All weapons should have the database structure
      mockWeapons.forEach((weapon: MockWeapon) => {
        if (weapon.properties.includes('Ammunition')) {
          expect(weapon).toHaveProperty('ammunitionTypeId');
          expect(weapon).toHaveProperty('suggestedQuantity');
        }
      });
    });

    it('should verify ammunition type mapping', () => {
      const shortbow = mockWeapons.find(w => w.name === 'Shortbow');
      const lightCrossbow = mockWeapons.find(w => w.name === 'Light Crossbow');

      expect(shortbow?.ammunitionTypeId).toBe(87);
      expect(lightCrossbow?.ammunitionTypeId).toBe(88);

      const arrows = mockAmmunitionSuggestions.find(a => a.id === 87);
      const bolts = mockAmmunitionSuggestions.find(a => a.id === 88);

      expect(arrows?.name).toBe('Arrows');
      expect(bolts?.name).toBe('Crossbow Bolts');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing ammunition data gracefully', async () => {
      const weaponWithoutAmmo = {
        ...mockWeapons[0],
        ammunitionTypeId: null,
        suggestedQuantity: null
      };

      const selectedWeapons = [{ weapon: weaponWithoutAmmo, quantity: 1 }];
      const autoAmmunition = [];

      for (const weaponSelection of selectedWeapons) {
        const weapon = weaponSelection.weapon;
        const properties = weapon.properties.split(', ').filter(Boolean);
        const hasAmmunitionProperty = properties.some(prop => prop.startsWith('Ammunition'));

        if (hasAmmunitionProperty && weapon.ammunitionTypeId && weapon.suggestedQuantity) {
          // This should not execute for weaponWithoutAmmo
          autoAmmunition.push({ name: 'test', quantity: 1 });
        }
      }

      expect(autoAmmunition).toHaveLength(0);
    });

    it('should handle invalid ammunition type IDs', async () => {
      const weaponWithInvalidAmmo = {
        ...mockWeapons[0],
        ammunitionTypeId: 999 // Invalid ID
      };

      const selectedWeapons = [{ weapon: weaponWithInvalidAmmo, quantity: 1 }];
      const autoAmmunition = [];

      for (const weaponSelection of selectedWeapons) {
        const weapon = weaponSelection.weapon;
        const properties = weapon.properties.split(', ').filter(Boolean);
        const hasAmmunitionProperty = properties.some(prop => prop.startsWith('Ammunition'));

        if (hasAmmunitionProperty && weapon.ammunitionTypeId && weapon.suggestedQuantity) {
          const ammoData = mockAmmunitionSuggestions.find(a => a.id === weapon.ammunitionTypeId);
          if (ammoData) {
            autoAmmunition.push({
              name: ammoData.name,
              quantity: weapon.suggestedQuantity,
              compatibleWeapons: [weapon.name],
              weight: 0.05,
              cost: '5 cp each'
            });
          }
        }
      }

      expect(autoAmmunition).toHaveLength(0);
    });
  });

  describe('Integration with Character Creation', () => {
    it('should integrate with character creation flow', () => {
      const characterData = {
        name: 'Test Fighter',
        race: 'Human',
        class: 'Fighter',
        selectedWeapons: [
          { weapon: mockWeapons[0], quantity: 1 }, // Shortbow
          { weapon: mockWeapons[3], quantity: 1 }  // Longsword
        ],
        selectedArmor: [],
        ammunition: [] // Will be auto-populated
      };

      // Simulate auto-ammunition generation
      const autoAmmunition = [];
      const processedAmmoTypes = new Set();

      for (const weaponSelection of characterData.selectedWeapons) {
        const weapon = weaponSelection.weapon;
        const properties = weapon.properties.split(', ').filter(Boolean);
        const hasAmmunitionProperty = properties.some(prop => prop.startsWith('Ammunition'));

        if (hasAmmunitionProperty && weapon.ammunitionTypeId && weapon.suggestedQuantity) {
          if (!processedAmmoTypes.has(weapon.ammunitionTypeId)) {
            processedAmmoTypes.add(weapon.ammunitionTypeId);
            
            const ammoData = mockAmmunitionSuggestions.find(a => a.id === weapon.ammunitionTypeId);
            if (ammoData) {
              autoAmmunition.push({
                name: ammoData.name,
                quantity: weapon.suggestedQuantity,
                compatibleWeapons: [weapon.name],
                weight: 0.05,
                cost: '5 cp each'
              });
            }
          }
        }
      }

      // Verify the character has the expected ammunition
      expect(autoAmmunition).toHaveLength(1);
      expect(autoAmmunition[0].name).toBe('Arrows');
      expect(autoAmmunition[0].quantity).toBe(20);
    });
  });
}); 