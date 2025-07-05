// Add this interface at the top of the file
interface Character {
  racialTraits: { name: string; description: string }[];
}

// Update the component props to include the character prop
interface StatsTabProps {
  character: Character;
}

// Use the character prop in the component
export default function StatsTab({ character }: StatsTabProps) {
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Racial Features</h3>
    <div className="space-y-2">
      {character.racialTraits.map((trait: { name: string; description: string }, index: number) => (
        <div key={index} className="flex items-center">
          <span className="mr-2">{trait.name}</span>
          <button
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            onClick={() => alert(trait.description)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
} 