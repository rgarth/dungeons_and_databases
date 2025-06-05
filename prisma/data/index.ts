// Consolidated D&D 5e SRD Content
// This file exports all game content for easy importing and management

import { weaponsData } from './weapons-data'
import { armorData } from './armor-data'
import { equipmentData } from './equipment-data'

// Spells data (moved here for consolidation)
export const spellsData = [
  // Cantrips (Level 0)
  {
    name: "Acid Splash",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Choose one or two creatures within range. Make a ranged spell attack against each target. On hit, deal 1d6 acid damage.",
    classes: JSON.stringify(["Sorcerer", "Wizard"])
  },
  {
    name: "Chill Touch",
    level: 0,
    school: "Necromancy",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "1 round",
    description: "Make a ranged spell attack. On hit, deal 1d8 necrotic damage and target can't regain hit points until start of your next turn.",
    classes: JSON.stringify(["Sorcerer", "Warlock", "Wizard"])
  },
  {
    name: "Dancing Lights",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S, M",
    duration: "1 minute",
    description: "Create up to four torch-sized lights that hover in the air for the duration.",
    classes: JSON.stringify(["Bard", "Sorcerer", "Wizard"])
  },
  {
    name: "Druidcraft",
    level: 0,
    school: "Transmutation",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Create small nature effects: predict weather, bloom flowers, create sensory effects.",
    classes: JSON.stringify(["Druid"])
  },
  {
    name: "Eldritch Blast",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A beam of crackling energy. Make a ranged spell attack for 1d10 force damage.",
    classes: JSON.stringify(["Warlock"])
  },
  {
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "A mote of fire streaks toward a creature or object. Make a ranged spell attack. On hit, deal 1d10 fire damage.",
    classes: JSON.stringify(["Sorcerer", "Wizard"])
  },
  {
    name: "Guidance",
    level: 0,
    school: "Divination",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "1 minute",
    description: "Touch a willing creature. Once before the spell ends, it can roll 1d4 and add result to one ability check.",
    classes: JSON.stringify(["Cleric", "Druid"])
  },
  {
    name: "Light",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "Touch",
    components: "V, M",
    duration: "1 hour",
    description: "Touch an object to make it shed bright light in 20-foot radius and dim light 20 feet beyond.",
    classes: JSON.stringify(["Bard", "Cleric", "Sorcerer", "Wizard"])
  },
  {
    name: "Mage Hand",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "30 feet",
    components: "V, S",
    duration: "1 minute",
    description: "A spectral hand appears and can manipulate objects, open doors, or retrieve items up to 10 pounds.",
    classes: JSON.stringify(["Bard", "Sorcerer", "Warlock", "Wizard"])
  },
  {
    name: "Mending",
    level: 0,
    school: "Transmutation",
    castingTime: "1 minute",
    range: "Touch",
    components: "V, S, M",
    duration: "Instantaneous",
    description: "Repair a single break or tear in an object you touch.",
    classes: JSON.stringify(["Bard", "Cleric", "Druid", "Sorcerer", "Wizard"])
  },
  {
    name: "Message",
    level: 0,
    school: "Transmutation",
    castingTime: "1 action",
    range: "120 feet",
    components: "V, S, M",
    duration: "1 round",
    description: "Point toward a creature and whisper a message. The target can hear the message and can whisper a reply.",
    classes: JSON.stringify(["Bard", "Sorcerer", "Wizard"])
  },
  {
    name: "Minor Illusion",
    level: 0,
    school: "Illusion",
    castingTime: "1 action",
    range: "30 feet",
    components: "S, M",
    duration: "1 minute",
    description: "Create a sound or image of an object for 1 minute.",
    classes: JSON.stringify(["Bard", "Sorcerer", "Warlock", "Wizard"])
  },
  {
    name: "Poison Spray",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "10 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Extend your hand toward a creature. Target must make Constitution save or take 1d12 poison damage.",
    classes: JSON.stringify(["Druid", "Sorcerer", "Warlock", "Wizard"])
  },
  {
    name: "Prestidigitation",
    level: 0,
    school: "Transmutation",
    castingTime: "1 action",
    range: "10 feet",
    components: "V, S",
    duration: "1 hour",
    description: "A minor magical trick: light a candle, clean an object, chill/warm food, etc.",
    classes: JSON.stringify(["Bard", "Sorcerer", "Warlock", "Wizard"])
  },
  {
    name: "Produce Flame",
    level: 0,
    school: "Conjuration",
    castingTime: "1 action",
    range: "Self",
    components: "V, S",
    duration: "10 minutes",
    description: "A flickering flame appears in your hand. Shed bright light 10 feet, dim light additional 10 feet.",
    classes: JSON.stringify(["Druid"])
  },
  {
    name: "Ray of Frost",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Ranged spell attack deals 1d8 cold damage and reduces target's speed by 10 feet until end of its next turn.",
    classes: JSON.stringify(["Sorcerer", "Wizard"])
  },
  {
    name: "Resistance",
    level: 0,
    school: "Abjuration",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S, M",
    duration: "1 minute",
    description: "Touch willing creature. Once before spell ends, target can roll 1d4 and add to one saving throw.",
    classes: JSON.stringify(["Cleric", "Druid"])
  },
  {
    name: "Sacred Flame",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "60 feet",
    components: "V, S",
    duration: "Instantaneous",
    description: "Divine flame descends on a creature. Target makes Dex save or takes 1d8 radiant damage.",
    classes: JSON.stringify(["Cleric"])
  },
  {
    name: "Shocking Grasp",
    level: 0,
    school: "Evocation",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous",
    description: "Lightning springs from your hand. Make melee spell attack for 1d8 lightning damage.",
    classes: JSON.stringify(["Sorcerer", "Wizard"])
  },
  {
    name: "Spare the Dying",
    level: 0,
    school: "Necromancy",
    castingTime: "1 action",
    range: "Touch",
    components: "V, S",
    duration: "Instantaneous",
    description: "Touch a living creature with 0 hit points. The creature becomes stable.",
    classes: JSON.stringify(["Cleric"])
  },
  {
    name: "Thaumaturgy",
    level: 0,
    school: "Transmutation",
    castingTime: "1 action",
    range: "30 feet",
    components: "V",
    duration: "1 minute",
    description: "Manifest minor wonder: amplify voice, flicker flames, open/close doors, etc.",
    classes: JSON.stringify(["Cleric"])
  },
  {
    name: "True Strike",
    level: 0,
    school: "Divination",
    castingTime: "1 action",
    range: "30 feet",
    components: "S",
    duration: "1 round",
    description: "Extend your hand toward a creature. On your next turn, you gain advantage on your first attack roll against the target.",
    classes: JSON.stringify(["Bard", "Sorcerer", "Warlock", "Wizard"])
  },
  {
    name: "Vicious Mockery",
    level: 0,
    school: "Enchantment",
    castingTime: "1 action",
    range: "60 feet",
    components: "V",
    duration: "Instantaneous",
    description: "Unleash string of insults. Target makes Wis save or takes 1d4 psychic damage and has disadvantage on next attack.",
    classes: JSON.stringify(["Bard"])
  }
]

// Export all data
export { weaponsData, armorData, equipmentData }

// Export counts for validation
export const contentCounts = {
  spells: spellsData.length,
  weapons: weaponsData.length,
  armor: armorData.length,
  equipment: equipmentData.length,
  total: spellsData.length + weaponsData.length + armorData.length + equipmentData.length
} 