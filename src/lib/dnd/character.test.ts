import { 
  getDwarfAgeStage, 
  getDwarfAppearanceDescription, 
  getDwarfAgeDescription, 
  getDiverseDwarfAgeDescription,
  DWARF_AGE_STAGES,
  getHumanAgeStage,
  getHumanAppearanceDescription,
  getDiverseHumanAgeDescription,
  HUMAN_AGE_STAGES,
  getElfAgeStage,
  getElfAppearanceDescription,
  getDiverseElfAgeDescription,
  ELF_AGE_STAGES
} from './character';

describe('Dwarf Age System', () => {
  describe('getDwarfAgeStage', () => {
    it('should return child stage for ages 0-29', () => {
      expect(getDwarfAgeStage(0).stage).toBe('child');
      expect(getDwarfAgeStage(15).stage).toBe('child');
      expect(getDwarfAgeStage(29).stage).toBe('child');
    });

    it('should return adolescent stage for ages 30-39', () => {
      expect(getDwarfAgeStage(30).stage).toBe('adolescent');
      expect(getDwarfAgeStage(35).stage).toBe('adolescent');
      expect(getDwarfAgeStage(39).stage).toBe('adolescent');
    });

    it('should return young_adult stage for ages 40-79', () => {
      expect(getDwarfAgeStage(40).stage).toBe('young_adult');
      expect(getDwarfAgeStage(60).stage).toBe('young_adult');
      expect(getDwarfAgeStage(79).stage).toBe('young_adult');
    });

    it('should return adult stage for ages 80-149', () => {
      expect(getDwarfAgeStage(80).stage).toBe('adult');
      expect(getDwarfAgeStage(120).stage).toBe('adult');
      expect(getDwarfAgeStage(149).stage).toBe('adult');
    });

    it('should return middle_aged stage for ages 150-239', () => {
      expect(getDwarfAgeStage(150).stage).toBe('middle_aged');
      expect(getDwarfAgeStage(200).stage).toBe('middle_aged');
      expect(getDwarfAgeStage(239).stage).toBe('middle_aged');
    });

    it('should return elderly stage for ages 240-299', () => {
      expect(getDwarfAgeStage(240).stage).toBe('elderly');
      expect(getDwarfAgeStage(270).stage).toBe('elderly');
      expect(getDwarfAgeStage(299).stage).toBe('elderly');
    });

    it('should return venerable stage for ages 300+', () => {
      expect(getDwarfAgeStage(300).stage).toBe('venerable');
      expect(getDwarfAgeStage(350).stage).toBe('venerable');
      expect(getDwarfAgeStage(400).stage).toBe('venerable');
      expect(getDwarfAgeStage(500).stage).toBe('venerable');
    });
  });

  describe('getDwarfAppearanceDescription', () => {
    it('should provide age-appropriate descriptions for male dwarves', () => {
      const youngAdult = getDwarfAppearanceDescription(50, 'Male');
      expect(youngAdult).toContain('young adult dwarf');
      expect(youngAdult).toContain('well-groomed beard');

      const elderly = getDwarfAppearanceDescription(250, 'Male');
      expect(elderly).toContain('elderly dwarf');
      expect(elderly).toContain('long, flowing beard');
    });

    it('should provide age-appropriate descriptions for female dwarves', () => {
      const youngAdult = getDwarfAppearanceDescription(50, 'Female');
      expect(youngAdult).toContain('young adult dwarf');
      expect(youngAdult).toContain('short, well-groomed beard');

      const elderly = getDwarfAppearanceDescription(250, 'Female');
      expect(elderly).toContain('elderly dwarf');
      expect(elderly).toContain('longer beard');
    });

    it('should handle child dwarves appropriately', () => {
      const child = getDwarfAppearanceDescription(15, 'Male');
      expect(child).toContain('youthful dwarf features');
      expect(child).toContain('no beard');
    });
  });

  describe('getDwarfAgeDescription', () => {
    it('should provide maturity level and appearance description', () => {
      const description = getDwarfAgeDescription(100);
      expect(description).toContain('full adulthood');
      expect(description).toContain('mature adult dwarf');
    });
  });

  describe('getDiverseDwarfAgeDescription', () => {
    it('should provide diverse age representation for unspecified age', () => {
      const description = getDiverseDwarfAgeDescription();
      expect(description).toContain('diverse dwarf ages');
      expect(description).toContain('young adult to elderly');
      expect(description).toContain('varied beard styles');
    });

    it('should provide gender-specific beard descriptions', () => {
      const maleDescription = getDiverseDwarfAgeDescription('Male');
      const femaleDescription = getDiverseDwarfAgeDescription('Female');
      
      expect(maleDescription).toContain('thick, well-maintained beard');
      expect(femaleDescription).toContain('short, well-groomed beard');
    });
  });

  describe('DWARF_AGE_STAGES', () => {
    it('should have all required stages', () => {
      const stages = DWARF_AGE_STAGES.map(s => s.stage);
      expect(stages).toEqual([
        'child', 'adolescent', 'young_adult', 'adult', 
        'middle_aged', 'elderly', 'venerable'
      ]);
    });

    it('should have non-overlapping age ranges', () => {
      for (let i = 0; i < DWARF_AGE_STAGES.length - 1; i++) {
        const current = DWARF_AGE_STAGES[i];
        const next = DWARF_AGE_STAGES[i + 1];
        expect(current.ageRange[1] + 1).toBe(next.ageRange[0]);
      }
    });

    it('should start from 0 and cover all ages', () => {
      expect(DWARF_AGE_STAGES[0].ageRange[0]).toBe(0);
      expect(DWARF_AGE_STAGES[DWARF_AGE_STAGES.length - 1].ageRange[1]).toBeGreaterThan(350);
    });
  });
});

