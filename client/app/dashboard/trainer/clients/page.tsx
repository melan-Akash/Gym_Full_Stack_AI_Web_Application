"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/appcontext";
import { Search, ChevronRight } from "lucide-react";

export default function TrainerClientsPage() {
  const { trainerGetClients } = useAppContext();

  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await trainerGetClients();
        if (data && data.length > 0) setClients(data);
      } catch (err) {
        console.log("Using static clients fallback");
      }
    }
    loadClients();
  }, []);

  const filteredClients = clients.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          ASSIGNED <span className="text-[#d7ff2f]">ATHLETES ROSTER ({filteredClients.length})</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Live MongoDB athlete roster assigned to Head Coach Marcus Vance.</p>
      </div>

      {/* Search */}
      <div className="bg-[#12151c] border border-white/10 p-4 rounded-xl flex items-center gap-3">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search assigned athlete by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClients.map((client, idx) => (
          <div key={client._id || idx} className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-4 hover:border-[#d7ff2f]/40 transition-all">
            <div className="flex items-center gap-3.5">
              <Image src={client.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"} alt="Athlete" width={48} height={48} className="rounded-full object-cover border border-[#d7ff2f]" />
              <div>
                <h3 className="text-base font-bold text-white">{client.name}</h3>
                <span className="text-xs text-[#d7ff2f] font-semibold">{client.membershipTier || "VIP Elite"}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 text-xs text-slate-300 space-y-1">
              <p>Email: <span className="text-white">{client.email}</span></p>
              <p>Status: <span className="text-emerald-400 font-bold uppercase">{client.status || "Active"}</span></p>
            </div>

            <Link
              href={`/dashboard/trainer/clients/${client._id || "c-001"}`}
              className="w-full py-2.5 bg-white/5 border border-white/15 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-white text-xs font-bold uppercase rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Open Athlete Profile <ChevronRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
