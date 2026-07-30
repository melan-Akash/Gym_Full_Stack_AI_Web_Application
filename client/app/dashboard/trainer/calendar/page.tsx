"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";

export default function TrainerCalendarPage() {
  const [currentMonth] = useState("July 2026");

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const events: Record<number, { title: string; time: string; type: string }[]> = {
    31: [
      { title: "David Miller - Hypertrophy", time: "09:00 AM", type: "1-on-1" },
      { title: "Sarah Jenkins - Body Fat Check", time: "11:00 AM", type: "Assessment" },
    ],
    28: [{ title: "Alex Thorne - HIIT", time: "04:00 PM", type: "1-on-1" }],
    25: [{ title: "Chloe Bennett - Mobility", time: "10:00 AM", type: "1-on-1" }],
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            TRAINING <span className="text-[#d7ff2f]">SCHEDULE & CALENDAR</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Interactive monthly availability, personal client appointments, and group sessions.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#12151c] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white">
            <ChevronLeft size={16} className="cursor-pointer hover:text-[#d7ff2f]" />
            <span>{currentMonth}</span>
            <ChevronRight size={16} className="cursor-pointer hover:text-[#d7ff2f]" />
          </div>
          <button className="px-4 py-2 bg-[#d7ff2f] text-[#0b0b0b] font-bold text-xs uppercase rounded-xl hover:bg-[#c8f020] flex items-center gap-1.5 cursor-pointer">
            <Plus size={14} /> Add Slot
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6">
        {/* Days Header */}
        <div className="grid grid-cols-7 text-center text-xs font-bold uppercase text-slate-400 pb-4 border-b border-white/10">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Month Grid */}
        <div className="grid grid-cols-7 gap-2 pt-4">
          {daysInMonth.map((day) => {
            const dayEvents = events[day] || [];
            const isToday = day === 31;
            return (
              <div
                key={day}
                className={`min-h-24 p-2 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                  isToday
                    ? "bg-[#d7ff2f]/10 border-[#d7ff2f]"
                    : "bg-white/5 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono font-bold ${isToday ? "text-[#d7ff2f]" : "text-slate-300"}`}>
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                  )}
                </div>

                <div className="space-y-1">
                  {dayEvents.map((ev, idx) => (
                    <div key={idx} className="bg-black/60 border border-white/10 p-1.5 rounded text-[10px] space-y-0.5">
                      <p className="font-bold text-white truncate">{ev.title}</p>
                      <p className="text-slate-400 text-[9px]">{ev.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
