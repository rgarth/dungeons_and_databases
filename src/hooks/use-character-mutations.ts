import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Character } from '@/types/character';
import { useSession } from 'next-auth/react';
import { CharacterCreationData } from '@/types/character-creation';
import { toast } from 'react-hot-toast';

export function useCharacterMutations() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // Create character mutation with optimistic update
  const createCharacter = useMutation({
    mutationFn: async (data: CharacterCreationData) => {
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create character');
      }

      return response.json();
    },
    onMutate: async (newCharacter) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['characters'] });

      // Snapshot the previous value
      const previousCharacters = queryClient.getQueryData<Character[]>(['characters']);

      // Show toast for optimistic update
      toast.loading('Creating character...', { id: 'create-character' });

      // Create optimistic character with all required fields
      const optimisticCharacter: Character = {
        ...newCharacter,
        id: 'temp-' + Date.now(), // Temporary ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: session?.user?.email || '', // Use email as userId
        isOptimistic: true, // Flag to indicate this is an optimistic update
        // Add required fields with default values
        strength: newCharacter.abilityScores?.strength || 10,
        dexterity: newCharacter.abilityScores?.dexterity || 10,
        constitution: newCharacter.abilityScores?.constitution || 10,
        intelligence: newCharacter.abilityScores?.intelligence || 10,
        wisdom: newCharacter.abilityScores?.wisdom || 10,
        charisma: newCharacter.abilityScores?.charisma || 10,
        speed: 30,
        proficiencyBonus: 2,
        skills: [],
        inventory: [],
        weapons: [],
        armor: [],
        spellsKnown: [],
        spellsPrepared: [],
        spellSlots: {},
        spellcastingAbility: '',
        spellSaveDC: 0,
        spellAttackBonus: 0,
        actions: [],
        bonusActions: [],
        reactions: [],
        appearance: '',
        personality: '',
        backstory: '',
        avatar: '',
        fullBodyAvatar: '',
        backgroundCharacteristics: {
          personalityTraits: [],
          ideals: [],
          bonds: [],
          flaws: []
        },
        // Ensure subclass is undefined, not null
        subclass: newCharacter.subclass || undefined
      };

      // Optimistically update to the new value
      queryClient.setQueryData<Character[]>(['characters'], (old = []) => [
        ...old,
        optimisticCharacter,
      ]);

      // Return a context object with the snapshotted value
      return { previousCharacters, optimisticCharacter };
    },
    onSuccess: () => {
      // Show success toast
      toast.success('Character created successfully!', { id: 'create-character' });
      
      // Immediately invalidate the cache to get fresh data
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
    onError: (err, newCharacter, context) => {
      // Show error toast
      toast.error('Failed to create character', { id: 'create-character' });
      
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCharacters) {
        queryClient.setQueryData(['characters'], context.previousCharacters);
      }
    },
    onSettled: () => {
      // Immediately invalidate to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });

  // Update character mutation with optimistic update
  const updateCharacter = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Character> }) => {
      const response = await fetch(`/api/characters?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update character');
      }
      return response.json();
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['characters'] });
      const previousCharacters = queryClient.getQueryData(['characters']);

      queryClient.setQueryData(['characters'], (old: Character[] = []) =>
        old.map((char) => (char.id === id ? { ...char, ...data } : char))
      );

      return { previousCharacters };
    },
    onError: (err, variables, context) => {
      if (context?.previousCharacters) {
        queryClient.setQueryData(['characters'], context.previousCharacters);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });

  // Delete character mutation with optimistic update
  const deleteCharacter = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/characters?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete character');
      }
      return response.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['characters'] });
      const previousCharacters = queryClient.getQueryData(['characters']);

      queryClient.setQueryData(['characters'], (old: Character[] = []) =>
        old.filter((char) => char.id !== id)
      );

      return { previousCharacters };
    },
    onError: (err, id, context) => {
      if (context?.previousCharacters) {
        queryClient.setQueryData(['characters'], context.previousCharacters);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });

  return {
    createCharacter,
    updateCharacter,
    deleteCharacter,
  };
} 