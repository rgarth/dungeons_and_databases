import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const magicalItemsData = [
  // Common Magical Items
  {
    name: "Potion of Healing",
    rarity: "Common",
    type: "Potion",
    description: "A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points.",
    requiresAttunement: false,
    value: 50
  },
  {
    name: "Potion of Greater Healing",
    rarity: "Uncommon",
    type: "Potion",
    description: "A character who drinks the magical red fluid in this vial regains 4d4 + 4 hit points.",
    requiresAttunement: false,
    value: 100
  },
  {
    name: "Potion of Superior Healing",
    rarity: "Rare",
    type: "Potion",
    description: "A character who drinks the magical red fluid in this vial regains 8d4 + 8 hit points.",
    requiresAttunement: false,
    value: 500
  },
  {
    name: "Potion of Supreme Healing",
    rarity: "Very Rare",
    type: "Potion",
    description: "A character who drinks the magical red fluid in this vial regains 10d4 + 20 hit points.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Fire Breath",
    rarity: "Uncommon",
    type: "Potion",
    description: "After drinking this potion, you can use a bonus action to exhale fire at a target within 30 feet of you.",
    requiresAttunement: false,
    value: 150
  },
  {
    name: "Potion of Flying",
    rarity: "Very Rare",
    type: "Potion",
    description: "When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Invisibility",
    rarity: "Very Rare",
    type: "Potion",
    description: "This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Mind Reading",
    rarity: "Rare",
    type: "Potion",
    description: "When you drink this potion, you gain the effect of the detect thoughts spell (save DC 13).",
    requiresAttunement: false,
    value: 500
  },
  {
    name: "Potion of Water Breathing",
    rarity: "Uncommon",
    type: "Potion",
    description: "You can breathe underwater for 1 hour after drinking this potion.",
    requiresAttunement: false,
    value: 150
  },
  {
    name: "Potion of Animal Friendship",
    rarity: "Uncommon",
    type: "Potion",
    description: "When you drink this potion, you can cast the animal friendship spell (save DC 13) for 1 hour at will.",
    requiresAttunement: false,
    value: 150
  },
  {
    name: "Potion of Diminution",
    rarity: "Rare",
    type: "Potion",
    description: "When you drink this potion, you gain the \"reduce\" effect of the enlarge/reduce spell for 1d4 hours.",
    requiresAttunement: false,
    value: 500
  },
  {
    name: "Potion of Growth",
    rarity: "Uncommon",
    type: "Potion",
    description: "When you drink this potion, you gain the \"enlarge\" effect of the enlarge/reduce spell for 1d4 hours.",
    requiresAttunement: false,
    value: 150
  },
  {
    name: "Potion of Heroism",
    rarity: "Rare",
    type: "Potion",
    description: "For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour.",
    requiresAttunement: false,
    value: 500
  },
  {
    name: "Potion of Vitality",
    rarity: "Very Rare",
    type: "Potion",
    description: "When you drink this potion, it removes any exhaustion you are suffering and cures any disease or poison affecting you.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Clairvoyance",
    rarity: "Rare",
    type: "Potion",
    description: "When you drink this potion, you gain the effect of the clairvoyance spell.",
    requiresAttunement: false,
    value: 500
  },
  {
    name: "Potion of Gaseous Form",
    rarity: "Rare",
    type: "Potion",
    description: "When you drink this potion, you gain the effect of the gaseous form spell for 1 hour.",
    requiresAttunement: false,
    value: 500
  },
  {
    name: "Potion of Giant Strength",
    rarity: "Rare",
    type: "Potion",
    description: "When you drink this potion, your Strength score changes to 21 for 1 hour.",
    requiresAttunement: false,
    value: 500
  },
  {
    name: "Potion of Hill Giant Strength",
    rarity: "Uncommon",
    type: "Potion",
    description: "When you drink this potion, your Strength score changes to 21 for 1 hour.",
    requiresAttunement: false,
    value: 150
  },
  {
    name: "Potion of Frost Giant Strength",
    rarity: "Very Rare",
    type: "Potion",
    description: "When you drink this potion, your Strength score changes to 23 for 1 hour.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Stone Giant Strength",
    rarity: "Very Rare",
    type: "Potion",
    description: "When you drink this potion, your Strength score changes to 25 for 1 hour.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Fire Giant Strength",
    rarity: "Legendary",
    type: "Potion",
    description: "When you drink this potion, your Strength score changes to 27 for 1 hour.",
    requiresAttunement: false,
    value: 5000
  },
  {
    name: "Potion of Cloud Giant Strength",
    rarity: "Legendary",
    type: "Potion",
    description: "When you drink this potion, your Strength score changes to 29 for 1 hour.",
    requiresAttunement: false,
    value: 5000
  },
  {
    name: "Potion of Storm Giant Strength",
    rarity: "Legendary",
    type: "Potion",
    description: "When you drink this potion, your Strength score changes to 30 for 1 hour.",
    requiresAttunement: false,
    value: 5000
  },
  {
    name: "Potion of Longevity",
    rarity: "Very Rare",
    type: "Potion",
    description: "When you drink this potion, your physical age is reduced by 1d6 + 6 years.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Speed",
    rarity: "Very Rare",
    type: "Potion",
    description: "When you drink this potion, you gain the effect of the haste spell for 1 minute.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Resistance",
    rarity: "Uncommon",
    type: "Potion",
    description: "When you drink this potion, you gain resistance to one type of damage for 1 hour.",
    requiresAttunement: false,
    value: 150
  },
  {
    name: "Potion of Climbing",
    rarity: "Common",
    type: "Potion",
    description: "When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour.",
    requiresAttunement: false,
    value: 50
  },
  {
    name: "Potion of Greater Invisibility",
    rarity: "Very Rare",
    type: "Potion",
    description: "When you drink this potion, you become invisible for 1 hour. The effect ends early if you attack or cast a spell.",
    requiresAttunement: false,
    value: 1000
  },
  {
    name: "Potion of Poison",
    rarity: "Uncommon",
    type: "Potion",
    description: "This concoction looks, smells, and tastes like a potion of healing or other beneficial potion.",
    requiresAttunement: false,
    value: 150
  }
]

export async function seedMagicalItems() {
  console.log('🧪 Seeding magical items...')
  
  // Clear existing magical items
  await prisma.magicalItem.deleteMany()
  console.log('✅ Cleared existing magical items')

  // Add new magical items
  for (const item of magicalItemsData) {
    try {
      await prisma.magicalItem.create({
        data: {
          name: item.name,
          type: item.type,
          rarity: item.rarity,
          requiresAttunement: item.requiresAttunement,
          description: item.description,
          cost: item.value.toString(),
          effects: item.effects || null,
          stackable: false,
          consumable: true
        }
      })
      console.log(`✅ Added magical item: ${item.name}`)
    } catch (error) {
      console.error(`❌ Failed to add magical item ${item.name}:`, error)
    }
  }

  console.log('🎉 Magical items seeding completed!')
}

async function main() {
  try {
    await seedMagicalItems()
    console.log('\n🎉 Magical items seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding magical items:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
} 