'use client';

import { useState } from 'react';
import GameChat from '@/components/party/GameChat';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function TestPusherChatPage() {
  const [gameId, setGameId] = useState('test-game-123');

  const generateNewGameId = () => {
    setGameId(`test-game-${Date.now()}`);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Pusher Chat Test</h1>
        <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          This page tests the new Pusher-based chat system that works reliably in serverless environments.
        </p>
        
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                Game ID
              </label>
              <input
                type="text"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: 'var(--color-input-bg)',
                  color: 'var(--color-text-primary)',
                  borderColor: 'var(--color-border)'
                }}
                placeholder="Enter game ID"
              />
            </div>
            <Button onClick={generateNewGameId} variant="secondary">
              Generate New Game ID
            </Button>
          </div>
          <p className="text-sm mt-2" style={{ color: 'var(--color-text-secondary)' }}>
            Use the same Game ID in multiple browser tabs to test the chat functionality.
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Chat Component</h2>
          <div className="h-96">
            <GameChat gameId={gameId} />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Instructions</h2>
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Setup Pusher</h3>
                <ol className="list-decimal list-inside text-sm space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <li>Sign up at <a href="https://pusher.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">pusher.com</a></li>
                  <li>Create a new Channels app</li>
                  <li>Copy your app credentials</li>
                  <li>Add them to your .env.local file</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Test the Chat</h3>
                <ol className="list-decimal list-inside text-sm space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <li>Open this page in multiple browser tabs</li>
                  <li>Use the same Game ID in all tabs</li>
                  <li>Click &quot;Connect&quot; in each tab</li>
                  <li>Send messages and see them appear in all tabs</li>
                  <li>Close one tab and see the peer count update</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Key Benefits</h3>
                <ul className="list-disc list-inside text-sm space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                  <li>No dependency on any single user being online</li>
                  <li>Automatic reconnection handling</li>
                  <li>Real-time presence tracking</li>
                  <li>Works in serverless environments</li>
                  <li>Local message history storage</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 