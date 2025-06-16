import { NameGenerator, Gender } from '../types'
import { dwarfNames } from '../components/dwarf'
import { getRandomElement, generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class DwarfNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(dwarfNames, culture)
    const parts = getCultureParts(dwarfNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 