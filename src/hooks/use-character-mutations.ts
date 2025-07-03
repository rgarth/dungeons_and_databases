import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Character } from '@/types/character';
import { useSession } from 'next-auth/react';
import { CharacterCreationData } from '@/types/character-creation';
import { toast } from 'react-hot-toast';

// Custom hook for fetching avatar data
export function useAvatar(characterId: string) {
  return useQuery({
    queryKey: ['avatar', characterId],
    queryFn: async () => {
      const response = await fetch(`/api/characters/${characterId}/avatar`);
      if (response.status === 404) {
        // Character has no avatar - this is expected
        return null;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch avatar');
      }
      const data = await response.json();
      return data.imageData;
    },
    enabled: !!characterId,
    staleTime: 30 * 60 * 1000, // 30 minutes - avatars don't change often
    gcTime: 60 * 60 * 1000, // 1 hour - keep in memory longer
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if we have cached data
  });
}

// Hook to preload avatars for multiple characters
export function usePreloadAvatars(characterIds: string[]) {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['preload-avatars', characterIds.sort().join(',')],
    queryFn: async () => {
      // Preload all avatars in parallel
      const promises = characterIds.map(async (id) => {
        try {
          const response = await fetch(`/api/characters/${id}/avatar`);
          if (response.status === 404) return null;
          if (!response.ok) return null;
          const data = await response.json();
          return { id, avatar: data.imageData };
        } catch (error) {
          console.error(`Failed to preload avatar for character ${id}:`, error);
          return null;
        }
      });
      
      const results = await Promise.all(promises);
      
      // Cache each avatar individually
      results.forEach(result => {
        if (result) {
          queryClient.setQueryData(['avatar', result.id], result.avatar);
        }
      });
      
      return results.filter(Boolean);
    },
    enabled: characterIds.length > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

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
        // Ensure subclass and subrace are undefined, not null
        subclass: newCharacter.subclass || undefined,
        subrace: newCharacter.subrace || undefined
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
    onSuccess: (updatedCharacter, { id }) => {
      // Update the cache with the server response to ensure consistency
      queryClient.setQueryData(['characters'], (old: Character[] = []) =>
        old.map((char) => (char.id === id ? updatedCharacter : char))
      );
    },
    onError: (err, variables, context) => {
      if (context?.previousCharacters) {
        queryClient.setQueryData(['characters'], context.previousCharacters);
      }
    },
    onSettled: () => {
      // Invalidate queries to ensure fresh data is fetched when needed
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

  // Avatar update mutation - invalidates avatar cache
  const updateAvatar = useMutation({
    mutationFn: async ({ characterId, imageData }: { characterId: string; imageData: string }) => {
      const response = await fetch(`/api/characters/${characterId}/avatar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData }),
      });
      if (!response.ok) {
        throw new Error('Failed to save avatar');
      }
      return response.json();
    },
    onSuccess: (data, { characterId }) => {
      // Invalidate the specific avatar cache for this character
      queryClient.invalidateQueries({ queryKey: ['avatar', characterId] });
      
      // Also invalidate characters cache to update any avatar-related fields
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
    onError: (error) => {
      console.error('Avatar update failed:', error);
    },
  });

  // Delete avatar mutation
  const deleteAvatar = useMutation({
    mutationFn: async (characterId: string) => {
      const response = await fetch(`/api/characters/${characterId}/avatar`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete avatar');
      }
      return response.json();
    },
    onSuccess: (data, characterId) => {
      // Invalidate the specific avatar cache for this character
      queryClient.invalidateQueries({ queryKey: ['avatar', characterId] });
      
      // Also invalidate characters cache to update any avatar-related fields
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
    onError: (error) => {
      console.error('Avatar deletion failed:', error);
    },
  });

  return {
    createCharacter,
    updateCharacter,
    deleteCharacter,
    updateAvatar,
    deleteAvatar,
  };
} 