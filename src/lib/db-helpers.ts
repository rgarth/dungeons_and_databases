import { prisma } from './db'

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | null = null
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      // Check for connection pool or timeout errors
      if (error instanceof Error && (
        error.message.includes('connection pool') ||
        error.message.includes('timeout') ||
        error.message.includes('P2024') // Prisma connection timeout error code
      )) {
        // Exponential backoff
        const backoffDelay = delay * Math.pow(2, i)
        console.log(`Database operation failed, retrying in ${backoffDelay}ms...`)
        await new Promise(resolve => setTimeout(resolve, backoffDelay))
        continue
      }
      throw error
    }
  }
  
  throw lastError
}

// Helper functions for common queries
export async function getDndClasses() {
  return withRetry(() => prisma.dndClass.findMany({
    orderBy: { name: 'asc' }
  }))
}

export async function getBackgrounds() {
  return withRetry(() => prisma.background.findMany({
    orderBy: { name: 'asc' }
  }))
}

export async function getAlignments() {
  return withRetry(() => prisma.alignment.findMany({
    orderBy: { name: 'asc' }
  }))
}

export async function getEquipmentPacks() {
  return withRetry(() => prisma.equipmentPack.findMany({
    orderBy: { name: 'asc' }
  }))
}

export async function getArmor() {
  return withRetry(() => prisma.armor.findMany({
    orderBy: { name: 'asc' }
  }))
}

export async function getMagicalItems() {
  return withRetry(() => prisma.magicalItem.findMany({
    orderBy: { name: 'asc' }
  }))
}

export async function getTreasures() {
  return withRetry(() => prisma.treasure.findMany({
    orderBy: { name: 'asc' }
  }))
} 