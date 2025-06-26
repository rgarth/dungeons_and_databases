import { PrismaClient } from '@prisma/client'
import { spellsData, weaponsData, armorData, equipmentData } from './data'
import { magicalItemsData } from './data/magical-items-data'
import { treasureData } from './data/treasure-data'
import { seedRaces } from './seed-races'
import { seedClasses } from './seed-classes'
import { seedBackgrounds } from './seed-backgrounds'
import { seedAlignments } from './seed-alignments'
import { seedEquipmentPacks } from './seed-equipment-packs'
import { seedWeaponSuggestions } from './seed-weapon-suggestions'
import { seedArmorSuggestions } from './seed-armor-suggestions'
import { seedSpellSuggestions } from './seed-spell-suggestions'
import { seedClassSpellLimits } from './seed-class-spell-limits'
import { seedSpellLevelLimits } from './seed-spell-level-limits'

const prisma = new PrismaClient()

interface SeedOptions {
  force?: boolean
  skipIfExists?: boolean
  environment?: 'development' | 'production' | 'test'
}

async function checkExistingData() {
  const [spellCount, weaponCount, armorCount, equipmentCount, magicalItemCount, treasureCount, raceCount, classCount, backgroundCount, alignmentCount, equipmentPackCount, weaponSuggestionCount, armorSuggestionCount, spellSuggestionCount, spellLimitsCount] = await Promise.all([
    prisma.spell.count(),
    prisma.weapon.count(),
    prisma.armor.count(),
    prisma.equipment.count(),
    prisma.magicalItem.count(),
    prisma.treasure.count(),
    prisma.dndRace.count(),
    prisma.dndClass.count(),
    prisma.background.count(),
    prisma.alignment.count(),
    prisma.equipmentPack.count(),
    prisma.classWeaponSuggestion.count(),
    prisma.classArmorSuggestion.count(),
    prisma.classSpellSuggestion.count(),
    prisma.classSpellLimits.count()
  ])
  
  return {
    spells: spellCount,
    weapons: weaponCount,
    armor: armorCount,
    equipment: equipmentCount,
    magicalItems: magicalItemCount,
    treasures: treasureCount,
    races: raceCount,
    classes: classCount,
    backgrounds: backgroundCount,
    alignments: alignmentCount,
    equipmentPacks: equipmentPackCount,
    weaponSuggestions: weaponSuggestionCount,
    armorSuggestions: armorSuggestionCount,
    spellSuggestions: spellSuggestionCount,
    spellLimits: spellLimitsCount,
    total: spellCount + weaponCount + armorCount + equipmentCount + magicalItemCount + treasureCount + raceCount + classCount + backgroundCount + alignmentCount + equipmentPackCount + weaponSuggestionCount + armorSuggestionCount + spellSuggestionCount + spellLimitsCount
  }
}

async function clearExistingData() {
  console.log('🗑️  Clearing existing D&D content...')
  
  // Clear in order to avoid foreign key constraints
  await prisma.equipmentPackItem.deleteMany()
  await prisma.equipmentPack.deleteMany()
  await prisma.classWeaponSuggestion.deleteMany()
  await prisma.classArmorSuggestion.deleteMany()
  await prisma.classSpellSuggestion.deleteMany()
  await prisma.classSpellLimits.deleteMany()
  await prisma.classWeaponProficiency.deleteMany()
  await prisma.classArmorProficiency.deleteMany()
  await prisma.dndClass.deleteMany()
  await prisma.background.deleteMany()
  await prisma.dndRace.deleteMany()
  await prisma.alignment.deleteMany()
  await prisma.magicalItem.deleteMany()
  await prisma.treasure.deleteMany()
  await prisma.equipment.deleteMany()
  await prisma.armor.deleteMany()
  await prisma.weapon.deleteMany()
  await prisma.spell.deleteMany()
  
  console.log('✅ Existing content cleared')
}

