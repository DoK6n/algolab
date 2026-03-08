import { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { W57_T } from './theme'
import { W57_chapters, W57_sections } from './sections'

const theme = {
  bg: W57_T.bg,
  surface: W57_T.surface,
  border: W57_T.border,
  accent: W57_T.accent,
  text: W57_T.text,
  muted: W57_T.muted,
}

export function W57Page() {
  const [active, setActive] = useState('intro')
  const Content = W57_sections[active] || W57_sections.intro

  return (
    <PageLayout
      theme={theme}
      chapters={W57_chapters}
      activeId={active}
      onSelect={setActive}
      header={
        <>
          <div
            className="rounded-lg w-[34px] h-[34px] flex items-center justify-center text-lg shrink-0"
            style={{ background: `linear-gradient(135deg, ${W57_T.w5}, ${W57_T.w7})` }}
          >
            🕸️
          </div>
          <div>
            <div className="font-extrabold text-[15px]">코테 커리큘럼</div>
            <div className="text-[11px] font-mono" style={{ color: W57_T.muted }}>
              Week 5 그래프탐색 &nbsp;|&nbsp; Week 6 최단경로 &nbsp;|&nbsp; Week 7 트리
            </div>
          </div>
        </>
      }
    >
      <Content />
    </PageLayout>
  )
}
