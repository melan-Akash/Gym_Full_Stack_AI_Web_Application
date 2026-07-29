"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, MapPin, Phone, Award } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Ayubowan! I am your 24/7 FitAI Gym Agent. Ask me anything about FORGED memberships, Sri Lankan facility locations, AI meal plans, or booking a free trial!",
      time: "Just now",
    },
  ]);

  const quickPrompts = [
    "What are the membership prices?",
    "Where is the Colombo gym located?",
    "What facilities & recovery options are available?",
    "How do I claim a 7-day free trial?",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "";
      const lower = query.toLowerCase();

      if (lower.includes("price") || lower.includes("membership") || lower.includes("cost") || lower.includes("plan")) {
        aiText =
          "FORGED offers 3 elite membership tiers:\n\n" +
          "• **Foundation ($79/mo)**: 6am-10pm Gym Access, 10 Group Classes/mo, Locker access & Progress App.\n" +
          "• **Performance ($149/mo - Popular)**: 24/7 Keycard Access, Unlimited Classes, Monthly 1-on-1 Coaching, Recovery Suite access.\n" +
          "• **Elite ($299/mo)**: 24/7 Access, 4x Weekly Personal Training, Custom Meal Planning, VIP Recovery Suite.\n\n" +
          "All plans include a 7-day free trial!";
      } else if (lower.includes("location") || lower.includes("where") || lower.includes("colombo") || lower.includes("address")) {
        aiText =
          "Our Sri Lankan Athletic & Performance Centers:\n\n" +
          "📍 **Colombo Flagship**: 142 Galle Road, Colombo 03 (15,000 sq ft, 24/7 Access)\n" +
          "📍 **Kandy Lab**: 58 Peradeniya Road, Kandy\n" +
          "📍 **Galle Fort**: 24 Church Street, Galle Fort\n\n" +
          "Call us at +94 11 234 5678 for directions!";
      } else if (lower.includes("hour") || lower.includes("time") || lower.includes("open")) {
        aiText =
          "🕒 **Facility Operating Hours**:\n\n" +
          "• **Performance & Elite Members**: 24 Hours / 7 Days a week (Biometric key fob access)\n" +
          "• **Front Desk & Guest Access**: 6:00 AM – 10:00 PM Daily";
      } else if (lower.includes("facility") || lower.includes("recovery") || lower.includes("sauna") || lower.includes("cold plunge")) {
        aiText =
          "🏋️‍♂️ **FORGED World-Class Facilities**:\n\n" +
          "• Eleiko IPF-approved powerlifting racks & calibrated plates\n" +
          "• 38°F Hydrotherapy Mineralized Cold Plunges\n" +
          "• Full-spectrum Infrared Saunas & Percussion Therapy\n" +
          "• 50m Indoor Sprint & Heavy Sled Turf Track";
      } else if (lower.includes("trial") || lower.includes("free") || lower.includes("book") || lower.includes("join")) {
        aiText =
          "🎉 You can claim a **7-Day Free Elite Trial Pass**!\n\n" +
          "Visit our front desk at 142 Galle Road, Colombo 03 or contact us on the Contact page to activate your trial immediately.";
      } else {
        aiText =
          "I am here to assist you with everything FORGED & FitAI!\n\n" +
          "Feel free to ask about our 24/7 gym access, personal coaching, AI Sri Lankan meal plans, or visit our Services page to explore our capabilities.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] flex items-center justify-center shadow-[0_6px_30px_rgba(215,255,47,0.45)] cursor-pointer group"
          aria-label="Toggle FitAI Assistant"
        >
          {isOpen ? (
            <X size={24} className="text-[#0b0b0b]" />
          ) : (
            <>
              <Bot size={26} className="text-[#0b0b0b]" />
              {/* Online Pulse Dot */}
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#00f2fe] border-2 border-[#1e2230] animate-pulse" />
            </>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-130 bg-[#12151c]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#1e2230] border-b border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#d7ff2f] text-[#0b0b0b] flex items-center justify-center font-bold">
                  <Bot size={20} />
                </div>
                <div>
                  <h3
                    className="text-base font-black text-white uppercase leading-none"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    FitAI Gym Agent
                  </h3>
                  <span className="text-[10px] text-[#d7ff2f] font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d7ff2f] animate-ping" />
                    24/7 Neural Assistant Online
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Prompts Bar */}
            <div className="p-2.5 bg-white/5 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-white/5 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] border border-white/10 text-[10px] text-slate-300 font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-normal">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === "user"
                        ? "bg-[#00f2fe] text-[#0b0b0b]"
                        : "bg-[#d7ff2f] text-[#0b0b0b]"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed max-w-[80%] whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-[#00f2fe]/15 border border-[#00f2fe]/30 text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#d7ff2f] font-semibold">
                  <Bot size={14} className="animate-spin" />
                  <span>FitAI is typing...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-[#1e2230] border-t border-white/15 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about gym hours, plans, locations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f]"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 bg-[#d7ff2f] text-[#0b0b0b] rounded-lg hover:bg-[#c8f020] transition-colors cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
