"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ADMIN_MEMBERS } from "@/lib/adminData";
import { ArrowLeft, ShieldCheck, CreditCard, UserCheck, Clock, Award } from "lucide-react";

export default function AdminMemberDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const member = ADMIN_MEMBERS.find((m) => m.id === resolvedParams.id) || ADMIN_MEMBERS[0];

  return (
    <div className="space-y-8">
      <Link
        href="/dashboard/admin/members"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#00f2fe] transition-colors"
      >
        <ArrowLeft size={16} /> Back to Members Directory
      </Link>

      <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Image src={member.avatar} alt={member.name} width={72} height={72} className="rounded-full object-cover border-2 border-[#00f2fe]" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {member.name}
              </h1>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                member.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
              }`}>
                {member.status}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase ${
                (member.paymentStatus || "Paid") === "Paid" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}>
                Payment: {member.paymentStatus || "Paid"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{member.email} • {member.phone}</p>
            <p className="text-xs text-[#00f2fe] font-bold mt-0.5">Tier: {member.plan}</p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button className="px-4 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-bold text-xs uppercase rounded-xl hover:bg-[#00d0e0] transition-all">
            Renew Membership
          </button>
          <button className="px-4 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase rounded-xl hover:bg-white/10 transition-all">
            Assign Trainer
          </button>
        </div>
      </div>

      {/* Details Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-bold uppercase">Membership Period</span>
          <p className="text-sm font-mono font-bold text-white">Joined: {member.joinedDate}</p>
          <p className="text-xs font-mono text-[#00f2fe]">Expires: {member.expiryDate}</p>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-bold uppercase">Assigned Personal Trainer</span>
          <p className="text-base font-bold text-white">{member.trainerAssigned}</p>
          <p className="text-xs text-slate-400">1-on-1 Coaching</p>
        </div>

        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-bold uppercase">Total Lifetime Spend</span>
          <p className="text-2xl font-black text-emerald-400" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            ${member.totalSpent}
          </p>
          <p className="text-xs text-slate-500">Verified Payments</p>
        </div>
      </div>
    </div>
  );
}
