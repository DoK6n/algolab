import { cn } from '../lib/cn'

interface ComplexityBadgeProps {
  time: string
  space: string
}

export function ComplexityBadge({ time, space }: ComplexityBadgeProps) {
  return (
    <span className="inline-flex gap-2 text-xs">
      <span className="bg-[#1a2744] border border-[#00d4ff] text-[#00d4ff] px-2 py-0.5 rounded-full">
        시간 {time}
      </span>
      <span className="bg-[#1a1744] border border-[#7c3aed] text-[#7c3aed] px-2 py-0.5 rounded-full">
        공간 {space}
      </span>
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export function Badge({ children, color = '#7eff6a', className }: BadgeProps) {
  return (
    <span
      className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold border', className)}
      style={{ background: `${color}22`, borderColor: `${color}55`, color }}
    >
      {children}
    </span>
  )
}
