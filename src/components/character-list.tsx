import { Character } from '@/types/character';
import { useAvatar } from '@/hooks/use-character-mutations';
import Image from 'next/image';

interface CharacterListProps {
  characters: Character[];
}

interface CharacterItemProps {
  character: Character;
}

function CharacterItem({ character }: CharacterItemProps) {
  const { data: avatarUrl, isLoading: isAvatarLoading } = useAvatar(character.id);
  
  return (
    <div
      className={`relative bg-[var(--color-card)] rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
        character.isOptimistic ? 'opacity-75' : ''
      }`}
    >
      {character.isOptimistic && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-overlay)' }}>
          <div className="text-[var(--color-text-primary)] text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: 'var(--color-accent)' }}></div>
            <p>Syncing with database...</p>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar */}
          {isAvatarLoading ? (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted to-background animate-pulse flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-border animate-pulse" />
            </div>
          ) : avatarUrl ? (
            <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0">
              <Image 
                src={avatarUrl} 
                alt={`${character.name}'s avatar`}
                width={64}
                height={64}
                className="absolute inset-0 w-full h-full object-cover object-top scale-150 translate-y-1/4"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-accent-text text-lg font-bold flex-shrink-0">
              {character.name.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
              {character.name}
            </h3>
            <span className="text-sm text-[var(--color-text-tertiary)]">
              Level {character.level}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[var(--color-text-secondary)]">
            {character.subrace || character.race} {character.class}
          </p>
          <p className="text-[var(--color-text-secondary)]">
            {character.background}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </div>
  );
} 