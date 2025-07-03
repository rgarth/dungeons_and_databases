"use client";

import { Heart, Shield, Trash2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { CharacterSheet } from "./character-sheet";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { useCharacterMutations, useAvatar } from '@/hooks/use-character-mutations';
import { toast } from 'react-hot-toast';
import { Character } from '@/types/character';
import Image from 'next/image';
import { Card, Button } from "./ui";

interface CharacterCardProps {
  character: Character;
  onCharacterDeleted?: () => void;
  onCharacterUpdated?: () => void;
}

export function CharacterCard({ character, onCharacterDeleted, onCharacterUpdated }: CharacterCardProps) {
  const [showSheet, setShowSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // Use React Query for avatar fetching
  const { data: avatarUrl, isLoading: isAvatarLoading } = useAvatar(character.id);
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
      <Card 
        className="p-6 hover:border-[var(--color-accent)] transition-colors cursor-pointer"
        onClick={() => setShowSheet(true)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            {isAvatarLoading ? (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-card-secondary)] to-[var(--color-card)] animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[var(--color-border)] animate-pulse" />
              </div>
            ) : avatarUrl ? (
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <Image 
                  src={avatarUrl} 
                  alt={`${character.name}'s avatar`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover object-top scale-150 translate-y-1/4"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] flex items-center justify-center text-[var(--color-accent-text)] text-2xl font-bold">
                {character.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{character.name}</h3>
              <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                {character.subrace || character.race} {character.class}
              </p>
              <div className="bg-[var(--color-accent)] text-[var(--color-accent-text)] text-sm font-semibold px-2 py-0.5 rounded mt-2 inline-block">
                Level {character.level}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOptimistic && (
              <div className="flex items-center gap-2 text-[var(--color-warning)] text-sm">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Syncing...</span>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={handleDeleteClick}
              className="text-[var(--color-danger)] hover:text-[var(--color-danger)]/80 p-2"
              title="Delete Character"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {/* Hit Points */}
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-[var(--color-danger)]" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--color-text-secondary)]">Hit Points</span>
                <span className="text-[var(--color-text-primary)] font-medium">
                  {character.hitPoints}/{character.maxHitPoints}
                </span>
              </div>
              <div className="w-full bg-[var(--color-card-secondary)] rounded-full h-2">
                <div
                  className="bg-[var(--color-danger)] h-2 rounded-full"
                  style={{ width: `${hpPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Armor Class */}
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-[var(--color-text-secondary)]">Armor Class</span>
            <span className="text-[var(--color-text-primary)] font-medium ml-auto">{character.armorClass}</span>
          </div>
        </div>
      </Card>

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