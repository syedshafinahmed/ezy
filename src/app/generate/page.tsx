"use client";
import { useExamForm } from "@/hooks/useExamForm";
import ProgressBar from "@/components/generate/ProgressBar";
import ExamInfoStep from "@/components/generate/ExamInfoStep";
import QuestionCountStep from "@/components/generate/QuestionCountStep";
import QuestionsStep from "@/components/generate/QuestionsStep";
import DownloadButton from "@/components/generate/DownloadButton";
import Background from "@/components/Background";
import { useFloatingLinesPointer } from "@/hooks/useFloatingLinesPointer";

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

  useFloatingLinesPointer();

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
        {/* Background */}
        <Background />

        {/* Content */}
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
              <p className="text-white/40 text-lg mt-2">
                Fill in the details below — the download button appears when
                you&apos;re done.
              </p>
              <ProgressBar progress={progress} />
            </div>

            {/* Exam Info Step */}
            <ExamInfoStep meta={meta} onChange={handleMetaChange} />

            {/* Question Count Step */}
            {metaComplete && (
              <QuestionCountStep
                value={questionCount}
                onChange={handleQuestionCountChange}
              />
            )}

            {/* Questions Step */}
            {metaComplete &&
              typeof questionCount === "number" &&
              questionCount > 0 && (
                <QuestionsStep
                  questions={questions}
                  onChange={handleQuestionChange}
                />
              )}

            {/* Download Button Step */}
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
