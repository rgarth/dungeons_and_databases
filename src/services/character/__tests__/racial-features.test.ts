import { RacialFeaturesService } from '../racial-features';

// Mock fetch
global.fetch = jest.fn();

describe('RacialFeaturesService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRacialTraits', () => {
    it('should fetch and return racial traits for a race', async () => {
      const mockTraits = [
        {
          id: '1',
          name: 'Darkvision',
          description: 'You can see in dim light within 60 feet of you as if it were bright light.',
          type: 'passive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Fey Ancestry',
          description: 'You have advantage on saving throws against being charmed.',
          type: 'passive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTraits),
      });

      const traits = await RacialFeaturesService.getRacialTraits('Elf');

      expect(fetch).toHaveBeenCalledWith('/api/traits?race=Elf');
      expect(traits).toHaveLength(2);
      expect(traits[0].name).toBe('Darkvision');
      expect(traits[1].name).toBe('Fey Ancestry');
    });

    it('should handle race not found', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const traits = await RacialFeaturesService.getRacialTraits('UnknownRace');

      expect(traits).toEqual([]);
    });

    it('should handle traits as JSON string', async () => {
      const mockTraits = [
        {
          id: '1',
          name: 'Darkvision',
          description: 'You can see in dim light within 60 feet of you.',
          type: 'passive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Keen Senses',
          description: 'You have proficiency in the Perception skill.',
          type: 'passive',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockTraits),
      });

      const traits = await RacialFeaturesService.getRacialTraits('Elf');

      expect(traits).toHaveLength(2);
      expect(traits[0].name).toBe('Darkvision');
      expect(traits[1].name).toBe('Keen Senses');
    });

    it('should handle fetch errors gracefully', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const traits = await RacialFeaturesService.getRacialTraits('Elf');

      expect(traits).toEqual([]);
    });

    it('should handle invalid JSON in traits', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      const traits = await RacialFeaturesService.getRacialTraits('Elf');

      expect(traits).toEqual([]);
    });
  });

  describe('getTraitDescription', () => {
    it('should return trait description for known traits', () => {
      const description = RacialFeaturesService.getTraitDescription('Darkvision');
      expect(description).toBe('You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.');
    });

    it('should return default description for unknown traits', () => {
      const description = RacialFeaturesService.getTraitDescription('UnknownTrait');
      expect(description).toBe('A racial trait that provides special abilities or bonuses.');
    });
  });

  describe('getTraitType', () => {
    it('should return correct type for known traits', () => {
      const type = RacialFeaturesService.getTraitType('Breath Weapon');
      expect(type).toBe('active');
    });

    it('should return passive as default type', () => {
      const type = RacialFeaturesService.getTraitType('UnknownTrait');
      expect(type).toBe('passive');
    });
  });
}); 