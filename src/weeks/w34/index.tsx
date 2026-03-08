import { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { W34_T } from './theme'
import { W34_chapters, W34_sections } from './sections'

const theme = {
  bg: W34_T.bg,
  surface: W34_T.surface,
  border: W34_T.border,
  accent: W34_T.accent,
  text: W34_T.text,
  muted: W34_T.muted,
}

// W3/W4 week-colored chapters
const chapters = W34_chapters.map(ch => ({
  ...ch,
  color: ch.week === 'W3' ? W34_T.accent : ch.week === 'W4' ? W34_T.accent2 : undefined,
}))

export function W34Page() {
  const [active, setActive] = useState('intro')
  const Content = W34_sections[active] || W34_sections.intro

  return (
    <PageLayout
      theme={theme}
      chapters={chapters}
      activeId={active}
      onSelect={setActive}
      header={
        <>
          <div
            className="rounded-lg w-[34px] h-[34px] flex items-center justify-center text-lg shrink-0"
            style={{ background: `linear-gradient(135deg, ${W34_T.accent}, ${W34_T.accent2})` }}
          >
            🧱
          </div>
          <div>
            <div className="font-extrabold text-[15px]">코테 커리큘럼</div>
            <div className="text-[11px] font-mono" style={{ color: W34_T.muted }}>
              2단계 — Week 3 스택·큐·덱·힙 &nbsp;|&nbsp; Week 4 해시·문자열·투포인터·슬라이딩윈도우
            </div>
          </div>
        </>
      }
    >
      <Content />
    </PageLayout>
  )
}
