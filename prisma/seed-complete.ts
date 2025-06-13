import prisma from './client'
import { seedAlignments } from './seed-alignments'
import { seedClasses } from './seed-classes'
import { seedBackgrounds } from './seed-backgrounds'
import { seedEquipment } from './seed-equipment'
import { seedEquipmentPacks } from './seed-equipment-packs'
import { seedRaces } from './seed-races'
import { seedMagicalItems } from './seed-magical-items'
import { seedSpells } from './seed-spells'
import { seedWeapons } from './seed-weapons'
import { seedArmor } from './seed-armor'
import { seedTreasures } from './seed-treasures'

async function main() {
  console.log('Starting complete database seed...')

  try {
    // Check if database is empty
    const alignmentCount = await prisma.alignment.count()
    const classCount = await prisma.dndClass.count()
    const backgroundCount = await prisma.background.count()
    const equipmentCount = await prisma.equipment.count()
    const equipmentPackCount = await prisma.equipmentPack.count()
    const raceCount = await prisma.dndRace.count()
    const magicalItemCount = await prisma.magicalItem.count()
    const spellCount = await prisma.spell.count()
    const weaponCount = await prisma.weapon.count()
    const armorCount = await prisma.armor.count()
    const treasureCount = await prisma.treasure.count()

    const totalCount = alignmentCount + classCount + backgroundCount + equipmentCount + 
      equipmentPackCount + raceCount + magicalItemCount + spellCount + weaponCount +
      armorCount + treasureCount

    // Only seed if database is empty or --force flag is used
    if (totalCount > 0 && !process.argv.includes('--force')) {
      console.log('Database already contains data. Use --force to reseed.')
      return
    }

    // Seed in order of dependencies
    await seedAlignments()
    await seedClasses()
    await seedBackgrounds()
    await seedEquipment()
    await seedEquipmentPacks()
    await seedRaces()
    await seedMagicalItems()
    await seedSpells()
    await seedWeapons()
    await seedArmor()
    await seedTreasures()

    // Print final counts
    console.log('\nFinal database contents:')
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
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Only run if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
} 