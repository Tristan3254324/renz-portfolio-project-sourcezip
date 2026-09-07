import React, { useState, useRef, useEffect } from 'react';
import { apiUrl } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Minimize2, Maximize2, Zap, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What are Renz's top skills?",
  "Tell me about his work experience",
  "What certifications does he have?",
  "Is he available for hire?",
  "What tools does he use?",
  "Tell me about his Guinness World Record",
];

const GREETING: Message = {
  id: 'greeting',
  role: 'assistant',
  content: `**Hello! I'm Renz AI** — your direct line to everything about Renz Tristan Fernandez Diaz. 🚀

I can instantly answer questions about his:
• **Experience** — 15+ roles across 4 continents
• **Skills** — HubSpot, Xero, Klaviyo, AI tools & more
• **Certifications** — 65+ verified credentials
• **Availability** — open to global opportunities

What would you like to know?`,
  timestamp: new Date(),
};

function formatContent(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="text-primary font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <span key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamingRef = useRef(false);

  // Pulse the button after 3s to attract attention
  useEffect(() => {
    const timer = setTimeout(() => setPulseCount(c => c + 1), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    const assistantId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput('');
    setIsStreaming(true);
    streamingRef.current = true;

    try {
      const history = messages
        .filter(m => m.id !== 'greeting')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...history, { role: 'user', content: text.trim() }],
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Network error');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (streamingRef.current) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) break;
            if (data.content) {
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? { ...m, content: m.content + data.content }
                    : m
                )
              );
            }
          } catch {}
        }
      }
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: 'Connection error. Please try again.' }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
      streamingRef.current = false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const reset = () => {
    setMessages([GREETING]);
    setInput('');
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => { setIsOpen(true); setHasUnread(false); }}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_rgba(0,255,255,0.4)] flex items-center justify-center transition-all hover:shadow-[0_0_50px_rgba(0,255,255,0.6)] hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        animate={pulseCount > 0 ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.4 }}
        aria-label="Open AI Chat"
      >
        <Bot size={26} />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background" />
        )}
        {/* Orbital ring */}
        <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-[spin_4s_linear_infinite]" />
      </motion.button>

      {/* Chat panel — full-width on small screens, fixed width on sm+ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-4 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:right-6 sm:w-[370px] z-50 flex flex-col rounded-2xl border border-primary/30 bg-background/95 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.15)] overflow-hidden"
            style={{ height: isMinimized ? 'auto' : 'min(560px, calc(100dvh - 2rem))' }}
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 px-4 py-3 border-b border-primary/20 bg-card/60 shrink-0">
              {/* Animated scan line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[scan-h_3s_linear_infinite] pointer-events-none" />

              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-primary/15 border border-primary/40">
                <Bot size={18} className="text-primary" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-background" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold font-mono text-foreground leading-none">RENZ AI</p>
                <p className="text-[10px] font-mono text-primary/70 mt-0.5">
                  {isStreaming ? (
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />PROCESSING...</span>
                  ) : 'ONLINE · READY TO ANSWER'}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={reset}
                  className="grid min-h-11 min-w-11 place-items-center rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsMinimized(m => !m)}
                  className="grid min-h-11 min-w-11 place-items-center rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="grid min-h-11 min-w-11 place-items-center rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  title="Close"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {/* Avatar */}
                        <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
                          msg.role === 'assistant'
                            ? 'bg-primary/15 border-primary/40 text-primary'
                            : 'bg-card border-border text-muted-foreground'
                        }`}>
                          {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                        </div>

                        {/* Bubble */}
                        <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'assistant'
                            ? 'bg-card border border-border text-foreground rounded-tl-sm'
                            : 'bg-primary text-primary-foreground rounded-tr-sm'
                        }`}>
                          {msg.content === '' && msg.role === 'assistant' ? (
                            <span className="flex gap-1 items-center py-1">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0ms]" />
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
                              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
                            </span>
                          ) : (
                            <span>{formatContent(msg.content)}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestions (show when only greeting present) */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary/80 hover:bg-primary/15 hover:border-primary/60 transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 px-3 py-3 border-t border-primary/20 bg-card/40 shrink-0"
                  >
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask about Renz..."
                        disabled={isStreaming}
                        className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!input.trim() || isStreaming}
                      aria-label={isStreaming ? 'Sending message' : 'Send message'}
                      className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                    >
                      {isStreaming ? (
                        <Zap size={16} className="animate-pulse" />
                      ) : (
                        <Send size={16} />
                      )}
                    </button>
                  </form>

                  {/* Footer */}
                  <div className="px-4 py-1.5 border-t border-primary/10 bg-card/20 text-center">
                    <p className="font-mono text-[9px] text-muted-foreground/40 tracking-widest">POWERED BY RENZ AI · BUILT ON GPT</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan-h {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </>
  );
}
