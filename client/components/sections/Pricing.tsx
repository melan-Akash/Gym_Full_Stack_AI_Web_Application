"use client";

import { motion } from "framer-motion";
import { FadeUp } from "../motion/FadeUp";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Foundation",
    price: 79,
    period: "/ month",
    description: "All the essentials to launch your elite training journey.",
    features: [
      "Gym floor access (6am–10pm)",
      "Group classes (10/month)",
      "Basic fitness assessment",
      "Locker room access",
      "App access & progress tracking",
    ],
    cta: "Start Now",
    highlight: false,
  },
  {
    name: "Performance",
    price: 149,
    period: "/ month",
    description: "The go‑to plan for high‑performance athletes.",
    features: [
      "24/7 gym floor access",
      "Unlimited group classes",
      "Monthly 1-on-1 coaching session",
      "Advanced biometric tracking",
      "Recovery suite access",
      "Nutrition guidance",
      "Priority class booking",
    ],
    cta: "Upgrade to Performance",
    highlight: true,
  },
  {
    name: "Elite",
    price: 299,
    period: "/ month",
    description: "Complete, unrestricted access to all elite facilities.",
    features: [
      "All Performance features",
      "Weekly personal training (4x)",
      "Custom meal planning",
      "Competition prep support",
      "VIP recovery suite priority",
      "Guest passes (2/month)",
      "Dedicated coach",
    ],
    cta: "Become Elite",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-spacing bg-[#0f0f0f]">
      <div className="container-gym">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Elite Memberships
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="text-5xl font-black uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              UNLEASH YOUR ELITE
              <br />
              <span className="text-[#d7ff2f]"> ATHLETE</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/50 text-base max-w-md mx-auto mt-3">
              Zero contracts, cancel anytime. Enjoy a 7‑day free elite trial.
            </p>
          </FadeUp>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl p-8 flex flex-col ${plan.highlight
                ? "bg-[#d7ff2f] shadow-[0_0_60px_rgba(215,255,47,0.25)]"
                : "bg-[#111] border border-[#222] hover:border-[#333]"
                }`}
            >
              {plan.highlight && (
                <div className="absolute top-2 right-2">
                  <span className="flex items-center gap-1 px-4 py-1 bg-[#0b0b0b] text-[#d7ff2f] text-[10px] font-black uppercase tracking-widest rounded-full">
                    <Zap size={10} fill="#d7ff2f" /> Most Popular
                  </span>
                </div>
              )}

              {/* Plan name */}
              <p
                className={`text-xs font-black uppercase tracking-widest mb-4 ${plan.highlight ? "text-[#0b0b0b]/60" : "text-white/40"
                  }`}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-4">
                <span
                  className={`text-5xl font-black leading-none ${plan.highlight ? "text-[#0b0b0b]" : "text-white"
                    }`}
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  ${plan.price}
                </span>
                <span
                  className={`text-sm font-medium mb-2 ${plan.highlight ? "text-[#0b0b0b]/60" : "text-white/40"
                    }`}
                >
                  {plan.period}
                </span>
              </div>

              <p
                className={`text-sm leading-relaxed mb-8 ${plan.highlight ? "text-[#0b0b0b]/70" : "text-white/50"
                  }`}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlight ? "bg-[#0b0b0b]" : "bg-[#d7ff2f]/10"
                        }`}
                    >
                      <Check
                        size={10}
                        className={plan.highlight ? "text-[#d7ff2f]" : "text-[#d7ff2f]"}
                      />
                    </div>
                    <span
                      className={`text-sm ${plan.highlight ? "text-[#0b0b0b]" : "text-white/70"
                        }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3.5 rounded-full font-heading font-black uppercase tracking-wider text-sm transition-all duration-200 ${plan.highlight
                  ? "bg-[#0b0b0b] text-[#d7ff2f] hover:bg-[#111]"
                  : "bg-[#d7ff2f] text-[#0b0b0b] hover:bg-[#c8f020] hover:shadow-[0_0_20px_rgba(215,255,47,0.3)]"
                  }`}
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <FadeUp delay={0.3} className="text-center mt-10">
          <p className="text-white/30 text-xs">
            All prices are in USD. Taxes may apply based on your location. Cancel anytime — no questions asked.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
