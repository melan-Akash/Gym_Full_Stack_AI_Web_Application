"use client";

import { BarChart3, TrendingUp, Download, Users, DollarSign, ShieldAlert } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            BUSINESS INTELLIGENCE <span className="text-[#00f2fe]">REPORTS</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Executive summaries on membership churn rates, revenue metrics, and operational efficiency.</p>
        </div>

        <button className="px-5 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 flex items-center gap-2 cursor-pointer">
          <Download size={15} /> Download Full BI Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Revenue Sources Breakdown
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3.5 bg-white/5 rounded-xl">
              <span className="text-slate-300">Membership Subscriptions (65%)</span>
              <span className="font-bold text-[#00f2fe] font-mono">$54,760</span>
            </div>
            <div className="flex justify-between p-3.5 bg-white/5 rounded-xl">
              <span className="text-slate-300">Personal Trainer Commissions (25%)</span>
              <span className="font-bold text-[#d7ff2f] font-mono">$21,060</span>
            </div>
            <div className="flex justify-between p-3.5 bg-white/5 rounded-xl">
              <span className="text-slate-300">Supplement & Merch Sales (10%)</span>
              <span className="font-bold text-purple-400 font-mono">$8,430</span>
            </div>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Membership Retention & Churn
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between p-3.5 bg-white/5 rounded-xl">
              <span className="text-slate-300">Monthly Renewal Rate</span>
              <span className="font-bold text-emerald-400">94.2%</span>
            </div>
            <div className="flex justify-between p-3.5 bg-white/5 rounded-xl">
              <span className="text-slate-300">Monthly Churn Rate</span>
              <span className="font-bold text-amber-400">5.8%</span>
            </div>
            <div className="flex justify-between p-3.5 bg-white/5 rounded-xl">
              <span className="text-slate-300">Avg Member Lifetime (LTV)</span>
              <span className="font-bold text-white font-mono">$1,840</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
