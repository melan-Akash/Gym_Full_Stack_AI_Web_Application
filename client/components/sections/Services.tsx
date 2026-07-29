"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeUp } from "../motion/FadeUp";
import { Dumbbell, Zap, Brain, Heart, Timer, Trophy } from "lucide-react";

const services = [
  {
    icon: Dumbbell,
    title: "Force & Velocity",
    description:
      "Heavy-iron sessions grounded in systemic overload principles. Dominate your squat, bench and pull.",
    tag: "Foundation",
  },
  {
    icon: Zap,
    title: "Cardio & Stamina",
    description:
      "Rapid-pace energy system protocols to accelerate lipid burn and elevate peak endurance capacities.",
    tag: "Fat Burn",
  },
  {
    icon: Brain,
    title: "Custom Mentorship",
    description:
      "One-on-one sessions with credentialed training mentors. Bespoke pathways tailored for your unique targets.",
    tag: "Premium",
    highlight: true,
  },
  {
    icon: Heart,
    title: "Restoration & Therapy",
    description:
      "Cold plunges, infrared heat, deep tissue work and flexibility drills. Rebuild quicker, execute stronger.",
    tag: "Recovery",
  },
  {
    icon: Timer,
    title: "Aerobic Capacity",
    description:
      "Base building to maximum oxygen uptake — systematic pacing systems for endurance competitors.",
    tag: "Cardio",
  },
  {
    icon: Trophy,
    title: "Championship Ready",
    description:
      "Focused prep strategies for powerlifting events, bodybuilding stages and sporting tournaments.",
    tag: "Elite",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-spacing bg-[#1e2230]">
      <div className="container-gym">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeUp>
              <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                Our Capabilities
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="text-5xl font-black uppercase text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                ROUTINES
                <br />
                THAT <span className="text-[#d7ff2f]">COMPEL</span>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="max-w-xs">
            <p className="text-white/50 text-sm leading-relaxed">
              Each program is crafted with a single focus: trackable progression in the most efficient timeframe possible.
            </p>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ backgroundColor: service.highlight ? "#1a2000" : "#111111" }}
                className={`relative p-8 group cursor-default transition-colors duration-300 ${service.highlight ? "bg-[#111]" : "bg-[#0b0b0b]"
                  }`}
              >
                {/* Highlight accent bar */}
                {service.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#d7ff2f]" />
                )}

                {/* Tag */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-6 ${service.highlight
                    ? "bg-[#d7ff2f] text-[#0b0b0b]"
                    : "bg-[#1a1a1a] text-white/50"
                    }`}
                >
                  {service.tag}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${service.highlight
                    ? "bg-[#d7ff2f] group-hover:scale-110"
                    : "bg-[#1a1a1a] group-hover:bg-[#d7ff2f]/10"
                    }`}
                >
                  <Icon
                    size={22}
                    className={
                      service.highlight ? "text-[#0b0b0b]" : "text-[#d7ff2f]"
                    }
                  />
                </div>

                <h3
                  className="text-xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#d7ff2f] transition-colors duration-300"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {service.title}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-1 text-[#d7ff2f] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Learn More
                  </span>
                  <span className="text-xs">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Meet Our AI Feature Banner */}
        <div className="mt-16 bg-[#0b0b0b] p-8 sm:p-10 rounded-2xl border border-[#d7ff2f]/50 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="text-[#d7ff2f] text-xs font-black tracking-[0.25em] uppercase mb-2 block font-heading">
              FitAI Intelligence
            </span>
            <h3
              className="text-3xl sm:text-4xl font-black uppercase text-white mb-3"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Meet Our <span className="text-[#d7ff2f]">AI Engine</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Experience personalized Sri Lankan high-protein meal plans, Periodized workout routines, Navy body fat analysis, and 24/7 AI Neural Coach Chat.
            </p>
          </div>

          <Link
            href="/meet-our-ai"
            className="px-8 py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.4)] hover:scale-105 transition-all shrink-0 cursor-pointer"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Meet Our AI Engine →
          </Link>
        </div>
      </div>
    </section>
  );
}
