#!/usr/bin/env node

/**
 * Simple Avatar Generation Test Script
 * 
 * Usage:
 *   node scripts/test-avatar-simple.js [token] [race] [class] [gender] [age]
 * 
 * Examples:
 *   node scripts/test-avatar-simple.js "your-token"                    # Random everything
 *   node scripts/test-avatar-simple.js "your-token" "Human"            # Random class/gender/age
 *   node scripts/test-avatar-simple.js "your-token" "Human" "Fighter"  # Random gender/age
 *   node scripts/test-avatar-simple.js "your-token" "Human" "Fighter" "Male" 25  # Specific
 */

const fs = require('fs');
const path = require('path');

// Add Sharp for image processing (if available)
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('⚠️  Sharp not available, will use full body image as avatar');
}

// Configuration
const RACES = [
  'Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Small Fey Humanoid',
  'Half-Elf', 'Half-Orc', 'Tiefling', 'Aasimar', 'Goliath', 'Tabaxi'
];

const CLASSES = [
  'Fighter', 'Wizard', 'Rogue', 'Cleric', 'Ranger', 'Paladin', 
  'Bard', 'Sorcerer', 'Warlock', 'Monk', 'Druid', 'Barbarian'
];

const GENDERS = ['Male', 'Female', 'Non-binary'];

// Age ranges for each race (min, max)
const AGE_RANGES = {
  'Human': [18, 80],
  'Elf': [100, 750],
  'Dwarf': [50, 350],
  'Halfling': [20, 150],
  'Dragonborn': [15, 80],
  'Small Fey Humanoid': [40, 500],
  'Half-Elf': [20, 180],
  'Half-Orc': [14, 75],
  'Tiefling': [18, 100],
  'Aasimar': [18, 160],
  'Goliath': [18, 80],
  'Tabaxi': [18, 80]
};

// Starting equipment suggestions by class
const CLASS_EQUIPMENT = {
  'Fighter': ['longsword', 'shield', 'chain mail'],
  'Wizard': ['quarterstaff', 'component pouch', 'scholar\'s pack'],
  'Rogue': ['rapier', 'shortbow', 'leather armor'],
  'Cleric': ['mace', 'shield', 'scale mail'],
  'Ranger': ['longbow', 'shortsword', 'leather armor'],
  'Paladin': ['longsword', 'shield', 'chain mail'],
  'Bard': ['rapier', 'lute', 'leather armor'],
  'Sorcerer': ['quarterstaff', 'component pouch', 'explorer\'s pack'],
  'Warlock': ['quarterstaff', 'component pouch', 'scholar\'s pack'],
  'Monk': ['quarterstaff', 'explorer\'s pack'],
  'Druid': ['quarterstaff', 'component pouch', 'explorer\'s pack'],
  'Barbarian': ['greataxe', 'explorer\'s pack']
};

// Get command line arguments
const args = process.argv.slice(2);
const token = args[0];
const targetRace = args[1];
const targetClass = args[2];
const targetGender = args[3];
const targetAge = args[4] ? parseInt(args[4]) : null;

// Validate token
if (!token) {
  console.error('❌ Error: Session token required!');
  console.error('');
  console.error('To get the session token:');
  console.error('1. Open your browser and go to http://localhost:3000');
  console.error('2. Sign in with Google');
  console.error('3. Open DevTools (F12) → Application/Storage → Cookies');
  console.error('4. Copy the value of the "next-auth.session-token" cookie');
  console.error('5. Run: node scripts/test-avatar-simple.js "your-session-token-here"');
  console.error('');
  console.error('Examples:');
  console.error('  node scripts/test-avatar-simple.js "token"                    # Random everything');
  console.error('  node scripts/test-avatar-simple.js "token" "Human"            # Random class/gender/age');
  console.error('  node scripts/test-avatar-simple.js "token" "Human" "Fighter"  # Random gender/age');
  console.error('  node scripts/test-avatar-simple.js "token" "Human" "Fighter" "Male" 25  # Specific');
  process.exit(1);
}

// Validate race if provided
if (targetRace && !RACES.includes(targetRace)) {
  console.error(`❌ Error: Invalid race "${targetRace}"`);
  console.error(`Available races: ${RACES.join(', ')}`);
  process.exit(1);
}

// Validate class if provided
if (targetClass && !CLASSES.includes(targetClass)) {
  console.error(`❌ Error: Invalid class "${targetClass}"`);
  console.error(`Available classes: ${CLASSES.join(', ')}`);
  process.exit(1);
}

