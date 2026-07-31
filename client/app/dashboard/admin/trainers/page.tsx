"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ADMIN_TRAINERS } from "@/lib/adminData";
import { UserPlus, Star, Trash2, Edit3, X, CheckCircle2, ShieldCheck, Upload, Loader2 } from "lucide-react";

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
        setNotification(`Trainer ${addFormData.name} created successfully!`);
        setShowAddModal(false);
        setAddFormData({
          name: "",
          email: "",
          password: "TrainerPassword123!",
          phone: "",
          title: "Certified Fitness Coach",
          category: "Bodybuilding",
          hourlyRate: 75,
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

  return (
    <div className="space-y-8">
      {/* Notification Toast */}
      {notification && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center justify-between text-xs font-semibold">
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
            TRAINERS <span className="text-[#00f2fe]">MANAGEMENT ({trainers.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Full Admin CRUD Control: Create, Read, Edit & Delete Trainer Profiles & Cloudinary Images.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00f2fe]/20"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <UserPlus size={16} /> Hire / Add Trainer
        </button>
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

            return (
              <div key={trId} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#00f2fe]/40 transition-all">
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
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase rounded">
                    Active Coach
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-white/5 border border-white/10 p-3 rounded-xl text-center text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Rate/hr</span>
                    <span className="text-base font-black text-emerald-400 font-mono">${trHourly}</span>
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

                <p className="text-xs text-slate-300 line-clamp-2 italic">"{tr.bio || "Dedicated professional fitness coach."}"</p>

                {/* CRUD Action Buttons */}
                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleOpenEdit(tr)}
                    className="flex-1 py-2 px-3 bg-white/5 border border-white/10 hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/30 hover:text-[#00f2fe] text-xs font-bold text-slate-200 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={14} /> Edit Trainer
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
                CREATE <span className="text-[#00f2fe]">TRAINER PROFILE</span>
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
                    <p className="text-[11px] text-slate-400">Supported: JPG, PNG, WEBP (Uploaded via Cloudinary)</p>
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
                EDIT <span className="text-[#00f2fe]">TRAINER PROFILE</span>
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
