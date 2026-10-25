import { useEffect, useRef, useState } from 'react'
import { hero, official } from '../data/home'
import { ExhibitHighlights } from '../components/ExhibitHighlights'
import { ExhibitionProgramme } from '../components/ExhibitionProgramme'
import { CollectionArchive } from '../components/CollectionArchive'
import { MuseumAbout } from '../components/MuseumAbout'
import './home.scss'

export function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [mastheadRun, setMastheadRun] = useState(-1)

  useEffect(() => {
    let active = true
    let exitObserver: IntersectionObserver | undefined
    let entryObserver: IntersectionObserver | undefined
    // The title's measured word spacing should be stable before it moves.
    void document.fonts.ready.then(() => {
      if (!active || !heroRef.current || !titleRef.current) return
      let readyToReplay = true
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().height ?? 0
      const rootMargin = `-${Math.ceil(headerHeight)}px 0px 0px 0px`
      // Arm only after the hero has cleared the visible area below the sticky header.
      exitObserver = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio <= .02) readyToReplay = true
      }, { rootMargin, threshold: [0, .02] })
      // Start when the actual title is visible, rather than while it is still above the viewport.
      entryObserver = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio >= .25 && readyToReplay) {
          readyToReplay = false
          setMastheadRun(run => run + 1)
        }
      }, { rootMargin, threshold: [0, .25] })
      exitObserver.observe(heroRef.current)
      entryObserver.observe(titleRef.current)
    })
    return () => {
      active = false
      exitObserver?.disconnect()
      entryObserver?.disconnect()
    }
  }, [])

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" ref={heroRef} aria-labelledby="museum-title">
        <div className="hero-meta">
          <a href={official.location}>서울 종로구 새문안로 55</a>
          <a href={official.visit}>공식 관람안내 <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-stage">
          <p className="sr-only" lang="en">What was Seoul like before you knew it</p>
          <span className="hero-side hero-side--left" lang="en" aria-hidden="true">What was Seoul like</span>
          <figure className="hero-figure">
            <a href={hero.source} aria-label={`${hero.title} 공식 자료 보기`}>
              <img src={hero.image} alt={hero.alt} width={hero.width} height={hero.height} fetchPriority="high" />
            </a>
            <figcaption>
              <span>{hero.title}, {hero.year}</span>
              <a href={hero.source}>공식 자료 <span aria-hidden="true">↗</span></a>
              <span className="hero-credit">{hero.credit}</span>
            </figcaption>
          </figure>
          <span className="hero-side hero-side--right" lang="en" aria-hidden="true">before you knew it</span>
        </div>
        <h1 className={`hero-title${mastheadRun >= 0 ? ' is-assembled' : ' is-preparing'}`} id="museum-title" ref={titleRef} lang="en">
          <span key={`seoul-${mastheadRun}`}>Seoul</span>{' '}
          <span className="hero-title-highlight" key={`museum-${mastheadRun}`}>
            Museum
            <span className="hero-title-highlight-inverse" aria-hidden="true">Museum</span>
          </span>{' '}
          <span key={`of-${mastheadRun}`}>of</span>{' '}<span key={`history-${mastheadRun}`}>History</span>
        </h1>
        <div className="hero-baseline">
          <span>서울역사박물관</span>
          <a href="#featured">주요 전시품 살펴보기 <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <ExhibitHighlights />
      <ExhibitionProgramme />
      <CollectionArchive />
      <MuseumAbout />
    </main>
  )
}
