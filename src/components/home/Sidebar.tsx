import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { useState } from "react";

const socials = [
  {
    icon: FaGithub,
    href: "https://github.com/syedshafinahmed",
    hoverColor: "#ffffff",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/syed-shafin-ahmed/",
    hoverColor: "#0A66C2",
  },
  {
    icon: FaDiscord,
    href: "https://discord.com/users/1440245018341277756",
    hoverColor: "#5865F2",
  },
];

const Sidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 pointer-events-auto">
      <div className="w-px h-16 bg-linear-to-b from-transparent to-white/20" />

      {socials.map(({ icon: Icon, href, hoverColor }, index) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 text-xl"
          style={{ color: hoveredIndex === index ? hoverColor : "rgba(255,255,255,0.4)" }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Icon />
        </a>
      ))}

      <div className="w-px h-16 bg-linear-to-t from-transparent to-white/20" />
    </div>
  );
};

export default Sidebar;