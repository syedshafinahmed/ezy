"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Mathematics from "@tiptap/extension-mathematics";
import {
  Bold,
  Italic,
  ImagePlus,
  Sigma,
  ChevronDown,
} from "lucide-react";
import "katex/dist/katex.min.css";
import { MATH_KIND_OPTIONS } from "@/lib/mathInsertConfig";
import { MathEditModal, MathInsertModal } from "./MathModals";

const INPUT_SHELL =
  "w-full rounded-xl border border-white/10 bg-white/5 text-sm text-white focus-within:border-[#E947F5]/60 focus-within:bg-white/8 transition-all duration-200";

const TOOL_BTN =
  "inline-flex items-center justify-center rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors";

interface Props {
  value: string;
  placeholder: string;
  onChange: (html: string) => void;
  /** Remount editor when question list size changes */
  mountKey: string;
}

export default function QuestionRichTextEditor({
  value,
  placeholder,
  onChange,
  mountKey,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const lastEmitted = useRef<string | null>(null);
  const editorRef = useRef<Editor | null>(null);

  const [insertKind, setInsertKind] = useState<string | null>(null);
  const [selectKey, setSelectKey] = useState(0);
  const [mathEdit, setMathEdit] = useState<{
    pos: number;
    latex: string;
    isBlock: boolean;
  } | null>(null);

  const editor = useEditor(
    {
      immediatelyRender: false,
      onCreate: ({ editor: ed }) => {
        editorRef.current = ed;
      },
      onDestroy: () => {
        editorRef.current = null;
      },
      extensions: [
        StarterKit.configure({
          heading: false,
          bulletList: false,
          orderedList: false,
          blockquote: false,
          codeBlock: false,
          horizontalRule: false,
        }),
        Placeholder.configure({ placeholder }),
        Image.configure({
          allowBase64: true,
          HTMLAttributes: {
            class:
              "block max-w-full max-h-[360px] w-auto h-auto object-contain rounded-md my-2 mx-auto",
          },
        }),
        Mathematics.configure({
          katexOptions: {
            throwOnError: false,
            output: "html",
          },
          inlineOptions: {
            onClick: (node, pos) => {
              setMathEdit({
                pos,
                latex: node.attrs.latex ?? "",
                isBlock: false,
              });
            },
          },
          blockOptions: {
            onClick: (node, pos) => {
              setMathEdit({
                pos,
                latex: node.attrs.latex ?? "",
                isBlock: true,
              });
            },
          },
        }),
      ],
      content: value,
      editorProps: {
        attributes: {
          class:
            "prose prose-invert max-w-none min-h-[120px] px-3 py-3 outline-none text-sm [&_.katex]:text-white [&_img]:max-h-[360px] [&_p]:my-1",
        },
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        lastEmitted.current = html;
        onChange(html);
      },
    },
    [mountKey],
  );

  useEffect(() => {
    if (!editor) return;
    if (value === lastEmitted.current) return;
    lastEmitted.current = value;
    editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  const run = useCallback(
    (fn: () => boolean) => {
      if (!editor) return;
      fn();
    },
    [editor],
  );

  const onPickImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      if (!file.type.startsWith("image/")) {
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [editor],
  );

  const closeInsertModal = useCallback(() => {
    setInsertKind(null);
    setSelectKey((k) => k + 1);
  }, []);

  const onInsertConfirm = useCallback(
    (latex: string) => {
      if (!editor) return;
      editor.chain().focus().insertInlineMath({ latex }).run();
      closeInsertModal();
    },
    [editor, closeInsertModal],
  );

  const onMathSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const kind = e.target.value;
      if (!kind) return;
      setInsertKind(kind);
    },
    [],
  );

  const closeMathEdit = useCallback(() => setMathEdit(null), []);

  const onMathEditConfirm = useCallback(
    (latex: string) => {
      const ed = editorRef.current;
      if (!ed || !mathEdit) return;
      const chain = ed.chain().focus().setNodeSelection(mathEdit.pos);
      if (mathEdit.isBlock) chain.updateBlockMath({ latex }).run();
      else chain.updateInlineMath({ latex }).run();
      setMathEdit(null);
    },
    [mathEdit],
  );

  return (
    <div className={INPUT_SHELL}>
      <MathInsertModal
        kind={insertKind}
        onConfirm={onInsertConfirm}
        onCancel={closeInsertModal}
      />
      <MathEditModal
        open={mathEdit != null}
        initialLatex={mathEdit?.latex ?? ""}
        onConfirm={onMathEditConfirm}
        onCancel={closeMathEdit}
      />

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPickImage}
      />
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 px-2 py-1.5">
        <button
          type="button"
          className={TOOL_BTN}
          title="Bold"
          disabled={!editor}
          onClick={() => run(() => editor!.chain().focus().toggleBold().run())}
        >
          <Bold className="size-4" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className={TOOL_BTN}
          title="Italic"
          disabled={!editor}
          onClick={() =>
            run(() => editor!.chain().focus().toggleItalic().run())
          }
        >
          <Italic className="size-4" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className={TOOL_BTN}
          title="Insert image"
          disabled={!editor}
          onClick={() => fileRef.current?.click()}
        >
          <ImagePlus className="size-4" />
        </button>

        <div className="relative flex items-center gap-0.5 rounded-lg bg-white/5 px-1 py-0.5">
          <Sigma className="size-3.5 text-[#E947F5]/90 shrink-0" />
          <select
            key={selectKey}
            className="appearance-none bg-transparent pr-6 py-1 text-xs text-white/80 cursor-pointer focus:outline-none max-w-[160px] sm:max-w-[200px]"
            defaultValue=""
            disabled={!editor}
            onChange={onMathSelect}
            aria-label="Insert math"
          >
            <option value="" disabled>
              Insert math…
            </option>
            {MATH_KIND_OPTIONS.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0a0a0f]">
                {p.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1.5 size-3.5 text-white/40" />
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
