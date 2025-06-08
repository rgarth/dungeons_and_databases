#!/usr/bin/env tsx

// Equipment Packs Database Seeder
//
// This script populates the EquipmentPack and EquipmentPackItem tables
// from the seed data in ./data/equipment-packs-data.ts
//
// Usage: npx tsx prisma/seed-equipment-packs.ts
//
// Note: After seeding, the database becomes the source of truth.
// Application code should use /api/equipment-packs, not the seed data.

import { PrismaClient } from '@prisma/client';
import { equipmentPacksData } from './data/equipment-packs-data';

const prisma = new PrismaClient();

async function seedEquipmentPacks() {
  console.log('📦 Seeding equipment packs...');
  
  let packsCreated = 0;
  let itemsCreated = 0;
  const errors: string[] = [];
  
  for (const packData of equipmentPacksData) {
    console.log(`\n🎒 Processing pack: ${packData.name}`);
    
    try {
      // Create or update the equipment pack
      const pack = await prisma.equipmentPack.upsert({
        where: { name: packData.name },
        update: {
          description: packData.description,
          cost: packData.cost,
        },
        create: {
          name: packData.name,
          description: packData.description,
          cost: packData.cost,
        },
      });
      
      console.log(`✅ Pack created/updated: ${pack.name}`);
      packsCreated++;
      
      // Clear existing pack items (for updates)
      await prisma.equipmentPackItem.deleteMany({
        where: { packId: pack.id }
      });
      
      // Add items to the pack
      for (const itemData of packData.items) {
        // Find the equipment item in the database with flexible matching
        let equipment = await prisma.equipment.findFirst({
          where: {
            OR: [
              { name: { equals: itemData.equipmentName } },
              { name: { contains: itemData.equipmentName.split(' ')[0] } },
              { name: { contains: itemData.equipmentName.replace(/\s*\([^)]*\)/g, '').trim() } }
            ]
          }
        });
        
        if (!equipment) {
          // Try common name mappings
          const nameMapping: Record<string, string> = {
            'Ball Bearings (1000)': 'Ball bearings',
            'String (10 feet)': 'String',
            'Oil (flask)': 'Oil',
            'Rations (1 day)': 'Rations',
            'Hempen Rope (50 feet)': 'Rope, hempen',
            'Case, Map or Scroll': 'Case',
            'Ink (1 ounce bottle)': 'Ink',
            'Paper (one sheet)': 'Paper',
            'Perfume (vial)': 'Perfume',
            'Costume Clothes': 'Costume',
            'Incense (1 block)': 'Incense',
            'Parchment (one sheet)': 'Parchment',
            'Little Bag of Sand': 'Sand',
            'Small Knife': 'Knife'
          };
          
          const mappedName = nameMapping[itemData.equipmentName];
          if (mappedName) {
            equipment = await prisma.equipment.findFirst({
              where: { name: { contains: mappedName } }
            });
          }
        }
        
        if (!equipment) {
          const errorMsg = `❌ Equipment not found: "${itemData.equipmentName}" in pack "${packData.name}"`;
          console.log(errorMsg);
          errors.push(errorMsg);
          continue;
        }
        
        // Create the pack item relationship
        await prisma.equipmentPackItem.create({
          data: {
            packId: pack.id,
            equipmentId: equipment.id,
            quantity: itemData.quantity,
          }
        });
        
        console.log(`  ✅ Added: ${itemData.quantity}x ${equipment.name}`);
        itemsCreated++;
      }
      
    } catch (error) {
      const errorMsg = `❌ Failed to process pack "${packData.name}": ${error}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }
  }
  
  console.log(`\n📊 Equipment Pack Seeding Summary:`);
  console.log(`✅ Packs processed: ${packsCreated}/${equipmentPacksData.length}`);
  console.log(`✅ Pack items created: ${itemsCreated}`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors encountered (${errors.length}):`);
    errors.forEach(error => console.log(error));
  }
  
  return {
    packsCreated,
    itemsCreated,
    errors
  };
}

async function validateEquipmentPacks() {
  console.log('\n🔍 Validating equipment packs...');
  
  const packs = await prisma.equipmentPack.findMany({
    include: {
      items: {
        include: {
          equipment: true
        }
      }
    }
  });
  
  console.log(`📦 Found ${packs.length} equipment packs in database:`);
  
  for (const pack of packs) {
    console.log(`\n🎒 ${pack.name} (${pack.cost})`);
    console.log(`   📝 ${pack.description}`);
    console.log(`   📋 ${pack.items.length} items:`);
    
    for (const item of pack.items) {
      console.log(`     • ${item.quantity}x ${item.equipment.name}`);
    }
  }
  
  return packs;
}

async function main() {
  try {
    const results = await seedEquipmentPacks();
    await validateEquipmentPacks();
    
    if (results.errors.length === 0) {
      console.log('\n🎉 Equipment pack seeding completed successfully!');
    } else {
      console.log('\n⚠️  Equipment pack seeding completed with errors. Check the equipment database.');
    }
    
  } catch (error) {
    console.error('💥 Equipment pack seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 