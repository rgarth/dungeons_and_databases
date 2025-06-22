// Single source of truth for race descriptions used in avatar generation
import { 
  getDiverseDwarfAgeDescription,
  getDiverseHumanAgeDescription,
  getDiverseElfAgeDescription
} from './dnd/character';

export const raceDescriptions: Record<string, string> = {
  'Human': getDiverseHumanAgeDescription(),
  'Elf': getDiverseElfAgeDescription(),
  'Dwarf': getDiverseDwarfAgeDescription(),
  'Halfling': 'halfling character, small adult stature, mature adult face, adult proportions, NOT child, NOT young, adult halfling person',
  'Dragonborn': 'DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout',
  'Gnome': 'small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character',
  'Tiefling': 'tiefling character with horns, tail, infernal heritage, unusual skin color',
  'Half-Orc': 'half-orc character with greenish skin, prominent tusks, muscular build',
  'Half-Elf': 'half-elf character with slightly pointed ears, human-elf hybrid features',
  'Goliath': 'goliath character with stone-like skin markings, massive build, giant heritage',
  'Aasimar': 'aasimar character with celestial heritage, glowing eyes, radiant features, divine markings, otherworldly beauty, ethereal appearance, angelic features, divine aura',
  'Tabaxi': 'tabaxi character with cat-like features, feline face, fur covering body'
};

// Extended descriptions for test endpoints that need more detailed prompts
export const extendedRaceDescriptions: Record<string, string> = {
  'Aasimar': 'AASIMAR RACE with celestial heritage, glowing eyes, radiant features, divine markings',
  'Dragonborn': 'DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout',
  'Dwarf': 'DWARF RACE with short stature, broad build, thick beard, sturdy frame',
  'Elf': 'ELF RACE with pointed ears, graceful features, ethereal beauty, tall and slender',
  'Gnome': 'small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character',
  'Goliath': 'GOLIATH RACE with stone-like skin markings, massive build, giant heritage, towering height',
  'Half-Elf': 'HALF-ELF RACE with slightly pointed ears, human-elf hybrid features, graceful but sturdy',
  'Halfling': 'HALFLING RACE with small adult stature, mature adult face, adult proportions, hobbit-like build, NOT child, NOT young, adult halfling person',
  'Half-Orc': 'HALF-ORC RACE with greenish skin, prominent tusks, muscular build, orcish features',
  'Human': 'HUMAN RACE single character, one person only, individual human warrior, solo character with varied skin tones, normal human proportions',
  'Tabaxi': 'TABAXI RACE with cat-like features, feline face, fur covering body, cat ears and tail',
  'Tiefling': 'TIEFLING RACE with horns, tail, infernal heritage, unusual skin color, demonic features'
}; 