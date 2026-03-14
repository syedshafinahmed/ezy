import { INPUT_CLASS, STEP_BADGE_STYLE } from "@/lib/constants";
import StepHeader from "./StepHeader";

interface Props {
  questions: string[];
  onChange: (index: number, value: string) => void;
}

export default function QuestionsStep({ questions, onChange }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 step-enter">
      <StepHeader step={3} title="Enter Your Questions" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {questions.map((q, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={STEP_BADGE_STYLE}
            >
              {i + 1}
            </span>
            <input
              type="text"
              value={q}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder={`Question ${i + 1}`}
              className={INPUT_CLASS}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
