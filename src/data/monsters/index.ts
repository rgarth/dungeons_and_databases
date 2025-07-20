// Monster data sharded by type for better maintainability
// Source: D&D 5e SRD via dnd5eapi.co

import { Monster } from '@/types/monster';

// Import all monster type data
import { aberrationMonsters } from './aberration';
import { beastMonsters } from './beast';
import { celestialMonsters } from './celestial';
import { constructMonsters } from './construct';
import { dragonMonsters } from './dragon';
import { elementalMonsters } from './elemental';
import { feyMonsters } from './fey';
import { fiendMonsters } from './fiend';
import { giantMonsters } from './giant';
import { humanoidMonsters } from './humanoid';
import { monstrosityMonsters } from './monstrosity';
import { oozeMonsters } from './ooze';
import { plantMonsters } from './plant';
import { swarmMonsters } from './swarm';
import { undeadMonsters } from './undead';

// Combined monster data
export const monstersData: Monster[] = [
  ...aberrationMonsters,
  ...beastMonsters,
  ...celestialMonsters,
  ...constructMonsters,
  ...dragonMonsters,
  ...elementalMonsters,
  ...feyMonsters,
  ...fiendMonsters,
  ...giantMonsters,
  ...humanoidMonsters,
  ...monstrosityMonsters,
  ...oozeMonsters,
  ...plantMonsters,
  ...swarmMonsters,
  ...undeadMonsters,
];

// Helper functions for monster data
export const getMonsterByName = (name: string): Monster | undefined => {
  return monstersData.find(monster => 
    monster.name.toLowerCase() === name.toLowerCase()
  );
};

export const getMonstersByType = (type: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.type.toLowerCase() === type.toLowerCase()
  );
};

export const getMonstersByChallengeRating = (cr: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.challengeRating === cr
  );
};

export const getMonstersBySize = (size: string): Monster[] => {
  return monstersData.filter(monster => 
    monster.size.toLowerCase() === size.toLowerCase()
  );
};

export const searchMonsters = (query: string): Monster[] => {
  const lowerQuery = query.toLowerCase();
  return monstersData.filter(monster => 
    monster.name.toLowerCase().includes(lowerQuery) ||
    monster.type.toLowerCase().includes(lowerQuery) ||
    monster.subtype?.toLowerCase().includes(lowerQuery) ||
    monster.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Export individual type arrays for direct access
export {
  aberrationMonsters,
  beastMonsters,
  celestialMonsters,
  constructMonsters,
  dragonMonsters,
  elementalMonsters,
  feyMonsters,
  fiendMonsters,
  giantMonsters,
  humanoidMonsters,
  monstrosityMonsters,
  oozeMonsters,
  plantMonsters,
  swarmMonsters,
  undeadMonsters,
};
