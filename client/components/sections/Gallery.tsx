"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "../motion/FadeUp";

const transformations = [
  {
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=90",
    name: "Jake Rivera",
    result: "-32 lbs in 12 weeks",
    tag: "Body Fat",
    span: "tall",
  },
  {
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=90",
    name: "Ava Thompson",
    result: "+18kg Deadlift PR",
    tag: "Power",
    span: "short",
  },
  {
    image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800&q=90",
    name: "Daniel Moore",
    result: "Marathon Finisher",
    tag: "Stamina",
    span: "short",
  },
  {
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=90",
    name: "Sofia Alvarez",
    result: "Competition Ready",
    tag: "Pro",
    span: "tall",
  },
];

export default function Gallery() {
  return (
    <section className="section-spacing bg-[#1e2230]">
      <div className="container-gym">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeUp>
            <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Proven Outcomes
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="text-5xl font-black uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              THE <span className="text-[#d7ff2f]">ACHIEVEMENT</span>
              <br />
              GALLERY
            </h2>
          </FadeUp>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1 - tall */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            className="col-span-1 row-span-2 relative group cursor-pointer"
          >
            <div className="relative h-125 rounded-xl overflow-hidden">
              <Image
                src={transformations[0].image}
                alt={transformations[0].name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0b] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="inline-block px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                  {transformations[0].tag}
                </span>
                <p
                  className="text-white font-black text-lg leading-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {transformations[0].name}
                </p>
                <p className="text-[#d7ff2f] text-sm font-semibold">
                  {transformations[0].result}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Column 2 - two short */}
          <div className="col-span-1 flex flex-col gap-4">
            {[transformations[1], transformations[2]].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-59.5 rounded-xl overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0b] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="inline-block px-2 py-0.5 bg-[#d7ff2f] text-[#0b0b0b] text-[9px] font-black uppercase tracking-widest rounded-full mb-1.5">
                      {t.tag}
                    </span>
                    <p
                      className="text-white font-black text-sm leading-tight"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-[#d7ff2f] text-xs font-semibold">
                      {t.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Columns 3 & 4: wide banner spanning */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="col-span-2 relative group cursor-pointer"
          >
            <div className="relative h-125 rounded-xl overflow-hidden">
              <Image
                src={transformations[3].image}
                alt={transformations[3].name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0b] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                  {transformations[3].tag}
                </span>
                <p
                  className="text-white font-black text-2xl leading-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {transformations[3].name}
                </p>
                <p className="text-[#d7ff2f] text-base font-semibold">
                  {transformations[3].result}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <FadeUp delay={0.2} className="text-center mt-12">
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#d7ff2f]/30 text-[#d7ff2f] font-heading font-bold uppercase tracking-wider rounded-full text-sm hover:bg-[#d7ff2f]/10 transition-colors duration-200"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Begin Your Journey
            <span>→</span>
          </motion.a>
        </FadeUp>
      </div>
    </section>
  );
}
