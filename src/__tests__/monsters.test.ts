import { monstersData } from '@/data/monsters-data';
import { 
  calculateAverageDamage, 
  getMonsterByName, 
  filterMonsters, 
  searchMonsters,
  formatChallengeRating,
  getXPForCR
} from '@/lib/monsters';

describe('Monster Data', () => {
  test('should have valid monster data', () => {
    expect(monstersData).toBeDefined();
    expect(monstersData.length).toBeGreaterThan(0);
  });

  test('should have required fields for each monster', () => {
    monstersData.forEach(monster => {
      expect(monster.name).toBeDefined();
      expect(monster.size).toBeDefined();
      expect(monster.type).toBeDefined();
      expect(monster.alignment).toBeDefined();
      expect(monster.challengeRating).toBeDefined();
      expect(monster.xp).toBeDefined();
      expect(monster.strength).toBeDefined();
      expect(monster.dexterity).toBeDefined();
      expect(monster.constitution).toBeDefined();
      expect(monster.intelligence).toBeDefined();
      expect(monster.wisdom).toBeDefined();
      expect(monster.charisma).toBeDefined();
      expect(monster.armorClass).toBeDefined();
      expect(monster.hitPoints).toBeDefined();
      expect(monster.hitDice).toBeDefined();
      expect(monster.speed).toBeDefined();
      expect(monster.senses).toBeDefined();
      expect(monster.languages).toBeDefined();
      expect(monster.proficiencyBonus).toBeDefined();
    });
  });
});

describe('Monster Utilities', () => {
  test('should calculate average damage correctly', () => {
    expect(calculateAverageDamage('1d6')).toBe(3);
    expect(calculateAverageDamage('2d6+3')).toBe(10);
    expect(calculateAverageDamage('1d8')).toBe(4);
    expect(calculateAverageDamage('3d10+5')).toBe(21);
  });

  test('should find monster by name', () => {
    const goblin = getMonsterByName('Goblin', monstersData);
    expect(goblin).toBeDefined();
    expect(goblin?.name).toBe('Goblin');
    expect(goblin?.challengeRating).toBe('1/4');
  });

  test('should filter monsters by type', () => {
    const humanoids = filterMonsters(monstersData, { type: 'humanoid' });
    expect(humanoids.length).toBeGreaterThan(0);
    humanoids.forEach(monster => {
      expect(monster.type).toBe('humanoid');
    });
  });

  test('should filter monsters by size', () => {
    const smallMonsters = filterMonsters(monstersData, { size: 'Small' });
    expect(smallMonsters.length).toBeGreaterThan(0);
    smallMonsters.forEach(monster => {
      expect(monster.size).toBe('Small');
    });
  });

  test('should search monsters by name', () => {
    const results = searchMonsters(monstersData, 'goblin');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name.toLowerCase()).toContain('goblin');
  });

  test('should format challenge rating correctly', () => {
    expect(formatChallengeRating('1/4')).toBe('1/4 (50 XP)');
    expect(formatChallengeRating('1')).toBe('1 (200 XP)');
    expect(formatChallengeRating('10')).toBe('10 (5900 XP)');
  });

  test('should get XP for challenge rating', () => {
    expect(getXPForCR('1/4')).toBe(50);
    expect(getXPForCR('1')).toBe(200);
    expect(getXPForCR('10')).toBe(5900);
    expect(getXPForCR('20')).toBe(25000);
  });
}); 