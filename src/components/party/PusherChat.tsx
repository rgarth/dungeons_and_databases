import React, { useState, useRef, useEffect } from 'react';
import { usePusherChat } from '@/hooks/use-pusher-chat';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChatMessage } from '@/lib/pusher-chat';

interface PusherChatProps {
  gameId: string;
  className?: string;
}

export function PusherChat({ gameId, className = '' }: PusherChatProps) {
  const [inputMessage, setInputMessage] = useState('');
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
  } = usePusherChat({ gameId });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && isConnected) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStyle = (message: ChatMessage) => {
    switch (message.type) {
      case 'system':
        return 'text-blue-500 italic';
      case 'dice_roll':
        return 'text-purple-500 font-mono';
      default:
        return '';
    }
  };

  return (
    <Card className={`flex flex-col h-96 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Game Chat</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {isConnected ? `${peerCount} online` : 'Disconnected'}
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={isConnected ? disconnect : connect}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-2 border-b" style={{ 
          backgroundColor: 'var(--color-error-bg)', 
          borderColor: 'var(--color-border)',
          color: 'var(--color-error-text)'
        }}>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  {message.userName}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <p className={`text-sm ${getMessageStyle(message)}`} style={{ color: 'var(--color-text-primary)' }}>
                {message.message}
              </p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type your message..." : "Connect to chat"}
            disabled={!isConnected}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-input-bg)',
              color: 'var(--color-text-primary)',
              borderColor: 'var(--color-border)'
            }}
          />
          <Button
            type="submit"
            disabled={!isConnected || !inputMessage.trim()}
            size="sm"
          >
            Send
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="flex justify-between items-center p-2 border-t" style={{ 
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-secondary)'
      }}>
        <span className="text-xs">
          Messages are stored locally for 7 days
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={clearMessages}
          className="text-xs"
        >
          Clear History
        </Button>
      </div>
    </Card>
  );
} 