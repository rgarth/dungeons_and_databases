import { Monster } from './monster';
import { Character } from './character';

export interface DiceRollLogEntry {
  id: string;
  timestamp: string;
  playerName: string;
  playerId: string; // User ID of the player who made the roll
  notation: string;
  result: string;
  isDM: boolean;
  isHidden: boolean;
}

export interface Encounter {
  id: string;
  gameId: string;
  name: string;
  description?: string;
  isActive: boolean;
  currentTurn?: number; // Current turn number (1, 2, 3, etc.)
  currentParticipantId?: string; // ID of current participant in initiative order
  turnOrder?: string[]; // Array of participant IDs in initiative order
  round?: number; // Current round number
  diceRollLog?: DiceRollLogEntry[]; // Array of dice roll log entries
  showDMRolls?: boolean; // Whether DM rolls are visible to players
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