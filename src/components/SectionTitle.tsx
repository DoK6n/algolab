interface SectionTitleProps {
  children: React.ReactNode
  sub?: string
  color?: string
}

export function SectionTitle({ children, sub, color = '#7eff6a' }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2
        className="m-0 text-[22px] font-extrabold font-mono"
        style={{ color }}
      >
        {children}
      </h2>
      {sub && <p className="text-[#5a6e50] mt-1.5 mb-0 text-sm">{sub}</p>}
    </div>
  )
}
