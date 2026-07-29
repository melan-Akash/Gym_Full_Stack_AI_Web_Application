"use client";

import { AnimatedCounter } from "../ui/AnimatedCounter";
import { FadeUp } from "../motion/FadeUp";
import { motion } from "framer-motion";

const stats = [
  { value: 5000, suffix: "+", label: "Athletes Guided", description: "Top performers globally" },
  { value: 98, suffix: "%", label: "Triumph Rate", description: "Objective mastery" },
  { value: 47, suffix: "", label: "Specialist Instructors", description: "Accredited leaders" },
  { value: 12, suffix: "+", label: "Years Running", description: "Decades of distinction" },
  { value: 320, suffix: "+", label: "Sessions Monthly", description: "Diverse modalities" },
  { value: 15000, suffix: "sqft", label: "Physical Footprint", description: "Next-gen facilities" },
];

export default function Stats() {
  return (
    <section className="section-spacing bg-[#0f0f0f] border-y border-[#1a1a1a] relative overflow-hidden">
      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[18vw] font-black uppercase text-white/2 leading-none tracking-tighter"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          NUMBERS
        </span>
      </div>

      <div className="container-gym relative z-10">
        <div className="text-center mb-16">
          <FadeUp>
            <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Key Metrics
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="text-5xl font-black uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              ACHIEVEMENTS
              <br />
              <span className="text-[#d7ff2f]">THAT TELL EVERYTHING </span>
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0b0b0b] p-8 md:p-12 group hover:bg-[#111] transition-colors duration-300"
            >
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                duration={2200}
                className="block text-5xl font-black text-[#d7ff2f] leading-none mb-2 group-hover:scale-105 transition-transform duration-300 origin-left"
              />
              <p
                className="text-white text-base font-bold uppercase tracking-wide mb-1"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {stat.label}
              </p>
              <p className="text-white/40 text-xs">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
