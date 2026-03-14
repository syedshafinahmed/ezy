import Link from "next/link";

const Hero = () => {
  return (
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

      {/* Hero Heading */}
      <h1
        className="text-white font-extrabold leading-[1.1] tracking-tighter m-0 text-[clamp(30px,7vw,72px)]"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Generate{" "}
        <span className="bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent pr-1">
          Questions
        </span>
        <br />
        Download Instantly
      </h1>

      {/* Hero Subheading */}
      <p className="text-white/70 max-w-sm leading-relaxed m-0 font-normal text-[clamp(14px,2vw,17px)]">
        Create formatted question papers for Classes 1–12 in Bangla or English.
        Clean, fast, and ready to print.
      </p>

      {/* Call to Action */}
      <>
        <style>
          {`.btn-pulse {
                  animation: btnPulse 2s ease-in-out infinite;
                }
                @keyframes btnPulse {
                  0%, 10% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(233, 71, 245, 0.7);
                  }
                  45%, 55% {
                    box-shadow: 0 0 0 10px rgba(233, 71, 245, 0);
                  }
                  100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(233, 71, 245, 0);
                  }
                }`}
        </style>
        {/* Call to Action Button */}
        <div>
          <Link
            href="/generate"
            className="btn-pulse mt-1 px-10 py-3.5 rounded-full text-white font-extralight text-lg tracking-tight no-underline inline-block bg-linear-to-br from-[#E947F5] to-[#2F4BA2]"
          >
            Get Started
          </Link>
        </div>
      </>
    </div>
  );
};

export default Hero;
