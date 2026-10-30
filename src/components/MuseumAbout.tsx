import { useLanguage } from '../i18n/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import { museumExteriorPhotos, museumServices } from '../data/home'
import { useAboutScene } from '../hooks/useAboutScene'
import { usePhotoDepth } from '../hooks/usePhotoDepth'
import { scrollPageToSection } from '../lib/page-scroll'
import './museum-about.scss'

const directions = ['top', 'right', 'bottom', 'left'] as const
const arrows = ['↓', '←', '↑', '→']
const museum = museumServices[0]
const services = museumServices.slice(1)

export function MuseumAbout() {
  const { t } = useLanguage()
  const { section, scene } = useAboutScene()
  const [active, setActive] = useState<number | null>(null)
  const [photo] = useState(() => museumExteriorPhotos[Math.floor(Math.random() * museumExteriorPhotos.length)])
  const mediaRef = usePhotoDepth(active !== null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])
  const panels = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    if (active !== null) panels.current[active]?.focus({ preventScroll: true })
  }, [active])
  const close = () => {
    const previous = active
    setActive(null)
    if (previous !== null) triggers.current[previous]?.focus({ preventScroll: true })
  }
  return (
    <section className="museum-about" id="about" ref={section} aria-labelledby="about-title">
      <div className="about-scene" ref={scene} onKeyDown={event => {
        if (event.key === 'Escape' && active !== null) { event.stopPropagation(); close() }
      }}>
        <div className="about-center" inert={active !== null} aria-hidden={active !== null}>
          <figure className={`about-panorama about-panorama--${photo.id}`}>
            <div className="about-panorama-media" ref={mediaRef}>
              <div className="about-photo-window">
                <img className="image-tone--photo" src={photo.src} alt={t(photo.alt)} width={photo.width} height={photo.height} loading="lazy" decoding="async" draggable={false} />
              </div>
              <h2 id="about-title" lang="en"><span>About the</span><span className="about-title-highlight">Museum</span></h2>
              <div className="about-photo-introduction">
                <div className="about-intro-label"><span>{t("서울역사박물관")}</span><span aria-hidden="true">04</span></div>
                <p className="about-mission">{museum.introHeading?.map(line => <span key={t(line)}>{t(line)}</span>)}</p>
                <div className="about-intro-body">{museum.introParagraphs?.map(paragraph => <p key={t(paragraph)}>{t(paragraph)}</p>)}</div>
                <dl className="about-intro-roles">{museum.introRoles?.map(role => <div key={t(role.title)}><dt>{t(role.title)}</dt><dd>{t(role.detail)}</dd></div>)}</dl>
              </div>
            </div>
            {photo.id === 'shm1' && <figcaption>{t(museum.caption)}</figcaption>}
            <a className="about-introduction text-link" href={museum.links[0].href}>{t("박물관 알아보기")} <span aria-hidden="true">↗</span></a>
          </figure>
        </div>
        <nav className="about-edges" aria-label={t("박물관 이용 안내")}>
          {services.map((service, index) => (
            <button className={`about-edge about-edge--${directions[index]}`} type="button" key={service.id}
              ref={element => { triggers.current[index] = element }}
              aria-expanded={active === index} aria-controls={`about-panel-${service.id}`}
              onClick={() => {
                if (active === index) { close(); return }
                if (section.current) scrollPageToSection(section.current)
                setActive(index)
              }}>
              <span>{t(service.title)}</span><span aria-hidden="true">{active === index ? '−' : arrows[index]}</span>
            </button>
          ))}
        </nav>
        <div className="about-panel-stack">
          {services.map((service, index) => (
            <section key={service.id} id={`about-panel-${service.id}`}
              className={`about-panel about-panel--${directions[index]}${active === index ? ' is-open' : ''}`}
              ref={element => { panels.current[index] = element }}
              aria-labelledby={`about-heading-${service.id}`} aria-hidden={active !== index}
              inert={active !== index} tabIndex={-1}>
              <button className="about-return" type="button" onClick={close}>{t("소개로 돌아가기")} <span aria-hidden="true">×</span></button>
              {service.id === 'visit' ? (
                <div className="about-visit-layout">
                  <div className="about-visit-location">
                    <p className="eyebrow">{t("서울역사박물관")} <span aria-hidden="true">/ 01</span></p>
                    <div>
                      <p className="about-visit-location-label">{t("서울특별시 종로구")}</p>
                      <p className="about-visit-address">{t("새문안로")} <span lang="en">55</span></p>
                      <p className="about-visit-stop">{t("버스 정류장 · 서울역사박물관·경희궁앞(중)")}</p>
                    </div>
                    <a className="text-link" href={service.links[0].href}>{t("오시는 길 보기")} <span aria-hidden="true">↗</span></a>
                  </div>
                  <div className="about-visit-guide">
                    <h3 id={`about-heading-${service.id}`}>{t(service.title)}</h3>
                    <div className="about-visit-entry"><strong>{t("무료 관람")}</strong><span>{t("개인 자유관람")}</span></div>
                    <div className="about-visit-hours" aria-label={t("관람시간")}>
                      <p className="about-visit-detail-label">{t("관람시간")}</p>
                      <div><span>{t("화·수·금·토·일")}</span><strong>09:00 – 21:00</strong><small>{t("입장 마감 20:30")}</small></div>
                      <div><span>{t("목요일")}</span><strong>09:00 – 18:00</strong><small>{t("입장 마감 17:30")}</small></div>
                    </div>
                    <p className="about-visit-period">{t("야간 개방 확대 운영 · 2026. 9. 15. – 11. 30.")}</p>
                    <div className="about-visit-closed"><span>{t("휴관")}</span><p>{t("매주 월요일·1월 1일")} <small>{t("월요일이 공휴일이면 개관")}</small></p></div>
                    <a className="text-link" href={service.links[1].href}>{t("최신 관람안내 확인")} <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              ) : (
                <div className="about-panel-layout">
                  <figure className="about-panel-image">
                    <img src={service.image} alt={t(service.alt)} loading="lazy" decoding="async" />
                    <figcaption>{t(service.caption)}</figcaption>
                  </figure>
                  <div className="about-panel-copy">
                    <p className="eyebrow">{t("서울역사박물관")} <span aria-hidden="true">/ {String(index + 1).padStart(2, '0')}</span></p>
                    <h3 id={`about-heading-${service.id}`}>{t(service.title)}</h3>
                    <p>{t(service.description)}</p>
                    <ul>{service.links.map(link => <li key={link.href}><a className="text-link" href={link.href}>{t(link.label)}<span aria-hidden="true">↗</span></a></li>)}</ul>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
