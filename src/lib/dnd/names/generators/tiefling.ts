import { NameGenerator, Gender } from '../types'
import { tieflingNames } from '../components/tiefling'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class TieflingNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(tieflingNames, culture)
    const parts = getCultureParts(tieflingNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 