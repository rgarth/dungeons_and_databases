import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const prisma = new PrismaClient()

interface SeedOptions {
  force?: boolean
  skipIfExists?: boolean
  environment?: 'development' | 'production' | 'test'
}

async function checkExistingData() {
  const [
    spellCount, weaponCount, armorCount, equipmentCount, magicalItemCount, treasureCount,
    alignmentCount, raceCount, classCount, backgroundCount, weaponSuggestionCount, armorSuggestionCount
  ] = await Promise.all([
    prisma.spell.count(),
    prisma.weapon.count(),
    prisma.armor.count(),
    prisma.equipment.count(),
    prisma.magicalItem.count(),
    prisma.treasure.count(),
    prisma.alignment.count(),
    prisma.dndRace.count(),
    prisma.dndClass.count(),
    prisma.background.count(),
    prisma.classWeaponSuggestion.count(),
    prisma.classArmorSuggestion.count()
  ])
  
  return {
    spells: spellCount,
    weapons: weaponCount,
    armor: armorCount,
    equipment: equipmentCount,
    magicalItems: magicalItemCount,
    treasures: treasureCount,
    alignments: alignmentCount,
    races: raceCount,
    classes: classCount,
    backgrounds: backgroundCount,
    weaponSuggestions: weaponSuggestionCount,
    armorSuggestions: armorSuggestionCount,
    total: spellCount + weaponCount + armorCount + equipmentCount + magicalItemCount + treasureCount + alignmentCount + raceCount + classCount + backgroundCount
  }
}

async function runSeedingScript(scriptPath: string, description: string) {
  console.log(`🚀 Running ${description}...`)
  try {
    const { stdout, stderr } = await execAsync(`npx tsx ${scriptPath}`)
    if (stdout) console.log(stdout.trim())
    if (stderr) console.error(stderr.trim())
  } catch (error) {
    console.error(`❌ Failed to run ${description}:`, error)
    throw error
  }
}

export async function seedCompleteDatabase(options: SeedOptions = {}) {
  const {
    force = false,
    skipIfExists = false,
    environment = process.env.NODE_ENV as SeedOptions['environment'] || 'development'
  } = options
  
  console.log(`🌱 Starting COMPLETE D&D database seeding (${environment})...`)
  
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
    }
    
    // Run all seeding scripts in the correct order
    console.log('🚀 Beginning character creation data seeding...')
    
    await runSeedingScript('prisma/seed-alignments.ts', 'alignments seeding')
    await runSeedingScript('prisma/seed-races.ts', 'races seeding')
    await runSeedingScript('prisma/seed-classes.ts', 'classes seeding')
    await runSeedingScript('prisma/seed-backgrounds.ts', 'backgrounds seeding')
    
    console.log('🚀 Beginning equipment suggestions seeding...')
    
    await runSeedingScript('prisma/seed-weapon-suggestions.ts', 'weapon suggestions seeding')
    await runSeedingScript('prisma/seed-armor-suggestions.ts', 'armor suggestions seeding')
    
    console.log('🚀 Beginning item content seeding...')
    
    await runSeedingScript('prisma/seed-production.ts', 'items seeding')
    
    console.log('🚀 Beginning equipment packs seeding...')
    
    await runSeedingScript('prisma/seed-equipment-packs.ts', 'equipment packs seeding')
    
    // Validate results
    const finalCounts = await checkExistingData()
    
    console.log('🔍 Validating seeded data...')
    
    const validation = {
      spells: finalCounts.spells >= 396,
      weapons: finalCounts.weapons >= 37,
      armor: finalCounts.armor >= 16,
      equipment: finalCounts.equipment >= 105,
      alignments: finalCounts.alignments >= 9,
      races: finalCounts.races >= 12,
      classes: finalCounts.classes >= 12,
      backgrounds: finalCounts.backgrounds >= 12,
      weaponSuggestions: finalCounts.weaponSuggestions >= 20,
      armorSuggestions: finalCounts.armorSuggestions >= 15
    }
    
    const allValid = Object.values(validation).every(Boolean)
    
    if (allValid) {
      console.log('✅ Data validation successful!')
      console.log(`📊 Total items: ${finalCounts.total}`)
      console.log(`📊 Character creation data: ${finalCounts.alignments + finalCounts.races + finalCounts.classes + finalCounts.backgrounds} items`)
      console.log(`📊 Equipment suggestions: ${finalCounts.weaponSuggestions + finalCounts.armorSuggestions} items`)
    } else {
      console.error('❌ Data validation failed!')
      console.error('Expected minimums: spells=396, weapons=37, armor=16, equipment=105, alignments=9, races=12, classes=12, backgrounds=12')
      console.error('Actual:', finalCounts)
      throw new Error('Seeding validation failed')
    }
    
    console.log('🎉 COMPLETE D&D database seeding completed successfully!')
    
    return finalCounts
    
  } catch (error) {
    console.error('💥 Complete seeding failed:', error)
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
    await seedCompleteDatabase({ force, skipIfExists, environment })
  } catch (error) {
    console.error('Complete database seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
} 