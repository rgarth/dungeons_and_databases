import { getRacialLanguages, getClassLanguages, getAutomaticLanguages } from '../languages';

describe('Languages', () => {
  describe('getRacialLanguages', () => {
    it('should return correct languages for each race', () => {
      expect(getRacialLanguages('Human')).toEqual(['Common']);
      expect(getRacialLanguages('Dwarf')).toEqual(['Common', 'Dwarvish']);
      expect(getRacialLanguages('Elf')).toEqual(['Common', 'Elvish']);
      expect(getRacialLanguages('Halfling')).toEqual(['Common', 'Halfling']);
      expect(getRacialLanguages('Dragonborn')).toEqual(['Common', 'Draconic']);
      expect(getRacialLanguages('Gnome')).toEqual(['Common', 'Gnomish']);
      expect(getRacialLanguages('Half-Elf')).toEqual(['Common', 'Elvish']);
      expect(getRacialLanguages('Half-Orc')).toEqual(['Common', 'Orc']);
      expect(getRacialLanguages('Tiefling')).toEqual(['Common', 'Infernal']);
    });

    it('should return Common for unknown races', () => {
      expect(getRacialLanguages('UnknownRace')).toEqual(['Common']);
    });
  });

  describe('getClassLanguages', () => {
    it('should return correct languages for classes with language features', () => {
      expect(getClassLanguages('Rogue')).toEqual(['Thieves\' Cant']);
      expect(getClassLanguages('Druid')).toEqual(['Druidic']);
    });

    it('should return empty array for classes without language features', () => {
      expect(getClassLanguages('Fighter')).toEqual([]);
      expect(getClassLanguages('Wizard')).toEqual([]);
      expect(getClassLanguages('Cleric')).toEqual([]);
      expect(getClassLanguages('Barbarian')).toEqual([]);
    });
  });

  describe('getAutomaticLanguages', () => {
    it('should combine racial and class languages without duplicates', () => {
      // Rogue gets Common (racial) + Thieves' Cant (class)
      expect(getAutomaticLanguages('Human', 'Rogue')).toEqual(['Common', 'Thieves\' Cant']);
      
      // Dwarf Rogue gets Common, Dwarvish (racial) + Thieves' Cant (class)
      expect(getAutomaticLanguages('Dwarf', 'Rogue')).toEqual(['Common', 'Dwarvish', 'Thieves\' Cant']);
      
      // Elf Druid gets Common, Elvish (racial) + Druidic (class)
      expect(getAutomaticLanguages('Elf', 'Druid')).toEqual(['Common', 'Elvish', 'Druidic']);
    });

    it('should handle classes without language features', () => {
      expect(getAutomaticLanguages('Human', 'Fighter')).toEqual(['Common']);
      expect(getAutomaticLanguages('Dwarf', 'Wizard')).toEqual(['Common', 'Dwarvish']);
    });

    it('should handle races without class language features', () => {
      expect(getAutomaticLanguages('Human', 'Fighter')).toEqual(['Common']);
      expect(getAutomaticLanguages('Elf', 'Cleric')).toEqual(['Common', 'Elvish']);
    });
  });

  describe('Language Duplication Prevention', () => {
    it('should not duplicate languages when combining sources', () => {
      // Test that the same language doesn't appear multiple times
      const automaticLanguages = getAutomaticLanguages('Human', 'Rogue');
      const uniqueLanguages = new Set(automaticLanguages);
      
      expect(automaticLanguages.length).toBe(uniqueLanguages.size);
      expect(automaticLanguages).toEqual(['Common', 'Thieves\' Cant']);
    });

    it('should handle edge cases with multiple language sources', () => {
      // Test with a race that has multiple languages and a class with languages
      const automaticLanguages = getAutomaticLanguages('Dwarf', 'Rogue');
      const uniqueLanguages = new Set(automaticLanguages);
      
      expect(automaticLanguages.length).toBe(uniqueLanguages.size);
      expect(automaticLanguages).toEqual(['Common', 'Dwarvish', 'Thieves\' Cant']);
    });
  });
}); 