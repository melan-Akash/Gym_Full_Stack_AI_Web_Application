"use client";

import Link from "next/link";
import Image from "next/image";
import { ADMIN_STATS, ADMIN_MEMBERS, ADMIN_TRAINERS, PAYMENT_TRANSACTIONS } from "@/lib/adminData";
import { Users, DollarSign, UserCheck, TrendingUp, CheckSquare, ShieldCheck, ArrowUpRight, Plus, Bell } from "lucide-react";

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-linear-to-r from-[#181b26] via-[#141722] to-[#0b0b0b] border border-[#00f2fe]/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00f2fe]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <span className="text-[#00f2fe] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 font-heading">
            <ShieldCheck size={14} />
            Master Facility Command Center
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            FACILITY OVERVIEW & <span className="text-[#00f2fe]">LIVE METRICS</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Total monthly revenue reached <span className="text-white font-bold">$84,250</span> (+14.8%). 342 active check-ins recorded today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10 shrink-0">
          <Link
            href="/dashboard/admin/members"
            className="px-4 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <Plus size={16} />
            Add New Member
          </Link>
          <Link
            href="/dashboard/admin/notifications"
            className="px-4 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Bell size={16} />
            Broadcast Alert
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Total Gym Members</span>
            <div className="w-9 h-9 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe]">
              <Users size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {ADMIN_STATS.totalMembers}
            </span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
              <TrendingUp size={12} /> +42 this week
            </span>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              ${ADMIN_STATS.monthlyRevenue.toLocaleString()}
            </span>
            <span className="text-emerald-400 text-xs font-bold">+{ADMIN_STATS.revenueGrowthPercent}%</span>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Active Trainers</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <UserCheck size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {ADMIN_STATS.trainersCount}
            </span>
            <span className="text-slate-400 text-xs">All Certified</span>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Today Check-Ins</span>
            <div className="w-9 h-9 rounded-xl bg-[#d7ff2f]/10 border border-[#d7ff2f]/30 flex items-center justify-center text-[#d7ff2f]">
              <CheckSquare size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              {ADMIN_STATS.todayCheckIns}
            </span>
            <span className="text-[#d7ff2f] text-xs font-bold">Peak: 5-7 PM</span>
          </div>
        </div>
      </div>

      {/* Main Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Members & Recent Transactions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Members Table Preview */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Recent Member Registrations
              </h3>
              <Link
                href="/dashboard/admin/members"
                className="text-xs text-[#00f2fe] hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
              >
                All Members <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Member</th>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Assigned Trainer</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ADMIN_MEMBERS.map((mem) => (
                    <tr key={mem.id} className="hover:bg-white/2">
                      <td className="p-3 flex items-center gap-3">
                        <Image src={mem.avatar} alt={mem.name} width={32} height={32} className="rounded-full object-cover" />
                        <div>
                          <span className="font-bold text-white block">{mem.name}</span>
                          <span className="text-[10px] text-slate-400">{mem.email}</span>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-[#00f2fe]">{mem.plan}</td>
                      <td className="p-3 text-slate-300">{mem.trainerAssigned}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          mem.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                        }`}>
                          {mem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments Log */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Recent Financial Ledger
              </h3>
              <Link
                href="/dashboard/admin/payments"
                className="text-xs text-[#00f2fe] hover:underline font-bold uppercase"
              >
                Full Payments History
              </Link>
            </div>

            <div className="space-y-3">
              {PAYMENT_TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={tx.memberAvatar} alt={tx.memberName} width={36} height={36} className="rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{tx.memberName}</h4>
                      <p className="text-[10px] text-slate-400">{tx.invoiceId} • {tx.planName}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-white block font-mono">${tx.amount.toFixed(2)}</span>
                    <span className={`text-[10px] font-bold uppercase ${tx.status === "Paid" ? "text-emerald-400" : "text-red-400"}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Trainers Overview */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Top Performing Trainers
              </h3>
              <Link href="/dashboard/admin/trainers" className="text-xs text-[#00f2fe] font-bold">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {ADMIN_TRAINERS.map((tr) => (
                <div key={tr.id} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src={tr.avatar} alt={tr.name} width={36} height={36} className="rounded-full object-cover border border-[#00f2fe]" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{tr.name}</h4>
                      <p className="text-[10px] text-slate-400">{tr.clientsCount} Active Clients</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">${tr.monthlyRevenueGenerated.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
