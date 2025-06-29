const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCharacters() {
  try {
    console.log('Checking characters in database...');
    
    const characters = await prisma.character.findMany({
      select: {
        id: true,
        name: true,
        inventory: true,
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
      console.log(`Inventory:`, char.inventory);
      console.log(`Weapons:`, char.weapons);
      console.log(`Armor:`, char.armor);
      console.log(`Created: ${char.createdAt}`);
    });
    
  } catch (error) {
    console.error('Error checking characters:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCharacters(); 