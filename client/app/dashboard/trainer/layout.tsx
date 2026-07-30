"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Utensils,
  CheckSquare,
  CalendarDays,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Sparkles,
  Search,
} from "lucide-react";

const TRAINER_NAV = [
  { label: "Dashboard", href: "/dashboard/trainer", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/trainer/clients", icon: Users },
  { label: "Workout Builder", href: "/dashboard/trainer/workout-builder", icon: Dumbbell },
  { label: "Meal Builder", href: "/dashboard/trainer/meal-builder", icon: Utensils },
  { label: "Attendance", href: "/dashboard/trainer/attendance", icon: CheckSquare },
  { label: "Bookings", href: "/dashboard/trainer/bookings", icon: CalendarDays },
  { label: "Calendar", href: "/dashboard/trainer/calendar", icon: Calendar },
  { label: "Messages", href: "/dashboard/trainer/messages", icon: MessageSquare },
  { label: "Reports", href: "/dashboard/trainer/reports", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/trainer/settings", icon: Settings },
];

export default function TrainerDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex selection:bg-[#d7ff2f] selection:text-[#0b0b0b] font-body">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#12151c] border-r border-white/10 shrink-0 sticky top-0 h-screen justify-between z-30">
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/">
              <Image
                width={200}
                height={50}
                className="h-7 w-auto"
                src="/assets/logo.svg"
                alt="FORGED Logo"
              />
            </Link>
            <span className="px-2 py-0.5 bg-[#d7ff2f]/20 border border-[#d7ff2f]/40 text-[#d7ff2f] text-[9px] font-black uppercase tracking-wider rounded">
              TRAINER
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            {TRAINER_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard/trainer" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_20px_rgba(215,255,47,0.35)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Trainer Profile Card */}
        <div className="p-4 border-t border-white/10 bg-white/2">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&q=80"
              alt="Marcus Vance"
              width={38}
              height={38}
              className="rounded-full object-cover border border-[#d7ff2f]"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">Marcus Vance</h4>
              <p className="text-[10px] text-slate-400 truncate">Head Strength Coach</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-bold rounded-lg transition-all"
          >
            <LogOut size={14} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden flex">
          <div className="w-72 bg-[#12151c] h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <Image width={180} height={45} className="h-7 w-auto" src="/assets/logo.svg" alt="FORGED" />
                <button onClick={() => setMobileOpen(false)} className="text-white p-1">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1">
                {TRAINER_NAV.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/dashboard/trainer" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                        isActive ? "bg-[#d7ff2f] text-[#0b0b0b]" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10">
              <Link href="/login" className="flex items-center justify-center gap-2 text-xs font-bold text-red-400">
                <LogOut size={16} /> Log Out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#12151c]/80 backdrop-blur-md sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white p-1">
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 w-64">
              <Search size={14} />
              <span>Search client, plan, session...</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#d7ff2f]/10 border border-[#d7ff2f]/30 rounded-full text-[11px] font-bold text-[#d7ff2f]">
              <Sparkles size={12} />
              Active Shift: 07:00 AM - 05:00 PM
            </div>

            <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#d7ff2f]/40 text-slate-300 hover:text-white">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d7ff2f] animate-pulse" />
            </button>
          </div>
        </header>

        {/* Page Body */}
        <div className="p-4 sm:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}
