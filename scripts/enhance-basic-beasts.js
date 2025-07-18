#!/usr/bin/env node

/**
 * Enhance Basic Beasts Script
 * 
 * This script enhances basic beast descriptions that are currently just
 * generic placeholders like "A small beast with challenge rating 0"
 */

const fs = require('fs');
const path = require('path');

// Better descriptions for basic beasts
const BETTER_BEAST_DESCRIPTIONS = {
  "Octopus": {
    description: "A small, intelligent cephalopod with eight flexible tentacles and a bulbous head. Octopuses are masters of camouflage and can change their skin color and texture to blend seamlessly with their surroundings. They are excellent swimmers and can squeeze through incredibly small spaces.",
    background: "Octopuses inhabit coastal waters and coral reefs, where they hunt for crabs, fish, and other small marine creatures. They are highly intelligent for invertebrates and have been known to solve complex puzzles and use tools. When threatened, they release a cloud of dark ink to confuse predators and escape."
  },
  "Giant Octopus": {
    description: "A massive cephalopod with eight powerful tentacles, each lined with suckers that can grip with incredible strength. Giant octopuses are highly intelligent and territorial, often claiming underwater caves or shipwrecks as their lairs. They can change color rapidly for camouflage or communication.",
    background: "Giant octopuses dwell in deep coastal waters, often near shipwrecks or underwater caves. They are excellent hunters that can take down large fish, sharks, and even small whales. Despite their size, they are surprisingly stealthy and can ambush prey with remarkable precision."
  },
  "Owl": {
    description: "A nocturnal bird of prey with large, forward-facing eyes and exceptional hearing. Owls have specialized feathers that allow them to fly silently, making them deadly hunters in the darkness. Their heads can rotate nearly 270 degrees to scan their surroundings.",
    background: "Owls are found in forests, grasslands, and urban areas where they hunt small mammals, birds, and insects. They are excellent at detecting movement and sound, with some species able to hear a mouse's heartbeat from several feet away. Many cultures consider them symbols of wisdom."
  },
  "Giant Owl": {
    description: "A massive owl with a wingspan that can reach over 20 feet. Giant owls are intelligent creatures that often form bonds with good-aligned beings, serving as mounts or companions. They have the same silent flight and keen senses as their smaller cousins, but on a much larger scale.",
    background: "Giant owls typically dwell in ancient forests or remote mountain ranges. They are often found in the company of druids, rangers, or other nature-loving beings. Some giant owls have learned to speak Common and can communicate with humanoids."
  },
  "Panther": {
    description: "A sleek, powerful big cat with dark fur and incredible agility. Panthers are excellent climbers and can leap great distances. They are solitary hunters that prefer to stalk their prey from the shadows before launching a swift, deadly attack.",
    background: "Panthers inhabit dense forests and jungles where their dark coloration provides excellent camouflage. They are territorial animals that mark their territory with scent and vocalizations. Panthers are most active at dawn and dusk, when their prey is also active."
  },
  "Giant Rat": {
    description: "A massive rodent with sharp teeth and a long, hairless tail. Giant rats are highly adaptable creatures that can survive in almost any environment. They are excellent swimmers and can squeeze through surprisingly small openings.",
    background: "Giant rats are commonly found in sewers, dungeons, and other dark, damp places. They often live in large colonies and can quickly overwhelm unprepared adventurers. Despite their size, they are still rodents at heart and will flee from bright light and loud noises."
  },
  "Rat": {
    description: "A small, agile rodent with sharp teeth and a long, hairless tail. Rats are highly intelligent and adaptable creatures that can survive in almost any environment. They are excellent climbers and can squeeze through tiny openings.",
    background: "Rats are found in urban areas, sewers, and natural environments where they scavenge for food. They are social animals that live in colonies and communicate through high-pitched squeaks and body language. Rats are often considered pests but are actually quite clean animals."
  },
  "Raven": {
    description: "A large, intelligent black bird with a distinctive croaking call. Ravens are among the most intelligent birds and can learn to mimic human speech. They are excellent fliers and can perform complex aerial maneuvers.",
    background: "Ravens are found in forests, mountains, and urban areas where they scavenge for food. They are highly social birds that mate for life and often work together to find food. Many cultures consider them symbols of wisdom or omens of death."
  },
  "Giant Raven": {
    description: "A massive raven with a wingspan that can reach over 10 feet. Giant ravens are highly intelligent and often serve as messengers or companions to powerful beings. They can learn to speak Common and are excellent at delivering messages or scouting ahead.",
    background: "Giant ravens typically dwell in remote mountain ranges or ancient forests. They are often found in the company of druids, wizards, or other magical beings who appreciate their intelligence and loyalty. Some giant ravens have been known to form lifelong bonds with humanoids."
  },
  "Spider": {
    description: "A small arachnid with eight legs and the ability to spin silk webs. Spiders are excellent hunters that use their webs to catch prey or as safety lines when climbing. They have excellent eyesight and can detect the slightest vibrations in their webs.",
    background: "Spiders are found in almost every environment, from forests to deserts to urban areas. They are solitary hunters that use their webs to catch insects and other small creatures. Many species are venomous, though most are harmless to humanoids."
  },
  "Giant Spider": {
    description: "A massive arachnid with eight legs and the ability to spin large webs. Giant spiders are patient hunters that use their webs to trap prey and create elaborate lairs. They are excellent climbers and can move silently through their web-filled domains.",
    background: "Giant spiders typically dwell in dark forests, caves, or abandoned buildings where they can build large webs undisturbed. They are territorial creatures that will defend their hunting grounds fiercely. Some giant spiders have been known to work together in small groups."
  },
  "Wolf": {
    description: "A medium-sized canine with gray or brown fur and sharp teeth. Wolves are highly social animals that live in packs led by an alpha pair. They are excellent hunters that work together to bring down large prey.",
    background: "Wolves inhabit forests, grasslands, and tundra where they hunt deer, elk, and other large herbivores. They are highly intelligent and communicate through body language, vocalizations, and scent marking. Wolves are fiercely loyal to their pack and will defend their territory from intruders."
  },
  "Dire Wolf": {
    description: "A massive wolf with shaggy fur and powerful jaws. Dire wolves are larger and more ferocious than their modern counterparts. They hunt in packs and are known for their incredible stamina and coordination.",
    background: "Dire wolves once roamed the wilderness in large packs, preying on large game like mammoths and giant deer. They are highly intelligent and work together with remarkable efficiency to bring down their prey. Despite their size, they are surprisingly stealthy hunters."
  },
  "Giant Wolf": {
    description: "A massive wolf with thick fur and powerful muscles. Giant wolves are intelligent creatures that often serve as mounts or companions to powerful beings. They have the same pack hunting instincts as regular wolves but on a much larger scale.",
    background: "Giant wolves typically dwell in remote wilderness areas where they can hunt large game without competition. They are often found in the company of druids, rangers, or other nature-loving beings. Some giant wolves have been known to form bonds with humanoids."
  }
};

