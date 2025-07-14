import React, { useState, useRef, useEffect } from 'react';
import { useWebRTCChat } from '@/hooks/use-webrtc-chat';
import { ChatMessage } from '@/lib/webrtc-chat';

interface WebRTCChatProps {
  gameId: string;
  enabled?: boolean;
}

export default function WebRTCChat({ gameId, enabled = true }: WebRTCChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    messages,
    peerCount,
    isConnected,
    error,
    sendMessage,
    connect,
    clearMessages
  } = useWebRTCChat({ gameId, enabled });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      sendMessage(newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
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
        return 'italic text-sm';
      case 'dice_roll':
        return 'font-mono';
      default:
        return '';
    }
  };

  const getMessageIcon = (message: ChatMessage) => {
    switch (message.type) {
      case 'system':
        return '🔔';
      case 'dice_roll':
        return '🎲';
      default:
        return '💬';
    }
  };

  return (
    <div className="flex flex-col h-full rounded-lg border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>Peer-to-Peer Chat</h3>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {peerCount} peer{peerCount !== 1 ? 's' : ''} connected
          </span>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="px-2 py-1 text-xs rounded hover:opacity-80"
              style={{ backgroundColor: 'var(--color-danger)', color: 'var(--color-danger-text)' }}
              title="Clear chat history"
            >
              Clear
            </button>
          )}
          {!isConnected && (
            <button
              onClick={connect}
              className="px-3 py-1 text-sm rounded hover:opacity-80"
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}
            >
              Connect
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 border-b" style={{ backgroundColor: 'var(--color-danger-bg)', borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--color-text-muted)' }}>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-2">
              <span className="text-lg">{getMessageIcon(message)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {message.userName}:
                    </span>
                    <span 
                      className={`${getMessageStyle(message)} truncate`}
                      style={{ 
                        color: message.type === 'system' 
                          ? 'var(--color-text-muted)' 
                          : message.type === 'dice_roll'
                          ? 'var(--color-accent)'
                          : 'var(--color-text-primary)'
                      }}
                    >
                      {message.message}
                    </span>
                  </div>
                  <span className="text-xs ml-2 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Type your message..." : "Connect to start chatting..."}
            disabled={!isConnected || isSending}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-card)',
              color: 'var(--color-text-primary)',
              borderColor: 'var(--color-border)',
              outlineColor: 'var(--color-accent)'
            }}
          />
          <button
            type="submit"
            disabled={!isConnected || isSending || !newMessage.trim()}
            className="px-4 py-2 rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)' }}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
} 