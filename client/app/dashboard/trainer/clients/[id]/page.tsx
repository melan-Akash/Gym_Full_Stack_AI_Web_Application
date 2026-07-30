"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TRAINER_CLIENTS } from "@/lib/dashboardData";
import { ArrowLeft, Dumbbell, Utensils, Calendar, CheckCircle2, Award, Activity, Save } from "lucide-react";

export default function TrainerClientDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const client = TRAINER_CLIENTS.find((c) => c.id === resolvedParams.id) || TRAINER_CLIENTS[0];
  const [notes, setNotes] = useState(client.notes);
  const [saved, setSaved] = useState(false);

  const handleSaveNotes = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb */}
      <Link
        href="/dashboard/trainer/clients"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#d7ff2f] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Clients Roster
      </Link>

      {/* Header Profile Card */}
      <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Image
            src={client.avatar}
            alt={client.name}
            width={72}
            height={72}
            className="rounded-full object-cover border-2 border-[#d7ff2f]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {client.name}
              </h1>
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase rounded">
                {client.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{client.email} • {client.phone}</p>
            <p className="text-xs text-[#00f2fe] font-bold mt-0.5">Program: {client.program}</p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Link
            href="/dashboard/trainer/workout-builder"
            className="flex-1 md:flex-initial px-4 py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#c8f020] transition-all text-center flex items-center justify-center gap-2"
          >
            <Dumbbell size={15} /> Update Workout
          </Link>
          <Link
            href="/dashboard/trainer/meal-builder"
            className="flex-1 md:flex-initial px-4 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
          >
            <Utensils size={15} /> Update Meal Plan
          </Link>
        </div>
      </div>

      {/* Biometric Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#12151c] border border-white/10 p-4 rounded-xl text-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase">Current Weight</span>
          <span className="text-2xl font-black text-white block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {client.weight} lbs
          </span>
          <span className="text-[10px] text-slate-500">Target: {client.targetWeight} lbs</span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-4 rounded-xl text-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase">Body Fat %</span>
          <span className="text-2xl font-black text-[#00f2fe] block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {client.bodyFat}%
          </span>
          <span className="text-[10px] text-slate-500">Pinch Caliper Log</span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-4 rounded-xl text-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase">Height</span>
          <span className="text-2xl font-black text-white block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {client.height}
          </span>
          <span className="text-[10px] text-slate-500">Verified</span>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-4 rounded-xl text-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase">Attendance</span>
          <span className="text-2xl font-black text-[#d7ff2f] block mt-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {client.attendanceRate}%
          </span>
          <span className="text-[10px] text-slate-500">30-Day Check-in</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Assigned Plans & Recent Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Workout & Meal Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#d7ff2f] font-bold text-xs uppercase">
                <Dumbbell size={16} /> Active Workout Plan
              </div>
              <h4 className="text-base font-bold text-white">{client.workoutPlan}</h4>
              <p className="text-xs text-slate-400">6-Day Progressive Overload Protocol</p>
            </div>

            <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#00f2fe] font-bold text-xs uppercase">
                <Utensils size={16} /> Active Meal Plan
              </div>
              <h4 className="text-base font-bold text-white">{client.mealPlan}</h4>
              <p className="text-xs text-slate-400">4-Meal Split with Intra-workout Carbs</p>
            </div>
          </div>

          {/* Workout History */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Recent Training Logs
            </h3>
            <div className="space-y-3">
              {client.recentWorkouts.map((rw, index) => (
                <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{rw.workoutName}</h4>
                      <span className="text-[11px] text-slate-400">{rw.date} • {rw.duration}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase rounded">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Coach Notes */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Trainer Notes & Audit
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
              placeholder="Record client observation notes, joint issues, or form adjustments..."
            />
            <button
              onClick={handleSaveNotes}
              className="w-full py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#c8f020] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save size={14} />
              {saved ? "Notes Saved!" : "Save Client Notes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
