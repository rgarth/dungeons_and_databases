import { PrismaClient } from '@prisma/client'
import { armorData } from './data/armor-data'

const prisma = new PrismaClient()

export async function seedArmor() {
  console.log('🛡️ Seeding armor...')
  
  // Clear existing armor
  await prisma.armor.deleteMany()
  console.log('✅ Cleared existing armor')

  // Add new armor
  for (const armor of armorData) {
    try {
      await prisma.armor.create({
        data: {
          name: armor.name,
          type: armor.type,
          baseAC: armor.baseAC,
          maxDexBonus: armor.maxDexBonus,
          minStrength: armor.minStrength,
          stealthDisadvantage: armor.stealthDisadvantage,
          weight: armor.weight,
          cost: armor.cost,
          description: armor.description
        }
      })
      console.log(`✅ Added armor: ${armor.name}`)
    } catch (error) {
      console.error(`❌ Failed to add armor ${armor.name}:`, error)
    }
  }

  console.log('🎉 Armor seeding completed!')
}

// Keep the main function for direct execution
async function main() {
  try {
    await seedArmor()
    console.log('🎉 Armor seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding armor:', error)
    process.exit(1)
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