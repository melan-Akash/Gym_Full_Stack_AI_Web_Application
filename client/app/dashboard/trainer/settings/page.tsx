"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Clock, Bell, Shield, Save } from "lucide-react";

export default function TrainerSettingsPage() {
  const [name, setName] = useState("Marcus Vance");
  const [title, setTitle] = useState("Master Strength & Hypertrophy Coach");
  const [rate, setRate] = useState(85);
  const [bio, setBio] = useState("IFBB Pro bodybuilder & strength science specialist with over a decade of elite athlete conditioning.");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          TRAINER <span className="text-[#d7ff2f]">PROFILE & SETTINGS</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Configure your public bio, hourly rates, session availability, and notification preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <User size={16} className="text-[#d7ff2f]" /> Public Profile Details
          </h3>

          <div className="flex items-center gap-4">
            <Image
              src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&q=80"
              alt="Marcus Vance"
              width={64}
              height={64}
              className="rounded-full object-cover border-2 border-[#d7ff2f]"
            />
            <button type="button" className="px-4 py-2 bg-white/5 border border-white/15 text-xs font-bold text-slate-200 rounded-lg hover:bg-white/10">
              Change Photo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#d7ff2f]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#d7ff2f]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Hourly Rate ($)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#d7ff2f]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Public Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d7ff2f]"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <Bell size={16} className="text-[#00f2fe]" /> Notifications & Alerts
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <label className="flex items-center justify-between p-3 bg-white/5 rounded-xl cursor-pointer">
              <span>Notify when a client books a session slot</span>
              <input type="checkbox" defaultChecked className="text-[#d7ff2f] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-white/5 rounded-xl cursor-pointer">
              <span>Email summary of daily training schedule</span>
              <input type="checkbox" defaultChecked className="text-[#d7ff2f] rounded" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#c8f020] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(215,255,47,0.3)]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Save size={16} />
          {saved ? "Settings Saved!" : "Save Preferences"}
        </button>
      </form>
    </div>
  );
}
