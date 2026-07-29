"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Redirect user to onboarding questionnaire
      router.push("/onboarding");
    }, 700);
  };

  return (
    <main className="bg-[#1e2230] text-white min-h-screen flex overflow-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-screen">
        {/* Left Side - Cinematic Brand Showcase */}
        <div className="hidden lg:flex lg:col-span-6 relative flex-col justify-between p-12 overflow-hidden bg-[#0b0b0b]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=90"
              alt="FORGED Athletic Facility"
              fill
              priority
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-[#0b0b0b] via-[#0b0b0b]/70 to-transparent" />
          </div>

          {/* Logo Top Left */}
          <div className="relative z-10">
            <Link href="/" className="inline-block">
              <Image
                width={297}
                height={72}
                className="h-9 w-auto"
                src="/assets/logo.svg"
                alt="FORGED Logo"
              />
            </Link>
          </div>

          {/* Bottom Quote & Stats */}
          <div className="relative z-10 max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d7ff2f]/15 border border-[#d7ff2f]/40 rounded-md text-xs font-black uppercase text-[#d7ff2f]">
              <ShieldCheck size={14} />
              Verified Athlete Portal
            </div>

            <h2
              className="text-4xl font-black uppercase leading-tight text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              CONVERT POTENTIAL INTO <span className="text-[#d7ff2f]">PEAK POWER</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              &ldquo;FORGED isn&apos;t just a gym; it&apos;s an ecosystem built for those who demand daily physical excellence.&rdquo;
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-white/15">
              <div>
                <span className="text-2xl font-black text-[#d7ff2f] block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  5,000+
                </span>
                <span className="text-xs text-slate-400 uppercase font-semibold">Athletes</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#00f2fe] block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  24/7
                </span>
                <span className="text-xs text-slate-400 uppercase font-semibold">Key Fob Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Luxury Form */}
        <div className="col-span-1 lg:col-span-6 flex items-center justify-center p-6 sm:p-12 bg-[#1e2230] relative">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo Header */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <Link href="/">
                <Image
                  width={297}
                  height={72}
                  className="h-8 w-auto"
                  src="/assets/logo.svg"
                  alt="FORGED Logo"
                />
              </Link>
            </div>

            <div>
              <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-2 block font-heading">
                Welcome Back
              </span>
              <h1
                className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Sign In To <span className="text-[#d7ff2f]">FORGED</span>
              </h1>
              <p className="text-slate-300 text-sm mt-1 font-normal">
                Access your training logs, AI meal plans, and biometric stats.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="athlete@forged.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f] transition-colors"
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#d7ff2f] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-10 py-3.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f] transition-colors"
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded bg-white/5 border-white/20 text-[#d7ff2f] focus:ring-0 cursor-pointer"
                  />
                  Remember login details
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {loading ? "Authenticating..." : "Sign In & Continue"}
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Register Footer */}
            <div className="pt-6 border-t border-white/10 text-center">
              <p className="text-slate-300 text-xs font-normal">
                Don&apos;t have a FORGED account?{" "}
                <Link
                  href="/register"
                  className="text-[#d7ff2f] font-bold uppercase tracking-wider hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
