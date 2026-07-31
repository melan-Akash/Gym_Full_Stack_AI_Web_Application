"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appcontext";
import { MEMBERSHIP_PLANS } from "@/lib/adminData";
import { CreditCard, Check, Plus, Edit2, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMembershipPlansPage() {
  const { adminGetMembershipPlans, adminCreateMembershipPlan, adminUpdateMembershipPlan, adminDeleteMembershipPlan } = useAppContext();

  const [plans, setPlans] = useState<any[]>(MEMBERSHIP_PLANS);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Add Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(99);
  const [billingPeriod, setBillingPeriod] = useState("Monthly");
  const [featureInput, setFeatureInput] = useState("Unlimited Gym Access, Sauna & Cold Plunge, Personal Trainer Consultation");
  const [isPopular, setIsPopular] = useState(false);

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    id: "",
    title: "",
    price: 99,
    billingPeriod: "Monthly",
    featureInput: "",
    isPopular: false,
  });

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

  // CREATE Plan
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
      toast.success(`Plan "${title}" saved to database!`, { icon: "⚡" });
      fetchPlans();

      setAddModalOpen(false);
      setTitle("");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to create plan");
    }
  };

  // Open EDIT Modal
  const handleOpenEdit = (plan: any) => {
    setEditingPlan(plan);
    setEditFormData({
      id: plan._id || plan.id,
      title: plan.title || "",
      price: plan.price || 99,
      billingPeriod: plan.billingPeriod || "Monthly",
      featureInput: Array.isArray(plan.features) ? plan.features.join(", ") : plan.features || "",
      isPopular: !!plan.isPopular,
    });
  };

  // UPDATE Plan
  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const features = editFormData.featureInput.split(",").map((f) => f.trim());
      await adminUpdateMembershipPlan(editFormData.id, {
        title: editFormData.title,
        price: editFormData.price,
        billingPeriod: editFormData.billingPeriod,
        features,
        isPopular: editFormData.isPopular,
      });

      setLoading(false);
      toast.success(`Plan "${editFormData.title}" updated successfully!`);
      setEditingPlan(null);
      fetchPlans();
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to update plan");
    }
  };

  // DELETE Plan
  const handleDeletePlan = async (id: string, planTitle: string) => {
    if (!confirm(`Are you sure you want to delete membership plan "${planTitle}"?`)) return;

    try {
      await adminDeleteMembershipPlan(id);
      toast.success(`Plan "${planTitle}" deleted successfully.`);
      fetchPlans();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete plan");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            MEMBERSHIP <span className="text-[#00f2fe]">PLANS & TIERS ({plans.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Full Admin CRUD Control: Pricing packages, feature toggles, and plan creation.</p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00f2fe]/20"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Plus size={16} /> Create New Plan Tier
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const planId = plan._id || plan.id || `plan-${idx}`;
          return (
            <div
              key={planId}
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

              <div className="flex gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => handleOpenEdit(plan)}
                  className="flex-1 py-2 bg-white/5 border border-white/15 hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/40 hover:text-[#00f2fe] text-white text-xs font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Edit2 size={13} /> Edit Plan
                </button>
                <button
                  onClick={() => handleDeletePlan(planId, plan.title)}
                  className="py-2 px-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-xs font-bold text-red-400 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE PLAN MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141722] border border-white/20 p-6 rounded-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Create <span className="text-[#00f2fe]">Membership Plan</span>
              </h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-white">
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
                <label className="block text-slate-300 font-bold uppercase mb-1">Billing Period</label>
                <select
                  value={billingPeriod}
                  onChange={(e) => setBillingPeriod(e.target.value)}
                  className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Features (Comma Separated)</label>
                <textarea
                  rows={3}
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
                {loading ? "Creating..." : "Save Plan to Database"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PLAN MODAL */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141722] border border-white/20 p-6 rounded-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Edit <span className="text-[#00f2fe]">Membership Plan</span>
              </h3>
              <button onClick={() => setEditingPlan(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdatePlan} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Price ($)</label>
                <input
                  type="number"
                  required
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Billing Period</label>
                <select
                  value={editFormData.billingPeriod}
                  onChange={(e) => setEditFormData({ ...editFormData, billingPeriod: e.target.value })}
                  className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Features (Comma Separated)</label>
                <textarea
                  rows={3}
                  value={editFormData.featureInput}
                  onChange={(e) => setEditFormData({ ...editFormData, featureInput: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editFormData.isPopular}
                  onChange={(e) => setEditFormData({ ...editFormData, isPopular: e.target.checked })}
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
                {loading ? "Updating..." : "Update Plan Details"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
