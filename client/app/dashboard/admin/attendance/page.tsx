"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckSquare, Clock, Users, ShieldCheck, QrCode } from "lucide-react";

export default function AdminAttendancePage() {
  const checkInLogs = [
    { id: "c1", name: "Brandon Hayes", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80", time: "08:30 AM", plan: "VIP Elite", method: "Key Fob #889" },
    { id: "c2", name: "Jessica Taylor", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80", time: "07:15 AM", plan: "Pro Performance", method: "Mobile App QR" },
    { id: "c3", name: "Carlos Santana", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", time: "09:00 AM", plan: "Pro Performance", method: "Biometric Scanner" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            FACILITY <span className="text-[#00f2fe]">ATTENDANCE & CHECK-INS</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Real-time gate check-ins, peak floor capacity monitor, and scan verification logs.</p>
        </div>

        <button className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] flex items-center gap-2 cursor-pointer">
          <QrCode size={16} /> Simulate Scanner Check-in
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl">
          <span className="text-slate-400 text-xs font-bold uppercase">Current Athletes On Floor</span>
          <span className="text-3xl font-black text-[#00f2fe] block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>84</span>
          <span className="text-[10px] text-slate-400">Occupancy: 42% Capacity</span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl">
          <span className="text-slate-400 text-xs font-bold uppercase">Total Today Check-Ins</span>
          <span className="text-3xl font-black text-white block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>342</span>
          <span className="text-emerald-400 text-xs font-bold">+12% vs yesterday</span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl">
          <span className="text-slate-400 text-xs font-bold uppercase">Peak Operating Hours</span>
          <span className="text-xl font-black text-[#d7ff2f] block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>05:00 PM - 07:00 PM</span>
          <span className="text-[10px] text-slate-400">180 Max Capacity Expected</span>
        </div>
      </div>

      {/* Realtime Checkin Feed */}
      <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Live Gate Scanner Activity Log
        </h3>

        <div className="space-y-3">
          {checkInLogs.map((log) => (
            <div key={log.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <Image src={log.avatar} alt={log.name} width={40} height={40} className="rounded-full object-cover border border-[#00f2fe]" />
                <div>
                  <h4 className="text-sm font-bold text-white">{log.name}</h4>
                  <span className="text-xs text-[#00f2fe] font-semibold">{log.plan}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400 block">{log.time}</span>
                <span className="text-[10px] text-slate-400">{log.method}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
