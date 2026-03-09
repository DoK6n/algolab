import { useState } from "react";
import { tv } from "tailwind-variants";

const KEYWORDS = new Set([
  "def",
  "for",
  "while",
  "if",
  "elif",
  "else",
  "return",
  "in",
  "range",
  "len",
  "and",
  "or",
  "not",
  "True",
  "False",
  "None",
  "import",
  "from",
  "class",
  "break",
  "continue",
  "pass",
  "lambda",
  "with",
  "as",
  "try",
  "except",
  "finally",
  "yield",
  "global",
  "nonlocal",
]);
const BUILTINS = new Set([
  "print",
  "input",
  "int",
  "str",
  "list",
  "dict",
  "set",
  "tuple",
  "min",
  "max",
  "heapq",
  "heappush",
  "heappop",
  "collections",
  "deque",
  "append",
  "appendleft",
  "popleft",
  "pop",
  "Counter",
  "defaultdict",
  "sorted",
  "enumerate",
  "zip",
  "map",
  "filter",
  "reversed",
  "sum",
  "any",
  "all",
  "isinstance",
  "type",
  "sys",
]);

const codeBlock = tv({
  slots: {
    wrapper: "rounded-[10px] overflow-hidden my-3 border border-[#1e2d45]",
    header:
      "flex justify-between items-center px-3.5 py-1.5 bg-[#161b22] border-b border-[#1e2d45]",
    lang: "text-[#64748b] text-[11px] font-mono",
    copyBtn:
      "text-[11px] bg-transparent border-none cursor-pointer transition-colors duration-200",
    pre: "p-4 m-0 overflow-x-auto font-mono text-[13px] leading-[1.75] text-[#e2e8f0] bg-[#0d1117]",
    line: "flex",
    lineNum:
      "text-[#64748b] select-none min-w-[28px] text-[11px] pt-[2px] shrink-0",
  },
  variants: {
    copied: {
      true: { copyBtn: "text-[#10b981]" },
      false: { copyBtn: "text-[#64748b]" },
    },
  },
});

function tokenize(text: string): React.ReactNode[] {
  return text
    .split(/(\b\w+\b|[^\w\s]|\s+)/g)
    .filter(Boolean)
    .map((t, i) => {
      // eslint-disable-next-line react/no-array-index-key
      if (KEYWORDS.has(t))
        return (
          <span key={`kw-${i}-${t}`} className="text-[#c084fc] font-bold">
            {t}
          </span>
        );
      // eslint-disable-next-line react/no-array-index-key
      if (BUILTINS.has(t))
        return (
          <span key={`bi-${i}-${t}`} className="text-[#67e8f9]">
            {t}
          </span>
        );
      // eslint-disable-next-line react/no-array-index-key
      if (/^\d+$/.test(t))
        return (
          <span key={`num-${i}-${t}`} className="text-[#fbbf24]">
            {t}
          </span>
        );
      // eslint-disable-next-line react/no-array-index-key
      if (/^["']/.test(t))
        return (
          <span key={`str-${i}-${t}`} className="text-[#86efac]">
            {t}
          </span>
        );
      return <span key={`tok-${i}-${t}`}>{t}</span>;
    });
}

function renderLine(line: string): React.ReactNode {
  const ci = line.indexOf("#");
  if (ci !== -1) {
    return (
      <>
        {tokenize(line.slice(0, ci))}
        <span className="text-[#6b7280] italic">{line.slice(ci)}</span>
      </>
    );
  }
  return tokenize(line);
}

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { wrapper, header, lang, copyBtn, pre, line, lineNum } = codeBlock({
    copied,
  });

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={wrapper({ className })}>
      <div className={header()}>
        <span className={lang()}>python3</span>
        <button type="button" onClick={copy} className={copyBtn()}>
          {copied ? "✅ 복사됨" : "📋 복사"}
        </button>
      </div>
      <pre className={pre()}>
        {code.split("\n").map((l, i) => (
          <div key={i} className={line()}>
            <span className={lineNum()}>{i + 1}</span>
            <span>{renderLine(l)}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
