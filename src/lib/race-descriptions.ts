// Single source of truth for race descriptions used in avatar generation
import { 
  getDiverseDwarfAgeDescription,
  getDiverseHumanAgeDescription,
  getDiverseElfAgeDescription
} from './dnd/character';

export const raceDescriptions: Record<string, string> = {
  'Human': getDiverseHumanAgeDescription(),
  'Elf': getDiverseElfAgeDescription(),
  'Drow': 'drow dark elf with DARK SKIN, BLACK SKIN, DEEP BLACK SKIN, WHITE HAIR, SNOW WHITE HAIR, PURE WHITE HAIR, RED EYES, BLOOD RED EYES, CRIMSON RED EYES, pointed ears, graceful features, underdark heritage, drow appearance, dark elf features, underdark elf',
  'Dwarf': getDiverseDwarfAgeDescription(),
  'Duergar': 'duergar gray dwarf with GRAY SKIN, ASHEN SKIN, DEEP GRAY SKIN, BIG BUSHY BEARD, traditional dwarven features, stocky build, broad shoulders, underdark heritage, gray dwarf, underdark dwarf',
  'Halfling': 'halfling hobbit character, small adult stature, mature adult face, adult proportions, NOT child, NOT young, adult halfling person',
  'Dragonborn': 'reptilian beings, DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout, slender build, reptilian features, NOT human, clearly reptilian appearance',
  'Gnome': 'small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character',
  'Tiefling': 'tiefling character with horns, tail, infernal heritage, unusual skin color',
  'Half-Orc': 'half-orc character with greenish skin, prominent tusks, muscular build',
  'Half-Elf': 'half-elf character with slightly pointed ears, human-elf hybrid features',
  'Goliath': 'goliath character with stone-like skin markings, massive build, giant heritage, bald head, gray or brown skin with darker stone patterns, 7-8 feet tall',
  'Aasimar': 'aasimar character with celestial heritage, glowing eyes, radiant features, divine markings, otherworldly beauty, ethereal appearance, angelic features, divine aura',
  'Tabaxi': 'tabaxi character with cat-like features, feline face, fur covering body'
};

// Extended descriptions for test endpoints that need more detailed prompts
export const extendedRaceDescriptions: Record<string, string> = {
  'Aasimar': 'AASIMAR RACE with celestial heritage, glowing eyes, radiant features, divine markings',
  'Dragonborn': 'DRAGONBORN RACE with scaled skin covering face and body, draconic heritage, reptilian eyes, pronounced snout, slender build, thin frame, delicate reptilian features, NOT human, clearly reptilian appearance',
  'Dwarf': 'DWARF RACE with short stature, broad build, thick beard, sturdy frame',
  'Duergar': 'DUERGAR GRAY DWARF RACE with GRAY SKIN, ASHEN SKIN, DEEP GRAY SKIN, BIG BUSHY BEARD, traditional dwarven features, stocky build, broad shoulders, underdark heritage, gray dwarf, underdark dwarf',
  'Elf': 'ELF RACE with pointed ears, graceful features, ethereal beauty, tall and slender',
  'Gnome': 'small ADULT humanoid adventurer, mature adult person 3-4 feet tall, ADULT FACE with wrinkles and age lines, pointy ears like elf, intelligent sparkling eyes, high cheekbones, prominent nose, earth-toned skin, clean-shaven ADULT face, NO BEARD, ADULT proportions not child, weathered mature features, fantasy adventurer clothing, small ADULT person with elf-like features, humanoid ADULT not lawn ornament, NOT CHILD, NOT YOUNG FACE, mature adult character',
  'Goliath': 'GOLIATH RACE with stone-like skin markings, massive build, giant heritage, bald head, gray or brown skin with darker stone patterns, towering height of 7-8 feet',
  'Half-Elf': 'HALF-ELF RACE with slightly pointed ears, human-elf hybrid features, graceful but sturdy',
  'Halfling': 'HALFLING HOBBIT RACE with small adult stature, mature adult face, adult proportions, hobbit-like build, NOT child, NOT young, adult halfling person',
  'Half-Orc': 'HALF-ORC RACE with greenish skin, prominent tusks, muscular build, orcish features',
  'Human': 'HUMAN RACE single character, one person only, individual human warrior, solo character with varied skin tones, normal human proportions',
  'Tabaxi': 'TABAXI RACE with cat-like features, feline face, fur covering body, cat ears and tail',
  'Tiefling': 'TIEFLING RACE with horns, tail, infernal heritage, unusual skin color, demonic features',
  'Drow': 'DROW DARK ELF RACE with DARK SKIN, BLACK SKIN, DEEP BLACK SKIN, WHITE HAIR, SNOW WHITE HAIR, PURE WHITE HAIR, RED EYES, BLOOD RED EYES, CRIMSON RED EYES, pointed ears, graceful features, underdark heritage, drow appearance, dark elf features, underdark elf'
}; 