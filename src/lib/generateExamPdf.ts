import { ExamData } from "./types";

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

  const questionsHtml = data.questions
    .filter((q) => q.trim())
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
        <div style="
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

  const wrapper = document.createElement("div");
  wrapper.setAttribute(
    "style",
    [
      "position:fixed",
      "top:-99999px",
      "left:-99999px",
      "width:1240px",
      "background:#f0f2f8",
      "z-index:-9999",
      "all:initial",
      "font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif",
      "font-size:16px",
      "color:#1a1a2e",
      "box-sizing:border-box",
      "display:block",
    ].join(";"),
  );

  wrapper.innerHTML = `
    <div style="
      all:initial;
      display:block;
      font-family:'Noto Sans Bengali','Noto Sans',Arial,sans-serif;
      padding:32px;
      background:#f0f2f8;
      width:1240px;
      box-sizing:border-box;
    ">
      <style>
        * {
          text-decoration: none !important;
          border-bottom: none !important;
          outline: none !important;
        }
      </style>

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
              text-decoration:none !important;
            ">${labels.date}</span>
            <span style="
              font-size:15px;
              font-weight:700;
              color:#2F4BA2;
              font-family:Arial,sans-serif;
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
            text-decoration:none !important;
          ">Generated by ezy</span>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(wrapper);
  await new Promise((r) => setTimeout(r, 800));

  try {
    const el = wrapper.firstElementChild as HTMLElement;

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#f0f2f8",
      width: 1240,
      onclone: (clonedDoc) => {
        Array.from(clonedDoc.styleSheets).forEach((sheet) => {
          try {
            sheet.disabled = true;
          } catch {
            // ignore cross-origin
          }
        });
      },
    });

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

    pdf.save(`MCQ_Class${data.classLevel}_Ch${data.chapter}.pdf`);
  } finally {
    document.body.removeChild(wrapper);
  }
}