import { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { W2_COLORS } from './theme'
import { W2_chapters as _W2_chapters, W2_sectionData } from './sections'

// W2 원본은 title 키를 사용 → PageLayout의 label로 매핑
const W2_chapters = _W2_chapters.map((ch: any) => ({ ...ch, label: ch.title ?? ch.label }))

const theme = {
  bg: W2_COLORS.bg,
  border: W2_COLORS.border,
  accent: W2_COLORS.accent,
  text: W2_COLORS.text,
  muted: W2_COLORS.muted,
}

const headerStyles = {
  iconWrap: 'rounded-lg w-9 h-9 flex items-center justify-center text-lg shrink-0',
  title: 'font-bold text-[15px]',
  subtitle: 'text-[11px] font-mono',
}

export function W2Page() {
  const [active, setActive] = useState('intro')
  const Content = W2_sectionData[active] || W2_sectionData.intro

  return (
    <PageLayout
      theme={theme}
      chapters={W2_chapters}
      activeId={active}
      onSelect={setActive}
      header={
        <>
          <div
            className={headerStyles.iconWrap}
            style={{ background: `linear-gradient(135deg, ${W2_COLORS.accent}, ${W2_COLORS.accent2})` }}
          >
            📚
          </div>
          <div>
            <div className={headerStyles.title}>코테 커리큘럼</div>
            <div className={headerStyles.subtitle} style={{ color: W2_COLORS.muted }}>
              Week 2: 정렬 &amp; 탐색 알고리즘 — Python3
            </div>
          </div>
        </>
      }
    >
      <Content />
    </PageLayout>
  )
}
