"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/appcontext";
import { Users, Dumbbell, Calendar, Star, Plus, ArrowUpRight, ShieldCheck, Sparkles, Utensils } from "lucide-react";

export default function TrainerDashboardOverview() {
  const { trainerGetStats, trainerGetClients, trainerGetBookings } = useAppContext();

  const [stats, setStats] = useState<any>({
    activeClients: 24,
    workoutsCreated: 18,
    mealPlansCreated: 14,
    upcomingBookings: 8,
    monthlyEarnings: 14200,
    clientSatisfaction: 98.4,
  });

  const [clients, setClients] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function loadTrainerData() {
      try {
        const liveStats = await trainerGetStats();
        if (liveStats) setStats(liveStats);

        const liveClients = await trainerGetClients();
        if (liveClients && liveClients.length > 0) setClients(liveClients);

        const liveBookings = await trainerGetBookings();
        if (liveBookings && liveBookings.length > 0) setBookings(liveBookings);
      } catch (err) {
        console.log("Using static trainer fallback");
      }
    }
    loadTrainerData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-[#1b2210] via-[#141a0d] to-[#0b0b0b] border border-[#d7ff2f]/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d7ff2f]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <span className="text-[#d7ff2f] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 font-heading">
            <ShieldCheck size={14} />
            Master Trainer Operations Suite (Marcus Vance)
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            HEAD COACH <span className="text-[#d7ff2f]">COMMAND CENTER</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            You currently manage <span className="text-white font-bold">{stats.activeClients} active athletes</span>. Monthly trainer earnings: <span className="text-[#d7ff2f] font-bold">${stats.monthlyEarnings?.toLocaleString()}</span>.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10 shrink-0">
          <Link
            href="/dashboard/trainer/workout-builder"
            className="px-4 py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#b8e020] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <Sparkles size={16} />
            AI Workout Builder
          </Link>
          <Link
            href="/dashboard/trainer/meal-builder"
            className="px-4 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Utensils size={16} />
            AI Meal Builder
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Assigned Athletes</span>
            <div className="w-9 h-9 rounded-xl bg-[#d7ff2f]/10 border border-[#d7ff2f]/30 flex items-center justify-center text-[#d7ff2f]">
              <Users size={18} />
            </div>
          </div>
          <span className="text-3xl font-black text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {stats.activeClients}
          </span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Routines Created</span>
            <div className="w-9 h-9 rounded-xl bg-[#00f2fe]/10 border border-[#00f2fe]/30 flex items-center justify-center text-[#00f2fe]">
              <Dumbbell size={18} />
            </div>
          </div>
          <span className="text-3xl font-black text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {stats.workoutsCreated}
          </span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Today Sessions</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Calendar size={18} />
            </div>
          </div>
          <span className="text-3xl font-black text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {stats.upcomingBookings}
          </span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold">Coach Rating</span>
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Star size={18} />
            </div>
          </div>
          <span className="text-3xl font-black text-white block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            4.9 / 5.0
          </span>
        </div>
      </div>

      {/* Main Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Assigned Clients */}
        <div className="lg:col-span-7 bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Assigned Athletes Roster
            </h3>
            <Link href="/dashboard/trainer/clients" className="text-xs text-[#d7ff2f] hover:underline font-bold uppercase flex items-center gap-1">
              View All Roster <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {clients.slice(0, 4).map((client, idx) => (
              <div key={client._id || idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <Image src={client.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"} alt="Client" width={40} height={40} className="rounded-full object-cover border border-[#d7ff2f]" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{client.name}</h4>
                    <span className="text-xs text-[#d7ff2f] font-semibold">{client.membershipTier || "VIP Elite"}</span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/trainer/clients/${client._id || "c-001"}`}
                  className="px-3 py-1.5 bg-white/5 border border-white/15 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-xs font-bold uppercase rounded-lg transition-all"
                >
                  Manage Client
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming PT Sessions */}
        <div className="lg:col-span-5 bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Today PT Sessions
            </h3>
            <Link href="/dashboard/trainer/bookings" className="text-xs text-[#d7ff2f] hover:underline font-bold uppercase">
              Schedule
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.map((b, idx) => (
              <div key={b._id || idx} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">{b.client?.name || "Alex Mercer"}</span>
                  <span className="text-[10px] text-slate-400">{b.sessionType || "1-on-1 Hypertrophy"}</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#d7ff2f]">{b.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
