"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ADMIN_MEMBERS } from "@/lib/adminData";
import { Search, Filter, Plus, ChevronRight, UserPlus, ShieldAlert } from "lucide-react";

export default function AdminMembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const members = ADMIN_MEMBERS.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            GYM MEMBERS DIRECTORY <span className="text-[#00f2fe]">({members.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Master list of registered gym athletes, subscription plan status, and assigned trainers.</p>
        </div>

        <button className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          <UserPlus size={16} /> Register New Member
        </button>
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#12151c] p-4 rounded-xl border border-white/10">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search member by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00f2fe]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {["All", "Active", "Expired", "Suspended"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                statusFilter === st ? "bg-[#00f2fe] text-[#0b0b0b]" : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#12151c] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Member</th>
                <th className="p-4">Membership Plan</th>
                <th className="p-4">Trainer</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {members.map((mem) => (
                <tr key={mem.id} className="hover:bg-white/2">
                  <td className="p-4 flex items-center gap-3">
                    <Image src={mem.avatar} alt={mem.name} width={40} height={40} className="rounded-full object-cover border border-white/15" />
                    <div>
                      <span className="font-bold text-white block">{mem.name}</span>
                      <span className="text-[10px] text-slate-400">{mem.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#00f2fe]">{mem.plan}</td>
                  <td className="p-4">{mem.trainerAssigned}</td>
                  <td className="p-4 font-mono">{mem.expiryDate}</td>
                  <td className="p-4 font-mono font-bold text-white">${mem.totalSpent}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      mem.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {mem.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/dashboard/admin/members/${mem.id}`}
                      className="px-3 py-1.5 bg-white/5 border border-white/15 hover:bg-[#00f2fe] hover:text-[#0b0b0b] text-xs font-bold uppercase rounded-lg transition-all inline-flex items-center gap-1"
                    >
                      Details <ChevronRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
