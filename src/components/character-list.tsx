import { Character } from '@/types/character';

interface CharacterListProps {
  characters: Character[];
}

export function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((character) => (
        <div
          key={character.id}
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {character.name}
              </h3>
              <span className="text-sm text-[var(--color-text-tertiary)]">
                Level {character.level}
              </span>
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
      ))}
    </div>
  );
} 