import { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { W810_T } from './theme'
import { W810_chapters, W810_sections } from './sections'

const theme = {
  bg: W810_T.bg,
  surface: W810_T.surface,
  border: W810_T.border,
  accent: W810_T.accent,
  text: W810_T.text,
  muted: W810_T.muted,
}

export function W810Page() {
  const [active, setActive] = useState('intro')
  const Content = W810_sections[active] || W810_sections.intro

  return (
    <PageLayout
      theme={theme}
      chapters={W810_chapters}
      activeId={active}
      onSelect={setActive}
      header={
        <>
          <div
            className="rounded-lg w-[34px] h-[34px] flex items-center justify-center text-lg shrink-0"
            style={{ background: `linear-gradient(135deg, ${W810_T.w8}, ${W810_T.w10})` }}
          >
            🧩
          </div>
          <div>
            <div className="font-extrabold text-[15px]">코테 커리큘럼</div>
            <div className="text-[11px] font-mono" style={{ color: W810_T.muted }}>
              Week 8-9 다이나믹 프로그래밍 &nbsp;|&nbsp; Week 10 그리디·분할정복·백트래킹
            </div>
          </div>
        </>
      }
    >
      <Content />
    </PageLayout>
  )
}
