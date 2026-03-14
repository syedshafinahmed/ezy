import { useEffect } from "react";

export function useFloatingLinesPointer() {
  useEffect(() => {
    const canvas = document.querySelector(
      ".floating-lines-container canvas",
    ) as HTMLElement;
    if (!canvas) return;
    const forward = (e: PointerEvent) =>
      canvas.dispatchEvent(new PointerEvent(e.type, e));
    window.addEventListener("pointermove", forward);
    window.addEventListener("pointerleave", forward);
    return () => {
      window.removeEventListener("pointermove", forward);
      window.removeEventListener("pointerleave", forward);
    };
  }, []);
}
