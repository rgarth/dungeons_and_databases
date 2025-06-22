#!/usr/bin/env node

/**
 * Comprehensive Avatar Generation Test
 * Tests race, age, and gender combinations with random classes
 * Uses age-appropriate ranges for each race
 * 
 * Usage: 
 *   node scripts/test-avatar-comprehensive.js [session-cookie] [race]
 * 
 * Examples:
 *   node scripts/test-avatar-comprehensive.js "your-session-token"           # Test all races
 *   node scripts/test-avatar-comprehensive.js "your-session-token" "Human"   # Test only Humans
 *   node scripts/test-avatar-comprehensive.js "your-session-token" "Elf"     # Test only Elves
 * 
 * To get the session token:
 * 1. Open your browser and go to http://localhost:3000
 * 2. Sign in with Google
 * 3. Open DevTools (F12) → Application/Storage → Cookies
 * 4. Copy the value of the 'next-auth.session-token' cookie
 * 5. Run: node scripts/test-avatar-comprehensive.js "your-session-token-here"
 */

const fs = require('fs');
const path = require('path');

// Get session token and optional race from command line arguments
const sessionToken = process.argv[2];
const targetRace = process.argv[3];

if (!sessionToken) {
  console.error('❌ Error: Session token required!');
  console.error('');
  console.error('To get the session token:');
  console.error('1. Open your browser and go to http://localhost:3000');
  console.error('2. Sign in with Google');
  console.error('3. Open DevTools (F12) → Application/Storage → Cookies');
  console.error('4. Copy the value of the "next-auth.session-token" cookie');
  console.error('5. Run: node scripts/test-avatar-comprehensive.js "your-session-token-here" [race]');
  console.error('');
  console.error('Optional: Add a race name to test only that race:');
  console.error('  node scripts/test-avatar-comprehensive.js "token" "Human"');
  console.error('  node scripts/test-avatar-comprehensive.js "token" "Elf"');
  console.error('  node scripts/test-avatar-comprehensive.js "token" "Dwarf"');
  console.error('');
  process.exit(1);
}

// Test configuration - much more reasonable
const ALL_RACES = [
  'Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome',
  'Half-Elf', 'Half-Orc', 'Tiefling', 'Aasimar', 'Goliath', 'Tabaxi'
];

// Filter races based on target race parameter
const RACES = targetRace ? [targetRace] : ALL_RACES;

// Validate target race if provided
if (targetRace && !ALL_RACES.includes(targetRace)) {
  console.error(`❌ Error: Invalid race "${targetRace}"`);
  console.error(`Available races: ${ALL_RACES.join(', ')}`);
  process.exit(1);
}

const GENDERS = ['Male', 'Female', 'Non-binary'];

// Smart age ranges for each race - 3 representative ages per race
const AGE_RANGES = {
  'Human': [18, 35, 65], // young adult, adult, elderly
  'Elf': [100, 300, 600], // young adult, adult, elderly
  'Dwarf': [50, 150, 250], // young adult, adult, elderly
  'Halfling': [20, 50, 100], // young adult, adult, elderly
  'Dragonborn': [15, 30, 50], // young adult, adult, elderly
  'Gnome': [40, 100, 200], // young adult, adult, elderly
  'Half-Elf': [20, 50, 100], // young adult, adult, elderly
  'Half-Orc': [14, 30, 45], // young adult, adult, elderly
  'Tiefling': [20, 40, 70], // young adult, adult, elderly
  'Aasimar': [25, 60, 120], // young adult, adult, elderly
  'Goliath': [20, 40, 60], // young adult, adult, elderly
  'Tabaxi': [15, 30, 50] // young adult, adult, elderly
};

// All available classes for random assignment
const ALL_CLASSES = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Ranger', 'Paladin', 'Bard', 'Sorcerer', 'Warlock', 'Monk', 'Druid', 'Barbarian'];

