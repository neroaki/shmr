import { Hero } from '../components/Hero'
import { ExhibitHighlights } from '../components/ExhibitHighlights'
import { ExhibitionProgramme } from '../components/ExhibitionProgramme'
import { CollectionArchive } from '../components/CollectionArchive'
import { MuseumAbout } from '../components/MuseumAbout'
import { imageTone } from '../data/presentation'

export function Home() {
  return (
    <main id="main-content" tabIndex={-1} data-image-tone={imageTone}>
      <Hero />
      <ExhibitHighlights />
      <ExhibitionProgramme />
      <CollectionArchive />
      <MuseumAbout />
    </main>
  )
}
