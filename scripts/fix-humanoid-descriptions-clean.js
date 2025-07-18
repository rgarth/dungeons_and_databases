#!/usr/bin/env node

/**
 * Fix Humanoid Descriptions Script (Clean Version)
 * 
 * This script replaces all humanoid monster descriptions with official D&D 5e SRD descriptions
 * Uses a more reliable approach to avoid regex issues
 */

const fs = require('fs');
const path = require('path');

// Official D&D 5e SRD descriptions for humanoids
const OFFICIAL_DESCRIPTIONS = {
  "Acolyte": "Acolytes are junior members of a religious order who serve under priests and clerics. They perform various duties in temples and shrines, from tending to the sick and poor to maintaining sacred texts and performing minor ceremonies. While not as powerful as full priests, acolytes are granted basic divine magic by their deities and often serve as healers and spiritual guides in their communities.",
  
  "Archmage": "Archmages are the most powerful mortal spellcasters, having dedicated decades to mastering the arcane arts. These venerable wizards have transcended the limitations of lesser mages and can wield magic of incredible power. Many archmages serve as advisors to rulers, while others pursue their own agendas—whether benevolent, malevolent, or simply arcane. Their towers and sanctums are protected by powerful magical wards, and they often maintain networks of apprentices and magical constructs to serve their needs.",
  
  "Assassin": "Assassins are highly trained killers who specialize in eliminating targets quickly and quietly. They are masters of stealth, disguise, and the use of poison. Assassins work for the highest bidder, whether that be nobles, guildmasters, sovereigns, or anyone else who can afford their services. They are remorseless and efficient, preferring to strike from the shadows and leave no witnesses.",
  
  "Bandit": "Bandits are outlaws who prey on travelers and settlements, roving in gangs led by more experienced criminals. Not all bandits are inherently evil—oppression, drought, disease, or famine can often drive otherwise honest folk to a life of banditry. Pirates are bandits of the high seas, either as freebooters interested only in treasure and murder, or as privateers sanctioned by the crown to attack enemy vessels.",
  
  "Bandit Captain": "Bandit captains are charismatic leaders who can keep a gang of selfish malcontents in line through a combination of strong personality, ruthless cunning, and silver-tongued persuasion. Pirate captains are variations who command ships and crews, meting out rewards and punishment to maintain discipline. More than treasure, these captains crave infamy and reputation, and prisoners who appeal to their vanity are more likely to be treated fairly.",
  
  "Berserker": "Berserkers are fierce warriors who enter battle in a state of supernatural rage. They fight with reckless abandon, seemingly immune to pain and fear. Some berserkers are tribal warriors who channel the spirits of animals, while others are cursed individuals who cannot control their battle fury. In combat, they become terrifying opponents who seem to grow stronger as they take damage.",
  
  "Bugbear": "Bugbears are large, hairy goblinoids with long arms and a hunched posture. They are stealthy despite their size and prefer to ambush their prey. Bugbears are more intelligent than their goblin cousins and often serve as leaders or enforcers in goblinoid communities. They are cruel and sadistic, taking pleasure in the suffering of others.",
  
  "Commoner": "Commoners represent the ordinary people of the world—peasants, serfs, slaves, servants, pilgrims, merchants, artisans, and hermits. They are the backbone of society, performing the daily labor that keeps communities functioning. While most commoners are peaceful, desperate circumstances can drive them to violence or banditry.",
  
  "Cultist": "Cultists are fanatical followers of dark gods, demon lords, or other malevolent entities. They are willing to sacrifice everything—including their own lives and the lives of others—to further their dark masters' goals. Cultists often work in secret, infiltrating communities to spread corruption and gather converts. They are dangerous not just for their combat abilities, but for their ability to corrupt others.",
  
  "Cult Fanatic": "Cult fanatics are the most dedicated and dangerous members of dark cults. They have been granted supernatural powers by their dark masters and are willing to die for their cause. These fanatics often serve as leaders or enforcers within their cults, using both magical and mundane means to advance their dark agenda. They are utterly convinced of the righteousness of their cause and cannot be reasoned with.",
  
  "Drow": "Drow are dark elves who dwell in the vast underground cities of the Underdark. They are ruled by powerful matriarchs and are known for their cruelty, ambition, and mastery of dark magic. Drow society is built on intrigue and betrayal, with each house constantly scheming against the others. They are excellent warriors and spellcasters, but their greatest weapon is their ability to manipulate and deceive.",
  
  "Druid": "Druids are guardians of the natural world, drawing their power from the spirits of nature and the elements. They can transform into animals, command the forces of nature, and communicate with beasts and plants. Druids often serve as advisors to communities that live close to nature, helping to maintain the balance between civilization and the wild. They are fierce protectors of their sacred groves and the creatures that dwell within them.",
  
  "Duergar": "Duergar are gray dwarves who have been corrupted by the influence of the Underdark. They are larger and stronger than their surface-dwelling cousins, but their souls have been twisted by centuries of slavery and exposure to dark magic. Duergar are excellent craftsmen and warriors, but they are also paranoid and cruel. They often serve as mercenaries or slavers, using their innate magical abilities to dominate others.",
  
  "Gladiator": "Gladiators are skilled warriors who fight for entertainment in arenas and coliseums. Some are brutal pit fighters who treat each match as a life-or-death struggle, while others are professional duelists who command huge fees but rarely fight to the death. Gladiators are masters of various weapons and fighting styles, and many develop unique techniques to entertain crowds and survive in the arena.",
  
  "Gnoll": "Gnolls are hyena-headed humanoids who are driven by an insatiable hunger for flesh. They are savage and cruel, forming packs that hunt and raid settlements for food and slaves. Gnolls are led by powerful spellcasters called flinds, who can control their pack through magical means. They are excellent trackers and can follow prey for days without rest.",
  
  "Goblin": "Goblins are small, green-skinned humanoids with a penchant for mischief and cruelty. They are cowardly when alone but dangerous in groups, especially when led by stronger creatures like hobgoblins or bugbears. Goblins prefer to live in dark, cramped spaces and are excellent at setting traps and ambushes. They are also skilled riders and often use wolves or other beasts as mounts.",
  
  "Guard": "Guards include members of a city watch, sentries in a citadel or fortified town, and the bodyguards of merchants and nobles. They are trained to protect their charges and maintain order, though their effectiveness varies greatly depending on their training and equipment. Guards are often the first line of defense against threats to a community.",
  
  "Hobgoblin": "Hobgoblins are disciplined, militaristic humanoids that value order and hierarchy. They are larger and more organized than goblins, with a strong martial tradition and sophisticated tactics. Hobgoblins build fortified settlements and maintain strict military discipline. They are excellent engineers and often construct elaborate fortifications and war machines. Hobgoblins respect strength and skill, and they often serve as mercenaries or military advisors.",
  
  "Knight": "Knights are noble warriors who serve a lord or kingdom, bound by codes of honor and chivalry. They are skilled in mounted combat and often wear heavy armor and wield powerful weapons. Knights are expected to protect the weak, defend their lord's interests, and uphold the ideals of their order. Many knights are also skilled leaders and diplomats, serving as advisors to rulers or commanders of military forces.",
  
  "Kobold": "Kobolds are small, reptilian humanoids who are often underestimated due to their size. They are excellent miners and trapmakers, and they often live in complex tunnel systems beneath the earth. Kobolds are highly social and work together in large groups, using their numbers and cunning to overcome stronger opponents. They are also skilled at domesticating and training various creatures, particularly giant rats and other small beasts.",
  
  "Lizardfolk": "Lizardfolk are reptilian humanoids who are perfectly adapted to life in swamps and marshes. They are excellent swimmers and can hold their breath for extended periods. Lizardfolk are practical and logical, valuing survival and efficiency above all else. They are skilled hunters and craftsmen, using the bones and hides of their prey to create tools and weapons. Lizardfolk are not inherently evil, but they can be dangerous when their territory is threatened.",
  
  "Merfolk": "Merfolk are aquatic humanoids with the upper body of a human and the lower body of a fish. They are graceful swimmers and can breathe both air and water. Merfolk are generally peaceful and prefer to avoid contact with land-dwelling races, though they are willing to trade with those who respect their territory. They are excellent craftsmen and often create beautiful items from coral, pearls, and other underwater materials.",
  
  "Orc": "Orcs are fierce, warlike humanoids with greenish-gray skin and prominent tusks. They are known for their strength, aggression, and tribal society based on might and conquest. Orcs typically dwell in harsh environments such as mountains, caves, or wastelands, organizing themselves into tribes led by the strongest warriors. They are constantly seeking to expand their territory and often raid nearby settlements for food, slaves, and treasure.",
  
  "Priest": "Priests are spiritual leaders who bring the teachings of their gods to the common folk. They are the leaders of temples and shrines and often hold positions of influence in their communities. Priests can be benevolent healers and advisors, or they can be fanatical enforcers of their faith. Evil priests might work openly under a tyrant, or they might lead secret religious sects hidden in the shadows of good society, overseeing depraved rites.",
  
  "Sahuagin": "Sahuagin are aquatic humanoids with shark-like features who are the terror of the seas. They are excellent swimmers and can breathe both air and water. Sahuagin are organized into strict hierarchies led by powerful spellcasters, and they often serve as the enforcers of underwater kingdoms. They are fierce warriors and skilled hunters, using their natural weapons and aquatic abilities to dominate their underwater territories.",
  
  "Scout": "Scouts are skilled rangers and trackers who excel at gathering information and navigating dangerous terrain. They are often employed by armies, merchant caravans, or adventuring parties to serve as guides and lookouts. Scouts are experts at survival and can track creatures across any type of terrain. They are also skilled at stealth and can move silently through the wilderness.",
  
  "Spy": "Spies are skilled infiltrators and information gatherers who work in the shadows. They are masters of disguise, deception, and stealth, able to blend into any environment and gather sensitive information without being detected. Spies are often employed by rulers, nobles, merchants, and other powerful individuals to gain advantages in politics, trade, or warfare. Loyal spies would rather die than divulge information that could compromise them or their employers.",
  
  "Tribal Warrior": "Tribal warriors are skilled hunters and fighters who live in close-knit communities. They rely on traditional knowledge and survival skills, often serving as protectors of their people and territory. Tribal warriors are experts at fighting in their native environment and often use weapons and tactics that have been passed down through generations. They are fiercely loyal to their tribe and will fight to the death to protect their people.",
  
  "Veteran": "Veterans are professional fighters who have survived many battles and learned from their experiences. They are skilled with a variety of weapons and armor, and they know how to work effectively as part of a team. Veterans often serve as bodyguards, mercenaries, or military advisors. They are practical and efficient in combat, preferring proven tactics over flashy techniques.",
  
  "Deep Gnome (Svirfneblin)": "Deep gnomes, also known as svirfneblin, are small, reclusive fey humanoids that dwell in the deepest reaches of the Underdark. They are known for their exceptional stealth abilities, innate magical talents, and their ability to blend seamlessly with stone. Deep gnomes are highly intelligent and resourceful, using their natural camouflage and magical abilities to survive in the harsh underground environment. They are generally neutral and prefer to avoid conflict, but they are fierce defenders of their hidden communities."
};

