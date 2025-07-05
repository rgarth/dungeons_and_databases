'use client';

import { useState } from 'react';

export default function TestApiPage() {
  const [results, setResults] = useState<{
    traits: Array<{ name: string; description: string; type: string }>;
    raceTraits: Array<{ name: string; description: string; type: string }>;
    subraceTraits: Array<{ name: string; description: string; type: string }>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('Testing API...');
      
      // Test 1: Basic traits API
      console.log('Testing /api/traits...');
      const traitsResponse = await fetch('/api/traits');
      console.log('Traits response status:', traitsResponse.status);
      
      if (!traitsResponse.ok) {
        throw new Error(`Traits API failed: ${traitsResponse.status} ${traitsResponse.statusText}`);
      }
      
      const traits = await traitsResponse.json();
      console.log('Traits data:', traits.slice(0, 3));
      
      // Test 2: Race-specific traits
      console.log('Testing /api/traits?race=Elf...');
      const raceTraitsResponse = await fetch('/api/traits?race=Elf');
      console.log('Race traits response status:', raceTraitsResponse.status);
      
      if (!raceTraitsResponse.ok) {
        throw new Error(`Race traits API failed: ${raceTraitsResponse.status} ${raceTraitsResponse.statusText}`);
      }
      
      const raceTraits = await raceTraitsResponse.json();
      console.log('Race traits data:', raceTraits);
      
      // Test 3: Subrace traits
      console.log('Testing /api/traits?subrace=High%20Elf...');
      const subraceTraitsResponse = await fetch('/api/traits?subrace=High%20Elf');
      console.log('Subrace traits response status:', subraceTraitsResponse.status);
      
      if (!subraceTraitsResponse.ok) {
        throw new Error(`Subrace traits API failed: ${subraceTraitsResponse.status} ${subraceTraitsResponse.statusText}`);
      }
      
      const subraceTraits = await subraceTraitsResponse.json();
      console.log('Subrace traits data:', subraceTraits);
      
      setResults({
        traits: traits.slice(0, 3),
        raceTraits,
        subraceTraits
      });
      
    } catch (err) {
      console.error('API test failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <button 
        onClick={testApi}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {results && (
        <div className="mt-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">All Traits (first 3):</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(results.traits, null, 2)}
            </pre>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">Elf Race Traits:</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(results.raceTraits, null, 2)}
            </pre>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold">High Elf Subrace Traits:</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(results.subraceTraits, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 