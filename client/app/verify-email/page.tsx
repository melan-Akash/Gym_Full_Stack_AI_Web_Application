"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push("/onboarding");
    }, 750);
  };

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
    }, 1000);
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d7ff2f]/15 border border-[#d7ff2f]/40 rounded-md text-xs font-bold text-[#d7ff2f] uppercase mb-1">
            <ShieldCheck size={14} />
            Security Verification
          </div>
          <h1
            className="text-3xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Verify <span className="text-[#d7ff2f]">Your Email</span>
          </h1>
          <p className="text-slate-300 text-xs font-normal max-w-xs mx-auto">
            We sent a 6-digit verification code to your registered email address.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`code-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                className="w-12 h-14 bg-white/5 border border-white/15 rounded-lg text-center text-xl font-black text-[#d7ff2f] focus:outline-none focus:border-[#d7ff2f]"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {loading ? "Verifying Code..." : "Verify & Continue"}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center space-y-2">
          <p className="text-xs text-slate-400">Didn&apos;t receive code?</p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="inline-flex items-center gap-1.5 text-xs text-[#d7ff2f] hover:underline font-bold uppercase tracking-wider cursor-pointer"
          >
            <RefreshCw size={12} className={resending ? "animate-spin" : ""} />
            {resending ? "Sending..." : "Resend Verification Code"}
          </button>
        </div>
      </div>
    </main>
  );
}
