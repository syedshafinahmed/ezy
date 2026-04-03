import katex from "katex";

/**
 * TipTap `getHTML()` only stores `data-latex` on empty nodes; KaTeX runs in the editor via NodeView.
 * Before html2canvas, render LaTeX into those nodes so the PDF matches the editor.
 */
export function renderMathForPdf(root: HTMLElement): void {
  root
    .querySelectorAll('span[data-type="inline-math"][data-latex]')
    .forEach((el) => {
      const latex = el.getAttribute("data-latex") ?? "";
      if (!latex) return;
      try {
        katex.render(latex, el as HTMLElement, {
          throwOnError: false,
          // Use HTML output so it matches the editor math rendering.
          output: "html",
        });
      } catch {
        (el as HTMLElement).textContent = latex;
      }
    });

  root
    .querySelectorAll('div[data-type="block-math"][data-latex]')
    .forEach((el) => {
      const latex = el.getAttribute("data-latex") ?? "";
      if (!latex) return;
      try {
        katex.render(latex, el as HTMLElement, {
          throwOnError: false,
          // Use HTML output so it matches the editor math rendering.
          output: "html",
          displayMode: true,
        });
      } catch {
        (el as HTMLElement).textContent = latex;
      }
    });
}
