import { PrismaClient } from '@prisma/client'
import { weaponsData } from './data/weapons-data'

const prisma = new PrismaClient()

export async function seedWeapons() {
  console.log('⚔️ Seeding weapons...')
  
  try {
    // First delete custom weapons that reference these weapons
    await prisma.customWeapon.deleteMany()
    console.log('✅ Cleared custom weapons')

    // Then clear existing weapons
    await prisma.weapon.deleteMany()
    console.log('✅ Cleared existing weapons')

    // Create new weapons
    for (const weapon of weaponsData) {
      await prisma.weapon.create({
        data: {
          name: weapon.name,
          type: weapon.type,
          category: weapon.category,
          damage: weapon.damage,
          damageType: weapon.damageType,
          properties: weapon.properties,
          weight: weapon.weight,
          cost: weapon.cost,
          description: weapon.description
        }
      })
    }

    console.log(`✅ Seeded ${weaponsData.length} weapons`)
  } catch (error) {
    console.error('❌ Error seeding weapons:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Only run if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedWeapons()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
} 