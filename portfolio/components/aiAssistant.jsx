
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am Sandipto\'s digital twin. Ask me about his Goldman Sachs prep or his coding life at NIT Durgapur.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiRes = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiRes }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-96 glass h-[450px] rounded-2xl flex flex-col overflow-hidden red-glow border border-red-600/30">
          <div className="bg-zinc-900/50 p-4 border-b border-red-900/20 flex justify-between items-center">
            <span className="font-serif font-bold tracking-tight text-red-500">Sandipto AI</span>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' ? 'bg-red-700 text-white' : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-zinc-400 p-3 rounded-xl text-xs italic animate-pulse">Thinking...</div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-zinc-900/80 border-t border-red-900/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-600 transition-colors"
            />
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 red-glow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