describe('Human Age System', () => {
  describe('getHumanAgeStage', () => {
    it('should return child stage for ages 0-12', () => {
      expect(getHumanAgeStage(0).stage).toBe('child');
      expect(getHumanAgeStage(6).stage).toBe('child');
      expect(getHumanAgeStage(12).stage).toBe('child');
    });

    it('should return adolescent stage for ages 13-17', () => {
      expect(getHumanAgeStage(13).stage).toBe('adolescent');
      expect(getHumanAgeStage(15).stage).toBe('adolescent');
      expect(getHumanAgeStage(17).stage).toBe('adolescent');
    });

    it('should return young_adult stage for ages 18-29', () => {
      expect(getHumanAgeStage(18).stage).toBe('young_adult');
      expect(getHumanAgeStage(25).stage).toBe('young_adult');
      expect(getHumanAgeStage(29).stage).toBe('young_adult');
    });

    it('should return adult stage for ages 30-49', () => {
      expect(getHumanAgeStage(30).stage).toBe('adult');
      expect(getHumanAgeStage(40).stage).toBe('adult');
      expect(getHumanAgeStage(49).stage).toBe('adult');
    });

    it('should return middle_aged stage for ages 50-64', () => {
      expect(getHumanAgeStage(50).stage).toBe('middle_aged');
      expect(getHumanAgeStage(60).stage).toBe('middle_aged');
      expect(getHumanAgeStage(64).stage).toBe('middle_aged');
    });

    it('should return elderly stage for ages 65-79', () => {
      expect(getHumanAgeStage(65).stage).toBe('elderly');
      expect(getHumanAgeStage(70).stage).toBe('elderly');
      expect(getHumanAgeStage(79).stage).toBe('elderly');
    });

    it('should return venerable stage for ages 80+', () => {
      expect(getHumanAgeStage(80).stage).toBe('venerable');
      expect(getHumanAgeStage(90).stage).toBe('venerable');
      expect(getHumanAgeStage(100).stage).toBe('venerable');
    });
  });

  describe('getHumanAppearanceDescription', () => {
    it('should provide age-appropriate descriptions', () => {
      const youngAdult = getHumanAppearanceDescription(25);
      expect(youngAdult).toContain('young adult human');
      expect(youngAdult).toContain('confident expression');

      const elderly = getHumanAppearanceDescription(70);
      expect(elderly).toContain('elderly human');
      expect(elderly).toContain('wise eyes');
    });
  });

  describe('getDiverseHumanAgeDescription', () => {
    it('should provide diverse age representation for unspecified age', () => {
      const description = getDiverseHumanAgeDescription();
      expect(description).toContain('diverse human ages');
      expect(description).toContain('young adult to elderly');
      expect(description).toContain('varied human features');
    });
  });

  describe('HUMAN_AGE_STAGES', () => {
    it('should have all required stages', () => {
      const stages = HUMAN_AGE_STAGES.map(s => s.stage);
      expect(stages).toEqual([
        'child', 'adolescent', 'young_adult', 'adult', 
        'middle_aged', 'elderly', 'venerable'
      ]);
    });

    it('should have non-overlapping age ranges', () => {
      for (let i = 0; i < HUMAN_AGE_STAGES.length - 1; i++) {
        const current = HUMAN_AGE_STAGES[i];
        const next = HUMAN_AGE_STAGES[i + 1];
        expect(current.ageRange[1] + 1).toBe(next.ageRange[0]);
      }
    });
  });
});

