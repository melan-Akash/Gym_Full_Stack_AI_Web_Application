"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context/appcontext";
import { SYSTEM_NOTIFICATIONS } from "@/lib/adminData";
import { Megaphone, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminNotificationsPage() {
  const { adminGetNotifications, adminCreateNotification } = useAppContext();

  const [notifications, setNotifications] = useState<any[]>(SYSTEM_NOTIFICATIONS);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Members");
  const [loading, setLoading] = useState(false);

  const fetchNotifs = async () => {
    try {
      const data = await adminGetNotifications();
      if (data && data.length > 0) setNotifications(data);
    } catch (err) {
      console.log("Using static notification fallback");
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, []);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setLoading(true);

    try {
      await adminCreateNotification({
        title,
        message,
        category: "Announcement",
        targetAudience: audience,
      });

      setLoading(false);
      toast.success("Broadcast sent to all athlete app feeds!", {
        icon: "📢",
      });
      fetchNotifs();
      setTitle("");
      setMessage("");
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to broadcast notification");
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          SYSTEM <span className="text-[#00f2fe]">NOTIFICATIONS & BROADCASTS</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Live MongoDB notification feed, app push alerts, and facility announcements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleBroadcast} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Megaphone size={18} className="text-[#00f2fe]" /> Create New Broadcast
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-[#1e2230] border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
              >
                <option value="All Members">All Members (1,248 Athletes)</option>
                <option value="Trainers Only">Trainers Only (12 Coaches)</option>
                <option value="VIP Members">VIP Members Only (248 Athletes)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Announcement Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Holiday Hours & Recovery Suite Maintenance"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Message Content</label>
              <textarea
                required
                rows={4}
                placeholder="Write message to send to member app feed..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Send size={15} />
              {loading ? "Broadcasting..." : "Send Broadcast Now"}
            </button>
          </form>
        </div>

        {/* Right Active History */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Active System Announcements ({notifications.length})
            </h3>

            <div className="space-y-3">
              {notifications.map((notif, idx) => (
                <div key={notif._id || notif.id || idx} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                    <span className="text-[9px] bg-[#00f2fe]/20 text-[#00f2fe] px-2 py-0.5 rounded font-bold uppercase">
                      {notif.targetAudience || "All Members"}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">{notif.message}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Sent by: {notif.sentBy || "Admin HQ"}</span>
                    <span>{notif.createdAt ? new Date(notif.createdAt).toLocaleDateString() : "Today"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
