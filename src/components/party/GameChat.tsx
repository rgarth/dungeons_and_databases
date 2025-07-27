'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePusherChat } from '@/hooks/use-pusher-chat';
import { useSession } from 'next-auth/react';
import { ChatMessage } from '@/lib/pusher-chat';

interface GameChatProps {
  gameId: string;
  enabled?: boolean;
  isDM?: boolean;
}

export default function GameChat({ gameId, enabled = true, isDM = false }: GameChatProps) {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    peerCount,
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect,
    clearMessages
  } = usePusherChat({ gameId, enabled });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && isConnected) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleClearChat = async () => {
    // Only DM can clear chat history from server
    setIsClearing(true);
    try {
      const response = await fetch(`/api/games/${gameId}/chat`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Clear local messages immediately
        clearMessages();
      } else {
        console.error('Failed to clear chat history');
      }
    } catch (error) {
      console.error('Error clearing chat history:', error);
    } finally {
      setIsClearing(false);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className="flex flex-col h-full rounded-lg border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b rounded-t-lg" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Party Chat</h3>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              {isConnected ? `${peerCount} online` : 'Disconnected'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isConnected && !isConnecting && (
            <button
              onClick={handleConnect}
              className="px-3 py-1 text-sm rounded transition-colors hover:opacity-80"
              style={{ 
                backgroundColor: 'var(--color-accent)', 
                color: 'var(--color-accent-text)'
              }}
            >
              Connect
            </button>
          )}
          {isConnecting && (
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Connecting...</span>
          )}
          {isConnected && (
            <>
              {/* Clear Button - only show to DM if there are messages */}
              {isDM && messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  disabled={isClearing}
                  className="px-3 py-1 text-sm rounded transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: 'var(--color-warning)',
                    color: 'var(--color-warning-text)'
                  }}
                  title="Clear chat history for everyone"
                >
                  {isClearing ? 'Clearing...' : 'Clear'}
                </button>
              )}
              <button
                onClick={disconnect}
                className="px-3 py-1 text-sm rounded transition-colors hover:opacity-80"
                style={{ 
                  backgroundColor: 'var(--color-danger)', 
                  color: 'var(--color-danger-text)'
                }}
              >
                Disconnect
              </button>
            </>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 border-b" style={{ backgroundColor: 'var(--color-danger-bg)', borderColor: 'var(--color-danger)' }}>
          <p className="text-sm" style={{ color: 'var(--color-danger)' }}>{error}</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>
            {isConnected ? 'No messages yet. Start the conversation!' : 'Connect to start chatting'}
          </div>
        ) : (
          messages.map((msg: ChatMessage) => {
            const isOwnMessage = session?.user?.id === msg.userId;
            const displayName = isOwnMessage ? 'You' : msg.userName;
            
            return (
              <div key={msg.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="font-medium whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>
                    {displayName}:
                  </span>
                  <span className="break-words flex-1" style={{ color: 'var(--color-text-primary)' }}>
                    {msg.message}
                  </span>
                </div>
                <span className="text-xs whitespace-nowrap ml-2" style={{ color: 'var(--color-text-tertiary)' }}>
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      {isConnected && (
        <div className="p-4 border-t rounded-b-lg" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              style={{
                backgroundColor: 'var(--color-card-secondary)',
                color: 'var(--color-text-primary)',
                borderColor: 'var(--color-border)',
                outlineColor: 'var(--color-accent)'
              }}
              disabled={!isConnected}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || !isConnected}
              className="px-4 py-2 rounded-md transition-colors disabled:cursor-not-allowed hover:opacity-80"
              style={{
                backgroundColor: message.trim() && isConnected ? 'var(--color-accent)' : 'var(--color-muted)',
                color: message.trim() && isConnected ? 'var(--color-accent-text)' : 'var(--color-text-secondary)'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 