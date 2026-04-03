import { STEP_BADGE_STYLE } from "@/lib/constants";
import StepHeader from "./StepHeader";
import QuestionRichTextEditor from "./QuestionRichTextEditor";

interface Props {
  questions: string[];
  onChange: (index: number, value: string) => void;
}

export default function QuestionsStep({ questions, onChange }: Props) {
  const mountKey = String(questions.length);

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 step-enter">
      <StepHeader step={3} title="Enter Your Questions" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {questions.map((q, i) => (
          <div key={`${mountKey}-${i}`} className="flex items-start gap-3">
            <span
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mt-2"
              style={STEP_BADGE_STYLE}
            >
              {i + 1}
            </span>
            <QuestionRichTextEditor
              mountKey={mountKey}
              value={q}
              placeholder={`Question ${i + 1}`}
              onChange={(html) => onChange(i, html)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
