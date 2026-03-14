import { STEP_BADGE_STYLE } from "@/lib/constants";

interface Props {
  step: number;
  title: string;
}

export default function StepHeader({ step, title }: Props) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
        style={STEP_BADGE_STYLE}
      >
        {step}
      </div>
      <h2 className="text-white font-semibold text-2xl">{title}</h2>
    </div>
  );
}
