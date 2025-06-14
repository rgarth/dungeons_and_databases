import { Character } from './character';

export type CharacterCreationData = Omit<Character, 'id' | 'createdAt' | 'updatedAt' | 'userId'>; 