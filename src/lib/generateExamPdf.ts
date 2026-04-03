import { isRichTextEmpty } from "./isRichTextEmpty";
import { renderMathForPdf } from "./renderMathForPdf";
import { ExamData } from "./types";

const KATEX_CSS_URL =
  "https://cdn.jsdelivr.net/npm/katex@0.16.44/dist/katex.min.css";

/** Inlined KaTeX CSS uses `url(fonts/...)`, which must resolve to the CDN or fonts never load. */
function absolutizeKatexFontUrls(css: string): string {
  return css.replace(
    /url\(fonts\//g,
    "url(https://cdn.jsdelivr.net/npm/katex@0.16.44/dist/fonts/",
  );
}

const BANGLA_LABELS = {
  mcq: "সংক্ষিপ্ত প্রশ্ন",
  class: "শ্রেণি",
  chapter: "অধ্যায়",
  time: "সময়",
  date: "তারিখ",
};

const ENGLISH_LABELS = {
  mcq: "Short Questions",
  class: "Class",
  chapter: "Chapter",
  time: "Time",
  date: "Date",
};

export async function generateExamPdf(data: ExamData): Promise<void> {
  const isBangla = data.version === "Bangla";
  const labels = isBangla ? BANGLA_LABELS : ENGLISH_LABELS;

  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  let katexInlineCss = "";
  try {
    const res = await fetch(KATEX_CSS_URL);
    if (res.ok) katexInlineCss = absolutizeKatexFontUrls(await res.text());
  } catch {
    /* math may render without full KaTeX styling */
  }

  const questionsHtml = data.questions
    .filter((q) => !isRichTextEmpty(q))
    .map(
      (q, i) => `
      <div style="
        display:flex;
        align-items:flex-start;
        gap:14px;
        padding:12px 28px;
        background:${i % 2 === 0 ? "#f7f9ff" : "#ffffff"};
        border-bottom:1px solid #eef0f8;
      ">
        <div style="
          background:#2F4BA2;
          color:white;
          font-size:11px;
          font-weight:700;
          min-width:26px;
          height:26px;
          border-radius:6px;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          font-family:Arial,sans-serif;
          transform: translateY(2px);
          line-height:1;
          padding-bottom:10px;
        ">${i + 1}</div>
        <div class="question-html" style="
          flex:1;
          font-size:15px;
          line-height:1.8;
          color:#1a1a2e;
          word-break:break-word;
          font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
          text-decoration:none !important;
        ">${q}</div>
      </div>`,
    )
    .join("");

  /** Full HTML for an isolated document (no Tailwind / lab() colors — html2canvas cannot parse them). */
  const pdfDocumentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=1240" />
  <style>
    ${katexInlineCss}
  </style>
  <style>
    html, body { margin: 0; padding: 0; }
    * {
      box-sizing: border-box;
      outline: none !important;
    }
    /* Don’t kill KaTeX fraction lines (they rely on border-bottom). */
    a {
      text-decoration: none !important;
      border-bottom: none !important;
    }
    .question-html img {
      display: block !important;
      margin: 10px auto !important;
      max-width: min(100%, 640px) !important;
      max-height: 360px !important;
      width: auto !important;
      height: auto !important;
      object-fit: contain;
    }
    .question-html .katex { color: inherit !important; }
    /* No extra fraction CSS overrides.
       PDF math is rendered with KaTeX output=svg (see renderMathForPdf),
       which avoids html2canvas border rendering issues. */
    .question-html p { margin: 0.35em 0; }
    .question-html strong { font-weight: 700; }
    .question-html em { font-style: italic; }
  </style>
</head>
<body style="background:#f0f2f8;font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;font-size:16px;color:#1a1a2e;">
  <div id="pdf-capture-root" style="
      display:block;
      font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
      padding:32px;
      background:#f0f2f8;
      width:1240px;
      box-sizing:border-box;
    ">
      <div style="
        background:white;
        border-radius:8px;
        overflow:hidden;
        border:3px solid #2F4BA2;
      ">

        <!-- Header -->
        <div style="
          background:#2F4BA2;
          padding:28px 32px 22px;
          text-align:center;
        ">
          <div style="
            font-size:28px;
            font-weight:700;
            color:white;
            letter-spacing:0.5px;
            margin-bottom:10px;
          ">
            <span style="
              font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
              font-size:28px;
              font-weight:700;
              color:white;
            ">${data.institutionName}</span>
          </div>
          <div style="height:4px;"></div>
        </div>

        <!-- MCQ Title -->
        <div style="
          background:#eef1ff;
          border-bottom:2px solid #dde3ff;
          text-align:center;
          padding:12px 0;
          font-size:17px;
          font-weight:700;
          color:#2F4BA2;
          letter-spacing:0.5px;
          font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
          text-decoration:none !important;
        ">${labels.mcq}</div>

        <!-- Meta Row -->
        <div style="
          display:flex;
          align-items:center;
          justify-content:center;
          padding:14px 32px;
          background:#fafbff;
          border-bottom:1px solid #e8eeff;
          flex-wrap:nowrap;
          gap:0;
        ">
          <!-- Class -->
          <div style="
            display:flex;
            align-items:center;
            gap:6px;
            padding:6px 24px;
            border-right:1px solid #dde5ff;
          ">
            <span style="
              font-size:11px;
              font-weight:600;
              color:#8896b3;
              font-family:Arial,sans-serif;
              text-decoration:none !important;
            ">${labels.class}</span>
            <span style="
              font-size:15px;
              font-weight:700;
              color:#2F4BA2;
              font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
              text-decoration:none !important;
            ">${data.classLevel}</span>
          </div>

          <!-- Chapter -->
          <div style="
            display:flex;
            align-items:center;
            gap:6px;
            padding:6px 24px;
            border-right:1px solid #dde5ff;
          ">
            <span style="
              font-size:11px;
              font-weight:600;
              color:#8896b3;
              font-family:Arial,sans-serif;
              text-decoration:none !important;
            ">${labels.chapter}</span>
            <span style="
              font-size:15px;
              font-weight:700;
              color:#2F4BA2;
              font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
              text-decoration:none !important;
            ">${data.chapter}</span>
          </div>

          <!-- Time -->
          <div style="
            display:flex;
            align-items:center;
            gap:6px;
            padding:6px 24px;
            border-right:1px solid #dde5ff;
          ">
            <span style="
              font-size:11px;
              font-weight:600;
              color:#8896b3;
              font-family:Arial,sans-serif;
              text-decoration:none !important;
            ">${labels.time}</span>
            <span style="
              font-size:15px;
              font-weight:700;
              color:#2F4BA2;
              font-family:Arial,sans-serif;
              text-decoration:none !important;
            ">${data.time}</span>
          </div>

          <!-- Date -->
          <div style="
            display:flex;
            align-items:center;
            gap:6px;
            padding:6px 24px;
          ">
            <span style="
              font-size:11px;
              font-weight:600;
              color:#8896b3;
              font-family:Arial,sans-serif;
              white-space:nowrap;
              text-decoration:none !important;
            ">${labels.date}</span>
            <span style="
              font-size:15px;
              font-weight:700;
              color:#2F4BA2;
              font-family:Arial,sans-serif;
              white-space:nowrap;
              text-decoration:none !important;
            ">${data.date}</span>
          </div>
        </div>

        <!-- Questions -->
        <div style="
          font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
          text-decoration:none !important;
        ">
          ${questionsHtml}
        </div>

        <!-- Footer -->
        <div style="
          background:#2F4BA2;
          padding:12px 28px;
          display:flex;
          justify-content:center;
          align-items:center;
        ">
          <span style="
            font-size:11px;
            color:rgba(255,255,255,0.6);
            font-style:italic;
            font-family:Arial,sans-serif;
            white-space:nowrap;
            text-decoration:none !important;
          ">Generated by ezy</span>
        </div>

      </div>
    </div>
</body>
</html>`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.title = "pdf-render";
  iframe.style.cssText =
    "position:fixed;left:-9999px;top:0;width:1240px;height:12000px;border:0;opacity:0;pointer-events:none";
  document.body.appendChild(iframe);

  const idoc = iframe.contentDocument!;
  idoc.open();
  idoc.write(pdfDocumentHtml);
  idoc.close();

  const captureRoot = idoc.getElementById("pdf-capture-root") as HTMLElement | null;
  if (!captureRoot) {
    document.body.removeChild(iframe);
    throw new Error("PDF render root missing");
  }

  /** TipTap saves only `data-latex` on empty nodes; KaTeX must run here to match the editor. */
  renderMathForPdf(captureRoot);

  if (idoc.fonts?.ready) {
    await idoc.fonts.ready;
  }
  await new Promise((r) => setTimeout(r, 150));

  try {
    const canvas = await html2canvas(captureRoot, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#f0f2f8",
      width: 1240,
      windowWidth: 1240,
      // Helps KaTeX borders/fraction lines match more closely.
      foreignObjectRendering: true,
    } as Parameters<typeof html2canvas>[1]);

    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`CQ_Class${data.classLevel}_Ch${data.chapter}.pdf`);
  } finally {
    document.body.removeChild(iframe);
  }
}