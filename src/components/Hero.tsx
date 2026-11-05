import { useRef } from 'react'
import { hero } from '../data/home'
import { useLanguage } from '../i18n/LanguageContext'
import { useHeroLayout } from '../hooks/useHeroLayout'
import { useHeroIntro } from '../hooks/useHeroIntro'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import './hero.scss'

export function Hero() {
  const { t } = useLanguage()
  const label = t('서울역사박물관')
  const heroRef = useRef<HTMLElement>(null)
  useHeroLayout(heroRef, label)
  useHeroIntro(heroRef)

  return (
    <section className="hero" ref={heroRef} data-intro="preparing" aria-labelledby="museum-title">
      <div className="hero-meta">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <div className="hero-stage">
        <figure className="hero-figure">
          <div className="hero-photo-slot">
            <div className="hero-photo">
              <div className="hero-photo-artwork" role="img" aria-label={hero.alt}>
                <img className="hero-map-original" src={hero.image} alt="" width={hero.width} height={hero.height} fetchPriority="high" />
                <div className="hero-map-cutouts" aria-hidden="true">
                  <img className="hero-map-light" src={hero.lightImage} alt="" width={hero.width} height={hero.height} />
                  <img className="hero-map-dark" src={hero.darkImage} alt="" width={hero.width} height={hero.height} />
                </div>
              </div>
            </div>
          </div>
          <figcaption className="hero-notes" lang="en">
            <p className="hero-map-caption">{hero.title}</p>
            <div className="hero-map-description">
              {hero.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
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
        <p className="hero-brand" aria-label={label}>{Array.from(label).map((letter, index) => <span aria-hidden="true" key={index}>{letter}</span>)}</p>
      </div>
    </section>
  )
}
