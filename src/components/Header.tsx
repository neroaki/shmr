import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { navigation } from '../data/home'
import { scrollPageToSection } from '../lib/page-scroll'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }}>
      <a className="site-brand" href="#top" aria-label="서울역사박물관 첫 화면으로" onClick={() => setMenuOpen(false)}>서울역사박물관</a>
      <button className="menu-toggle" ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '메뉴 닫기' : '메뉴 열기'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span>
      </button>
      <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="main-navigation" aria-label="주요 메뉴">
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          flushSync(() => setMenuOpen(false))
          // Closing the mobile menu changes the sticky scene's measured height.
          // Let its ResizeObserver settle before reading the destination position.
          requestAnimationFrame(() => requestAnimationFrame(() => {
            const section = document.querySelector<HTMLElement>(item.href)
            if (!section) return
            window.history.pushState(null, '', item.href)
            scrollPageToSection(section)
          }))
        }}><span className="site-nav-label">{item.label}<span className="site-nav-number" aria-hidden="true">/{item.number}</span></span></a>)}
      </nav>
    </header>
  )
}
