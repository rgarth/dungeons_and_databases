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

async function main() {
  console.log('💎 Starting treasure database seeding...')
  
  try {
    // Check if treasures already exist
    const existingCount = await prisma.treasure.count()
    
    if (existingCount > 0) {
      console.log(`ℹ️  Found ${existingCount} existing treasures`)
      console.log('🔄 Clearing existing treasures for fresh seed...')
      await prisma.treasure.deleteMany()
    }
    
    console.log('💎 Seeding D&D 5e treasures...')
    
    // Seed treasures in batches for better performance
    const batchSize = 20
    for (let i = 0; i < treasureData.length; i += batchSize) {
      const batch = treasureData.slice(i, i + batchSize)
      await Promise.all(
        batch.map(treasure => prisma.treasure.create({ data: treasure }))
      )
      console.log(`   ✓ Seeded batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(treasureData.length / batchSize)}`)
    }
    
    // Verify seeding
    const finalCount = await prisma.treasure.count()
    console.log(`✅ Successfully seeded ${finalCount} treasures`)
    
    // Log treasure categories for verification
    const categories = await prisma.treasure.groupBy({
      by: ['type', 'category'],
      _count: { _all: true },
      orderBy: [{ type: 'asc' }, { category: 'asc' }]
    })
    
    console.log('\n📊 Treasure Distribution:')
    categories.forEach(({ type, category, _count }) => {
      console.log(`   ${type} (${category}): ${_count._all} items`)
    })
    
    console.log('\n🎉 Treasure seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding treasures:', error)
    throw error
  }
}

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