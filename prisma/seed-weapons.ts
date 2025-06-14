import { PrismaClient } from '@prisma/client'
import { weaponsData } from './data/weapons-data'

const prisma = new PrismaClient()

async function seedWeapons() {
  console.log('⚔️ Seeding weapons...')
  
  try {
    // Clear existing weapons
    await prisma.weapon.deleteMany()
    console.log('✅ Cleared existing weapons')

    // Add new weapons
    for (const weapon of weaponsData) {
      try {
        const weaponData = {
          name: weapon.name,
          type: weapon.type,
          category: weapon.category,
          cost: weapon.cost,
          damage: weapon.damage,
          damageType: weapon.damageType,
          weight: weapon.weight,
          properties: weapon.properties,
          ...(weapon.description && { description: weapon.description })
        }
        
        await prisma.weapon.create({
          data: weaponData
        })
        console.log(`✅ Added weapon: ${weapon.name}`)
      } catch (error) {
        console.error(`❌ Failed to add weapon ${weapon.name}:`, error)
      }
    }

    console.log('🎉 Weapons seeding completed!')
  } catch (error) {
    console.error('❌ Error during weapons seeding:', error)
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

export { seedWeapons } 