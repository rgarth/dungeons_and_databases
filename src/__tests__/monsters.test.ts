import { allMonsters } from '@/data/monsters';

describe('Monster Data', () => {
  test('should have valid monster data', () => {
    expect(allMonsters).toBeDefined();
    expect(allMonsters.length).toBeGreaterThan(0);
  });

  test('should have required fields for each monster', () => {
    allMonsters.forEach(monster => {
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

  test('should find monster by name', () => {
    const goblin = allMonsters.find(m => m.name === 'Goblin');
    expect(goblin).toBeDefined();
    expect(goblin?.name).toBe('Goblin');
    expect(goblin?.challengeRating).toBe('1/4');
  });

  test('should filter monsters by type', () => {
    const humanoids = allMonsters.filter(monster => monster.type === 'humanoid');
    expect(humanoids.length).toBeGreaterThan(0);
    humanoids.forEach(monster => {
      expect(monster.type).toBe('humanoid');
    });
  });

  test('should filter monsters by size', () => {
    const smallMonsters = allMonsters.filter(monster => monster.size === 'Small');
    expect(smallMonsters.length).toBeGreaterThan(0);
    smallMonsters.forEach(monster => {
      expect(monster.size).toBe('Small');
    });
  });

  test('should search monsters by name', () => {
    const results = allMonsters.filter(monster => 
      monster.name.toLowerCase().includes('goblin')
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].name.toLowerCase()).toContain('goblin');
  });
}); 