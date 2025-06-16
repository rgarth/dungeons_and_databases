import { seedRaces } from './seed-races'
import { seedClasses } from './seed-classes'
import { seedBackgrounds } from './seed-backgrounds'
import { seedAlignments } from './seed-alignments'
import { seedArmor } from './seed-armor'
import { seedWeapons } from './seed-weapons'
import { seedEquipment } from './seed-equipment'
import { seedMagicalItems } from './seed-magical-items'
import { seedTreasures } from './seed-treasures'
import { seedEquipmentPacks } from './seed-equipment-packs'
import { seedArmorSuggestions } from './seed-armor-suggestions'
import { seedWeaponSuggestions } from './seed-weapon-suggestions'
import { seedSpellSuggestions } from './seed-spell-suggestions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting complete database seed...')

  try {
    // Basic data
    await seedRaces()
    await seedClasses()
    await seedBackgrounds()
    await seedAlignments()

    // Equipment
    await seedArmor()
    await seedWeapons()
    await seedEquipment()
    await seedMagicalItems()
    await seedTreasures()
    await seedEquipmentPacks()

    // Class-specific data
    await seedArmorSuggestions()
    await seedWeaponSuggestions()
    await seedSpellSuggestions()

    // Print final counts
    console.log('\n✅ Final database contents:')
    console.log(`Alignments: ${await prisma.alignment.count()}`)
    console.log(`Classes: ${await prisma.dndClass.count()}`)
    console.log(`Backgrounds: ${await prisma.background.count()}`)
    console.log(`Equipment: ${await prisma.equipment.count()}`)
    console.log(`Equipment Packs: ${await prisma.equipmentPack.count()}`)
    console.log(`Races: ${await prisma.dndRace.count()}`)
    console.log(`Magical Items: ${await prisma.magicalItem.count()}`)
    console.log(`Spells: ${await prisma.spell.count()}`)
    console.log(`Weapons: ${await prisma.weapon.count()}`)
    console.log(`Armor: ${await prisma.armor.count()}`)
    console.log(`Treasures: ${await prisma.treasure.count()}`)
    console.log(`Spell Suggestions: ${await prisma.classSpellSuggestion.count()}`)

    console.log('✅ Complete database seed finished successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Check if --force flag is provided
const force = process.argv.includes('--force')
if (!force) {
  console.log('⚠️  This will clear all existing data. Use --force to proceed.')
  process.exit(1)
}

main()