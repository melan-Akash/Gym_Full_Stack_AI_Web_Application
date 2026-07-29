"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Utensils,
  UserCheck,
  TrendingUp,
  Building2,
  Lock,
  Target,
  Eye,
  Rocket,
  Shield,
  HeartHandshake,
  Compass,
} from "lucide-react";

// Custom inline Linkedin SVG icon
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[#1e2230] text-white min-h-screen overflow-x-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <Navbar />

      {/* =========================================================================
         1. FULL-WIDTH HERO SECTION (Slate bg, Clean "ABOUT US" headline)
         ========================================================================= */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-36 pb-24 overflow-hidden bg-[#1e2230]">
        {/* Full-bleed background image & dark gradient overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1920&q=95"
            alt="FitAI Facility"
            fill
            priority
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-[#1e2230]/70 to-[#1e2230]/40" />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e2230] via-transparent to-[#1e2230]" />

          {/* Subtle ambient lighting */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d7ff2f]/10 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00f2fe]/10 rounded-full blur-[160px] pointer-events-none" />
        </div>

        <div className="container-gym w-full relative z-10 text-center max-w-4xl mx-auto">
          {/* Simple Clean Headline */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            ABOUT <span className="text-[#d7ff2f]">US</span>
          </h1>

          {/* Simple Clean Subtitle */}
          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            Empowering athletes, trainers, and fitness centers through artificial intelligence, intelligent coaching, and data-driven performance tracking.
          </p>
        </div>
      </section>

      {/* =========================================================================
         2. OUR STORY (Deep Dark bg)
         ========================================================================= */}
      <section id="story" className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-115 sm:h-135 rounded-xl overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=90"
                  alt="Modern Luxury Gym in Sri Lanka"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-[#0b0b0b]/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#111] p-5 border border-[#d7ff2f]/30 rounded-lg shadow-2xl">
                <p className="text-2xl font-black text-[#d7ff2f] leading-none" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Colombo
                </p>
                <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider mt-1">
                  Sri Lanka Innovation Hub
                </p>
              </div>
            </div>

            {/* Right Story Text */}
            <div className="lg:col-span-6">
              <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
                Our Genesis
              </span>

              <h2
                className="text-4xl sm:text-5xl font-black tracking-tight mb-6 uppercase leading-tight text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Our <span className="text-[#d7ff2f]">Journey</span>
              </h2>

              <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed">
                <p>
                  Founded in Colombo, Sri Lanka, FitAI started with a vision to combine modern fitness with artificial intelligence. We believe that everyone deserves personalized guidance, smarter training, and healthier living through technology.
                </p>
                <p>
                  Our platform empowers fitness centers, personal trainers, and members with intelligent tools that simplify workouts, nutrition planning, attendance, and progress tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. MISSION & VISION (Slate bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#1e2230]">
        <div className="container-gym">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white/5 p-8 sm:p-10 rounded-xl border border-white/15 hover:border-[#d7ff2f]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#d7ff2f]/20 flex items-center justify-center text-[#d7ff2f] mb-6 border border-[#d7ff2f]/30">
                <Target size={24} />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Our Mission
              </h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                To make professional fitness guidance accessible through modern technology and AI-powered experiences.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white/5 p-8 sm:p-10 rounded-xl border border-white/15 hover:border-[#00f2fe]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#00f2fe]/20 flex items-center justify-center text-[#00f2fe] mb-6 border border-[#00f2fe]/30">
                <Eye size={24} />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-black text-white mb-4 uppercase"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Our Vision
              </h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
                To become Sri Lanka&apos;s leading intelligent fitness platform while expanding globally with innovative digital health solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. WHY CHOOSE FITAI (Deep Dark bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Platform Features
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Why Choose <span className="text-[#d7ff2f]">FitAI</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                color: "#d7ff2f",
                title: "AI Workout Recommendations",
                desc: "Smart algorithmic workout plan adjustments based on real-time biomechanical feedback and biometric progress.",
              },
              {
                icon: Utensils,
                color: "#00f2fe",
                title: "Personalized Meal Plans",
                desc: "Tailored nutritional guidance calculated to optimize energy, muscle recovery, and metabolic health.",
              },
              {
                icon: UserCheck,
                color: "#d7ff2f",
                title: "Certified Trainers",
                desc: "Direct access to top Sri Lankan coaches for targeted personal training, form correction, and accountability.",
              },
              {
                icon: TrendingUp,
                color: "#00f2fe",
                title: "Real-Time Progress Tracking",
                desc: "Interactive analytics dashboards detailing strength gains, body composition, and endurance metrics.",
              },
              {
                icon: Building2,
                color: "#d7ff2f",
                title: "Smart Gym Management",
                desc: "End-to-end automated management for gym owners including member attendance, automated billing, and scheduling.",
              },
              {
                icon: Lock,
                color: "#00f2fe",
                title: "Secure Cloud Platform",
                desc: "Enterprise-grade cloud infrastructure safeguarding user privacy, biometric records, and financial transactions.",
              },
            ].map((feature) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-[#111] p-7 rounded-xl border border-white/10 hover:border-[#d7ff2f]/40 transition-all group"
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 border border-white/10"
                    style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h3
                    className="text-lg font-bold text-white mb-2 uppercase group-hover:text-[#d7ff2f] transition-colors"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-normal">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. COMPANY TIMELINE (Slate bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#1e2230]">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Our Roadmap
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Company <span className="text-[#d7ff2f]">Timeline</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 sm:pl-0">
            {/* Center Vertical Line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#d7ff2f] via-[#00f2fe] to-transparent -translate-x-1/2" />

            {[
              { year: "2024", title: "Company Founded", desc: "Established in Colombo, Sri Lanka with initial seed funding & AI fitness prototype." },
              { year: "2025", title: "1,000 Members", desc: "Crossed 1,000 active members across partner athletic clubs in Sri Lanka." },
              { year: "2026", title: "AI Platform Launch", desc: "Official launch of FitAI SaaS platform featuring neural workout recommendations." },
              { year: "2027", title: "Expansion Across Sri Lanka", desc: "Scaling platform adoption to 50+ gyms island-wide." },
              { year: "Future", title: "International Growth", desc: "Expanding digital health SaaS infrastructure to South Asia & global markets." },
            ].map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center mb-10 ${
                  index % 2 === 0 ? "sm:flex-row-reverse text-left" : "text-left"
                }`}
              >
                {/* Center Node */}
                <div className="absolute left-0 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d7ff2f] border-4 border-[#1e2230] z-10" />

                {/* Content Box */}
                <div className={`sm:w-1/2 pl-8 sm:pl-0 ${index % 2 === 0 ? "sm:pl-10" : "sm:pr-10"}`}>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/15 hover:border-[#d7ff2f]/40 transition-all">
                    <span
                      className="text-[#d7ff2f] font-black text-base block mb-1 uppercase"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="text-white font-bold text-lg mb-1 uppercase"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. STATISTICS SECTION (Deep Dark bg)
         ========================================================================= */}
      <section className="py-16 bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { number: "5,000+", label: "Active Members" },
              { number: "150+", label: "Certified Trainers" },
              { number: "25+", label: "Partner Gyms" },
              { number: "98%", label: "Customer Satisfaction" },
              { number: "50K+", label: "Workouts Completed" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#111] p-6 rounded-xl border border-white/10"
              >
                <h3
                  className="text-3xl sm:text-4xl font-black text-[#d7ff2f] mb-1 uppercase"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {stat.number}
                </h3>
                <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         7. MEET OUR TEAM (Slate bg)
         ========================================================================= */}
      <section id="team" className="section-spacing bg-[#1e2230]">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Leadership &amp; Experts
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Meet Our <span className="text-[#d7ff2f]">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Kasun Perera",
                role: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=85",
                bio: "Visionary tech founder leading FitAI's product strategy and Sri Lankan growth.",
              },
              {
                name: "Dilshan Silva",
                role: "Head Strength Coach",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=85",
                bio: "Master trainer with 12+ years expertise in athletic performance and biomechanics.",
              },
              {
                name: "Senuri Fernando",
                role: "Nutrition Specialist",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
                bio: "Clinical dietitian specializing in performance fueling and AI meal algorithms.",
              },
              {
                name: "Malith Jayasinghe",
                role: "Lead Software Engineer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
                bio: "AI architect driving FitAI's neural recommendation engines and cloud platform.",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white/5 rounded-xl overflow-hidden group border border-white/15 hover:border-[#d7ff2f]/50 transition-all"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {member.name}
                    </h3>
                    <a
                      href="#"
                      aria-label="LinkedIn"
                      className="text-slate-300 hover:text-[#d7ff2f] transition-colors"
                    >
                      <IconLinkedin />
                    </a>
                  </div>
                  <p className="text-[#d7ff2f] text-xs font-bold uppercase tracking-wider mb-2">
                    {member.role}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         8. OUR CORE VALUES (Deep Dark bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Ethos &amp; Philosophy
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Our Core <span className="text-[#d7ff2f]">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Innovation", icon: Rocket },
              { name: "Discipline", icon: Target },
              { name: "Community", icon: HeartHandshake },
              { name: "Integrity", icon: Shield },
              { name: "Consistency", icon: Compass },
              { name: "Growth", icon: TrendingUp },
            ].map((val) => {
              const IconComponent = val.icon;
              return (
                <div
                  key={val.name}
                  className="bg-[#111] p-5 text-center rounded-xl border border-white/10 hover:border-[#d7ff2f]/40 transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#d7ff2f]/20 text-[#d7ff2f] flex items-center justify-center mx-auto mb-3 border border-[#d7ff2f]/30">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {val.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         9. CALL TO ACTION (Deep Dark bg)
         ========================================================================= */}
      <section className="relative py-28 overflow-hidden bg-[#0b0b0b]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1920&q=90"
            alt="Gym training background"
            fill
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0b0b0b] via-[#0b0b0b]/90 to-[#0b0b0b]" />
        </div>

        <div className="container-gym relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
            Join FitAI Today
          </span>

          <h2
            className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 uppercase leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Start Your Fitness <br />
            <span className="text-[#d7ff2f]">Journey Today.</span>
          </h2>

          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Experience AI-powered workouts, smart nutrition plans, and professional coaching—all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#pricing"
              className="px-9 py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black uppercase tracking-wider rounded-lg text-base shadow-[0_6px_30px_rgba(215,255,47,0.4)] hover:scale-105 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Join Now
            </Link>

            <Link
              href="/#contact"
              className="px-9 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold uppercase tracking-wider rounded-lg text-base hover:bg-white/20 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
         10. FOOTER (Exact match from Home Page)
         ========================================================================= */}
      <Footer />
    </main>
  );
}
