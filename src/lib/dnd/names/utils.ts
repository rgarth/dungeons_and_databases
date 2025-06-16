import { NamePart, NamePattern, NameComponents, Gender } from './types'

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateFromPattern(pattern: NamePattern, parts: NameComponents['parts'], gender?: Gender): string {
  return pattern.parts
    .map(part => {
      if (part.type === 'givenName') {
        // If gender is specified, use that gender's array
        if (gender) {
          const genderArray = parts.givenName[gender]
          // If no names for this gender, fall back to neutral names
          if (!genderArray || genderArray.length === 0) {
            return getRandomElement(parts.givenName.neutral)
          }
          return getRandomElement(genderArray)
        }
        // If no gender specified, use neutral names
        return getRandomElement(parts.givenName.neutral)
      }
      
      // For all other name parts, just use the array directly
      const partArray = parts[part.type as keyof typeof parts]
      if (!partArray || !Array.isArray(partArray)) return ''
      return getRandomElement(partArray)
    })
    .filter(Boolean)
    .join(pattern.separator)
}

export function formatName(parts: NamePart[], separator: string): string {
  return parts.map(part => part.type).join(separator)
}

export function getCulturePatterns(components: NameComponents, culture?: string): NamePattern[] {
  if (culture && components.cultures?.[culture]) {
    return components.cultures[culture].patterns
  }
  return components.patterns
}

export function getCultureParts(components: NameComponents, culture?: string): NameComponents['parts'] {
  if (culture && components.cultures?.[culture]) {
    const cultureParts = components.cultures[culture].parts
    const mergedParts = { ...components.parts }
    
    // Merge each part type from the culture
    Object.entries(cultureParts).forEach(([key, value]) => {
      if (key === 'givenName' && value) {
        const givenNameValue = value as typeof components.parts.givenName
        mergedParts.givenName = {
          ...mergedParts.givenName,
          ...givenNameValue
        }
      } else if (value) {
        const partKey = key as keyof typeof mergedParts
        if (partKey !== 'givenName') {
          mergedParts[partKey] = value as string[]
        }
      }
    })
    
    return mergedParts
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