describe('Elf Age System', () => {
  describe('getElfAgeStage', () => {
    it('should return child stage for ages 0-99', () => {
      expect(getElfAgeStage(0).stage).toBe('child');
      expect(getElfAgeStage(50).stage).toBe('child');
      expect(getElfAgeStage(99).stage).toBe('child');
    });

    it('should return adolescent stage for ages 100-199', () => {
      expect(getElfAgeStage(100).stage).toBe('adolescent');
      expect(getElfAgeStage(150).stage).toBe('adolescent');
      expect(getElfAgeStage(199).stage).toBe('adolescent');
    });

    it('should return young_adult stage for ages 200-299', () => {
      expect(getElfAgeStage(200).stage).toBe('young_adult');
      expect(getElfAgeStage(250).stage).toBe('young_adult');
      expect(getElfAgeStage(299).stage).toBe('young_adult');
    });

    it('should return venerable stage for ages 750+', () => {
      expect(getElfAgeStage(750).stage).toBe('venerable');
      expect(getElfAgeStage(800).stage).toBe('venerable');
      expect(getElfAgeStage(1000).stage).toBe('venerable');
    });
  });

  describe('getElfAppearanceDescription', () => {
    it('should cap visual age at 40 for elves', () => {
      const youngElf = getElfAppearanceDescription(15);
      expect(youngElf).toContain('teenager');
      expect(youngElf).toContain('ageless elven beauty');

      const middleElf = getElfAppearanceDescription(50);
      expect(middleElf).toContain('young adult, thirties to early forties');
      expect(middleElf).toContain('ageless elven beauty');

      const oldElf = getElfAppearanceDescription(500);
      expect(oldElf).toContain('young adult, thirties to early forties');
      expect(oldElf).toContain('ageless elven beauty');
    });
  });

  describe('getDiverseElfAgeDescription', () => {
    it('should provide diverse age representation for unspecified age', () => {
      const description = getDiverseElfAgeDescription();
      expect(description).toContain('diverse elf ages');
      expect(description).toContain('young adult to elderly');
      expect(description).toContain('ageless elven beauty');
      expect(description).toContain('long pointed ears');
    });
  });

  describe('ELF_AGE_STAGES', () => {
    it('should have all required stages', () => {
      const stages = ELF_AGE_STAGES.map(s => s.stage);
      expect(stages).toEqual([
        'child', 'adolescent', 'young_adult', 'adult', 
        'middle_aged', 'elderly', 'venerable'
      ]);
    });

    it('should have non-overlapping age ranges', () => {
      for (let i = 0; i < ELF_AGE_STAGES.length - 1; i++) {
        const current = ELF_AGE_STAGES[i];
        const next = ELF_AGE_STAGES[i + 1];
        expect(current.ageRange[1] + 1).toBe(next.ageRange[0]);
      }
    });
  });
}); 