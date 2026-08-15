"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, techStack, projects, experience } from "@/lib/data";

const WELCOME = "Good morning!\nI'm Nitin's AI, ask me anything!";

function getGreetingTime() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

function getBotResponse(input) {
  const text = input.toLowerCase();

  if (text.includes("phone") || text.includes("number") || text.includes("call") || text.includes("mobile") || text.includes("whatsapp")) {
    return `Nitin's phone number is ${profile.phone} and his email is ${profile.email}.`;
  }

  if (text.includes("cgpa") || text.includes("gpa") || text.includes("education") || text.includes("college") || text.includes("university") || text.includes("degree") || text.includes("vit")) {
    return `Nitin is pursuing B.Tech in Computer Science & Business Systems at VIT-AP University with a CGPA of 8.70 (Graduating 2026).`;
  }

  if (text.includes("skill") || text.includes("tech") || text.includes("stack") || text.includes("design systems") || text.includes("language") || text.includes("framework")) {
    return `Nitin is highly skilled in: ${techStack.map((t) => t.name).slice(0, 10).join(", ")}, along with Generative AI (LLMs, RAG, ChromaDB) and full-stack web development.`;
  }

  if (text.includes("project") || text.includes("work") || text.includes("different") || text.includes("portfolio") || text.includes("build") || text.includes("made")) {
    return `Nitin has engineered standout projects including: 1) ${projects[0].name} (${projects[0].category}), 2) ${projects[1].name} (${projects[1].category}), and 3) ${projects[2].name}.`;
  }

  if (text.includes("experience") || text.includes("exp") || text.includes("career") || text.includes("highlight") || text.includes("intern") || text.includes("job")) {
    return `Nitin interned as a ${experience[0].role} at ${experience[0].org} (${experience[0].period}), where he engineered scalable web applications and AI tools, improving order fulfillment efficiency by 30%.`;
  }

  if (text.includes("talk") || text.includes("contact") || text.includes("email") || text.includes("hire") || text.includes("reach") || text.includes("message")) {
    return `You can reach out directly to Nitin at ${profile.email} or call him at ${profile.phone}!`;
  }

  if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("greetings")) {
    return `Hello! How can I assist you in exploring Nitin's background today?`;
  }

  return `Nitin is a Software Engineer specializing in AI Applications and Full Stack Web Development (CGPA: 8.70, Phone: ${profile.phone}, Email: ${profile.email}). How can I help you regarding his work?`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const [inHero, setInHero] = useState(true);

  // Detect when user is in the Hero section
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Visible if bottom of hero is below 200px from top
        setInHero(rect.bottom > 200);
      } else {
        setInHero(window.scrollY < window.innerHeight * 0.8);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Command + K shortcut support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendQuery = async (textQuery) => {
    const text = textQuery.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error calling Groq API. Please check your GROQ_API_KEY environment variable on Render." },
        ]);
      }
    } catch (err) {
      console.error("Groq API error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Failed to connect to /api/chat. Ensure Render is running as a Web Service with GROQ_API_KEY set." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuery(input);
    }
  };

  const suggestions = [
    {
      label: "Just talk to me",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      query: "Hi, let's talk!",
    },
    {
      label: "Design systems approach",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      query: "What is Nitin's tech stack and design skills?",
    },
    {
      label: "Career highlights",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      query: "Tell me about Nitin's career highlights and experience.",
    },
    {
      label: "What makes him different",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      ),
      query: "What makes Nitin stand out as a Software Engineer?",
    },
  ];

  return (
    <>
      {/* ── FLOATING PILL TRIGGER (Smoothly vanishes outside Hero) ── */}
      <AnimatePresence>
        {inHero && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 z-40 pointer-events-auto"
          >
            <button
              onClick={() => setOpen(true)}
              className="group flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/20 bg-[#0d0d12]/95 backdrop-blur-xl shadow-2xl hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300 active:scale-95 cursor-pointer max-w-[90vw]"
            >
              {/* Animated Glowing Orb Icon */}
              <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-400 p-[1px] shadow-[0_0_12px_rgba(168,85,247,0.6)] animate-pulse">
                <div className="w-full h-full rounded-full bg-[#161426] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 blur-[1px]" />
                </div>
              </div>

              <span className="text-sm font-semibold text-white tracking-wide">
                Ask me anything
              </span>

              <span className="flex items-center px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-mono text-white/70">
                ⌘K
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── IMAGE 2: FULLSCREEN OVERLAY MODAL ────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07070b]/95 backdrop-blur-2xl text-white p-6 sm:p-10 overflow-hidden"
          >
            {/* Ambient Purple/Cyan Background Glows */}
            <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none" />

            {/* Top Close Bar */}
            <div className="flex justify-end z-10">
              <button
                onClick={() => setOpen(false)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Close Assistant"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Center Header & Chat Conversation Container */}
            <div className="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full z-10 overflow-hidden py-4">
              {messages.length === 0 ? (
                /* Initial Welcome View */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-white/80 mb-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span>Nitin&apos;s Portfolio Assistant</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                    {getGreetingTime()}
                  </h1>
                  <p className="text-xl sm:text-2xl font-medium text-white/70">
                    I&apos;m Nitin&apos;s AI, ask me anything!
                  </p>
                </motion.div>
              ) : (
                /* Active Chat History View */
                <div
                  ref={scrollRef}
                  className="w-full flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar my-4"
                >
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl text-sm sm:text-base leading-relaxed ${
                          m.role === "user"
                            ? "bg-purple-600/90 text-white rounded-tr-xs shadow-lg shadow-purple-600/20 font-medium"
                            : "bg-white/10 text-white/95 backdrop-blur-md border border-white/10 rounded-tl-xs"
                        }`}
                      >
                        {m.content}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="px-5 py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white/60 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions & Input Container */}
            <div className="w-full max-w-3xl mx-auto z-10 space-y-4">
              {/* Suggestion Chips (Image 2 style) */}
              <div className="flex items-center justify-center gap-2.5 flex-wrap">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendQuery(s.query)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-purple-400/40 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Input Bar (Image 2 style) */}
              <div className="relative flex items-center rounded-full border border-white/20 bg-[#161622]/90 p-2 shadow-2xl focus-within:border-purple-500/60 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask me anything"
                  className="flex-1 bg-transparent px-5 py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none"
                />
                <button
                  onClick={() => sendQuery(input)}
                  disabled={!input.trim()}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-purple-600 disabled:opacity-40 disabled:hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  aria-label="Send Query"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>

              {/* Sub-footer Credits */}
              <div className="text-center font-mono text-[11px] text-white/40 tracking-wider">
                Powered by AI · Trained on Nitin Pandey&apos;s Portfolio
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

