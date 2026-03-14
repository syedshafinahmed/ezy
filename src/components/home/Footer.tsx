const Footer = () => {
  return (
    <footer className="text-white/40 pointer-events-auto flex items-center gap-1">
      <span className="text-sm flex items-center">
        <span className="text-2xl translate-y-1 mr-1">
          {String.fromCharCode(169)}
        </span>{" "} 2026{" "}
        <span className="font-bold tracking-tighter bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent ml-1">
          ezy
        </span>
        <span className="w-0.5 h-0.5 rounded-full bg-[#2F4BA2] translate-y-0.5 inline-block mr-2" />{" "}
        Built for students & educators
      </span>
    </footer>
  );
};

export default Footer;
