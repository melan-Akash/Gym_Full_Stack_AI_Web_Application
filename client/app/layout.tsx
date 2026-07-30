import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#141722",
                color: "#ffffff",
                border: "1px solid rgba(0, 242, 254, 0.3)",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "600",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              },
              success: {
                iconTheme: {
                  primary: "#00f2fe",
                  secondary: "#0b0b0b",
                },
              },
              error: {
                style: {
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                },
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
          {children}
          <AiChatWidget />
        </AppProvider>
      </body>
    </html>
  );
}
