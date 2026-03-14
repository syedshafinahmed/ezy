export const INPUT_CLASS =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#E947F5]/60 focus:bg-white/8 transition-all duration-200";

export const LABEL_CLASS =
  "block text-xs font-medium text-white/50 uppercase tracking-widest mb-1.5";

export const STEP_BADGE_STYLE = {
  background: "linear-gradient(135deg, #E947F5, #2F4BA2)",
};

export const CLASS_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  label: `Class ${i + 1}`,
  value: String(i + 1),
}));
