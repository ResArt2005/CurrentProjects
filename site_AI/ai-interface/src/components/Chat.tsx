'use client';
import { useState, useEffect } from 'react';
// Убираем статический импорт
// import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Динамический импорт только на клиенте
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
    if (socket) {
      socket.emit('prompt', input);
      setMessages((prev) => [...prev, '> ' + input]);
      setInput('');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="border rounded p-2 h-64 overflow-y-scroll bg-gray-100">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm whitespace-pre-wrap">{msg}</div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          //onKeyPress={(e) => e.key === 'Enter' && send()}
        />
        <button onClick={send} className="bg-blue-500 text-white px-4 py-1 rounded">
          Send
        </button>
      </div>
    </div>
  );
}