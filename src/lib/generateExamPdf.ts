// import jsPDF from "jspdf";
// import { ExamData } from "./types";

// const BANGLA_LABELS = {
//   mcq: "সংক্ষিপ্ত প্রশ্ন",
//   class: "শ্রেণি",
//   chapter: "অধ্যায়",
//   time: "সময়",
//   date: "তারিখ",
//   fullMarks: "পূর্ণমান",
//   instruction: "নির্দেশনা: প্রতিটি প্রশ্নের জন্য সঠিক উত্তরটি বেছে নিন।",
//   total: "মোট প্রশ্ন",
// };

// const ENGLISH_LABELS = {
//   mcq: "Short Questions",
//   class: "Class",
//   chapter: "Chapter",
//   time: "Time",
//   date: "Date",
//   fullMarks: "Full Marks",
//   instruction: "Instructions: Choose the best answer for each question.",
//   total: "Total Questions",
// };

// export function generateExamPdf(data: ExamData): void {
//   const doc = new jsPDF({ unit: "mm", format: "a4" });
//   const isBangla = data.version === "Bangla";
//   const labels = isBangla ? BANGLA_LABELS : ENGLISH_LABELS;

//   const pageWidth = doc.internal.pageSize.width;
//   const pageHeight = doc.internal.pageSize.height;
//   const margin = 15;
//   const contentWidth = pageWidth - margin * 2;

//   // ── Outer border ─────────────────────────────────────────
//   doc.setDrawColor(47, 75, 162);
//   doc.setLineWidth(1.2);
//   doc.rect(6, 6, pageWidth - 12, pageHeight - 12);
//   doc.setLineWidth(0.4);
//   doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

//   // ── Header ───────────────────────────────────────────────
//   doc.setFillColor(47, 75, 162);
//   doc.rect(8, 8, pageWidth - 16, 24, "F");

//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text(data.institutionName || "Institution Name", pageWidth / 2, 23, {
//     align: "center",
//   });

//   // ── MCQ Title ────────────────────────────────────────────
//   doc.setFillColor(233, 71, 245, 0.08);
//   doc.setFillColor(240, 235, 255);
//   doc.rect(8, 32, pageWidth - 16, 12, "F");

//   doc.setTextColor(47, 75, 162);
//   doc.setFontSize(11);
//   doc.setFont("helvetica", "bold");
//   doc.text(labels.mcq, pageWidth / 2, 40, { align: "center" });

//   // ── Divider ──────────────────────────────────────────────
//   doc.setDrawColor(200, 210, 230);
//   doc.setLineWidth(0.3);
//   doc.line(margin, 46, pageWidth - margin, 46);

//   // ── Meta row ─────────────────────────────────────────────
//   doc.setTextColor(50, 50, 50);
//   doc.setFontSize(9);

//   // Left
//   doc.setFont("helvetica", "bold");
//   doc.text(`${labels.class}: ${data.classLevel}`, margin, 53);
//   doc.text(`${labels.chapter}: ${data.chapter}`, margin, 59);

//   // Center
//   doc.text(`${labels.fullMarks}: ${data.questions.length}`, pageWidth / 2, 53, {
//     align: "center",
//   });

//   // Right
//   doc.text(`${labels.time}: ${data.time}`, pageWidth - margin, 53, {
//     align: "right",
//   });
//   doc.text(`${labels.date}: ${data.date}`, pageWidth - margin, 59, {
//     align: "right",
//   });

//   doc.setLineWidth(0.3);
//   doc.setDrawColor(200, 210, 230);
//   doc.line(margin, 63, pageWidth - margin, 63);

//   // ── Instruction ──────────────────────────────────────────
//   doc.setFont("helvetica", "italic");
//   doc.setFontSize(8.5);
//   doc.setTextColor(120, 120, 120);
//   doc.text(labels.instruction, margin, 69);

//   // ── Questions ────────────────────────────────────────────
//   let y = 78;
//   const lineHeight = 7;
//   const questionBoxHeight = 12;
//   const maxTextWidth = contentWidth - 14;

//   data.questions.forEach((question, index) => {
//     if (!question.trim()) return;

