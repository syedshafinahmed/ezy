export type MathField = {
  key: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
};

export type MathKindConfig = {
  title: string;
  description?: string;
  fields: MathField[];
};

export const MATH_KIND_CONFIG: Record<string, MathKindConfig> = {
  sqrt: {
    title: "Square root",
    description: "Expression under the radical (LaTeX allowed).",
    fields: [
      {
        key: "inner",
        label: "Under √",
        defaultValue: "x",
        placeholder: "e.g. x+1, 16, x^2",
      },
    ],
  },
  nthroot: {
    title: "Nth root",
    fields: [
      { key: "n", label: "Index n", defaultValue: "3", placeholder: "3" },
      {
        key: "inner",
        label: "Radicand",
        defaultValue: "x",
        placeholder: "x",
      },
    ],
  },
  frac: {
    title: "Fraction",
    fields: [
      { key: "num", label: "Numerator", defaultValue: "a", placeholder: "a" },
      { key: "den", label: "Denominator", defaultValue: "b", placeholder: "b" },
    ],
  },
  factorial: {
    title: "Factorial",
    fields: [
      {
        key: "n",
        label: "Value",
        defaultValue: "n",
        placeholder: "5 or n",
      },
    ],
  },
  binom: {
    title: "Binomial coefficient",
    fields: [
      { key: "n", label: "n", defaultValue: "n", placeholder: "n" },
      { key: "r", label: "r", defaultValue: "r", placeholder: "r" },
    ],
  },
  pow: {
    title: "Power",
    fields: [
      { key: "base", label: "Base", defaultValue: "x", placeholder: "x" },
      { key: "exp", label: "Exponent", defaultValue: "n", placeholder: "n" },
    ],
  },
  sub: {
    title: "Subscript",
    fields: [
      { key: "base", label: "Base", defaultValue: "x", placeholder: "x" },
      { key: "sub", label: "Subscript", defaultValue: "n", placeholder: "n" },
    ],
  },
  int: {
    title: "Integral",
    fields: [],
  },
  defint: {
    title: "Definite integral",
    fields: [
      { key: "a", label: "Lower limit a", defaultValue: "a", placeholder: "a" },
      { key: "b", label: "Upper limit b", defaultValue: "b", placeholder: "b" },
      {
        key: "fn",
        label: "Integrand f(x)",
        defaultValue: "x",
        placeholder: "LaTeX, e.g. x^2",
      },
    ],
  },
  deriv: {
    title: "Derivative (ratio)",
    fields: [
      { key: "num", label: "Numerator", defaultValue: "d", placeholder: "d or dy" },
      { key: "den", label: "Denominator", defaultValue: "dx", placeholder: "dx" },
    ],
  },
  partial: {
    title: "Partial derivative",
    fields: [
      {
        key: "fn",
        label: "Numerator (function)",
        defaultValue: "f",
        placeholder: "f or xy",
      },
      { key: "v", label: "Variable", defaultValue: "x", placeholder: "x" },
    ],
  },
  lim: {
    title: "Limit",
    fields: [
      { key: "v", label: "Variable", defaultValue: "x", placeholder: "x" },
      {
        key: "to",
        label: "Approaches",
        defaultValue: "0",
        placeholder: "0 or \\infty",
      },
    ],
  },
  sum: {
    title: "Sum",
    fields: [
      { key: "i", label: "Index", defaultValue: "i", placeholder: "i" },
      { key: "from", label: "From", defaultValue: "1", placeholder: "1" },
      { key: "to", label: "To", defaultValue: "n", placeholder: "n" },
      {
        key: "expr",
        label: "Summand",
        defaultValue: "a_i",
        placeholder: "a_i",
      },
    ],
  },
  prod: {
    title: "Product",
    fields: [
      { key: "i", label: "Index", defaultValue: "i", placeholder: "i" },
      { key: "from", label: "From", defaultValue: "1", placeholder: "1" },
      { key: "to", label: "To", defaultValue: "n", placeholder: "n" },
      {
        key: "expr",
        label: "Factor",
        defaultValue: "a_i",
        placeholder: "a_i",
      },
    ],
  },
  infty: { title: "Infinity", fields: [] },
  pi: { title: "Pi", fields: [] },
  theta: { title: "Theta", fields: [] },
};

