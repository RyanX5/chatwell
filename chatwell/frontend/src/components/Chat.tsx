import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', 'Can you explain what this image is about?'); // You can make this dynamic
    if (sessionId) {
      formData.append('sessionId', sessionId); // Pass sessionId to backend
    }

    setMessages((prev) => [...prev, { role: 'user', content: '[Image uploaded]' }]);
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/upload-image-chat', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await res.json();
      console.log('Image Chat Response:', data.response);

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);

      // If this is the first interaction and we get a sessionId back, store it
      if (!sessionId && data.sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem('chatwell_session_id', data.sessionId);
      }
    } catch (err) {
      console.error('Image upload failed:', err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your image.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Add initial welcome message
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! How can I help you today?',
      },
    ]);

    // Get session ID from localStorage if available
    const storedSessionId = localStorage.getItem('chatwell_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }

    // Check if user info exists on the server
    const checkUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user-info');
        if (response.data && response.data.timestamp) {
          console.log('User info found:', response.data);
        }
      } catch (error) {
        console.error('User info not found, redirecting to form');
        window.location.href = '/';
      }
    };

    checkUserInfo();
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: input,
        sessionId,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If this is the first message and we get a sessionId back, store it
      if (!sessionId && response.data.sessionId) {
        setSessionId(response.data.sessionId);
        localStorage.setItem('chatwell_session_id', response.data.sessionId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-content">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
        <button className="upload-btn" type="button" onClick={handleUploadClick}>
          Upload
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
};

export default Chat;