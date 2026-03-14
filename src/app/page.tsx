"use client";
import FloatingLines from "@/components/FloatingLines";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const canvas = document.querySelector(
      ".floating-lines-container canvas",
    ) as HTMLElement;
    if (!canvas) return;

    const forward = (e: PointerEvent) => {
      const event = new PointerEvent(e.type, e);
      canvas.dispatchEvent(event);
    };

    window.addEventListener("pointermove", forward);
    window.addEventListener("pointerleave", forward);

    return () => {
      window.removeEventListener("pointermove", forward);
      window.removeEventListener("pointerleave", forward);
    };
  }, []);

  return (
    <div>
      {/* Background — untouched */}
      <div className="fixed inset-0 -z-10">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-5 py-6 pointer-events-none">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-5 py-2.5 rounded-full border border-white/10 bg-white/10 backdrop-blur-2xl w-[min(700px,92vw)] pointer-events-auto">
          <div className="flex items-center translate-y-2">
            <span className="text-5xl -translate-y-3 font-bold tracking-tighter bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent">
              ezy
            </span>
            <span className="relative w-2 h-2 rounded-full bg-[#2F4BA2] translate-y-0.5" />
          </div>

          <div className="flex items-center gap-7 mr-2">
            <a
              href="https://github.com/syedshafinahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 text-sm font-medium no-underline transition-colors duration-200 hover:text-[#E947F5]"
            >
              Services
            </a>
            <a
              href="https://www.linkedin.com/in/syed-shafin-ahmed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 text-sm font-medium no-underline transition-colors duration-200 hover:text-[#E947F5]"
            >
              Support
            </a>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-7 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E947F5]/30 bg-[#E947F5]/8">
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#E947F5]/40 animate-ping" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-[#E947F5] shadow-[0_0_6px_#E947F5]" />
            </div>
            <span className="text-white/75 text-xs font-medium uppercase tracking-widest">
              Question Paper Generator
            </span>
          </div>

          {/* Georgia only on h1 */}
          <h1
            className="text-white font-extrabold leading-[1.1] tracking-tighter m-0 text-[clamp(40px,7vw,72px)]"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Generate{" "}
            <span className="bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent">
              Questions
            </span>
            <br />
            Download Instantly
          </h1>

          <p className="text-white/50 max-w-sm leading-relaxed m-0 font-normal text-[clamp(14px,2vw,17px)]">
            Create formatted question papers for Classes 1–12 in Bangla or
            English. Clean, fast, and ready to print.
          </p>

          <Link
            href="/generate"
            className="mt-1 px-10 py-3.5 rounded-full text-white font-extralight text-lg tracking-tight no-underline inline-block transition-transform duration-200"
            style={{
              background: "linear-gradient(135deg, #E947F5, #2F4BA2)",
              boxShadow:
                "0 0 32px rgba(233,71,245,0.3), 0 0 64px rgba(47,75,162,0.2)",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Footer */}
        <div className="text-white/40 m-0 pointer-events-auto flex gap-1 items-center">
          <span className="text-2xl translate-y-1">
            {String.fromCharCode(169)}
          </span>
          <span className="text-sm">
            {new Date().getFullYear()}{" "}
            <span className="bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent">
              ezy
            </span>{" "}
            · Built for students & educators
          </span>
        </div>
      </div>
    </div>
  );
}