"use client";

import { Heart, Shield, Trash2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { CharacterSheet } from "./character-sheet";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { Weapon, MagicalWeapon, Armor, InventoryItem } from "@/lib/dnd/equipment";
import { Spell } from "@/lib/dnd/spells";
import { Action } from "@/lib/dnd/combat";
import { Treasure } from "@/lib/dnd/data";
import { useCharacterMutations } from '@/hooks/use-character-mutations';
import { toast } from 'react-hot-toast';

interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  subclass?: string;
  level: number;
  hitPoints: number;
  maxHitPoints: number;
  armorClass: number;
  background?: string;
  alignment?: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  speed: number;
  proficiencyBonus: number;
  skills?: string[];
  inventory?: InventoryItem[] | string[];
  equipment?: string[];
  weapons?: (Weapon | MagicalWeapon)[];
  inventoryWeapons?: (Weapon | MagicalWeapon)[];
  armor?: Armor[];
  inventoryArmor?: Armor[];
  spellsKnown?: Spell[]; // All spells known or in spellbook
  spellsPrepared?: Spell[]; // Currently prepared/equipped spells
  spellSlots?: Record<number, number>;
  spellcastingAbility?: string;
  spellSaveDC?: number;
  spellAttackBonus?: number;
  actions?: Action[];
  bonusActions?: Action[];
  reactions?: Action[];
  copperPieces?: number;
  silverPieces?: number;
  goldPieces?: number;
  treasures?: Treasure[];
  appearance?: string;
  personality?: string;
  backstory?: string;
  notes?: string;
  avatar?: string;
  equippedWeapons?: (Weapon | MagicalWeapon)[];
  isOptimistic?: boolean;
  userId: string;
}

interface CharacterCardProps {
  character: Character;
  onCharacterDeleted?: () => void;
  onCharacterUpdated?: () => void;
}

export function CharacterCard({ character, onCharacterDeleted, onCharacterUpdated }: CharacterCardProps) {
  const [showSheet, setShowSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteCharacter } = useCharacterMutations();
  const isOptimistic = character.isOptimistic;
  const hpPercentage = (character.hitPoints / character.maxHitPoints) * 100;

  // Clean up sheet state when character changes
  useEffect(() => {
    setShowSheet(false);
  }, [character.id]);

  const handleDelete = async () => {
    try {
      await deleteCharacter.mutateAsync(character.id);
      toast.success('Character deleted successfully');
      onCharacterDeleted?.();
    } catch (error) {
      console.error('Error deleting character:', error);
      toast.error('Failed to delete character');
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening character sheet
    setShowDeleteDialog(true);
  };

  const handleCloseSheet = () => {
    setShowSheet(false);
    // Force a re-render of the character card
    onCharacterUpdated?.();
  };
  
  return (
    <>
      <div 
        className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition-colors cursor-pointer"
        onClick={() => setShowSheet(true)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            {character.avatar && (
              <img
                src={character.avatar}
                alt={`${character.name} avatar`}
                className="w-16 h-16 rounded-lg border border-slate-600 object-cover"
                onError={(e) => {
                  // Hide broken images
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
              <p className="text-slate-400">
                {character.race} {character.class}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 text-white text-sm font-semibold px-2 py-1 rounded">
              Lv. {character.level}
            </div>
            {isOptimistic && (
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Syncing...</span>
              </div>
            )}
            <button
              onClick={handleDeleteClick}
              className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
              title="Delete Character"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Hit Points */}
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-400" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Hit Points</span>
                <span className="text-white font-medium">
                  {character.hitPoints}/{character.maxHitPoints}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${hpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Armor Class */}
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="text-slate-300">Armor Class</span>
            <span className="text-white font-medium ml-auto">{character.armorClass}</span>
          </div>
        </div>
      </div>

      {showSheet && (
        <CharacterSheet
          character={character}
          onClose={handleCloseSheet}
          onCharacterDeleted={() => {
            setShowSheet(false);
            onCharacterDeleted?.();
          }}
          onCharacterUpdated={onCharacterUpdated}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        characterName={character.name}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
} 