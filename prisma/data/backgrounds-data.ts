export interface BackgroundData {
  name: string;
  description: string;
  phbDescription: string; // Full PHB flavor text
  skillProficiencies: string[];
  toolProficiencies?: string[];
  languages: string[];
  equipment: string[];
  startingGold: number; // Starting gold in gold pieces
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
    phbDescription: "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric—performing sacred rites is not the same thing as channeling divine power.",
    skillProficiencies: ["Insight", "Religion"],
    languages: ["Two of your choice"],
    equipment: [
      "A holy symbol (a gift to you when you entered the priesthood)",
      "A prayer book or prayer wheel",
      "5 sticks of incense",
      "Vestments",
      "A set of common clothes",
      "A belt pouch containing 15 gp"
    ],
    startingGold: 15,
    feature: "Shelter of the Faithful",
    featureDescription: "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith, though you must provide any material components needed for spells. Those who share your religion will support you (but only you) at a modest lifestyle."
  },
  {
    name: "Criminal",
    description: "You are an experienced criminal with a history of breaking the law.",
    phbDescription: "You are an experienced criminal with a history of breaking the law. You spent years living under the thumb of the Dungsweepers' Guild, doing whatever dirty work needed doing. You might have been a pickpocket, a burglar, a smuggler, or a fence. Or you might have been a more respectable sort of criminal, such as a confidence artist, a forger, or a gambler. In any case, you learned to live by your wits and to take what you needed from others.",
    skillProficiencies: ["Deception", "Stealth"],
    languages: [],
    equipment: [
      "A crowbar",
      "A set of dark common clothes including a hood",
      "A belt pouch containing 15 gp"
    ],
    startingGold: 15,
    feature: "Criminal Contact",
    featureDescription: "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you."
  },
  {
    name: "Folk Hero",
    description: "You come from a humble social rank, but you are destined for so much more.",
    phbDescription: "You come from a humble social rank, but you are destined for so much more. Already the people of your home village regard you as their champion, and your destiny calls you to stand against the tyrants and monsters that threaten the common folk everywhere.",
    skillProficiencies: ["Animal Handling", "Survival"],
    languages: [],
    equipment: [
      "A set of artisan's tools (one of your choice)",
      "A shovel",
      "An iron pot",
      "A set of common clothes",
      "A belt pouch containing 10 gp"
    ],
    startingGold: 10,
    feature: "Rustic Hospitality",
    featureDescription: "Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you."
  },
  {
    name: "Noble",
    description: "You understand wealth, power, and privilege.",
    phbDescription: "You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence. You might be a pampered aristocrat unfamiliar with work or discomfort, a former merchant just elevated to the nobility, or a disinherited scoundrel with a disproportionate sense of entitlement. Or you could be an honest, hard-working landowner who cares deeply about the people who live and work on your land, keenly aware of your responsibility to them.",
    skillProficiencies: ["History", "Persuasion"],
    languages: ["One of your choice"],
    equipment: [
      "A set of fine clothes",
      "A signet ring",
      "A scroll of pedigree",
      "A belt pouch containing 25 gp"
    ],
    startingGold: 25,
    feature: "Position of Privilege",
    featureDescription: "Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you and avoid your displeasure, and other people of high birth treat you as a member of the same social sphere. You can secure an audience with a local noble if you need to."
  },
  {
    name: "Sage",
    description: "You spent years learning the lore of the multiverse.",
    phbDescription: "You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interest you. Your efforts have made you a master in your fields of study.",
    skillProficiencies: ["Arcana", "History"],
    languages: ["Two of your choice"],
    equipment: [
      "A bottle of black ink",
      "A quill",
      "A small knife",
      "A letter from a dead colleague posing a question you have not yet been able to answer",
      "A set of common clothes",
      "A belt pouch containing 10 gp"
    ],
    startingGold: 10,
    feature: "Researcher",
    featureDescription: "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this information comes from a library, scriptorium, university, or a sage or other learned person or creature. Your DM might rule that the knowledge you seek is secreted away in an almost inaccessible place, or that it simply cannot be found. Unearthing the deepest secrets of the multiverse can require an adventure or even a whole campaign."
  },
  {
    name: "Soldier",
    description: "War has been your life for as long as you care to remember.",
    phbDescription: "War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, learned basic survival techniques, including how to stay alive on the battlefield. You might have been part of a standing national army or a mercenary company, or perhaps a member of a local militia who rose to prominence during a recent war.",
    skillProficiencies: ["Athletics", "Intimidation"],
    languages: [],
    equipment: [
      "An insignia of rank",
      "A trophy taken from a fallen enemy (a dagger, broken blade, or piece of a banner)",
      "A set of bone dice or deck of cards",
      "A set of common clothes",
      "A belt pouch containing 10 gp"
    ],
    startingGold: 10,
    feature: "Military Rank",
    featureDescription: "You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use. You can also usually gain access to friendly military encampments and fortresses where your rank is recognized."
  },
  {
    name: "Charlatan",
    description: "You have always had a way with people.",
    phbDescription: "You have always had a way with people. You know what makes them tick, you can tease out their hearts' desires after a few minutes of conversation, and with a few leading questions you can read them like they were children's books. It's a useful talent, and one that you're perfectly willing to use for your advantage.",
    skillProficiencies: ["Deception", "Sleight of Hand"],
    languages: [],
    equipment: [
      "A set of fine clothes",
      "A disguise kit",
      "Tools of the con of your choice (ten stoppered bottles filled with colored liquid, a set of weighted dice, a deck of marked cards, or a signet ring of an imaginary duke)",
      "A belt pouch containing 15 gp"
    ],
    startingGold: 15,
    feature: "False Identity",
    featureDescription: "You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy."
  },
  {
    name: "Entertainer",
    description: "You thrive in front of an audience.",
    phbDescription: "You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetics can stir the hearts of those who hear you, awakening grief or joy, laughter or anger. Your music raises their spirits or captures their sorrow. Your dance steps captivate, your humor cuts to the quick. Whatever techniques you use, your art is your life.",
    skillProficiencies: ["Acrobatics", "Performance"],
    languages: [],
    equipment: [
      "A musical instrument (one of your choice)",
      "The favor of an admirer (love letter, lock of hair, or trinket)",
      "A costume",
      "A belt pouch containing 15 gp"
    ],
    startingGold: 15,
    feature: "By Popular Demand",
    featureDescription: "You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble's court. At such a place, you receive free lodging and food of a modest or comfortable standard (depending on the quality of the establishment), as long as you perform each night. In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you."
  },
  {
    name: "Guild Artisan",
    description: "You are a member of an artisan's guild.",
    phbDescription: "You are a member of an artisan's guild, skilled in a particular field and closely associated with other artisans. You are a well-established part of the mercantile world, freed by talent and wealth from the constraints of a feudal social order. You learned your skills as an apprentice to a master artisan, under the sponsorship of your guild, until you became a master in your own right.",
    skillProficiencies: ["Insight", "Persuasion"],
    languages: ["One of your choice"],
    equipment: [
      "A set of artisan's tools (one of your choice)",
      "A letter of introduction from your guild",
      "A set of traveler's clothes",
      "A belt pouch containing 15 gp"
    ],
    startingGold: 15,
    feature: "Guild Membership",
    featureDescription: "As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings."
  },
  {
    name: "Hermit",
    description: "You lived in seclusion for a formative part of your life.",
    phbDescription: "You lived in seclusion for a formative part of your life, in a sheltered monastery, abbey, convent, or the like. In your time apart from the clamor of society, you found quiet, solitude, and perhaps some of the answers you were looking for.",
    skillProficiencies: ["Medicine", "Religion"],
    languages: ["One of your choice"],
    equipment: [
      "A scroll case stuffed full of notes from your studies or prayers",
      "A winter blanket",
      "A set of common clothes",
      "An herbalism kit",
      "A belt pouch containing 5 gp"
    ],
    startingGold: 5,
    feature: "Discovery",
    featureDescription: "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature. It could be a site that no one else has ever seen. You might have uncovered a fact that has long been forgotten, or unearthed some relic of the past that could rewrite history. It might be information that would be damaging to the people who or consigned you to exile, and hence the reason for your return to society."
  },
  {
    name: "Outlander",
    description: "You grew up in the wilds, far from civilization.",
    phbDescription: "You grew up in the wilds, far from civilization and the comforts of town and technology. You've witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction. The wilds are in your blood, whether you were a nomad, an explorer, a recluse, a hunter-gatherer, or even a marauder. Even in places where you don't know the specific features of the terrain, you know the ways of the wild.",
    skillProficiencies: ["Athletics", "Survival"],
    languages: ["One of your choice"],
    equipment: [
      "A staff",
      "A hunting trap",
      "A trophy from an animal you killed",
      "A set of traveler's clothes",
      "A belt pouch containing 10 gp"
    ],
    startingGold: 10,
    feature: "Wanderer",
    featureDescription: "You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth."
  },
  {
    name: "Sailor",
    description: "You sailed on a seagoing vessel for years.",
    phbDescription: "You sailed on a seagoing vessel for years. In that time, you faced down mighty storms, monsters of the deep, and those who wanted to sink your craft to the bottomless depths. Your first love is the distant line of the horizon, and the dark shapes of mountains and islands that pierce it.",
    skillProficiencies: ["Athletics", "Perception"],
    languages: [],
    equipment: [
      "A belaying pin (club)",
      "50 feet of silk rope",
      "A lucky charm such as a rabbit foot or a small stone with a hole in the center (or you may roll for a random trinket on the Trinkets table)",
      "A set of common clothes",
      "A belt pouch containing 10 gp"
    ],
    startingGold: 10,
    feature: "Ship's Passage",
    featureDescription: "When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with (perhaps one captained by a former crewmate). Because you're calling in a favor, you can't be certain of a schedule or route that meets your every need. Your DM will determine how long it takes to get where you need to go. In return for free passage, you and your companions are expected to assist the crew during the voyage."
  }
];