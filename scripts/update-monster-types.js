#!/usr/bin/env node

const fs = require('fs');

// Read the current monster types file
const typesPath = '../src/types/monster.ts';
const typesContent = fs.readFileSync(typesPath, 'utf8');

// Update the MonsterAction interface to support multiple damage options
let updatedTypesContent = typesContent.replace(
  /export interface MonsterAction \{[\s\S]*?\}/,
  `export interface MonsterAction {
  name: string;
  description: string;
  attackBonus?: number;
  damage?: {
    type: string;
    roll: string; // e.g., "2d6+3"
    average?: number;
    description?: string; // e.g., "One-handed", "Two-handed"
  };
  secondaryDamage?: {
    type: string;
    roll: string; // e.g., "1d10+3"
    average?: number;
    description?: string; // e.g., "Two-handed", "Versatile"
  };
  reach?: string;
  target?: string;
  savingThrow?: {
    ability: string;
    dc: number;
    effect: string;
  };
  recharge?: string; // e.g., "5-6", "Recharge 5-6"
  legendary?: boolean;
  lair?: boolean;
}`
);

// Update the MonsterLegendaryAction interface to support damage
updatedTypesContent = updatedTypesContent.replace(
  /export interface MonsterLegendaryAction \{[\s\S]*?\}/,
  `export interface MonsterLegendaryAction {
  name: string;
  cost?: number; // 1, 2, or 3 (optional since API doesn't provide it)
  description: string;
  damage?: {
    type: string;
    roll: string; // e.g., "3d6"
    average?: number;
  };
}`
);

// Write the updated types back
fs.writeFileSync(typesPath, updatedTypesContent);

console.log('✅ Updated MonsterAction type to support multiple damage options');
console.log('✅ Updated MonsterLegendaryAction type to support damage');
console.log('Added support for:');
console.log('- damage.description (e.g., "One-handed")');
console.log('- secondaryDamage.description (e.g., "Two-handed")');
console.log('- legendary action damage rolls'); 