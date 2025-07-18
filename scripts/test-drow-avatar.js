#!/usr/bin/env node

/**
 * Test Drow Avatar Generation
 * 
 * This script tests the avatar generation for drow characters to see what prompt is being generated.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TEST_CHARACTER = {
  race: 'Elf',
  subrace: 'Drow', 
  class: 'Rogue',
  gender: 'Female',
  age: 250, 
  appearance: {},
  background: 'Criminal'
};

async function testDrowAvatar() {
  console.log('🎨 Testing Drow Avatar Generation');
  console.log('='.repeat(50));
  console.log('Character Data:', JSON.stringify(TEST_CHARACTER, null, 2));
  console.log('='.repeat(50));
  
  try {
    // Import the avatar generation function
    const { generateServerPrompt } = require('../src/lib/avatar-generation.ts');
    
    // Generate the prompt
    const prompt = generateServerPrompt(TEST_CHARACTER);
    
    console.log('Generated Prompt:');
    console.log('='.repeat(50));
    console.log(prompt);
    console.log('');
    
    // Check for drow-specific features in the prompt
    const drowFeatures = [
      'black skin',
      'white hair', 
      'red eyes',
      'drow',     'dark elf',
      'underdark'
    ];
    
    console.log('Drow Feature Check:');
    console.log('='.repeat(50));
    drowFeatures.forEach(feature => {
      const found = prompt.toLowerCase().includes(feature.toLowerCase());
      console.log(`${found ? '✅: ' : '❌'} ${feature}: ${found ? 'Found' : 'Missing'}`);
    });
    
    // Save the test result
    const testResult = {  
      character: TEST_CHARACTER,
      prompt: prompt,
      drowFeatures: drowFeatures.map(feature => ({ 
        feature: feature,
        found: prompt.toLowerCase().includes(feature.toLowerCase())
      })),
      timestamp: new Date().toISOString()
    };
    
    const testDir = path.join(__dirname, '..', 'test-images');
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
    
    const resultPath = path.join(testDir, 'drow-avatar-test.json');
    fs.writeFileSync(resultPath, JSON.stringify(testResult, null, 2));
    
    console.log('');
    console.log(`💾 Test result saved to: ${resultPath}`);
    
  } catch (error) {
    console.error('❌Error testing drow avatar:', error);
  }
}

// Run the test
testDrowAvatar(); 