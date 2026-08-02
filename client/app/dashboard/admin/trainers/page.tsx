"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ADMIN_TRAINERS } from "@/lib/adminData";
import { UserPlus, Star, Trash2, Edit3, X, CheckCircle2, ShieldCheck, Upload, Loader2, DollarSign, Percent, ArrowUpRight, TrendingUp, Wallet } from "lucide-react";

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<any | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fileInputAddRef = useRef<HTMLInputElement>(null);
  const fileInputEditRef = useRef<HTMLInputElement>(null);

  const PRESET_AVATARS = [
    "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80",
  ];

  // Add Form State
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    password: "TrainerPassword123!",
    phone: "",
    title: "Certified Fitness Coach",
    category: "Bodybuilding",
    hourlyRate: 75,
    commissionRate: 20,
    monthlyRevenueGenerated: 12000,
    commissionStatus: "Collected",
    experienceYears: 5,
    bio: "Passionate fitness trainer dedicated to muscle hypertrophy and body transformation.",
    avatar: PRESET_AVATARS[0],
    specializations: "Bodybuilding, Strength Training",
  });

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    phone: "",
    title: "",
    category: "Bodybuilding",
    hourlyRate: 75,
    commissionRate: 20,
    monthlyRevenueGenerated: 12000,
    commissionStatus: "Collected",
    experienceYears: 5,
    bio: "",
    avatar: "",
    specializations: "",
  });

  const fetchTrainers = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("forged_token") : null;
      const res = await fetch("http://localhost:5000/api/admin/trainers", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setTrainers(json.data);
      } else {
        setTrainers(ADMIN_TRAINERS);
      }
    } catch (err) {
      setTrainers(ADMIN_TRAINERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Handle Image File Upload to Cloudinary
  const handleImageFileUpload = async (file: File, isEdit = false) => {
    setUploadingImage(true);
    try {
      const token = localStorage.getItem("forged_token");
      const uploadData = new FormData();
      uploadData.append("image", file);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: uploadData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        if (isEdit) {
          setEditFormData((prev) => ({ ...prev, avatar: json.url }));
        } else {
          setAddFormData((prev) => ({ ...prev, avatar: json.url }));
        }
        setNotification("Trainer photo uploaded to Cloudinary successfully!");
      } else {
        alert(json.message || "Failed to upload image.");
      }
    } catch (err: any) {
      alert("Image upload error: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // CREATE Trainer (POST)
  const handleCreateTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("forged_token");
      const res = await fetch("http://localhost:5000/api/admin/trainers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(addFormData),
      });

      const json = await res.json();
      if (json.success) {
        setNotification(`Trainer ${addFormData.name} created with ${addFormData.commissionRate}% commission rate!`);
        setShowAddModal(false);
        setAddFormData({
          name: "",
          email: "",
          password: "TrainerPassword123!",
          phone: "",
          title: "Certified Fitness Coach",
          category: "Bodybuilding",
          hourlyRate: 75,
          commissionRate: 20,
          monthlyRevenueGenerated: 12000,
          commissionStatus: "Collected",
          experienceYears: 5,
          bio: "Passionate fitness trainer dedicated to muscle hypertrophy and body transformation.",
          avatar: PRESET_AVATARS[0],
          specializations: "Bodybuilding, Strength Training",
        });
        fetchTrainers();
      } else {
        alert(json.message || "Failed to create trainer");
      }
    } catch (err: any) {
      alert("Error creating trainer: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (tr: any) => {
    setEditingTrainer(tr);
    setEditFormData({
      id: tr._id || tr.id,
      name: tr.user?.name || tr.name || "",
      phone: tr.user?.phone || tr.phone || "",
      title: tr.title || tr.specialization || "Certified Fitness Coach",
      category: tr.category || "Bodybuilding",
      hourlyRate: tr.hourlyRate || 75,
      commissionRate: tr.commissionRate ?? 20,
      monthlyRevenueGenerated: tr.monthlyRevenueGenerated ?? 12000,
      commissionStatus: tr.commissionStatus || "Collected",
      experienceYears: tr.experienceYears || 5,
      bio: tr.bio || "",
      avatar: tr.image || tr.user?.avatar || tr.avatar || PRESET_AVATARS[0],
      specializations: Array.isArray(tr.specializations) ? tr.specializations.join(", ") : tr.specializations || "",
    });
  };

  // UPDATE Trainer (PUT)
  const handleUpdateTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("forged_token");
      const res = await fetch(`http://localhost:5000/api/admin/trainers/${editFormData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(editFormData),
      });

      const json = await res.json();
      if (json.success) {
        setNotification(`Trainer ${editFormData.name} updated successfully!`);
        setEditingTrainer(null);
        fetchTrainers();
      } else {
        alert(json.message || "Failed to update trainer");
      }
    } catch (err: any) {
      alert("Error updating trainer: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // DELETE Trainer (DELETE)
  const handleDeleteTrainer = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete trainer "${name}"? This action is permanent.`)) return;
    try {
      const token = localStorage.getItem("forged_token");
      const res = await fetch(`http://localhost:5000/api/admin/trainers/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      if (json.success) {
        setNotification(`Trainer "${name}" deleted.`);
        fetchTrainers();
      }
    } catch (err: any) {
      alert("Failed to delete trainer: " + err.message);
    }
  };

  // QUICK UPDATE COMMISSION RATE / STATUS
  const handleQuickCommissionUpdate = async (id: string, newRate: number, newStatus?: string) => {
    try {
      const token = localStorage.getItem("forged_token");
      const res = await fetch(`http://localhost:5000/api/admin/trainers/${id}/commission`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          commissionRate: newRate,
          ...(newStatus && { commissionStatus: newStatus }),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotification("Trainer commission updated!");
        fetchTrainers();
      } else {
        // Fallback local update
        setTrainers((prev) =>
          prev.map((t) =>
            (t._id === id || t.id === id)
              ? { ...t, commissionRate: newRate, ...(newStatus && { commissionStatus: newStatus }) }
              : t
          )
        );
      }
    } catch (err) {
      setTrainers((prev) =>
        prev.map((t) =>
          (t._id === id || t.id === id)
            ? { ...t, commissionRate: newRate, ...(newStatus && { commissionStatus: newStatus }) }
            : t
        )
      );
    }
  };

  // CALCULATE TOTAL COMMISSION METRICS
  const totalGrossRevenue = trainers.reduce((acc, t) => acc + (t.monthlyRevenueGenerated || 12000), 0);
  const totalAdminCommission = trainers.reduce((acc, t) => {
    const rev = t.monthlyRevenueGenerated || 12000;
    const rate = t.commissionRate ?? 20;
    return acc + (rev * rate) / 100;
  }, 0);
  const totalTrainerPayout = totalGrossRevenue - totalAdminCommission;
  const avgCommissionRate = trainers.length > 0 ? (totalAdminCommission / totalGrossRevenue) * 100 : 20;

  return (
    <div className="space-y-8">
      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] p-4 rounded-xl flex items-center justify-between text-xs font-semibold shadow-lg">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={16} /> {notification}
          </span>
          <button onClick={() => setNotification(null)} className="hover:opacity-75">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            TRAINER REVENUE & <span className="text-[#00f2fe]">ADMIN COMMISSIONS</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Track Gym Admin Commission Cuts (% Revenue Share), Trainer Payout Splits, & Manage Coach Profiles.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00f2fe]/20"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <UserPlus size={16} /> Hire / Add Trainer
        </button>
      </div>

      {/* COMMISSION STATS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Admin Commission Earned */}
        <div className="bg-gradient-to-br from-[#12151c] to-[#1a2030] border border-[#00f2fe]/40 p-5 rounded-2xl space-y-2 relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Admin Commission Earned</span>
            <div className="p-2 bg-[#00f2fe]/10 rounded-lg text-[#00f2fe]">
              <DollarSign size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            ${totalAdminCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-[#00f2fe] font-bold flex items-center gap-1">
            <TrendingUp size={12} /> Gym Cut from Personal Training
          </p>
        </div>

        {/* Card 2: Total Gross Revenue */}
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Total Trainer Gross Revenue</span>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <Wallet size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white font-mono" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            ${totalGrossRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400">Combined monthly client bookings</p>
        </div>

        {/* Card 3: Trainer Net Payout */}
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Trainers Net Payout</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400 font-mono" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            ${totalTrainerPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-emerald-400/80">Net disbursed to coaches</p>
        </div>

        {/* Card 4: Avg Commission Cut % */}
        <div className="bg-[#12151c] border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-wider">Avg Admin Cut %</span>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Percent size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-400 font-mono" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {avgCommissionRate.toFixed(1)}%
          </p>
          <p className="text-[11px] text-slate-400">Configurable per trainer profile</p>
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="text-slate-400 text-sm py-12 text-center">Loading trainers from database engine...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainers.map((tr) => {
            const trId = tr._id || tr.id;
            const trName = tr.user?.name || tr.name || "Head Coach";
            const trEmail = tr.user?.email || tr.email || "";
            const trAvatar = tr.image || tr.user?.avatar || tr.avatar || PRESET_AVATARS[0];
            const trTitle = tr.title || tr.specialization || "Strength Coach";
            const trCategory = tr.category || "Bodybuilding";
            const trHourly = tr.hourlyRate || 75;
            const trRating = tr.rating || 5.0;
            const trRevenue = tr.monthlyRevenueGenerated || 12000;
            const trCommRate = tr.commissionRate ?? 20;
            const trCommStatus = tr.commissionStatus || "Collected";

            // Commission Math
            const adminCut = (trRevenue * trCommRate) / 100;
            const trainerNet = trRevenue - adminCut;

            return (
              <div key={trId} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#00f2fe]/40 transition-all shadow-xl relative">
                {/* Header Profile Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Image src={trAvatar} alt={trName} width={56} height={56} className="rounded-full object-cover border-2 border-[#00f2fe] w-14 h-14 bg-black" />
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {trName}
                        <ShieldCheck size={16} className="text-[#00f2fe]" />
                      </h3>
                      <p className="text-xs text-[#00f2fe] font-semibold">{trTitle}</p>
                      <p className="text-[11px] text-slate-400">{trEmail}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full border ${
                    trCommStatus === "Collected" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                  }`}>
                    {trCommStatus === "Collected" ? "✓ Commission Collected" : "⏳ Pending Payout"}
                  </span>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-3 bg-white/5 border border-white/10 p-3 rounded-xl text-center text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Hourly Rate</span>
                    <span className="text-base font-black text-white font-mono">${trHourly}/hr</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Rating</span>
                    <span className="text-base font-black text-amber-400 flex items-center justify-center gap-1">
                      <Star size={12} className="fill-amber-400" /> {trRating}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Category</span>
                    <span className="text-xs font-bold text-slate-200 block truncate">{trCategory}</span>
                  </div>
                </div>

                {/* COMMISSION BREAKDOWN BOX */}
                <div className="bg-gradient-to-r from-black/60 to-[#181c28] border border-[#00f2fe]/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-extrabold uppercase text-[#00f2fe] flex items-center gap-1.5">
                      <DollarSign size={14} /> Admin Commission Split
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Rate:</span>
                      <select
                        value={trCommRate}
                        onChange={(e) => handleQuickCommissionUpdate(trId, Number(e.target.value))}
                        className="bg-[#12151c] border border-[#00f2fe]/40 text-[#00f2fe] text-xs font-black rounded px-1.5 py-0.5 cursor-pointer focus:outline-none"
                      >
                        <option value={10}>10% Cut</option>
                        <option value={15}>15% Cut</option>
                        <option value={20}>20% Cut</option>
                        <option value={25}>25% Cut</option>
                        <option value={30}>30% Cut</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded-lg text-center">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Gross Revenue</span>
                      <span className="text-sm font-black text-white font-mono">${trRevenue.toLocaleString()}</span>
                    </div>

                    <div className="bg-[#00f2fe]/10 border border-[#00f2fe]/20 p-2 rounded-lg text-center">
                      <span className="text-[9px] uppercase font-bold text-[#00f2fe] block">Admin Cut ({trCommRate}%)</span>
                      <span className="text-sm font-black text-[#00f2fe] font-mono">${adminCut.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg text-center">
                      <span className="text-[9px] uppercase font-bold text-emerald-400 block">Trainer Net</span>
                      <span className="text-sm font-black text-emerald-400 font-mono">${trainerNet.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 italic">"{tr.bio || "Dedicated professional fitness coach."}"</p>

                {/* CRUD Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleQuickCommissionUpdate(trId, trCommRate, trCommStatus === "Collected" ? "Pending" : "Collected")}
                    className="py-2 px-3 bg-white/5 border border-white/15 hover:bg-white/10 text-xs font-bold text-slate-300 rounded-lg transition-all cursor-pointer text-[11px]"
                  >
                    Toggle Status ({trCommStatus})
                  </button>

                  <button
                    onClick={() => handleOpenEdit(tr)}
                    className="flex-1 py-2 px-3 bg-white/5 border border-white/10 hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/30 hover:text-[#00f2fe] text-xs font-bold text-slate-200 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={14} /> Edit Profile
                  </button>

                  <button
                    onClick={() => handleDeleteTrainer(trId, trName)}
                    className="py-2 px-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-xs font-bold text-red-400 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE TRAINER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151c] border border-white/20 rounded-2xl w-full max-w-xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-black text-white uppercase tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                CREATE <span className="text-[#00f2fe]">TRAINER PROFILE & COMMISSION</span>
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTrainer} className="space-y-4 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <label className="block text-slate-300 font-bold">Trainer Profile Photo *</label>
                <div className="flex items-center gap-4">
                  <Image src={addFormData.avatar} alt="Preview" width={64} height={64} className="w-16 h-16 rounded-full object-cover border-2 border-[#00f2fe] bg-black" />
                  <div className="flex-1 space-y-2">
                    <input type="file" ref={fileInputAddRef} onChange={(e) => e.target.files?.[0] && handleImageFileUpload(e.target.files[0], false)} accept="image/*" className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileInputAddRef.current?.click()}
                      disabled={uploadingImage}
                      className="px-4 py-2 bg-[#00f2fe]/10 border border-[#00f2fe]/30 hover:bg-[#00f2fe]/20 text-[#00f2fe] font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      {uploadingImage ? "Uploading Photo..." : "Upload Photo from Device"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button key={idx} type="button" onClick={() => setAddFormData((prev) => ({ ...prev, avatar: url }))} className={`rounded-full p-0.5 border-2 transition-all ${addFormData.avatar === url ? "border-[#00f2fe] scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <Image src={url} alt={`Preset ${idx}`} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Full Name *</label>
                  <input type="text" required value={addFormData.name} onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })} placeholder="e.g. Marcus Steel" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Email Address *</label>
                  <input type="email" required value={addFormData.email} onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })} placeholder="marcus@forged.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Password</label>
                  <input type="password" value={addFormData.password} onChange={(e) => setAddFormData({ ...addFormData, password: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone Number</label>
                  <input type="text" value={addFormData.phone} onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })} placeholder="+1 (555) 019-2834" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
              </div>

              {/* COMMISSION & FINANCIAL SETTINGS */}
              <div className="bg-[#00f2fe]/5 border border-[#00f2fe]/20 rounded-xl p-3 space-y-3">
                <span className="text-xs font-black uppercase text-[#00f2fe] block">Gym Admin Commission Split Settings</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Admin Commission Rate (%) *</label>
                    <input type="number" min={0} max={100} value={addFormData.commissionRate} onChange={(e) => setAddFormData({ ...addFormData, commissionRate: Number(e.target.value) })} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-[#00f2fe] font-black focus:outline-none focus:border-[#00f2fe]" />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Est. Monthly Revenue ($) *</label>
                    <input type="number" value={addFormData.monthlyRevenueGenerated} onChange={(e) => setAddFormData({ ...addFormData, monthlyRevenueGenerated: Number(e.target.value) })} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#00f2fe]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Professional Title</label>
                  <input type="text" value={addFormData.title} onChange={(e) => setAddFormData({ ...addFormData, title: e.target.value })} placeholder="Senior Hypertrophy Coach" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Category</label>
                  <select value={addFormData.category} onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })} className="w-full bg-[#181c26] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]">
                    <option value="Bodybuilding">Bodybuilding</option>
                    <option value="HIIT & Cardio">HIIT & Cardio</option>
                    <option value="Powerlifting">Powerlifting</option>
                    <option value="Yoga & Mobility">Yoga & Mobility</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Hourly Rate ($)</label>
                  <input type="number" value={addFormData.hourlyRate} onChange={(e) => setAddFormData({ ...addFormData, hourlyRate: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Years Experience</label>
                  <input type="number" value={addFormData.experienceYears} onChange={(e) => setAddFormData({ ...addFormData, experienceYears: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Bio & Credentials</label>
                <textarea rows={2} value={addFormData.bio} onChange={(e) => setAddFormData({ ...addFormData, bio: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg hover:bg-white/10 font-bold">Cancel</button>
                <button type="submit" disabled={submitting || uploadingImage} className="px-6 py-2 bg-[#00f2fe] text-black font-black uppercase tracking-wider rounded-lg hover:bg-[#00d0e0] transition-all disabled:opacity-50 cursor-pointer">
                  {submitting ? "Saving..." : "Save & Publish Trainer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TRAINER MODAL */}
      {editingTrainer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12151c] border border-white/20 rounded-2xl w-full max-w-xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-black text-white uppercase tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                EDIT <span className="text-[#00f2fe]">TRAINER PROFILE & COMMISSION</span>
              </h2>
              <button onClick={() => setEditingTrainer(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateTrainer} className="space-y-4 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                <label className="block text-slate-300 font-bold">Trainer Profile Photo *</label>
                <div className="flex items-center gap-4">
                  <Image src={editFormData.avatar} alt="Edit Preview" width={64} height={64} className="w-16 h-16 rounded-full object-cover border-2 border-[#00f2fe] bg-black" />
                  <div className="flex-1 space-y-2">
                    <input type="file" ref={fileInputEditRef} onChange={(e) => e.target.files?.[0] && handleImageFileUpload(e.target.files[0], true)} accept="image/*" className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileInputEditRef.current?.click()}
                      disabled={uploadingImage}
                      className="px-4 py-2 bg-[#00f2fe]/10 border border-[#00f2fe]/30 hover:bg-[#00f2fe]/20 text-[#00f2fe] font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                      {uploadingImage ? "Uploading New Photo..." : "Change Photo from Device"}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button key={idx} type="button" onClick={() => setEditFormData((prev) => ({ ...prev, avatar: url }))} className={`rounded-full p-0.5 border-2 transition-all ${editFormData.avatar === url ? "border-[#00f2fe] scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <Image src={url} alt={`Preset ${idx}`} width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Full Name</label>
                  <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone Number</label>
                  <input type="text" value={editFormData.phone} onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
              </div>

              {/* COMMISSION & FINANCIAL EDIT SETTINGS */}
              <div className="bg-[#00f2fe]/5 border border-[#00f2fe]/20 rounded-xl p-3 space-y-3">
                <span className="text-xs font-black uppercase text-[#00f2fe] block">Gym Admin Commission Split Settings</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Admin Cut Rate (%)</label>
                    <input type="number" min={0} max={100} value={editFormData.commissionRate} onChange={(e) => setEditFormData({ ...editFormData, commissionRate: Number(e.target.value) })} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-[#00f2fe] font-black focus:outline-none focus:border-[#00f2fe]" />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Monthly Rev ($)</label>
                    <input type="number" value={editFormData.monthlyRevenueGenerated} onChange={(e) => setEditFormData({ ...editFormData, monthlyRevenueGenerated: Number(e.target.value) })} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#00f2fe]" />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Commission Status</label>
                    <select value={editFormData.commissionStatus} onChange={(e) => setEditFormData({ ...editFormData, commissionStatus: e.target.value })} className="w-full bg-[#181c26] border border-white/15 rounded-lg px-3 py-2 text-white font-bold">
                      <option value="Collected">Collected</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Professional Title</label>
                  <input type="text" value={editFormData.title} onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Category</label>
                  <select value={editFormData.category} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })} className="w-full bg-[#181c26] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]">
                    <option value="Bodybuilding">Bodybuilding</option>
                    <option value="HIIT & Cardio">HIIT & Cardio</option>
                    <option value="Powerlifting">Powerlifting</option>
                    <option value="Yoga & Mobility">Yoga & Mobility</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Hourly Rate ($)</label>
                  <input type="number" value={editFormData.hourlyRate} onChange={(e) => setEditFormData({ ...editFormData, hourlyRate: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Years Experience</label>
                  <input type="number" value={editFormData.experienceYears} onChange={(e) => setEditFormData({ ...editFormData, experienceYears: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Bio & Credentials</label>
                <textarea rows={2} value={editFormData.bio} onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button type="button" onClick={() => setEditingTrainer(null)} className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg hover:bg-white/10 font-bold">Cancel</button>
                <button type="submit" disabled={submitting || uploadingImage} className="px-6 py-2 bg-[#00f2fe] text-black font-black uppercase tracking-wider rounded-lg hover:bg-[#00d0e0] transition-all disabled:opacity-50 cursor-pointer">
                  {submitting ? "Updating..." : "Update Trainer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
