import { NameGenerator, Gender } from '../types'
import { gnomeNames } from '../components/gnome'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class GnomeNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(gnomeNames, culture)
    const parts = getCultureParts(gnomeNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 