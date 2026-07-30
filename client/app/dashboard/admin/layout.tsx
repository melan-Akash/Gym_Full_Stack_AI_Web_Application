"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  Receipt,
  CheckSquare,
  BarChart3,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Search,
  Sparkles,
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Members", href: "/dashboard/admin/members", icon: Users },
  { label: "Trainers", href: "/dashboard/admin/trainers", icon: UserCheck },
  { label: "Membership Plans", href: "/dashboard/admin/membership-plans", icon: CreditCard },
  { label: "Payments", href: "/dashboard/admin/payments", icon: Receipt },
  { label: "Attendance", href: "/dashboard/admin/attendance", icon: CheckSquare },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart3 },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex selection:bg-[#00f2fe] selection:text-[#0b0b0b] font-body">
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
            <span className="px-2 py-0.5 bg-[#00f2fe]/20 border border-[#00f2fe]/40 text-[#00f2fe] text-[9px] font-black uppercase tracking-wider rounded">
              ADMIN HQ
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#00f2fe] text-[#0b0b0b] shadow-[0_0_20px_rgba(0,242,254,0.35)]"
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

        {/* Admin Profile Card */}
        <div className="p-4 border-t border-white/10 bg-white/2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#00f2fe]/20 border border-[#00f2fe] flex items-center justify-center text-[#00f2fe] font-black text-xs">
              HQ
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">Administrator</h4>
              <p className="text-[10px] text-slate-400 truncate">FORGED General Manager</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-bold rounded-lg transition-all"
          >
            <LogOut size={14} />
            Exit Admin HQ
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
                {ADMIN_NAV.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/dashboard/admin" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                        isActive ? "bg-[#00f2fe] text-[#0b0b0b]" : "text-slate-300 hover:text-white"
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
                <LogOut size={16} /> Exit Admin HQ
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
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400 w-72">
              <Search size={14} />
              <span>Search members, trainers, transactions...</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[11px] font-bold text-emerald-400">
              <ShieldCheck size={12} />
              Facility Operations: ONLINE
            </div>

            <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00f2fe]/40 text-slate-300 hover:text-white">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
            </button>
          </div>
        </header>

        {/* Page Body */}
        <div className="p-4 sm:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}
