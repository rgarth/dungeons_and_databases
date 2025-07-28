"use client";

import { Heart, Shield, Trash2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { CharacterSheet } from "./character-sheet";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { useAvatar } from '@/hooks/use-character-mutations';
import { toast } from 'react-hot-toast';
import { Character } from '@/types/character';
import { ClassLevel } from '@/lib/dnd/progression';
import Image from 'next/image';
import { Card, Button } from "./ui";
import { clientCache } from '@/lib/client-cache';

interface CharacterCardProps {
  character: Character;
  onCharacterDeleted?: () => void;
  onCharacterUpdated?: () => void;
}

// Helper function to format multiclass information
function formatClassInfo(character: Character): { classText: string; levelText: string } {
  // Check if character has multiclass data
  let classes: ClassLevel[] = [];
  
  if (character.classes) {
    if (Array.isArray(character.classes)) {
      classes = character.classes;
    } else if (typeof character.classes === 'string') {
      try {
        classes = JSON.parse(character.classes);
      } catch (e) {
        console.warn('Failed to parse classes JSON:', e);
      }
    }
  }
  
  if (classes.length > 0) {
    // Multiclass character - show individual class levels
    const classText = classes
      .map(cls => `${cls.class} ${cls.level}`)
      .join(', ');
    
    const totalLevel = character.totalLevel || classes.reduce((sum, cls) => sum + cls.level, 0);
    const levelText = `Level ${totalLevel}`;
    
    return { classText, levelText };
  } else {
    // Single class character (legacy format)
    return {
      classText: character.class,
      levelText: `Level ${character.level}`
    };
  }
}

export function CharacterCard({ character, onCharacterDeleted, onCharacterUpdated }: CharacterCardProps) {
  const [showSheet, setShowSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // Use React Query for avatar fetching
  const { data: avatarUrl, isLoading: isAvatarLoading } = useAvatar(character.id);
  const isOptimistic = character.isOptimistic;
  const hpPercentage = (character.hitPoints / character.maxHitPoints) * 100;

  // Format class information
  const { classText, levelText } = formatClassInfo(character);


  // Clean up sheet state when character changes
  useEffect(() => {
    setShowSheet(false);
  }, [character.id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/characters?id=${character.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove character from client cache
        clientCache.removeCharacter(character.id);
        toast.success('Character deleted successfully');
        onCharacterDeleted?.();
      } else {
        throw new Error('Failed to delete character');
      }
    } catch (error) {
      console.error('Error deleting character:', error);
      toast.error('Failed to delete character');
    }
  };

  const handleDeleteClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation(); // Prevent opening character sheet
    setShowDeleteDialog(true);
  };

  const handleCloseSheet = () => {
    setShowSheet(false);
    // Force a re-render of the character card
    onCharacterUpdated?.();
  };
  
  return (
    <>
      <div>
        <Card 
          className="p-6 hover:border-accent transition-colors cursor-pointer"
          onClick={() => setShowSheet(true)}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              {/* Avatar */}
              {isAvatarLoading ? (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-muted to-background animate-pulse flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-border animate-pulse" />
                </div>
              ) : avatarUrl ? (
                <div className="w-24 h-24 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image 
                    src={avatarUrl} 
                    alt={`${character.name}'s avatar`}
                    width={96}
                    height={96}
                    className="absolute inset-0 w-full h-full object-cover object-top scale-150 translate-y-1/4"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-accent-text text-2xl font-bold flex-shrink-0">
                  {character.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-bold text-foreground break-words">{character.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {character.subrace || character.race} {classText}
                </p>
                <div className="bg-accent text-accent-text text-sm font-semibold px-2 py-0.5 rounded mt-2 inline-block">
                  {levelText}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <Button
                variant="ghost"
                onClick={handleDeleteClick}
                className="text-error hover:text-error-hover p-2"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {/* Hit Points */}
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-error" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Hit Points</span>
                  <span className="text-foreground font-medium">
                    {character.hitPoints}/{character.maxHitPoints}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-error h-2 rounded-full"
                    style={{ width: `${hpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Armor Class */}
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">Armor Class</span>
              <span className="text-foreground font-medium ml-auto">{character.armorClass}</span>
            </div>
          </div>
        </Card>

        {/* Syncing indicator - positioned at the bottom on its own line */}
        {isOptimistic && (
          <div className="flex items-center justify-center gap-2 text-warning text-sm mt-2 p-2 bg-warning-bg rounded-lg border border-warning-border">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Syncing with database...</span>
          </div>
        )}
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