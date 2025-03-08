import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([{ text: "How are you?", user: false }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput('');

      try {
        setLoading(true);
        
        const apiKey = "AIzaSyCD-mOWOawH-vCSaAlbqmDOuDE73wexZd0";  // Get API key from .env file
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
          {
            "contents": [
              {
                "parts": [
                  {
                    "text": input
                  }
                ]
              }
            ]
          }
        );
        
        const botResponse = response.data.candidates[0].content.parts[0].text;
        setLoading(false);
        setMessages([...newMessages, { text: botResponse, user: false }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setLoading(false);
        setMessages([...newMessages, { text: 'Error: Could not get response from AI', user: false }]);
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div>
      <button
        className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        Sprinter
      </button>

      {isChatOpen && (
        <div className="fixed bottom-8 right-8 w-full md:w-1/4 h-2/3 bg-gray-900 shadow-lg z-40 border-2 border-gray-700 rounded-2xl">
          <div className="flex flex-col justify-center items-center h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl">
            <h1 className="mb-4 font-bold text-[2rem] drop-shadow-lg text-gray-50">Spiriter</h1>
            <div className="bg-gray-800 w-full max-w-md shadow-lg rounded-2xl overflow-hidden">
              <div className="p-4 h-72 overflow-y-auto custom-scrollbar">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.user ? 'justify-end' : 'justify-start'} mb-2`}>
                    <div className={`rounded-lg p-2 shadow-md overflow-x-hidden flex flex-wrap ${msg.user ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <span>Loading</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t border-gray-700 flex">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-600 rounded-lg outline-none bg-gray-800 text-gray-200"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
                  onClick={handleSendMessage}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}