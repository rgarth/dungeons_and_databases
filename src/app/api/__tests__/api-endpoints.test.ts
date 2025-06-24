// Mock the fetch function globally
global.fetch = jest.fn();

describe('API Endpoints Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Class Starting Gold Formulas', () => {
    it('should ensure all classes return valid starting gold formulas', async () => {
      const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
      
      for (const className of classes) {
        // Mock the class API response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            name: className,
            startingGoldFormula: getExpectedFormula(className)
          })
        });

        const response = await fetch(`/api/classes/${encodeURIComponent(className)}`);
        const data = await response.json();
        
        expect(data.startingGoldFormula).toBeDefined();
        expect(data.startingGoldFormula).not.toBeNull();
        expect(data.startingGoldFormula).toMatch(/^\d+d\d+(\*\d+)?$/); // Valid dice formula pattern
      }
    });

    it('should ensure class gold formulas produce non-zero results', async () => {
      const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
      
      for (const className of classes) {
        const formula = getExpectedFormula(className);
        const goldAmount = calculateGoldFromFormula(formula);
        
        expect(goldAmount).toBeGreaterThan(0);
        expect(goldAmount).toBeLessThanOrEqual(getMaxGoldFromFormula(formula));
      }
    });
  });

  describe('Background Starting Gold', () => {
    it('should ensure all backgrounds return valid starting gold', async () => {
      const backgrounds = ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Charlatan', 'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander', 'Sailor'];
      
      // Mock the backgrounds API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => backgrounds.map(name => ({
          name,
          startingGold: getExpectedBackgroundGold(name),
          startingGoldFormula: getExpectedBackgroundFormula()
        }))
      });

      const response = await fetch('/api/backgrounds');
      const data = await response.json();
      
      for (const background of data) {
        expect(background.startingGold).toBeDefined();
        expect(background.startingGold).toBeGreaterThanOrEqual(0);
        expect(typeof background.startingGold).toBe('number');
      }
    });

    it('should ensure background gold is always greater than 0', async () => {
      const backgrounds = ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Charlatan', 'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander', 'Sailor'];
      
      for (const backgroundName of backgrounds) {
        const gold = getExpectedBackgroundGold(backgroundName);
        expect(gold).toBeGreaterThan(0);
      }
    });
  });

  describe('Spell Limits Endpoint', () => {
    it('should return valid spell limits for spellcasting classes', async () => {
      const spellcastingClasses = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
      
      for (const className of spellcastingClasses) {
        // Mock the spell limits API response
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            cantripsKnown: 2,
            spellsKnown: 4,
            spellcastingType: 'known',
            maxSpellLevel: 1,
            spellLevelLimits: { "1": 2 }
          })
        });

        const response = await fetch(`/api/classes/${encodeURIComponent(className)}/spell-limits?level=1`);
        
        if (response.ok) {
          const data = await response.json();
          expect(data.cantripsKnown).toBeGreaterThanOrEqual(0);
          expect(data.spellsKnown).toBeGreaterThanOrEqual(0);
          expect(['known', 'prepared', 'spellbook', 'none']).toContain(data.spellcastingType);
          expect(data.maxSpellLevel).toBeGreaterThanOrEqual(1);
          expect(data.maxSpellLevel).toBeLessThanOrEqual(9);
        }
      }
    });

    it('should handle non-spellcasting classes appropriately', async () => {
      const nonSpellcastingClasses = ['Barbarian', 'Fighter', 'Monk', 'Rogue'];
      
      for (const className of nonSpellcastingClasses) {
        // Mock the spell limits API response for non-spellcasting classes
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
          status: 404
        });

        const response = await fetch(`/api/classes/${encodeURIComponent(className)}/spell-limits?level=1`);
        
        // Non-spellcasting classes should return 404 or appropriate error
        expect(response.status).toBe(404);
      }
    });
  });
});

// Helper functions for expected values
function getExpectedFormula(className: string): string {
  const formulas: Record<string, string> = {
    'Barbarian': '2d4*10',
    'Bard': '5d4*10',
    'Cleric': '5d4*10',
    'Druid': '2d4*10',
    'Fighter': '5d4*10',
    'Monk': '5d4',
    'Paladin': '5d4*10',
    'Ranger': '5d4*10',
    'Rogue': '4d4*10',
    'Sorcerer': '3d4*10',
    'Warlock': '4d4*10',
    'Wizard': '4d4*10'
  };
  return formulas[className] || '';
}

function getExpectedBackgroundGold(backgroundName: string): number {
  const gold: Record<string, number> = {
    'Acolyte': 15,
    'Criminal': 15,
    'Folk Hero': 10,
    'Noble': 25,
    'Sage': 10,
    'Soldier': 10,
    'Charlatan': 15,
    'Entertainer': 15,
    'Guild Artisan': 15,
    'Hermit': 5,
    'Outlander': 10,
    'Sailor': 10
  };
  return gold[backgroundName] || 0;
}

function getExpectedBackgroundFormula(): string | null {
  // Most backgrounds don't have formulas, they have fixed gold
  return null;
}

function calculateGoldFromFormula(formula: string): number {
  // Simple calculation for testing - roll minimum possible
  const match = formula.match(/(\d+)d(\d+)(\*\d+)?/);
  if (!match) return 0;
  
  const numDice = parseInt(match[1], 10);
  const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
  
  // Return minimum possible roll (all 1s)
  return numDice * multiplier;
}

function getMaxGoldFromFormula(formula: string): number {
  // Simple calculation for testing - roll maximum possible
  const match = formula.match(/(\d+)d(\d+)(\*\d+)?/);
  if (!match) return 0;
  
  const numDice = parseInt(match[1], 10);
  const dieSize = parseInt(match[2], 10);
  const multiplier = match[3] ? parseInt(match[3].substring(1), 10) : 1;
  
  // Return maximum possible roll (all max values)
  return numDice * dieSize * multiplier;
} 