// Function to enhance basic beast descriptions
function enhanceBasicBeasts() {
  const beastFilePath = path.join(__dirname, '..', 'src', 'data', 'monsters', 'beast.ts');
  
  if (!fs.existsSync(beastFilePath)) {
    console.error('Beast file not found!');
    return;
  }
  
  console.log('Processing beast monsters...');
  
  // Read the file content
  let content = fs.readFileSync(beastFilePath, 'utf8');
  let totalEnhanced = 0;
  
  // Process each beast that needs enhancement
  Object.keys(BETTER_BEAST_DESCRIPTIONS).forEach(beastName => {
    const beastInfo = BETTER_BEAST_DESCRIPTIONS[beastName];
    
    // Look for the beast in the file
    const beastPattern = new RegExp(`"name":\\s*"${beastName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?}(?=\\s*,|\\s*\\])`, 'gs');
    const matches = content.match(beastPattern);
    
    if (matches) {
      matches.forEach(match => {
        let updatedMatch = match;
        
        // Update description if it's generic
        if (match.includes('"description": "A ') && match.includes(' beast with challenge rating')) {
          updatedMatch = updatedMatch.replace(
            /"description":\s*"[^"]*"/,
            `"description": "${beastInfo.description}"`
          );
          console.log(`  ✅ Enhanced description for ${beastName}`);
        }
        
        // Add background if it doesn't exist
        if (!match.includes('"background"')) {
          const newBackground = `,\n    "background": "${beastInfo.background}"`;
          updatedMatch = updatedMatch.replace(/}(?=\s*,|\s*\])/, `${newBackground}\n  }`);
          console.log(`  ✅ Added background for ${beastName}`);
        }
        
        // Replace the original match with the updated one
        content = content.replace(match, updatedMatch);
        totalEnhanced++;
      });
    }
  });
  
  // Write the updated file
  fs.writeFileSync(beastFilePath, content, 'utf8');
  
  console.log(`\n📊 Summary:`);
  console.log(`Beasts enhanced: ${totalEnhanced}`);
  console.log(`\n🎉 Basic beast descriptions enhanced successfully!`);
}

// Run the enhancement
enhanceBasicBeasts(); 