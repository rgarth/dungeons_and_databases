export * from './types'
export * from './utils'
export * from './generators/elf'
export * from './generators/human'
export * from './generators/dragonborn'
export * from './generators/tiefling'
export * from './generators/aasimar'
export * from './generators/goliath'
export * from './generators/halfling'
export * from './generators/gnome'
export * from './generators/half-elf'
export * from './generators/half-orc'
export * from './generators/dwarf'

import { ElfNameGenerator } from './generators/elf'
import { HumanNameGenerator } from './generators/human'
import { DragonbornNameGenerator } from './generators/dragonborn'
import { TieflingNameGenerator } from './generators/tiefling'
import { AasimarNameGenerator } from './generators/aasimar'
import { GoliathNameGenerator } from './generators/goliath'
import { HalflingNameGenerator } from './generators/halfling'
import { GnomeNameGenerator } from './generators/gnome'
import { HalfElfNameGenerator } from './generators/half-elf'
import { HalfOrcNameGenerator } from './generators/half-orc'
import { DwarfNameGenerator } from './generators/dwarf'
import { Race } from './types'

export const nameGenerators = {
  elf: new ElfNameGenerator(),
  human: new HumanNameGenerator(),
  dragonborn: new DragonbornNameGenerator(),
  tiefling: new TieflingNameGenerator(),
  aasimar: new AasimarNameGenerator(),
  goliath: new GoliathNameGenerator(),
  halfling: new HalflingNameGenerator(),
  gnome: new GnomeNameGenerator(),
  'half-elf': new HalfElfNameGenerator(),
  'half-orc': new HalfOrcNameGenerator(),
  dwarf: new DwarfNameGenerator()
} as const

export function generateName(race: string, gender?: 'male' | 'female', culture?: string): string {
  // Map race names to our internal format
  const raceMap: Record<string, Race> = {
    'Dragonborn': 'dragonborn',
    'Dwarf': 'dwarf',
    'Elf': 'elf',
    'Gnome': 'gnome',
    'Half-Elf': 'half-elf',
    'Half-Orc': 'half-orc',
    'Halfling': 'halfling',
    'Human': 'human',
    'Tiefling': 'tiefling',
    'Goliath': 'goliath',
    'Aasimar': 'aasimar'
  }

  const mappedRace = raceMap[race]
  if (!mappedRace) {
    throw new Error(`Unsupported race: ${race}`)
  }

  const generator = nameGenerators[mappedRace]
  if (!generator) {
    throw new Error(`No name generator found for race: ${race}`)
  }

  return generator.generate(gender, culture)
} 