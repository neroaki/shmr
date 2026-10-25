import { useEffect, useState } from 'react'
import { hero, official } from '../data/home'
import { ExhibitHighlights } from '../components/ExhibitHighlights'
import { ExhibitionProgramme } from '../components/ExhibitionProgramme'
import { CollectionArchive } from '../components/CollectionArchive'
import { MuseumAbout } from '../components/MuseumAbout'
import './home.scss'

export function Home() {
  const [mastheadReady, setMastheadReady] = useState(false)

  useEffect(() => {
    let active = true
    // The title's measured word spacing should be stable before it moves.
    void document.fonts.ready.then(() => {
      if (active) setMastheadReady(true)
    })
    return () => { active = false }
  }, [])

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero" aria-labelledby="museum-title">
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
        <h1 className={`hero-title${mastheadReady ? ' is-assembled' : ' is-preparing'}`} id="museum-title" lang="en">
          <span>Seoul</span>{' '}
          <span className="hero-title-highlight">
            Museum
            <span className="hero-title-highlight-inverse" aria-hidden="true">Museum</span>
          </span>{' '}
          <span>of</span>{' '}<span>History</span>
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
