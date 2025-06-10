export interface AlignmentData {
  name: string;
  shortName: string;
  description: string;
  ethicalAxis: string;
  moralAxis: string;
}

export const alignmentsData: AlignmentData[] = [
  {
    name: "Lawful Good",
    shortName: "LG",
    description: "Creatures that combine a commitment to oppose evil with the discipline to fight relentlessly. They tell the truth, keep their word, help those in need, and speak out against injustice.",
    ethicalAxis: "Lawful",
    moralAxis: "Good"
  },
  {
    name: "Neutral Good",
    shortName: "NG", 
    description: "Folk who do the best they can to help others according to their needs. They're committed to helping others but don't feel bound by rules or tradition.",
    ethicalAxis: "Neutral",
    moralAxis: "Good"
  },
  {
    name: "Chaotic Good",
    shortName: "CG",
    description: "Creatures act as their conscience directs, with little regard for what others expect. They make their own way, but they're kind and benevolent.",
    ethicalAxis: "Chaotic", 
    moralAxis: "Good"
  },
  {
    name: "Lawful Neutral",
    shortName: "LN",
    description: "Individuals act in accordance with law, tradition, or personal codes. They may believe in personal order or live by a code.",
    ethicalAxis: "Lawful",
    moralAxis: "Neutral"
  },
  {
    name: "True Neutral",
    shortName: "TN",
    description: "Alignment of those who prefer to steer clear of moral questions and don't take sides, doing what seems best at the time.",
    ethicalAxis: "Neutral",
    moralAxis: "Neutral"
  },
  {
    name: "Chaotic Neutral",
    shortName: "CN",
    description: "Creatures follow their whims, holding their personal freedom above all else. They act on impulse and tend to be unpredictable.",
    ethicalAxis: "Chaotic",
    moralAxis: "Neutral"
  },
  {
    name: "Lawful Evil",
    shortName: "LE",
    description: "Creatures methodically take what they want, within the limits of a code of tradition, loyalty, or order.",
    ethicalAxis: "Lawful",
    moralAxis: "Evil"
  },
  {
    name: "Neutral Evil",
    shortName: "NE",
    description: "Alignment of those who do whatever they can get away with, without compassion or qualms.",
    ethicalAxis: "Neutral",
    moralAxis: "Evil"
  },
  {
    name: "Chaotic Evil",
    shortName: "CE",
    description: "Creatures act with arbitrary violence, spurred by their greed, hatred, or bloodlust.",
    ethicalAxis: "Chaotic",
    moralAxis: "Evil"
  }
]; 