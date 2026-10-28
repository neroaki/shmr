import { useEffect, useRef, useState } from 'react'
import { museumServices } from '../data/home'
import { useAboutScene } from '../hooks/useAboutScene'
import { usePhotoDepth } from '../hooks/usePhotoDepth'
import { scrollPageToSection } from '../lib/page-scroll'
import './museum-about.scss'

const directions = ['top', 'right', 'bottom', 'left'] as const
const arrows = ['↓', '←', '↑', '→']
const museum = museumServices[0]
const services = museumServices.slice(1)

export function MuseumAbout() {
  const { section, scene } = useAboutScene()
  const [active, setActive] = useState<number | null>(null)
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
          <figure className="about-panorama">
            <div className="about-panorama-media" ref={mediaRef}>
              <div className="about-photo-window">
                <img className="image-tone--photo" src={museum.image} alt={museum.alt} width="1200" height="420" loading="lazy" decoding="async" draggable={false} />
              </div>
              <h2 id="about-title"><span className="about-title-highlight">박물관</span><span>소개</span></h2>
              <div className="about-photo-introduction">
                <div className="about-intro-label"><span>서울의 도시역사박물관</span><span aria-hidden="true">04</span></div>
                <p className="about-mission">{museum.introHeading?.map(line => <span key={line}>{line}</span>)}</p>
                <div className="about-intro-body">{museum.introParagraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
                <dl className="about-intro-roles">{museum.introRoles?.map(role => <div key={role.title}><dt>{role.title}</dt><dd>{role.detail}</dd></div>)}</dl>
              </div>
            </div>
            <figcaption>{museum.caption}</figcaption>
          </figure>
          <div className="about-introduction">
            <a className="text-link" href={museum.links[0].href}>박물관 알아보기 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <nav className="about-edges" aria-label="박물관 이용 안내">
          {services.map((service, index) => (
            <button className={`about-edge about-edge--${directions[index]}`} type="button" key={service.id}
              ref={element => { triggers.current[index] = element }}
              aria-expanded={active === index} aria-controls={`about-panel-${service.id}`}
              onClick={() => {
                if (active === index) { close(); return }
                if (section.current) scrollPageToSection(section.current)
                setActive(index)
              }}>
              <span>{service.title}</span><span aria-hidden="true">{active === index ? '−' : arrows[index]}</span>
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
              <button className="about-return" type="button" onClick={close}>소개로 돌아가기 <span aria-hidden="true">×</span></button>
              <div className="about-panel-layout">
                {service.image ? (
                  <figure className="about-panel-image">
                    <img src={service.image} alt={service.alt} loading="lazy" decoding="async" />
                    <figcaption>{service.caption}</figcaption>
                  </figure>
                ) : (
                  <div className="about-panel-address"><span>서울 종로구</span><p>새문안로<br /><span lang="en">55</span></p></div>
                )}
                <div className="about-panel-copy">
                  <p className="eyebrow">서울역사박물관 <span aria-hidden="true">/ {String(index + 1).padStart(2, '0')}</span></p>
                  <h3 id={`about-heading-${service.id}`}>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.links.map(link => <li key={link.href}><a className="text-link" href={link.href}>{link.label}<span aria-hidden="true">↗</span></a></li>)}</ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
