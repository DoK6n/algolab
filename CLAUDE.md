# 알고있슈 (algoitsu) — Project Notes for Claude

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (no config file — uses CSS `@import "tailwindcss"`)
- **tailwind-variants** (`tv()`) — primary styling system
- **tailwind-merge** — installed, available for class merging
- **Biome** — linter + formatter (`bun run lint`)
- **Bun** — package manager and dev server (`bun run dev`)

## Styling Conventions

### Use `tv()` for all component styling

All reusable components use `tailwind-variants`:

```tsx
import { tv } from 'tailwind-variants'

const myComponent = tv({
  slots: {
    root: 'flex items-center gap-2',
    label: 'text-sm font-bold',
  },
  variants: {
    active: {
      true: { root: 'bg-[#00e5ff22]', label: 'text-[#00e5ff]' },
      false: { root: 'bg-transparent', label: 'text-[#64748b]' },
    },
  },
})

// Usage
const { root, label } = myComponent({ active: true })
```

### When `style={}` is acceptable

Only use inline `style={}` for values that **cannot** be expressed as static Tailwind classes:

| Acceptable | Example |
|---|---|
| `linear-gradient` with two runtime color vars | `style={{ background: \`linear-gradient(135deg, ${a}, ${b})\` }}` |
| Prop-driven hex with opacity suffix | `style={{ background: \`${color}22\` }}` |
| `accentColor` CSS property (no Tailwind equiv) | `style={{ accentColor: color }}` |
| Computed numeric heights (visualizers) | `style={{ height: \`${val * 2}px\` }}` |
| Conditional `boxShadow` from algorithm state | `style={{ boxShadow: isActive ? \`0 0 8px ${c}\` : 'none' }}` |
| `borderLeftColor` from runtime prop | `style={{ borderLeftColor: item.color }}` |

### When to use Tailwind arbitrary values instead of `style={}`

For **known constants** (theme object values, static hex strings), use Tailwind arbitrary values:

```tsx
// Instead of: style={{ color: "#ffd700" }}
className="text-[#ffd700]"

// Instead of: style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}
className="grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"

// Instead of: style={{ textShadow: "0 0 40px #ffd70088" }}
className="[text-shadow:0_0_40px_#ffd70088]"

// Instead of: style={{ border: "1px solid #ffd70044" }}
className="border border-[#ffd70044]"
```

### Conditional classes — use ternary in className

```tsx
// Copied state
className={copied ? "text-[#10b981]" : "text-[#64748b]"}

// Even/odd table rows
className={i % 2 !== 0 ? "bg-[#0d1117]" : ""}
```

### Static data arrays with colors

When rendering lists where each item has a color, prefer baking the color into a `cls` string to avoid `style=` in the render:

```tsx
// Instead of: { color: "#ffd166" } with style={{ color: item.color }}
const items = [
  { cls: "border-l-[#ffd166] text-[#ffd166]", label: "Warning" },
]
// Render: <div className={`border-l-4 ${item.cls}`}>
```

## Project Structure

```
src/
  App.tsx                  # Top nav, tab routing
  components/
    Badge.tsx              # Badge, ComplexityBadge
    Callout.tsx            # Info/warning callout boxes
    CodeBlock.tsx          # Syntax-highlighted code with copy button
    PageLayout.tsx         # Sidebar nav + content area
    SectionTitle.tsx       # Section headers
  weeks/
    w2/
      index.tsx            # Page shell (tv() header slots)
      sections.tsx         # Content sections (Tailwind arbitrary values)
      visualizers.tsx      # Interactive algorithm visualizers
    w34/                   # Same structure
    w57/                   # Same structure
    w810/                  # Same structure
    w1112/                 # Same structure
```

## Theme Pattern

Each week group has a `theme.ts` exporting a `W*_T` object with named color constants:

```ts
export const W57_T = {
  bg: '#060e1e',
  surface: '#0a1628',
  border: '#1e2d45',
  accent: '#52d68a',
  text: '#e8f4fd',
  muted: '#3a6080',
  w5: '#52d68a',
  w6: '#ffd166',
  w7: '#e8645a',
}
```

Use these constants directly as Tailwind arbitrary values in section files (`text-[#52d68a]`), not as runtime `style=` references.

## PageLayout

`PageLayout` accepts:
- `theme` — `{ bg, surface, border, accent, text, muted }` object
- `chapters` — array of `{ id, label, icon? }` for sidebar nav
- `activeId` / `onSelect` — controlled nav state
- `header` — ReactNode rendered in the sticky top bar
- `children` — main content area

## Biome Configuration

`biome.json` is configured with:
- **Quote style**: double quotes
- **Indent**: 2 spaces
- **Arrow functions**: no parentheses for single param (`x => x`)
- **`noArrayIndexKey`**: off — code line renderers, syntax tokenizers, and algorithm visualizers all require positional index keys

Format all files: `bunx biome format --write src/`

## Commands

```bash
bun run dev      # Start dev server
bun run build    # TypeScript check + Vite build
bun run lint     # Biome linter
```
