import { PrismaClient } from '@prisma/client'
import { weaponsData } from './data/weapons-data'

const prisma = new PrismaClient()

async function seedWeapons() {
  console.log('⚔️ Seeding weapons...')
  
  // Clear existing weapons
  await prisma.weapon.deleteMany()
  console.log('✅ Cleared existing weapons')

  // Add new weapons
  for (const weapon of weaponsData) {
    try {
      await prisma.weapon.create({
        data: {
          name: weapon.name,
          type: weapon.type,
          category: weapon.category,
          cost: weapon.cost,
          damage: weapon.damage,
          damageType: weapon.damageType,
          weight: weapon.weight,
          properties: weapon.properties,
          description: weapon.description
        }
      })
      console.log(`✅ Added weapon: ${weapon.name}`)
    } catch (error) {
      console.error(`❌ Failed to add weapon ${weapon.name}:`, error)
    }
  }

  console.log('🎉 Weapons seeding completed!')
}

export { seedWeapons } 