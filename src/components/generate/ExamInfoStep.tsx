import { ExamMeta } from "@/lib/types";
import { INPUT_CLASS, LABEL_CLASS, CLASS_OPTIONS } from "@/lib/constants";
import StepHeader from "./StepHeader";

interface Props {
  meta: ExamMeta;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export default function ExamInfoStep({ meta, onChange }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8">
      <StepHeader step={1} title="Exam Information" />

      <div className="flex flex-col gap-4">
        {/* Institution Name — full width always */}
        <div>
          <label className={LABEL_CLASS}>Institution Name</label>
          <input
            type="text"
            name="institutionName"
            value={meta.institutionName}
            onChange={onChange}
            placeholder="e.g. Dhaka Model School & College"
            className={INPUT_CLASS}
          />
        </div>

        {/* Version + Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="version" className={LABEL_CLASS}>
              Version
            </label>
            <select
              id="version"
              name="version"
              value={meta.version}
              onChange={onChange}
              className={`${INPUT_CLASS} input-select`}
            >
              <option value="">— Select —</option>
              <option value="Bangla">Bangla</option>
              <option value="English">English</option>
            </select>
          </div>

          <div>
            <label htmlFor="classLevel" className={LABEL_CLASS}>
              Class
            </label>
            <select
              id="classLevel"
              name="classLevel"
              value={meta.classLevel}
              onChange={onChange}
              className={`${INPUT_CLASS} input-select`}
            >
              <option value="">— Select —</option>
              {CLASS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chapter + Time + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={LABEL_CLASS}>Chapter</label>
            <input
              type="number"
              name="chapter"
              value={meta.chapter}
              onChange={onChange}
              placeholder="e.g. 3"
              min={1}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="time" className={LABEL_CLASS}>
              Time
            </label>
            <input
              id="time"
              type="time"
              name="time"
              value={meta.time}
              onChange={onChange}
              className={`${INPUT_CLASS} scheme-dark`}
            />
          </div>

          <div>
            <label htmlFor="date" className={LABEL_CLASS}>
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={meta.date}
              onChange={onChange}
              className={`${INPUT_CLASS} scheme-dark`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
