export const classSpellSuggestionsData = [
  {
    className: "Wizard",
    phbDescription: "As a wizard, you start with a spellbook containing 6 1st-level wizard spells of your choice. You also know 3 cantrips of your choice from the wizard spell list.",
    suggestions: [
      // Cantrips (3 slots)
      { spellName: "Fire Bolt", level: 0, reason: "Reliable damage cantrip with good range" },
      { spellName: "Mage Hand", level: 0, reason: "Versatile utility for manipulating objects" },
      { spellName: "Prestidigitation", level: 0, reason: "Great for minor magical effects and roleplay" },
      // 1st Level (6 slots)
      { spellName: "Magic Missile", level: 1, reason: "Guaranteed damage, never misses" },
      { spellName: "Shield", level: 1, reason: "Defensive reaction spell, +5 AC" },
      { spellName: "Mage Armor", level: 1, reason: "Better AC than regular armor" },
      { spellName: "Find Familiar", level: 1, reason: "Great utility and scouting" },
      { spellName: "Detect Magic", level: 1, reason: "Essential for finding magical items and effects" },
      { spellName: "Comprehend Languages", level: 1, reason: "Useful for understanding any language" }
    ]
  },
  {
    className: "Cleric",
    phbDescription: "You know three cantrips of your choice from the cleric spell list. You also know all 1st-level spells on the cleric spell list.",
    suggestions: [
      // Cantrips (3 slots)
      { spellName: "Sacred Flame", level: 0, reason: "Radiant damage cantrip, ignores cover" },
      { spellName: "Spare the Dying", level: 0, reason: "Emergency healing for dying allies" },
      { spellName: "Guidance", level: 0, reason: "Great for skill checks" },
      // Note: Clerics know all 1st-level spells, so no specific suggestions needed
    ]
  },
  {
    className: "Druid",
    phbDescription: "You know two cantrips of your choice from the druid spell list. You also know all 1st-level spells on the druid spell list.",
    suggestions: [
      // Cantrips (2 slots)
      { spellName: "Produce Flame", level: 0, reason: "Light source and ranged attack" },
      { spellName: "Druidcraft", level: 0, reason: "Nature-themed utility" },
      // Note: Druids know all 1st-level spells, so no specific suggestions needed
    ]
  },
  {
    className: "Bard",
    phbDescription: "You know four cantrips of your choice from the bard spell list. You also know two 1st-level spells of your choice from the bard spell list.",
    suggestions: [
      // Cantrips (4 slots)
      { spellName: "Vicious Mockery", level: 0, reason: "Damage and disadvantage on next attack" },
      { spellName: "Prestidigitation", level: 0, reason: "Versatile utility and roleplay" },
      { spellName: "Mage Hand", level: 0, reason: "Manipulate objects at range" },
      { spellName: "Message", level: 0, reason: "Secret communication" },
      // 1st Level (2 slots)
      { spellName: "Cure Wounds", level: 1, reason: "Basic healing spell" },
      { spellName: "Faerie Fire", level: 1, reason: "Reveal invisible creatures, advantage on attacks" }
    ]
  },
  {
    className: "Sorcerer",
    phbDescription: "You know four cantrips of your choice from the sorcerer spell list. You also know two 1st-level spells of your choice from the sorcerer spell list.",
    suggestions: [
      // Cantrips (4 slots)
      { spellName: "Fire Bolt", level: 0, reason: "Reliable damage cantrip" },
      { spellName: "Mage Hand", level: 0, reason: "Manipulate objects at range" },
      { spellName: "Prestidigitation", level: 0, reason: "Versatile utility and roleplay" },
      { spellName: "Ray of Frost", level: 0, reason: "Damage and reduce speed" },
      // 1st Level (2 slots)
      { spellName: "Magic Missile", level: 1, reason: "Guaranteed damage, never misses" },
      { spellName: "Shield", level: 1, reason: "Defensive reaction spell, +5 AC" }
    ]
  },
  {
    className: "Warlock",
    phbDescription: "You know two cantrips of your choice from the warlock spell list. You also know two 1st-level spells of your choice from the warlock spell list.",
    suggestions: [
      // Cantrips (2 slots)
      { spellName: "Eldritch Blast", level: 0, reason: "Best damage cantrip, scales with level" },
      { spellName: "Prestidigitation", level: 0, reason: "Versatile utility and roleplay" },
      // 1st Level (2 slots)
      { spellName: "Hex", level: 1, reason: "Extra damage and disadvantage on ability checks" },
      { spellName: "Armor of Agathys", level: 1, reason: "Temporary HP and cold damage" }
    ]
  },
  {
    className: "Paladin",
    phbDescription: "You know all 1st-level spells on the paladin spell list.",
    suggestions: [
      // Note: Paladins know all 1st-level spells, so no specific suggestions needed
    ]
  }
]; 