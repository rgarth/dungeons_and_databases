export type Gender = 'male' | 'female' | 'neutral'

export interface NamePart {
  type: NamePartType
  gender?: Gender  // Only used for given names
}

export type NamePartType = 'givenName' | 'familyName' | 'nickname' | 'epithet' | 'prefix' | 'clanName'

export interface NamePattern {
  parts: NamePart[]
  separator: string
  weight?: number
}

export interface NameComponents {
  patterns: NamePattern[]
  parts: {
    givenName: {
      male: string[]
      female: string[]
      neutral: string[]
    }
    familyName?: string[]
    nickname?: string[]
    epithet?: string[]
    prefix?: string[]
    clanName?: string[]
  }
  cultures?: {
    [key: string]: {
      patterns: NamePattern[]
      parts: Partial<{
        givenName: {
          male: string[]
          female: string[]
          neutral: string[]
        }
        familyName: string[]
        nickname: string[]
        epithet: string[]
        prefix: string[]
        clanName: string[]
      }>
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
  | 'tabaxi' 