import { useRef } from 'react'
import { featuredProgrammes } from '../data/programme-candidates'
import { useProgrammeHeading } from '../hooks/useProgrammeHeading'
import { ProgrammeGallery } from './programme/ProgrammeGallery'
import './exhibition-programme.scss'

export function ExhibitionProgramme() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  useProgrammeHeading(sectionRef, headingRef)

  return (
    <section className="programme" id="exhibitions" ref={sectionRef} aria-labelledby="exhibitions-title">
      <div className="programme-scene">
        <header className="programme-heading">
          <h2 id="exhibitions-title" ref={headingRef}>
            <span className="sr-only">기획전시·프로그램</span>
            <span data-title-part aria-hidden="true">
              {Array.from('기획전시').map((letter, index) => <span data-title-letter key={index}>{letter}</span>)}
            </span>
            <span data-title-dot aria-hidden="true">·</span>
            <span data-title-part aria-hidden="true">
              {Array.from('프로그램').map((letter, index) => <span data-title-letter key={index}>{letter}</span>)}
            </span>
          </h2>
        </header>
        <ProgrammeGallery items={featuredProgrammes} />
      </div>
    </section>
  )
}
