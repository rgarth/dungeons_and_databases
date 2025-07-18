import ageProfiles from './age-profiles.json';

export interface AgeStage {
  name: string;
  range: [number, number];
  appearance: string;
  maturity: string;
  beard?: {
    male: string;
    female: string;
  };
}

export interface AgeProfile {
  adulthood: number;
  maxAge: number;
  stages: AgeStage[];
  special: {
    beardByGender?: boolean;
    visualAgeCap?: number;
  };
  diverseDescription: string;
}

export interface AgeProfiles {
  [race: string]: AgeProfile;
}

// Type assertion to convert JSON arrays to tuples
const profiles = ageProfiles as unknown as AgeProfiles;

export function getAgeStage(race: string, age: number): AgeStage | null {
  const profile = profiles[race];
  if (!profile) return null;

  for (const stage of profile.stages) {
    if (age >= stage.range[0] && age <= stage.range[1]) {
      return stage;
    }
  }
  
  // Default to last stage for ages beyond max
  return profile.stages[profile.stages.length - 1] || null;
}

export function getAppearanceDescription(race: string, age: number, gender?: string): string {
  const profile = profiles[race];
  if (!profile) return 'fantasy character';

  // Handle special cases
  if (profile.special.visualAgeCap) {
    const visualAge = Math.min(age, profile.special.visualAgeCap);
    
    if (visualAge < 18) return 'teenager, youthful features, smooth skin, minimal wrinkles, ageless elven beauty';
    if (visualAge < 25) return 'young adult, early twenties, youthful features, smooth skin, ageless elven beauty';
    if (visualAge < 35) return 'young adult, twenties to early thirties, some fine lines, youthful but mature, ageless elven beauty';
    if (visualAge < 45) return 'young adult, thirties to early forties, mature features, some fine lines, youthful but mature, ageless elven beauty';
    
    return 'young adult, thirties to early forties, mature features, some fine lines, youthful but mature, ageless elven beauty';
  }

  const stage = getAgeStage(race, age);
  if (!stage) return 'fantasy character';

  // Handle gender-specific beard descriptions
  if (profile.special.beardByGender && stage.beard && gender) {
    const beardDesc = gender === 'Female' ? stage.beard.female : stage.beard.male;
    return `${stage.appearance}, ${beardDesc}`;
  }

  return stage.appearance;
}

export function getAgeDescription(race: string, age: number): string {
  const stage = getAgeStage(race, age);
  if (!stage) return 'fantasy character';
  
  return `${stage.maturity}, ${stage.appearance}`;
}

export function getDiverseAgeDescription(race: string, gender?: string, subrace?: string): string {
  const profile = profiles[race];
  if (!profile) return 'fantasy character';

  // Special handling for Drow subrace
  if (race === 'Elf' && subrace === 'Drow') {
    return 'young adult to middle-aged drow, mature features, some fine lines, confident expression, DARK SKIN, BLACK SKIN, DEEP BLACK SKIN, WHITE HAIR, SNOW WHITE HAIR, PURE WHITE HAIR, RED EYES, BLOOD RED EYES, CRIMSON RED EYES, pointed ears, underdark features, drow heritage, dark elf, underdark elf';
  }

  // Special handling for Duergar subrace
  if (race === 'Dwarf' && subrace === 'Duergar') {
    return 'young adult to middle-aged duergar, mature features, some fine lines, confident expression, traditional dwarven features, stocky build, broad shoulders, GRAY SKIN, ASHEN SKIN, DEEP GRAY SKIN, BIG BUSHY BEARD, well-maintained beard, underdark heritage, gray dwarf';
  }

  // For races with gender-specific beards, modify the description
  if (profile.special.beardByGender && gender) {
    // This is a simplified approach - in practice, you might want to modify the diverse description
    // based on gender for races like dwarves
    return profile.diverseDescription;
  }

  return profile.diverseDescription;
}

export function getSupportedRaces(): string[] {
  return Object.keys(profiles);
}

export function getRaceProfile(race: string): AgeProfile | null {
  return profiles[race] || null;
} 