import { navigation, official } from '../data/home'
import { scrollPageToSection } from '../lib/page-scroll'
import museumLogo from '../assets/images/museum-official-logo.jpg'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="footer-name">서울역사박물관</p>
          <address>서울특별시 종로구 새문안로 55<br /><a href="tel:027240274">02-724-0274~6</a></address>
        </div>
        <nav aria-label="하단 메뉴">
          {navigation.map((item) => <a href={item.href} key={item.href} onClick={event => {
            const section = document.querySelector<HTMLElement>(item.href)
            if (!section) return
            event.preventDefault()
            event.stopPropagation()
            window.history.pushState(null, '', item.href)
            scrollPageToSection(section)
          }}>{item.label}</a>)}
          <a href={official.home}>공식 사이트 <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>서울역사박물관 웹사이트 리뉴얼 포트폴리오입니다.<br />실제 관람·예약은 공식 사이트에서 확인해 주세요.</p>
        <div className="footer-logo">
          <img src={museumLogo} alt="서울역사박물관 공식 로고" width="964" height="401" />
        </div>
        <a href="#top">처음으로 <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  )
}
