import { racesData, RaceData } from '../../../prisma/data/races-data';

describe('Race Speed Data', () => {
  test('all races should have speed defined', () => {
    const racesWithoutSpeed = racesData.filter((race: RaceData) => 
      race.speed === undefined || race.speed === null
    );
    
    expect(racesWithoutSpeed).toHaveLength(0);
  });

  test('all race speeds should be positive numbers', () => {
    const invalidSpeeds = racesData.filter((race: RaceData) => 
      typeof race.speed !== 'number' || race.speed <= 0
    );
    
    expect(invalidSpeeds).toHaveLength(0);
  });

  test('race speeds should match D&D 5e SRD values', () => {
    const expectedSpeeds: Record<string, number> = {
      'Human': 30,
      'Elf': 30,
      'Dwarf': 25,
      'Halfling': 25,
      'Dragonborn': 30,
      'Gnome': 25,
      'Half-Elf': 30,
      'Half-Orc': 30,
      'Tiefling': 30,
      'Aasimar': 30,
      'Goliath': 30,
      'Tabaxi': 30
    };

    racesData.forEach((race: RaceData) => {
      expect(race.speed).toBe(expectedSpeeds[race.name]);
    });
  });
}); 