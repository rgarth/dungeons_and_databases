const fs = require('fs');
const path = require('path');

// Test script to systematically verify monster modal functionality
async function testAllMonsters() {
  console.log('🧪 Starting comprehensive monster modal test...\n');
  
  try {
    // Fetch all monsters from the API
    const response = await fetch('http://localhost:3000/api/monsters');
    if (!response.ok) {
      throw new Error(`Failed to fetch monsters: ${response.status}`);
    }
    
    const monsters = await response.json();
    console.log(`📊 Found ${monsters.length} monsters to test\n`);
    
    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    
    // Test each monster systematically
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      console.log(`\n${i + 1}/${monsters.length} Testing: ${monster.name} (CR ${monster.challengeRating})`);
      
      try {
        // Test 1: Basic monster data structure
        const basicTest = testBasicStructure(monster);
        if (!basicTest.valid) {
          throw new Error(`Basic structure test failed: ${basicTest.error}`);
        }
        
        // Test 2: Required fields
        const requiredTest = testRequiredFields(monster);
        if (!requiredTest.valid) {
          throw new Error(`Required fields test failed: ${requiredTest.error}`);
        }
        
        // Test 3: Data type validation
        const typeTest = testDataTypes(monster);
        if (!typeTest.valid) {
          throw new Error(`Data type test failed: ${typeTest.error}`);
        }
        
        // Test 4: Modal rendering simulation
        const modalTest = testModalRendering(monster);
        if (!modalTest.valid) {
          throw new Error(`Modal rendering test failed: ${modalTest.error}`);
        }
        
        console.log(`✅ ${monster.name} - All tests passed`);
        successCount++;
        
      } catch (error) {
        console.log(`❌ ${monster.name} - ${error.message}`);
        errors.push({
          monster: monster.name,
          error: error.message,
          data: monster
        });
        errorCount++;
      }
    }
    
    // Generate test report
    console.log('\n' + '='.repeat(60));
    console.log('📋 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${successCount}/${monsters.length}`);
    console.log(`❌ Failed: ${errorCount}/${monsters.length}`);
    console.log(`📊 Success Rate: ${((successCount / monsters.length) * 100).toFixed(1)}%`);
    
    if (errors.length > 0) {
      console.log('\n🚨 ERRORS FOUND:');
      errors.forEach((error, index) => {
        console.log(`\n${index + 1}. ${error.monster}:`);
        console.log(`   Error: ${error.error}`);
      });
      
      // Save detailed error report
      const errorReport = {
        timestamp: new Date().toISOString(),
        totalMonsters: monsters.length,
        successCount,
        errorCount,
        errors
      };
      
      fs.writeFileSync('monster-test-errors.json', JSON.stringify(errorReport, null, 2));
      console.log('\n📄 Detailed error report saved to: monster-test-errors.json');
    }
    
    console.log('\n🎉 Test completed!');
    
  } catch (error) {
    console.error('💥 Test script failed:', error.message);
    process.exit(1);
  }
}

function testBasicStructure(monster) {
  // Test that monster has the basic structure expected by the modal
  const requiredKeys = [
    'name', 'size', 'type', 'alignment', 'challengeRating', 'xp',
    'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',
    'armorClass', 'hitPoints', 'hitDice', 'speed', 'senses', 'languages'
  ];
  
  for (const key of requiredKeys) {
    if (!(key in monster)) {
      return { valid: false, error: `Missing required key: ${key}` };
    }
  }
  
  return { valid: true };
}

function testRequiredFields(monster) {
  // Test that required fields have valid values
  if (!monster.name || typeof monster.name !== 'string') {
    return { valid: false, error: 'Invalid name' };
  }
  
  if (!monster.size || !['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'].includes(monster.size)) {
    return { valid: false, error: 'Invalid size' };
  }
  
  if (!monster.type || typeof monster.type !== 'string') {
    return { valid: false, error: 'Invalid type' };
  }
  
  if (!monster.challengeRating || typeof monster.challengeRating !== 'string') {
    return { valid: false, error: 'Invalid challenge rating' };
  }
  
  if (typeof monster.xp !== 'number' || monster.xp < 0) {
    return { valid: false, error: 'Invalid XP' };
  }
  
  // Test ability scores
  const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  for (const ability of abilities) {
    if (typeof monster[ability] !== 'number' || monster[ability] < 1 || monster[ability] > 30) {
      return { valid: false, error: `Invalid ${ability} score: ${monster[ability]}` };
    }
  }
  
  if (typeof monster.armorClass !== 'number' || monster.armorClass < 1) {
    return { valid: false, error: 'Invalid armor class' };
  }
  
  if (typeof monster.hitPoints !== 'number' || monster.hitPoints < 1) {
    return { valid: false, error: 'Invalid hit points' };
  }
  
  return { valid: true };
}

