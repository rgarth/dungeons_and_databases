import { NamePart, NamePattern, NameComponents, Gender } from './types'

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateFromPattern(pattern: NamePattern, parts: { [key: string]: string[] }, gender?: Gender): string {
  return pattern.parts
    .map(part => {
      const partArray = parts[part.type]
      if (!partArray) return ''
      
      // Filter by gender if specified
      const genderFiltered = part.gender && gender ? 
        partArray.filter(name => name.toLowerCase().includes(gender.toLowerCase())) :
        partArray
      
      return getRandomElement(genderFiltered)
    })
    .filter(Boolean)
    .join(pattern.separator)
}

export function formatName(parts: NamePart[], separator: string): string {
  return parts.map(part => part.value).join(separator)
}

export function getCulturePatterns(components: NameComponents, culture?: string): NamePattern[] {
  if (culture && components.cultures?.[culture]) {
    return components.cultures[culture].patterns
  }
  return components.patterns
}

export function getCultureParts(components: NameComponents, culture?: string): { [key: string]: string[] } {
  if (culture && components.cultures?.[culture]) {
    return {
      ...components.parts,
      ...components.cultures[culture].parts
    }
  }
  return components.parts
}

export function selectPatternByWeight(patterns: NamePattern[]): NamePattern {
  // Calculate total weight
  const totalWeight = patterns.reduce((sum, pattern) => sum + (pattern.weight || 1), 0)
  
  // Generate random number between 0 and total weight
  let random = Math.random() * totalWeight
  
  // Select pattern based on weight
  for (const pattern of patterns) {
    random -= (pattern.weight || 1)
    if (random <= 0) {
      return pattern
    }
  }
  
  // Fallback to first pattern (should never happen)
  return patterns[0]
} 