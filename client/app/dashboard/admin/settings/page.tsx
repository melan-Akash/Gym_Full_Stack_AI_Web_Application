"use client";

import { useState } from "react";
import { Settings, Shield, Lock, Globe, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [gymName, setGymName] = useState("FORGED Athletic & Performance Center");
  const [address, setAddress] = useState("100 Performance Way, Metro District");
  const [currency, setCurrency] = useState("USD ($)");
  const [taxRate, setTaxRate] = useState(8.5);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          FACILITY & SYSTEM <span className="text-[#00f2fe]">SETTINGS</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Configure gym operational profile, payment gateways, role permissions, and operating hours.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            <Globe size={16} className="text-[#00f2fe]" /> Facility Identity
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Gym Name</label>
            <input
              type="text"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#00f2fe]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Physical Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#00f2fe]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">System Currency</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-3.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Save size={16} />
          {saved ? "Settings Saved!" : "Save Facility Config"}
        </button>
      </form>
    </div>
  );
}
