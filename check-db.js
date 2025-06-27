const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Checking database schema...');
    
    // Check which database we're connected to
    const dbResult = await prisma.$queryRaw`SELECT current_database(), current_user, inet_server_addr(), inet_server_port();`;
    console.log('📋 Connected to database:', dbResult);
    
    // Check if weapons table exists and its columns
    const result = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'weapons' 
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 Weapons table columns:');
    console.log(result);
    
    // Check if ammunition_suggestions table exists
    const ammoResult = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'ammunition_suggestions' 
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 Ammunition_suggestions table columns:');
    console.log(ammoResult);
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase(); 