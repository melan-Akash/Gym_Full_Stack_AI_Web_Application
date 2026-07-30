"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/appcontext";
import { ADMIN_MEMBERS } from "@/lib/adminData";
import { Search, UserPlus, ChevronRight, CheckCircle2, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMembersPage() {
  const { adminGetMembers, adminCreateMember, adminUpdateMemberStatus } = useAppContext();

  const [members, setMembers] = useState<any[]>(ADMIN_MEMBERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Member Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [membershipTier, setMembershipTier] = useState("Pro Performance");

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

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminCreateMember({
        name,
        email,
        phone,
        membershipTier,
        password: "password123",
      });

      setLoading(false);
      toast.success(`Member "${name}" saved to MongoDB database!`, {
        icon: "⚡",
      });
      fetchMembers();

      setModalOpen(false);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to create member");
    }
  };

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

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            GYM MEMBERS DIRECTORY <span className="text-[#00f2fe]">({filteredMembers.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Live MongoDB member records, status management, and registration.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
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
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Toggle Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((mem, idx) => (
                <tr key={mem._id || mem.id || idx} className="hover:bg-white/2">
                  <td className="p-4 flex items-center gap-3">
                    <Image src={mem.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"} alt={mem.name} width={40} height={40} className="rounded-full object-cover border border-white/15" />
                    <div>
                      <span className="font-bold text-white block">{mem.name}</span>
                      <span className="text-[10px] text-slate-400">{mem.email}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-[#00f2fe]">{mem.membershipTier || mem.plan || "Pro Performance"}</td>
                  <td className="p-4 font-mono text-slate-300">{mem.phone || "+1 (555) 123-4567"}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      mem.status === "Active" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {mem.status || "Active"}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusToggle(mem._id || mem.id, mem.status || "Active")}
                      className="px-2.5 py-1 bg-white/5 border border-white/15 hover:bg-white/10 text-[10px] font-bold text-slate-300 rounded cursor-pointer"
                    >
                      Toggle Status
                    </button>
                  </td>
                  <td className="p-4">
                    <Link
                      href={`/dashboard/admin/members/${mem._id || mem.id || "mem-001"}`}
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

      {/* Add Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141722] border border-white/20 p-6 rounded-2xl max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Register New Gym Member
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kaushani Fernando"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="kaushani@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+94 77 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase mb-1">Membership Plan</label>
                <select
                  value={membershipTier}
                  onChange={(e) => setMembershipTier(e.target.value)}
                  className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-3 py-2 text-white"
                >
                  <option value="Basic Access">Basic Access ($49/mo)</option>
                  <option value="Pro Performance">Pro Performance ($99/mo)</option>
                  <option value="VIP Elite Athlete">VIP Elite Athlete ($199/mo)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase rounded-lg hover:bg-[#00d0e0] transition-all cursor-pointer mt-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {loading ? "Saving to Database..." : "Save & Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
