"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dumbbell,
  Zap,
  Brain,
  Heart,
  Timer,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Flame,
  ShieldCheck,
  Activity,
  Plus,
  Minus,
} from "lucide-react";

const capabilities = [
  {
    icon: Dumbbell,
    title: "Force & Velocity",
    subtitle: "Heavy Iron & Systemic Overload",
    description:
      "Precision powerlifting, strength mechanics, and neuromuscular hypertrophy protocols engineered for maximum force production.",
    tag: "Foundation",
    features: [
      "Olympic weightlifting platforms",
      "Calibrated steel & urethane plates",
      "Velocity-based training sensors",
      "Biomechanical form analysis",
    ],
    color: "#d7ff2f",
  },
  {
    icon: Zap,
    title: "Cardio & Stamina",
    subtitle: "High-Output Energy Systems",
    description:
      "Rapid-pace metabolic conditioning designed to accelerate lipid burn, elevate VO2 max, and build relentless cardiovascular endurance.",
    tag: "Fat Burn",
    features: [
      "Interactive Assault AirBikes",
      "Sled pull & sprint turf tracks",
      "Heart rate zone telemetries",
      "Anaerobic threshold drills",
    ],
    color: "#00f2fe",
  },
  {
    icon: Brain,
    title: "Custom Mentorship",
    subtitle: "1-on-1 Credentialed Coaching",
    description:
      "Bespoke periodization pathways tailored to your unique anatomical structure, competition schedules, and personal goals.",
    tag: "Premium",
    highlight: true,
    features: [
      "Dedicated elite personal coach",
      "Weekly video form reviews",
      "Custom macronutrient planning",
      "24/7 direct coach messaging",
    ],
    color: "#d7ff2f",
  },
  {
    icon: Heart,
    title: "Restoration & Therapy",
    subtitle: "Regeneration & Cellular Repair",
    description:
      "Cold plunges, infrared heat, contrast therapy, and guided tissue release to minimize DOMS and optimize recovery speed.",
    tag: "Recovery",
    features: [
      "Sub-zero cryo & cold plunges",
      "Full-spectrum infrared saunas",
      "Percussion therapy stations",
      "Dynamic decompression boots",
    ],
    color: "#00f2fe",
  },
  {
    icon: Timer,
    title: "Aerobic Capacity",
    subtitle: "Endurance & Lactate Threshold",
    description:
      "Systematic pacing frameworks and aerobic base building protocols for marathon runners, triathletes, and tactical athletes.",
    tag: "Endurance",
    features: [
      "Lactate threshold testing",
      "Pacing & cadence mastery",
      "Pneumatic rowing resistance",
      "Mitochondrial density training",
    ],
    color: "#d7ff2f",
  },
  {
    icon: Trophy,
    title: "Championship Ready",
    subtitle: "Competition & Stage Preparation",
    description:
      "Rigorous contest prep protocols for powerlifting meets, bodybuilding stages, Hyrox events, and professional sports.",
    tag: "Elite",
    features: [
      "Peak week manipulation plans",
      "Stage posing & execution clinics",
      "Meet day handler support",
      "Psychological mindset prep",
    ],
    color: "#00f2fe",
  },
];

const modalities = [
  {
    title: "Biometric AI Tracking",
    description:
      "Integrated smart sensors track velocity, bar speed, heart rate variability (HRV), and muscle fatigue in real time.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85",
  },
  {
    title: "Hydrotherapy & Cold Plunge",
    description:
      "38°F mineralized cold water tanks reduce systemic inflammation and stimulate rapid metabolic nervous system reboot.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=85",
  },
  {
    title: "Powerlifting & Heavy Iron",
    description:
      "Eleiko competition bars, IPF-approved power racks, and specialized specialty bars built for maximum loading safety.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85",
  },
  {
    title: "Elite Competition Turf",
    description:
      "50-meter indoor shock-absorbing turf engineered for heavy sled drives, farmer carries, and explosive sprint work.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=85",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Biometric Assessment",
    desc: "We perform complete body composition analysis, movement screening, and baseline strength testing to identify your baseline.",
  },
  {
    step: "02",
    title: "Periodized Blueprint",
    desc: "Our neural algorithms and head coaches build a multi-phase training program targeted specifically to your timeline.",
  },
  {
    step: "03",
    title: "High-Intensity Execution",
    desc: "Execute your daily workouts under the supervision of certified trainers using world-class equipment and real-time feedback.",
  },
  {
    step: "04",
    title: "Recovery & Optimization",
    desc: "Leverage our contrast therapy suite and nutrition plans to ensure full cellular recovery before your next session.",
  },
];

