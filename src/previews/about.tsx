import { useState } from 'react'
import { MuseumAbout } from '../components/MuseumAbout'
import { MuseumVisit } from '../components/MuseumVisit'
import { ThemeToggle } from '../components/ThemeToggle'
import '../styles/main.scss'
import './about.scss'

export function AboutPreview() {
  const [scenario, setScenario] = useState('today')
  return <div className="about-study-page">
    <header className="site-header is-visible study-header">
      <a className="site-brand" href="/">서울역사박물관</a>
      <div className="study-tools"><span className="study-badge">로컬 시안</span><label>날짜 미리보기 <select value={scenario} onChange={event => setScenario(event.target.value)}><option value="today">오늘 (서울 기준)</option><option value="2026-11-03">일반 운영일 · 11/3</option><option value="2026-11-05">목요일 · 11/5</option><option value="2026-11-09">휴관일 · 11/9</option><option value="2026-12-01">미확인 일정 · 12/1</option></select></label><ThemeToggle /></div>
    </header>
    <main><MuseumAbout initialPanel={0} visitContent={<MuseumVisit date={scenario === 'today' ? undefined : scenario} />} /></main>
  </div>
}