function testDataTypes(monster) {
  // Test that arrays contain only strings (to prevent React rendering errors)
  const arrayFields = ['languages', 'damageResistances', 'damageImmunities', 'conditionImmunities', 'environment'];
  
  for (const field of arrayFields) {
    if (monster[field] && Array.isArray(monster[field])) {
      for (let i = 0; i < monster[field].length; i++) {
        const item = monster[field][i];
        if (typeof item !== 'string' && typeof item !== 'number') {
          return { 
            valid: false, 
            error: `${field}[${i}] contains non-string/number value: ${JSON.stringify(item)}` 
          };
        }
      }
    }
  }
  
  // Test skills object
  if (monster.skills && typeof monster.skills === 'object') {
    for (const [skill, bonus] of Object.entries(monster.skills)) {
      if (typeof skill !== 'string' || typeof bonus !== 'number') {
        return { 
          valid: false, 
          error: `Invalid skill entry: ${skill} = ${bonus}` 
        };
      }
    }
  }
  
  // Test saving throws object
  if (monster.savingThrows && typeof monster.savingThrows === 'object') {
    for (const [ability, bonus] of Object.entries(monster.savingThrows)) {
      if (typeof ability !== 'string' || typeof bonus !== 'number') {
        return { 
          valid: false, 
          error: `Invalid saving throw entry: ${ability} = ${bonus}` 
        };
      }
    }
  }
  
  // Test speed object
  if (monster.speed && typeof monster.speed === 'object') {
    const speedTypes = ['walk', 'fly', 'swim', 'climb', 'burrow'];
    for (const speedType of speedTypes) {
      if (monster.speed[speedType] !== undefined && typeof monster.speed[speedType] !== 'number') {
        return { 
          valid: false, 
          error: `Invalid speed ${speedType}: ${monster.speed[speedType]}` 
        };
      }
    }
    if (monster.speed.hover !== undefined && typeof monster.speed.hover !== 'boolean') {
      return { 
        valid: false, 
        error: `Invalid hover speed: ${monster.speed.hover}` 
      };
    }
  }
  
  return { valid: true };
}

function testModalRendering(monster) {
  // Simulate what the modal would render to catch potential issues
  
  // Test ability score calculations
  const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  for (const ability of abilities) {
    const score = monster[ability];
    const modifier = Math.floor((score - 10) / 2);
    if (isNaN(modifier)) {
      return { valid: false, error: `Cannot calculate modifier for ${ability}: ${score}` };
    }
  }
  
  // Test speed formatting
  if (monster.speed) {
    const parts = [];
    if (monster.speed.walk) parts.push(`${monster.speed.walk} ft.`);
    if (monster.speed.fly) parts.push(`${monster.speed.fly} ft. fly`);
    if (monster.speed.swim) parts.push(`${monster.speed.swim} ft. swim`);
    if (monster.speed.climb) parts.push(`${monster.speed.climb} ft. climb`);
    if (monster.speed.burrow) parts.push(`${monster.speed.burrow} ft. burrow`);
    if (monster.speed.hover) parts.push("hover");
    
    if (parts.length === 0) {
      parts.push("0 ft.");
    }
    
    const speedString = parts.join(", ");
    if (typeof speedString !== 'string') {
      return { valid: false, error: 'Speed formatting failed' };
    }
  }
  
  // Test armor class formatting
  let acString = `${monster.armorClass}`;
  if (monster.armorType) {
    acString = `${monster.armorClass} (${monster.armorType})`;
  }
  if (typeof acString !== 'string') {
    return { valid: false, error: 'Armor class formatting failed' };
  }
  
  // Test languages formatting
  if (monster.languages && monster.languages.length > 0) {
    const languageStrings = monster.languages.map(lang => 
      typeof lang === 'string' ? lang : String(lang)
    );
    const languagesString = languageStrings.join(", ");
    if (typeof languagesString !== 'string') {
      return { valid: false, error: 'Languages formatting failed' };
    }
  }
  
  // Test senses formatting
  if (monster.senses) {
    const senses = [];
    if (monster.senses.darkvision) senses.push(`Darkvision ${monster.senses.darkvision} ft.`);
    if (monster.senses.blindsight) senses.push(`Blindsight ${monster.senses.blindsight} ft.`);
    if (monster.senses.tremorsense) senses.push(`Tremorsense ${monster.senses.tremorsense} ft.`);
    if (monster.senses.truesight) senses.push(`Truesight ${monster.senses.truesight} ft.`);
    if (monster.senses.passivePerception) senses.push(`Passive Perception ${monster.senses.passivePerception}`);
    
    const sensesString = senses.join(", ");
    if (typeof sensesString !== 'string') {
      return { valid: false, error: 'Senses formatting failed' };
    }
  }
  
  return { valid: true };
}

// Run the test
testAllMonsters().catch(console.error); 