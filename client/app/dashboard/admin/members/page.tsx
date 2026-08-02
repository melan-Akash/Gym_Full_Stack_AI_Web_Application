"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/appcontext";
import { ADMIN_MEMBERS } from "@/lib/adminData";
import { Search, UserPlus, Edit3, Trash2, X, Upload, Loader2, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMembersPage() {
  const {
    adminGetMembers,
    adminCreateMember,
    adminUpdateMember,
    adminDeleteMember,
    adminUpdateMemberStatus,
    adminUpdateMemberPaymentStatus,
  } = useAppContext();

  const [members, setMembers] = useState<any[]>(ADMIN_MEMBERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputAddRef = useRef<HTMLInputElement>(null);
  const fileInputEditRef = useRef<HTMLInputElement>(null);

  const PRESET_AVATARS = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  ];

  // New Member Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [membershipTier, setMembershipTier] = useState("Pro Performance");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0]);

  // Edit Member Form State
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    membershipTier: "Pro Performance",
    status: "Active",
    paymentStatus: "Paid",
    avatar: PRESET_AVATARS[0],
  });

  const fetchMembers = async () => {
    try {
      const data = await adminGetMembers();
      if (data && data.length > 0) setMembers(data);
    } catch (err) {
      console.log("Using static member fallback");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Image Upload Handler via Cloudinary
  const handleImageUpload = async (file: File, isEdit = false) => {
    setUploadingImage(true);
    try {
      const token = localStorage.getItem("forged_token");
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.url) {
        if (isEdit) {
          setEditFormData((prev) => ({ ...prev, avatar: json.url }));
        } else {
          setAvatar(json.url);
        }
        toast.success("Member profile photo uploaded!");
      } else {
        toast.error(json.message || "Failed to upload image");
      }
    } catch (err: any) {
      toast.error("Image upload error: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // CREATE Member
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminCreateMember({
        name,
        email,
        phone,
        membershipTier,
        paymentStatus,
        avatar,
        password: "password123",
      });

      setLoading(false);
      toast.success(`Member "${name}" registered successfully!`, { icon: "⚡" });
      fetchMembers();

      setAddModalOpen(false);
      setName("");
      setEmail("");
      setPhone("");
      setPaymentStatus("Paid");
      setAvatar(PRESET_AVATARS[0]);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to create member");
    }
  };

  // Open EDIT Modal
  const handleOpenEdit = (mem: any) => {
    setEditingMember(mem);
    setEditFormData({
      id: mem._id || mem.id,
      name: mem.name || "",
      email: mem.email || "",
      phone: mem.phone || "",
      membershipTier: mem.membershipTier || mem.plan || "Pro Performance",
      status: mem.status || "Active",
      paymentStatus: mem.paymentStatus || "Paid",
      avatar: mem.avatar || PRESET_AVATARS[0],
    });
  };

  // UPDATE Member
  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminUpdateMember(editFormData.id, {
        name: editFormData.name,
        phone: editFormData.phone,
        membershipTier: editFormData.membershipTier,
        status: editFormData.status,
        paymentStatus: editFormData.paymentStatus,
        avatar: editFormData.avatar,
      });

      setLoading(false);
      toast.success(`Member "${editFormData.name}" updated successfully!`);
      setEditingMember(null);
      fetchMembers();
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to update member");
    }
  };

  // DELETE Member
  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete member "${name}"? This action is permanent.`)) return;

    try {
      await adminDeleteMember(id);
      toast.success(`Member "${name}" deleted successfully.`);
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete member");
    }
  };

  // TOGGLE ACCOUNT STATUS
  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    try {
      await adminUpdateMemberStatus(id, nextStatus);
      toast.success(`Member status changed to ${nextStatus.toUpperCase()}`);
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || "Status update failed");
    }
  };

  // UPDATE PAYMENT STATUS QUICK ACTION
  const handlePaymentStatusChange = async (id: string, newPaymentStatus: string) => {
    try {
      if (adminUpdateMemberPaymentStatus) {
        await adminUpdateMemberPaymentStatus(id, newPaymentStatus);
      }
      setMembers((prev) =>
        prev.map((m) => ((m._id === id || m.id === id) ? { ...m, paymentStatus: newPaymentStatus } : m))
      );
      toast.success(`Payment status updated to ${newPaymentStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Payment status update failed");
    }
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    const matchesPayment = paymentFilter === "All" || (m.paymentStatus || "Paid") === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            GYM MEMBERS DIRECTORY <span className="text-[#00f2fe]">({filteredMembers.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Full Admin CRUD Control: Register, Edit, Photo Upload, Account & Payment Status Management.</p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00f2fe]/20"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <UserPlus size={16} /> Register New Member
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-[#12151c] p-4 rounded-xl border border-white/10">
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

        {/* Account Status Filter */}
        <div className="flex items-center gap-1.5 w-full lg:w-auto">
          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Account:</span>
          {["All", "Active", "Expired", "Suspended"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                statusFilter === st ? "bg-[#00f2fe] text-[#0b0b0b]" : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Payment Status Filter */}
        <div className="flex items-center gap-1.5 w-full lg:w-auto">
          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">Payment:</span>
          {["All", "Paid", "Pending", "Overdue", "Failed"].map((pst) => (
            <button
              key={pst}
              onClick={() => setPaymentFilter(pst)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                paymentFilter === pst
                  ? pst === "Paid"
                    ? "bg-emerald-400 text-black font-extrabold"
                    : pst === "Pending"
                    ? "bg-amber-400 text-black font-extrabold"
                    : pst === "Overdue"
                    ? "bg-orange-400 text-black font-extrabold"
                    : pst === "Failed"
                    ? "bg-red-400 text-black font-extrabold"
                    : "bg-white text-black font-extrabold"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {pst}
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
                <th className="p-4">Phone</th>
                <th className="p-4">Account Status</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4 text-center">Quick Payment Status</th>
                <th className="p-4 text-right">CRUD Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((mem, idx) => {
                const memId = mem._id || mem.id || `mem-${idx}`;
                const pStatus = mem.paymentStatus || "Paid";

                return (
                  <tr key={memId} className="hover:bg-white/2">
                    <td className="p-4 flex items-center gap-3">
                      <Image
                        src={mem.avatar || PRESET_AVATARS[0]}
                        alt={mem.name || "Member"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border border-[#00f2fe]/40 w-10 h-10 bg-black"
                      />
                      <div>
                        <Link href={`/dashboard/admin/members/${memId}`} className="font-bold text-white hover:text-[#00f2fe] transition-colors block">
                          {mem.name}
                        </Link>
                        <span className="text-[10px] text-slate-400">{mem.email}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-[#00f2fe]">{mem.membershipTier || mem.plan || "Pro Performance"}</td>
                    <td className="p-4 font-mono text-slate-300">{mem.phone || "+1 (555) 123-4567"}</td>
                    
                    {/* Account Status Badge */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        mem.status === "Active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}>
                        {mem.status || "Active"}
                      </span>
                    </td>

                    {/* Payment Status Badge */}
                    <td className="p-4">
                      {pStatus === "Paid" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          <CheckCircle2 size={12} /> PAID
                        </span>
                      )}
                      {pStatus === "Pending" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40">
                          <Clock size={12} /> PENDING
                        </span>
                      )}
                      {pStatus === "Overdue" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-orange-500/20 text-orange-400 border border-orange-500/40">
                          <AlertCircle size={12} /> OVERDUE
                        </span>
                      )}
                      {pStatus === "Failed" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-red-500/20 text-red-400 border border-red-500/40">
                          <XCircle size={12} /> FAILED
                        </span>
                      )}
                    </td>

                    {/* Quick Payment Select Action */}
                    <td className="p-4 text-center">
                      <select
                        value={pStatus}
                        onChange={(e) => handlePaymentStatusChange(memId, e.target.value)}
                        className="bg-black/60 border border-white/20 text-[11px] font-bold text-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none focus:border-[#00f2fe] transition-all"
                      >
                        <option value="Paid" className="bg-[#141722] text-emerald-400 font-bold">Mark as Paid</option>
                        <option value="Pending" className="bg-[#141722] text-amber-400 font-bold">Mark as Pending</option>
                        <option value="Overdue" className="bg-[#141722] text-orange-400 font-bold">Mark as Overdue</option>
                        <option value="Failed" className="bg-[#141722] text-red-400 font-bold">Mark as Failed</option>
                      </select>
                    </td>

                    {/* CRUD Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(mem)}
                          className="px-2.5 py-1.5 bg-white/5 border border-white/15 hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/40 hover:text-[#00f2fe] text-xs font-bold text-slate-200 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMember(memId, mem.name)}
                          className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-xs font-bold text-red-400 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MEMBER MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141722] border border-white/20 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                REGISTER NEW <span className="text-[#00f2fe]">GYM MEMBER</span>
              </h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              {/* Photo Upload Section */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                <label className="block text-slate-300 font-bold">Profile Photo</label>
                <div className="flex items-center gap-3">
                  <Image src={avatar} alt="Preview" width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-[#00f2fe] bg-black" />
                  <div className="flex-1 space-y-1">
                    <input type="file" ref={fileInputAddRef} onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], false)} accept="image/*" className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileInputAddRef.current?.click()}
                      disabled={uploadingImage}
                      className="px-3 py-1.5 bg-[#00f2fe]/10 border border-[#00f2fe]/30 hover:bg-[#00f2fe]/20 text-[#00f2fe] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
                    >
                      {uploadingImage ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      {uploadingImage ? "Uploading..." : "Upload Photo"}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button key={idx} type="button" onClick={() => setAvatar(url)} className={`rounded-full p-0.5 border-2 transition-all ${avatar === url ? "border-[#00f2fe] scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <Image src={url} alt={`Preset ${idx}`} width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Full Name *</label>
                <input type="text" required placeholder="e.g. Kaushani Fernando" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Email Address *</label>
                <input type="email" required placeholder="kaushani@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Phone Number</label>
                <input type="text" placeholder="+94 77 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Membership Plan</label>
                  <select value={membershipTier} onChange={(e) => setMembershipTier(e.target.value)} className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white">
                    <option value="Basic Access">Basic Access ($49/mo)</option>
                    <option value="Pro Performance">Pro Performance ($99/mo)</option>
                    <option value="VIP Elite Athlete">VIP Elite Athlete ($199/mo)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Payment Status</label>
                  <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white font-bold">
                    <option value="Paid" className="text-emerald-400">Paid</option>
                    <option value="Pending" className="text-amber-400">Pending</option>
                    <option value="Overdue" className="text-orange-400">Overdue</option>
                    <option value="Failed" className="text-red-400">Failed</option>
                  </select>
                </div>
              </div>

              <button type="submit" disabled={loading || uploadingImage} className="w-full py-3 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase rounded-lg hover:bg-[#00d0e0] transition-all cursor-pointer mt-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {loading ? "Saving to Database..." : "Save & Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MEMBER MODAL */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141722] border border-white/20 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                EDIT <span className="text-[#00f2fe]">MEMBER PROFILE</span>
              </h3>
              <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateMember} className="space-y-3 text-xs">
              {/* Photo Upload Section */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                <label className="block text-slate-300 font-bold">Profile Photo</label>
                <div className="flex items-center gap-3">
                  <Image src={editFormData.avatar} alt="Edit Preview" width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-[#00f2fe] bg-black" />
                  <div className="flex-1 space-y-1">
                    <input type="file" ref={fileInputEditRef} onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)} accept="image/*" className="hidden" />
                    <button
                      type="button"
                      onClick={() => fileInputEditRef.current?.click()}
                      disabled={uploadingImage}
                      className="px-3 py-1.5 bg-[#00f2fe]/10 border border-[#00f2fe]/30 hover:bg-[#00f2fe]/20 text-[#00f2fe] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-[11px]"
                    >
                      {uploadingImage ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      {uploadingImage ? "Uploading..." : "Change Photo"}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  {PRESET_AVATARS.map((url, idx) => (
                    <button key={idx} type="button" onClick={() => setEditFormData((prev) => ({ ...prev, avatar: url }))} className={`rounded-full p-0.5 border-2 transition-all ${editFormData.avatar === url ? "border-[#00f2fe] scale-110" : "border-transparent opacity-60 hover:opacity-100"}`}>
                      <Image src={url} alt={`Preset ${idx}`} width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Full Name</label>
                <input type="text" required value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Phone Number</label>
                <input type="text" value={editFormData.phone} onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })} className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Membership Plan</label>
                  <select value={editFormData.membershipTier} onChange={(e) => setEditFormData({ ...editFormData, membershipTier: e.target.value })} className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white">
                    <option value="Basic Access">Basic Access ($49/mo)</option>
                    <option value="Pro Performance">Pro Performance ($99/mo)</option>
                    <option value="VIP Elite Athlete">VIP Elite Athlete ($199/mo)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold uppercase mb-1">Account Status</label>
                  <select value={editFormData.status} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })} className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white">
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Payment Status</label>
                <select value={editFormData.paymentStatus} onChange={(e) => setEditFormData({ ...editFormData, paymentStatus: e.target.value })} className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white font-bold">
                  <option value="Paid" className="text-emerald-400">Paid</option>
                  <option value="Pending" className="text-amber-400">Pending</option>
                  <option value="Overdue" className="text-orange-400">Overdue</option>
                  <option value="Failed" className="text-red-400">Failed</option>
                </select>
              </div>

              <button type="submit" disabled={loading || uploadingImage} className="w-full py-3 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase rounded-lg hover:bg-[#00d0e0] transition-all cursor-pointer mt-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                {loading ? "Updating Database..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
