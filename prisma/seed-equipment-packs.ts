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
              equipment: {
                connect: {
                  name: item.equipmentName
                }
              }
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