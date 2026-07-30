"use client";

import { TrendingUp, Activity, BarChart2, PieChart, Users, DollarSign } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          VISUAL <span className="text-[#00f2fe]">ANALYTICS</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Growth trends, facility usage heatmaps, and revenue forecasting.</p>
      </div>

      {/* Visual Chart Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Monthly Revenue Trajectory ($)
            </h3>
            <span className="text-xs text-emerald-400 font-bold font-mono">+14.8% YoY</span>
          </div>

          {/* Simple Visual Bar Graph */}
          <div className="h-48 flex items-end gap-3 pt-6 border-b border-white/10 pb-2">
            {[
              { month: "Jan", val: 55 },
              { month: "Feb", val: 62 },
              { month: "Mar", val: 68 },
              { month: "Apr", val: 74 },
              { month: "May", val: 79 },
              { month: "Jun", val: 81 },
              { month: "Jul", val: 84 },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-[#00f2fe]/20 border border-[#00f2fe]/50 group-hover:bg-[#00f2fe] rounded-t-lg transition-all"
                  style={{ height: `${bar.val}%` }}
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Equipment & Zone Utilization
            </h3>
            <span className="text-xs text-[#d7ff2f] font-bold">Peak Floor Load</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 font-medium">Free Weights & Power Racks</span>
                <span className="font-bold text-[#d7ff2f]">88% Utilization</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#d7ff2f] h-full w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 font-medium">Cardio & Assault Bikes</span>
                <span className="font-bold text-[#00f2fe]">72% Utilization</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#00f2fe] h-full w-[72%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-300 font-medium">Sauna & Recovery Cold Plunge</span>
                <span className="font-bold text-purple-400">95% Utilization</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full w-[95%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
