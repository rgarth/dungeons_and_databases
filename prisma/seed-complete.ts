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
import { seedWeaponSuggestions } from './seed-weapon-suggestions'
import { seedArmorSuggestions } from './seed-armor-suggestions'

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
      console.log('\n⚠️  Database already contains data. Skipping seeds:')
      if (alignmentCount > 0) console.log('  ⏭️  Skipping alignments (count: ' + alignmentCount + ')')
      if (classCount > 0) console.log('  ⏭️  Skipping classes (count: ' + classCount + ')')
      if (backgroundCount > 0) console.log('  ⏭️  Skipping backgrounds (count: ' + backgroundCount + ')')
      if (equipmentCount > 0) console.log('  ⏭️  Skipping equipment (count: ' + equipmentCount + ')')
      if (equipmentPackCount > 0) console.log('  ⏭️  Skipping equipment packs (count: ' + equipmentPackCount + ')')
      if (raceCount > 0) console.log('  ⏭️  Skipping races (count: ' + raceCount + ')')
      if (magicalItemCount > 0) console.log('  ⏭️  Skipping magical items (count: ' + magicalItemCount + ')')
      if (spellCount > 0) console.log('  ⏭️  Skipping spells (count: ' + spellCount + ')')
      if (weaponCount > 0) console.log('  ⏭️  Skipping weapons (count: ' + weaponCount + ')')
      if (armorCount > 0) console.log('  ⏭️  Skipping armor (count: ' + armorCount + ')')
      if (treasureCount > 0) console.log('  ⏭️  Skipping treasures (count: ' + treasureCount + ')')
      console.log('\nUse --force to reseed everything.')
      return
    }

    // Seed in order of dependencies
    console.log('\n🌱 Starting seeds in order:')
    console.log('1. Seeding alignments...')
    await seedAlignments()
    console.log('2. Seeding classes...')
    await seedClasses()
    console.log('3. Seeding backgrounds...')
    await seedBackgrounds()
    console.log('4. Seeding equipment...')
    await seedEquipment()
    console.log('5. Seeding equipment packs...')
    await seedEquipmentPacks()
    console.log('6. Seeding races...')
    await seedRaces()
    console.log('7. Seeding magical items...')
    await seedMagicalItems()
    console.log('8. Seeding spells...')
    await seedSpells()
    console.log('9. Seeding weapons...')
    await seedWeapons()
    console.log('10. Seeding armor...')
    await seedArmor()
    console.log('11. Seeding treasures...')
    await seedTreasures()
    console.log('12. Seeding weapon suggestions...')
    await seedWeaponSuggestions()
    console.log('13. Seeding armor suggestions...')
    await seedArmorSuggestions()

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
  } catch (error) {
    console.error('❌ Error during seeding:', error)
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