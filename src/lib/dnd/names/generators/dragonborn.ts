import { NameGenerator, Gender } from '../types'
import { dragonbornNames } from '../components/dragonborn'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class DragonbornNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(dragonbornNames, culture)
    const parts = getCultureParts(dragonbornNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 