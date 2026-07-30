"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blog" },
  { label: "Trainers", href: "/trainers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 transition-all duration-500"
      >
        <div
          className={`max-w-6xl mx-auto transition-all duration-500 rounded-full px-6 py-3.5 flex items-center justify-between ${
            scrolled
              ? "bg-[#181b26]/75 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              : "bg-[#141722]/50 backdrop-blur-md border border-white/10"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              width={297}
              height={72}
              className="h-8.5 w-auto transition-transform duration-300 group-hover:scale-105"
              src="/assets/logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs font-semibold text-white/70 hover:text-[#d7ff2f] transition-all duration-200 tracking-widest uppercase hover:scale-105 inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Glass CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/dashboard/trainer"
              className="px-3 py-1.5 bg-[#d7ff2f]/10 border border-[#d7ff2f]/40 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-[#d7ff2f] text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Trainer HQ
            </Link>
            <Link
              href="/dashboard/admin"
              className="px-3 py-1.5 bg-[#00f2fe]/10 border border-[#00f2fe]/40 hover:bg-[#00f2fe] hover:text-[#0b0b0b] text-[#00f2fe] text-[11px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Admin HQ
            </Link>
            <Link
              href="/login"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1.5 rounded-full bg-white/5 border border-white/10 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#12151c]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            <button
              className="absolute top-6 right-6 text-white p-2 rounded-full border border-white/10 bg-white/5 cursor-pointer"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-heading font-black uppercase tracking-widest text-white hover:text-[#d7ff2f] transition-colors"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div className="flex flex-col items-center gap-3 pt-4 border-t border-white/10 w-full max-w-xs px-6">
              <Link
                href="/dashboard/trainer"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-heading font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(215,255,47,0.4)]"
              >
                Trainer Dashboard
              </Link>
              <Link
                href="/dashboard/admin"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-[#00f2fe] text-[#0b0b0b] font-heading font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,242,254,0.4)]"
              >
                Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
