"use client";

import { PDFDocument } from 'pdf-lib';
import { Download } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { getModifier } from '@/lib/dnd/core';

interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  subclass?: string;
  level: number;
  background?: string;
  alignment?: string;
  experiencePoints?: number;
  age?: number;
  height?: string;
  weight?: string;
  eyes?: string;
  skin?: string;
  hair?: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitPoints: number;
  maxHitPoints: number;
  temporaryHitPoints?: number;
  armorClass: number;
  inspiration?: boolean;
  speed: number;
  skills?: string[];
  savingThrows?: string[];
  weapons?: Array<{name: string; damage?: string; damageType?: string}>;
  inventoryWeapons?: Array<{name: string}>;
  inventoryArmor?: Array<{name: string}>;
  inventoryItems?: Array<{name: string}>;
  spellsKnown?: Array<{name: string; level: number; school: string; castingTime: string; range: string; components: string; duration: string; description: string; classes: string[]}>;
  copper?: number;
  silver?: number;
  electrum?: number;
  gold?: number;
  platinum?: number;
  personalityTraits?: string | string[];
  ideals?: string | string[];
  bonds?: string | string[];
  flaws?: string | string[];
  features?: string[];
  languages?: string[];
  proficiencies?: string[];
  allies?: string;
  faction?: string;
  backstory?: string;
  treasures?: Array<{name: string}>;
}

interface PDFExportProps {
  character: Character;
  className?: string;
}

