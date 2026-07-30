"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appcontext";
import { MEMBERSHIP_PLANS } from "@/lib/adminData";
import { CreditCard, Check, Plus, Edit2, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMembershipPlansPage() {
  const { adminGetMembershipPlans, adminCreateMembershipPlan } = useAppContext();

  const [plans, setPlans] = useState<any[]>(MEMBERSHIP_PLANS);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(99);
  const [billingPeriod, setBillingPeriod] = useState("Monthly");
  const [featureInput, setFeatureInput] = useState("Unlimited Access, Sauna & Plunge");
  const [isPopular, setIsPopular] = useState(false);

  const fetchPlans = async () => {
    try {
      const data = await adminGetMembershipPlans();
      if (data && data.length > 0) setPlans(data);
    } catch (err) {
      console.log("Using fallback plans");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const features = featureInput.split(",").map((f) => f.trim());
      await adminCreateMembershipPlan({
        title,
        price,
        billingPeriod,
        features,
        isPopular,
      });

      setLoading(false);
      toast.success(`Plan "${title}" saved to MongoDB database!`, {
        icon: "⚡",
      });
      fetchPlans();

      setModalOpen(false);
      setTitle("");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to create plan");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            MEMBERSHIP <span className="text-[#00f2fe]">PLANS & TIERS ({plans.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Live MongoDB pricing packages, feature toggles, and subscriber analytics.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Plus size={16} /> Create New Plan Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={plan._id || plan.id || idx}
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
                <span className="text-xs text-slate-400 font-medium">{plan.activeSubscribers || 0} Active Members</span>
              </div>

              <div>
                <span className="text-4xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  ${plan.price}
                </span>
                <span className="text-xs text-slate-400 font-normal"> / {plan.billingPeriod?.toLowerCase() || "monthly"}</span>
              </div>

              <ul className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-slate-300">
                {plan.features?.map((feat: string, fIdx: number) => (
                  <li key={fIdx} className="flex items-start gap-2">
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141722] border border-white/20 p-6 rounded-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Create Membership Plan
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePlan} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Performance"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Price ($)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Features (Comma Separated)</label>
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="rounded text-[#00f2fe]"
                />
                Mark as Most Popular Tier
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase rounded-lg hover:bg-[#00d0e0] transition-all cursor-pointer mt-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {loading ? "Creating..." : "Save Plan to MongoDB"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
