// Monster Image Utility
// Handles image URLs and fallbacks for monster images stored in Vercel Blob Storage

import { list } from '@vercel/blob';

const BLOB_STORAGE_URL = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || 'https://9jqgnmwahpwmsujc.public.blob.vercel-storage.com';

/**
 * Convert monster name to filename format
 * e.g., "Ancient Red Dragon" -> "ancient_red_dragon.png"
 */
export function getMonsterImageFilename(monsterName: string): string {
  return monsterName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_') // Replace all non-alphanumeric characters with underscores
    .trim() + '.png';
}

/**
 * Get the full URL for a monster image
 */
export function getMonsterImageUrl(monsterName: string): string {
  if (!BLOB_STORAGE_URL || BLOB_STORAGE_URL === '') {
    console.warn('BLOB_STORAGE_URL not configured');
    return '';
  }
  const filename = getMonsterImageFilename(monsterName);
  const url = `${BLOB_STORAGE_URL}/${filename}`;
  return url;
}

/**
 * Check if a monster image exists in blob storage
 * This requires the BLOB_READ_WRITE_TOKEN environment variable
 */
export async function checkMonsterImageExists(monsterName: string): Promise<boolean> {
  try {
    const filename = getMonsterImageFilename(monsterName);
    const { blobs } = await list({ prefix: filename });
    return blobs.some(blob => blob.pathname === filename);
  } catch (error) {
    console.warn(`Failed to check if ${monsterName} image exists:`, error);
    return false;
  }
}

/**
 * Get a list of all available monster images in blob storage
 */
export async function getAvailableMonsterImages(): Promise<string[]> {
  try {
    const { blobs } = await list({ prefix: '' });
    return blobs
      .filter(blob => blob.pathname.endsWith('.png'))
      .map(blob => blob.pathname.replace('.png', ''));
  } catch (error) {
    console.warn('Failed to get available monster images:', error);
    return [];
  }
}

/**
 * Debug function to check what images are available vs what we expect
 */
