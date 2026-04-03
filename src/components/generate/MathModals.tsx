"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  MATH_KIND_CONFIG,
  buildLatexFromFields,
  getDefaultFieldValues,
} from "@/lib/mathInsertConfig";

const overlayClass =
  "fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm";
const panelClass =
  "relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c0c12] p-6 shadow-2xl shadow-black/40";
const labelClass = "block text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5";
const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#E947F5]/50 focus:outline-none focus:ring-1 focus:ring-[#E947F5]/30";
const btnGhost =
  "rounded-xl px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors";
const btnPrimary =
  "rounded-xl px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#E947F5] to-[#2F4BA2] hover:opacity-95 transition-opacity disabled:opacity-40 disabled:pointer-events-none";

export function MathInsertModal({
  kind,
  onConfirm,
  onCancel,
  allowKindSelection = false,
  depth = 0,
}: {
  kind: string | null;
  onConfirm: (latex: string) => void;
  onCancel: () => void;
  allowKindSelection?: boolean;
  depth?: number;
}) {
  const titleId = useId();
  const fieldId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [currentKind, setCurrentKind] = useState<string | null>(kind);
  const [nestedForField, setNestedForField] = useState<string | null>(null);

  useEffect(() => {
    setCurrentKind(kind);
  }, [kind]);

  useEffect(() => {
    if (!currentKind) return;
    setValues(getDefaultFieldValues(currentKind));
    setError(null);
  }, [currentKind]);

  useEffect(() => {
    if (!currentKind) return;
    const t = requestAnimationFrame(() => firstFieldRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [currentKind]);

  useEffect(() => {
    if (!currentKind) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentKind, onCancel]);

  const submit = useCallback(() => {
    if (!currentKind) return;
    const latex = buildLatexFromFields(currentKind, values);
    if (latex == null) {
      setError("Fill in all fields.");
      return;
    }
    setError(null);
    onConfirm(latex);
  }, [currentKind, values, onConfirm]);

  if (!currentKind) return null;
  const cfg = MATH_KIND_CONFIG[currentKind];
  if (!cfg) return null;

  const canNest = depth < 2;

  return (
    <div
      className={overlayClass}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className={panelClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold text-white mb-1">
          {cfg.title}
        </h2>
        {allowKindSelection ? (
          <div className="mb-4">
            <label className={labelClass} htmlFor={`${fieldId}-kind`}>
              Equation type
            </label>
            <select
              id={`${fieldId}-kind`}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-[#E947F5]/50 focus:outline-none"
              value={currentKind}
              onChange={(e) => setCurrentKind(e.target.value)}
            >
              {Object.keys(MATH_KIND_CONFIG).map((k) => (
                <option key={k} value={k} className="bg-[#0a0a0f]">
                  {MATH_KIND_CONFIG[k]?.title ?? k}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        {cfg.description ? (
          <p className="text-sm text-white/45 mb-4">{cfg.description}</p>
        ) : (
          <p className="text-sm text-white/45 mb-4">
            Values are combined into LaTeX for the equation.
          </p>
        )}

        <div className="space-y-3 mb-5">
          {cfg.fields.map((f, i) => (
            <div key={f.key}>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label
                    className={labelClass}
                    htmlFor={`${fieldId}-${f.key}`}
                  >
                    {f.label}
                  </label>
                  <input
                    id={`${fieldId}-${f.key}`}
                    ref={i === 0 ? firstFieldRef : undefined}
                    className={inputClass}
                    value={values[f.key] ?? ""}
                    placeholder={f.placeholder}
                    autoComplete="off"
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [f.key]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && cfg.fields.length <= 3) {
                        e.preventDefault();
                        submit();
                      }
                    }}
                  />
                </div>
                {canNest ? (
                  <button
                    type="button"
                    className="rounded-xl px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setNestedForField(f.key)}
                    title="Insert a math expression into this field"
                  >
                    fx
                  </button>
                ) : null}
              </div>
            </div>
          ))}
          {cfg.fields.length === 0 && (
            <p className="text-sm text-white/50">No variables — click insert.</p>
          )}
        </div>

        {error ? (
          <p className="text-sm text-red-400/90 mb-3" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex justify-end gap-2">
          <button type="button" className={btnGhost} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={btnPrimary} onClick={submit}>
            Insert
          </button>
        </div>

        {nestedForField ? (
          <MathInsertModal
            kind="sqrt"
            allowKindSelection
            depth={depth + 1}
            onCancel={() => setNestedForField(null)}
            onConfirm={(latex) => {
              setValues((prev) => ({ ...prev, [nestedForField]: latex }));
              setNestedForField(null);
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export function MathEditModal({
  open,
  initialLatex,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  initialLatex: string;
  onConfirm: (latex: string) => void;
  onCancel: () => void;
}) {
  const titleId = useId();
  const [latex, setLatex] = useState(initialLatex);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setLatex(initialLatex);
      requestAnimationFrame(() => taRef.current?.focus());
    }
  }, [open, initialLatex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className={overlayClass}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className={panelClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold text-white mb-1">
          Edit equation
        </h2>
        <p className="text-sm text-white/45 mb-4">
          LaTeX between the delimiters — this is what appears in the question and PDF.
        </p>
        <label className={labelClass} htmlFor="math-edit-latex">
          LaTeX
        </label>
        <textarea
          id="math-edit-latex"
          ref={taRef}
          className={`${inputClass} min-h-[100px] font-mono text-xs leading-relaxed resize-y mb-5`}
          value={latex}
          onChange={(e) => setLatex(e.target.value)}
          spellCheck={false}
        />
        <div className="flex justify-end gap-2">
          <button type="button" className={btnGhost} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={btnPrimary}
            disabled={!latex.trim()}
            onClick={() => onConfirm(latex.trim())}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
