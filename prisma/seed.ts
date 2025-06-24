import { PrismaClient } from '@prisma/client'
import {
  weaponsData,
  armorData,
  equipmentData,
  spellsData,
  treasureData,
  classesData,
  classArmorProficiencies,
  classWeaponProficiencies,
  backgroundsData,
  racesData,
  alignmentsData,
  magicalItemsData,
  equipmentPacksData,
  classWeaponSuggestionsData,
  classArmorSuggestionsData
} from './data'
import { seedSubraces } from './seed-subraces'

const prisma = new PrismaClient()

// Core D&D 5e SRD Content Database Seeding
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document

// Type guard for Prisma error
function isPrismaError(e: unknown): e is { code: string } {
  return typeof e === 'object' && e !== null && 'code' in e && typeof (e as { code: unknown }).code === 'string';
}

async function main() {
  console.log('🌱 Starting database seed...')
  
  // Clear existing data in correct order (respecting foreign key constraints)
  await prisma.equipmentPackItem.deleteMany()
  await prisma.equipmentPack.deleteMany()
  await prisma.classWeaponSuggestion.deleteMany()
  await prisma.classArmorSuggestion.deleteMany()
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
  
  console.log('🗑️  Cleared existing data')
  
  // Seed spells
  console.log('📜 Seeding spells...')
  for (const spell of spellsData) {
    await prisma.spell.create({ data: spell })
  }
  console.log(`✅ Created ${spellsData.length} spells`)
  
  // Seed weapons
  console.log('⚔️  Seeding weapons...')
  for (const weapon of weaponsData) {
    await prisma.weapon.create({ data: weapon })
  }
  console.log(`✅ Created ${weaponsData.length} weapons`)
  
  // Seed armor
  console.log('🛡️  Seeding armor...')
  for (const armor of armorData) {
    await prisma.armor.create({ data: armor })
  }
  console.log(`✅ Created ${armorData.length} armor pieces`)
  
  // Seed equipment
  console.log('🎒 Seeding equipment...')
  for (const equipment of equipmentData) {
    await prisma.equipment.create({ data: equipment })
  }
  console.log(`✅ Created ${equipmentData.length} equipment items`)
  
  // Seed treasures
  console.log('💎 Seeding treasures...')
  for (const treasure of treasureData) {
    await prisma.treasure.create({ data: treasure })
  }
  console.log(`✅ Created ${treasureData.length} treasures`)
  
  // Seed classes
  console.log('🧙‍♂️ Seeding classes...')
  for (const classData of classesData) {
    await prisma.dndClass.create({
      data: {
        name: classData.name,
        description: classData.description,
        hitDie: classData.hitDie,
        primaryAbility: classData.primaryAbility,
        savingThrows: JSON.stringify(classData.savingThrows),
        skillChoices: JSON.stringify(classData.skillChoices)
      }
    })
  }
  console.log(`✅ Created ${classesData.length} classes`)

  // Seed armor proficiencies
  console.log('🛡️ Seeding armor proficiencies...')
  for (const prof of classArmorProficiencies) {
    const classRecord = await prisma.dndClass.findUnique({
      where: { name: prof.className }
    })
    if (classRecord) {
      await prisma.classArmorProficiency.create({
        data: {
          classId: classRecord.id,
          armorType: prof.armorType
        }
      })
    }
  }

  // Seed weapon proficiencies
  console.log('⚔️ Seeding weapon proficiencies...')
  for (const prof of classWeaponProficiencies) {
    const classRecord = await prisma.dndClass.findUnique({
      where: { name: prof.className }
    })
    if (classRecord) {
      await prisma.classWeaponProficiency.create({
        data: {
          classId: classRecord.id,
          proficiencyType: prof.proficiencyType,
          weaponName: prof.weaponName
        }
      })
    }
  }

  // Seed weapon suggestions
  console.log('⚔️ Seeding weapon suggestions...')
  for (const suggestion of classWeaponSuggestionsData) {
    const classRecord = await prisma.dndClass.findUnique({
      where: { name: suggestion.className }
    })
    if (classRecord) {
      for (const weapon of suggestion.suggestions) {
        await prisma.classWeaponSuggestion.create({
          data: {
            classId: classRecord.id,
            weaponName: weapon.weaponName,
            quantity: weapon.quantity,
            reason: weapon.reason
          }
        })
      }
    }
  }

  // Seed armor suggestions
  console.log('🛡️ Seeding armor suggestions...')
  for (const suggestion of classArmorSuggestionsData) {
    const classRecord = await prisma.dndClass.findUnique({
      where: { name: suggestion.className }
    })
    if (classRecord) {
      for (const armor of suggestion.suggestions) {
        await prisma.classArmorSuggestion.create({
          data: {
            classId: classRecord.id,
            armorName: armor.armorName,
            reason: armor.reason
          }
        })
      }
    }
  }
  
  // Seed backgrounds
  console.log('👥 Seeding backgrounds...')
  for (const background of backgroundsData) {
    await prisma.background.create({
      data: {
        name: background.name,
        description: background.description,
        skillProficiencies: JSON.stringify(background.skillProficiencies),
        languages: JSON.stringify(background.languages),
        equipment: JSON.stringify(background.equipment),
        feature: background.feature,
        featureDescription: background.featureDescription,
        suggestedCharacteristics: background.suggestedCharacteristics ? JSON.stringify(background.suggestedCharacteristics) : undefined
      }
    })
  }
  console.log(`✅ Created ${backgroundsData.length} backgrounds`)

  // Seed races
  console.log('🧝‍♂️ Seeding races...')
  for (const race of racesData) {
    await prisma.dndRace.create({
      data: {
        name: race.name,
        description: race.description,
        abilityScoreIncrease: JSON.stringify(race.abilityScoreIncrease),
        size: race.size,
        speed: race.speed,
        traits: JSON.stringify(race.traits),
        languages: JSON.stringify(race.languages)
      }
    })
  }
  console.log(`✅ Created ${racesData.length} races`)

  // Seed subraces
  await seedSubraces()

  // Seed alignments
  console.log('⚖️ Seeding alignments...')
  for (const alignment of alignmentsData) {
    await prisma.alignment.create({
      data: {
        name: alignment.name,
        shortName: alignment.shortName,
        description: alignment.description,
        ethicalAxis: alignment.ethicalAxis,
        moralAxis: alignment.moralAxis
      }
    })
  }
  console.log(`✅ Created ${alignmentsData.length} alignments`)

  // Seed magical items
  console.log('✨ Seeding magical items...')
  const magicalItemNames = new Set<string>()
  for (const item of magicalItemsData) {
    if (magicalItemNames.has(item.name)) {
      console.warn(`⚠️ Duplicate magical item skipped: ${item.name}`)
      continue
    }
    magicalItemNames.add(item.name)
    try {
      await prisma.magicalItem.create({
        data: {
          name: item.name,
          type: item.type,
          rarity: item.rarity,
          requiresAttunement: item.requiresAttunement,
          description: item.description,
          weight: item.weight,
          cost: item.cost,
          effects: item.effects ? JSON.stringify(item.effects) : undefined,
          stackable: item.stackable,
          consumable: item.consumable
        }
      })
    } catch (e: unknown) {
      if (isPrismaError(e) && e.code === 'P2002') {
        console.warn(`⚠️ Duplicate magical item in DB skipped: ${item.name}`)
      } else {
        console.error(`❌ Error seeding magical item: ${item.name}`, e)
      }
    }
  }
  console.log(`✅ Created magical items (skipped duplicates)`)

  // Seed equipment packs
  console.log('🎒 Seeding equipment packs...')
  for (const pack of equipmentPacksData) {
    const createdPack = await prisma.equipmentPack.create({
      data: {
        name: pack.name,
        description: pack.description,
        cost: pack.cost
      }
    })

    // Create pack items
    for (const item of pack.items) {
      const equipment = await prisma.equipment.findUnique({
        where: { name: item.equipmentName }
      })
      if (equipment) {
        await prisma.equipmentPackItem.create({
          data: {
            packId: createdPack.id,
            equipmentId: equipment.id,
            quantity: item.quantity
          }
        })
      }
    }
  }
  console.log(`✅ Created ${equipmentPacksData.length} equipment packs`)
  
  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 