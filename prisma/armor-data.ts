// Complete D&D 5e SRD Armor Data
export const armorData = [
  // Light Armor
  {
    name: "Padded",
    type: "Light",
    baseAC: 11,
    maxDexBonus: null,
    minStrength: null,
    stealthDisadvantage: true,
    weight: 8,
    cost: "5 gp",
    description: "Padded armor consists of quilted layers of cloth and batting."
  },
  {
    name: "Leather",
    type: "Light",
    baseAC: 11,
    maxDexBonus: null,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 10,
    cost: "10 gp",
    description: "The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil."
  },
  {
    name: "Studded Leather",
    type: "Light",
    baseAC: 12,
    maxDexBonus: null,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 13,
    cost: "45 gp",
    description: "Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes."
  },

  // Medium Armor
  {
    name: "Hide",
    type: "Medium",
    baseAC: 12,
    maxDexBonus: 2,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 12,
    cost: "10 gp",
    description: "This crude armor consists of thick furs and pelts. It is commonly worn by barbarian tribes, evil humanoids, and other folk who lack access to the tools and materials needed to create better armor."
  },
  {
    name: "Chain Shirt",
    type: "Medium",
    baseAC: 13,
    maxDexBonus: 2,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 20,
    cost: "50 gp",
    description: "Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer's upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers."
  },
  {
    name: "Scale Mail",
    type: "Medium",
    baseAC: 14,
    maxDexBonus: 2,
    minStrength: null,
    stealthDisadvantage: true,
    weight: 45,
    cost: "50 gp",
    description: "This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish."
  },
  {
    name: "Breastplate",
    type: "Medium",
    baseAC: 14,
    maxDexBonus: 2,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 20,
    cost: "400 gp",
    description: "This armor consists of a fitted metal chest piece worn with supple leather. Although it leaves the legs and arms relatively unprotected, this armor provides good protection for the wearer's vital organs while leaving the wearer relatively unencumbered."
  },
  {
    name: "Half Plate",
    type: "Medium",
    baseAC: 15,
    maxDexBonus: 2,
    minStrength: null,
    stealthDisadvantage: true,
    weight: 40,
    cost: "750 gp",
    description: "Half plate consists of shaped metal plates that cover most of the wearer's body. It does not include leg protection beyond simple greaves that are attached with leather straps."
  },

  // Heavy Armor
  {
    name: "Ring Mail",
    type: "Heavy",
    baseAC: 14,
    maxDexBonus: 0,
    minStrength: null,
    stealthDisadvantage: true,
    weight: 40,
    cost: "30 gp",
    description: "This armor is leather armor with heavy rings sewn into it. The rings help deflect blows from swords and axes. Ring mail is inferior to chain mail, and it's usually worn only by those who can't afford better armor."
  },
  {
    name: "Chain Mail",
    type: "Heavy",
    baseAC: 16,
    maxDexBonus: 0,
    minStrength: 13,
    stealthDisadvantage: true,
    weight: 55,
    cost: "75 gp",
    description: "Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows."
  },
  {
    name: "Splint",
    type: "Heavy",
    baseAC: 17,
    maxDexBonus: 0,
    minStrength: 15,
    stealthDisadvantage: true,
    weight: 60,
    cost: "200 gp",
    description: "This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible chain mail protects the joints."
  },
  {
    name: "Plate",
    type: "Heavy",
    baseAC: 18,
    maxDexBonus: 0,
    minStrength: 15,
    stealthDisadvantage: true,
    weight: 65,
    cost: "1500 gp",
    description: "Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor."
  },

  // Shields - Official 5e SRD
  {
    name: "Shield",
    type: "Shield",
    baseAC: 2,
    maxDexBonus: null,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 6,
    cost: "10 gp",
    description: "A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2. You can benefit from only one shield at a time."
  },

  // Shield Variants - Common DM Options (Not Official 5e SRD)
  {
    name: "Buckler",
    type: "Shield",
    baseAC: 1,
    maxDexBonus: null,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 3,
    cost: "5 gp",
    description: "A small, lightweight shield strapped to the forearm. Provides minimal protection but allows use of two-handed weapons. (DM Variant - not official 5e SRD)"
  },
  {
    name: "Tower Shield",
    type: "Shield",
    baseAC: 3,
    maxDexBonus: null,
    minStrength: 13,
    stealthDisadvantage: true,
    weight: 25,
    cost: "30 gp",
    description: "A massive shield that provides excellent protection but is unwieldy. Disadvantage on Dexterity (Stealth) checks and cannot be used with ranged weapons. (DM Variant - not official 5e SRD)"
  },
  {
    name: "Spiked Shield",
    type: "Shield",
    baseAC: 2,
    maxDexBonus: null,
    minStrength: null,
    stealthDisadvantage: false,
    weight: 8,
    cost: "20 gp",
    description: "A standard shield with metal spikes added. Can be used for shield bash attacks that deal 1d4 + Str piercing damage. (DM Variant - not official 5e SRD)"
  }
] 