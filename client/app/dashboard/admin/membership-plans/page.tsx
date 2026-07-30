"use client";

import { useState } from "react";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/lib/adminData";
import { CreditCard, Check, Plus, Edit2, Sparkles } from "lucide-react";

export default function AdminMembershipPlansPage() {
  const [plans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            MEMBERSHIP <span className="text-[#00f2fe]">PLANS & TIERS</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Configure pricing packages, features breakdown, and active subscribers per tier.</p>
        </div>

        <button className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          <Plus size={16} /> Create New Plan Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-[#12151c] border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden space-y-6 ${
              plan.isPopular ? "border-[#00f2fe] shadow-[0_0_30px_rgba(0,242,254,0.15)]" : "border-white/10"
            }`}
          >
            {plan.isPopular && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-[#00f2fe] text-[#0b0b0b] text-[10px] font-black uppercase rounded-full">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {plan.title}
                </h3>
                <span className="text-xs text-slate-400 font-medium">{plan.activeSubscribers} Active Members</span>
              </div>

              <div>
                <span className="text-4xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  ${plan.price}
                </span>
                <span className="text-xs text-slate-400 font-normal"> / {plan.billingPeriod.toLowerCase()}</span>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-slate-300">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={14} className="text-[#00f2fe] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-2.5 bg-white/5 border border-white/15 hover:bg-[#00f2fe] hover:text-[#0b0b0b] text-white text-xs font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2">
              <Edit2 size={14} /> Edit Plan Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
