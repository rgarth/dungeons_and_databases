export const magicalItemsData = [
  // COMMON ITEMS
  {
    name: 'Potion of Healing',
    type: 'Potion',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'You regain 2d4 + 2 hit points when you drink this potion. The potion\'s red liquid glimmers when agitated.',
    weight: 0.5,
    cost: '50 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Restores 2d4 + 2 hit points when consumed' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Spell Scroll (Cantrip)',
    type: 'Scroll',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher. If the spell is on your class\'s spell list, you can read the scroll and cast its spell without providing any material components.',
    weight: 0,
    cost: '25 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'fire_bolt', description: 'Contains Fire Bolt cantrip (can be cast once)' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Spell Scroll (1st Level)',
    type: 'Scroll',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher.',
    weight: 0,
    cost: '75 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'magic_missile', description: 'Contains Magic Missile (1st level, can be cast once)' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Everburning Torch',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'This torch sheds bright light in a 20-foot radius and dim light for an additional 20 feet. It burns forever and is never consumed.',
    weight: 1,
    cost: '50 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Provides permanent light without fuel' }
    ]),
    stackable: false
  },
  {
    name: 'Cloak of Billowing',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'While wearing this cloak, you can use a bonus action to make it billow dramatically.',
    weight: 1,
    cost: '50 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Billow dramatically as bonus action (cosmetic only)' }
    ]),
    stackable: false
  },
  {
    name: 'Cleansing Stone',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'A cleansing stone is a special polished stone that removes stains and dirt when rubbed on a surface or an object.',
    weight: 1,
    cost: '120 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Removes stains and dirt from objects' }
    ]),
    stackable: false
  },
  {
    name: 'Cloak of Many Fashions',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'While wearing this cloak, you can use a bonus action to change the style, color, and apparent quality of the garment.',
    weight: 2,
    cost: '500 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Change appearance as bonus action (cosmetic only)' }
    ]),
    stackable: false
  },
  {
    name: 'Enduring Spellbook',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'This spellbook, along with anything written on its pages, can\'t be damaged by fire or immersion in water.',
    weight: 3,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Immune to fire and water damage' }
    ]),
    stackable: false
  },
  {
    name: 'Heward\'s Handy Spice Pouch',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'This belt pouch appears empty and has 10 charges. While holding the pouch, you can use an action to expend 1 charge to season any nonmagical food within 5 feet of you.',
    weight: 1,
    cost: '200 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Season food with perfect spices (10 charges, regains 1d6+4 at dawn)' }
    ]),
    stackable: false
  },
  {
    name: 'Horn of Silent Alarm',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'This horn has 4 charges and regains 1d4 expended charges daily at dawn. When you use an action to blow it, one creature of your choice can hear the horn\'s blare, provided the creature is within 600 feet of the horn and not deafened.',
    weight: 2,
    cost: '500 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Silent alarm only target creature can hear (4 charges per day)' }
    ]),
    stackable: false
  },
  {
    name: 'Instrument of Scribing',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: true,
    description: 'This musical instrument has 3 charges. While you are playing it, you can use an action to expend 1 charge and write a magical message on any surface you can see within 60 feet of you.',
    weight: 2,
    cost: '800 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Write magical messages on surfaces (3 charges per day)' }
    ]),
    stackable: false
  },
  {
    name: 'Lock of Trickery',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'This lock appears to be an ordinary lock (DC 15 to pick) and comes with a single key. The tumblers in this lock magically adjust to thwart burglars.',
    weight: 1,
    cost: '50 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Casts alarm spell when lock is picked successfully' }
    ]),
    stackable: false
  },
  {
    name: 'Moon-touched Sword',
    type: 'Weapon',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.',
    weight: 3,
    cost: '100 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Sheds moonlight in darkness (15-foot bright, 15-foot dim)' }
    ]),
    stackable: false
  },
  {
    name: 'Mystery Key',
    type: 'Wondrous Item',
    rarity: 'Common',
    requiresAttunement: false,
    description: 'A question mark is worked into the head of this key. The key has a 5 percent chance of unlocking any lock into which it\'s inserted.',
    weight: 0,
    cost: '100 gp',
    effects: JSON.stringify([
      { type: 'special', description: '5% chance to unlock any lock' }
    ]),
    stackable: false
  },
  {
    name: 'Rope of Climbing',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates.',
    weight: 3,
    cost: '2000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Animates and climbs surfaces on command' }
    ]),
    stackable: false
  },
  {
    name: 'Immovable Rod',
    type: 'Rod',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place.',
    weight: 2,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Becomes immovable when activated (up to 8,000 lbs force)' }
    ]),
    stackable: false
  },
  {
    name: 'Alchemy Jug',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken.',
    weight: 12,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Produces various liquids daily (acid, basic poison, beer, honey, mayonnaise, oil, vinegar, wine, fresh water)' }
    ]),
    stackable: false
  },
  {
    name: 'Decanter of Endless Water',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds.',
    weight: 2,
    cost: '4000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Produces endless water in various flows (stream, fountain, geyser)' }
    ]),
    stackable: false
  },
  {
    name: 'Potion of Greater Healing',
    type: 'Potion',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'You regain 4d4 + 4 hit points when you drink this potion. The potion\'s red liquid glimmers when agitated.',
    weight: 0.5,
    cost: '150 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Restore 4d4 + 4 hit points (single use)' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Superior Healing',
    type: 'Potion',
    rarity: 'Rare',
    requiresAttunement: false,
    description: 'You regain 8d4 + 8 hit points when you drink this potion.',
    weight: 0.5,
    cost: '500 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Restore 8d4 + 8 hit points (single use)' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Supreme Healing',
    type: 'Potion',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'You regain 10d4 + 20 hit points when you drink this potion.',
    weight: 0.5,
    cost: '1350 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Restore 10d4 + 20 hit points (single use)' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Fire Resistance',
    type: 'Potion',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'When you drink this potion, you gain resistance to fire damage for 1 hour.',
    weight: 0.5,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'fire', description: 'Resistance to fire damage for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Cold Resistance',
    type: 'Potion',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'When you drink this potion, you gain resistance to cold damage for 1 hour.',
    weight: 0.5,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'cold', description: 'Resistance to cold damage for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Acid Resistance',
    type: 'Potion',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'When you drink this potion, you gain resistance to acid damage for 1 hour.',
    weight: 0.5,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'acid', description: 'Resistance to acid damage for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Lightning Resistance',
    type: 'Potion',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'When you drink this potion, you gain resistance to lightning damage for 1 hour.',
    weight: 0.5,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'lightning', description: 'Resistance to lightning damage for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Thunder Resistance',
    type: 'Potion',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'When you drink this potion, you gain resistance to thunder damage for 1 hour.',
    weight: 0.5,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'thunder', description: 'Resistance to thunder damage for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Giant Strength (Hill)',
    type: 'Potion',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'When you drink this potion, your Strength score changes to 21 for 1 hour.',
    weight: 0.5,
    cost: '400 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 21, description: 'Strength becomes 21 for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Giant Strength (Stone)',
    type: 'Potion',
    rarity: 'Rare',
    requiresAttunement: false,
    description: 'When you drink this potion, your Strength score changes to 23 for 1 hour.',
    weight: 0.5,
    cost: '800 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 23, description: 'Strength becomes 23 for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Giant Strength (Frost)',
    type: 'Potion',
    rarity: 'Rare',
    requiresAttunement: false,
    description: 'When you drink this potion, your Strength score changes to 23 for 1 hour.',
    weight: 0.5,
    cost: '800 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 23, description: 'Strength becomes 23 for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Giant Strength (Fire)',
    type: 'Potion',
    rarity: 'Rare',
    requiresAttunement: false,
    description: 'When you drink this potion, your Strength score changes to 25 for 1 hour.',
    weight: 0.5,
    cost: '1000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 25, description: 'Strength becomes 25 for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Giant Strength (Cloud)',
    type: 'Potion',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'When you drink this potion, your Strength score changes to 27 for 1 hour.',
    weight: 0.5,
    cost: '1500 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 27, description: 'Strength becomes 27 for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Potion of Giant Strength (Storm)',
    type: 'Potion',
    rarity: 'Legendary',
    requiresAttunement: false,
    description: 'When you drink this potion, your Strength score changes to 29 for 1 hour.',
    weight: 0.5,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 29, description: 'Strength becomes 29 for 1 hour' }
    ]),
    stackable: true,
    consumable: true
  },
  {
    name: 'Bag of Tricks (Gray)',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This ordinary bag, made from gray cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object.',
    weight: 0.5,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Pull out random animals (badger, bat, cat, etc.) 3 times per dawn' }
    ]),
    stackable: false
  },
  {
    name: 'Bag of Tricks (Rust)',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This ordinary bag, made from rust-colored cloth, appears empty.',
    weight: 0.5,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Pull out random animals (rat, owl, mastiff, etc.) 3 times per dawn' }
    ]),
    stackable: false
  },
  {
    name: 'Bag of Tricks (Tan)',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This ordinary bag, made from tan cloth, appears empty.',
    weight: 0.5,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Pull out random animals (jackal, ape, baboon, etc.) 3 times per dawn' }
    ]),
    stackable: false
  },

  // UNCOMMON ITEMS
  {
    name: 'Bag of Holding',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet.',
    weight: 15,
    cost: '4000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Can hold 500 lbs in 64 cubic feet of space' }
    ]),
    stackable: false
  },
  {
    name: 'Boots of Elvenkind',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.',
    weight: 1,
    cost: '2500 gp',
    effects: JSON.stringify([
      { type: 'advantage', target: 'stealth', description: 'Advantage on Stealth checks for silent movement' },
      { type: 'special', description: 'Your steps make no sound' }
    ]),
    stackable: false
  },
  {
    name: 'Cloak of Elvenkind',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide.',
    weight: 1,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'advantage', target: 'stealth', description: 'Advantage on Stealth checks to hide when hood is up' },
      { type: 'special', description: 'Perception checks to see you have disadvantage when hood is up' }
    ]),
    stackable: false
  },
  {
    name: 'Gauntlets of Ogre Power',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher.',
    weight: 2,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 19, description: 'Sets Strength to 19 (if lower)' }
    ]),
    stackable: false
  },
  {
    name: 'Headband of Intellect',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher.',
    weight: 1,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'intelligence', value: 19, description: 'Sets Intelligence to 19 (if lower)' }
    ]),
    stackable: false
  },
  {
    name: 'Spell Scroll (2nd Level)',
    type: 'Scroll',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher.',
    weight: 0,
    cost: '150 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'misty_step', description: 'Contains Misty Step (2nd level, can be cast once)' }
    ]),
    stackable: true
  },
  {
    name: 'Spell Scroll (3rd Level)',
    type: 'Scroll',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'A spell scroll bears the words of a single spell, written in a mystical cipher.',
    weight: 0,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'fireball', description: 'Contains Fireball (3rd level, can be cast once)' }
    ]),
    stackable: true
  },
  {
    name: 'Wand of Magic Missiles',
    type: 'Wand',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast Magic Missile from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.',
    weight: 1,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'magic_missile', description: 'Cast Magic Missile (7 charges, 1+ charges per cast)' }
    ]),
    stackable: false
  },
  {
    name: 'Wand of Cure Wounds',
    type: 'Wand',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 charge to cast Cure Wounds (1st level) from it.',
    weight: 1,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'cure_wounds', description: 'Cast Cure Wounds (7 charges, 1 charge per cast)' }
    ]),
    stackable: false
  },
  {
    name: 'Winged Boots',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration.',
    weight: 1,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Grants flying speed equal to walking speed (4 hours per day)' }
    ]),
    stackable: false
  },
  {
    name: 'Amulet of Natural Armor +1',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'This amulet toughens the wearer\'s body and flesh, giving a +1 enhancement bonus to natural armor.',
    weight: 0,
    cost: '2000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 1, description: '+1 bonus to AC' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Mind Shielding',
    type: 'Ring',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine your location, or know your alignment. Creatures can telepathically communicate with you only if you allow it.',
    weight: 0,
    cost: '16000 gp',
    effects: JSON.stringify([
      { type: 'immunity', target: 'thought_detection', description: 'Immune to thought reading, location detection, alignment detection' }
    ]),
    stackable: false
  },
  {
    name: 'Necklace of Adaptation',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors.',
    weight: 1,
    cost: '1500 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Breathe in any environment' },
      { type: 'advantage', target: 'gas_saves', description: 'Advantage on saves vs harmful gases/vapors' }
    ]),
    stackable: false
  },
  {
    name: 'Bracers of Archery',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.',
    weight: 2,
    cost: '1500 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Proficiency with longbow and shortbow' },
      { type: 'stat_bonus', target: 'ranged_damage', value: 2, description: '+2 damage with longbow/shortbow' }
    ]),
    stackable: false
  },
  {
    name: 'Eyes of the Eagle',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'These crystal lenses fit over the eyes. While wearing them, you have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across.',
    weight: 0,
    cost: '2500 gp',
    effects: JSON.stringify([
      { type: 'advantage', target: 'perception_sight', description: 'Advantage on Perception checks using sight' },
      { type: 'special', description: 'See details at extreme distances' }
    ]),
    stackable: false
  },
  {
    name: 'Gloves of Swimming and Climbing',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While wearing these gloves, your climbing and swimming speeds are equal to your walking speed, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim.',
    weight: 0,
    cost: '2000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Climbing and swimming speed equal walking speed' },
      { type: 'stat_bonus', target: 'athletics_climb_swim', value: 5, description: '+5 bonus to Athletics (climbing/swimming)' }
    ]),
    stackable: false
  },
  {
    name: 'Hat of Disguise',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While wearing this hat, you can use an action to cast the disguise self spell from it at will. The spell ends if the hat is removed.',
    weight: 0,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'disguise_self', description: 'Cast Disguise Self at will' }
    ]),
    stackable: false
  },
  {
    name: 'Medallion of Thoughts',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'The medallion has 3 charges. While wearing it, you can use an action to expend 1 charge to cast the detect thoughts spell (save DC 13) from it.',
    weight: 1,
    cost: '3000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'detect_thoughts', description: 'Cast Detect Thoughts (3 charges per day, DC 13)' }
    ]),
    stackable: false
  },
  {
    name: 'Goggles of Night',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the goggles increases its range by 60 feet.',
    weight: 1,
    cost: '1500 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Darkvision 60 feet (or +60 feet if you already have it)' }
    ]),
    stackable: false
  },
  {
    name: 'Circlet of Blasting',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'While wearing this circlet, you can use an action to cast the scorching ray spell with it. When you make the spell\'s attacks, you do so with an attack bonus of +5.',
    weight: 0,
    cost: '1500 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'scorching_ray', description: 'Cast Scorching Ray (once per day, +5 attack bonus)' }
    ]),
    stackable: false
  },
  {
    name: 'Sending Stones',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is obvious. While you touch one stone, you can use an action to cast the sending spell from it.',
    weight: 1,
    cost: '2000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'sending', description: 'Cast Sending (once per dawn, paired stones)' }
    ]),
    stackable: false
  },
  {
    name: 'Brooch of Shielding',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the magic missile spell.',
    weight: 0,
    cost: '7500 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'force', description: 'Resistance to force damage' },
      { type: 'immunity', target: 'magic_missile', description: 'Immunity to Magic Missile spell' }
    ]),
    stackable: false
  },
  {
    name: 'Dust of Disappearance',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes.',
    weight: 1,
    cost: '300 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'All creatures within 10 feet become invisible for 2d4 minutes (single use)' }
    ]),
    stackable: true
  },
  {
    name: 'Dust of Dryness',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'This small packet contains 1d6 + 4 pinches of dust. You can use an action to sprinkle a pinch of it over water.',
    weight: 1,
    cost: '120 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Absorbs water into marble-sized pellets (1d6+4 uses)' }
    ]),
    stackable: true
  },
  {
    name: 'Dust of Sneezing and Choking',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'Found in a small container, this powder resembles very fine sand. It appears to be dust of disappearance, and an identify spell reveals it to be such.',
    weight: 1,
    cost: '480 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Causes sneezing and choking in 20-foot cube (DC 15 CON save or incapacitated)' }
    ]),
    stackable: true
  },
  {
    name: 'Eversmoking Bottle',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'Smoke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-foot radius from the bottle.',
    weight: 1,
    cost: '1000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Creates 60-foot radius smoke cloud for 10 minutes' }
    ]),
    stackable: false
  },

  // RARE ITEMS
  {
    name: 'Amulet of Health',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher.',
    weight: 1,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'constitution', value: 19, description: 'Sets Constitution to 19 (if lower)' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Protection',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'You gain a +1 bonus to AC and saving throws while wearing this ring.',
    weight: 0,
    cost: '3500 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 1, description: '+1 bonus to AC' },
      { type: 'stat_bonus', target: 'saving_throws', value: 1, description: '+1 bonus to all saving throws' }
    ]),
    stackable: false
  },
  {
    name: 'Boots of Speed',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While you wear these boots, you can use a bonus action and click the boots\' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect.',
    weight: 1,
    cost: '4000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Can double walking speed as bonus action, opportunity attacks have disadvantage' }
    ]),
    stackable: false
  },
  {
    name: 'Cloak of Displacement',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you.',
    weight: 1,
    cost: '60000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Attack rolls against you have disadvantage until you take damage' }
    ]),
    stackable: false
  },
  {
    name: 'Bracers of Defense',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield.',
    weight: 2,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 2, description: '+2 AC when wearing no armor or shield' }
    ]),
    stackable: false
  },
  {
    name: 'Belt of Giant Strength (Hill)',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While wearing this belt, your Strength score changes to 21. The item has no effect on you if your Strength is already equal to or greater than 21.',
    weight: 2,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 21, description: 'Sets Strength to 21 (if lower)' }
    ]),
    stackable: false
  },

  // RARE ITEMS (continued)
  {
    name: 'Cloak of Protection',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'You gain a +1 bonus to AC and saving throws while wearing this cloak.',
    weight: 1,
    cost: '3500 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 1, description: '+1 bonus to AC' },
      { type: 'stat_bonus', target: 'saving_throws', value: 1, description: '+1 bonus to all saving throws' }
    ]),
    stackable: false
  },
  {
    name: 'Periapt of Wound Closure',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores.',
    weight: 0,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Stabilize when dying, double Hit Die healing' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Swimming',
    type: 'Ring',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'You have a swimming speed of 40 feet while wearing this ring.',
    weight: 0,
    cost: '3000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Swimming speed of 40 feet' }
    ]),
    stackable: false
  },
  {
    name: 'Slippers of Spider Climbing',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed.',
    weight: 0.5,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Climbing speed equal to walking speed, can climb on ceilings' }
    ]),
    stackable: false
  },
  {
    name: 'Boots of the Winterlands',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'These furred boots are snug and feel quite warm. While you wear them, you gain the following benefits: You have resistance to cold damage. You ignore difficult terrain created by ice or snow. You can tolerate temperatures as low as −50 degrees Fahrenheit without any additional protection.',
    weight: 1,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'cold', description: 'Resistance to cold damage' },
      { type: 'special', description: 'Ignore ice/snow difficult terrain, cold weather immunity' }
    ]),
    stackable: false
  },
  {
    name: 'Belt of Dwarvenkind',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While wearing this belt, you gain the following benefits: Your Constitution score increases by 2, to a maximum of 20. You have advantage on Charisma (Persuasion) checks made to interact with dwarves. In addition, while attuned to the belt, you have a 50 percent chance each day at dawn of growing a full beard if you\'re capable of growing one, or a visibly thicker beard if you already have one.',
    weight: 1,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'constitution', value: 2, description: '+2 Constitution (max 20)' },
      { type: 'advantage', target: 'persuasion_dwarves', description: 'Advantage on Persuasion with dwarves' }
    ]),
    stackable: false
  },
  {
    name: 'Elven Chain',
    type: 'Armor',
    rarity: 'Rare',
    requiresAttunement: false,
    description: 'You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.',
    weight: 20,
    cost: '4000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 1, description: '+1 AC (magical chain shirt)' },
      { type: 'special', description: 'Grants proficiency if worn' }
    ]),
    stackable: false
  },
  {
    name: 'Glamoured Studded Leather',
    type: 'Armor',
    rarity: 'Rare',
    requiresAttunement: false,
    description: 'While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor\'s command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor.',
    weight: 13,
    cost: '2000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 1, description: '+1 AC (magical studded leather)' },
      { type: 'special', description: 'Can change appearance as bonus action' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Feather Falling',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling.',
    weight: 0,
    cost: '2000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'No falling damage, descend slowly' }
    ]),
    stackable: false
  },
  {
    name: 'Amulet of the Planes',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'While wearing this amulet, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check. On a successful check, you cast the plane shift spell. On a failure, you and each creature and object within 15 feet of you travel to a random destination.',
    weight: 1,
    cost: '160000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'plane_shift', description: 'Cast Plane Shift (DC 15 Intelligence check or random destination)' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Spell Storing',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6 − 1 levels of stored spells chosen by the GM.',
    weight: 0,
    cost: '10000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Store up to 5 levels of spells, cast without using spell slots' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Fire Resistance',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'You have resistance to fire damage while wearing this ring.',
    weight: 0,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'fire', description: 'Resistance to fire damage' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Cold Resistance',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'You have resistance to cold damage while wearing this ring.',
    weight: 0,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'cold', description: 'Resistance to cold damage' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Lightning Resistance',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'You have resistance to lightning damage while wearing this ring.',
    weight: 0,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'lightning', description: 'Resistance to lightning damage' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Force Resistance',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'You have resistance to force damage while wearing this ring.',
    weight: 0,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'resistance', target: 'force', description: 'Resistance to force damage' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Free Action',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While you wear this ring, difficult terrain doesn\'t cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained.',
    weight: 0,
    cost: '20000 gp',
    effects: JSON.stringify([
      { type: 'immunity', target: 'movement_restriction', description: 'Immune to speed reduction, paralysis, and restraint from magic' },
      { type: 'special', description: 'Ignore difficult terrain' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Evasion',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 charge to succeed on that saving throw instead.',
    weight: 0,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Turn failed Dexterity saves into successes (3 charges per day)' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of X-ray Vision',
    type: 'Ring',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While wearing this ring, you can use an action to speak its command word. When you do so, you can see into and through solid matter for 1 minute.',
    weight: 0,
    cost: '6000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'See through solid matter for 1 minute (once per day)' }
    ]),
    stackable: false
  },
  {
    name: 'Amulet of the Planes',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'While wearing this amulet, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check. On a successful check, you cast the plane shift spell.',
    weight: 1,
    cost: '160000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'plane_shift', description: 'Cast Plane Shift (DC 15 Intelligence check or random destination)' }
    ]),
    stackable: false
  },
  {
    name: 'Crystal Ball',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'While touching this crystal ball, you can cast the scrying spell (save DC 17) with it.',
    weight: 3,
    cost: '50000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'scrying', description: 'Cast Scrying (once per day, DC 17)' }
    ]),
    stackable: false
  },
  {
    name: 'Periapt of Health',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: false,
    description: 'You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed you while you wear the pendant.',
    weight: 0,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'immunity', target: 'disease', description: 'Immunity to disease' }
    ]),
    stackable: false
  },
  {
    name: 'Periapt of Proof against Poison',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: false,
    description: 'This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have immunity to poison damage.',
    weight: 0,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'immunity', target: 'poison', description: 'Immunity to poison damage and poisoned condition' }
    ]),
    stackable: false
  },

  // VERY RARE ITEMS
  {
    name: 'Manual of Bodily Health',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'This book contains health and diet tips, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Constitution score increases by 2, as does your maximum for that score.',
    weight: 5,
    cost: '125000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Permanently increases Constitution by 2 (once per character)' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Leadership)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. This marbled pink and green sphere orbits your head. Your Charisma score increases by 2, to a maximum of 20.',
    weight: 0,
    cost: '80000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'charisma', value: 2, description: '+2 bonus to Charisma (max 20)' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Intellect)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'This marbled scarlet and blue sphere orbits your head. Your Intelligence score increases by 2, to a maximum of 20.',
    weight: 0,
    cost: '80000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'intelligence', value: 2, description: '+2 bonus to Intelligence (max 20)' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Strength)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'This pale blue rhomboid orbits your head. Your Strength score increases by 2, to a maximum of 20.',
    weight: 0,
    cost: '80000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'strength', value: 2, description: '+2 bonus to Strength (max 20)' }
    ]),
    stackable: false
  },
  {
    name: 'Cloak of the Bat',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In an area of dim light or darkness, you can grip the edges of the cloak with both hands and use it to fly at a speed of 40 feet. If you ever fail to grip the cloak\'s edges while flying in this way, or if you are no longer in dim light or darkness, you lose this flying speed.',
    weight: 2,
    cost: '9000 gp',
    effects: JSON.stringify([
      { type: 'advantage', target: 'stealth', description: 'Advantage on Stealth checks' },
      { type: 'special', description: 'Fly speed 40 ft in dim light/darkness' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Telekinesis',
    type: 'Ring',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'While wearing this ring, you can cast the telekinesis spell at will, but you can target only objects that aren\'t being worn or carried.',
    weight: 0,
    cost: '80000 gp',
    effects: JSON.stringify([
      { type: 'spell_effect', target: 'telekinesis', description: 'Cast Telekinesis at will (objects only)' }
    ]),
    stackable: false
  },
  {
    name: 'Winged Boots',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration. If you are flying when the duration expires, you descend at a rate of 30 feet per round until you land.',
    weight: 1,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Flying speed equal to walking speed (4 hours per day)' }
    ]),
    stackable: false
  },
  {
    name: 'Staff of Power',
    type: 'Staff',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you gain a +2 bonus to Armor Class, saving throws, and spell attack rolls.',
    weight: 4,
    cost: '95500 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 2, description: '+2 bonus to AC' },
      { type: 'stat_bonus', target: 'saving_throws', value: 2, description: '+2 bonus to all saving throws' },
      { type: 'special', description: '+2 bonus to spell attack rolls, +2 magic quarterstaff' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Dexterity)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'This deep red sphere orbits your head. Your Dexterity score increases by 2, to a maximum of 20.',
    weight: 0,
    cost: '80000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'dexterity', value: 2, description: '+2 bonus to Dexterity (max 20)' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Wisdom)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'This incandescent blue sphere orbits your head. Your Wisdom score increases by 2, to a maximum of 20.',
    weight: 0,
    cost: '80000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'wisdom', value: 2, description: '+2 bonus to Wisdom (max 20)' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Constitution)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'This pink rhomboid orbits your head. Your Constitution score increases by 2, to a maximum of 20.',
    weight: 0,
    cost: '80000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'constitution', value: 2, description: '+2 bonus to Constitution (max 20)' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Protection)',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'This dusty rose prism orbits your head. You gain a +1 bonus to AC.',
    weight: 0,
    cost: '12000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'ac', value: 1, description: '+1 bonus to AC' }
    ]),
    stackable: false
  },
  {
    name: 'Ioun Stone (Insight)',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'This incandescent blue sphere orbits your head. Your Wisdom (Insight) checks are made with advantage.',
    weight: 0,
    cost: '48000 gp',
    effects: JSON.stringify([
      { type: 'advantage', target: 'insight', description: 'Advantage on Insight checks' }
    ]),
    stackable: false
  },
  {
    name: 'Manual of Gainful Exercise',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'This book describes fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Strength score increases by 2, as does your maximum for that score.',
    weight: 5,
    cost: '125000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Permanently increases Strength by 2 (once per character)' }
    ]),
    stackable: false
  },
  {
    name: 'Manual of Quickness of Action',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'This book contains coordination and balance exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Dexterity score increases by 2, as does your maximum for that score.',
    weight: 5,
    cost: '125000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Permanently increases Dexterity by 2 (once per character)' }
    ]),
    stackable: false
  },
  {
    name: 'Tome of Clear Thought',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'This book contains memory and logic exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Intelligence score increases by 2, as does your maximum for that score.',
    weight: 5,
    cost: '125000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Permanently increases Intelligence by 2 (once per character)' }
    ]),
    stackable: false
  },
  {
    name: 'Tome of Understanding',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'This book contains intuition and insight exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Wisdom score increases by 2, as does your maximum for that score.',
    weight: 5,
    cost: '125000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Permanently increases Wisdom by 2 (once per character)' }
    ]),
    stackable: false
  },
  {
    name: 'Tome of Leadership and Influence',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: false,
    description: 'This book contains guidelines for influencing and charming others, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Charisma score increases by 2, as does your maximum for that score.',
    weight: 5,
    cost: '125000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Permanently increases Charisma by 2 (once per character)' }
    ]),
    stackable: false
  },

  // LEGENDARY ITEMS
  {
    name: 'Rod of Lordly Might',
    type: 'Rod',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage rolls made with it. The rod has properties associated with six different buttons that are set in a row along the haft.',
    weight: 2,
    cost: '200000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Functions as +3 mace with multiple magical forms and abilities' }
    ]),
    stackable: false
  },
  {
    name: 'Deck of Many Things',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: false,
    description: 'Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. Most (75 percent) of these decks have only thirteen cards, but the rest have twenty-two.',
    weight: 1,
    cost: '50000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Drawing cards causes powerful random magical effects' }
    ]),
    stackable: false
  },
  {
    name: 'Belt of Storm Giant Strength',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'While wearing this belt, your Strength score changes to 29. The item has no effect on you if your Strength is already 29 or higher.',
    weight: 1,
    cost: '335000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 29, description: 'Strength becomes 29' }
    ]),
    stackable: false
  },
  {
    name: 'Cloak of Invisibility',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'While wearing this cloak, you can pull its hood over your head to cause yourself to become invisible. While you are invisible, anything you are carrying or wearing is invisible with you. You become visible when you cease wearing the cloak or pull the hood down.',
    weight: 2,
    cost: '100000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Permanent invisibility when hood is up' }
    ]),
    stackable: false
  },
  {
    name: 'Ring of Djinni Summoning',
    type: 'Ring',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'While wearing this ring, you can speak its command word as an action to summon a particular djinni from the Elemental Plane of Air. The djinni appears in an unoccupied space you choose within 120 feet of you.',
    weight: 0,
    cost: '164000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Summon djinni (once per day)' }
    ]),
    stackable: false
  },
  {
    name: 'Robe of the Archmagi',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'This elegant garment is made from exquisite cloth of white, gray, or black and adorned with silvery runes. While wearing it, you gain these benefits: If you aren\'t wearing armor, your base Armor Class is 15 + your Dex modifier. You have advantage on saving throws against spells and other magical effects. Your spell save DC and spell attack bonus each increase by 2.',
    weight: 4,
    cost: '195000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'ac_base', value: 15, description: 'Base AC becomes 15 + Dex (if not wearing armor)' },
      { type: 'advantage', target: 'magic_saves', description: 'Advantage on saves vs spells/magic' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 2, description: '+2 to spell save DC' },
      { type: 'stat_bonus', target: 'spell_attack', value: 2, description: '+2 to spell attack bonus' }
    ]),
    stackable: false
  },
  {
    name: 'Sphere of Annihilation',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: false,
    description: 'This 2-foot diameter black sphere is a hole in the multiverse, hovering in space and stabilized by a magical field surrounding it. The sphere obliterates all matter it passes through and all matter that passes through it.',
    weight: 0,
    cost: '15000 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Destroys all matter it touches (DC 11 Arcana to control)' }
    ]),
    stackable: false
  },
  {
    name: 'Talisman of Pure Good',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'This talisman is a mighty symbol of goodness. A creature that is neither good nor evil in alignment takes 6d6 radiant damage upon touching the talisman. An evil creature takes 8d6 radiant damage upon touching the talisman.',
    weight: 1,
    cost: '71680 gp',
    effects: JSON.stringify([
      { type: 'special', description: 'Causes radiant damage to non-good creatures, special abilities for good clerics' }
    ]),
    stackable: false
  },
  {
    name: 'Sword of Answering',
    type: 'Weapon',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'In the world of Greyhawk, only nine of these blades are known to exist. Each has a name and a distinct personality. You gain a +3 bonus to attack and damage rolls made with this magic weapon.',
    weight: 3,
    cost: '200000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'attack', value: 3, description: '+3 bonus to attack rolls' },
      { type: 'stat_bonus', target: 'damage', value: 3, description: '+3 bonus to damage rolls' }
    ]),
    stackable: false
  },
  {
    name: 'Belt of Fire Giant Strength',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'While wearing this belt, your Strength score changes to 25. The item has no effect on you if your Strength is already 25 or higher.',
    weight: 1,
    cost: '200000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 25, description: 'Strength becomes 25' }
    ]),
    stackable: false
  },
  {
    name: 'Belt of Cloud Giant Strength',
    type: 'Wondrous Item',
    rarity: 'Legendary',
    requiresAttunement: true,
    description: 'While wearing this belt, your Strength score changes to 27. The item has no effect on you if your Strength is already 27 or higher.',
    weight: 1,
    cost: '280000 gp',
    effects: JSON.stringify([
      { type: 'stat_set', target: 'strength', value: 27, description: 'Strength becomes 27' }
    ]),
    stackable: false
  },
  {
    name: 'Amulet of the Devout',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'This amulet bears the symbol of a deity inlaid with precious stones or metals. While you wear the holy symbol, you gain a +1 bonus to spell attack rolls and the saving throw DCs of your spells.',
    weight: 1,
    cost: '5000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'spell_attack', value: 1, description: '+1 bonus to spell attack rolls' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 1, description: '+1 bonus to spell save DC' }
    ]),
    stackable: false
  },
  {
    name: 'Arcane Grimoire +1',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you are holding this leather-bound book, you can use it as a spellcasting focus for your wizard spells, and you gain a +1 bonus to spell attack rolls and to the saving throw DCs of your wizard spells.',
    weight: 3,
    cost: '3000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'spell_attack', value: 1, description: '+1 bonus to spell attack rolls (wizards only)' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 1, description: '+1 bonus to spell save DC (wizards only)' }
    ]),
    stackable: false
  },
  {
    name: 'Arcane Grimoire +2',
    type: 'Wondrous Item',
    rarity: 'Rare',
    requiresAttunement: true,
    description: 'While you are holding this leather-bound book, you can use it as a spellcasting focus for your wizard spells, and you gain a +2 bonus to spell attack rolls and to the saving throw DCs of your wizard spells.',
    weight: 3,
    cost: '8000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'spell_attack', value: 2, description: '+2 bonus to spell attack rolls (wizards only)' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 2, description: '+2 bonus to spell save DC (wizards only)' }
    ]),
    stackable: false
  },
  {
    name: 'Arcane Grimoire +3',
    type: 'Wondrous Item',
    rarity: 'Very Rare',
    requiresAttunement: true,
    description: 'While you are holding this leather-bound book, you can use it as a spellcasting focus for your wizard spells, and you gain a +3 bonus to spell attack rolls and to the saving throw DCs of your wizard spells.',
    weight: 3,
    cost: '20000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'spell_attack', value: 3, description: '+3 bonus to spell attack rolls (wizards only)' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 3, description: '+3 bonus to spell save DC (wizards only)' }
    ]),
    stackable: false
  },
  {
    name: 'Bloodwell Vial +1',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you are holding this crystal vial, you can use it as a spellcasting focus for your sorcerer spells, and you gain a +1 bonus to spell attack rolls and to the saving throw DCs of your sorcerer spells.',
    weight: 1,
    cost: '3000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'spell_attack', value: 1, description: '+1 bonus to spell attack rolls (sorcerers only)' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 1, description: '+1 bonus to spell save DC (sorcerers only)' }
    ]),
    stackable: false
  },
  {
    name: 'Druidcraft Focus +1',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you are holding this wooden focus, you can use it as a spellcasting focus for your druid spells, and you gain a +1 bonus to spell attack rolls and to the saving throw DCs of your druid spells.',
    weight: 1,
    cost: '3000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'spell_attack', value: 1, description: '+1 bonus to spell attack rolls (druids only)' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 1, description: '+1 bonus to spell save DC (druids only)' }
    ]),
    stackable: false
  },
  {
    name: 'Rhythm Maker\'s Drum +1',
    type: 'Wondrous Item',
    rarity: 'Uncommon',
    requiresAttunement: true,
    description: 'While you are holding this drum, you can use it as a spellcasting focus for your bard spells, and you gain a +1 bonus to spell attack rolls and to the saving throw DCs of your bard spells.',
    weight: 3,
    cost: '3000 gp',
    effects: JSON.stringify([
      { type: 'stat_bonus', target: 'spell_attack', value: 1, description: '+1 bonus to spell attack rolls (bards only)' },
      { type: 'stat_bonus', target: 'spell_save_dc', value: 1, description: '+1 bonus to spell save DC (bards only)' }
    ]),
    stackable: false
  }
]; 