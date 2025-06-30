import prisma from './client'
import { spellsData } from './data/spells-data'

async function seedSpells() {
  console.log('🧙‍♂️ Seeding spells...')
  
  try {
    // Clear existing spells
    await prisma.spell.deleteMany()
    console.log('✅ Cleared existing spells')

    // Add new spells
    for (const spell of spellsData) {
      try {
        const spellData = {
          ...spell,
          classes: JSON.stringify(JSON.parse(spell.classes))
        }
        
        await prisma.spell.create({
          data: spellData
        })
        console.log(`✅ Added spell: ${spell.name}`)
      } catch (error) {
        console.error(`❌ Failed to add spell ${spell.name}:`, error)
      }
    }

    console.log('🎉 Spells seeding completed!')
  } catch (error) {
    console.error('❌ Error during spells seeding:', error)
    throw error
  }
}

// Only run if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedSpells()
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
}

export { seedSpells } 