export const MATH_KIND_OPTIONS: { id: string; label: string }[] = [
  { id: "sqrt", label: "Square root √(·)" },
  { id: "nthroot", label: "Nth root ⁿ√(·)" },
  { id: "frac", label: "Fraction a/b" },
  { id: "factorial", label: "Factorial n!" },
  { id: "binom", label: "Binomial (n choose r)" },
  { id: "pow", label: "Power xⁿ" },
  { id: "sub", label: "Subscript xₙ" },
  { id: "int", label: "Integral ∫" },
  { id: "defint", label: "Definite integral" },
  { id: "deriv", label: "Derivative ratio" },
  { id: "partial", label: "Partial derivative ∂/∂x" },
  { id: "lim", label: "Limit lim" },
  { id: "sum", label: "Sum Σ" },
  { id: "prod", label: "Product Π" },
  { id: "infty", label: "Infinity ∞" },
  { id: "pi", label: "Pi π" },
  { id: "theta", label: "Theta θ" },
];

export function buildLatexFromFields(
  kind: string,
  values: Record<string, string>,
): string | null {
  const v = (key: string) => (values[key] ?? "").trim();
  const postfixWrap = (expr: string) => {
    const t = expr.trim();
    if (!t) return t;
    if (t.startsWith("{") && t.endsWith("}")) return t;
    return `{${t}}`;
  };

  switch (kind) {
    case "sqrt": {
      const inner = v("inner");
      if (!inner) return null;
      return `\\sqrt{${inner}}`;
    }
    case "nthroot": {
      const n = v("n");
      const inner = v("inner");
      if (!n || !inner) return null;
      return `\\sqrt[${n}]{${inner}}`;
    }
    case "frac": {
      const num = v("num");
      const den = v("den");
      if (!num || !den) return null;
      return `\\frac{${num}}{${den}}`;
    }
    case "factorial": {
      const n = v("n");
      if (!n) return null;
      return `${postfixWrap(n)}!`;
    }
    case "binom": {
      const n = v("n");
      const r = v("r");
      if (!n || !r) return null;
      return `\\binom{${n}}{${r}}`;
    }
    case "pow": {
      const base = v("base");
      const exp = v("exp");
      if (!base || !exp) return null;
      return `${base}^{${exp}}`;
    }
    case "sub": {
      const base = v("base");
      const sub = v("sub");
      if (!base || !sub) return null;
      return `${base}_{${sub}}`;
    }
    case "int":
      return "\\int";
    case "defint": {
      const a = v("a");
      const b = v("b");
      const fn = v("fn");
      if (!a || !b || !fn) return null;
      return `\\int_{${a}}^{${b}} ${fn} \\,dx`;
    }
    case "deriv": {
      const num = v("num");
      const den = v("den");
      if (!num || !den) return null;
      return `\\frac{${num}}{${den}}`;
    }
    case "partial": {
      const fn = v("fn");
      const x = v("v");
      if (!fn || !x) return null;
      return `\\frac{\\partial ${fn}}{\\partial ${x}}`;
    }
    case "lim": {
      const x = v("v");
      const to = v("to");
      if (!x || !to) return null;
      return `\\lim_{${x} \\to ${to}}`;
    }
    case "sum": {
      const i = v("i");
      const from = v("from");
      const to = v("to");
      const expr = v("expr");
      if (!i || !from || !to || !expr) return null;
      return `\\sum_{${i}=${from}}^{${to}} ${expr}`;
    }
    case "prod": {
      const i = v("i");
      const from = v("from");
      const to = v("to");
      const expr = v("expr");
      if (!i || !from || !to || !expr) return null;
      return `\\prod_{${i}=${from}}^{${to}} ${expr}`;
    }
    case "infty":
      return "\\infty";
    case "pi":
      return "\\pi";
    case "theta":
      return "\\theta";
    default:
      return null;
  }
}

export function getDefaultFieldValues(kind: string): Record<string, string> {
  const cfg = MATH_KIND_CONFIG[kind];
  if (!cfg) return {};
  const out: Record<string, string> = {};
  for (const f of cfg.fields) {
    out[f.key] = f.defaultValue ?? "";
  }
  return out;
}
