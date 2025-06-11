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
    equipment: ["Holy Symbol", "Prayer Book", "Incense (5)", "Vestments", "Common Clothes", "Belt Pouch"],
    feature: "Shelter of the Faithful",
    featureDescription: "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
        "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
        "I see omens in every event and action. The gods try to speak to us, we just need to listen.",
        "Nothing can shake my optimistic attitude.",
        "I quote (or misquote) sacred texts and proverbs in almost every situation.",
        "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
        "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
        "I've spent so long in the temple that I have little practical experience dealing with people in the outside world."
      ],
      ideals: [
        "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)",
        "Charity. I always try to help those in need, no matter what the personal cost. (Good)",
        "Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)",
        "Power. I hope to one day rise to the top of my faith's religious hierarchy. (Lawful)",
        "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)",
        "Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings. (Any)"
      ],
      bonds: [
        "I would die to recover an ancient relic of my faith that was lost long ago.",
        "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
        "I owe my life to the priest who took me in when my parents died.",
        "Everything I do is for the common people.",
        "I will do anything to protect the temple where I served.",
        "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
      ],
      flaws: [
        "I judge others harshly, and myself even more severely.",
        "I put too much trust in those who wield power within my temple's hierarchy.",
        "My piety sometimes leads me to blindly trust those that profess faith in my god.",
        "I am inflexible in my thinking.",
        "I am suspicious of strangers and expect the worst of them.",
        "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
      ]
    }
  },
  {
    name: "Criminal",
    description: "You are an experienced criminal with a history of breaking the law.",
    skillProficiencies: ["Deception", "Stealth"],
    languages: [],
    equipment: ["Crowbar", "Dark Common Clothes with Hood", "Belt Pouch"],
    feature: "Criminal Contact",
    featureDescription: "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I always have a plan for what to do when things go wrong.",
        "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
        "The first thing I do in a new place is note the locations of everything valuable or important.",
        "I would rather make a new friend than a new enemy.",
        "I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
        "I don't pay attention to the risks in a situation. Never tell me the odds.",
        "The best way to get me to do something is to tell me I can't do it.",
        "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble."
      ],
      ideals: [
        "Honor. I don't betray others in my former profession. (Lawful)",
        "Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)",
        "Charity. I use my skills to help people in need. (Good)",
        "Greed. I will do whatever it takes to become wealthy. (Evil)",
        "People. I'm loyal to my friends, not to any ideals. (Neutral)",
        "Redemption. There's a spark of good in everyone. (Good)"
      ],
      bonds: [
        "I'm trying to pay off an old debt I owe to a generous benefactor.",
        "My ill-gotten gains went to support my family. I must provide for them.",
        "Something important was taken from me, and I aim to get it back.",
        "I will become the greatest thief that ever lived.",
        "I'm guilty of a terrible wrong. I hope I can redeem myself for it.",
        "Someone I loved died because of a mistake I made. That will never happen again."
      ],
      flaws: [
        "When I see something valuable, I can't think about anything but how to acquire it.",
        "When faced with a choice between money and my friends, I usually choose the money.",
        "If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.",
        "I have a 'tell' that reveals when I'm lying.",
        "I turn tail and run when things look bad.",
        "An innocent person is in prison for a wrong I committed. I'm okay with that."
      ]
    }
  },
  {
    name: "Folk Hero",
    description: "You come from a humble social rank, but you are destined for so much more.",
    skillProficiencies: ["Animal Handling", "Survival"],
    languages: [],
    equipment: ["Artisan's Tools", "Shovel", "Set of Artisan Tools", "Common Clothes", "Belt Pouch"],
    feature: "Rustic Hospitality",
    featureDescription: "Since you come from the ranks of the common folk, you fit in among them with ease.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I judge people by their actions, not their words.",
        "If someone is in trouble, I'm always ready to lend help.",
        "When I set my mind to something, I follow through no matter what gets in my way.",
        "I have a strong sense of fair play and always try to find the most equitable solution to arguments.",
        "I'm confident in my own abilities and do what I can to instill confidence in others.",
        "Thinking is for other people. I prefer action.",
        "I misuse long words in an attempt to sound smarter.",
        "I get bored easily. When am I going to get on with my destiny?"
      ],
      ideals: [
        "Respect. People deserve to be treated with dignity and respect. (Good)",
        "Fairness. No one should get preferential treatment before the law, and no one is above the law. (Lawful)",
        "Freedom. Tyrants must not be allowed to oppress the people. (Chaotic)",
        "Might. If I become strong, I can take what I want—what I deserve. (Evil)",
        "Sincerity. There's no good in pretending to be something I'm not. (Neutral)",
        "Destiny. Nothing and no one can steer me away from my higher calling. (Any)"
      ],
      bonds: [
        "I have a family, but I have no idea where they are. One day, I hope to see them again.",
        "I worked the land, I love the land, and I will protect the land.",
        "A noble once wronged me, and I will stand up to any bully I encounter.",
        "My tools are symbols of my past life, and I carry them so that I will never forget my roots.",
        "I protect those who cannot protect themselves.",
        "I wish my childhood sweetheart could come with me to pursue my destiny."
      ],
      flaws: [
        "The tyrant who rules my land will stop at nothing to see me destroyed.",
        "I'm convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure.",
        "The people who knew me when I was young know my shameful secret, so I can never go home again.",
        "I have a weakness for the vices of the city, especially hard drink.",
        "Secretly, I believe that things would be better if I were a tyrant lording over the land.",
        "I have trouble trusting in my allies."
      ]
    }
  },
  {
    name: "Noble",
    description: "You understand wealth, power, and privilege.",
    skillProficiencies: ["History", "Persuasion"],
    languages: ["One of your choice"],
    equipment: ["Signet Ring", "Scroll of Pedigree", "Fine Clothes", "Purse"],
    feature: "Position of Privilege",
    featureDescription: "Thanks to your noble birth, people are inclined to think the best of you.",
    suggestedCharacteristics: {
      personalityTraits: [
        "My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world.",
        "The common folk appreciate me for my kindness and generosity.",
        "I carry myself with dignity and take pride in my appearance and bearing.",
        "I take great pains to always look my best and follow the latest fashions.",
        "I prefer comfortable accommodations and quality goods when possible.",
        "Despite my noble birth, I do not place myself above other folk. We all deserve respect.",
        "I am slow to trust after being betrayed.",
        "I have high standards and expectations for myself and others."
      ],
      ideals: [
        "Respect. All people regardless of station deserve to be treated with dignity. (Good)",
        "Responsibility. It is my duty to use my position to help others. (Lawful)",
        "Independence. I must prove that I can handle myself without help from my family. (Chaotic)",
        "Ambition. I strive to prove myself worthy of my family's name. (Any)",
        "Family. Blood runs thicker than water. (Any)",
        "Noble Obligation. It is my duty to protect and care for those who depend on me. (Good)"
      ],
      bonds: [
        "I will face any challenge to win the approval of my family.",
        "My house's alliance with another noble family must be sustained at all costs.",
        "Nothing is more important than the other members of my family.",
        "I am in love with the heir of a family that my family despises.",
        "My loyalty to my sovereign is unwavering.",
        "The common folk must see me as a hero of the people."
      ],
      flaws: [
        "I secretly believe that everyone is beneath me.",
        "I hide a truly scandalous secret that could ruin my family forever.",
        "I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger.",
        "I have an insatiable desire for carnal pleasures.",
        "In fact, the world does revolve around me.",
        "By my words and actions, I often bring shame to my family."
      ]
    }
  },
  {
    name: "Sage",
    description: "You spent years learning the lore of the multiverse.",
    skillProficiencies: ["Arcana", "History"],
    languages: ["Two of your choice"],
    equipment: ["Bottle of Black Ink", "Quill", "Small Knife", "Letter", "Common Clothes", "Belt Pouch"],
    feature: "Researcher",
    featureDescription: "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I use polysyllabic words that convey the impression of great erudition.",
        "I've read every book in the world's greatest libraries—or I like to boast that I have.",
        "I am horribly, horribly awkward in social situations.",
        "I'm convinced that people are always trying to steal my secrets.",
        "I speak without really thinking through my words, invariably insulting others.",
        "I can't keep a secret to save my life, or anyone else's.",
        "I overlook obvious solutions in favor of complicated ones.",
        "I speak several languages, and I like to sprinkle conversations with words from them."
      ],
      ideals: [
        "Knowledge. The path to power and self-improvement is through knowledge. (Neutral)",
        "Beauty. What is beautiful points us beyond itself toward what is true. (Good)",
        "Logic. Emotions must not cloud our logical thinking. (Lawful)",
        "No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)",
        "Power. Knowledge is the path to power and domination. (Evil)",
        "Self-Improvement. The goal of a life of study is the betterment of oneself. (Any)"
      ],
      bonds: [
        "It is my duty to protect my students.",
        "I have an ancient text that holds terrible secrets that must not fall into the wrong hands.",
        "I work to preserve a library, university, scriptorium, or monastery.",
        "My life's work is a series of tomes related to a specific field of lore.",
        "I've been searching my whole life for the answer to a certain question.",
        "I sold my soul for knowledge. I hope to do great deeds and win it back."
      ],
      flaws: [
        "I am easily distracted by the promise of information.",
        "Most people scream and run when they see a demon. I stop and take notes on its anatomy.",
        "Unlocking an ancient mystery is worth the price of a civilization.",
        "I prefer the company of books to people.",
        "I believe that anything worth doing is worth doing right. I can't help but insist on perfection.",
        "I speak without really thinking through my words, invariably insulting others."
      ]
    }
  },
  {
    name: "Soldier",
    description: "War has been your life for as long as you care to remember.",
    skillProficiencies: ["Athletics", "Intimidation"],
    languages: [],
    equipment: ["Insignia of Rank", "Trophy", "Deck of Cards", "Common Clothes", "Belt Pouch"],
    feature: "Military Rank",
    featureDescription: "You have a military rank from your career as a soldier.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I'm always polite and respectful.",
        "I'm haunted by memories of conflict. I can't get the images of violence out of my mind.",
        "I've lost too many friends, and I'm slow to make new ones.",
        "I'm full of inspiring and cautionary tales from my military experience relevant to almost every combat situation.",
        "I can stare down a hellhound without flinching.",
        "I enjoy being strong and like breaking things.",
        "I have a crude sense of humor.",
        "I face problems head-on. A simple, direct solution is the best path to success."
      ],
      ideals: [
        "Greater Good. Our lot is to lay down our lives in defense of others. (Good)",
        "Responsibility. I do what I must and obey just authority. (Lawful)",
        "Independence. When people follow orders blindly, they embrace a kind of tyranny. (Chaotic)",
        "Might. In life as in combat, the stronger force wins. (Evil)",
        "Live and Let Live. Ideals aren't worth fighting over or going to war for. (Neutral)",
        "Nation. My city, nation, or people are all that matter. (Any)"
      ],
      bonds: [
        "I would still lay down my life for the people I served with.",
        "Someone saved my life on the battlefield. To this day, I will never leave a friend behind.",
        "My honor is my life.",
        "I'll never forget the crushing defeat my company suffered or the enemies who dealt it.",
        "Those who fight beside me are those worth dying for.",
        "I fight for those who cannot fight for themselves."
      ],
      flaws: [
        "The monstrous enemy we faced in battle still leaves me quivering with fear.",
        "I have little respect for anyone who is not a proven warrior.",
        "I made a terrible mistake in battle that cost many lives—and I would do anything to keep that mistake secret.",
        "My hatred of my enemies is blind and unreasoning.",
        "I obey the law, even if the law causes misery.",
        "I'd rather eat my armor than admit when I'm wrong."
      ]
    }
  },
  {
    name: "Charlatan",
    description: "You have always had a way with people.",
    skillProficiencies: ["Deception", "Sleight of Hand"],
    languages: [],
    equipment: ["Forgery Kit", "Disguise Kit", "Signet Ring", "Fine Clothes", "Belt Pouch"],
    feature: "False Identity",
    featureDescription: "You have created a second identity that includes documentation, established acquaintances, and disguises.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I have a joke for every occasion, especially occasions where humor is inappropriate.",
        "Flattery is my preferred trick for getting what I want.",
        "I'm a born gambler who can't resist taking a risk for a potential payoff.",
        "I lie about almost everything, even when there's no good reason to.",
        "Sarcasm and insults are my weapons of choice.",
        "I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment.",
        "I pocket anything I see that might have some value.",
        "I change my personality to suit whoever I'm talking to."
      ],
      ideals: [
        "Independence. I am a free spirit—no one tells me what to do. (Chaotic)",
        "Fairness. I never target people who can't afford to lose a few coins. (Lawful)",
        "Charity. I distribute the money I acquire to the people who really need it. (Good)",
        "Creativity. I never run the same con twice. (Chaotic)",
        "Friendship. Material goods come and go. Bonds of friendship last forever. (Good)",
        "Aspiration. I'm determined to make something of myself. (Any)"
      ],
      bonds: [
        "I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about.",
        "I owe everything to my mentor—a person who taught me everything I know.",
        "Somewhere out there, I have a child who doesn't know me. I'm making the world better for him or her.",
        "I come from a noble family, and one day I'll reclaim my lands and title from those who stole them from me.",
        "A powerful person ruined my life, and someday I'll get my revenge.",
        "I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself."
      ],
      flaws: [
        "I can't resist a pretty face.",
        "I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in.",
        "I'm convinced that no one could ever fool me the way I fool others.",
        "I'm too greedy for my own good. I can't resist taking a risk if there's money involved.",
        "I can't resist swindling people who are more powerful than me.",
        "I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough."
      ]
    }
  },
  {
    name: "Entertainer",
    description: "You thrive in front of an audience.",
    skillProficiencies: ["Acrobatics", "Performance"],
    languages: [],
    equipment: ["Musical Instrument", "Favor of an Admirer", "Costume", "Belt Pouch"],
    feature: "By Popular Demand",
    featureDescription: "You can always find a place to perform, usually in an inn or tavern.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I know a story relevant to almost every situation.",
        "Whenever I come to a new place, I collect local rumors and spread gossip.",
        "I'm a hopeless romantic, always searching for that 'special someone.'",
        "Nobody stays angry at me or around me for long, since I can defuse any amount of tension.",
        "I love a good insult, even one directed at me.",
        "I get bitter if I'm not the center of attention.",
        "I'll settle for nothing less than perfection.",
        "I change my mood or my mind as quickly as I change key in a song."
      ],
      ideals: [
        "Beauty. When I perform, I make the world better than it was. (Good)",
        "Tradition. The stories, legends, and songs of the past must never be forgotten, for they teach us who we are. (Lawful)",
        "Creativity. The world is in need of new ideas and bold action. (Chaotic)",
        "Greed. I'm only in it for the money and fame. (Evil)",
        "People. I like seeing the smiles on people's faces when I perform. That's all that matters. (Neutral)",
        "Honesty. Art should reflect the soul; it should come from within and reveal who we really are. (Any)"
      ],
      bonds: [
        "My instrument is my most treasured possession, and it reminds me of someone I love.",
        "Someone stole my precious instrument, and someday I'll get it back.",
        "I want to be famous, whatever it takes.",
        "I idolize a hero of the old tales and measure my deeds against that person's.",
        "I will do anything to prove myself superior to my hated rival.",
        "I would do anything for the other members of my old troupe."
      ],
      flaws: [
        "I'll do anything to win fame and renown.",
        "I'm a sucker for a pretty face.",
        "A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.",
        "I once satirized a noble who still wants my head. It was a mistake that I will likely repeat.",
        "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.",
        "Despite my best efforts, I am unreliable to my friends."
      ]
    }
  },
  {
    name: "Guild Artisan",
    description: "You are a member of an artisan's guild.",
    skillProficiencies: ["Insight", "Persuasion"],
    languages: ["One of your choice"],
    equipment: ["Artisan's Tools", "Letter of Introduction", "Traveler's Clothes", "Belt Pouch"],
    feature: "Guild Membership",
    featureDescription: "As an established and respected member of a guild, you can rely on certain benefits that membership provides.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I believe that anything worth doing is worth doing right. I can't help but insist on perfection.",
        "I'm a snob who looks down on those who can't appreciate fine craftsmanship.",
        "I always want to know how things work and what makes people tick.",
        "I'm full of witty aphorisms and have a proverb for every occasion.",
        "I'm rude to people who lack my commitment to hard work and fair play.",
        "I like to talk at length about my profession.",
        "I don't part with my money easily and will haggle tirelessly to get the best deal possible.",
        "I'm well known for my work, and I want to make sure everyone appreciates it."
      ],
      ideals: [
        "Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)",
        "Generosity. My talents were given to me so that I could use them to benefit the world. (Good)",
        "Freedom. Everyone should be free to pursue his or her own livelihood. (Chaotic)",
        "Greed. I'm only in it for the money. (Evil)",
        "People. I'm committed to the people I care about, not to ideals. (Neutral)",
        "Aspiration. I work hard to be the best there is at my craft. (Any)"
      ],
      bonds: [
        "The workshop where I learned my trade is the most important place in the world to me.",
        "I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy.",
        "I owe my guild a great debt for forging me into the person I am today.",
        "I pursue wealth to secure someone's love.",
        "One day I will return to my guild and prove that I am the greatest artisan of them all.",
        "I will get revenge on the people who ruined my guild and scattered the members to the winds."
      ],
      flaws: [
        "I'll do anything to get my hands on something rare or priceless.",
        "I'm quick to assume that someone is trying to cheat me.",
        "No one must ever learn that I once stole money from guild coffers.",
        "I'm never satisfied with what I have—I always want more.",
        "I would lose my integrity before I lose my profit.",
        "I'm horribly jealous of anyone who can outshine my handiwork. Everywhere I go, I'm surrounded by rivals."
      ]
    }
  },
  {
    name: "Hermit",
    description: "You lived in seclusion for a formative part of your life.",
    skillProficiencies: ["Medicine", "Religion"],
    languages: ["One of your choice"],
    equipment: ["Herbalism Kit", "Scroll", "Winter Blanket", "Traveler's Clothes", "Belt Pouch"],
    feature: "Discovery",
    featureDescription: "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I've been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.",
        "I am utterly serene, even in the face of disaster.",
        "The leader of my community had something wise to say on every topic, and I am eager to share that wisdom.",
        "I feel tremendous empathy for all who suffer.",
        "I'm oblivious to etiquette and social expectations.",
        "I connect everything that happens to me to a grand, cosmic plan.",
        "I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings.",
        "I am working on a grand philosophical theory and love sharing my ideas."
      ],
      ideals: [
        "Greater Good. My gifts are meant to be shared with all, not used for my own benefit. (Good)",
        "Logic. Emotions must not cloud our sense of what is right and true, or our logical thinking. (Lawful)",
        "Free Thinking. Inquiry and curiosity are the pillars of progress. (Chaotic)",
        "Power. Solitude and contemplation are paths toward mystical or magical power. (Evil)",
        "Live and Let Live. Meddling in the affairs of others only causes trouble. (Neutral)",
        "Self-Knowledge. If you know yourself, there's nothing left to know. (Any)"
      ],
      bonds: [
        "Nothing is more important than the other members of my hermitage, order, or association.",
        "I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them.",
        "I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me.",
        "I entered seclusion because I loved someone I could not have.",
        "Should my discovery come to light, it could bring ruin to the world.",
        "My isolation gave me great insight into a great evil that only I can destroy."
      ],
      flaws: [
        "Now that I've returned to the world, I enjoy its delights a little too much.",
        "I harbor dark, threatening thoughts that my isolation and meditation failed to quell.",
        "I am dogmatic in my thinking and philosophy.",
        "I let my need to win arguments overshadow friendships and harmony.",
        "I'd risk too much to uncover a lost bit of knowledge.",
        "I like keeping secrets and won't share them with anyone."
      ]
    }
  },
  {
    name: "Outlander",
    description: "You grew up in the wilds, far from civilization.",
    skillProficiencies: ["Athletics", "Survival"],
    languages: ["One of your choice"],
    equipment: ["Staff", "Hunting Trap", "Traveler's Clothes", "Belt Pouch"],
    feature: "Wanderer",
    featureDescription: "You have an excellent memory for maps and geography, and you can always recall the general layout of terrain.",
    suggestedCharacteristics: {
      personalityTraits: [
        "I'm driven by a wanderlust that led me away from home.",
        "I watch over my friends as if they were a litter of newborn pups.",
        "I once ran twenty-five miles without stopping to warn my clan of an approaching danger. I'd do it again if I had to.",
        "I have a lesson for every situation, drawn from observing nature.",
        "I place no stock in wealthy or well-mannered folk. Money and manners won't save you from a hungry owlbear.",
        "I'm always picking things up, absently fiddling with them, and sometimes accidentally breaking them.",
        "I feel far more comfortable around animals than people.",
        "I was, in fact, raised by wolves."
      ],
      ideals: [
        "Change. Life is like the seasons, in constant change, and we must change with it. (Chaotic)",
        "Greater Good. It is each person's responsibility to make the most happiness for the whole tribe. (Good)",
        "Honor. If I dishonor myself, I dishonor my whole clan. (Lawful)",
        "Might. The strongest are meant to rule. (Evil)",
        "Nature. The natural world is more important than all the constructs of civilization. (Neutral)",
        "Glory. I must earn glory in battle, for myself and my clan. (Any)"
      ],
      bonds: [
        "My family, clan, or tribe is the most important thing in my life, even when they are far from me.",
        "An injury to the unspoiled wilderness of my home is an injury to me.",
        "I will bring justice to the evildoers who destroyed my homeland.",
        "I am the last of my tribe, and it is up to me to ensure their names enter legend.",
        "I suffer awful visions of a coming disaster and will do anything to prevent it.",
        "It is my duty to provide children to sustain my tribe."
      ],
      flaws: [
        "I am too enamored of ale, wine, and other intoxicants.",
        "There's no room for caution in a life lived to the fullest.",
        "I remember every insult I've received and nurse a silent resentment toward anyone who's ever wronged me.",
        "I am slow to trust members of other races, tribes, and societies.",
        "I have difficulty trusting in my allies.",
        "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble."
      ]
    }
  },
  {
    name: "Sailor",
    description: "You sailed on a seagoing vessel for years.",
    skillProficiencies: ["Athletics", "Perception"],
    languages: [],
    equipment: ["Belaying Pin", "Silk Rope (50 feet)", "Lucky Charm", "Common Clothes", "Belt Pouch"],
    feature: "Ship's Passage",
    featureDescription: "When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions.",
    suggestedCharacteristics: {
      personalityTraits: [
        "My friends know they can rely on me, no matter what.",
        "I work hard so that I can play hard when the work is done.",
        "I enjoy sailing into new ports and making new friends over a flagon of ale.",
        "I stretch the truth for the sake of a good story.",
        "To me, a tavern brawl is a nice way to get to know a new city.",
        "I never pass up a friendly wager.",
        "My language is colorful and full of sailing terms.",
        "I like a job well done, especially if I can convince someone else to do it."
      ],
      ideals: [
        "Respect. The thing that keeps a ship together is mutual respect between captain and crew. (Good)",
        "Fairness. We all do the work, so we all share in the rewards. (Lawful)",
        "Freedom. The sea is freedom—the freedom to go anywhere and do anything. (Chaotic)",
        "Mastery. I'm a predator, and the other ships on the sea are my prey. (Evil)",
        "People. I'm committed to my crewmates, not to ideals. (Neutral)",
        "Aspiration. Someday I'll own my own ship and chart my own destiny. (Any)"
      ],
      bonds: [
        "I'm loyal to my captain first, everything else second.",
        "The ship is most important—crewmates and captains come and go.",
        "I'll always remember my first ship.",
        "In a harbor town, I have a paramour whose eyes nearly stole me from the sea.",
        "I was cheated out of my fair share of the profits, and I want to get my due.",
        "Ruthless pirates destroyed my previous ship and harmed my former crewmates. Vengeance will be mine."
      ],
      flaws: [
        "I follow orders, even if I think they're wrong.",
        "I'll say anything to avoid having to do extra work.",
        "Once someone questions my courage, I never back down no matter how dangerous the situation.",
        "Once I start drinking, it's hard for me to stop.",
        "I can't help but pocket loose coins and other trinkets I come across.",
        "My pride will probably lead to my destruction."
      ]
    }
  }
  
];