"use client";

import { useState } from "react";
import Image from "next/image";
import { ADMIN_TRAINERS, AdminTrainer } from "@/lib/adminData";
import { UserPlus, Star, DollarSign, Users, Award, ShieldCheck } from "lucide-react";

export default function AdminTrainersPage() {
  const [trainers] = useState<AdminTrainer[]>(ADMIN_TRAINERS);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            TRAINERS <span className="text-[#00f2fe]">MANAGEMENT ({trainers.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Manage head coaches, client load distribution, satisfaction scores, and revenue generated.</p>
        </div>

        <button className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          <UserPlus size={16} /> Hire / Add Trainer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainers.map((tr) => (
          <div key={tr.id} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#00f2fe]/40 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Image src={tr.avatar} alt={tr.name} width={56} height={56} className="rounded-full object-cover border-2 border-[#00f2fe]" />
                <div>
                  <h3 className="text-lg font-bold text-white">{tr.name}</h3>
                  <p className="text-xs text-[#00f2fe] font-semibold">{tr.specialization}</p>
                  <p className="text-[11px] text-slate-400">{tr.email}</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase rounded">
                {tr.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-white/5 border border-white/10 p-3 rounded-xl text-center text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Clients</span>
                <span className="text-base font-black text-white">{tr.clientsCount}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Rating</span>
                <span className="text-base font-black text-amber-400 flex items-center justify-center gap-1">
                  <Star size={12} className="fill-amber-400" /> {tr.rating}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Revenue</span>
                <span className="text-base font-black text-emerald-400 font-mono">${tr.monthlyRevenueGenerated.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-200 rounded-lg transition-all">
                Audit Performance
              </button>
              <button className="py-2 px-3 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-200 rounded-lg">
                Edit Rate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
