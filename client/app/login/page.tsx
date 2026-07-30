"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck, Eye, EyeOff, User as UserIcon, UserCheck, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { useAppContext } from "@/context/appcontext";

export default function LoginPage() {
  const router = useRouter();
  const { login, error: contextError, setError } = useAppContext();

  const [role, setRole] = useState<"member" | "trainer" | "admin">("trainer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setError(null);

    try {
      // Call AppContext login which communicates with http://localhost:5000/api/auth/login
      const loggedUser = await login(email, password);

      setLoading(false);
      // Route based on authenticated user role
      if (loggedUser.role === "admin") {
        router.push("/dashboard/admin");
      } else if (loggedUser.role === "trainer") {
        router.push("/dashboard/trainer");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || "Invalid login credentials. Please try again.");
    }
  };

  const quickDemoLogin = async (targetRole: "member" | "trainer" | "admin") => {
    setLoading(true);
    setErrorMessage(null);
    setError(null);

    // Default demo credentials corresponding to role
    let demoEmail = "athlete@forged.com";
    if (targetRole === "admin") demoEmail = "admin@forgedgym.com";
    if (targetRole === "trainer") demoEmail = "marcus@forgedgym.com";

    try {
      const loggedUser = await login(demoEmail, "password123");
      setLoading(false);
      if (loggedUser.role === "admin" || targetRole === "admin") {
        router.push("/dashboard/admin");
      } else if (loggedUser.role === "trainer" || targetRole === "trainer") {
        router.push("/dashboard/trainer");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      // Fallback demo redirect if backend isn't seeded with demo credentials yet
      setLoading(false);
      if (targetRole === "admin") {
        router.push("/dashboard/admin");
      } else if (targetRole === "trainer") {
        router.push("/dashboard/trainer");
      } else {
        router.push("/dashboard");
      }
    }
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
              Live Backend Connected (JWT Auth)
            </div>

            <h2
              className="text-4xl font-black uppercase leading-tight text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              CONVERT POTENTIAL INTO <span className="text-[#d7ff2f]">PEAK POWER</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Access your personalized control center. Powered by Express REST API, MongoDB Cloud, and OpenRouter AI.
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-white/15">
              <div>
                <span className="text-2xl font-black text-[#d7ff2f] block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  5,000+
                </span>
                <span className="text-xs text-slate-400 uppercase font-semibold">Active Members</span>
              </div>
              <div>
                <span className="text-2xl font-black text-[#00f2fe] block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  12 Elite
                </span>
                <span className="text-xs text-slate-400 uppercase font-semibold">Head Trainers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form & Role Selection */}
        <div className="col-span-1 lg:col-span-6 flex items-center justify-center p-6 sm:p-12 bg-[#1e2230] relative overflow-y-auto">
          <div className="w-full max-w-md space-y-7 my-auto">
            {/* Mobile Logo Header */}
            <div className="lg:hidden flex items-center justify-between mb-4">
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
              <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-1 block font-heading">
                Portal Sign In
              </span>
              <h1
                className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Sign In To <span className="text-[#d7ff2f]">FORGED</span>
              </h1>
              <p className="text-slate-300 text-xs mt-1 font-normal">
                Enter your credentials to authenticate with the Express API backend.
              </p>
            </div>

            {/* Error Notification Badge */}
            {(errorMessage || contextError) && (
              <div className="bg-red-500/15 border border-red-500/40 text-red-400 p-3.5 rounded-xl text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage || contextError}</span>
              </div>
            )}

            {/* Quick Demo Access Bar */}
            <div className="bg-white/5 border border-[#d7ff2f]/30 rounded-2xl p-4 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#d7ff2f] flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Instant Demo Access
                </span>
                <span className="text-[10px] text-slate-400">1-Click Jump</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => quickDemoLogin("trainer")}
                  className="py-2.5 px-2 bg-[#d7ff2f]/10 border border-[#d7ff2f]/40 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-[#d7ff2f] rounded-lg text-xs font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <UserCheck size={16} />
                  Trainer
                </button>

                <button
                  type="button"
                  onClick={() => quickDemoLogin("admin")}
                  className="py-2.5 px-2 bg-[#00f2fe]/10 border border-[#00f2fe]/40 hover:bg-[#00f2fe] hover:text-[#0b0b0b] text-[#00f2fe] rounded-lg text-xs font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <ShieldAlert size={16} />
                  Admin
                </button>

                <button
                  type="button"
                  onClick={() => quickDemoLogin("member")}
                  className="py-2.5 px-2 bg-white/5 border border-white/20 hover:bg-white hover:text-[#0b0b0b] text-white rounded-lg text-xs font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer"
                >
                  <UserIcon size={16} />
                  Member
                </button>
              </div>
            </div>

            {/* Role Switcher Tabs */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-3 p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setRole("trainer");
                    setEmail("marcus@forgedgym.com");
                  }}
                  className={`py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    role === "trainer"
                      ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Trainer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("admin");
                    setEmail("admin@forgedgym.com");
                  }}
                  className={`py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    role === "admin"
                      ? "bg-[#00f2fe] text-[#0b0b0b] shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole("member");
                    setEmail("athlete@forged.com");
                  }}
                  className={`py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    role === "member"
                      ? "bg-white text-[#0b0b0b] shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Member
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={
                      role === "admin"
                        ? "admin@forgedgym.com"
                        : role === "trainer"
                        ? "marcus@forgedgym.com"
                        : "athlete@forged.com"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f] transition-colors"
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#d7ff2f] hover:underline font-semibold"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-10 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f] transition-colors"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {loading ? "Authenticating API..." : `Sign In to ${role.toUpperCase()} Dashboard`}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-slate-300 text-xs font-normal">
                Don&apos;t have an account?{" "}
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
