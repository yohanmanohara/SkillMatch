'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
export default function ChatbotPage() {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
            {/* Floating Button */}
            <Button
                variant="secondary"
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-4 right-4 text-white px-4 py-2 rounded-full shadow-lg `}
            >
                {isOpen ? 'Close Chat' : 'Chat with Bot'}
            </Button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-16 right-4 w-80 bg-black border border-gray-300 rounded-lg shadow-lg">
                    <div className="bg-black text-white text-center py-2 rounded-t-lg">🤖 Chatbot</div>

                    <div className="p-4 h-64 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-2 rounded-sm text-white ${
                                    msg.sender === 'user'
                                        ? 'bg-green-500 text-right'
                                        : 'bg-green-700 text-left'
                                }`}
                            >
                                <span>{msg.text}</span>
                            </div>
                        ))}
                        {loading && <p className="text-gray-500 text-sm">Bot is typing...</p>}
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
                        <Button
                            variant="secondary"
                            onClick={sendMessage}
                            className="text-white px-4 py-1 rounded-lg "
                        >
                            Send
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
