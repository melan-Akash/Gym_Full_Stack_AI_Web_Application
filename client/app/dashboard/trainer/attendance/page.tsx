"use client";

import { useState } from "react";
import Image from "next/image";
import { TRAINER_CLIENTS } from "@/lib/dashboardData";
import { CheckCircle2, XCircle, Clock, Calendar, Search } from "lucide-react";

export default function TrainerAttendancePage() {
  const [search, setSearch] = useState("");

  const attendanceLog = [
    { id: "a1", clientName: "David Miller", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80", date: "2026-07-30", time: "09:00 AM", session: "Hypertrophy Push Day", status: "Present" },
    { id: "a2", clientName: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80", date: "2026-07-30", time: "11:00 AM", session: "Full Body Recomp", status: "Present" },
    { id: "a3", clientName: "Alex Thorne", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80", date: "2026-07-29", time: "04:00 PM", session: "Metabolic HIIT", status: "Present" },
    { id: "a4", clientName: "Chloe Bennett", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80", date: "2026-07-28", time: "10:00 AM", session: "Mobility Flow", status: "Excused" },
  ];

  const filteredLogs = attendanceLog.filter((log) => log.clientName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          CLIENT <span className="text-[#d7ff2f]">ATTENDANCE LOG</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Track check-ins, attendance consistency, and missed sessions for your roster.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl">
          <span className="text-slate-400 text-xs uppercase font-bold">Overall Attendance</span>
          <span className="text-3xl font-black text-[#d7ff2f] block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>95.8%</span>
        </div>
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl">
          <span className="text-slate-400 text-xs uppercase font-bold">Sessions This Week</span>
          <span className="text-3xl font-black text-white block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>18</span>
        </div>
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl">
          <span className="text-slate-400 text-xs uppercase font-bold">Missed / Cancelled</span>
          <span className="text-3xl font-black text-amber-400 block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>1</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#12151c] border border-white/10 p-4 rounded-xl flex items-center gap-3">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Filter attendance by client name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-[#12151c] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4">Client</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Session Type</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-white/2">
                <td className="p-4 flex items-center gap-3">
                  <Image src={log.avatar} alt={log.clientName} width={36} height={36} className="rounded-full object-cover" />
                  <span className="font-bold text-white">{log.clientName}</span>
                </td>
                <td className="p-4 font-mono">
                  {log.date} <span className="text-slate-400 text-[10px]">({log.time})</span>
                </td>
                <td className="p-4">{log.session}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                    log.status === "Present" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
