// Magic weapon name generator
// Based on D&D 5e magical weapon naming conventions

const prefixes = [
  "Ancient",
  "Arcane",
  "Blessed",
  "Celestial",
  "Cursed",
  "Divine",
  "Eldritch",
  "Ethereal",
  "Forgotten",
  "Hallowed",
  "Infernal",
  "Mystic",
  "Primal",
  "Sacred",
  "Shadow",
  "Spectral",
  "Thunder",
  "Void",
  "Wrathful",
  "Zealous"
];

const suffixes = [
  "Bane",
  "Blade",
  "Bolt",
  "Brand",
  "Breaker",
  "Caller",
  "Cleaver",
  "Crusher",
  "Dancer",
  "Defender",
  "Destroyer",
  "Edge",
  "Fang",
  "Flame",
  "Frost",
  "Guardian",
  "Heart",
  "Keeper",
  "Killer",
  "Might",
  "Power",
  "Protector",
  "Rage",
  "Reaper",
  "Screamer",
  "Seeker",
  "Slayer",
  "Soul",
  "Spirit",
  "Storm",
  "Striker",
  "Swift",
  "Thunder",
  "Titan",
  "Vengeance",
  "Viper",
  "Warden",
  "Whisper",
  "Wrath"
];

const titles = [
  'of the Void', 'of Shadows', 'of Light', 'of Darkness', 'of Fire', 'of Ice',
  'of the Storm', 'of the Wind', 'of the Earth', 'of the Sea', 'of the Sky',
  'of Dragons', 'of Giants', 'of Demons', 'of Angels', 'of Gods', 'of Mortals',
  'of the North', 'of the South', 'of the East', 'of the West', 'of the Dawn',
  'of Dusk', 'of Midnight', 'of Noon', 'of Winter', 'of Summer', 'of Spring',
  'of Autumn', 'of the Moon', 'of the Sun', 'of Stars', 'of Comets',
  'of the Forgotten', 'of the Lost', 'of the Found', 'of the Chosen',
  'of Legends', 'of Myths', 'of Tales', 'of Stories', 'of Songs', 'of Poems',
  'of Kings', 'of Queens', 'of Heroes', 'of Villains', 'of Champions',
  'of the Ancient', 'of the Modern', 'of the Future', 'of the Past',
  'of Eternity', 'of Time', 'of Space', 'of Reality', 'of Dreams'
];

/**
 * Generates a random magic weapon name
 * @returns A randomly generated magic weapon name
 */
export function generateMagicWeaponName(): string {
  const useTitle = Math.random() < 0.4; // 40% chance to include a title
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  let name = `${prefix} ${suffix}`;
  
  if (useTitle) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    name += ` ${title}`;
  }
  
  return name;
}

// Export some example names for testing
export const exampleNames = [
  'Blazing Fang of Dragons',
  'Shadow Whisper',
  'Golden Slayer of the Void',
  'Frozen Wrath',
  'Lightning Edge of Storms',
  'Cursed Bane of the Forgotten'
]; 