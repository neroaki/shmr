import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { usePageScroll } from './lib/page-scroll'

export default function App() {
  usePageScroll()
  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">본문 바로가기</a>
      <Header />
      <Home />
      <Footer />
    </div>
  )
}
