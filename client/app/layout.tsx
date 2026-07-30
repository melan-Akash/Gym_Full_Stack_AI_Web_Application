import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { ToastContainer } from "react-toast-msg";
import AiChatWidget from "@/components/ui/AiChatWidget";
import { AppProvider } from "@/context/appcontext";

export const metadata: Metadata = {
  title: "FORGED | Elite Athletic & Performance Center",
  description:
    "Convert potential into peak power at FORGED — the premier high-end athletic center dedicated to dedicated athletes and fitness purists.",
  keywords: "gym, fitness, premium, luxury, training, performance, strength, bodybuilding",
  openGraph: {
    title: "FORGED | Elite Athletic Facility",
    description:
      "Convert potential into peak power at FORGED — the premier high-end athletic facility.",
    type: "website",
  },
};

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AppProvider>
          <ToastContainer />
          {children}
          <AiChatWidget />
        </AppProvider>
      </body>
    </html>
  );
}
