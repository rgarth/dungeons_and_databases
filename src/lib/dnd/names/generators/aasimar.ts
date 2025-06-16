import { NameGenerator, Gender } from '../types'
import { aasimarNames } from '../components/aasimar'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class AasimarNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(aasimarNames, culture)
    const parts = getCultureParts(aasimarNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 