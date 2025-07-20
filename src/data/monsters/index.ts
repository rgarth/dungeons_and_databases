import { beastMonsters } from './beast';
import { aberrationMonsters } from './aberration';
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

export { beastMonsters, aberrationMonsters, celestialMonsters, constructMonsters, dragonMonsters, elementalMonsters, feyMonsters, fiendMonsters, giantMonsters, humanoidMonsters, monstrosityMonsters, oozeMonsters, plantMonsters, swarmMonsters, undeadMonsters };

export const allMonsters = [
  ...beastMonsters,
  ...aberrationMonsters,
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
  ...undeadMonsters
];
