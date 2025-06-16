export type Gender = 'male' | 'female'

export type NamePartType = 'givenName' | 'familyName' | 'clanName' | 'nickname' | 'tribalName' | 'elvenName' | 'humanName' | 'epithet' | 'prefix'

export interface NamePart {
  type: NamePartType
  gender?: Gender
}

export interface NamePattern {
  parts: NamePart[]
  separator: string
  weight?: number // Optional weight for pattern selection
}

export interface NameComponents {
  patterns: NamePattern[]
  parts: {
    [key: string]: string[]
  }
  cultures?: {
    [key: string]: {
      patterns: NamePattern[]
      parts: {
        [key: string]: string[]
      }
    }
  }
}

export interface NameGenerator {
  generate(gender?: Gender, culture?: string): string
}

// Supported races with name generators
export type Race = 
  | 'dragonborn'
  | 'dwarf'
  | 'elf'
  | 'gnome'
  | 'half-elf'
  | 'half-orc'
  | 'halfling'
  | 'human'
  | 'tiefling'
  | 'goliath'
  | 'aasimar'
  | 'yuan-ti'
  | 'aasimar'
  | 'tabaxi'
  | 'firbolg'
  | 'kenku'
  | 'lizardfolk'
  | 'triton'
  | 'bugbear'
  | 'goblin'
  | 'hobgoblin'
  | 'kobold'
  | 'orc'
  | 'yuan-ti' 