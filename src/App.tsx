import { useState } from 'react'
import { cn } from './lib/cn'
import { W2Page } from './weeks/w2'
import { W34Page } from './weeks/w34'
import { W57Page } from './weeks/w57'
import { W810Page } from './weeks/w810'
import { W1112Page } from './weeks/w1112'

const PAGES = [
  { id: 'W2',    label: 'Week 2: 정렬 & 탐색',       icon: '📊', component: W2Page },
  { id: 'W34',   label: 'Week 3-4: 핵심 자료구조',    icon: '🧱', component: W34Page },
  { id: 'W57',   label: 'Week 5-7: 그래프 & 트리',    icon: '🕸️', component: W57Page },
  { id: 'W810',  label: 'Week 8-10: DP & 그리디',     icon: '🧩', component: W810Page },
  { id: 'W1112', label: 'Week 11-12: 고급 & 실전',    icon: '🏆', component: W1112Page },
]

const navStyles = {
  nav: 'sticky top-0 z-[200] h-12 px-4 flex items-center gap-3 border-b border-[#1e2235] bg-[#060e1e]',
  logo: 'text-[#8be9fd] font-extrabold text-[13px] font-mono whitespace-nowrap shrink-0',
  select: 'flex-1 max-w-[420px] px-3 py-1.5 bg-[#0a1628] border border-[#1e2235] text-[#e8f4fd] rounded-lg text-[13px] cursor-pointer font-mono',
  tabBar: 'hidden md:flex gap-1 ml-auto',
  tab: (active: boolean) => cn(
    'px-2.5 py-1 border rounded-md text-[11px] cursor-pointer font-mono transition-all duration-150',
    active
      ? 'bg-[#00e5ff22] border-[#00e5ff] text-[#00e5ff] font-bold'
      : 'bg-transparent border-[#1e2235] text-[#3a6080] hover:text-[#6090a0]'
  ),
}

export default function App() {
  const [page, setPage] = useState('W2')
  const PageComp = PAGES.find(p => p.id === page)?.component || W2Page

  return (
    <div>
      <nav className={navStyles.nav}>
        <span className={navStyles.logo}>🎓 코테 커리큘럼</span>

        <select
          value={page}
          onChange={e => setPage(e.target.value)}
          className={navStyles.select}
        >
          {PAGES.map(p => (
            <option key={p.id} value={p.id}>{p.icon} {p.label}</option>
          ))}
        </select>

        <div className={navStyles.tabBar}>
          {PAGES.map(p => (
            <button
              key={p.id}
              onClick={() => setPage(p.id)}
              className={navStyles.tab(page === p.id)}
            >
              {p.id}
            </button>
          ))}
        </div>
      </nav>

      <PageComp />
    </div>
  )
}
