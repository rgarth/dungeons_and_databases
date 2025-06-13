#!/usr/bin/env tsx

// Equipment and Equipment Packs Database Seeder
//
// This script populates the Equipment, EquipmentPack, and EquipmentPackItem tables
// from the seed data in ./data/equipment-data.ts and ./data/equipment-packs-data.ts
//
// Usage: npx tsx prisma/seed-equipment.ts
//
// Note: After seeding, the database becomes the source of truth.
// Application code should use /api/equipment and /api/equipment-packs, not the seed data.

import { PrismaClient } from '@prisma/client';
import { equipmentData } from './data/equipment-data';
import { equipmentPacksData } from './data/equipment-packs-data';

const prisma = new PrismaClient();

export async function seedEquipment() {
  console.log('🧰 Seeding equipment and equipment packs...');

  // Clear equipment-related tables in sequence to respect foreign key constraints
  console.log('🗑️  Clearing equipment-related tables...');
  
  // First clear the junction table that references both Equipment and EquipmentPack
  await prisma.equipmentPackItem.deleteMany();
  console.log('✅ Cleared equipment pack items');
  
  // Then clear the EquipmentPack table
  await prisma.equipmentPack.deleteMany();
  console.log('✅ Cleared equipment packs');
  
  // Finally clear the Equipment table
  await prisma.equipment.deleteMany();
  console.log('✅ Cleared equipment items');

  // Add new equipment
  console.log('\n📦 Adding equipment items...');
  for (const item of equipmentData) {
    await prisma.equipment.create({
      data: {
        name: item.name,
        type: item.type,
        cost: item.cost,
        weight: item.weight,
        description: item.description,
        stackable: item.stackable
      }
    });
    console.log(`✅ Added equipment: ${item.name}`);
  }

  // Add equipment packs
  console.log('\n🎒 Adding equipment packs...');
  for (const packData of equipmentPacksData) {
    console.log(`\n📋 Processing ${packData.name}...`);

    // Create the pack
    const pack = await prisma.equipmentPack.create({
      data: {
        name: packData.name,
        cost: packData.cost,
        description: packData.description
      }
    });

    // Add items to the pack
    for (const item of packData.items) {
      // Find the equipment by name
      const equipment = await prisma.equipment.findFirst({
        where: { name: item.equipmentName }
      });

      if (!equipment) {
        console.log(`  ⚠️  Equipment not found: ${item.equipmentName}`);
        continue;
      }

      await prisma.equipmentPackItem.create({
        data: {
          packId: pack.id,
          equipmentId: equipment.id,
          quantity: item.quantity
        }
      });
      console.log(`  ✅ Added item: ${item.quantity}x ${item.equipmentName}`);
    }
  }

  console.log('\n✅ Equipment and equipment packs seeding completed!');
}

async function validateEquipment() {
  console.log('\n🔍 Validating equipment data...');
  
  const equipment = await prisma.equipment.findMany();
  const packs = await prisma.equipmentPack.findMany({
    include: {
      items: {
        include: {
          equipment: true
        }
      }
    }
  });
  
  console.log(`📦 Found ${equipment.length} equipment items and ${packs.length} equipment packs in database:`);
  
  console.log('\n🧰 Equipment items:');
  for (const item of equipment) {
    console.log(`• ${item.name} (${item.cost})`);
  }
  
  console.log('\n🎒 Equipment packs:');
  for (const pack of packs) {
    console.log(`\n${pack.name} (${pack.cost})`);
    console.log(`📝 ${pack.description}`);
    console.log(`📋 ${pack.items.length} items:`);
    
    for (const item of pack.items) {
      console.log(`  • ${item.quantity}x ${item.equipment.name}`);
    }
  }
  
  return { equipment, packs };
}

async function main() {
  try {
    await seedEquipment();
    await validateEquipment();
    
    console.log('\n🎉 Equipment and equipment packs seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding equipment data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 