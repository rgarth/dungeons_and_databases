import { PrismaClient } from '@prisma/client'
import { spellsData } from './data/spells-data'

const prisma = new PrismaClient()

async function seedSpells() {
  console.log('🧙‍♂️ Seeding spells...')
  
  // Clear existing spells
  await prisma.spell.deleteMany()
  console.log('✅ Cleared existing spells')

  // Add new spells
  for (const spell of spellsData) {
    try {
      await prisma.spell.create({
        data: spell
      })
      console.log(`✅ Added spell: ${spell.name}`)
    } catch (error) {
      console.error(`❌ Failed to add spell ${spell.name}:`, error)
    }
  }

  console.log('🎉 Spells seeding completed!')
}

export { seedSpells } 