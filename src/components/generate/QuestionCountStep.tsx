import { INPUT_CLASS, LABEL_CLASS } from "@/lib/constants";
import StepHeader from "./StepHeader";

interface Props {
  value: number | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function QuestionCountStep({ value, onChange }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 step-enter">
      <StepHeader step={2} title="Number of Questions" />
      <div className="max-w-xs">
        <label className={LABEL_CLASS}>How many MCQ questions? (max 50)</label>
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder="e.g. 10"
          min={1}
          max={50}
          className={INPUT_CLASS}
        />
      </div>
    </div>
  );
}
