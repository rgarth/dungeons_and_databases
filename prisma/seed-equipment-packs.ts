import { PrismaClient } from '@prisma/client'
import { equipmentPacksData } from './data/equipment-packs-data'

const prisma = new PrismaClient()

export async function seedEquipmentPacks() {
  console.log('Starting equipment packs seed...')

  // Clear existing equipment packs and their items in a transaction
  await prisma.$transaction([
    prisma.equipmentPackItem.deleteMany(),
    prisma.equipmentPack.deleteMany()
  ])

  // Add new equipment packs
  for (const pack of equipmentPacksData) {
    try {
      const createdPack = await prisma.equipmentPack.create({
        data: {
          name: pack.name,
          cost: pack.cost,
          description: pack.description,
          items: {
            create: pack.items.map(item => ({
              quantity: item.quantity,
              itemName: item.equipmentName
            }))
          }
        }
      })
      console.log(`Added equipment pack: ${createdPack.name}`)
    } catch (error) {
      console.error(`Failed to add equipment pack ${pack.name}:`, error)
    }
  }

  console.log('Equipment packs seeding completed')
}

async function main() {
  const force = process.argv.includes('--force');
  
  if (!force) {
    console.log('⚠️  This will clear all existing equipment packs. Use --force to proceed.');
    return;
  }
  
  await seedEquipmentPacks();
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} 