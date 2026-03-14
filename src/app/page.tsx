// "use client";
// import FloatingLines from "@/components/FloatingLines";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div>
//       {/* Background — untouched */}
//       <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
//         <FloatingLines
//           enabledWaves={["top", "middle", "bottom"]}
//           lineCount={5}
//           lineDistance={5}
//           bendRadius={5}
//           bendStrength={-0.5}
//           interactive={true}
//           parallax={true}
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-5 py-6 pointer-events-none">
//         {/* Navbar */}
//         <nav className="flex items-center justify-between px-5 py-2.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-xl w-[min(540px,92vw)] pointer-events-auto">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div
//               className="w-7 h-7 rounded-lg flex items-center justify-center"
//               style={{
//                 background: "linear-gradient(135deg, #E947F5, #2F4BA2)",
//               }}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M9 12L11 14L15 10"
//                   stroke="#fff"
//                   strokeWidth="2.2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M12 3L4 7V13C4 17.4 7.4 21.5 12 22.5C16.6 21.5 20 17.4 20 13V7L12 3Z"
//                   stroke="#fff"
//                   strokeWidth="1.8"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <span className="text-white font-extrabold text-base tracking-tight">
//               ezy
//             </span>
//           </div>

//           {/* Nav Links */}
//           <div className="flex items-center gap-7">
//             <a
//               href="https://github.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white/70 text-sm font-medium no-underline transition-colors duration-200 hover:text-[#E947F5]"
//             >
//               Services
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-white/70 text-sm font-medium no-underline transition-colors duration-200 hover:text-[#E947F5]"
//             >
//               Support
//             </a>
//           </div>
//         </nav>

//         {/* Hero */}
//         <div className="flex-1 flex flex-col items-center justify-center text-center gap-7 pointer-events-auto">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E947F5]/30 bg-[#E947F5]/8">
//             <div className="relative flex items-center justify-center w-3 h-3">
//               <span className="absolute inline-flex h-full w-full rounded-full bg-[#E947F5]/40 animate-ping" />
//               <span
//                 className="relative w-1.5 h-1.5 rounded-full bg-[#E947F5]"
//                 style={{ boxShadow: "0 0 6px #E947F5" }}
//               />
//             </div>
//             <span className="text-white/75 text-xs font-medium uppercase tracking-widest">
//               Question Paper Generator
//             </span>
//           </div>

//           {/* Heading */}
//           <h1 className="text-white font-extrabold leading-[1.1] tracking-tighter m-0 text-[clamp(40px,7vw,72px)] font-[Georgia,serif]">
//             Generate{" "}
//             <span className="bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent">
//               Questions.
//             </span>
//             <br />
//             Download Instantly.
//           </h1>

//           {/* Subtitle */}
//           <p
//             className="text-white/50 max-w-sm leading-relaxed m-0 font-normal"
//             style={{ fontSize: "clamp(14px, 2vw, 17px)" }}
//           >
//             Create formatted question papers for Classes 1–12 in Bangla or
//             English. Clean, fast, and ready to print.
//           </p>

//           {/* CTA Button */}
//           <Link
//             href="/generate"
//             className="mt-1 px-10 py-3.5 rounded-full text-white font-bold text-sm tracking-tight no-underline inline-block transition-transform duration-200 hover:scale-105"
//             style={{
//               background: "linear-gradient(135deg, #E947F5, #2F4BA2)",
//               boxShadow:
//                 "0 0 32px rgba(233,71,245,0.3), 0 0 64px rgba(47,75,162,0.2)",
//             }}
//           >
//             Get Started
//           </Link>
//         </div>

//         {/* Footer */}
//         <p className="text-white/20 text-xs m-0 pointer-events-auto">
//           © {new Date().getFullYear()} ezy · Built for students & educators
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";
import FloatingLines from "@/components/FloatingLines";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const canvas = document.querySelector(".floating-lines-container canvas") as HTMLElement;
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
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
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
        <nav className="flex items-center justify-between px-5 py-2.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-xl w-[min(540px,92vw)] pointer-events-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E947F5, #2F4BA2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 3L4 7V13C4 17.4 7.4 21.5 12 22.5C16.6 21.5 20 17.4 20 13V7L12 3Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-white font-extrabold text-base tracking-tight">ezy</span>
          </div>

          <div className="flex items-center gap-7">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 text-sm font-medium no-underline transition-colors duration-200 hover:text-[#E947F5]"
            >
              Services
            </a>
            <a
              href="https://linkedin.com"
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
              <span className="relative w-1.5 h-1.5 rounded-full bg-[#E947F5]" style={{ boxShadow: "0 0 6px #E947F5" }} />
            </div>
            <span className="text-white/75 text-xs font-medium uppercase tracking-widest">
              Question Paper Generator
            </span>
          </div>

          <h1 className="text-white font-extrabold leading-[1.1] tracking-tighter m-0 text-[clamp(40px,7vw,72px)] font-[Georgia,serif]">
            Generate{" "}
            <span className="bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent">
              Questions.
            </span>
            <br />
            Download Instantly.
          </h1>

          <p
            className="text-white/50 max-w-sm leading-relaxed m-0 font-normal"
            style={{ fontSize: "clamp(14px, 2vw, 17px)" }}
          >
            Create formatted question papers for Classes 1–12 in Bangla or
            English. Clean, fast, and ready to print.
          </p>

          <Link
            href="/generate"
            className="mt-1 px-10 py-3.5 rounded-full text-white font-bold text-sm tracking-tight no-underline inline-block transition-transform duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #E947F5, #2F4BA2)",
              boxShadow: "0 0 32px rgba(233,71,245,0.3), 0 0 64px rgba(47,75,162,0.2)",
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Footer */}
        <p className="text-white/20 text-xs m-0 pointer-events-auto">
          © {new Date().getFullYear()} ezy · Built for students & educators
        </p>
      </div>
    </div>
  );
}