"use client";

import { BarChart3, TrendingUp, Download, Users, DollarSign, Award, Calendar } from "lucide-react";

export default function TrainerReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            PERFORMANCE & <span className="text-[#d7ff2f]">REPORTS</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Analytics on client transformation progress, completed sessions, and monthly earnings breakdown.</p>
        </div>

        <button className="px-4 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer">
          <Download size={15} /> Export PDF Report
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#12151c] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold uppercase">Monthly Earnings</span>
            <DollarSign size={18} className="text-[#d7ff2f]" />
          </div>
          <span className="text-3xl font-black text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>$14,200</span>
          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><TrendingUp size={12} /> +18.5% vs last month</span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold uppercase">Completed Sessions</span>
            <Calendar size={18} className="text-[#00f2fe]" />
          </div>
          <span className="text-3xl font-black text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>168</span>
          <span className="text-slate-400 text-xs">Avg 42 sessions/week</span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs font-bold uppercase">Client Retention</span>
            <Award size={18} className="text-purple-400" />
          </div>
          <span className="text-3xl font-black text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>94.2%</span>
          <span className="text-emerald-400 text-xs font-bold">+2.4% retention</span>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Client Transformation Progress
          </h3>
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-white">David Miller (Hypertrophy)</span>
                <span className="text-[#d7ff2f]">88% Goal Achieved</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#d7ff2f] h-full rounded-full w-[88%]" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-white">Sarah Jenkins (Shred)</span>
                <span className="text-[#00f2fe]">92% Goal Achieved</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-[#00f2fe] h-full rounded-full w-[92%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Session Revenue Distribution
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-slate-300">1-on-1 Personal Training (60%)</span>
              <span className="font-bold text-white">$8,520</span>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-slate-300">Custom Meal & Workout Plans (25%)</span>
              <span className="font-bold text-white">$3,550</span>
            </div>
            <div className="flex justify-between p-3 bg-white/5 rounded-xl">
              <span className="text-slate-300">Small Group Conditioning (15%)</span>
              <span className="font-bold text-white">$2,130</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