//     // Page overflow
//     if (y + questionBoxHeight > pageHeight - 20) {
//       doc.addPage();
//       doc.setDrawColor(47, 75, 162);
//       doc.setLineWidth(1.2);
//       doc.rect(6, 6, pageWidth - 12, pageHeight - 12);
//       doc.setLineWidth(0.4);
//       doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
//       y = 20;
//     }

//     // Alternating row bg
//     if (index % 2 === 0) {
//       doc.setFillColor(247, 248, 255);
//       doc.rect(margin - 2, y - 5, contentWidth + 4, questionBoxHeight, "F");
//     }

//     // Number badge
//     doc.setFillColor(47, 75, 162);
//     doc.roundedRect(margin - 2, y - 4.5, 8, 7, 1.5, 1.5, "F");
//     doc.setTextColor(255, 255, 255);
//     doc.setFontSize(8);
//     doc.setFont("helvetica", "bold");
//     doc.text(String(index + 1), margin + 2, y + 0.5, { align: "center" });

//     // Question text
//     doc.setTextColor(30, 30, 30);
//     doc.setFontSize(10.5);
//     doc.setFont("helvetica", "normal");
//     const lines = doc.splitTextToSize(question, maxTextWidth);
//     doc.text(lines, margin + 10, y);

//     y += lineHeight * lines.length + 4;
//   });

//   // ── Footer ───────────────────────────────────────────────
//   doc.setFontSize(8);
//   doc.setTextColor(180, 180, 180);
//   doc.setFont("helvetica", "italic");
//   const totalText = `${labels.total}: ${data.questions.filter((q) => q.trim()).length}`;
//   doc.text(totalText, pageWidth / 2, pageHeight - 12, { align: "center" });

//   // ── Save ─────────────────────────────────────────────────
//   const filename = `MCQ_Class${data.classLevel}_Ch${data.chapter}.pdf`;
//   doc.save(filename);
// }

// import { ExamData } from "./types";

// const BANGLA_LABELS = {
//   mcq: "বহুনির্বাচনি প্রশ্ন",
//   class: "শ্রেণি",
//   chapter: "অধ্যায়",
//   time: "সময়",
//   date: "তারিখ",
//   fullMarks: "পূর্ণমান",
//   instruction: "নির্দেশনা: প্রতিটি প্রশ্নের জন্য সঠিক উত্তরটি বেছে নিন।",
//   total: "মোট প্রশ্ন",
// };

// const ENGLISH_LABELS = {
//   mcq: "Multiple Choice Questions (MCQ)",
//   class: "Class",
//   chapter: "Chapter",
//   time: "Time",
//   date: "Date",
//   fullMarks: "Full Marks",
//   instruction: "Instructions: Choose the best answer for each question.",
//   total: "Total Questions",
// };

// export async function generateExamPdf(data: ExamData): Promise<void> {
//   const isBangla = data.version === "Bangla";
//   const labels = isBangla ? BANGLA_LABELS : ENGLISH_LABELS;

//   const html2pdf = (await import("html2pdf.js")).default;

//   const questionsHtml = data.questions
//     .filter((q) => q.trim())
//     .map(
//       (q, i) => `
//       <div class="question-row ${i % 2 === 0 ? "even" : ""}">
//         <span class="q-num">${i + 1}</span>
//         <span class="q-text">${q}</span>
//       </div>`,
//     )
//     .join("");

//   const html = `
//     <html>
//       <head>
//         <meta charset="UTF-8" />
//         <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet" />
//         <style>
//           * { margin: 0; padding: 0; box-sizing: border-box; }

//           body {
//             font-family: 'Noto Sans Bengali', 'Noto Sans', sans-serif;
//             font-size: 11px;
//             color: #1e1e1e;
//             padding: 10mm;
//           }

//           .page {
//             border: 2px solid #2F4BA2;
//             padding: 3mm;
//             min-height: 277mm;
//             position: relative;
//           }

//           .inner {
//             border: 0.5px solid #2F4BA2;
//             padding: 4mm;
//             min-height: 269mm;
//           }

