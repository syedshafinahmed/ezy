import FloatingLines from "@/components/FloatingLines";
import React from "react";

const page = () => {
  return (
    <div>
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
    </div>
  );
};

export default page;
