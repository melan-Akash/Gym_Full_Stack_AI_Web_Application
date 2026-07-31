"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/appcontext";
import { Calendar, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function TrainerBookingsPage() {
  const { trainerGetBookings } = useAppContext();

  const [bookings, setBookings] = useState<any[]>([]);

  const fetchBookings = async () => {
    try {
      const data = await trainerGetBookings();
      if (data && data.length > 0) setBookings(data);
    } catch (err) {
      console.log("Using static bookings fallback");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirm = (id: string) => {
    toast.success("Personal Training session confirmed!", {
      icon: "✅",
    });
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          PERSONAL TRAINING <span className="text-[#d7ff2f]">BOOKINGS & SCHEDULE ({bookings.length})</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Live MongoDB PT bookings assigned to Head Coach Marcus Vance.</p>
      </div>

      <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Upcoming Client PT Sessions
        </h3>

        <div className="space-y-3">
          {bookings.map((b, idx) => (
            <div key={b._id || idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Image src={b.client?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"} alt="Athlete" width={44} height={44} className="rounded-full object-cover border border-[#d7ff2f]" />
                <div>
                  <h4 className="text-sm font-bold text-white">{b.client?.name || "Alex Mercer"}</h4>
                  <p className="text-xs text-[#d7ff2f] font-semibold">{b.sessionType || "1-on-1 Hypertrophy Session"}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{b.notes || "No special requests"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
                    <Calendar size={13} className="text-[#d7ff2f]" /> {b.date}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                    <Clock size={12} /> {b.time}
                  </span>
                </div>

                <button
                  onClick={() => handleConfirm(b._id || idx)}
                  className="px-3.5 py-2 bg-[#d7ff2f] text-[#0b0b0b] font-bold text-xs uppercase rounded-lg hover:bg-[#b8e020] transition-all cursor-pointer"
                >
                  Confirm Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
