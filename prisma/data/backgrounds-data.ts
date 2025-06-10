export interface BackgroundData {
  name: string;
  description: string;
  skillProficiencies: string[];
  languages: string[];
  equipment: string[];
  feature: string;
  featureDescription: string;
  suggestedCharacteristics?: {
    personalityTraits: string[];
    ideals: string[];
    bonds: string[];
    flaws: string[];
  };
}

export const backgroundsData: BackgroundData[] = [
  {
    name: "Acolyte",
    description: "You have spent your life in the service of a temple to a specific god or pantheon of gods.",
    skillProficiencies: ["Insight", "Religion"],
    languages: ["Two of your choice"],
    equipment: [
      "Holy Symbol",
      "Prayer Book",
      "Incense (5)",
      "Vestments",
      "Common Clothes",
      "Belt Pouch"
    ],
    feature: "Shelter of the Faithful",
    featureDescription: "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity."
  },
  {
    name: "Criminal",
    description: "You are an experienced criminal with a history of breaking the law.",
    skillProficiencies: ["Deception", "Stealth"],
    languages: [],
    equipment: [
      "Crowbar",
      "Dark Common Clothes",
      "Hood",
      "Belt Pouch"
    ],
    feature: "Criminal Contact",
    featureDescription: "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals."
  },
  {
    name: "Folk Hero",
    description: "You come from a humble social rank, but you are destined for so much more.",
    skillProficiencies: ["Animal Handling", "Survival"],
    languages: [],
    equipment: [
      "Artisan's Tools",
      "Shovel",
      "Iron Pot",
      "Common Clothes",
      "Belt Pouch"
    ],
    feature: "Rustic Hospitality",
    featureDescription: "Since you come from the ranks of the common folk, you fit in among them with ease."
  },
  {
    name: "Noble",
    description: "You understand wealth, power, and privilege. You carry a noble title.",
    skillProficiencies: ["History", "Persuasion"],
    languages: ["One of your choice"],
    equipment: [
      "Signet Ring",
      "Scroll of Pedigree",
      "Fine Clothes",
      "Belt Pouch"
    ],
    feature: "Position of Privilege",
    featureDescription: "Thanks to your noble birth, people are inclined to think the best of you."
  },
  {
    name: "Sage",
    description: "You spent years learning the lore of the multiverse.",
    skillProficiencies: ["Arcana", "History"],
    languages: ["Two of your choice"],
    equipment: [
      "Ink",
      "Quill",
      "Small Knife",
      "Letter",
      "Common Clothes",
      "Belt Pouch"
    ],
    feature: "Researcher",
    featureDescription: "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it."
  },
  {
    name: "Soldier",
    description: "War has been your life for as long as you care to remember.",
    skillProficiencies: ["Athletics", "Intimidation"],
    languages: [],
    equipment: [
      "Insignia of Rank",
      "Trophy",
      "Deck of Cards",
      "Common Clothes",
      "Belt Pouch"
    ],
    feature: "Military Rank",
    featureDescription: "You have a military rank from your career as a soldier."
  },
  {
    name: "Charlatan",
    description: "You have always had a way with people. You know what makes them tick.",
    skillProficiencies: ["Deception", "Sleight of Hand"],
    languages: [],
    equipment: [
      "Disguise Kit",
      "Forgery Kit",
      "Signet Ring",
      "Fine Clothes",
      "Belt Pouch"
    ],
    feature: "False Identity",
    featureDescription: "You have created a second identity that includes documentation, established acquaintances, and disguises."
  },
  {
    name: "Entertainer",
    description: "You thrive in front of an audience. You know how to entrance them.",
    skillProficiencies: ["Acrobatics", "Performance"],
    languages: [],
    equipment: [
      "Musical Instrument",
      "Costume",
      "Belt Pouch"
    ],
    feature: "By Popular Demand",
    featureDescription: "You can always find a place to perform, usually in an inn or tavern."
  },
  {
    name: "Guild Artisan",
    description: "You are a member of an artisan's guild, skilled in a particular field.",
    skillProficiencies: ["Insight", "Persuasion"],
    languages: ["One of your choice"],
    equipment: [
      "Artisan's Tools",
      "Letter of Introduction",
      "Traveler's Clothes",
      "Belt Pouch"
    ],
    feature: "Guild Membership",
    featureDescription: "As an established and respected member of a guild, you can rely on certain benefits that membership provides."
  },
  {
    name: "Hermit",
    description: "You lived in seclusion for a formative part of your life.",
    skillProficiencies: ["Medicine", "Religion"],
    languages: ["One of your choice"],
    equipment: [
      "Herbalism Kit",
      "Scroll",
      "Traveler's Clothes",
      "Belt Pouch"
    ],
    feature: "Discovery",
    featureDescription: "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery."
  },
  {
    name: "Outlander",
    description: "You grew up in the wilds, far from civilization and the comforts of town and technology.",
    skillProficiencies: ["Athletics", "Survival"],
    languages: ["One of your choice"],
    equipment: [
      "Staff",
      "Hunting Trap",
      "Traveler's Clothes",
      "Belt Pouch"
    ],
    feature: "Wanderer",
    featureDescription: "You have an excellent memory for maps and geography, and you can always recall the general layout of terrain."
  },
  {
    name: "Sailor",
    description: "You sailed on a seagoing vessel for years.",
    skillProficiencies: ["Athletics", "Perception"],
    languages: [],
    equipment: [
      "Belaying Pin",
      "Silk Rope (50 feet)",
      "Lucky Charm",
      "Common Clothes",
      "Belt Pouch"
    ],
    feature: "Ship's Passage",
    featureDescription: "When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions."
  }
]; 