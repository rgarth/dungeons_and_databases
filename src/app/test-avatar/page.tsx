'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

// Available options
const RACES = [
  'Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome',
  'Half-Elf', 'Half-Orc', 'Tiefling', 'Goliath', 'Aasimar', 'Tabaxi'
] as const;

const CLASSES = [
  'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk',
  'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
] as const;

const GENDERS = ['Male', 'Female', 'Non-binary', 'Other'] as const;

export default function TestAvatarPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [race, setRace] = useState<typeof RACES[number]>('Halfling');
  const [characterClass, setCharacterClass] = useState<typeof CLASSES[number]>('Druid');
  const [gender, setGender] = useState<typeof GENDERS[number]>('Male');

  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return <div>This page is only available in development mode.</div>;
  }

  // Handle loading state
  if (status === 'loading') {
    return <div className="min-h-screen bg-slate-900 text-white p-8">Loading...</div>;
  }

  // Handle unauthenticated state
  if (status === 'unauthenticated' || !session) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Authentication Required</h1>
          <p>Please log in to use this page.</p>
        </div>
      </div>
    );
  }

  const testAvatar = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/test-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          race,
          class: characterClass,
          gender,
          alignment: 'Neutral Good',
          background: 'Sage',
          personalityTraits: ['I use polysyllabic words'],
          ideals: ['Knowledge'],
          bonds: ['My life\'s work'],
          flaws: ['I am easily distracted'],
          appearance: 'A small, wiry halfling with wild hair'
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }

      const data = await response.json();
      console.log('Avatar generation response:', data);
      
      if (!data.fullBodyImage) {
        throw new Error('No image URL in response');
      }

      setResult(data.fullBodyImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Avatar generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Avatar Generation Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Race
            </label>
            <select
              value={race}
              onChange={(e) => setRace(e.target.value as typeof RACES[number])}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              {RACES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Class
            </label>
            <select
              value={characterClass}
              onChange={(e) => setCharacterClass(e.target.value as typeof CLASSES[number])}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              {CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as typeof GENDERS[number])}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={testAvatar}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Test Avatar'}
          </button>
        </div>

        {error && (
          <div className="bg-red-900 text-white p-4 rounded mb-4">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Result:</h2>
            <img 
              src={result} 
              alt="Generated avatar" 
              className="max-w-md rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="mt-8 p-4 bg-slate-800 rounded">
          <h2 className="text-xl font-bold mb-4">Test Data:</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify({
              race,
              class: characterClass,
              gender,
              alignment: 'Neutral Good',
              background: 'Sage',
              personalityTraits: ['I use polysyllabic words'],
              ideals: ['Knowledge'],
              bonds: ['My life\'s work'],
              flaws: ['I am easily distracted'],
              appearance: 'A small, wiry halfling with wild hair'
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 