//           .header {
//             background: #2F4BA2;
//             color: white;
//             text-align: center;
//             padding: 6px 0;
//             font-size: 14px;
//             font-weight: bold;
//             margin-bottom: 4px;
//           }

//           .title-bar {
//             background: #ede9ff;
//             color: #2F4BA2;
//             text-align: center;
//             padding: 4px 0;
//             font-size: 11px;
//             font-weight: bold;
//             margin-bottom: 4px;
//           }

//           .divider {
//             border: none;
//             border-top: 0.5px solid #c8d2e6;
//             margin: 4px 0;
//           }

//           .meta {
//             display: flex;
//             justify-content: space-between;
//             font-size: 9px;
//             font-weight: bold;
//             color: #323232;
//             padding: 2px 0;
//           }

//           .meta-col { display: flex; flex-direction: column; gap: 3px; }
//           .meta-col.center { align-items: center; }
//           .meta-col.right { align-items: flex-end; }

//           .instruction {
//             font-size: 8.5px;
//             color: #787878;
//             font-style: italic;
//             margin: 6px 0 8px;
//           }

//           .question-row {
//             display: flex;
//             align-items: flex-start;
//             gap: 8px;
//             padding: 5px 4px;
//             font-size: 10.5px;
//             line-height: 1.6;
//           }

//           .question-row.even {
//             background: #f7f8ff;
//           }

//           .q-num {
//             background: #2F4BA2;
//             color: white;
//             font-size: 8px;
//             font-weight: bold;
//             min-width: 18px;
//             height: 18px;
//             border-radius: 4px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             flex-shrink: 0;
//             margin-top: 1px;
//           }

//           .q-text {
//             flex: 1;
//             word-break: break-word;
//           }

//           .footer {
//             text-align: center;
//             font-size: 8px;
//             color: #b4b4b4;
//             font-style: italic;
//             margin-top: 12px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="page">
//           <div class="inner">
//             <div class="header">${data.institutionName}</div>
//             <div class="title-bar">${labels.mcq}</div>
//             <hr class="divider" />
//             <div class="meta">
//               <div class="meta-col">
//                 <span>${labels.class}: ${data.classLevel}</span>
//                 <span>${labels.chapter}: ${data.chapter}</span>
//               </div>
//               <div class="meta-col center">
//                 <span>${labels.fullMarks}: ${data.questions.filter((q) => q.trim()).length}</span>
//               </div>
//               <div class="meta-col right">
//                 <span>${labels.time}: ${data.time}</span>
//                 <span>${labels.date}: ${data.date}</span>
//               </div>
//             </div>
//             <hr class="divider" />
//             <div class="instruction">${labels.instruction}</div>
//             ${questionsHtml}
//             <div class="footer">${labels.total}: ${data.questions.filter((q) => q.trim()).length}</div>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   const opt = {
//     margin: 0,
//     filename: `MCQ_Class${data.classLevel}_Ch${data.chapter}.pdf`,
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: {
//       scale: 2,
//       useCORS: true,
//       ignoreElements: () => false,
//       onclone: (clonedDoc: Document) => {
//         // Remove all external stylesheets from the cloned document
//         const links = clonedDoc.querySelectorAll('link[rel="stylesheet"]');
//         links.forEach((link) => link.remove());
//         const styles = clonedDoc.querySelectorAll("style");
//         styles.forEach((style) => style.remove());
//       },
//     },
//     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//   };

//   await html2pdf().set(opt).from(html).save();
// }

import { ExamData } from "./types";

const BANGLA_LABELS = {
  mcq: "বহুনির্বাচনি প্রশ্ন",
  class: "শ্রেণি",
  chapter: "অধ্যায়",
  time: "সময়",
  date: "তারিখ",
};

const ENGLISH_LABELS = {
  mcq: "Multiple Choice Questions (MCQ)",
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
          margin-top:3px;
          font-family:Arial,sans-serif;
          text-decoration:none !important;
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
          <div style="
            width:60px;
            height:4px;
            background:#E947F5;
            margin:0 auto;
            border-radius:2px;
          "></div>
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