// Validate gender if provided
if (targetGender && !GENDERS.includes(targetGender)) {
  console.error(`❌ Error: Invalid gender "${targetGender}"`);
  console.error(`Available genders: ${GENDERS.join(', ')}`);
  process.exit(1);
}

// Validate age if provided
if (targetAge !== null && (isNaN(targetAge) || targetAge < 1)) {
  console.error(`❌ Error: Invalid age "${targetAge}"`);
  process.exit(1);
}

function log(message, type = 'info') {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomAge(race) {
  const range = AGE_RANGES[race] || AGE_RANGES['Human'];
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
}

async function cropToAvatar(fullBodyImageUrl, outputPath) {
  if (!sharp) {
    console.log('⚠️  Sharp not available, skipping cropping');
    return null;
  }
  
  try {
    // Download the image
    const imageResponse = await fetch(fullBodyImageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    
    // Crop to square avatar (head/shoulders area)
    const croppedBuffer = await sharp(Buffer.from(imageBuffer))
      .resize(400, 400, {
        fit: 'cover',
        position: 'top' // Focus on the top portion (head/shoulders) - 15% more zoom
      })
      .webp({ quality: 80 })
      .toBuffer();
    
    // Save the cropped avatar
    fs.writeFileSync(outputPath, croppedBuffer);
    console.log(`✅ Cropped avatar saved: ${outputPath}`);
    
    return croppedBuffer;
  } catch (error) {
    console.error(`❌ Cropping failed: ${error.message}`);
    return null;
  }
}

async function generateAvatar(race, characterClass, gender, age) {
  const testId = `${race}-${characterClass}-${gender}-${age}`;
  
  try {
    log(`🎨 Generating avatar: ${testId}`, 'info');
    
    // Build character data
    const characterData = {
      race,
      class: characterClass,
      gender,
      age,
      background: 'Soldier',
      personalityTraits: ['I use polysyllabic words'],
      ideals: ['Duty'],
      bonds: ['My honor is my life'],
      flaws: ['I am easily distracted'],
      appearance: `A ${age}-year-old ${race.toLowerCase()} ${characterClass.toLowerCase()} with age-appropriate features`,
      equippedWeapons: CLASS_EQUIPMENT[characterClass] || [],
      equippedArmor: []
    };

    log(`📤 Sending request to API...`, 'info');
    log(`   Appearance: ${characterData.appearance}`, 'info');
    
    const response = await fetch('http://localhost:3000/api/generate-avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `next-auth.session-token=${token}`
      },
      body: JSON.stringify(characterData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Avatar generation failed');
    }

    log(`✅ Avatar generated successfully!`, 'success');
    log(`   Service: ${data.service}`, 'info');

    // Save images if they exist
    if (data.fullBodyImage || data.avatarImage) {
      const testImagesDir = path.join(__dirname, '..', 'test-images');
      
      // Create test-images directory if it doesn't exist
      if (!fs.existsSync(testImagesDir)) {
        fs.mkdirSync(testImagesDir, { recursive: true });
        log(`📁 Created test-images directory`, 'info');
      }

      // Save full body image
      if (data.fullBodyImage) {
        const fullBodyPath = path.join(testImagesDir, `${testId}-fullbody.webp`);
        try {
          const imageResponse = await fetch(data.fullBodyImage);
          const imageBuffer = await imageResponse.arrayBuffer();
          fs.writeFileSync(fullBodyPath, Buffer.from(imageBuffer));
          log(`💾 Saved full body image: ${fullBodyPath}`, 'success');
        } catch (error) {
          log(`❌ Failed to save full body image: ${error.message}`, 'error');
        }
      }

      // Handle avatar image - now cropped from full body
      let avatarPath = null;
      if (data.fullBodyImage) {
        // Crop the full body image to create avatar
        avatarPath = path.join(testImagesDir, `${testId}-avatar.webp`);
        try {
          const croppedAvatar = await cropToAvatar(data.fullBodyImage, avatarPath);
          if (croppedAvatar) {
            log(`✂️  Cropped avatar from full body image: ${avatarPath}`, 'success');
          } else {
            log(`⚠️  Using full body image as avatar (cropping failed)`, 'warning');
            // Copy full body as avatar if cropping failed
            const fullBodyPath = path.join(testImagesDir, `${testId}-fullbody.webp`);
            if (fs.existsSync(fullBodyPath)) {
              fs.copyFileSync(fullBodyPath, avatarPath);
              log(`💾 Copied full body as avatar: ${avatarPath}`, 'info');
            }
          }
        } catch (error) {
          log(`❌ Failed to crop avatar: ${error.message}`, 'error');
        }
      } else if (data.avatarImage) {
        // Fallback: save avatar image if provided (legacy)
        avatarPath = path.join(testImagesDir, `${testId}-avatar.webp`);
        try {
          const imageResponse = await fetch(data.avatarImage);
          const imageBuffer = await imageResponse.arrayBuffer();
          fs.writeFileSync(avatarPath, Buffer.from(imageBuffer));
          log(`💾 Saved avatar image: ${avatarPath}`, 'success');
        } catch (error) {
          log(`❌ Failed to save avatar image: ${error.message}`, 'error');
        }
      }
    }

    return {
      success: true,
      testId,
      race,
      class: characterClass,
      gender,
      age,
      service: data.service,
      fullBodyImage: data.fullBodyImage ? `${testId}-fullbody.webp` : null,
      avatarImage: data.avatarImage ? `${testId}-avatar.webp` : null
    };
    
  } catch (error) {
    log(`❌ Failed: ${testId} - ${error.message}`, 'error');
    return {
      success: false,
      testId,
      race,
      class: characterClass,
      gender,
      age,
      error: error.message
    };
  }
}

async function runTest() {
  console.log('🎨 Avatar Generation Test');
  console.log('='.repeat(50));
  
  // Determine what to test
  if (targetRace) {
    // Specific character test - one avatar
    const race = targetRace;
    const characterClass = targetClass || getRandomItem(CLASSES);
    const gender = targetGender || getRandomItem(GENDERS);
    const age = targetAge || getRandomAge(race);
    
    console.log(`🎯 Testing specific character:`);
    console.log(`   Race: ${race}`);
    console.log(`   Class: ${characterClass}${targetClass ? '' : ' (random)'}`);
    console.log(`   Gender: ${gender}${targetGender ? '' : ' (random)'}`);
    console.log(`   Age: ${age}${targetAge ? '' : ' (random)'}`);
    console.log('');
    
    const result = await generateAvatar(race, characterClass, gender, age);
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(50));
    console.log(result.success ? '✅ Success!' : '❌ Failed');
    if (!result.success) {
      console.log(`   Error: ${result.error}`);
    }
    
  } else {
    // Test all races - one avatar per race
    console.log(`🎯 Testing all races (one avatar per race):`);
    console.log(`   Races: ${RACES.length}`);
    console.log(`   Classes: Random`);
    console.log(`   Genders: Random`);
    console.log(`   Ages: Random (race-appropriate)`);
    console.log('');
    
    const results = [];
    
    for (const race of RACES) {
      const characterClass = getRandomItem(CLASSES);
      const gender = getRandomItem(GENDERS);
      const age = getRandomAge(race);
      
      console.log(`\n[${results.length + 1}/${RACES.length}] Testing ${race} ${characterClass} ${gender} (${age}y)`);
      
      const result = await generateAvatar(race, characterClass, gender, age);
      results.push(result);
      
      // Rate limiting
      if (results.length < RACES.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Generate report
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);
    console.log(`📈 Success Rate: ${((successful.length / results.length) * 100).toFixed(1)}%`);
    
    if (failed.length > 0) {
      console.log('\n❌ FAILURES:');
      failed.forEach(f => {
        console.log(`   ${f.testId}: ${f.error}`);
      });
    }
    
    // Save detailed report
    const reportPath = path.join(__dirname, '..', 'test-images', `avatar-test-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify({
      summary: {
        totalTests: results.length,
        successful: successful.length,
        failed: failed.length,
        successRate: ((successful.length / results.length) * 100).toFixed(1) + '%'
      },
      results: results
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }
  
  console.log('\n🎉 Test completed!');
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/api/generate-avatar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ race: 'Human', class: 'Fighter' })
    });
    
    if (response.status === 401) {
      log('✅ Server is running (401 expected without auth)', 'success');
      return true;
    } else if (response.ok) {
      log('✅ Server is running', 'success');
      return true;
    } else {
      log('❌ Server responded with error', 'error');
      return false;
    }
  } catch (error) {
    log('❌ Cannot connect to server', 'error');
    return false;
  }
}

async function main() {
  log('Checking if development server is running...', 'info');
  const serverOk = await checkServer();
  
  if (!serverOk) {
    console.log('\n❌ Please start the development server first:');
    console.log('   npm run dev');
    process.exit(1);
  }
  
  await runTest();
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

module.exports = { generateAvatar, runTest }; 