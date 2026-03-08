import { cn } from '../lib/cn'

interface CalloutProps {
  color?: string
  icon?: string
  title?: string
  children: React.ReactNode
  className?: string
}

export function Callout({ color = '#7eff6a', icon, title, children, className }: CalloutProps) {
  return (
    <div
      className={cn('rounded-[10px] p-4 my-3.5 border-l-4', className)}
      style={{
        background: `${color}12`,
        border: `1px solid ${color}44`,
        borderLeftColor: color,
      }}
    >
      {title && (
        <div className="font-bold mb-2" style={{ color }}>
          {icon} {title}
        </div>
      )}
      <div className="text-[#dde8d6] leading-[1.9] text-[13.5px]">{children}</div>
    </div>
  )
}
