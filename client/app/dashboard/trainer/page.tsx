"use client";

import Link from "next/link";
import Image from "next/image";
import { TRAINER_CLIENTS, BOOKING_SESSIONS, WORKOUT_TEMPLATES } from "@/lib/dashboardData";
import { Users, Dumbbell, CalendarDays, TrendingUp, ArrowUpRight, CheckCircle2, Clock, Plus, Sparkles } from "lucide-react";

export default function TrainerDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-linear-to-r from-[#181b26] via-[#141722] to-[#0b0b0b] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d7ff2f]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <span className="text-[#d7ff2f] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 font-heading">
            <Sparkles size={14} />
            Trainer Control Center
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            WELCOME BACK, <span className="text-[#d7ff2f]">COACH MARCUS</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            You have <span className="text-white font-bold">3 sessions scheduled today</span> and 2 pending client workout plan approvals.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10 shrink-0">
          <Link
            href="/dashboard/trainer/workout-builder"
            className="px-4 py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#c8f020] transition-all flex items-center gap-2 cursor-pointer"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <Plus size={16} />
            New Workout Plan
          </Link>
          <Link
            href="/dashboard/trainer/meal-builder"
            className="px-4 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            Create Meal Plan
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Active Clients</span>
            <div className="w-9 h-9 rounded-xl bg-[#d7ff2f]/10 border border-[#d7ff2f]/30 flex items-center justify-center text-[#d7ff2f]">
              <Users size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              24
            </span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-0.5">
              <TrendingUp size={12} /> +3 this month
            </span>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Sessions This Week</span>
            <div className="w-9 h-9 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe]">
              <CalendarDays size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              18
            </span>
            <span className="text-slate-400 text-xs">Completed: 12</span>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Client Attendance</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              96.4%
            </span>
            <span className="text-emerald-400 text-xs font-bold">+1.2%</span>
          </div>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              $14,200
            </span>
            <span className="text-emerald-400 text-xs font-bold">+18.5%</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Today's Bookings & Assigned Clients */}
        <div className="lg:col-span-8 space-y-8">
          {/* Today's Schedule */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Today&apos;s Training Schedule
                </h3>
                <p className="text-xs text-slate-400">July 31, 2026</p>
              </div>
              <Link
                href="/dashboard/trainer/calendar"
                className="text-xs text-[#d7ff2f] hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
              >
                Full Calendar <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {BOOKING_SESSIONS.map((session) => (
                <div key={session.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <Image
                      src={session.clientAvatar}
                      alt={session.clientName}
                      width={44}
                      height={44}
                      className="rounded-full object-cover border border-white/15"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{session.clientName}</h4>
                      <p className="text-xs text-slate-400">{session.sessionType}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="flex items-center gap-1 text-xs font-mono text-[#00f2fe] font-bold">
                      <Clock size={13} /> {session.time}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded mt-1 inline-block ${
                        session.status === "Confirmed"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Active Clients */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Assigned Clients Overview
              </h3>
              <Link
                href="/dashboard/trainer/clients"
                className="text-xs text-[#d7ff2f] hover:underline font-bold uppercase tracking-wider"
              >
                View All Clients
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRAINER_CLIENTS.map((client) => (
                <div key={client.id} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <Image
                      src={client.avatar}
                      alt={client.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border border-white/15"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{client.name}</h4>
                      <span className="text-[10px] text-[#00f2fe] uppercase font-bold">{client.program}</span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Weight:</span>
                      <span className="font-bold text-white">{client.weight} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Attendance:</span>
                      <span className="font-bold text-[#d7ff2f]">{client.attendanceRate}%</span>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/trainer/clients/${client.id}`}
                    className="block w-full text-center py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-200 rounded-lg transition-all"
                  >
                    View Full Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Workout Plans Quick Access */}
        <div className="lg:col-span-4 space-y-8">
          {/* Active Workout Templates */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Workout Templates
              </h3>
              <Link
                href="/dashboard/trainer/workout-builder"
                className="text-xs text-[#d7ff2f] font-bold uppercase"
              >
                + New
              </Link>
            </div>

            <div className="space-y-3">
              {WORKOUT_TEMPLATES.map((wt) => (
                <div key={wt.id} className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{wt.title}</h4>
                    <span className="text-[9px] bg-[#d7ff2f]/20 text-[#d7ff2f] px-2 py-0.5 rounded font-bold uppercase">
                      {wt.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{wt.durationMinutes} Mins</span>
                    <span>{wt.exercises.length} Exercises</span>
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
