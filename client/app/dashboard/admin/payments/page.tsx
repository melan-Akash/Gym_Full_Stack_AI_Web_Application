"use client";

import { useState } from "react";
import Image from "next/image";
import { PAYMENT_TRANSACTIONS, PaymentTransaction } from "@/lib/adminData";
import { Receipt, Search, Download, CreditCard, DollarSign } from "lucide-react";

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [txs] = useState<PaymentTransaction[]>(PAYMENT_TRANSACTIONS);

  const filteredTxs = txs.filter((t) =>
    t.memberName.toLowerCase().includes(search.toLowerCase()) || t.invoiceId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            FINANCIAL TRANSACTIONS & <span className="text-[#00f2fe]">PAYMENTS</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Audit membership subscriptions, invoice receipts, and payment method logs.</p>
        </div>

        <button className="px-5 py-2.5 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer">
          <Download size={15} /> Export Revenue CSV
        </button>
      </div>

      {/* Search */}
      <div className="bg-[#12151c] border border-white/10 p-4 rounded-xl flex items-center gap-3">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Filter transactions by member name or invoice ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white text-xs placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-[#12151c] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Member</th>
                <th className="p-4">Plan / Description</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTxs.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/2">
                  <td className="p-4 font-mono text-slate-400 font-bold">{tx.invoiceId}</td>
                  <td className="p-4 flex items-center gap-3">
                    <Image src={tx.memberAvatar} alt={tx.memberName} width={36} height={36} className="rounded-full object-cover" />
                    <span className="font-bold text-white">{tx.memberName}</span>
                  </td>
                  <td className="p-4 font-semibold text-[#00f2fe]">{tx.planName}</td>
                  <td className="p-4 font-mono font-black text-white">${tx.amount.toFixed(2)}</td>
                  <td className="p-4 text-slate-400">{tx.paymentMethod}</td>
                  <td className="p-4 font-mono">{tx.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      tx.status === "Paid" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {tx.status}
                    </span>
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
