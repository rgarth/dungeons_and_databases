const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCharacterInventory() {
  try {
    console.log('Checking character inventory in database...');
    
    const characters = await prisma.character.findMany({
      select: {
        id: true,
        name: true,
        inventory: true,
        equipment: true,
        goldPieces: true,
        copperPieces: true,
        silverPieces: true,
        weapons: true,
        armor: true,
        createdAt: true
      }
    });
    
    console.log(`Found ${characters.length} characters:`);
    
    characters.forEach((char, index) => {
      console.log(`\n--- Character ${index + 1} ---`);
      console.log(`ID: ${char.id}`);
      console.log(`Name: ${char.name}`);
      console.log(`Gold Pieces: ${char.goldPieces}`);
      console.log(`Copper Pieces: ${char.copperPieces}`);
      console.log(`Silver Pieces: ${char.silverPieces}`);
      console.log(`Inventory (raw):`, char.inventory);
      console.log(`Equipment (raw):`, char.equipment);
      console.log(`Weapons (raw):`, char.weapons);
      console.log(`Armor (raw):`, char.armor);
      console.log(`Created: ${char.createdAt}`);
    });
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error checking character inventory:', error);
    await prisma.$disconnect();
  }
}

checkCharacterInventory(); 