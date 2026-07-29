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
  { label: "Pricing", href: "/#pricing" },
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
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-white/5 border border-[#d7ff2f]/40 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-[#d7ff2f] text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Sign In
            </Link>
            <motion.a
              href="/#pricing"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(215,255,47,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-heading font-black text-xs uppercase tracking-wider rounded-full shadow-[0_4px_20px_rgba(215,255,47,0.3)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Get Access
              <ArrowRight size={14} />
            </motion.a>
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
            className="fixed inset-0 z-40 bg-[#12151c]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
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
                  className="text-3xl font-heading font-black uppercase tracking-widest text-white hover:text-[#d7ff2f] transition-colors"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
              href="/#pricing"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-[#d7ff2f] text-[#0b0b0b] font-heading font-bold text-lg uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(215,255,47,0.4)]"
            >
              Get Access
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
