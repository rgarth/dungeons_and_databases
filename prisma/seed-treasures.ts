#!/usr/bin/env tsx

// Treasure Database Seeder
//
// This script populates the Treasure table from the official D&D 5e treasure data
// Used for initial database setup and production deployment
//
// Usage: 
//   Development: npx tsx prisma/seed-treasures.ts
//   Production:  node -r tsx/cjs prisma/seed-treasures.ts

import { PrismaClient } from '@prisma/client'
import { treasureData } from './data/treasure-data'

const prisma = new PrismaClient()

async function seedTreasures() {
  console.log('💎 Starting treasure database seeding...')
  
  // Check existing treasures
  const existingTreasures = await prisma.treasure.findMany()
  console.log(`ℹ️  Found ${existingTreasures.length} existing treasures`)
  
  // Clear existing treasures for fresh seed
  console.log('🔄 Clearing existing treasures for fresh seed...')
  await prisma.treasure.deleteMany()
  
  console.log('💎 Seeding D&D 5e treasures...')
  
  // Process items sequentially to avoid connection pool issues
  for (const treasure of treasureData) {
    try {
      await prisma.treasure.create({
        data: {
          name: treasure.name,
          type: treasure.type,
          category: treasure.category,
          value: treasure.value,
          description: treasure.description,
          weight: treasure.weight,
          appearance: treasure.appearance
        }
      })
      console.log(`  ✅ Added treasure: ${treasure.name}`)
    } catch (error) {
      console.error(`❌ Failed to add treasure ${treasure.name}:`, error)
    }
  }
  
  console.log(`✅ Seeded ${treasureData.length} treasures`)
}

async function main() {
  try {
    await seedTreasures()
    console.log('🎉 Treasure seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding treasures:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
main()

// Handle both direct execution and module import
const isDirectExecution = process.argv[1]?.endsWith('seed-treasures.ts')

if (isDirectExecution) {
  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export { main as seedTreasures } 