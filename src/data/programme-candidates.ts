// Collected 2026-10-28. Five selected entries are mounted in the programme gallery.
// Dates describe programme operation, not current booking availability.
import { exhibitions } from './home'
import whiteBird from '../assets/images/programme-white-bird-2026.png'
import soundTalk from '../assets/images/programme-our-sound-talk-2026.jpg'
import familyPalace from '../assets/images/programme-family-gyeonghuigung-2026.jpg'
import visitMuseum from '../assets/images/programme-visit-museum-2026.png'
import haegeum from '../assets/images/programme-haegeum-2026.png'

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

export const additionalProgrammeCards: ProgrammeCard[] = [
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
  {
    id: 'family-gyeonghuigung', number: '06', category: '교육',
    title: '우리 가족 경희궁 탐험대',
    description: '박물관에서 배우고 경희궁에서 미션을 풀어보는 가족 탐험',
    dates: '2026.09.05 — 11.21', time: '토요일 10:30–12:00',
    dateNote: '총 10회 · 9월 26일과 10월 3일은 미운영',
    place: '서울역사박물관·경희궁 일대',
    audience: '초등학교 1–6학년 자녀를 동반한 가족',
    image: familyPalace, width: 1440, height: 1800,
    alt: '경희궁 건물과 가족 캐릭터를 그린 우리 가족 경희궁 탐험대 포스터',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1005&seq=20260806132547293&categoryVal=&sso=ok`,
    cta: '교육 안내',
  },
  {
    id: 'visit-museum-enjoy-seoul', number: '07', category: '교육',
    title: 'Visit Museum, Enjoy Seoul',
    description: '전시 관람과 만들기 활동으로 서울을 배우는 외국인 단체 교육',
    dates: '2026.04.01 — 12.31',
    dateNote: '교육일은 단체별 협의 · 운영 회차 소진 시 조기 마감 가능',
    place: '서울역사박물관·경희궁(선택 프로그램에 따라 다름)',
    audience: '성인 외국인 단체 · 한국어 수업 이해 가능 또는 통역 동반 사전 협의',
    image: visitMuseum, width: 1080, height: 2000,
    alt: '여러 나라의 국기와 Visit Museum Enjoy Seoul 문구를 담은 노란색 포스터',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1005&seq=20260310132118331&categoryVal=&sso=ok`,
    cta: '교육 안내',
  },
]

// Keep the full verified pool; the presentation selection is explicit below.
export const programmeCandidates: ProgrammeCard[] = [
  ...exhibitions.map((item): ProgrammeCard => ({ ...item, category: '기획전시', cta: '전시 안내' })),
  ...additionalProgrammeCards,
]

// Three exhibitions, one event, one education programme. Other candidates stay available.
export const featuredProgrammes: ProgrammeCard[] = programmeCandidates.filter(item =>
  ['urban-planning', 'yeomin-gongsu', 'taehwagwan', 'white-bird', 'our-sound-talk'].includes(item.id),
)

// Do not merge into the ready collection before verifying the conflicting dates and venue.
export const programmeReserve = [{
  id: 'haegeum-class', category: '교육',
  title: '꿈나무 해금교실 : 나도 연주자!',
  description: '해금을 배우고 연주하며 발표회까지 경험하는 어린이 국악기 교실',
  image: haegeum, width: 1080, height: 1350,
  alt: '해금과 어린이 동물 캐릭터를 그린 꿈나무 해금교실 포스터',
  source: `${museum}/www/board/NR_boardView.do?bbsCd=1005&seq=20261026095539321&categoryVal=&sso=ok`,
  verification: 'needs-check',
  issue: '상단 교육기간은 11.03–11.13, 본문은 1기 11.03–11.07 / 2기 11.10–11.14. 세부 장소도 추가 확인 필요.',
}]
