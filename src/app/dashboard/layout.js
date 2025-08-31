"use client";
import { Roboto_Mono } from "next/font/google";
import "./../globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/authContext";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-roboto-mono",
});


export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Navbar at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar: overlay on mobile, fixed on desktop */}
      <div>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area - scrollable */}
      <div className="flex flex-col w-full pt-16">
        <main className="flex-1 p-4 md:p-6 overflow-y-auto h-[calc(100vh-64px)] transition-all duration-300 md:ml-64" style={{ marginLeft: sidebarOpen ? 0 : undefined }}>
          {children}
        </main>
      </div>
    </div>
  );
}
