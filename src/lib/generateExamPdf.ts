import jsPDF from "jspdf";
import { ExamData } from "./types";

const BANGLA_LABELS = {
  mcq: "সংক্ষিপ্ত প্রশ্ন",
  class: "শ্রেণি",
  chapter: "অধ্যায়",
  time: "সময়",
  date: "তারিখ",
  fullMarks: "পূর্ণমান",
  instruction: "নির্দেশনা: প্রতিটি প্রশ্নের জন্য সঠিক উত্তরটি বেছে নিন।",
  total: "মোট প্রশ্ন",
};

const ENGLISH_LABELS = {
  mcq: "Short Questions",
  class: "Class",
  chapter: "Chapter",
  time: "Time",
  date: "Date",
  fullMarks: "Full Marks",
  instruction: "Instructions: Choose the best answer for each question.",
  total: "Total Questions",
};

export function generateExamPdf(data: ExamData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const isBangla = data.version === "Bangla";
  const labels = isBangla ? BANGLA_LABELS : ENGLISH_LABELS;

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // ── Outer border ─────────────────────────────────────────
  doc.setDrawColor(47, 75, 162);
  doc.setLineWidth(1.2);
  doc.rect(6, 6, pageWidth - 12, pageHeight - 12);
  doc.setLineWidth(0.4);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // ── Header ───────────────────────────────────────────────
  doc.setFillColor(47, 75, 162);
  doc.rect(8, 8, pageWidth - 16, 24, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(data.institutionName || "Institution Name", pageWidth / 2, 23, {
    align: "center",
  });

  // ── MCQ Title ────────────────────────────────────────────
  doc.setFillColor(233, 71, 245, 0.08);
  doc.setFillColor(240, 235, 255);
  doc.rect(8, 32, pageWidth - 16, 12, "F");

  doc.setTextColor(47, 75, 162);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(labels.mcq, pageWidth / 2, 40, { align: "center" });

  // ── Divider ──────────────────────────────────────────────
  doc.setDrawColor(200, 210, 230);
  doc.setLineWidth(0.3);
  doc.line(margin, 46, pageWidth - margin, 46);

  // ── Meta row ─────────────────────────────────────────────
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9);

  // Left
  doc.setFont("helvetica", "bold");
  doc.text(`${labels.class}: ${data.classLevel}`, margin, 53);
  doc.text(`${labels.chapter}: ${data.chapter}`, margin, 59);

  // Center
  doc.text(`${labels.fullMarks}: ${data.questions.length}`, pageWidth / 2, 53, {
    align: "center",
  });

  // Right
  doc.text(`${labels.time}: ${data.time}`, pageWidth - margin, 53, {
    align: "right",
  });
  doc.text(`${labels.date}: ${data.date}`, pageWidth - margin, 59, {
    align: "right",
  });

  doc.setLineWidth(0.3);
  doc.setDrawColor(200, 210, 230);
  doc.line(margin, 63, pageWidth - margin, 63);

  // ── Instruction ──────────────────────────────────────────
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(120, 120, 120);
  doc.text(labels.instruction, margin, 69);

  // ── Questions ────────────────────────────────────────────
  let y = 78;
  const lineHeight = 7;
  const questionBoxHeight = 12;
  const maxTextWidth = contentWidth - 14;

  data.questions.forEach((question, index) => {
    if (!question.trim()) return;

    // Page overflow
    if (y + questionBoxHeight > pageHeight - 20) {
      doc.addPage();
      doc.setDrawColor(47, 75, 162);
      doc.setLineWidth(1.2);
      doc.rect(6, 6, pageWidth - 12, pageHeight - 12);
      doc.setLineWidth(0.4);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
      y = 20;
    }

    // Alternating row bg
    if (index % 2 === 0) {
      doc.setFillColor(247, 248, 255);
      doc.rect(margin - 2, y - 5, contentWidth + 4, questionBoxHeight, "F");
    }

    // Number badge
    doc.setFillColor(47, 75, 162);
    doc.roundedRect(margin - 2, y - 4.5, 8, 7, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(String(index + 1), margin + 2, y + 0.5, { align: "center" });

    // Question text
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(10.5);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(question, maxTextWidth);
    doc.text(lines, margin + 10, y);

    y += lineHeight * lines.length + 4;
  });

  // ── Footer ───────────────────────────────────────────────
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.setFont("helvetica", "italic");
  const totalText = `${labels.total}: ${data.questions.filter((q) => q.trim()).length}`;
  doc.text(totalText, pageWidth / 2, pageHeight - 12, { align: "center" });

  // ── Save ─────────────────────────────────────────────────
  const filename = `MCQ_Class${data.classLevel}_Ch${data.chapter}.pdf`;
  doc.save(filename);
}
