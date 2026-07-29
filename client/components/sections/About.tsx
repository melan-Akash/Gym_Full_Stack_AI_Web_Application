"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp, SlideIn } from "../motion/FadeUp";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Marathon Runner",
    quote: "FORGED rebuilt my stamina. I slashed my marathon record by 18 minutes.",
  },
  {
    name: "Priya Nair",
    role: "Powerlifter",
    quote: "The trainers are world-class. Incredible workout structures.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-spacing bg-[#0b0b0b] overflow-hidden"
    >
      <div className="container-gym">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Image */}
          <SlideIn direction="left" className="lg:col-span-5">
            <div className="relative">
              <div className="relative h-150 lg:h-175 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&q=90"
                  alt="Premium athletic training facility"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0b]/60 to-transparent" />
              </div>
              {/* Floating accent box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-[#d7ff2f] px-6 py-5 rounded-xl"
              >
                <p
                  className="text-4xl font-black text-[#0b0b0b] leading-none"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  12+
                </p>
                <p className="text-[#0b0b0b]/70 text-xs font-semibold uppercase tracking-widest mt-1">
                  Years of
                  <br />
                  Innovation
                </p>
              </motion.div>
            </div>
          </SlideIn>

          {/* Right: Content */}
          <div className="lg:col-span-7 lg:pl-8">
            <FadeUp delay={0.1}>
              <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                Our Core Ethos
              </span>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2
                className="text-5xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight text-white mb-6"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                DESIGNED FOR
                <br />
                <span className="text-[#d7ff2f]">VICTORIES,</span>
                <br />
                NOT VOLUMES.
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-white/60 text-base leading-relaxed mb-4 max-w-lg">
                FORGED emerged from a clear truth: superior outcomes demand superior
                spaces. We have designed every single square inch, each training
                machine and all training systems to unlock absolute peak
                performance from our community.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-10 max-w-lg">
                Zero compromises. Zero fads. Only empirical workout science,
                premium tier equipment and an unwavering commitment to supreme success.
              </p>
            </FadeUp>

            {/* Feature pills */}
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  "Data-Driven Routines",
                  "Pro-Grade Trainers",
                  "Recovery & Fueling",
                  "Biometric Analytics",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 border border-[#d7ff2f]/20 rounded-full text-xs font-medium text-white/70 bg-[#d7ff2f]/5 tracking-wide"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FadeUp>

            {/* Mini testimonials */}
            <FadeUp delay={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="p-5 bg-[#111] border border-[#222] rounded-xl hover:border-[#d7ff2f]/20 transition-colors duration-300"
                  >
                    <Quote size={18} className="text-[#d7ff2f] mb-3" />
                    <p className="text-white/70 text-sm leading-relaxed mb-3">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#d7ff2f]/20 flex items-center justify-center">
                        <span className="text-[#d7ff2f] text-xs font-bold">
                          {t.name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">{t.name}</p>
                        <p className="text-white/40 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
