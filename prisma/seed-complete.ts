import { prisma } from '../src/lib/prisma'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

interface SeedOptions {
  force?: boolean
  skipIfExists?: boolean
  environment?: 'development' | 'production' | 'test'
}

// Check if data already exists in database
async function checkExistingData() {
  console.log('🔍 Checking existing data in database...')
  
  // Use sequential queries to avoid connection pool exhaustion
  const spellCount = await prisma.spell.count()
  const weaponCount = await prisma.weapon.count()
  const armorCount = await prisma.armor.count()
  const equipmentCount = await prisma.equipment.count()
  const magicalItemCount = await prisma.magicalItem.count()
  const treasureCount = await prisma.treasure.count()
  const alignmentCount = await prisma.alignment.count()
  const raceCount = await prisma.dndRace.count()
  const classCount = await prisma.dndClass.count()
  const backgroundCount = await prisma.background.count()
  const weaponSuggestionCount = await prisma.classWeaponSuggestion.count()
  const armorSuggestionCount = await prisma.classArmorSuggestion.count()
  
  const totals = {
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
    armorSuggestions: armorSuggestionCount
  }
  
  console.log('📊 Current database contents:')
  Object.entries(totals).forEach(([key, count]) => {
    console.log(`  ${key}: ${count}`)
  })
  
  const totalItems = Object.values(totals).reduce((sum, count) => sum + count, 0)
  const hasData = totalItems > 0
  
  console.log(`📈 Total items in database: ${totalItems}`)
  
  return { hasData, totals }
}

// Run individual seeding script sequentially
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

// Main seeding function with sequential execution
async function seedCompleteDatabase(options: SeedOptions = {}) {
  const { force = false, skipIfExists = false, environment = 'development' } = options
  
  console.log(`🌱 Starting COMPLETE D&D database seeding (${environment})...`)
  
  if (force) {
    console.log('⚠️  FORCE mode enabled - will overwrite existing data')
  }
  
  const { hasData } = await checkExistingData()
  
  if (hasData && skipIfExists) {
    console.log('✅ Database already contains data and --skip-if-exists flag is set. Skipping seeding.')
    return
  }
  
  if (hasData && !force) {
    console.log('⚠️  Database already contains data. Use --force to overwrite or --skip-if-exists to skip.')
    console.log('   Example: npm run db:seed:complete:force')
    return
  }
  
  console.log('\n🚀 Starting sequential seeding process...')
  
  // Run seeding scripts SEQUENTIALLY to avoid connection pool exhaustion
  const seedingSteps = [
    { script: 'prisma/seed-alignments.ts', description: 'Alignments' },
    { script: 'prisma/seed-races.ts', description: 'Races' },
    { script: 'prisma/seed-classes.ts', description: 'Classes' },
    { script: 'prisma/seed-backgrounds.ts', description: 'Backgrounds' },
    { script: 'prisma/seed.ts', description: 'Core Items (Spells, Weapons, Armor, Equipment)' },
    { script: 'prisma/seed-treasures.ts', description: 'Magical Items & Treasures' },
    { script: 'prisma/seed-weapon-suggestions.ts', description: 'Weapon Suggestions' },
    { script: 'prisma/seed-armor-suggestions.ts', description: 'Armor Suggestions' },
    { script: 'prisma/seed-equipment-packs.ts', description: 'Equipment Packs' }
  ]
  
  for (const step of seedingSteps) {
    await runSeedingScript(step.script, step.description)
    // Small delay between scripts to allow connection cleanup
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  // Final verification
  console.log('\n🔍 Final verification...')
  const { totals } = await checkExistingData()
  
  console.log('\n🎉 COMPLETE D&D database seeding finished!')
  console.log('📊 Final database contents:')
  Object.entries(totals).forEach(([key, count]) => {
    console.log(`  ✅ ${key}: ${count}`)
  })
  
  const totalItems = Object.values(totals).reduce((sum, count) => sum + count, 0)
  console.log(`\n📈 Total items seeded: ${totalItems}`)
  
  if (totalItems > 1000) {
    console.log('🚀 Database is ready for D&D adventures!')
  } else {
    console.log('⚠️  Seeding may be incomplete. Check individual script outputs above.')
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