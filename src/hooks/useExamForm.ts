"use client";
import { useState, useCallback } from "react";
import { ExamMeta, INITIAL_META } from "@/lib/types";

export function useExamForm() {
  const [meta, setMeta] = useState<ExamMeta>(INITIAL_META);
  const [questionCount, setQuestionCount] = useState<number | "">("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const metaComplete =
    meta.institutionName.trim() !== "" &&
    meta.version !== "" &&
    meta.time !== "" &&
    meta.date !== "" &&
    meta.classLevel !== "" &&
    meta.chapter.trim() !== "";

  const questionsReady =
    metaComplete &&
    typeof questionCount === "number" &&
    questionCount > 0 &&
    questions.length === questionCount &&
    questions.every((q) => q.trim() !== "");

  const handleMetaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setMeta((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleQuestionCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      setQuestionCount("");
      setQuestions([]);
    } else {
      const clamped = Math.min(val, 50);
      setQuestionCount(clamped);
      setQuestions((prev) =>
        Array.from({ length: clamped }, (_, i) => prev[i] ?? ""),
      );
    }
  };

  const handleQuestionChange = useCallback((index: number, value: string) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const handleDownload = async () => {
    if (!questionsReady) return;
    setIsGenerating(true);
    try {
      const { generateExamPdf } = await import("@/lib/generateExamPdf");
      await generateExamPdf({
        institutionName: meta.institutionName,
        version: meta.version as "Bangla" | "English",
        time: meta.time,
        date: meta.date,
        classLevel: meta.classLevel,
        chapter: meta.chapter,
        questions,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const completedMeta = Object.values(meta).filter((v) => v !== "").length;
  const totalSteps =
    6 + 1 + (typeof questionCount === "number" ? questionCount : 0);
  const completedSteps =
    completedMeta +
    (questionCount !== "" ? 1 : 0) +
    questions.filter((q) => q.trim() !== "").length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  return {
    meta,
    questionCount,
    questions,
    isGenerating,
    metaComplete,
    questionsReady,
    progress,
    handleMetaChange,
    handleQuestionCountChange,
    handleQuestionChange,
    handleDownload,
  };
}
