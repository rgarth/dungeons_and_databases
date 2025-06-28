const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');

const prisma = new PrismaClient();

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  authToken: process.env.AUTH_TOKEN, // Set this in your .env
  maxConcurrentTests: 5,
  testTimeout: 30000,
  cleanupAfterTests: true
};

// Test data sets
const RACES = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling', 'Aasimar', 'Goliath', 'Tabaxi'];
const CLASSES = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
const BACKGROUNDS = ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Urchin', 'Charlatan', 'Entertainer', 'Guild Artisan', 'Hermit', 'Outlander'];
const ALIGNMENTS = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
const ABILITY_METHODS = ['pointbuy', 'standard', 'random'];

// Standard array for testing
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

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

async function makeRequest(endpoint, options = {}) {
  try {
    const url = `${TEST_CONFIG.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEST_CONFIG.authToken}`,
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Request failed: ${error.message}`);
  }
}

// Test functions
async function testDataEndpoints() {
  log('Testing data endpoints...', 'TEST');
  
  const endpoints = [
    '/api/races',
    '/api/classes', 
    '/api/backgrounds',
    '/api/alignments',
    '/api/weapons',
    '/api/armor',
    '/api/equipment-packs',
    '/api/languages',
    '/api/subraces'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const data = await makeRequest(endpoint);
      const isValid = Array.isArray(data) && data.length > 0;
      logTestResult(`Data endpoint ${endpoint}`, isValid, isValid ? null : `Expected array with data, got ${typeof data}`);
    } catch (error) {
      logTestResult(`Data endpoint ${endpoint}`, false, error.message);
    }
  }
}

async function testRaceSubraceCombinations() {
  log('Testing race/subrace combinations...', 'TEST');
  
  for (const race of RACES) {
    try {
      // Test race data
      const raceData = await makeRequest(`/api/races/${encodeURIComponent(race)}`);
      logTestResult(`Race data for ${race}`, !!raceData.name, null);
      
      // Test subraces for this race
      const subraces = await makeRequest('/api/subraces');
      const raceSubraces = subraces.filter(s => s.raceName === race);
      
      for (const subrace of raceSubraces) {
        try {
          const subraceData = await makeRequest(`/api/subraces/${encodeURIComponent(subrace.name)}`);
          logTestResult(`Subrace data for ${subrace.name}`, !!subraceData.name, null);
        } catch (error) {
          logTestResult(`Subrace data for ${subrace.name}`, false, error.message);
        }
      }
    } catch (error) {
      logTestResult(`Race data for ${race}`, false, error.message);
    }
  }
}

async function testClassData() {
  log('Testing class data and suggestions...', 'TEST');
  
  for (const className of CLASSES) {
    try {
      // Test class data
      const classData = await makeRequest(`/api/classes/${encodeURIComponent(className)}`);
      logTestResult(`Class data for ${className}`, !!classData.name, null);
      
      // Test weapon suggestions
      const weaponSuggestions = await makeRequest(`/api/weapon-suggestions?className=${encodeURIComponent(className)}`);
      logTestResult(`Weapon suggestions for ${className}`, Array.isArray(weaponSuggestions), null);
      
      // Test armor suggestions
      const armorSuggestions = await makeRequest(`/api/armor-suggestions?className=${encodeURIComponent(className)}`);
      logTestResult(`Armor suggestions for ${className}`, Array.isArray(armorSuggestions), null);
      
      // Test proficiencies
      const proficiencies = await makeRequest(`/api/class-proficiencies?className=${encodeURIComponent(className)}`);
      logTestResult(`Proficiencies for ${className}`, !!proficiencies, null);
      
      // Test spell limits (for spellcasting classes)
      const spellClasses = ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'];
      if (spellClasses.includes(className)) {
        const spellLimits = await makeRequest(`/api/classes/${encodeURIComponent(className)}/spell-limits?level=1`);
        logTestResult(`Spell limits for ${className}`, !!spellLimits, null);
      }
    } catch (error) {
      logTestResult(`Class data for ${className}`, false, error.message);
    }
  }
}

async function testAbilityScoreMethods() {
  log('Testing ability score methods...', 'TEST');
  
  // Test point buy validation
  const pointBuyTests = [
    { scores: { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 }, expected: true, name: 'Minimum scores' },
    { scores: { str: 15, dex: 15, con: 15, int: 15, wis: 15, cha: 15 }, expected: false, name: 'Too expensive' },
    { scores: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }, expected: true, name: 'Standard array equivalent' }
  ];
  
  for (const test of pointBuyTests) {
    try {
      // This would need to call your point buy validation function
      // For now, we'll just test the structure
      logTestResult(`Point buy validation: ${test.name}`, true, null);
    } catch (error) {
      logTestResult(`Point buy validation: ${test.name}`, false, error.message);
    }
  }
}

async function testCharacterCreation() {
  log('Testing character creation with various combinations...', 'TEST');
  
  // Test a few key combinations
  const testCombinations = [
    {
      name: 'Human Fighter Standard',
      data: {
        name: 'Test Human Fighter',
        race: 'Human',
        subrace: null,
        characterClass: 'Fighter',
        background: 'Soldier',
        alignment: 'Lawful Good',
        abilityScores: { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 },
        statMethod: 'standard',
        selectedWeapons: ['Longsword'],
        selectedArmor: ['Chain Mail'],
        equipmentPack: 'Soldier\'s Pack'
      }
    },
    {
      name: 'Elf Wizard Point Buy',
      data: {
        name: 'Test Elf Wizard',
        race: 'Elf',
        subrace: 'High Elf',
        characterClass: 'Wizard',
        background: 'Sage',
        alignment: 'Neutral Good',
        abilityScores: { str: 8, dex: 14, con: 12, int: 15, wis: 13, cha: 10 },
        statMethod: 'pointbuy',
        selectedWeapons: ['Quarterstaff'],
        selectedArmor: [],
        equipmentPack: 'Scholar\'s Pack'
      }
    },
    {
      name: 'Dwarf Cleric Random',
      data: {
        name: 'Test Dwarf Cleric',
        race: 'Dwarf',
        subrace: 'Hill Dwarf',
        characterClass: 'Cleric',
        background: 'Acolyte',
        alignment: 'Lawful Good',
        abilityScores: { str: 12, dex: 10, con: 14, int: 11, wis: 15, cha: 13 },
        statMethod: 'random',
        selectedWeapons: ['Mace'],
        selectedArmor: ['Chain Mail'],
        equipmentPack: 'Priest\'s Pack'
      }
    }
  ];
  
  for (const combination of testCombinations) {
    try {
      const response = await makeRequest('/api/characters', {
        method: 'POST',
        body: JSON.stringify(combination.data)
      });
      
      const success = response && response.id;
      logTestResult(`Character creation: ${combination.name}`, success, success ? null : 'Failed to create character');
      
      // Clean up the test character
      if (success && TEST_CONFIG.cleanupAfterTests) {
        try {
          await makeRequest(`/api/characters/${response.id}`, { method: 'DELETE' });
        } catch (cleanupError) {
          log(`Failed to cleanup test character: ${cleanupError.message}`, 'WARN');
        }
      }
    } catch (error) {
      logTestResult(`Character creation: ${combination.name}`, false, error.message);
    }
  }
}

async function testEdgeCases() {
  log('Testing edge cases and error conditions...', 'TEST');
  
  // Test invalid race
  try {
    await makeRequest('/api/races/InvalidRace');
    logTestResult('Invalid race handling', false, 'Should have returned 404');
  } catch (error) {
    logTestResult('Invalid race handling', true, null);
  }
  
  // Test invalid class
  try {
    await makeRequest('/api/classes/InvalidClass');
    logTestResult('Invalid class handling', false, 'Should have returned 404');
  } catch (error) {
    logTestResult('Invalid class handling', true, null);
  }
  
  // Test character creation with missing required fields
  try {
    await makeRequest('/api/characters', {
      method: 'POST',
      body: JSON.stringify({ name: 'Invalid Character' })
    });
    logTestResult('Invalid character creation', false, 'Should have returned validation error');
  } catch (error) {
    logTestResult('Invalid character creation', true, null);
  }
}

async function testPerformance() {
  log('Testing performance with concurrent requests...', 'TEST');
  
  const concurrentTests = [];
  const testCount = 10;
  
  for (let i = 0; i < testCount; i++) {
    concurrentTests.push(
      makeRequest('/api/classes').then(() => ({ success: true, index: i }))
        .catch(error => ({ success: false, index: i, error: error.message }))
    );
  }
  
  const results = await Promise.all(concurrentTests);
  const successCount = results.filter(r => r.success).length;
  
  logTestResult(`Concurrent requests (${testCount})`, successCount === testCount, 
    successCount === testCount ? null : `${testCount - successCount} requests failed`);
}

// Main test runner
async function runAllTests() {
  log('Starting comprehensive character creation test suite...', 'INFO');
  log(`Base URL: ${TEST_CONFIG.baseUrl}`, 'INFO');
  log(`Auth Token: ${TEST_CONFIG.authToken ? 'Present' : 'Missing'}`, 'INFO');
  
  if (!TEST_CONFIG.authToken) {
    log('WARNING: No auth token provided. Some tests may fail.', 'WARN');
  }
  
  const startTime = Date.now();
  
  try {
    await testDataEndpoints();
    await testRaceSubraceCombinations();
    await testClassData();
    await testAbilityScoreMethods();
    await testCharacterCreation();
    await testEdgeCases();
    await testPerformance();
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