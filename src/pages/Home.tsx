import { useRef } from 'react'
import { hero, official } from '../data/home'
import { ExhibitHighlights } from '../components/ExhibitHighlights'
import { ExhibitionProgramme } from '../components/ExhibitionProgramme'
import { CollectionArchive } from '../components/CollectionArchive'
import { ThemeToggle } from '../components/ThemeToggle'
import { MuseumAbout } from '../components/MuseumAbout'
import { useHeroBrandLayout } from '../hooks/useHeroBrandLayout'
import { useHeroIntro } from '../hooks/useHeroIntro'
import { imageTone } from '../data/presentation'
import { useLanguage } from '../i18n/LanguageContext'
import { LanguageToggle } from '../components/LanguageToggle'
import './home.scss'

export function Home() {
  const { t } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  useHeroIntro(heroRef)

  useHeroBrandLayout(heroRef, t('서울역사박물관'))

  return (
    <main id="main-content" tabIndex={-1} data-image-tone={imageTone}>
      <section className="hero" ref={heroRef} data-intro="preparing" aria-labelledby="museum-title">
        <div className="hero-meta">
          <ThemeToggle />
          <LanguageToggle />
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
                <p>Life went on beyond<br />the edges of this frame</p>
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
        <div className="hero-masthead">
          <h1 className="hero-title" id="museum-title" lang="en" aria-label="Seoul Museum of History">
            <span data-hero-word="seoul" aria-hidden="true"><span className="hero-word-ink">Seoul</span></span>
            <span className="hero-title-highlight" aria-hidden="true">
              {Array.from('Museum').map((letter, index) => <span className="hero-museum-letter" key={index}>{letter}</span>)}
            </span>
            <span data-hero-word="of" aria-hidden="true"><span className="hero-word-ink">of</span></span>
            <span data-hero-word="history" aria-hidden="true"><span className="hero-word-ink">History<span className="hero-baseline-marker" /></span></span>
          </h1>
          <p className="hero-brand" aria-label={t('서울역사박물관')}>{Array.from(t('서울역사박물관')).map((letter, index) => <span aria-hidden="true" key={index}>{letter}</span>)}</p>
        </div>
      </section>
      <ExhibitHighlights />
      <ExhibitionProgramme />
      <CollectionArchive />
      <MuseumAbout />
    </main>
  )
}
