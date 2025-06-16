import { NameGenerator, Gender } from '../types'
import { elfNames } from '../components/elf'
import { generateFromPattern, getCulturePatterns, getCultureParts, selectPatternByWeight } from '../utils'

export class ElfNameGenerator implements NameGenerator {
  generate(gender?: Gender, culture?: string): string {
    const patterns = getCulturePatterns(elfNames, culture)
    const parts = getCultureParts(elfNames, culture)
    const pattern = selectPatternByWeight(patterns)
    return generateFromPattern(pattern, parts, gender)
  }
} 