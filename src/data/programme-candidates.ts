// Collected 2026-10-28. Five selected entries are mounted in the programme gallery.
// Dates describe programme operation, not current booking availability.
import { exhibitions } from './home'
import whiteBird from '../assets/images/programme-white-bird-2026.png'
import soundTalk from '../assets/images/programme-our-sound-talk-2026.jpg'

const museum = 'https://museum.seoul.go.kr'

export interface ProgrammeCard {
  id: string
  number: string
  category: '기획전시' | '행사' | '교육'
  title: string
  description: string
  dates: string
  place: string
  image: string
  width: number
  height: number
  alt: string
  source: string
  cta: string
  dateNote?: string
  audience?: string
  time?: string
  imageNote?: string
}

const additionalProgrammeCards: ProgrammeCard[] = [
  {
    id: 'white-bird', number: '04', category: '행사',
    title: '배리어프리영화관 — 화이트 버드',
    description: '음성해설과 배리어프리 자막으로 함께 관람하는 영화',
    dates: '2026.10.29', time: '14:00',
    place: '서울역사박물관 1층 야주개홀',
    audience: '12세 이상 관람가',
    image: whiteBird, width: 521, height: 745,
    alt: '미나리·화이트 버드·넘버원 상영 일정을 담은 배리어프리영화관 포스터',
    imageNote: '포스터는 세 편의 상영 일정을 함께 안내합니다. 위 일정은 화이트 버드 상영 기준입니다.',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1018&seq=20261013163438168&sso=ok`,
    cta: '상영 안내',
  },
  {
    id: 'our-sound-talk', number: '05', category: '교육',
    title: '소리, 내것이 되는 순간',
    description: '경기민요 소리꾼 채수현이 들려주는 자신만의 소리를 찾는 이야기',
    dates: '2026.10.30', time: '19:30–20:40',
    place: '서울우리소리박물관 1층 누마루',
    audience: '시민 누구나',
    image: soundTalk, width: 1199, height: 1499,
    alt: '소리꾼 채수현의 사진이 담긴 우리소리 토크콘서트 포스터',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1005&seq=20261020131932560&categoryVal=&sso=ok`,
    cta: '교육 안내',
  },

]

// Three exhibitions, one event and one education programme, in presentation order.
// Unselected research records live under data/reference and stay out of the runtime bundle.
export const featuredProgrammes: ProgrammeCard[] = [
  ...exhibitions.map((item): ProgrammeCard => ({ ...item, category: '기획전시', cta: '전시 안내' })),
  ...additionalProgrammeCards,
]
