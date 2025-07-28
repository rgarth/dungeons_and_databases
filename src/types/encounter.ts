import { Monster } from './monster';
import { Character } from './character';

export interface Encounter {
  id: string;
  gameId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  monsters: EncounterMonster[];
  participants: EncounterParticipant[];
}

export interface EncounterMonsterInstance {
  id: string;
  encounterMonsterId: string;
  instanceNumber: number;
  initiative?: number; // Individual initiative value for this instance
  currentHP?: number; // Individual HP for this instance
  isActive: boolean;
  createdAt: string;
}

export interface EncounterMonster {
  id: string;
  encounterId: string;
  monsterName: string;
  monsterData: Monster; // Full monster data from our database
  quantity: number;
  currentHP?: number; // Current HP for each instance
  maxHP: number; // Max HP for each instance
  isActive: boolean;
  createdAt: string;
  instances: EncounterMonsterInstance[];
}

export interface EncounterParticipant {
  id: string;
  encounterId: string;
  characterId: string;
  characterName: string;
  characterData: Character; // Character data snapshot
  initiative?: number; // Rolled initiative value
  currentHP?: number;
  maxHP: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateEncounterData {
  gameId: string;
  name: string;
  description?: string;
}

export interface AddMonsterToEncounterData {
  encounterId: string;
  monsterName: string;
  monsterData: Monster;
  quantity: number;
}

export interface AddParticipantToEncounterData {
  encounterId: string;
  characterId: string;
  characterName: string;
  characterData: Character;
}

export interface UpdateInitiativeData {
  encounterId: string;
  participantId: string;
  initiative: number;
}

export interface UpdateHpData {
  encounterId: string;
  participantId: string;
  currentHP: number;
}

export interface InitiativeOrder {
  id: string;
  name: string;
  type: 'character' | 'monster';
  initiative: number;
  currentHP?: number;
  maxHP: number;
  isActive: boolean;
  characterData?: Character; // Only present for character type
} 