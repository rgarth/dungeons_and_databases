import { Character } from '@/types/character';

interface CharacterListProps {
  characters: Character[];
}

export function CharacterList({ characters }: CharacterListProps) {
  console.log('CharacterList received characters:', characters);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((character) => (
        <div
          key={character.id}
          className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${
            character.isOptimistic ? 'opacity-75' : ''
          }`}
        >
          {character.isOptimistic && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Syncing with database...</p>
              </div>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {character.name}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Level {character.level}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                {character.subrace || character.race} {character.class}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {character.background}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 