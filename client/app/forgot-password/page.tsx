"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
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
            Reset <span className="text-[#d7ff2f]">Password</span>
          </h1>
          <p className="text-slate-300 text-xs font-normal max-w-xs mx-auto">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Registered Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="athlete@forged.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
                />
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {loading ? "Sending Link..." : "Send Reset Instructions"}
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div className="bg-white/5 p-6 rounded-xl border border-[#d7ff2f]/50 text-center space-y-3">
            <CheckCircle2 size={32} className="text-[#d7ff2f] mx-auto" />
            <h3 className="text-lg font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Reset Link Sent!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We have sent password reset instructions to <span className="text-[#d7ff2f] font-bold">{email}</span>. Check your inbox and spam folder.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
