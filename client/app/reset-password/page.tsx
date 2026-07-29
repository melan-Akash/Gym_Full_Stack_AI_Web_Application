"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 750);
  };

  return (
    <main className="bg-[#1e2230] text-white min-h-screen flex items-center justify-center p-6 font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <div className="w-full max-w-md bg-[#111] p-8 sm:p-10 rounded-2xl border border-white/15 shadow-2xl space-y-7">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-2">
            <Image
              width={297}
              height={72}
              className="h-8 w-auto mx-auto"
              src="/assets/logo.svg"
              alt="FORGED Logo"
            />
          </Link>
          <h1
            className="text-3xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Create <span className="text-[#d7ff2f]">New Password</span>
          </h1>
          <p className="text-slate-300 text-xs font-normal max-w-xs mx-auto">
            Your new password must be at least 8 characters long.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {loading ? "Updating Password..." : "Update Password & Sign In"}
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div className="bg-white/5 p-6 rounded-xl border border-[#d7ff2f]/50 text-center space-y-4">
            <CheckCircle2 size={36} className="text-[#d7ff2f] mx-auto" />
            <h3 className="text-xl font-black text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Password Reset Complete!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your password has been updated. You can now log into your FORGED account.
            </p>
            <Link
              href="/login"
              className="w-full py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg block cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Sign In Now
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
