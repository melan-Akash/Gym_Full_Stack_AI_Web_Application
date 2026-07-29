"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Building,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

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
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&q=95"
            alt="FORGED Facility Contact"
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
            CONTACT <span className="text-[#d7ff2f]">US</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            Get in touch with our expert coaching staff, schedule a facility walkthrough, or inquire about custom corporate &amp; team training.
          </p>
        </div>
      </section>

      {/* =========================================================================
         2. CONTACT INFO CARDS (Deep Dark bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Direct Channels
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Reach Our <span className="text-[#d7ff2f]">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "Flagship Facility",
                subtitle: "Colombo, Sri Lanka",
                details: "142 Galle Road, Colombo 03",
                color: "#d7ff2f",
              },
              {
                icon: Phone,
                title: "Direct Phone",
                subtitle: "Support & Inquiries",
                details: "+94 (11) 234-5678\n+94 (77) 123-4567",
                color: "#00f2fe",
              },
              {
                icon: Mail,
                title: "Email Support",
                subtitle: "2-Hour Response Time",
                details: "info@forgedathletic.lk\nsupport@fitai.lk",
                color: "#d7ff2f",
              },
              {
                icon: Clock,
                title: "Facility Hours",
                subtitle: "Member & Guest Access",
                details: "24/7 Member Key Fob\nFront Desk: 6AM–10PM Daily",
                color: "#00f2fe",
              },
            ].map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-[#111] p-7 rounded-xl border border-white/10 hover:border-[#d7ff2f]/40 transition-all group"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 border border-white/10"
                    style={{ backgroundColor: `${card.color}20`, color: card.color }}
                  >
                    <IconComp size={24} />
                  </div>
                  <h3
                    className="text-xl font-bold text-white uppercase mb-1 group-hover:text-[#d7ff2f] transition-colors"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs font-bold text-[#d7ff2f]/80 uppercase tracking-wider mb-3">
                    {card.subtitle}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
                    {card.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. INTERACTIVE CONTACT FORM & MAP (Slate bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#1e2230]">
        <div className="container-gym">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white/5 p-8 sm:p-10 rounded-xl border border-white/15">
              <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
                Send A Message
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black uppercase text-white mb-3"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Start Your <span className="text-[#d7ff2f]">Consultation</span>
              </h2>
              <p className="text-slate-300 text-sm mb-8 font-normal">
                Fill out the form below. Our head strength coach will get back to you within 2 hours.
              </p>

              {submitted ? (
                <div className="bg-[#111] p-10 rounded-xl border border-[#d7ff2f]/50 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#d7ff2f] text-[#0b0b0b] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3
                    className="text-2xl font-black text-white uppercase mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Message Received!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                    Thank you for reaching out to FORGED. Our team has received your details and will contact you via phone/email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-colors cursor-pointer"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Kasun Kalhara"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="kasun@example.com"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+94 77 123 4567"
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Primary Goal / Modality
                      </label>
                      <select className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#d7ff2f] transition-colors cursor-pointer">
                        <option value="force">Force &amp; Velocity (Strength)</option>
                        <option value="cardio">Cardio &amp; Fat Burn</option>
                        <option value="coaching">1-on-1 Personal Mentorship</option>
                        <option value="recovery">Restoration &amp; Cryo Suite</option>
                        <option value="membership">Membership Inquiries</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your fitness targets, schedule, or questions..."
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {loading ? "Sending Message..." : "Submit Inquiry"}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar / Locations info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white/5 p-8 rounded-xl border border-white/15">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="text-[#d7ff2f]" size={24} />
                  <h3
                    className="text-xl font-bold uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Colombo Flagship
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                  Our 15,000 sq ft performance center located in Colombo 03 features IPF-approved powerlifting racks, cold plunges, infrared saunas, and 50m sprint turf.
                </p>
                <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#d7ff2f]" />
                    <span>Free Dedicated On-Site Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#d7ff2f]" />
                    <span>VIP Locker Rooms &amp; Showers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#d7ff2f]" />
                    <span>Smoothie &amp; Protein Bar</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder Card */}
              <div className="relative h-64 rounded-xl overflow-hidden border border-white/15 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85"
                  alt="Colombo Training Center Map"
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#1e2230]/90 backdrop-blur-md rounded-lg border border-white/20">
                  <p className="text-sm font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    142 Galle Road, Colombo 03
                  </p>
                  <p className="text-xs text-[#d7ff2f] mt-0.5 font-semibold">
                    Open 24 Hours · Member Keycard Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. SRI LANKA CENTERS (Deep Dark bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Island-Wide Presence
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Our Athletic <span className="text-[#d7ff2f]">Centers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: "Colombo 03",
                tag: "Flagship Facility",
                address: "142 Galle Road, Colombo 03",
                phone: "+94 11 234 5678",
                image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=85",
              },
              {
                city: "Kandy",
                tag: "Performance Lab",
                address: "58 Peradeniya Road, Kandy",
                phone: "+94 81 222 3456",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=85",
              },
              {
                city: "Galle Fort",
                tag: "Coastal Training Hub",
                address: "24 Church Street, Galle Fort",
                phone: "+94 91 223 4567",
                image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=85",
              },
            ].map((center) => (
              <div
                key={center.city}
                className="bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#d7ff2f]/40 transition-all group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={center.image}
                    alt={center.city}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-widest rounded-md">
                      {center.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl font-black text-white uppercase mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {center.city}
                  </h3>
                  <p className="text-slate-300 text-xs mb-1 font-medium">
                    📍 {center.address}
                  </p>
                  <p className="text-slate-300 text-xs font-medium">
                    📞 {center.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. CALL TO ACTION (Deep Dark bg)
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
            Experience FORGED
          </span>

          <h2
            className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 uppercase leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Experience The <br />
            <span className="text-[#d7ff2f]">FORGED Standard.</span>
          </h2>

          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
            Claim your 7-day free trial pass or drop by our front desk for a guided facility tour today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#pricing"
              className="px-9 py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black uppercase tracking-wider rounded-lg text-base shadow-[0_6px_30px_rgba(215,255,47,0.4)] hover:scale-105 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Get Free Trial
            </Link>

            <Link
              href="/about"
              className="px-9 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold uppercase tracking-wider rounded-lg text-base hover:bg-white/20 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. FOOTER
         ========================================================================= */}
      <Footer />
    </main>
  );
}
