"use client";

import { useState } from "react";
import { SYSTEM_NOTIFICATIONS, SystemNotification } from "@/lib/adminData";
import { Bell, Send, CheckCircle2, Megaphone, AlertTriangle, ShieldCheck } from "lucide-react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<SystemNotification[]>(SYSTEM_NOTIFICATIONS);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState<"All Members" | "Trainers Only" | "VIP Members">("All Members");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNotif: SystemNotification = {
      id: Date.now().toString(),
      title,
      message,
      category: "Announcement",
      targetAudience: audience,
      createdAt: "Just now",
      sentBy: "Admin HQ",
    };

    setNotifications([newNotif, ...notifications]);
    setTitle("");
    setMessage("");
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          SYSTEM <span className="text-[#00f2fe]">NOTIFICATIONS & BROADCASTS</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Send app push notifications, SMS alerts, and facility announcements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleBroadcast} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Megaphone size={18} className="text-[#00f2fe]" /> Create New Broadcast
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full bg-[#1e2230] border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
              >
                <option value="All Members">All Members (1,248 Athletes)</option>
                <option value="Trainers Only">Trainers Only (12 Coaches)</option>
                <option value="VIP Members">VIP Members Only (248 Athletes)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Announcement Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Holiday Hours & Recovery Suite Maintenance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Message Content</label>
              <textarea
                required
                rows={4}
                placeholder="Write message to send to member app feed..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Send size={15} />
              {sentSuccess ? "Broadcast Sent!" : "Send Broadcast Now"}
            </button>
          </form>
        </div>

        {/* Right Active History */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Active System Announcements
            </h3>

            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                    <span className="text-[9px] bg-[#00f2fe]/20 text-[#00f2fe] px-2 py-0.5 rounded font-bold uppercase">
                      {notif.targetAudience}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">{notif.message}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Sent by: {notif.sentBy}</span>
                    <span>{notif.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
