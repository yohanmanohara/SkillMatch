'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/chatWithBot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error getting reply' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 p-0 rounded-full shadow-lg flex items-center justify-center bg-green-500 text-white z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2v2m-5.5 2a2.5 2.5 0 00-2.5 2.5V14a2.5 2.5 0 002.5 2.5H6l1 3h10l1-3h-.5a2.5 2.5 0 002.5-2.5V8.5A2.5 2.5 0 0017.5 6H17m-10 0h10M9 10h.01M15 10h.01"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 sm:right-4 right-2 w-[90vw] max-w-sm bg-black border border-gray-300 rounded-lg shadow-lg z-50 max-h-[70vh] flex flex-col">
          <div className="bg-black text-white text-center py-2 rounded-t-lg">🤖 Chatbot</div>
          <div className="p-4 h-64 md:h-72 overflow-y-auto space-y-2 flex flex-col">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`inline-block max-w-[80%] px-3 py-2 rounded-2xl text-white ${
          msg.sender === 'user' ? 'bg-green-500' : 'bg-green-700'
        }`}
      >
        {msg.text}
      </div>
    </div>
  ))}
  {loading && <p className="text-gray-400 text-sm">Bot is typing...</p>}
</div>

          <div className="flex items-center p-2 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type your message.."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border border-gray-300 rounded-lg px-2 py-1 mr-2"
            />
            <Button onClick={sendMessage} className="bg-green-600 text-white px-4 py-1 rounded-lg">
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
