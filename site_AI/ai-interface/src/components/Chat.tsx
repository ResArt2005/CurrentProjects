'use client';
import { useState, useEffect } from 'react';
import type { Socket } from 'socket.io-client';
import styles from '../app/styles/page.module.css';

export default function Chat({ className }: { className?: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    import('socket.io-client').then(({ default: io }) => {
      const newSocket = io('http://localhost:8000');
      setSocket(newSocket);

      newSocket.on('response', (msg: string) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        newSocket.disconnect();
      };
    });
  }, []);

  const send = () => {
    if (socket && input.trim()) {
      socket.emit('prompt', input);
      setMessages((prev) => [...prev, '> ' + input]);
      setInput('');
    }
  };

  return (
    <div className={className}>
      <div className={styles['chat-messages']}>
        {messages.length === 0 ? (
          <div className={styles['chat-empty']}>Start chatting...</div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={styles['chat-message']}>{msg}</div>
          ))
        )}
      </div>
      <div className={styles['chat-input-row']}>
        <input
          type="text"
          className={styles['chat-input']}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Enter your prompt..."
        />
        <button
          onClick={send}
          className={styles['chat-send']}
        >
          Send
        </button>
      </div>
    </div>
  );
}