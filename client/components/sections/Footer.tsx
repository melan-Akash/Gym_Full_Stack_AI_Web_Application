"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Custom social SVG icons
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about#story" },
    { label: "Meet Our Team", href: "/about#team" },
    { label: "Careers", href: "/#careers" },
    { label: "Partners", href: "/#partners" },
  ],
  Platform: [
    { label: "AI Planner Tools", href: "/ai-tools" },
    { label: "AI Meal Generator", href: "/ai-tools#meal-planner" },
    { label: "AI Workout Creator", href: "/ai-tools#workout-planner" },
    { label: "Biometric Analyzer", href: "/ai-tools#biometrics" },
    { label: "Capabilities", href: "/services" },
  ],
  Support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Membership Help", href: "/#pricing" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  { icon: IconInstagram, label: "Instagram", href: "#" },
  { icon: IconX, label: "Twitter/X", href: "#" },
  { icon: IconYoutube, label: "YouTube", href: "#" },
  { icon: IconFacebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e2230] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Oversized background text */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[22vw] font-black uppercase text-white/2.5 leading-none tracking-tighter translate-y-6"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          FORGED
        </span>
      </div>

      <div className="container-gym relative z-10">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand col */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                width={297}
                height={72}
                className="h-8.5 w-auto"
                src="/assets/logo.svg"
                alt="Logo"
              />
            </Link>
            <p className="text-slate-200 text-sm leading-relaxed mb-8 max-w-xs">
              The premium fitness destination for those who demand excellence.
              Transform energy into power, every single day.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3 font-heading">
                Get the weekly training drop
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-white/20 border-r-0 rounded-l-full px-5 py-3 text-white text-sm placeholder:text-slate-200/50 focus:outline-none focus:border-[#d7ff2f]/40"
                />
                <button className="px-5 py-3 bg-[#d7ff2f] text-[#0b0b0b] rounded-r-full font-bold text-sm hover:bg-[#c8f020] transition-colors">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Links cols */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4
                  className="text-white text-xs font-black uppercase tracking-widest mb-5"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-slate-200 text-sm hover:text-[#d7ff2f] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-slate-200/60 text-xs">
            © {new Date().getFullYear()} FORGED Athletic &amp; Performance Center. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:border-[#d7ff2f]/50 hover:text-[#d7ff2f] transition-all duration-200 bg-white/5"
                >
                  <Icon />
                </motion.a>
              );
            })}
          </div>

          <p className="text-slate-200/60 text-xs">
            Privacy · Terms · Cookies
          </p>
        </div>
      </div>
    </footer>
  );
}
