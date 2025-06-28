const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Test data sets
const RACES = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling', 'Aasimar', 'Goliath', 'Tabaxi'];
const CLASSES = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  errors: [],
  details: []
};

// Utility functions
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

function logTestResult(testName, success, details = null) {
  if (success) {
    testResults.passed++;
    log(`✅ ${testName}`, 'PASS');
  } else {
    testResults.failed++;
    log(`❌ ${testName}`, 'FAIL');
    if (details) {
      testResults.errors.push({ test: testName, error: details });
    }
  }
  testResults.details.push({ test: testName, success, details });
}

// Test functions
async function testDatabaseConnection() {
  log('Testing database connection...', 'TEST');
  
  try {
    await prisma.$connect();
    logTestResult('Database connection', true, null);
  } catch (error) {
    logTestResult('Database connection', false, error.message);
  }
}

async function testRacesData() {
  log('Testing races data...', 'TEST');
  
  try {
    const races = await prisma.dndRace.findMany();
    logTestResult('Races data exists', races.length > 0, `Found ${races.length} races`);
    
    for (const race of RACES) {
      const raceData = await prisma.dndRace.findFirst({
        where: { name: race }
      });
      logTestResult(`Race data for ${race}`, !!raceData, raceData ? null : 'Race not found in database');
    }
  } catch (error) {
    logTestResult('Races data test', false, error.message);
  }
}

async function testClassesData() {
  log('Testing classes data...', 'TEST');
  
  try {
    const classes = await prisma.dndClass.findMany();
    logTestResult('Classes data exists', classes.length > 0, `Found ${classes.length} classes`);
    
    for (const className of CLASSES) {
      const classData = await prisma.dndClass.findFirst({
        where: { name: className }
      });
      logTestResult(`Class data for ${className}`, !!classData, classData ? null : 'Class not found in database');
    }
  } catch (error) {
    logTestResult('Classes data test', false, error.message);
  }
}

async function testSubracesData() {
  log('Testing subraces data...', 'TEST');
  
  try {
    const subraces = await prisma.subrace.findMany();
    logTestResult('Subraces data exists', subraces.length > 0, `Found ${subraces.length} subraces`);
    
    // Test subraces for each race
    for (const race of RACES) {
      const raceData = await prisma.dndRace.findFirst({
        where: { name: race }
      });
      
      if (raceData) {
        const raceSubraces = await prisma.subrace.findMany({
          where: { raceId: raceData.id }
        });
        
        if (raceSubraces.length > 0) {
          logTestResult(`Subraces for ${race}`, true, `Found ${raceSubraces.length} subraces`);
          
          for (const subrace of raceSubraces) {
            logTestResult(`Subrace ${subrace.name}`, !!subrace.name, null);
          }
        } else {
          logTestResult(`Subraces for ${race}`, true, 'No subraces (this is normal for some races)');
        }
      } else {
        logTestResult(`Subraces for ${race}`, false, 'Race not found');
      }
    }
  } catch (error) {
    logTestResult('Subraces data test', false, error.message);
  }
}

async function testBackgroundsData() {
  log('Testing backgrounds data...', 'TEST');
  
  try {
    const backgrounds = await prisma.background.findMany();
    logTestResult('Backgrounds data exists', backgrounds.length > 0, `Found ${backgrounds.length} backgrounds`);
    
    // Test a few key backgrounds
    const keyBackgrounds = ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier'];
    for (const background of keyBackgrounds) {
      const bgData = await prisma.background.findFirst({
        where: { name: background }
      });
      logTestResult(`Background data for ${background}`, !!bgData, bgData ? null : 'Background not found');
    }
  } catch (error) {
    logTestResult('Backgrounds data test', false, error.message);
  }
}

async function testWeaponsData() {
  log('Testing weapons data...', 'TEST');
  
  try {
    const weapons = await prisma.weapon.findMany();
    logTestResult('Weapons data exists', weapons.length > 0, `Found ${weapons.length} weapons`);
    
    // Test weapon categories
    const categories = await prisma.weapon.groupBy({
      by: ['type'],
      _count: { type: true }
    });
    
    logTestResult('Weapon categories', categories.length > 0, `Found ${categories.length} weapon categories`);
    
    // Test some key weapons
    const keyWeapons = ['Longsword', 'Shortsword', 'Dagger', 'Longbow', 'Crossbow'];
    for (const weapon of keyWeapons) {
      const weaponData = await prisma.weapon.findFirst({
        where: { name: { contains: weapon } }
      });
      logTestResult(`Weapon data for ${weapon}`, !!weaponData, weaponData ? null : 'Weapon not found');
    }
  } catch (error) {
    logTestResult('Weapons data test', false, error.message);
  }
}

async function testArmorData() {
  log('Testing armor data...', 'TEST');
  
  try {
    const armor = await prisma.armor.findMany();
    logTestResult('Armor data exists', armor.length > 0, `Found ${armor.length} armor pieces`);
    
    // Test armor types
    const types = await prisma.armor.groupBy({
      by: ['type'],
      _count: { type: true }
    });
    
    logTestResult('Armor types', types.length > 0, `Found ${types.length} armor types`);
    
    // Test some key armor
    const keyArmor = ['Chain Mail', 'Leather', 'Shield'];
    for (const armorPiece of keyArmor) {
      const armorData = await prisma.armor.findFirst({
        where: { name: { contains: armorPiece } }
      });
      logTestResult(`Armor data for ${armorPiece}`, !!armorData, armorData ? null : 'Armor not found');
    }
  } catch (error) {
    logTestResult('Armor data test', false, error.message);
  }
}

