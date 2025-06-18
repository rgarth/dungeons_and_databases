"use client";

import { Heart, Shield, Trash2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { CharacterSheet } from "./character-sheet";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { useCharacterMutations } from '@/hooks/use-character-mutations';
import { toast } from 'react-hot-toast';
import { Character } from '@/types/character';
import Image from 'next/image';

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
            <Image 
              src={character.avatar || '/default-avatar.png'} 
              alt={`${character.name}'s avatar`}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            
            <div>
              <h3 className="text-xl font-bold text-white">{character.name}</h3>
              <p className="text-slate-400 text-sm mt-1">
                {character.race} {character.class}
              </p>
              <div className="bg-purple-600 text-white text-sm font-semibold px-2 py-0.5 rounded mt-2 inline-block">
                Level {character.level}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
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