"use client";
import FloatingLines from "@/components/FloatingLines";
import { useEffect } from "react";
import { useExamForm } from "@/hooks/useExamForm";
import ProgressBar from "@/components/generate/ProgressBar";
import ExamInfoStep from "@/components/generate/ExamInfoStep";
import QuestionCountStep from "@/components/generate/QuestionCountStep";
import QuestionsStep from "@/components/generate/QuestionsStep";
import DownloadButton from "@/components/generate/DownloadButton";

export default function GeneratePage() {
  const {
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
  } = useExamForm();

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

  return (
    <>
      <style>{`
        .input-select option { background: #0a0a0f; color: white; }
        .step-enter { animation: stepEnter 0.3s ease forwards; }
        @keyframes stepEnter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .btn-pulse { animation: btnPulse 2s ease-in-out infinite; }
        @keyframes btnPulse {
          0%, 10%  { transform: scale(1); box-shadow: 0 0 0 0 rgba(233,71,245,0.7); }
          45%, 55% { box-shadow: 0 0 0 10px rgba(233,71,245,0); }
          100%     { transform: scale(1); box-shadow: 0 0 0 0 rgba(233,71,245,0); }
        }
      `}</style>

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

        <main className="min-h-screen flex flex-col items-center px-4 py-12">
          <div className="w-full max-w-7xl flex flex-col gap-6">
            {/* Header */}
            <div className="text-center mb-2">
              <h1
                className="text-white font-extrabold text-[clamp(28px,5vw,52px)] leading-tight tracking-tighter"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Create Your{" "}
                <span className="bg-[linear-gradient(100deg,#E947F5_0%,#2F4BA2_100%)] bg-clip-text text-transparent pb-1 inline-block">
                  Question Paper
                </span>
              </h1>
              <p className="text-white/40 text-sm mt-2">
                Fill in the details below — the download button appears when
                you're done.
              </p>
              <ProgressBar progress={progress} />
            </div>

            <ExamInfoStep meta={meta} onChange={handleMetaChange} />

            {metaComplete && (
              <QuestionCountStep
                value={questionCount}
                onChange={handleQuestionCountChange}
              />
            )}

            {metaComplete &&
              typeof questionCount === "number" &&
              questionCount > 0 && (
                <QuestionsStep
                  questions={questions}
                  onChange={handleQuestionChange}
                />
              )}

            {questionsReady && (
              <DownloadButton
                isGenerating={isGenerating}
                onClick={handleDownload}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}