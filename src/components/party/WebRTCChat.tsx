'use client';

import { useState, useEffect, useRef } from 'react';
import { useWebRTCChat } from '@/hooks/use-webrtc-chat';
import { ChatMessage } from '@/lib/webrtc-chat';

interface WebRTCChatProps {
  gameId: string;
  enabled?: boolean;
}

export default function WebRTCChat({ gameId, enabled = true }: WebRTCChatProps) {
  const [message, setMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    peerCount,
    isConnected,
    error,
    sendMessage,
    connect,
    disconnect
  } = useWebRTCChat({ gameId, enabled });

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
    <div className="flex flex-col h-full bg-gray-50 rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">Party Chat</h3>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {isConnected ? `${peerCount} online` : 'Disconnected'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isConnected && !isConnecting && (
            <button
              onClick={handleConnect}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Connect
            </button>
          )}
          {isConnecting && (
            <span className="text-sm text-gray-500">Connecting...</span>
          )}
          {isConnected && (
            <button
              onClick={disconnect}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-50 border-b border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            {isConnected ? 'No messages yet. Start the conversation!' : 'Connect to start chatting'}
          </div>
        ) : (
          messages.map((msg: ChatMessage) => (
            <div key={msg.id} className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">
                  {msg.userName}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(msg.timestamp)}
                </span>
                {msg.type !== 'text' && (
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                    {msg.type}
                  </span>
                )}
              </div>
              <div className="mt-1">
                <p className="text-gray-700 break-words">{msg.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      {isConnected && (
        <div className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={!isConnected}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || !isConnected}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 