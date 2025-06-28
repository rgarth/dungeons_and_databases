const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkTables() {
  try {
    console.log('Checking spell and class related tables...');
    
    const result = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND (table_name LIKE '%spell%' OR table_name LIKE '%class%')
      ORDER BY table_name
    `;
    
    console.log('Found tables:', result);
    
    // Also check if ClassSpellLimits exists specifically
    const classSpellLimits = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'ClassSpellLimits'
    `;
    
    console.log('ClassSpellLimits table exists:', classSpellLimits.length > 0);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables(); 