async function seedSpells() {
  console.log('📚 Seeding spells...')
  const createdSpells = await prisma.spell.createMany({
    data: spellsData,
    skipDuplicates: true
  })
  console.log(`✅ Created ${createdSpells.count} spells`)
}

async function seedWeapons() {
  console.log('⚔️  Seeding weapons...')
  const createdWeapons = await prisma.weapon.createMany({
    data: weaponsData,
    skipDuplicates: true
  })
  console.log(`✅ Created ${createdWeapons.count} weapons`)
}

async function seedArmor() {
  console.log('🛡️  Seeding armor...')
  const createdArmor = await prisma.armor.createMany({
    data: armorData,
    skipDuplicates: true
  })
  console.log(`✅ Created ${createdArmor.count} armor pieces`)
}

async function seedEquipment() {
  console.log('🎒 Seeding equipment...')
  const createdEquipment = await prisma.equipment.createMany({
    data: equipmentData,
    skipDuplicates: true
  })
  console.log(`✅ Created ${createdEquipment.count} equipment items`)
}

async function seedMagicalItems() {
  console.log('✨ Seeding magical items...')
  const createdMagicalItems = await prisma.magicalItem.createMany({
    data: magicalItemsData,
    skipDuplicates: true
  })
  console.log(`✅ Created ${createdMagicalItems.count} magical items`)
}

async function seedTreasures() {
  console.log('💰 Seeding treasures...')
  const createdTreasures = await prisma.treasure.createMany({
    data: treasureData,
    skipDuplicates: true
  })
  console.log(`✅ Created ${createdTreasures.count} treasures`)
}

async function validateSeeding() {
  console.log('🔍 Validating seeding results...')
  const counts = await checkExistingData()
  
  console.log('📊 Final counts:')
  console.log(`  Spells: ${counts.spells}`)
  console.log(`  Weapons: ${counts.weapons}`)
  console.log(`  Armor: ${counts.armor}`)
  console.log(`  Equipment: ${counts.equipment}`)
  console.log(`  Magical Items: ${counts.magicalItems}`)
  console.log(`  Treasures: ${counts.treasures}`)
  console.log(`  Races: ${counts.races}`)
  console.log(`  Classes: ${counts.classes}`)
  console.log(`  Backgrounds: ${counts.backgrounds}`)
  console.log(`  Alignments: ${counts.alignments}`)
  console.log(`  Equipment Packs: ${counts.equipmentPacks}`)
  console.log(`  Weapon Suggestions: ${counts.weaponSuggestions}`)
  console.log(`  Armor Suggestions: ${counts.armorSuggestions}`)
  console.log(`  Spell Suggestions: ${counts.spellSuggestions}`)
  console.log(`  Spell Limits: ${counts.spellLimits}`)
  console.log(`  Total: ${counts.total} items`)
  
  return counts
}

export async function seedDatabase(options: SeedOptions = {}) {
  const { force = false, skipIfExists = false, environment = 'development' } = options
  
  try {
    console.log('🚀 Starting D&D database seeding...')
    console.log(`🌍 Environment: ${environment}`)
    
    // Check for existing data
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
    
    // Perform seeding in order to respect foreign key dependencies
    console.log('🚀 Beginning content seeding...')
    
    // First, seed independent tables (no foreign keys)
    await seedAlignments()
    await seedRaces()
    await seedBackgrounds()
    await seedSpells()
    await seedWeapons()
    await seedArmor()
    await seedEquipment()
    await seedMagicalItems()
    await seedTreasures()
    
    // Then seed dependent tables (with foreign keys)
    await seedClasses() // Depends on weapons, armor, spells
    await seedEquipmentPacks() // Depends on equipment
    await seedWeaponSuggestions() // Depends on classes and weapons
    await seedArmorSuggestions() // Depends on classes and armor
    await seedSpellSuggestions() // Depends on spells
    await seedClassSpellLimits() // Depends on classes and spells
    await seedSpellLevelLimits() // Depends on spells
    
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