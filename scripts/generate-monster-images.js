const fs = require('fs');
const path = require('path');

// Monster data structure for image generation
const MONSTER_DATA = [
  {
    name: "Aboleth",
    description: "A massive, tentacled aquatic creature with slimy skin and psychic abilities. It has a bulbous head with large, lidless eyes and multiple tentacles extending from its body.",
    type: "aberration"
  },
  {
    name: "Acolyte",
    description: "A humanoid in religious vestments, carrying holy symbols and sacred texts. They appear devout and focused on their divine mission.",
    type: "humanoid"
  },
  {
    name: "Adult Black Dragon",
    description: "A massive black dragon with obsidian-like scales, acid dripping from its jaws, and malevolent red eyes. It has large wings and a long, serpentine neck.",
    type: "dragon"
  },
  {
    name: "Adult Blue Dragon",
    description: "A large blue dragon with azure scales that shimmer like sapphires, lightning crackling around its body, and piercing blue eyes. It has a proud, regal bearing.",
    type: "dragon"
  },
  {
    name: "Adult Brass Dragon",
    description: "A brass dragon with metallic golden-brass scales, a long snout, and warm, intelligent eyes. It has a friendly, talkative appearance.",
    type: "dragon"
  },
  {
    name: "Adult Bronze Dragon",
    description: "A bronze dragon with metallic bronze scales, webbed wings, and sea-green eyes. It has an aquatic, sea-dwelling appearance.",
    type: "dragon"
  },
  {
    name: "Adult Copper Dragon",
    description: "A copper dragon with metallic copper scales, a mischievous expression, and amber eyes. It has a playful, trickster-like appearance.",
    type: "dragon"
  },
  {
    name: "Adult Gold Dragon",
    description: "A majestic gold dragon with brilliant golden scales, a noble bearing, and wise, ancient eyes. It radiates power and wisdom.",
    type: "dragon"
  },
  {
    name: "Adult Green Dragon",
    description: "A green dragon with emerald scales, toxic green eyes, and a cunning, predatory expression. It blends into forest environments.",
    type: "dragon"
  },
  {
    name: "Adult Red Dragon",
    description: "A massive red dragon with crimson scales, fire and smoke billowing from its nostrils, and fierce orange eyes. It embodies raw power and destruction.",
    type: "dragon"
  }
];

// Configuration
const BATCH_SIZE = 10;
const OUTPUT_DIR = path.join(__dirname, '../public/monster-images');
const PROMPT_PREFIX = "FANTASY DUNGEONS & DRAGONS DND PHOTOREALISM 5E SRD ";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to generate prompt for a monster
function generateMonsterPrompt(monster) {
  return `${PROMPT_PREFIX}${monster.name}: ${monster.description}. Square format, high quality, detailed, realistic, 8k resolution, professional photography, centered composition, clear visibility of the monster, dramatic lighting, fantasy art style.`;
}

// Function to save image data to file
async function saveImage(imageData, filename) {
  const filePath = path.join(OUTPUT_DIR, filename);
  
  // Convert base64 to buffer and save
  const buffer = Buffer.from(imageData.split(',')[1], 'base64');
  fs.writeFileSync(filePath, buffer);
  console.log(`✅ Saved: ${filename}`);
}

// Function to check if image already exists
function imageExists(filename) {
  const filePath = path.join(OUTPUT_DIR, filename);
  return fs.existsSync(filePath);
}

// Function to generate a single monster image
async function generateMonsterImage(monster) {
  const filename = `${monster.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`;
  
  // Check if image already exists
  if (imageExists(filename)) {
    console.log(`⏭️  Skipping ${monster.name} - image already exists`);
    return { success: true, skipped: true };
  }

  try {
    console.log(`🎨 Generating image for: ${monster.name}`);
    
    const prompt = generateMonsterPrompt(monster);
    console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);
    
    // Call the existing avatar generation API
    const response = await fetch('http://localhost:3000/api/generate-avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // We'll need to adapt this for monster generation
        // For now, using a placeholder structure
        monsterName: monster.name,
        monsterDescription: monster.description,
        monsterType: monster.type,
        prompt: prompt
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success && result.fullBodyImage) {
      await saveImage(result.fullBodyImage, filename);
      return { success: true, filename };
    } else {
      throw new Error(result.error || 'Failed to generate image');
    }
    
  } catch (error) {
    console.error(`❌ Error generating ${monster.name}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Function to process a batch of monsters
async function processBatch(monsters, batchNumber) {
  console.log(`\n🚀 Processing batch ${batchNumber} (${monsters.length} monsters)`);
  console.log('='.repeat(50));
  
  const results = [];
  
  for (const monster of monsters) {
    const result = await generateMonsterImage(monster);
    results.push({ monster: monster.name, ...result });
    
    // Add a small delay between requests to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Log batch results
  const successful = results.filter(r => r.success).length;
  const skipped = results.filter(r => r.skipped).length;
  const failed = results.filter(r => !r.success && !r.skipped).length;
  
  console.log(`\n📊 Batch ${batchNumber} Results:`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log(`❌ Failed: ${failed}`);
  
  return results;
}

// Main function to process all monsters in batches
async function generateAllMonsterImages() {
  console.log('🐉 Starting monster image generation');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`📦 Total monsters: ${MONSTER_DATA.length}`);
  console.log(`🔢 Batch size: ${BATCH_SIZE}`);
  
  const allResults = [];
  
  // Process monsters in batches
  for (let i = 0; i < MONSTER_DATA.length; i += BATCH_SIZE) {
    const batch = MONSTER_DATA.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    
    const batchResults = await processBatch(batch, batchNumber);
    allResults.push(...batchResults);
    
    // Add delay between batches
    if (i + BATCH_SIZE < MONSTER_DATA.length) {
      console.log('\n⏳ Waiting 5 seconds before next batch...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Final summary
  console.log('\n🎉 Monster image generation complete!');
  console.log('='.repeat(50));
  
  const totalSuccessful = allResults.filter(r => r.success).length;
  const totalSkipped = allResults.filter(r => r.skipped).length;
  const totalFailed = allResults.filter(r => !r.success && !r.skipped).length;
  
  console.log(`📊 Final Results:`);
  console.log(`✅ Total Successful: ${totalSuccessful}`);
  console.log(`⏭️  Total Skipped: ${totalSkipped}`);
  console.log(`❌ Total Failed: ${totalFailed}`);
  
  if (totalFailed > 0) {
    console.log('\n❌ Failed monsters:');
    allResults
      .filter(r => !r.success && !r.skipped)
      .forEach(r => console.log(`   - ${r.monster}: ${r.error}`));
  }
  
  console.log(`\n📁 Images saved to: ${OUTPUT_DIR}`);
}

// Run the script
if (require.main === module) {
  generateAllMonsterImages().catch(console.error);
}

module.exports = {
  generateMonsterImage,
  processBatch,
  generateAllMonsterImages
}; 