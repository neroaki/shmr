import { useRef } from 'react'
import { hero, official } from '../data/home'
import { ExhibitHighlights } from '../components/ExhibitHighlights'
import { ExhibitionProgramme } from '../components/ExhibitionProgramme'
import { CollectionArchive } from '../components/CollectionArchive'
import { MuseumAbout } from '../components/MuseumAbout'
import { useHeroIntro } from '../hooks/useHeroIntro'
import { imageTone } from '../data/presentation'
import './home.scss'

export function Home() {
  const heroRef = useRef<HTMLElement>(null)
  useHeroIntro(heroRef)

  return (
    <main id="main-content" tabIndex={-1} data-image-tone={imageTone}>
      <section className="hero" ref={heroRef} data-intro="preparing" aria-labelledby="museum-title">
        <div className="hero-meta" lang="en">
          <a href={official.location}>55 Saemunan-ro, Seoul</a>
          <a href={official.visit}>Plan your visit <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-stage">
          <figure className="hero-figure">
            <div className="hero-photo-slot">
              <div className="hero-photo">
                <img src={hero.image} alt={hero.alt} width={hero.width} height={hero.height} fetchPriority="high" />
                <span className="hero-photo-shade" aria-hidden="true" />
              </div>
            </div>
            <figcaption className="hero-notes" lang="en">
              <div className="hero-story">
                <p className="hero-question">What was Seoul like<br />before you knew it</p>
                <p>A tram follows the rails<br />People cross the open street<br />Buildings frame the distance</p>
                <p>Before this was a photograph,<br />it was an ordinary day in Seoul</p>
                <a href={official.archive}>Explore the archive <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-reflection">
                <span className="hero-reflection-date">Gyeongseong / Seoul</span>
                <span>A city in motion</span>
                <span>A moment held still</span>
              </div>
            </figcaption>
          </figure>
        </div>
        <h1 className="hero-title" id="museum-title" lang="en">
          <span>Seoul</span>{' '}
          <span className="hero-title-highlight">
            Museum
            <span className="hero-title-highlight-inverse" aria-hidden="true">Museum</span>
          </span>{' '}
          <span>of</span>{' '}<span>History</span>
        </h1>
        <div className="hero-baseline" lang="en">
          <span>Seoul Museum of History</span>
          <a href="#featured">Explore the collection <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <ExhibitHighlights />
      <ExhibitionProgramme />
      <CollectionArchive />
      <MuseumAbout />
    </main>
  )
}
