import { NameGenerator, Gender } from '../types'
import { halfOrcNames } from '../components/half-orc'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class HalfOrcNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(halfOrcNames, culture)
    const parts = getCultureParts(halfOrcNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 