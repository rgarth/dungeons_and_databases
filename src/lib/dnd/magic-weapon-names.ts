// Magic Weapon Name Generator
// Simple random combination generator for D&D magic weapons

const prefixes = [
  'Blazing', 'Frozen', 'Shadow', 'Lightning', 'Crimson', 'Golden', 'Silver', 'Obsidian',
  'Crystal', 'Void', 'Storm', 'Flame', 'Frost', 'Thunder', 'Radiant', 'Dark',
  'Ancient', 'Cursed', 'Blessed', 'Ethereal', 'Spectral', 'Phantom', 'Mystic', 'Arcane',
  'Divine', 'Infernal', 'Celestial', 'Abyssal', 'Primal', 'Elemental', 'Runic', 'Enchanted',
  'Vengeful', 'Wrathful', 'Merciful', 'Righteous', 'Sinister', 'Malevolent', 'Benevolent', 'Neutral',
  'Whispering', 'Screaming', 'Silent', 'Echoing', 'Resonant', 'Humming', 'Singing', 'Wailing',
  'Burning', 'Chilling', 'Shocking', 'Piercing', 'Crushing', 'Slashing', 'Cutting', 'Rending',
  'Shimmering', 'Glowing', 'Pulsing', 'Flickering', 'Brilliant', 'Dim', 'Bright', 'Luminous',
  'Twisted', 'Straight', 'Curved', 'Jagged', 'Smooth', 'Rough', 'Sharp', 'Dull',
  'Heavy', 'Light', 'Swift', 'Slow', 'Quick', 'Steady', 'Unstable', 'Balanced'
];

const suffixes = [
  'Bane', 'Slayer', 'Render', 'Cleaver', 'Piercer', 'Crusher', 'Breaker', 'Shatterer',
  'Edge', 'Point', 'Tip', 'Blade', 'Steel', 'Iron', 'Fang', 'Claw',
  'Wrath', 'Fury', 'Rage', 'Anger', 'Vengeance', 'Justice', 'Mercy', 'Grace',
  'Song', 'Whisper', 'Scream', 'Cry', 'Roar', 'Howl', 'Moan', 'Sigh',
  'Fire', 'Ice', 'Storm', 'Wind', 'Earth', 'Water', 'Light', 'Dark',
  'Soul', 'Heart', 'Mind', 'Spirit', 'Essence', 'Core', 'Will', 'Power',
  'Doom', 'Fate', 'Destiny', 'Fortune', 'Luck', 'Chance', 'Hope', 'Dream',
  'Truth', 'Lie', 'Secret', 'Mystery', 'Riddle', 'Answer', 'Question', 'Wonder',
  'King', 'Queen', 'Lord', 'Lady', 'Prince', 'Princess', 'Duke', 'Duchess',
  'Master', 'Servant', 'Guardian', 'Protector', 'Destroyer', 'Creator', 'Maker', 'Breaker'
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