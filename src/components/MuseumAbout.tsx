import { useLanguage } from '../i18n/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import { museumExteriorPhotos, museumServices } from '../data/home'
import { useAboutScene } from '../hooks/useAboutScene'
import { usePhotoDepth } from '../hooks/usePhotoDepth'
import { scrollPageToSection } from '../lib/page-scroll'
import accessMapLight from '../assets/images/maps/museum-access-light-cutout.webp'
import accessMapDark from '../assets/images/maps/museum-access-dark-cutout.webp'
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
              aria-labelledby={service.id === 'visit' ? undefined : `about-heading-${service.id}`}
              aria-label={service.id === 'visit' ? t(service.title) : undefined} aria-hidden={active !== index}
              inert={active !== index} tabIndex={-1}>
              <button className="about-return" type="button" onClick={close}>{t("소개로 돌아가기")} <span aria-hidden="true">×</span></button>
              {service.id === 'visit' ? (
                <div className="about-visit-layout">
                  <div className="about-visit-content">
                    <section className="about-visit-location" aria-labelledby="visit-location-title">
                      <h4 id="visit-location-title">{t("찾아오시는 길")}</h4>
                      <div className="about-visit-destination">
                        <p className="about-visit-museum">{t("서울역사박물관")}</p>
                        <address>{t("서울특별시 종로구 새문안로 55")}</address>
                      </div>
                      <figure className="about-visit-map">
                        <img className="about-visit-map--light" src={accessMapLight} alt={t("서울역사박물관 약도: 경희궁과 새문안로, 서대문역과 광화문역 위치")} width="1536" height="1024" loading="lazy" decoding="async" />
                        <img className="about-visit-map--dark" src={accessMapDark} alt={t("서울역사박물관 약도: 경희궁과 새문안로, 서대문역과 광화문역 위치")} width="1536" height="1024" loading="lazy" decoding="async" />
                      </figure>
                      <a className="about-visit-link text-link" href={service.links[0].href}>{t("오시는 길 보기")} <span aria-hidden="true">↗</span></a>
                    </section>
                    <section className="about-visit-guide" aria-labelledby="visit-hours-title">
                      <h4 id="visit-hours-title">{t("관람시간")}</h4>
                      <dl className="about-visit-hours">
                        <div><dt>{t("화·수·금·토·일")}</dt><dd><strong>09:00 – 21:00</strong><small>{t("입장 마감 20:30")}</small></dd></div>
                        <div><dt>{t("목요일")}</dt><dd><strong>09:00 – 18:00</strong><small>{t("입장 마감 17:30")}</small></dd></div>
                      </dl>
                      <p className="about-visit-period">{t("야간 개방 확대 운영 · 2026. 9. 15. – 11. 30.")}</p>
                      <dl className="about-visit-facts">
                        <div><dt>{t("관람료")}</dt><dd>{t("무료")}</dd></div>
                        <div><dt>{t("휴관")}</dt><dd>{t("매주 월요일·1월 1일")}<small>{t("월요일이 공휴일이면 개관")}</small></dd></div>
                      </dl>
                      <a className="about-visit-link text-link" href={service.links[1].href}>{t("최신 관람안내 확인")} <span aria-hidden="true">↗</span></a>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="about-panel-layout">
                  <div className="about-panel-image">
                    <figure className="about-panel-figure">
                      <img src={service.image} alt={t(service.alt)} loading="lazy" decoding="async" />
                      <figcaption>{t(service.caption)}</figcaption>
                    </figure>
                  </div>
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
