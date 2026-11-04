import { MuseumVisit } from './MuseumVisit'
import { useLanguage } from '../i18n/LanguageContext'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { museumExteriorPhotos, museumServices } from '../data/home'
import { useAboutScene } from '../hooks/useAboutScene'
import { usePhotoDepth } from '../hooks/usePhotoDepth'
import { scrollPageToSection } from '../lib/page-scroll'
import './museum-about.scss'

const directions = ['top', 'right', 'bottom', 'left'] as const
const arrows = ['↓', '←', '↑', '→']
const museum = museumServices[0]
const services = museumServices.slice(1)

type MuseumAboutProps = {
  visitContent?: ReactNode
  initialPanel?: number | null
}

export function MuseumAbout({ visitContent, initialPanel = null }: MuseumAboutProps = {}) {
  const { t } = useLanguage()
  const { section, scene } = useAboutScene()
  const [active, setActive] = useState<number | null>(initialPanel)
  const [photo] = useState(() => museumExteriorPhotos[Math.floor(Math.random() * museumExteriorPhotos.length)])
  const mediaRef = usePhotoDepth(active !== null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])
  const panels = useRef<(HTMLElement | null)[]>([])
  useEffect(() => {
    if (active !== null) panels.current[active]?.focus({ preventScroll: true })
  }, [active])
  useEffect(() => {
    if (active === null) return
    let frame = 0
    const resetOutsideViewport = () => {
      frame = 0
      const bounds = section.current?.getBoundingClientRect()
      if (bounds && (bounds.bottom <= 0 || bounds.top >= window.innerHeight)) {
        // Leaving the section resets its content without returning focus to it.
        setActive(null)
      }
    }
    const scheduleCheck = () => {
      if (!frame) frame = requestAnimationFrame(resetOutsideViewport)
    }
    scheduleCheck()
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
    }
  }, [active, section])
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
                <h3 className="about-mission">{museum.introHeading?.map(line => <span key={t(line)}>{t(line)}</span>)}</h3>
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
              {service.id === 'visit' ? (visitContent ?? <MuseumVisit />) : (
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