const serviceFaqs = [
  {
    q: "Can I customize my training program based on my schedule?",
    a: "Absolutely. All program blueprints adapt seamlessly to your availability—whether you can train 3 days or 6 days a week.",
  },
  {
    q: "Are personal training sessions available individually?",
    a: "Yes, 1-on-1 private mentorship sessions can be booked individually or included in our Performance and Elite membership tiers.",
  },
  {
    q: "Do I need prior gym experience to join these programs?",
    a: "No. Our certified coaches tailor movement patterns and weight selection to your current experience level, from total beginner to elite competitor.",
  },
  {
    q: "How does the AI nutrition recommendation system work?",
    a: "By tracking your workout volume, metabolic output, and goals, the AI calculates precise daily calorie and macronutrient targets.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-[#1e2230] text-white min-h-screen overflow-x-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <Navbar />

      {/* =========================================================================
         1. HERO SECTION (Slate bg)
         ========================================================================= */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-36 pb-24 overflow-hidden bg-[#1e2230]">
        {/* Full-bleed background image & dark gradient overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=95"
            alt="FORGED Services & Capabilities"
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-[#1e2230]/75 to-[#1e2230]/40" />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e2230] via-transparent to-[#1e2230]" />

          {/* Ambient light spots */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d7ff2f]/15 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00f2fe]/15 rounded-full blur-[160px] pointer-events-none" />
        </div>

        <div className="container-gym w-full relative z-10 text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            OUR <span className="text-[#d7ff2f]">SERVICES</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            Precision training programs, bespoke coaching, AI workout analytics, and high-performance recovery facilities engineered for athletes.
          </p>
        </div>
      </section>

      {/* =========================================================================
         2. CORE CAPABILITIES GRID (Deep Dark bg)
         ========================================================================= */}
      <section id="capabilities" className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Training Modalities
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Engineered <span className="text-[#d7ff2f]">For Output</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div
                  key={cap.title}
                  className={`bg-[#111] p-8 rounded-xl border relative flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                    cap.highlight
                      ? "border-[#d7ff2f]/60 shadow-[0_8px_40px_rgba(215,255,47,0.15)]"
                      : "border-white/10 hover:border-[#d7ff2f]/40"
                  }`}
                >
                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest"
                        style={{
                          backgroundColor: `${cap.color}20`,
                          color: cap.color,
                          border: `1px solid ${cap.color}40`,
                        }}
                      >
                        {cap.tag}
                      </span>
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${cap.color}15`, color: cap.color }}
                      >
                        <IconComponent size={24} />
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-black text-white uppercase mb-1 group-hover:text-[#d7ff2f] transition-colors"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {cap.title}
                    </h3>
                    <p className="text-xs font-bold text-[#d7ff2f]/80 uppercase tracking-wider mb-4">
                      {cap.subtitle}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                      {cap.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                      {cap.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-[#d7ff2f] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full py-3 bg-white/5 border border-white/15 hover:border-[#d7ff2f] hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Inquire Capability
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. ELITE FACILITIES & MODALITIES (Slate bg)
         ========================================================================= */}
      <section id="modalities" className="section-spacing bg-[#1e2230]">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              World-Class Infrastructure
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Next-Gen <span className="text-[#d7ff2f]">Facilities</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modalities.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 rounded-xl overflow-hidden border border-white/15 group hover:border-[#d7ff2f]/50 transition-all"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <h3
                    className="text-2xl font-black uppercase text-white mb-2 group-hover:text-[#d7ff2f] transition-colors"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. THE FORGED TRAINING BLUEPRINT (Deep Dark bg)
         ========================================================================= */}
      <section id="process" className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Methodology
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              The Training <span className="text-[#d7ff2f]">Blueprint</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#d7ff2f]/40 transition-all relative"
              >
                <span
                  className="text-5xl font-black text-[#d7ff2f]/30 leading-none block mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {step.step}
                </span>
                <h3
                  className="text-xl font-bold text-white uppercase mb-3"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. SERVICE FAQS (Slate bg)
         ========================================================================= */}
      <section id="faq" className="section-spacing bg-[#1e2230]">
        <div className="container-gym max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Got Questions?
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Service <span className="text-[#d7ff2f]">FAQs</span>
            </h2>
          </div>

          <div className="space-y-4">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white/5 rounded-xl border border-white/15 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span
                      className={`text-lg font-bold uppercase transition-colors ${
                        isOpen ? "text-[#d7ff2f]" : "text-white"
                      }`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "border-[#d7ff2f] bg-[#d7ff2f] text-[#0b0b0b]"
                          : "border-white/20 text-white/70"
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-white/10">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. CALL TO ACTION (Deep Dark bg)
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
            Elevate Your Standard
          </span>

          <h2
            className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 uppercase leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Ready to Elevate <br />
            <span className="text-[#d7ff2f]">Your Training?</span>
          </h2>

          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Book a facility tour, consult with our head strength coaches, or claim your 7-day free trial pass.
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
              href="/contact"
              className="px-9 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold uppercase tracking-wider rounded-lg text-base hover:bg-white/20 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
         7. FOOTER
         ========================================================================= */}
      <Footer />
    </main>
  );
}
