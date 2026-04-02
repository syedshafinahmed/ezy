const Navbar = () => {
  return (
    <div className="relative rounded-full p-px bg-[#0d0d1a] w-[min(700px,92vw)] pointer-events-auto">
      {/* Spinning border */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square animate-[spin_4s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, #E947F5 60deg, transparent 120deg)",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-5 py-2.5 rounded-full bg-[#0d0d1a] backdrop-blur-2xl">
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
    </div>
  );
};

export default Navbar;