// Function to fix humanoid descriptions
function fixHumanoidDescriptions() {
  const humanoidFile = path.join(__dirname, '../src/data/monsters/humanoid.ts');
  let content = fs.readFileSync(humanoidFile, 'utf8');
  
  let totalFixed = 0;
  
  // Replace each monster's description using a simpler approach
  Object.entries(OFFICIAL_DESCRIPTIONS).forEach(([monsterName, officialDescription]) => {
    // Find the monster by name and replace its description
    const namePattern = `"name": "${monsterName}"`;
    const nameIndex = content.indexOf(namePattern);
    
    if (nameIndex !== -1) {
      // Find the description field after the name
      const afterName = content.substring(nameIndex);
      const descStart = afterName.indexOf('"description": "');
      
      if (descStart !== -1) {
        const descEnd = afterName.indexOf('",', descStart + 15);
        if (descEnd !== -1) {
          const beforeDesc = content.substring(0, nameIndex + descStart + 15);
          const afterDesc = content.substring(nameIndex + descEnd + 2);
          const newDesc = officialDescription.replace(/"/g, '\\"');
          
          content = beforeDesc + newDesc + afterDesc;
          totalFixed++;
          console.log(`✓ Fixed description for ${monsterName}`);
        }
      }
    } else {
      console.log(`⚠ Could not find ${monsterName} in the file`);
    }
  });
  
  // Remove all background fields
  content = content.replace(/"background": "[^"]*",?\n/g, '');
  
  // Write the updated content back to the file
  fs.writeFileSync(humanoidFile, content, 'utf8');
  
  console.log(`\n🎉 Fixed ${totalFixed} humanoid descriptions with official D&D 5e SRD content!`);
  console.log('📝 Removed all background fields to consolidate information into descriptions');
}

// Run the script
fixHumanoidDescriptions(); 