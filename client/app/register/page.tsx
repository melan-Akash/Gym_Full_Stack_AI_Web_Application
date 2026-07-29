"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Redirect to interactive profile onboarding
      router.push("/onboarding");
    }, 750);
  };

  return (
    <main className="bg-[#1e2230] text-white min-h-screen flex overflow-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-screen">
        {/* Left Side - Cinematic Brand Showcase */}
        <div className="hidden lg:flex lg:col-span-6 relative flex-col justify-between p-12 overflow-hidden bg-[#0b0b0b]">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=90"
              alt="FORGED Athlete Training"
              fill
              priority
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-[#0b0b0b] via-[#0b0b0b]/70 to-transparent" />
          </div>

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

          <div className="relative z-10 max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d7ff2f]/15 border border-[#d7ff2f]/40 rounded-md text-xs font-black uppercase text-[#d7ff2f]">
              <ShieldCheck size={14} />
              Elite Membership Registration
            </div>

            <h2
              className="text-4xl font-black uppercase leading-tight text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              JOIN THE <span className="text-[#d7ff2f]">FORGED FELLOWSHIP</span>
            </h2>

            <ul className="space-y-3 font-normal">
              {[
                "Instant access to 24/7 athletic facilities",
                "Customized Sri Lankan & Western AI Meal Plans",
                "Biometric Navy body fat & progress tracking",
                "Dedicated head coach consultation included",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={15} className="text-[#d7ff2f] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side - Luxury Form */}
        <div className="col-span-1 lg:col-span-6 flex items-center justify-center p-6 sm:p-12 bg-[#1e2230] relative overflow-y-auto">
          <div className="w-full max-w-md space-y-7 my-auto">
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
              <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-2 block font-heading">
                Start Your Journey
              </span>
              <h1
                className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Create <span className="text-[#d7ff2f]">Athlete Profile</span>
              </h1>
              <p className="text-slate-300 text-sm mt-1 font-normal">
                Register your credentials to unlock FORGED facilities and AI tools.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Akash Perera"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="akash_forged"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="akash@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f]"
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs pt-1">
                <input
                  type="checkbox"
                  required
                  className="rounded bg-white/5 border-white/20 text-[#d7ff2f] focus:ring-0 cursor-pointer"
                />
                <span className="text-slate-300 font-normal">
                  I agree to FORGED Terms of Service &amp; Privacy Policy.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {loading ? "Creating Account..." : "Register & Start Onboarding"}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="pt-5 border-t border-white/10 text-center">
              <p className="text-slate-300 text-xs font-normal">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#d7ff2f] font-bold uppercase tracking-wider hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
