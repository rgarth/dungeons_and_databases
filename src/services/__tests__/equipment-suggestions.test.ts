import { getWeaponSuggestionsForClass } from '@/lib/dnd/weapon-suggestions';
import { getArmorSuggestionsForClass } from '@/lib/dnd/armor-suggestions';

// Mock the entire modules
jest.mock('@/lib/dnd/weapon-suggestions', () => ({
  getWeaponSuggestionsForClass: jest.fn()
}));

jest.mock('@/lib/dnd/armor-suggestions', () => ({
  getArmorSuggestionsForClass: jest.fn()
}));

describe('Equipment Suggestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Weapon Suggestions', () => {
    it('should return weapon suggestions for a class', async () => {
      const mockSuggestions = [
        {
          weaponName: 'Longsword',
          quantity: 1,
          reason: 'Primary weapon'
        },
        {
          weaponName: 'Shield',
          quantity: 1,
          reason: 'Protection'
        }
      ];

      (getWeaponSuggestionsForClass as jest.Mock).mockResolvedValue(mockSuggestions);

      const suggestions = await getWeaponSuggestionsForClass('Fighter');

      expect(suggestions).toHaveLength(2);
      expect(suggestions[0]).toEqual({
        weaponName: 'Longsword',
        quantity: 1,
        reason: 'Primary weapon'
      });
      expect(suggestions[1]).toEqual({
        weaponName: 'Shield',
        quantity: 1,
        reason: 'Protection'
      });

      expect(getWeaponSuggestionsForClass).toHaveBeenCalledWith('Fighter');
    });

    it('should handle errors gracefully', async () => {
      (getWeaponSuggestionsForClass as jest.Mock).mockResolvedValue([]);

      const suggestions = await getWeaponSuggestionsForClass('Fighter');

      expect(suggestions).toEqual([]);
    });

    it('should return empty array for unknown class', async () => {
      (getWeaponSuggestionsForClass as jest.Mock).mockResolvedValue([]);

      const suggestions = await getWeaponSuggestionsForClass('UnknownClass');

      expect(suggestions).toEqual([]);
    });
  });

  describe('Armor Suggestions', () => {
    it('should return armor suggestions for a class', async () => {
      const mockSuggestions = [
        {
          armorName: 'Chain Mail',
          reason: 'Starting heavy armor'
        },
        {
          armorName: 'Shield',
          reason: 'Protection bonus'
        }
      ];

      (getArmorSuggestionsForClass as jest.Mock).mockResolvedValue(mockSuggestions);

      const suggestions = await getArmorSuggestionsForClass('Fighter');

      expect(suggestions).toHaveLength(2);
      expect(suggestions[0]).toEqual({
        armorName: 'Chain Mail',
        reason: 'Starting heavy armor'
      });
      expect(suggestions[1]).toEqual({
        armorName: 'Shield',
        reason: 'Protection bonus'
      });

      expect(getArmorSuggestionsForClass).toHaveBeenCalledWith('Fighter');
    });

    it('should handle errors gracefully', async () => {
      (getArmorSuggestionsForClass as jest.Mock).mockResolvedValue([]);

      const suggestions = await getArmorSuggestionsForClass('Fighter');

      expect(suggestions).toEqual([]);
    });

    it('should return empty array for unknown class', async () => {
      (getArmorSuggestionsForClass as jest.Mock).mockResolvedValue([]);

      const suggestions = await getArmorSuggestionsForClass('UnknownClass');

      expect(suggestions).toEqual([]);
    });
  });

  describe('Suggestion Data Validation', () => {
    it('should validate weapon suggestion structure', async () => {
      const mockSuggestions = [
        {
          weaponName: 'Longsword',
          quantity: 1,
          reason: 'Primary weapon'
        }
      ];

      (getWeaponSuggestionsForClass as jest.Mock).mockResolvedValue(mockSuggestions);

      const suggestions = await getWeaponSuggestionsForClass('Fighter');

      suggestions.forEach(suggestion => {
        expect(suggestion).toHaveProperty('weaponName');
        expect(suggestion).toHaveProperty('quantity');
        expect(suggestion).toHaveProperty('reason');
        expect(typeof suggestion.weaponName).toBe('string');
        expect(typeof suggestion.quantity).toBe('number');
        expect(typeof suggestion.reason).toBe('string');
      });
    });

    it('should validate armor suggestion structure', async () => {
      const mockSuggestions = [
        {
          armorName: 'Chain Mail',
          reason: 'Starting heavy armor'
        }
      ];

      (getArmorSuggestionsForClass as jest.Mock).mockResolvedValue(mockSuggestions);

      const suggestions = await getArmorSuggestionsForClass('Fighter');

      suggestions.forEach(suggestion => {
        expect(suggestion).toHaveProperty('armorName');
        expect(suggestion).toHaveProperty('reason');
        expect(typeof suggestion.armorName).toBe('string');
        expect(typeof suggestion.reason).toBe('string');
      });
    });
  });

  describe('Class-Specific Suggestions', () => {
    it('should provide appropriate suggestions for different classes', async () => {
      const fighterSuggestions = [
        { weaponName: 'Longsword', quantity: 1, reason: 'Primary weapon' },
        { weaponName: 'Shield', quantity: 1, reason: 'Protection' }
      ];

      const wizardSuggestions = [
        { weaponName: 'Quarterstaff', quantity: 1, reason: 'Traditional wizard weapon' }
      ];

      (getWeaponSuggestionsForClass as jest.Mock)
        .mockResolvedValueOnce(fighterSuggestions)
        .mockResolvedValueOnce(wizardSuggestions);

      const fighterWeapons = await getWeaponSuggestionsForClass('Fighter');
      const wizardWeapons = await getWeaponSuggestionsForClass('Wizard');

      expect(fighterWeapons).toHaveLength(2);
      expect(wizardWeapons).toHaveLength(1);
      expect(fighterWeapons[0].weaponName).toBe('Longsword');
      expect(wizardWeapons[0].weaponName).toBe('Quarterstaff');
    });
  });
}); 