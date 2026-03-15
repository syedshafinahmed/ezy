"use client";
import Background from "@/components/Background";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Sidebar from "@/components/home/Sidebar";
import { useFloatingLinesPointer } from "@/hooks/useFloatingLinesPointer";

export default function Home() {
  useFloatingLinesPointer();

  return (
    <div>
      {/* Background */}
      <Background />
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-5 py-6 pointer-events-none">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </div>
  );
}
