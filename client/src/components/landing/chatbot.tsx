import { useState } from 'react';

export default function ChatbotPage() {
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
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2>🤖 Chatbot</h2>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', minHeight: '200px' }}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: msg.sender === 'user' ? 'right' : 'left',
                            marginBottom: '10px',
                        }}
                    >
                        <span
                            style={{
                                display: 'inline-block',
                                padding: '10px',
                                borderRadius: '12px',
                                backgroundColor: '#006400', // Green background for all messages
                            }}
                        >
                            {msg.text}
                        </span>
                    </div>
                ))}
                {loading && <p>Bot is typing...</p>}
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem' }}
                />
                <button onClick={sendMessage} style={{ padding: '0.5rem 1rem' }}>
                    Send
                </button>
            </div>
        </div>
    );
}
