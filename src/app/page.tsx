"use client";
import FloatingLines from "@/components/FloatingLines";

export default function Home() {
  return (
    <div>
      {/* Background */}
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
      <div style={{ position: "relative", zIndex: 1 }}>
        <p>Welcome to the Home page!</p>
      </div>
    </div>
  );
}
