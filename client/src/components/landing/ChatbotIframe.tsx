'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Adjust path to where your Button component is

const ChatbotIframe = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
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

      {/* Chat Window Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/WLKybVRajbQupcbmLUDbI"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          ></iframe>

          {/* Close Button (small X at top-right) */}
          <Button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xs font-bold z-50 p-0 w-5 h-5"
            aria-label="Close chat"
          >
            ✕
          </Button>
        </div>
      )}
    </>
  );
};

export default ChatbotIframe;
