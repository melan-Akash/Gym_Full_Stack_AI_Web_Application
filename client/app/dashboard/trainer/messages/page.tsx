"use client";

import { useState } from "react";
import Image from "next/image";
import { INITIAL_MESSAGES, MessageItem } from "@/lib/dashboardData";
import { Send, Search, CheckCheck, Paperclip } from "lucide-react";

export default function TrainerMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [activeChat, setActiveChat] = useState("c-101"); // David Miller

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: MessageItem = {
      id: Date.now().toString(),
      senderId: "marcus-vance",
      senderName: "Marcus Vance",
      senderAvatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
      role: "trainer",
      content: input,
      timestamp: "Just now",
      isRead: true,
    };

    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          CLIENT & ADMIN <span className="text-[#d7ff2f]">MESSAGES</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Direct messaging channel with assigned athletes, consultations, and gym staff.</p>
      </div>

      {/* Chat Container */}
      <div className="bg-[#12151c] border border-white/10 rounded-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-150">
        {/* Left Contacts Sidebar */}
        <div className="lg:col-span-4 border-r border-white/10 flex flex-col justify-between">
          <div className="p-4 border-b border-white/10">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            <button
              onClick={() => setActiveChat("c-101")}
              className={`w-full p-4 flex items-center gap-3 text-left transition-all cursor-pointer ${
                activeChat === "c-101" ? "bg-white/10 border-l-4 border-[#d7ff2f]" : "hover:bg-white/5"
              }`}
            >
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"
                alt="David Miller"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="overflow-hidden flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">David Miller</h4>
                  <span className="text-[10px] text-slate-400">10:18 AM</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Boom! Incredible work David!</p>
              </div>
            </button>

            <button
              onClick={() => setActiveChat("c-102")}
              className={`w-full p-4 flex items-center gap-3 text-left transition-all cursor-pointer ${
                activeChat === "c-102" ? "bg-white/10 border-l-4 border-[#d7ff2f]" : "hover:bg-white/5"
              }`}
            >
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
                alt="Sarah Jenkins"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="overflow-hidden flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Sarah Jenkins</h4>
                  <span className="text-[10px] text-[#d7ff2f] font-bold">11:05 AM</span>
                </div>
                <p className="text-[11px] text-slate-300 font-semibold truncate">Quick question on tomorrow&apos;s meal...</p>
              </div>
            </button>
          </div>
        </div>

        {/* Right Active Message Area */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#0b0b0b]/60">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-[#12151c] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"
                alt="David Miller"
                width={36}
                height={36}
                className="rounded-full object-cover border border-[#d7ff2f]"
              />
              <div>
                <h3 className="text-xs font-bold text-white">David Miller</h3>
                <span className="text-[10px] text-emerald-400 font-bold">Online • Hypertrophy Client</span>
              </div>
            </div>
          </div>

          {/* Thread messages */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {messages.map((msg) => {
              const isTrainer = msg.role === "trainer";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isTrainer ? "justify-end" : "justify-start"}`}
                >
                  {!isTrainer && (
                    <Image src={msg.senderAvatar} alt={msg.senderName} width={28} height={28} className="rounded-full object-cover mb-1" />
                  )}
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      isTrainer
                        ? "bg-[#d7ff2f] text-[#0b0b0b] font-medium rounded-br-none"
                        : "bg-[#1e2230] text-white border border-white/10 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className={`text-[9px] block text-right font-mono ${isTrainer ? "text-slate-800" : "text-slate-400"}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-[#12151c] flex items-center gap-3">
            <button type="button" className="text-slate-400 hover:text-white p-1">
              <Paperclip size={18} />
            </button>
            <input
              type="text"
              placeholder="Type message to client..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#d7ff2f] text-[#0b0b0b] rounded-xl font-bold hover:bg-[#c8f020] transition-all cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
