import { NameGenerator, Gender } from '../types'
import { tabaxiNames } from '../components/tabaxi'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class TabaxiNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(tabaxiNames, culture)
    const parts = getCultureParts(tabaxiNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 