export async function debugMonsterImages(): Promise<{
  available: string[];
  expected: string[];
  missing: string[];
  extra: string[];
}> {
  const available = await getAvailableMonsterImages();
  
  // Get expected monster names from your data
  const expected = [
    'aboleth', 'adult_black_dragon', 'adult_blue_dragon', 'adult_brass_dragon', 
    'adult_bronze_dragon', 'adult_copper_dragon', 'adult_gold_dragon', 
    'adult_green_dragon', 'adult_red_dragon', 'adult_silver_dragon', 
    'adult_white_dragon', 'ancient_black_dragon', 'ancient_blue_dragon',
    'ancient_brass_dragon', 'ancient_bronze_dragon', 'ancient_copper_dragon',
    'ancient_gold_dragon', 'ancient_green_dragon', 'ancient_red_dragon',
    'ancient_silver_dragon', 'ancient_white_dragon', 'ape', 'awakened_shrub',
    'awakened_tree', 'axe_beak', 'baboon', 'badger', 'balor', 'bandit',
    'bandit_captain', 'banshee', 'basilisk', 'bat', 'bearded_devil',
    'behir', 'berserker', 'black_bear', 'black_dragon_wyrmling',
    'black_pudding', 'blink_dog', 'blood_hawk', 'blue_dragon_wyrmling',
    'boar', 'bone_devil', 'brass_dragon_wyrmling', 'bronze_dragon_wyrmling',
    'brown_bear', 'bugbear', 'bulette', 'camel', 'cat', 'cave_bear',
    'centaur', 'chain_devil', 'chimera', 'chuul', 'clay_golem',
    'cloaker', 'cloud_giant', 'cockatrice', 'commoner', 'copper_dragon_wyrmling',
    'couatl', 'crab', 'crocodile', 'cultist', 'cult_fanatic', 'darkmantle',
    'death_dog', 'deep_gnome', 'deer', 'deva', 'dire_wolf', 'djinni',
    'doppelganger', 'draft_horse', 'dragon_turtle', 'dretch', 'drider',
    'drow', 'drow_elite_warrior', 'drow_mage', 'drow_priestess_of_lolth',
    'druid', 'dryad', 'duergar', 'dust_mephit', 'eagle', 'earth_elemental',
    'efreeti', 'elephant', 'elk', 'erinyes', 'ettercap', 'ettin',
    'fire_elemental', 'fire_giant', 'flesh_golem', 'flying_sword',
    'flying_snake', 'frog', 'frost_giant', 'gargoyle', 'gelatinous_cube',
    'ghast', 'ghost', 'ghoul', 'giant_ape', 'giant_badger', 'giant_bat',
    'giant_boar', 'giant_centipede', 'giant_constrictor_snake',
    'giant_crab', 'giant_crocodile', 'giant_eagle', 'giant_elk',
    'giant_fire_beetle', 'giant_frog', 'giant_goat', 'giant_hyena',
    'giant_lizard', 'giant_octopus', 'giant_owl', 'giant_poisonous_snake',
    'giant_rat', 'giant_scorpion', 'giant_seahorse', 'giant_shark',
    'giant_spider', 'giant_toad', 'giant_vulture', 'giant_wasp',
    'giant_weasel', 'giant_wolf_spider', 'gibbering_mouther', 'glabrezu',
    'gladiator', 'gnoll', 'goat', 'goblin', 'gold_dragon_wyrmling',
    'gorgon', 'gray_ooze', 'green_dragon_wyrmling', 'green_hag',
    'grick', 'griffon', 'grimlock', 'guard', 'guardian_naga',
    'gynosphinx', 'half_red_dragon_veteran', 'harpy', 'hawk',
    'hell_hound', 'hezrou', 'hill_giant', 'hippogriff', 'hobgoblin',
    'homunculus', 'horned_devil', 'horse', 'hunter_shark', 'hydra',
    'hyena', 'ice_devil', 'ice_mephit', 'imp', 'invisible_stalker',
    'iron_golem', 'jackal', 'killer_whale', 'knight', 'kobold',
    'kraken', 'lamia', 'lemure', 'lich', 'lion', 'lizard',
    'lizardfolk', 'mage', 'magma_mephit', 'magmin', 'mammoth',
    'manticore', 'marilith', 'mastiff', 'medusa', 'merfolk',
    'merrow', 'mimic', 'minotaur', 'minotaur_skeleton', 'mule',
    'mummy', 'mummy_lord', 'night_hag', 'nightmare', 'noble',
    'ochre_jelly', 'octopus', 'ogre', 'ogre_zombie', 'oni',
    'orc', 'otyugh', 'owl', 'owlbear', 'panther', 'pegasus',
    'phase_spider', 'pit_fiend', 'planetar', 'plesiosaurus',
    'poisonous_snake', 'polar_bear', 'pony', 'priest', 'pseudodragon',
    'purple_worm', 'quasit', 'quipper', 'rakshasa', 'rat',
    'raven', 'red_dragon_wyrmling', 'reef_shark', 'remorhaz',
    'rhinoceros', 'riding_horse', 'roc', 'roper', 'rust_monster',
    'saber_toothed_tiger', 'sahuagin', 'salamander', 'satyr',
    'scorpion', 'scout', 'sea_hag', 'sea_horse', 'shadow',
    'shambling_mound', 'shield_guardian', 'shrieker', 'skeleton',
    'solar', 'specter', 'spider', 'spirit_naga', 'sprite',
    'spy', 'steam_mephit', 'stirge', 'stone_giant', 'stone_golem',
    'storm_giant', 'succubus', 'swarm_of_bats', 'swarm_of_beetles',
    'swarm_of_centipedes', 'swarm_of_insects', 'swarm_of_poisonous_snakes',
    'swarm_of_quippers', 'swarm_of_rats', 'swarm_of_ravens',
    'swarm_of_spiders', 'swarm_of_wasps', 'tarrasque', 'thug',
    'tiger', 'treant', 'tribal_warrior', 'triceratops', 'troll',
    'tyrannosaurus_rex', 'unicorn', 'vampire', 'vampire_spawn',
    'veteran', 'violet_fungus', 'vrock', 'vulture', 'warhorse',
    'water_elemental', 'weasel', 'werebear', 'wereboar', 'wererat',
    'weretiger', 'werewolf', 'white_dragon_wyrmling', 'wight',
    'will_o_wisp', 'winter_wolf', 'wolf', 'worg', 'wraith',
    'wyvern', 'xorn', 'zombie'
  ];
  
  const missing = expected.filter(name => !available.includes(name));
  const extra = available.filter(name => !expected.includes(name));
  
  return { available, expected, missing, extra };
} 