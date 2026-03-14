"use client";
import Prism from "@/components/Prism";

export default function Home() {
  return (
    <div>
      {/* Background — fixed behind everything */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <Prism
          animationType="hover"
          timeScale={0.5}
          height={1.5}
          baseWidth={3.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>

      {/* Content — sits on top */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p>Welcome to the Home page!</p>
        {/* rest of your content here */}
      </div>
    </div>
  );
}
