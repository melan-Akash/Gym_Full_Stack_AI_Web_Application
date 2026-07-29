import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-[#1e2230] text-white min-h-screen flex flex-col justify-between font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-[#d7ff2f]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Header */}
      <header className="p-8 border-b border-white/10 flex items-center justify-between relative z-10">
        <Link href="/" className="inline-block">
          <Image
            width={297}
            height={72}
            className="h-8 w-auto"
            src="/assets/logo.svg"
            alt="FORGED Logo"
          />
        </Link>

        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-[#d7ff2f] transition-colors"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          FORGED Main Portal
        </Link>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex items-center justify-center p-6 relative z-10 text-center max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Big 404 Display */}
          <div className="relative inline-block">
            <span
              className="text-9xl sm:text-[140px] font-black text-transparent bg-clip-text bg-linear-to-b from-[#d7ff2f] to-[#d7ff2f]/20 leading-none select-none"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              404
            </span>
          </div>

          <div className="space-y-3">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block font-heading">
              Page Out Of Bounds
            </span>
            <h1
              className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              TRAINING PROTOCOL <span className="text-[#d7ff2f]">NOT FOUND</span>
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto font-normal">
              The page or resource you are looking for has been relocated, renamed, or does not exist within the FORGED domain network.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="px-8 py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Home size={16} />
              Return To Homepage
            </Link>

            <Link
              href="/services"
              className="px-8 py-4 bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Compass size={16} />
              Explore Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 border-t border-white/10 relative z-10">
        © {new Date().getFullYear()} FORGED Athletic &amp; Performance Center.
      </footer>
    </main>
  );
}
