const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    console.log('🗑️  Dropping all tables...');
    
    // Drop all tables in the correct order (respecting foreign key constraints)
    await prisma.$executeRaw`DROP TABLE IF EXISTS "EquipmentPackItem" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "EquipmentPack" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "ClassWeaponSuggestion" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "ClassArmorSuggestion" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "ClassWeaponProficiency" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "ClassArmorProficiency" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "DndClass" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Background" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Subrace" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "DndRace" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Alignment" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "MagicalItem" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Treasure" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Equipment" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Armor" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "CustomWeapon" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Weapon" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Spell" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Character" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "User" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Session" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Account" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "Language" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "ClassSpellLimits" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "ClassSpellSuggestion" CASCADE`;
    await prisma.$executeRaw`DROP TABLE IF EXISTS "AmmunitionSuggestion" CASCADE`;
    
    console.log('✅ All tables dropped');
    
  } catch (error) {
    console.error('❌ Error dropping tables:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase(); 