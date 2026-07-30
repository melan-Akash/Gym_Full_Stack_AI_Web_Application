"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TRAINER_CLIENTS, ClientProfile } from "@/lib/dashboardData";
import { Search, Filter, Plus, ChevronRight, UserCheck, Activity } from "lucide-react";

export default function TrainerClientsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const clients = TRAINER_CLIENTS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.program.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            MY CLIENTS <span className="text-[#d7ff2f]">({clients.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Manage personal training roster, view biometric logs and program assignments.</p>
        </div>

        <button className="px-5 py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#c8f020] transition-all flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          <Plus size={16} />
          Assign New Client
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#12151c] p-4 rounded-xl border border-white/10">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by client name or program..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-slate-400" />
          {["All", "Active", "Pending", "Paused"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                filterStatus === st
                  ? "bg-[#d7ff2f] text-[#0b0b0b]"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#d7ff2f]/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{client.name}</h3>
                    <p className="text-[11px] text-slate-400">{client.email}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase rounded-md">
                  {client.status}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Program:</span>
                  <span className="font-bold text-[#00f2fe]">{client.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Goal:</span>
                  <span className="font-semibold text-slate-200">{client.goal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Weight:</span>
                  <span className="font-bold text-white">{client.weight} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Attendance Rate:</span>
                  <span className="font-bold text-[#d7ff2f]">{client.attendanceRate}%</span>
                </div>
              </div>
            </div>

            <Link
              href={`/dashboard/trainer/clients/${client.id}`}
              className="w-full py-2.5 bg-white/5 border border-white/15 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Manage Client Profile
              <ChevronRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
