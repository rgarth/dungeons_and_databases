#!/usr/bin/env tsx

// Treasure Database Seeder
//
// This script populates the Treasure table from the official D&D 5e treasure data
// Used for initial database setup and production deployment
//
// Usage: 
//   Development: npx tsx prisma/seed-treasures.ts [--force]
//   Production:  node -r tsx/cjs prisma/seed-treasures.ts [--force]
//
// Options:
//   --force    Delete all existing treasures before seeding

import { PrismaClient } from '@prisma/client'
import { treasureData } from './data/treasure-data'

const prisma = new PrismaClient()

async function seedTreasures(force: boolean = false) {
  console.log('💎 Starting treasure database seeding...')
  
  // Check existing treasures
  const existingTreasures = await prisma.treasure.findMany()
  console.log(`ℹ️  Found ${existingTreasures.length} existing treasures`)
  
  if (force) {
    console.log('🔄 Force flag detected - clearing existing treasures...')
    await prisma.treasure.deleteMany()
    console.log('✅ Cleared existing treasures')
  } else {
    // Create a map of existing treasure names for quick lookup
    const existingNames = new Set(existingTreasures.map(t => t.name))
    
    // Filter out treasures that already exist
    const newTreasures = treasureData.filter(t => !existingNames.has(t.name))
    
    if (newTreasures.length === 0) {
      console.log('✅ All treasures already exist in database')
      return
    }
    
    console.log(`🔄 Adding ${newTreasures.length} new treasures...`)
    
    // Process items sequentially to avoid connection pool issues
    for (const treasure of newTreasures) {
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
        // Continue with next treasure instead of throwing
      }
    }
    
    console.log(`✅ Successfully added ${newTreasures.length} new treasures`)
    return
  }
  
  // If we're here, we either cleared the data or this is a fresh database
  console.log('🔄 Adding all treasures...')
  
  // Process items sequentially to avoid connection pool issues
  let successCount = 0
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
      successCount++
    } catch (error) {
      console.error(`❌ Failed to add treasure ${treasure.name}:`, error)
      // Continue with next treasure instead of throwing
    }
  }
  
  console.log(`✅ Successfully added ${successCount} treasures`)
}

async function main() {
  try {
    const force = process.argv.includes('--force')
    await seedTreasures(force)
    console.log('🎉 Treasure seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding treasures:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Only run if this file is being executed directly
if (process.argv[1]?.endsWith('seed-treasures.ts')) {
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