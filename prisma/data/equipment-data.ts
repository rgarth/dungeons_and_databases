// Complete D&D 5e SRD Equipment Data
// Source: System Reference Document 5.1 by Wizards of the Coast LLC
// Licensed under Creative Commons Attribution 4.0 International License
// https://dnd.wizards.com/resources/systems-reference-document
export const equipmentData = [
  // Adventuring Gear
  {
    name: "Abacus",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 2,
    description: "A calculating device with beads on rods.",
    stackable: false
  },
  {
    name: "Acid (vial)",
    type: "Adventuring Gear",
    cost: "25 gp",
    weight: 1,
    description: "As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon. On a hit, the target takes 2d6 acid damage.",
    stackable: true
  },
  {
    name: "Alchemist's Fire (flask)",
    type: "Adventuring Gear",
    cost: "50 gp",
    weight: 1,
    description: "This sticky, adhesive fluid ignites when exposed to air. As an action, you can throw this flask up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the alchemist's fire as an improvised weapon. On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames.",
    stackable: true
  },
  {
    name: "Ammunition, Arrows (20)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 1,
    description: "Arrows for use with bows.",
    stackable: true
  },
  {
    name: "Ammunition, Blowgun Needles (50)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 1,
    description: "Needles for use with blowguns.",
    stackable: true
  },
  {
    name: "Ammunition, Crossbow Bolts (20)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 1.5,
    description: "Bolts for use with crossbows.",
    stackable: true
  },
  {
    name: "Ammunition, Sling Bullets (20)",
    type: "Adventuring Gear",
    cost: "4 cp",
    weight: 1.5,
    description: "Bullets for use with slings.",
    stackable: true
  },
  {
    name: "Antitoxin (vial)",
    type: "Adventuring Gear",
    cost: "50 gp",
    weight: 0,
    description: "A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs.",
    stackable: true
  },
  {
    name: "Backpack",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    description: "A backpack can hold 1 cubic foot or 30 pounds of gear.",
    stackable: false
  },
  {
    name: "Ball Bearings (bag of 1,000)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 2,
    description: "As an action, you can spill these tiny metal balls from their pouch to cover a level, square area that is 10 feet on a side. A creature moving across the covered area must succeed on a DC 10 Dexterity saving throw or fall prone.",
    stackable: true
  },
  {
    name: "Barrel",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 70,
    description: "A barrel can hold 40 gallons of liquid or 4 cubic feet of solid material.",
    stackable: false
  },
  {
    name: "Basket",
    type: "Adventuring Gear",
    cost: "4 sp",
    weight: 2,
    description: "A basket can hold 2 cubic feet or 40 pounds of gear.",
    stackable: false
  },
  {
    name: "Bedroll",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 7,
    description: "A bedroll consists of bedding and a blanket.",
    stackable: false
  },
  {
    name: "Bell",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 0,
    description: "A small bell that can be rung to make noise.",
    stackable: true
  },
  {
    name: "Blanket",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 3,
    description: "A thick blanket for warmth.",
    stackable: false
  },
  {
    name: "Block and Tackle",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    description: "A set of pulleys with a cable threaded through them and a hook to attach to objects, a block and tackle allows you to hoist up to four times the weight you can normally lift.",
    stackable: false
  },
  {
    name: "Book",
    type: "Adventuring Gear",
    cost: "25 gp",
    weight: 5,
    description: "A book might contain poetry, historical accounts, information pertaining to a particular field of lore, diagrams and notes on gnomish contraptions, or just about anything else that can be represented using text or pictures.",
    stackable: true
  },
  {
    name: "Bottle, Glass",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 2,
    description: "A glass bottle can hold 1.5 pints of liquid.",
    stackable: true
  },
  {
    name: "Bucket",
    type: "Adventuring Gear",
    cost: "5 cp",
    weight: 2,
    description: "A bucket can hold 3 gallons of liquid or 1/2 cubic foot of solid material.",
    stackable: false
  },
  {
    name: "Caltrops (bag of 20)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 2,
    description: "As an action, you can spread a bag of caltrops to cover a square area that is 5 feet on a side. Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving this turn and take 1 piercing damage.",
    stackable: true
  },
  {
    name: "Candle",
    type: "Adventuring Gear",
    cost: "1 cp",
    weight: 0,
    description: "For 1 hour, a candle sheds bright light in a 5-foot radius and dim light for an additional 5 feet.",
    stackable: true
  },
  {
    name: "Case, Crossbow Bolt",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 1,
    description: "This wooden case can hold up to twenty crossbow bolts.",
    stackable: false
  },
  {
    name: "Case, Map or Scroll",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 1,
    description: "This cylindrical leather case can hold up to ten rolled-up sheets of paper or five rolled-up sheets of parchment.",
    stackable: false
  },
  {
    name: "Chain (10 feet)",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 10,
    description: "A chain has 10 hit points. It can be burst with a successful DC 20 Strength check.",
    stackable: true
  },
  {
    name: "Chalk (1 piece)",
    type: "Adventuring Gear",
    cost: "1 cp",
    weight: 0,
    description: "A piece of chalk for marking surfaces.",
    stackable: true
  },
  {
    name: "Chest",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 25,
    description: "A chest can hold 12 cubic feet or 300 pounds of gear.",
    stackable: false
  },
  {
    name: "Climber's Kit",
    type: "Adventuring Gear",
    cost: "25 gp",
    weight: 12,
    description: "A climber's kit includes special pitons, boot tips, gloves, and a harness. You can use the climber's kit as an action to anchor yourself; when you do, you can't fall more than 25 feet from the point where you anchored yourself, and you can't climb more than 25 feet away from that point without undoing the anchor.",
    stackable: false
  },
  {
    name: "Clothes, Common",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 3,
    description: "Common clothes consist of a shirt, breeches, and shoes.",
    stackable: false
  },
  {
    name: "Clothes, Costume",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 4,
    description: "Costume clothes are elaborate and designed for a specific purpose, such as a noble's outfit or a priest's vestments.",
    stackable: false
  },
  {
    name: "Clothes, Fine",
    type: "Adventuring Gear",
    cost: "15 gp",
    weight: 6,
    description: "Fine clothes are made of expensive fabrics and adorned with properly cut gems, gold, or silver thread.",
    stackable: false
  },
  {
    name: "Clothes, Traveler's",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 4,
    description: "Traveler's clothes consist of boots, a wool skirt or breeches, a shirt, and an ample cloak with a hood.",
    stackable: false
  },
  {
    name: "Component Pouch",
    type: "Adventuring Gear",
    cost: "25 gp",
    weight: 2,
    description: "A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost.",
    stackable: false
  },
  {
    name: "Crowbar",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    description: "Using a crowbar grants advantage to Strength checks where the crowbar's leverage can be applied.",
    stackable: false
  },
  {
    name: "Crystal",
    type: "Arcane Focus",
    cost: "10 gp",
    weight: 1,
    description: "A crystal used as an arcane focus.",
    stackable: false
  },
  {
    name: "Orb",
    type: "Arcane Focus",
    cost: "20 gp",
    weight: 3,
    description: "An orb used as an arcane focus.",
    stackable: false
  },
  {
    name: "Rod",
    type: "Arcane Focus",
    cost: "10 gp",
    weight: 2,
    description: "A rod used as an arcane focus.",
    stackable: false
  },
  {
    name: "Staff",
    type: "Arcane Focus",
    cost: "5 gp",
    weight: 4,
    description: "A staff used as an arcane focus.",
    stackable: false
  },
  {
    name: "Wand",
    type: "Arcane Focus",
    cost: "10 gp",
    weight: 1,
    description: "A wand used as an arcane focus.",
    stackable: false
  },
  {
    name: "Sprig of Mistletoe",
    type: "Druidcraft Focus",
    cost: "1 gp",
    weight: 0,
    description: "A sprig of mistletoe used as a druidcraft focus.",
    stackable: true
  },
  {
    name: "Yew Wand",
    type: "Druidcraft Focus",
    cost: "10 gp",
    weight: 1,
    description: "A yew wand used as a druidcraft focus.",
    stackable: false
  },
  {
    name: "Wooden Shield",
    type: "Druidcraft Focus",
    cost: "10 gp",
    weight: 6,
    description: "A wooden shield used as a druidcraft focus.",
    stackable: false
  },
  {
    name: "Amulet",
    type: "Holy Symbol",
    cost: "5 gp",
    weight: 1,
    description: "An amulet used as a holy symbol.",
    stackable: false
  },
  {
    name: "Emblem",
    type: "Holy Symbol",
    cost: "5 gp",
    weight: 0,
    description: "An emblem used as a holy symbol.",
    stackable: false
  },
  {
    name: "Reliquary",
    type: "Holy Symbol",
    cost: "5 gp",
    weight: 2,
    description: "A reliquary used as a holy symbol.",
    stackable: false
  },
  {
    name: "Fishing Tackle",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 4,
    description: "This kit includes a wooden rod, silken line, corkwood bobbers, steel hooks, lead sinkers, velvet lures, and narrow netting.",
    stackable: false
  },
  {
    name: "Flask or Tankard",
    type: "Adventuring Gear",
    cost: "2 cp",
    weight: 1,
    description: "A flask or tankard can hold 1 pint of liquid.",
    stackable: true
  },
  {
    name: "Grappling Hook",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 4,
    description: "A grappling hook can secure a rope to a battlement, window ledge, tree limb, or other protrusion.",
    stackable: false
  },
  {
    name: "Hammer",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 3,
    description: "A hammer is useful for driving pitons into a wall or cliff face.",
    stackable: false
  },
  {
    name: "Hammer, Sledge",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 10,
    description: "A sledgehammer is useful for breaking down doors and other barriers.",
    stackable: false
  },
  {
    name: "Healer's Kit",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 3,
    description: "This kit is a leather pouch containing bandages, salves, and splints. The kit has ten uses. As an action, you can expend one use of the kit to stabilize a creature that has 0 hit points, without needing to make a Wisdom (Medicine) check.",
    stackable: false
  },
  {
    name: "Holy Water (flask)",
    type: "Adventuring Gear",
    cost: "25 gp",
    weight: 1,
    description: "As an action, you can splash the contents of this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. In either case, make a ranged attack against a target creature, treating the holy water as an improvised weapon. If the target is a fiend or undead, it takes 2d6 radiant damage.",
    stackable: true
  },
  {
    name: "Hourglass",
    type: "Adventuring Gear",
    cost: "25 gp",
    weight: 1,
    description: "An hourglass can track time for one hour.",
    stackable: false
  },
  {
    name: "Hunting Trap",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 25,
    description: "When you use your action to set it, this trap forms a saw-toothed steel ring that snaps shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground.",
    stackable: false
  },
  {
    name: "Ink (1 ounce bottle)",
    type: "Adventuring Gear",
    cost: "10 gp",
    weight: 0,
    description: "Ink for writing.",
    stackable: true
  },
  {
    name: "Ink Pen",
    type: "Adventuring Gear",
    cost: "2 cp",
    weight: 0,
    description: "A pen for writing with ink.",
    stackable: true
  },
  {
    name: "Jug or Pitcher",
    type: "Adventuring Gear",
    cost: "2 cp",
    weight: 4,
    description: "A jug or pitcher can hold 1 gallon of liquid.",
    stackable: true
  },
  {
    name: "Ladder (10-foot)",
    type: "Adventuring Gear",
    cost: "1 sp",
    weight: 25,
    description: "A 10-foot wooden ladder.",
    stackable: false
  },
  {
    name: "Lamp",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 1,
    description: "A lamp casts bright light in a 15-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil.",
    stackable: false
  },
  {
    name: "Lantern, Bullseye",
    type: "Adventuring Gear",
    cost: "10 gp",
    weight: 2,
    description: "A bullseye lantern casts bright light in a 60-foot cone and dim light for an additional 60 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil.",
    stackable: false
  },
  {
    name: "Lantern, Hooded",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 2,
    description: "A hooded lantern casts bright light in a 30-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil.",
    stackable: false
  },
  {
    name: "Lock",
    type: "Adventuring Gear",
    cost: "10 gp",
    weight: 1,
    description: "A key is provided with the lock. Without the key, a creature proficient with thieves' tools can pick this lock with a successful DC 15 Dexterity check.",
    stackable: false
  },
  {
    name: "Magnifying Glass",
    type: "Adventuring Gear",
    cost: "100 gp",
    weight: 0,
    description: "This lens allows a closer look at small objects. It is also useful as a substitute for flint and steel when starting fires.",
    stackable: false
  },
  {
    name: "Manacles",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 6,
    description: "These metal restraints can bind a Small or Medium creature. Escaping the manacles requires a successful DC 20 Dexterity check.",
    stackable: false
  },
  {
    name: "Mess Kit",
    type: "Adventuring Gear",
    cost: "2 sp",
    weight: 1,
    description: "This tin box contains a cup and simple cutlery. The box clamps together, and one side can be used as a cooking pan and the other as a plate or shallow bowl.",
    stackable: false
  },
  {
    name: "Mirror, Steel",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 0.5,
    description: "A steel mirror is useful for looking around corners, signaling friends with reflected sunlight, keeping an eye on a medusa, making sure you look good enough to present yourself to the queen, or examining wounds that you've received on hard-to-see parts of your body.",
    stackable: false
  },
  {
    name: "Oil (flask)",
    type: "Adventuring Gear",
    cost: "1 sp",
    weight: 1,
    description: "Oil usually comes in a clay flask that holds 1 pint. As an action, you can splash the oil in this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact.",
    stackable: true
  },
  {
    name: "Paper (one sheet)",
    type: "Adventuring Gear",
    cost: "2 sp",
    weight: 0,
    description: "A sheet of paper for writing.",
    stackable: true
  },
  {
    name: "Parchment (one sheet)",
    type: "Adventuring Gear",
    cost: "1 sp",
    weight: 0,
    description: "A sheet of parchment for writing.",
    stackable: true
  },
  {
    name: "Perfume (vial)",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 0,
    description: "A vial of perfume.",
    stackable: true
  },
  {
    name: "Pick, Miner's",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 10,
    description: "A miner's pick is designed for digging through rock and hard earth.",
    stackable: false
  },
  {
    name: "Piton",
    type: "Adventuring Gear",
    cost: "5 cp",
    weight: 0.25,
    description: "A piton is a steel spike with an eye through which you can loop a rope.",
    stackable: true
  },
  {
    name: "Poison, Basic (vial)",
    type: "Adventuring Gear",
    cost: "100 gp",
    weight: 0,
    description: "You can use the poison in this vial to coat one slashing or piercing weapon or up to three pieces of ammunition. Applying the poison takes an action. A creature hit by the poisoned weapon or ammunition must make a DC 10 Constitution saving throw or take 1d4 poison damage.",
    stackable: true
  },
  {
    name: "Pole (10-foot)",
    type: "Adventuring Gear",
    cost: "5 cp",
    weight: 7,
    description: "A 10-foot wooden pole.",
    stackable: false
  },
  {
    name: "Pot, Iron",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 10,
    description: "An iron pot for cooking.",
    stackable: false
  },
  {
    name: "Potion of Healing",
    type: "Adventuring Gear",
    cost: "50 gp",
    weight: 0.5,
    description: "A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points. Drinking or administering a potion takes an action.",
    stackable: true
  },
  {
    name: "Pouch",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 1,
    description: "A cloth or leather pouch can hold up to 20 sling bullets or 50 blowgun needles, among other things.",
    stackable: false
  },
  {
    name: "Quiver",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 1,
    description: "A quiver can hold up to 20 arrows.",
    stackable: false
  },
  {
    name: "Ram, Portable",
    type: "Adventuring Gear",
    cost: "4 gp",
    weight: 35,
    description: "You can use a portable ram to break down doors. When doing so, you gain a +4 bonus on the Strength check. One other character can help you use the ram, giving you advantage on this check.",
    stackable: false
  },
  {
    name: "Rations (1 day)",
    type: "Adventuring Gear",
    cost: "2 sp",
    weight: 2,
    description: "Rations consist of dry foods suitable for extended travel, including jerky, dried fruit, hardtack, and nuts.",
    stackable: true
  },
  {
    name: "Robes",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 4,
    description: "Robes are loose-fitting garments.",
    stackable: false
  },
  {
    name: "Rope, Hempen (50 feet)",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 10,
    description: "Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check.",
    stackable: true
  },
  {
    name: "Rope, Silk (50 feet)",
    type: "Adventuring Gear",
    cost: "10 gp",
    weight: 5,
    description: "Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check.",
    stackable: true
  },
  {
    name: "Sack",
    type: "Adventuring Gear",
    cost: "1 cp",
    weight: 0.5,
    description: "A sack can hold 1 cubic foot or 30 pounds of gear.",
    stackable: false
  },
  {
    name: "Scale, Merchant's",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 3,
    description: "A scale includes a small balance, pans, and a suitable assortment of weights up to 2 pounds.",
    stackable: false
  },
  {
    name: "Sealing Wax",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 0,
    description: "Wax for sealing letters and documents.",
    stackable: true
  },
  {
    name: "Shovel",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    description: "A shovel for digging.",
    stackable: false
  },
  {
    name: "Signal Whistle",
    type: "Adventuring Gear",
    cost: "5 cp",
    weight: 0,
    description: "A whistle for signaling.",
    stackable: true
  },
  {
    name: "Signet Ring",
    type: "Adventuring Gear",
    cost: "5 gp",
    weight: 0,
    description: "A signet ring bears the seal of a family or organization.",
    stackable: false
  },
  {
    name: "Soap",
    type: "Adventuring Gear",
    cost: "2 cp",
    weight: 0,
    description: "A bar of soap for cleaning.",
    stackable: true
  },
  {
    name: "Spellbook",
    type: "Adventuring Gear",
    cost: "50 gp",
    weight: 3,
    description: "Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells.",
    stackable: false
  },
  {
    name: "Spikes, Iron (10)",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 5,
    description: "Iron spikes for various uses.",
    stackable: true
  },
  {
    name: "Spyglass",
    type: "Adventuring Gear",
    cost: "1000 gp",
    weight: 1,
    description: "Objects viewed through a spyglass are magnified to twice their size.",
    stackable: false
  },
  {
    name: "Tent, Two-person",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 20,
    description: "A simple and portable canvas shelter, a tent sleeps two.",
    stackable: false
  },
  {
    name: "Tinderbox",
    type: "Adventuring Gear",
    cost: "5 sp",
    weight: 1,
    description: "This small container holds flint, fire steel, and tinder (usually dry cloth soaked in light oil) used to kindle a fire.",
    stackable: false
  },
  {
    name: "Torch",
    type: "Adventuring Gear",
    cost: "1 cp",
    weight: 1,
    description: "A torch burns for 1 hour, providing bright light in a 20-foot radius and dim light for an additional 20 feet.",
    stackable: true
  },
  {
    name: "Vial",
    type: "Adventuring Gear",
    cost: "1 gp",
    weight: 0,
    description: "A vial can hold 4 ounces of liquid.",
    stackable: true
  },
  {
    name: "Waterskin",
    type: "Adventuring Gear",
    cost: "2 gp",
    weight: 5,
    description: "A waterskin can hold 4 pints of liquid.",
    stackable: false
  },
  {
    name: "Whetstone",
    type: "Adventuring Gear",
    cost: "1 cp",
    weight: 1,
    description: "A whetstone for sharpening blades.",
    stackable: true
  },

  // Equipment Packs
  {
    name: "Burglar's Pack",
    type: "Equipment Pack",
    cost: "16 gp",
    weight: 46.5,
    description: "Includes a backpack, a bag of 1,000 ball bearings, 10 feet of string, a bell, 5 candles, a crowbar, a hammer, 10 pitons, a hooded lantern, 2 flasks of oil, 5 days rations, a tinderbox, a waterskin, and 50 feet of hempen rope strapped to the side of the pack.",
    stackable: false
  },
  {
    name: "Diplomat's Pack",
    type: "Equipment Pack",
    cost: "39 gp",
    weight: 46,
    description: "Includes a chest, 2 cases for maps and scrolls, a set of fine clothes, a bottle of ink, an ink pen, a lamp, 2 flasks of oil, 5 sheets of paper, a vial of perfume, sealing wax, and soap.",
    stackable: false
  },
  {
    name: "Dungeoneer's Pack",
    type: "Equipment Pack",
    cost: "12 gp",
    weight: 61.5,
    description: "Includes a backpack, a crowbar, a hammer, 10 pitons, 10 torches, a tinderbox, 10 days of rations, a waterskin, and 50 feet of hempen rope strapped to the side of the pack.",
    stackable: false
  },
  {
    name: "Entertainer's Pack",
    type: "Equipment Pack",
    cost: "40 gp",
    weight: 38,
    description: "Includes a backpack, a bedroll, 2 costumes, 5 candles, 5 days of rations, a waterskin, and a disguise kit.",
    stackable: false
  },
  {
    name: "Explorer's Pack",
    type: "Equipment Pack",
    cost: "10 gp",
    weight: 59,
    description: "Includes a backpack, a bedroll, a mess kit, a tinderbox, 10 torches, 10 days of rations, a waterskin, and 50 feet of hempen rope strapped to the side of the pack.",
    stackable: false
  },
  {
    name: "Priest's Pack",
    type: "Equipment Pack",
    cost: "19 gp",
    weight: 24,
    description: "Includes a backpack, a blanket, 10 candles, a tinderbox, an alms box, 2 blocks of incense, a censer, vestments, 2 days of rations, and a waterskin.",
    stackable: false
  },
  {
    name: "Scholar's Pack",
    type: "Equipment Pack",
    cost: "40 gp",
    weight: 22,
    description: "Includes a backpack, a book of lore, a bottle of ink, an ink pen, 10 sheets of parchment, a little bag of sand, and a small knife.",
    stackable: false
  }
] 