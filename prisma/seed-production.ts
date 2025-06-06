import { PrismaClient } from '@prisma/client'
import { spellsData, weaponsData, armorData, equipmentData, contentCounts } from './data'
import { magicalItemsData } from './data/magical-items-data'

const prisma = new PrismaClient()

interface SeedOptions {
  force?: boolean // Force re-seed even if data exists
  skipIfExists?: boolean // Skip seeding if data already exists
  environment?: 'development' | 'production' | 'test'
}

async function checkExistingData() {
  const [spellCount, weaponCount, armorCount, equipmentCount, magicalItemCount] = await Promise.all([
    prisma.spell.count(),
    prisma.weapon.count(),
    prisma.armor.count(),
    prisma.equipment.count(),
    prisma.magicalItem.count()
  ])
  
  return {
    spells: spellCount,
    weapons: weaponCount,
    armor: armorCount,
    equipment: equipmentCount,
    magicalItems: magicalItemCount,
    total: spellCount + weaponCount + armorCount + equipmentCount + magicalItemCount
  }
}

async function clearExistingData() {
  console.log('🗑️  Clearing existing D&D content...')
  
  // Clear in order to avoid foreign key constraints
  await prisma.spell.deleteMany()
  await prisma.weapon.deleteMany()
  await prisma.armor.deleteMany()
  await prisma.equipment.deleteMany()
  await prisma.magicalItem.deleteMany()
  
  console.log('✅ Existing content cleared')
}

async function seedSpells() {
  console.log('📜 Seeding spells...')
  
  for (const spell of spellsData) {
    await prisma.spell.upsert({
      where: { name: spell.name },
      update: spell,
      create: spell
    })
  }
  
  console.log(`✅ Seeded ${spellsData.length} spells`)
}

async function seedWeapons() {
  console.log('⚔️  Seeding weapons...')
  
  for (const weapon of weaponsData) {
    await prisma.weapon.upsert({
      where: { name: weapon.name },
      update: weapon,
      create: weapon
    })
  }
  
  console.log(`✅ Seeded ${weaponsData.length} weapons`)
}

async function seedArmor() {
  console.log('🛡️  Seeding armor...')
  
  for (const armor of armorData) {
    await prisma.armor.upsert({
      where: { name: armor.name },
      update: armor,
      create: armor
    })
  }
  
  console.log(`✅ Seeded ${armorData.length} armor pieces`)
}

async function seedEquipment() {
  console.log('🎒 Seeding equipment...')
  
  for (const equipment of equipmentData) {
    await prisma.equipment.upsert({
      where: { name: equipment.name },
      update: equipment,
      create: equipment
    })
  }
  
  console.log(`✅ Seeded ${equipmentData.length} equipment items`)
}

async function seedMagicalItems() {
  console.log('✨ Seeding magical items...')
  
  for (const item of magicalItemsData) {
    await prisma.magicalItem.upsert({
      where: { name: item.name },
      update: item,
      create: item
    })
  }
  
  console.log(`✅ Seeded ${magicalItemsData.length} magical items`)
}

async function validateSeeding() {
  console.log('🔍 Validating seeded data...')
  
  const finalCounts = await checkExistingData()
  
  const validation = {
    spells: finalCounts.spells === contentCounts.spells,
    weapons: finalCounts.weapons === contentCounts.weapons,
    armor: finalCounts.armor === contentCounts.armor,
    equipment: finalCounts.equipment === contentCounts.equipment
  }
  
  const allValid = Object.values(validation).every(Boolean)
  
  if (allValid) {
    console.log('✅ Data validation successful!')
    console.log(`📊 Total items: ${finalCounts.total}`)
  } else {
    console.error('❌ Data validation failed!')
    console.error('Expected:', contentCounts)
    console.error('Actual:', finalCounts)
    throw new Error('Seeding validation failed')
  }
  
  return finalCounts
}

export async function seedDatabase(options: SeedOptions = {}) {
  const {
    force = false,
    skipIfExists = false,
    environment = process.env.NODE_ENV as SeedOptions['environment'] || 'development'
  } = options
  
  console.log(`🌱 Starting D&D database seeding (${environment})...`)
  console.log(`📦 Content to seed: ${contentCounts.total} items total`)
  
  try {
    // Check existing data
    const existingCounts = await checkExistingData()
    const hasExistingData = existingCounts.total > 0
    
    if (hasExistingData) {
      console.log(`📊 Found existing data: ${existingCounts.total} items`)
      
      if (skipIfExists) {
        console.log('⏭️  Skipping seeding - data already exists')
        return existingCounts
      }
      
      if (!force && environment === 'production') {
        console.log('⚠️  Production environment detected with existing data')
        console.log('🔒 Use --force flag to override in production')
        return existingCounts
      }
      
      if (force) {
        await clearExistingData()
      }
    }
    
    // Perform seeding
    console.log('🚀 Beginning content seeding...')
    
    await Promise.all([
      seedSpells(),
      seedWeapons(), 
      seedArmor(),
      seedEquipment(),
      seedMagicalItems()
    ])
    
    // Validate results
    const finalCounts = await validateSeeding()
    
    console.log('🎉 D&D database seeding completed successfully!')
    
    return finalCounts
    
  } catch (error) {
    console.error('💥 Seeding failed:', error)
    throw error
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const skipIfExists = args.includes('--skip-if-exists')
  const environment = process.env.NODE_ENV as SeedOptions['environment']
  
  try {
    await seedDatabase({ force, skipIfExists, environment })
  } catch (error) {
    console.error('Database seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
} 