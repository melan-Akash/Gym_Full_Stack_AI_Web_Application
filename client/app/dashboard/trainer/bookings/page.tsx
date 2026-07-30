"use client";

import { useState } from "react";
import Image from "next/image";
import { BOOKING_SESSIONS, BookingSession } from "@/lib/dashboardData";
import { CalendarDays, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function TrainerBookingsPage() {
  const [bookings, setBookings] = useState<BookingSession[]>(BOOKING_SESSIONS);

  const updateStatus = (id: string, newStatus: "Confirmed" | "Cancelled") => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          SESSION <span className="text-[#d7ff2f]">BOOKINGS</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Review incoming appointment requests, confirm time slots, and manage cancellations.</p>
      </div>

      <div className="space-y-4">
        {bookings.map((session) => (
          <div key={session.id} className="bg-[#12151c] border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image src={session.clientAvatar} alt={session.clientName} width={48} height={48} className="rounded-full object-cover border border-white/15" />
              <div>
                <h3 className="text-base font-bold text-white">{session.clientName}</h3>
                <p className="text-xs text-[#00f2fe] font-semibold">{session.sessionType}</p>
                <div className="flex items-center gap-4 text-slate-400 text-xs mt-1">
                  <span className="flex items-center gap-1 font-mono text-slate-300">
                    <CalendarDays size={14} className="text-[#d7ff2f]" /> {session.date}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-slate-300">
                    <Clock size={14} className="text-[#d7ff2f]" /> {session.time}
                  </span>
                </div>
                {session.notes && <p className="text-[11px] text-slate-400 italic mt-1">&ldquo;{session.notes}&rdquo;</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
              <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                session.status === "Confirmed" ? "bg-emerald-500/20 text-emerald-400" :
                session.status === "Pending" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
              }`}>
                {session.status}
              </span>

              {session.status === "Pending" && (
                <>
                  <button
                    onClick={() => updateStatus(session.id, "Confirmed")}
                    className="px-4 py-2 bg-[#d7ff2f] text-[#0b0b0b] font-bold text-xs uppercase rounded-lg hover:bg-[#c8f020] transition-all cursor-pointer"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(session.id, "Cancelled")}
                    className="px-4 py-2 bg-white/5 border border-white/15 text-slate-300 hover:text-white font-bold text-xs uppercase rounded-lg transition-all cursor-pointer"
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