// Results tracking
const results = {
  totalTests: 0,
  successfulTests: 0,
  failedTests: 0,
  duplicatePrompts: 0,
  prompts: new Set(),
  promptCounts: {},
  errors: [],
  testResults: []
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get a random class
function getRandomClass() {
  return ALL_CLASSES[Math.floor(Math.random() * ALL_CLASSES.length)];
}

async function testAvatarGeneration(race, age, gender) {
  const characterClass = getRandomClass();
  const testId = `${race}-${age}-${gender}`;
  
  try {
    log(`Testing: ${testId} (${characterClass})`, 'info');
    
    const response = await fetch('http://localhost:3000/api/generate-avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `next-auth.session-token=${sessionToken}`
      },
      body: JSON.stringify({
        race,
        class: characterClass,
        gender,
        age,
        background: 'Sage',
        personalityTraits: ['I use polysyllabic words'],
        ideals: ['Knowledge'],
        bonds: ['My life\'s work'],
        flaws: ['I am easily distracted'],
        appearance: `A ${age}-year-old ${race.toLowerCase()} ${characterClass.toLowerCase()} with age-appropriate features for ${age} years`
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Unknown error');
    }

    // Save the images if they exist
    if (data.fullBodyImage || data.avatarImage) {
      const testImagesDir = path.join(__dirname, '..', 'test-images');
      
      // Create test-images directory if it doesn't exist
      if (!fs.existsSync(testImagesDir)) {
        fs.mkdirSync(testImagesDir, { recursive: true });
        log(`Created test-images directory: ${testImagesDir}`, 'info');
      }

      // Save full body image
      if (data.fullBodyImage) {
        const fullBodyPath = path.join(testImagesDir, `${testId}-fullbody.jpg`);
        const fullBodyData = data.fullBodyImage.replace(/^data:image\/jpeg;base64,/, '');
        fs.writeFileSync(fullBodyPath, Buffer.from(fullBodyData, 'base64'));
        log(`Saved full body image: ${fullBodyPath}`, 'success');
      }

      // Save avatar image
      if (data.avatarImage) {
        const avatarPath = path.join(testImagesDir, `${testId}-avatar.jpg`);
        const avatarData = data.avatarImage.replace(/^data:image\/jpeg;base64,/, '');
        fs.writeFileSync(avatarPath, Buffer.from(avatarData, 'base64'));
        log(`Saved avatar image: ${avatarPath}`, 'success');
      }
    }

    // Track the ACTUAL prompt from the app
    if (data.prompt) {
      results.prompts.add(data.prompt);
      results.promptCounts[data.prompt] = (results.promptCounts[data.prompt] || 0) + 1;
      
      if (results.promptCounts[data.prompt] > 1) {
        results.duplicatePrompts++;
        log(`Duplicate prompt detected for: ${testId}`, 'warning');
        log(`   Prompt: ${data.prompt.substring(0, 100)}...`, 'warning');
      }
    }

    results.successfulTests++;
    results.testResults.push({
      testId,
      success: true,
      prompt: data.prompt,
      service: data.service,
      race,
      age,
      gender,
      class: characterClass,
      fullBodyImage: data.fullBodyImage ? `${testId}-fullbody.jpg` : null,
      avatarImage: data.avatarImage ? `${testId}-avatar.jpg` : null
    });

    log(`✅ Success: ${testId} (${characterClass})`, 'success');
    
    // Rate limiting
    await sleep(1000);
    
  } catch (error) {
    results.failedTests++;
    results.errors.push({
      testId,
      error: error.message,
      race,
      age,
      gender,
      class: characterClass
    });
    
    log(`❌ Failed: ${testId} (${characterClass}) - ${error.message}`, 'error');
  }
  
  results.totalTests++;
}

function generateTestReport() {
  const report = {
    summary: {
      totalTests: results.totalTests,
      successfulTests: results.successfulTests,
      failedTests: results.failedTests,
      successRate: ((results.successfulTests / results.totalTests) * 100).toFixed(2) + '%',
      uniquePrompts: results.prompts.size,
      duplicatePrompts: results.duplicatePrompts,
      promptEfficiency: ((results.prompts.size / results.totalTests) * 100).toFixed(2) + '%'
    },
    breakdown: {
      byRace: {},
      byGender: {},
      byAge: {},
      byClass: {},
      byAlignment: {}
    },
    errors: results.errors,
    promptAnalysis: Object.entries(results.promptCounts)
      .filter(([_, count]) => count > 1)
      .sort(([_, a], [__, b]) => b - a)
      .map(([prompt, count]) => ({ prompt: prompt.substring(0, 100) + '...', count }))
  };

  // Calculate breakdowns
  results.testResults.forEach(test => {
    report.breakdown.byRace[test.race] = (report.breakdown.byRace[test.race] || 0) + 1;
    report.breakdown.byGender[test.gender] = (report.breakdown.byGender[test.gender] || 0) + 1;
    report.breakdown.byAge[test.age] = (report.breakdown.byAge[test.age] || 0) + 1;
    report.breakdown.byClass[test.class] = (report.breakdown.byClass[test.class] || 0) + 1;
    report.breakdown.byAlignment[test.alignment] = (report.breakdown.byAlignment[test.alignment] || 0) + 1;
  });

  return report;
}

function printReport(report) {
  console.log('\n' + '='.repeat(80));
  console.log('🎨 COMPREHENSIVE AVATAR GENERATION TEST REPORT');
  console.log('='.repeat(80));
  
  console.log('\n📊 SUMMARY:');
  console.log(`   Total Tests: ${report.summary.totalTests}`);
  console.log(`   Successful: ${report.summary.successfulTests}`);
  console.log(`   Failed: ${report.summary.failedTests}`);
  console.log(`   Success Rate: ${report.summary.successRate}`);
  console.log(`   Unique Prompts: ${report.summary.uniquePrompts}`);
  console.log(`   Duplicate Prompts: ${report.summary.duplicatePrompts}`);
  console.log(`   Prompt Efficiency: ${report.summary.promptEfficiency}`);
  
  console.log('\n📈 BREAKDOWN BY RACE:');
  Object.entries(report.breakdown.byRace)
    .sort(([_, a], [__, b]) => b - a)
    .forEach(([race, count]) => {
      console.log(`   ${race}: ${count}`);
    });
  
  console.log('\n👥 BREAKDOWN BY GENDER:');
  Object.entries(report.breakdown.byGender)
    .sort(([_, a], [__, b]) => b - a)
    .forEach(([gender, count]) => {
      console.log(`   ${gender}: ${count}`);
    });
  
  console.log('\n🎭 BREAKDOWN BY CLASS:');
  Object.entries(report.breakdown.byClass)
    .sort(([_, a], [__, b]) => b - a)
    .forEach(([characterClass, count]) => {
      console.log(`   ${characterClass}: ${count}`);
    });
  
  if (report.promptAnalysis.length > 0) {
    console.log('\n⚠️  DUPLICATE PROMPTS:');
    report.promptAnalysis.forEach(({ prompt, count }) => {
      console.log(`   ${count}x: ${prompt}`);
    });
  }
  
  if (report.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    report.errors.slice(0, 10).forEach(error => {
      console.log(`   ${error.testId}: ${error.error}`);
    });
    if (report.errors.length > 10) {
      console.log(`   ... and ${report.errors.length - 10} more errors`);
    }
  }
  
  console.log('\n' + '='.repeat(80));
}

async function runComprehensiveTest() {
  console.log('🎨 Starting Comprehensive Avatar Generation Test');
  console.log('='.repeat(80));
  
  if (targetRace) {
    console.log(`🎯 Testing single race: ${targetRace}`);
  } else {
    console.log('🌍 Testing all races');
  }
  
  console.log('\n🚀 Starting avatar generation tests...');
  console.log(`   Races: ${RACES.length}${targetRace ? ` (${targetRace})` : ''}`);
  console.log(`   Genders: ${GENDERS.length}`);
  console.log(`   Classes: Random assignment from ${ALL_CLASSES.length} classes`);
  
  let testCount = 0;
  let totalTests = 0;
  
  // Calculate total tests
  for (const race of RACES) {
    const ages = AGE_RANGES[race];
    totalTests += ages.length * GENDERS.length;
  }
  
  console.log(`   Total combinations: ${totalTests}`);
  console.log('   Estimated time: ~' + Math.ceil(totalTests / 60) + ' minutes');
  
  for (const race of RACES) {
    const ages = AGE_RANGES[race];
    
    for (const age of ages) {
      for (const gender of GENDERS) {
        testCount++;
        console.log(`\n[${testCount}/${totalTests}] Testing ${race} ${age}y ${gender}`);
        
        await testAvatarGeneration(race, age, gender);
        
        // Progress update every 5 tests
        if (testCount % 5 === 0) {
          const progress = ((testCount / totalTests) * 100).toFixed(1);
          log(`Progress: ${progress}% (${testCount}/${totalTests})`, 'info');
        }
      }
    }
  }
  
  // Generate and print report
  const report = generateTestReport();
  printReport(report);
  
  // Save detailed report to file
  const reportSuffix = targetRace ? `-${targetRace.toLowerCase()}` : '';
  const reportPath = path.join(__dirname, `avatar-test-report${reportSuffix}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`Detailed report saved to: ${reportPath}`, 'success');
  
  // Summary
  if (report.summary.duplicatePrompts === 0) {
    log('🎉 SUCCESS: No duplicate prompts detected!', 'success');
  } else {
    log(`⚠️  WARNING: ${report.summary.duplicatePrompts} duplicate prompts detected`, 'warning');
  }
  
  if (report.summary.successRate >= 90) {
    log('🎉 SUCCESS: High success rate achieved!', 'success');
  } else {
    log(`⚠️  WARNING: Low success rate: ${report.summary.successRate}`, 'warning');
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/api/generate-avatar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ race: 'Human', class: 'Fighter' })
    });
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  log('Checking if development server is running...', 'info');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    log('❌ Development server not running! Please start with: npm run dev', 'error');
    process.exit(1);
  }
  
  log('✅ Development server is running', 'success');
  
  await runComprehensiveTest();
}

if (require.main === module) {
  main().catch(error => {
    log(`❌ Test failed: ${error.message}`, 'error');
    process.exit(1);
  });
}

module.exports = { runComprehensiveTest, testAvatarGeneration }; 