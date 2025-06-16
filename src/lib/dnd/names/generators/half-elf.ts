import { NameGenerator, Gender } from '../types'
import { halfElfNames } from '../components/half-elf'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class HalfElfNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(halfElfNames, culture)
    const parts = getCultureParts(halfElfNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 