export function PDFExport({ character, className }: PDFExportProps) {
  const { data: session } = useSession();
  
  const getProficiencyBonus = (level: number): number => {
    return Math.ceil(level / 4) + 1;
  };

  const getSpellcastingAbility = (characterClass: string): string | null => {
    switch (characterClass) {
      case 'Wizard': return 'Intelligence';
      case 'Cleric': case 'Druid': return 'Wisdom';
      case 'Bard': case 'Sorcerer': case 'Warlock': case 'Paladin': return 'Charisma';
      case 'Ranger': return 'Wisdom';
      case 'Fighter': case 'Rogue': return 'Intelligence'; // Eldritch Knight, Arcane Trickster
      default: return null;
    }
  };

  const getAbilityModifier = (character: Character, ability: string): number => {
    switch (ability) {
      case 'Strength': return getModifier(character.strength);
      case 'Dexterity': return getModifier(character.dexterity);
      case 'Constitution': return getModifier(character.constitution);
      case 'Intelligence': return getModifier(character.intelligence);
      case 'Wisdom': return getModifier(character.wisdom);
      case 'Charisma': return getModifier(character.charisma);
      default: return 0;
    }
  };

  const getHitDie = (characterClass: string): number => {
    switch (characterClass) {
      case 'Barbarian': return 12;
      case 'Fighter': case 'Paladin': case 'Ranger': return 10;
      case 'Bard': case 'Cleric': case 'Druid': case 'Monk': case 'Rogue': case 'Warlock': return 8;
      case 'Sorcerer': case 'Wizard': return 6;
      default: return 8; // Default to d8
    }
  };

  const exportToPDF = async () => {
    try {
      // Load the original D&D 5e character sheet PDF with all form fields
      const response = await fetch('/dnd-5e-character-sheet.pdf');
      if (!response.ok) {
        throw new Error('Could not load character sheet template');
      }
      
      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
      
      // Helper function to safely fill text fields
      const fillField = (fieldName: string, value: string | number | undefined, fontSize: number = 10) => {
        try {
          const field = form.getTextField(fieldName);
          if (field && value !== undefined) {
            field.setText(String(value));
            field.setFontSize(fontSize);
          }
        } catch (error) {
          console.warn(`Could not fill field '${fieldName}':`, error);
        }
      };

      // Helper function to safely fill checkboxes
      const fillCheckBox = (fieldName: string, checked: boolean) => {
        try {
          const field = form.getCheckBox(fieldName);
          if (field) {
            if (checked) {
              field.check();
            } else {
              field.uncheck();
            }
          }
        } catch (error) {
          console.warn(`Could not fill checkbox '${fieldName}':`, error);
        }
      };

      // Basic character information
      fillField('CharacterName', character.name);
      fillField('CharacterName 2', character.name); // Second page character name
      fillField('PlayerName', session?.user?.name || ''); // Player name from Google login
      fillField('Race ', character.race); // Note the space in field name
      fillField('ClassLevel', `${character.class} ${character.level}`);
      fillField('Background', character.background || '');
      fillField('Alignment', character.alignment || '');
      fillField('XP', character.experiencePoints || 0);
      
      // Physical characteristics
      fillField('Age', character.age || '');
      fillField('Height', character.height || '');
      fillField('Weight', character.weight || '');
      fillField('Eyes', character.eyes || '');
      fillField('Skin', character.skin || '');
      fillField('Hair', character.hair || '');

      // Ability scores
      fillField('STR', character.strength);
      fillField('DEX', character.dexterity);
      fillField('CON', character.constitution);
      fillField('INT', character.intelligence);
      fillField('WIS', character.wisdom);
      fillField('CHA', character.charisma);

      // Ability modifiers (note the exact field names from PDF)
      fillField('STRmod', getModifier(character.strength));
      fillField('DEXmod ', getModifier(character.dexterity)); // Note the space
      fillField('CONmod', getModifier(character.constitution));
      fillField('INTmod', getModifier(character.intelligence));
      fillField('WISmod', getModifier(character.wisdom));
      fillField('CHamod', getModifier(character.charisma)); // Note: CHamod not CHAmod

      // Combat stats
      fillField('AC', character.armorClass);
      fillField('Initiative', getModifier(character.dexterity));
      fillField('Speed', character.speed);
      fillField('HPMax', character.maxHitPoints);
      fillField('HPCurrent', character.hitPoints);
      fillField('HPTemp', character.temporaryHitPoints || '');
      fillField('ProfBonus', getProficiencyBonus(character.level));
      fillField('Inspiration', character.inspiration ? '✓' : '');
      
      // Hit Dice
      fillField('HDTotal', `${character.level}d${getHitDie(character.class)}`);
      fillField('HD', character.level); // Current hit dice available

      // Saving throws
      const profBonus = getProficiencyBonus(character.level);
      fillField('ST Strength', getModifier(character.strength) + (character.savingThrows?.includes('Strength') ? profBonus : 0));
      fillField('ST Dexterity', getModifier(character.dexterity) + (character.savingThrows?.includes('Dexterity') ? profBonus : 0));
      fillField('ST Constitution', getModifier(character.constitution) + (character.savingThrows?.includes('Constitution') ? profBonus : 0));
      fillField('ST Intelligence', getModifier(character.intelligence) + (character.savingThrows?.includes('Intelligence') ? profBonus : 0));
      fillField('ST Wisdom', getModifier(character.wisdom) + (character.savingThrows?.includes('Wisdom') ? profBonus : 0));
      fillField('ST Charisma', getModifier(character.charisma) + (character.savingThrows?.includes('Charisma') ? profBonus : 0));

      // Fill saving throw proficiency checkboxes
      const savingThrows = character.savingThrows || [];
      fillCheckBox('Check Box 12', savingThrows.includes('Strength'));
      fillCheckBox('Check Box 13', savingThrows.includes('Dexterity'));
      fillCheckBox('Check Box 14', savingThrows.includes('Constitution'));
      fillCheckBox('Check Box 15', savingThrows.includes('Intelligence'));
      fillCheckBox('Check Box 16', savingThrows.includes('Wisdom'));
      fillCheckBox('Check Box 17', savingThrows.includes('Charisma'));

      // Skills (using exact field names from PDF)
      const skills = character.skills || [];
      fillField('Acrobatics', getModifier(character.dexterity) + (skills.includes('Acrobatics') ? profBonus : 0));
      fillField('Animal', getModifier(character.wisdom) + (skills.includes('Animal Handling') ? profBonus : 0));
      fillField('Athletics', getModifier(character.strength) + (skills.includes('Athletics') ? profBonus : 0));
      fillField('Deception ', getModifier(character.charisma) + (skills.includes('Deception') ? profBonus : 0)); // Note space
      fillField('History ', getModifier(character.intelligence) + (skills.includes('History') ? profBonus : 0)); // Note space
      fillField('Insight', getModifier(character.wisdom) + (skills.includes('Insight') ? profBonus : 0));
      fillField('Intimidation', getModifier(character.charisma) + (skills.includes('Intimidation') ? profBonus : 0));
      fillField('Investigation ', getModifier(character.intelligence) + (skills.includes('Investigation') ? profBonus : 0)); // Note space
      fillField('Arcana', getModifier(character.intelligence) + (skills.includes('Arcana') ? profBonus : 0));
      fillField('Perception ', getModifier(character.wisdom) + (skills.includes('Perception') ? profBonus : 0)); // Note space
      fillField('Nature', getModifier(character.intelligence) + (skills.includes('Nature') ? profBonus : 0));
      fillField('Performance', getModifier(character.charisma) + (skills.includes('Performance') ? profBonus : 0));
      fillField('Medicine', getModifier(character.wisdom) + (skills.includes('Medicine') ? profBonus : 0));
      fillField('Religion', getModifier(character.intelligence) + (skills.includes('Religion') ? profBonus : 0));
      fillField('Stealth ', getModifier(character.dexterity) + (skills.includes('Stealth') ? profBonus : 0)); // Note space
      fillField('Persuasion', getModifier(character.charisma) + (skills.includes('Persuasion') ? profBonus : 0));
      fillField('SleightofHand', getModifier(character.dexterity) + (skills.includes('Sleight of Hand') ? profBonus : 0));
      fillField('Survival', getModifier(character.wisdom) + (skills.includes('Survival') ? profBonus : 0));

      // Fill skill proficiency checkboxes (based on PDF field analysis)
      fillCheckBox('Check Box 11', skills.includes('Acrobatics'));
      fillCheckBox('Check Box 18', skills.includes('Animal Handling'));
      fillCheckBox('Check Box 19', skills.includes('Arcana'));
      fillCheckBox('Check Box 20', skills.includes('Athletics'));
      fillCheckBox('Check Box 21', skills.includes('Deception'));
      fillCheckBox('Check Box 22', skills.includes('History'));
      fillCheckBox('Check Box 23', skills.includes('Insight'));
      fillCheckBox('Check Box 24', skills.includes('Intimidation'));
      fillCheckBox('Check Box 25', skills.includes('Investigation'));
      fillCheckBox('Check Box 26', skills.includes('Medicine'));
      fillCheckBox('Check Box 27', skills.includes('Nature'));
      fillCheckBox('Check Box 28', skills.includes('Perception'));
      fillCheckBox('Check Box 29', skills.includes('Performance'));
      fillCheckBox('Check Box 30', skills.includes('Persuasion'));
      fillCheckBox('Check Box 31', skills.includes('Religion'));
      fillCheckBox('Check Box 32', skills.includes('Sleight of Hand'));
      fillCheckBox('Check Box 33', skills.includes('Stealth'));
      fillCheckBox('Check Box 34', skills.includes('Survival'));

      // Passive Perception
      fillField('Passive', 10 + getModifier(character.wisdom) + (skills.includes('Perception') ? profBonus : 0));

      // Weapons (using exact field names)
      if (character.weapons && character.weapons.length > 0) {
        const weapon1 = character.weapons[0];
        fillField('Wpn Name', weapon1.name);
        fillField('Wpn1 AtkBonus', `+${profBonus + getModifier(character.strength)}`);
        fillField('Wpn1 Damage', `${weapon1.damage || '1d8'} + ${getModifier(character.strength)}`);
      }

      if (character.weapons && character.weapons.length > 1) {
        const weapon2 = character.weapons[1];
        fillField('Wpn Name 2', weapon2.name);
        fillField('Wpn2 AtkBonus ', `+${profBonus + getModifier(character.strength)}`); // Note space
        fillField('Wpn2 Damage ', `${weapon2.damage || '1d8'} + ${getModifier(character.strength)}`); // Note space
      }

      if (character.weapons && character.weapons.length > 2) {
        const weapon3 = character.weapons[2];
        fillField('Wpn Name 3', weapon3.name);
        fillField('Wpn3 AtkBonus  ', `+${profBonus + getModifier(character.strength)}`); // Note spaces
        fillField('Wpn3 Damage ', `${weapon3.damage || '1d8'} + ${getModifier(character.strength)}`); // Note space
      }

      // Equipment
      const equipmentList = [
        ...(character.inventoryWeapons || []).map(w => w.name),
        ...(character.inventoryArmor || []).map(a => a.name),
        ...(character.inventoryItems || []).map(i => i.name)
      ].join(', ');
      fillField('Equipment', equipmentList, 8); // Smaller font for equipment list

      // Money
      fillField('CP', character.copper || 0);
      fillField('SP', character.silver || 0);
      fillField('EP', character.electrum || 0);
      fillField('GP', character.gold || 0);
      fillField('PP', character.platinum || 0);

      // Character traits (using exact field names)
      const personalityTraits = Array.isArray(character.personalityTraits) 
        ? character.personalityTraits.join(', ') 
        : character.personalityTraits || '';
      const ideals = Array.isArray(character.ideals) 
        ? character.ideals.join(', ') 
        : character.ideals || '';
      const bonds = Array.isArray(character.bonds) 
        ? character.bonds.join(', ') 
        : character.bonds || '';
      const flaws = Array.isArray(character.flaws) 
        ? character.flaws.join(', ') 
        : character.flaws || '';
        
      fillField('PersonalityTraits ', personalityTraits, 8); // Smaller font for traits
      fillField('Ideals', ideals, 8);
      fillField('Bonds', bonds, 8);
      fillField('Flaws', flaws, 8);

      // Features and traits
      fillField('Features and Traits', character.features?.join(', ') || '', 8); // Smaller font
      fillField('Feat+Traits', character.features?.join(', ') || '', 8); // Alternative field name

      // Proficiencies and languages
      const proficiencies = [
        ...(character.languages || []),
        ...(character.proficiencies || [])
      ].join(', ');
      fillField('ProficienciesLang', proficiencies, 8); // Smaller font
      
      // Additional character information
      fillField('Allies', character.allies || '', 8);
      fillField('FactionName', character.faction || '', 8);
      fillField('Backstory', character.backstory || '', 8);
      fillField('Treasure', character.treasures?.map(t => t.name).join(', ') || '', 8);

      // Spellcasting information (if character has spells)
      if (character.spellsKnown && character.spellsKnown.length > 0) {
        fillField('Spellcasting Class 2', character.class);
        
        // Determine spellcasting ability based on class
        const spellcastingAbility = getSpellcastingAbility(character.class);
        fillField('SpellcastingAbility 2', spellcastingAbility || '');
        
        if (spellcastingAbility) {
          const abilityMod = getAbilityModifier(character, spellcastingAbility);
          fillField('SpellSaveDC  2', 8 + profBonus + abilityMod); // Note the spaces in field name
          fillField('SpellAtkBonus 2', `+${profBonus + abilityMod}`);
        }
        
        // Fill some spell names (limited by PDF fields available)
        const spellNames = character.spellsKnown.map(spell => spell.name);
        for (let i = 0; i < Math.min(spellNames.length, 20); i++) {
          const spellFieldNumber = 1014 + i;
          fillField(`Spells ${spellFieldNumber}`, spellNames[i], 8);
        }
      }

      // Attacks and spellcasting
      const attacksText = character.weapons?.map(w => 
        `${w.name}: +${profBonus + getModifier(character.strength)} to hit, ${w.damage || '1d8'} + ${getModifier(character.strength)} damage`
      ).join('\n') || '';
      
      // Add spells to attacks section if character has them
      const spellsText = character.spellsKnown?.map(spell => 
        `${spell.name} (Level ${spell.level}): ${spell.description.substring(0, 100)}...`
      ).join('\n') || '';
      
      const combinedText = [attacksText, spellsText].filter(Boolean).join('\n\n');
      fillField('AttacksSpellcasting', combinedText, 8); // Smaller font for attacks

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${character.name.replace(/\s+/g, '_')}_Character_Sheet.pdf`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please ensure the D&D 5e Character Sheet PDF is available.');
    }
  };

  return (
    <button
      onClick={exportToPDF}
      className={`flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm ${className}`}
      title="Export to PDF"
    >
      <Download className="h-4 w-4" />
      <span className="hidden lg:inline">Export PDF</span>
    </button>
  );
} 