async function testEquipmentPacksData() {
  log('Testing equipment packs data...', 'TEST');
  
  try {
    const packs = await prisma.equipmentPack.findMany();
    logTestResult('Equipment packs data exists', packs.length > 0, `Found ${packs.length} equipment packs`);
    
    // Test pack items
    const packItems = await prisma.equipmentPackItem.findMany();
    logTestResult('Equipment pack items exist', packItems.length > 0, `Found ${packItems.length} pack items`);
    
    // Test some key packs
    const keyPacks = ['Burglar\'s Pack', 'Diplomat\'s Pack', 'Dungeoneer\'s Pack'];
    for (const pack of keyPacks) {
      const packData = await prisma.equipmentPack.findFirst({
        where: { name: { contains: pack } }
      });
      logTestResult(`Equipment pack data for ${pack}`, !!packData, packData ? null : 'Pack not found');
    }
  } catch (error) {
    logTestResult('Equipment packs data test', false, error.message);
  }
}

async function testSpellsData() {
  log('Testing spells data...', 'TEST');
  
  try {
    const spells = await prisma.spell.findMany();
    logTestResult('Spells data exists', spells.length > 0, `Found ${spells.length} spells`);
    
    // Test spell levels
    const levels = await prisma.spell.groupBy({
      by: ['level'],
      _count: { level: true }
    });
    
    logTestResult('Spell levels', levels.length > 0, `Found ${levels.length} spell levels`);
    
    // Test some key spells
    const keySpells = ['Fireball', 'Magic Missile', 'Cure Wounds'];
    for (const spell of keySpells) {
      const spellData = await prisma.spell.findFirst({
        where: { name: { contains: spell } }
      });
      logTestResult(`Spell data for ${spell}`, !!spellData, spellData ? null : 'Spell not found');
    }
  } catch (error) {
    logTestResult('Spells data test', false, error.message);
  }
}

async function testCharacterCreationLogic() {
  log('Testing character creation logic...', 'TEST');
  
  try {
    // Test ability score calculations
    const testScores = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
    const modifiers = {};
    
    for (const [ability, score] of Object.entries(testScores)) {
      modifiers[ability] = Math.floor((score - 10) / 2);
    }
    
    logTestResult('Ability score modifiers', 
      modifiers.str === 2 && modifiers.dex === 2 && modifiers.con === 1 && 
      modifiers.int === 1 && modifiers.wis === 0 && modifiers.cha === -1,
      'Modifiers calculated incorrectly'
    );
    
    // Test point buy costs
    const pointBuyCosts = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
    let totalCost = 0;
    
    for (const score of Object.values(testScores)) {
      totalCost += pointBuyCosts[score] || 0;
    }
    
    logTestResult('Point buy cost calculation', totalCost === 27, `Expected 27 points, got ${totalCost}`);
    
  } catch (error) {
    logTestResult('Character creation logic test', false, error.message);
  }
}

async function testDataRelationships() {
  log('Testing data relationships...', 'TEST');
  
  try {
    // Test race-subrace relationships
    const raceWithSubraces = await prisma.dndRace.findFirst({
      where: {
        subraces: {
          some: {}
        }
      },
      include: {
        subraces: true
      }
    });
    
    if (raceWithSubraces) {
      logTestResult('Race-subrace relationships', true, `Found ${raceWithSubraces.subraces.length} subraces for ${raceWithSubraces.name}`);
    } else {
      logTestResult('Race-subrace relationships', false, 'No race with subraces found');
    }
    
    // Test class-spell relationships
    const classWithSpells = await prisma.dndClass.findFirst({
      where: {
        spellLimits: {
          some: {}
        }
      },
      include: {
        spellLimits: true
      }
    });
    
    if (classWithSpells) {
      logTestResult('Class-spell relationships', true, `Found ${classWithSpells.spellLimits.length} spell limits for ${classWithSpells.name}`);
    } else {
      logTestResult('Class-spell relationships', false, 'No class with spell limits found');
    }
    
  } catch (error) {
    logTestResult('Data relationships test', false, error.message);
  }
}

// Main test runner
async function runAllTests() {
  log('Starting comprehensive character creation test suite...', 'INFO');
  
  const startTime = Date.now();
  
  try {
    await testDatabaseConnection();
    await testRacesData();
    await testClassesData();
    await testSubracesData();
    await testBackgroundsData();
    await testWeaponsData();
    await testArmorData();
    await testEquipmentPacksData();
    await testSpellsData();
    await testCharacterCreationLogic();
    await testDataRelationships();
  } catch (error) {
    log(`Test suite failed: ${error.message}`, 'ERROR');
  }
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  // Print summary
  log('\n=== TEST SUMMARY ===', 'INFO');
  log(`Total tests: ${testResults.passed + testResults.failed}`, 'INFO');
  log(`Passed: ${testResults.passed}`, 'INFO');
  log(`Failed: ${testResults.failed}`, 'INFO');
  log(`Success rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`, 'INFO');
  log(`Duration: ${duration.toFixed(2)}s`, 'INFO');
  
  if (testResults.errors.length > 0) {
    log('\n=== FAILED TESTS ===', 'ERROR');
    testResults.errors.forEach(error => {
      log(`${error.test}: ${error.error}`, 'ERROR');
    });
  }
  
  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Handle cleanup
process.on('SIGINT', async () => {
  log('Received SIGINT, cleaning up...', 'INFO');
  await prisma.$disconnect();
  process.exit(0);
});

// Run the tests
if (require.main === module) {
  runAllTests().catch(async (error) => {
    log(`Test suite failed: ${error.message}`, 'ERROR');
    await prisma.$disconnect();
    process.exit(1);
  });
}

module.exports = {
  runAllTests,
  testResults
}; 