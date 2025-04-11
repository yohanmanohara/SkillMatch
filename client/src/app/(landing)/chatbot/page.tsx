import { useState } from 'react';
import React from 'react'
import ChatbotPage from "@/components/landing/chatbot";

const page = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-center mb-4">Chatbot</h2>
        <div className="p-12">
            <ChatbotPage />
            
        </div>
    </div>
  )
}

export default page