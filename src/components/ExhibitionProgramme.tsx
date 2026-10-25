import { useEffect, useRef } from 'react'
import { exhibitions } from '../data/home'
import './exhibition-programme.scss'

export function ExhibitionProgramme() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return
    const words = Array.from(heading.querySelectorAll<HTMLElement>('[data-title-part]'))
    const header = document.querySelector<HTMLElement>('.site-header')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastTime = 0
    let current = 0
    let initialized = false

    const update = (time: number) => {
      frame = 0
      const headerHeight = header?.getBoundingClientRect().height ?? 54
      section.style.setProperty('--programme-header-height', `${headerHeight}px`)
      const distance = Math.min(340, window.innerHeight * 0.38)
      const progress = reducedMotion.matches ? 1 : Math.min(1, Math.max(0,
        (headerHeight - section.getBoundingClientRect().top) / distance,
      ))
      const target = 1 - (1 - progress) ** 2
      // Time-based damping preserves a short, soft follow-through at any refresh rate.
      // Stop requesting frames once settled; no idle animation or scroll interception.
      const elapsed = lastTime ? Math.min(64, time - lastTime) : 16.67
      lastTime = time
      const outside = section.getBoundingClientRect().bottom <= headerHeight
        || section.getBoundingClientRect().top >= window.innerHeight
      if (!initialized || reducedMotion.matches || outside) current = target
      else current += (target - current) * (1 - Math.exp(-elapsed / 170))
      initialized = true
      const settled = Math.abs(target - current) < 0.0002
      if (settled) current = target
      // offsetLeft is untransformed: scroll never changes the measured endpoints.
      const leftDistance = words[0].offsetLeft
      const rightDistance = heading.clientWidth - words[1].offsetLeft - words[1].offsetWidth
      words[0].style.transform = `translateX(${-leftDistance * current}px)`
      words[1].style.transform = `translateX(${rightDistance * current}px)`
      if (!settled) frame = requestAnimationFrame(update)
      else lastTime = 0
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    observer.observe(heading)
    if (header) observer.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reducedMotion.addEventListener('change', schedule)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) schedule() })
    update(performance.now())
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reducedMotion.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <section className="programme" id="exhibitions" ref={sectionRef} aria-labelledby="exhibitions-title">
      <header className="programme-heading">
        <h2 id="exhibitions-title" ref={headingRef}>
          <span className="sr-only">기획전시</span>
          <span data-title-part aria-hidden="true">기획</span>
          <span data-title-part aria-hidden="true">전시</span>
        </h2>
      </header>
      <div className="programme-roll">
        {exhibitions.map((exhibition, index) => (
          <article className={`programme-entry${index % 2 ? ' programme-entry--reverse' : ''}`} key={exhibition.id} aria-labelledby={`programme-${exhibition.id}`}>
            <figure className="programme-poster">
              <a href={exhibition.source} aria-label={`${exhibition.title} 공식 전시 안내`}>
                <img src={exhibition.image} alt={exhibition.alt} width={exhibition.width} height={exhibition.height} loading="lazy" decoding="async" />
              </a>
              <figcaption>서울역사박물관 제공</figcaption>
            </figure>
            <div className="programme-copy">
              <p className="eyebrow">기획전시 / {exhibition.number}</p>
              <h3 id={`programme-${exhibition.id}`}>{exhibition.title}</h3>
              <p className="programme-description">{exhibition.description}</p>
              <dl>
                <div><dt>기간</dt><dd>{exhibition.dates}</dd></div>
                <div><dt>장소</dt><dd>{exhibition.place}</dd></div>
              </dl>
              {exhibition.dateNote && <p className="programme-date-note">{exhibition.dateNote}</p>}
              <a className="text-link" href={exhibition.source}>전시 안내 <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
