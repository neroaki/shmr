import museumShm1 from '../assets/images/shm1.webp'
import museumShm2 from '../assets/images/shm2.webp'
import educationPoster from '../assets/images/about-education.webp'
import eventPoster from '../assets/images/about-event.webp'
import suseonOriginal from '../assets/images/suseonjeondo-original.jpg'
import suseonLight from '../assets/images/suseonjeondo-light.png'
import suseonDark from '../assets/images/suseonjeondo-dark.png'
import urbanPoster from '../assets/images/seoul-urban-planning-2026.jpg'
import defensePoster from '../assets/images/yeomin-gongsu-2026.jpg'
import taehwagwanPoster from '../assets/images/taehwagwan-2026.jpg'
import archivePhoto from '../assets/images/archive-photo.webp'
import cityMap from '../assets/images/cutouts/doseong-daegido.png'
import seoyu from '../assets/images/cutouts/seoyu-gyeonmun.png'
import tramGuide from '../assets/images/cutouts/gyeongseong-tram-guide.png'
import olympicTorch from '../assets/images/cutouts/seoul-olympic-torch.png'

const museum = 'https://museum.seoul.go.kr'
export const museumExteriorPhotos = [
  { id: 'shm1', src: museumShm1, alt: '소나무와 석상 너머로 보이는 서울역사박물관 본관 입구', width: 3264, height: 1836 },
  { id: 'shm2', src: museumShm2, alt: '도심과 숲 사이에 자리한 서울역사박물관의 전경', width: 1800, height: 1200 },
] as const

export const official = {
  home: `${museum}/www/NR_index.do?sso=ok`,
  archive: `${museum}/archive/NR_index.do`,
  education: `${museum}/www/eduSchedule/NR_eduScheduleMonthly.do?sso=ok`,
  events: `${museum}/www/board/NR_boardList.do?bbsCd=1018&sso=ok`,
  notices: `${museum}/www/board/NR_boardList.do?bbsCd=1014&sso=ok`,
  visit: `${museum}/www/guide/vis/infomation.jsp?sso=ok`,
  location: `${museum}/www/guide/loc/busSubwayCar/guideLoc.jsp?sso=ok`,
  about: `${museum}/www/intro/introPurpose.jsp?sso=ok`,
}

// Main-only iteration: section links are replaced by routes in a later stage.
export const navigation = [
  { label: '주요 전시품', href: '#featured', number: '01' },
  { label: '기획전시·프로그램', href: '#exhibitions', number: '02' },
  { label: '소장자료', href: '#collection', number: '03' },
  { label: '박물관 소개', href: '#about', number: '04' },
]

// Replace the image, dimensions, description and source together.
export const hero = {
  image: suseonOriginal, lightImage: suseonLight, darkImage: suseonDark,
  width: 1429, height: 1984,
  alt: '수선전도 — 한양의 산맥, 궁궐과 도성 안팎의 길을 그린 지도',
  // Museum's English exhibition terminology; the heritage portal also uses "Suseon jeondo".
  // https://museum.seoul.go.kr/eng/exhibition/outdoorExhibitArea.jsp
  title: 'SUSEON JEONDO / SEOUL',
  // Paraphrased from the Seoul Institute's entry for the museum's print (서2080).
  // https://data.si.re.kr/data-seoul/지도로-본-서울-2013/70
  description: [
    'A woodblock map of Hanyang, the Joseon capital.',
    'Mountains, streams and palaces frame the city, with detailed streets inside its walls and a wider landscape beyond.',
  ],
}

export const exhibitions = [
  {
    id: 'urban-planning', number: '01', title: '서울도시계획 대관람',
    description: '1966년 도시계획에서 시작된 서울의 변화',
    dates: '2026.08.14 — 11.08', place: '서울역사박물관 기획전시실 A',
    image: urbanPoster, width: 460, height: 690, alt: '서울도시계획 대관람 전시 포스터',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1002&seq=20260723145427523&sso=ok`,
  },
  {
    id: 'yeomin-gongsu', number: '02', title: '여민공수與民共守',
    description: '백성과 함께 지킨 도성',
    dates: '2026.07.14 — 11.08', place: '서울역사박물관 기획전시실 B',
    image: defensePoster, width: 460, height: 690, alt: '여민공수與民共守 전시 포스터',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1002&seq=20260615104640628&sso=ok`,
  },
  {
    id: 'taehwagwan', number: '03', title: '태화관_시간을 잇는 공간',
    description: '집터와 궁가, 요릿집과 독립선언의 현장, 사회복지 공간으로 변해 온 인사동 194번지의 역사',
    dates: '2026.06.26 — 2027.03.07', place: '공평도시유적전시관 기획전시실',
    image: taehwagwanPoster, width: 920, height: 1380, alt: '태화관 시간을 잇는 공간 기획전시 포스터',
    dateNote: '공식 안내 기간 기준 · 포스터에는 6월 27일 개막으로 표기',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1002&seq=20260623170800431&sso=ok`,
  },
]

// Original-pixel cutouts: only alpha and empty outer margins changed. Display at native size or smaller.
export const highlights = [
  {
    id: 'doseong-map', number: '01', title: '도성대지도',
    category: '18세기 · 지도',
    description: '산과 성곽, 궁궐과 길이 한 화면에 담겨 있습니다. 오늘날에도 익숙한 장소를 옛 한양의 지도에서 찾아보세요.',
    image: cityMap, width: 680, height: 676, displayWidth: 578,
    alt: '산세와 도성 안팎의 길, 궁궐을 그린 도성대지도 전체 모습',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1182&seq=20221208151226671&sso=ok`,
  },
  {
    id: 'seoyu-gyeonmun', number: '02', title: '서유견문',
    category: '개항기 · 서적',
    description: '유길준이 서양에서 접한 문물과 제도를 기록한 책입니다. 교육과 교통, 의료 등 새로운 사회를 구상하던 당시의 생각을 읽을 수 있습니다.',
    image: seoyu, width: 507, height: 387, displayWidth: 507,
    alt: '서문과 손글씨가 보이는 펼쳐진 서유견문',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1182&seq=20221212103738699&sso=ok`,
  },
  {
    id: 'tram-guide', number: '03', title: '경성전차안내',
    category: '일제강점기 · 관광안내서',
    description: '전차와 버스 노선, 명소를 담은 접이식 안내서입니다. 당시의 도시 풍경과 함께 관광을 통해 식민 지배를 정당화하려던 시선도 담겨 있습니다.',
    image: tramGuide, width: 650, height: 243, displayWidth: 650,
    alt: '경성의 전차 노선과 명소를 그림으로 나타낸 가로형 접이식 안내서',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1182&seq=20221212133847472&sso=ok`,
  },
  {
    id: 'olympic-torch', number: '04', title: '서울올림픽 성화봉',
    category: '1988 서울올림픽 · 성화봉',
    description: '1988년 서울올림픽을 상징하는 성화봉입니다. 올림픽을 준비하며 크게 달라진 서울의 모습과 도시가 세계에 알려진 순간을 돌아봅니다.',
    image: olympicTorch, width: 94, height: 449, displayWidth: 94,
    alt: '서울올림픽 엠블럼과 오륜이 새겨진 금속 성화봉',
    source: `${museum}/www/board/NR_boardView.do?bbsCd=1182&seq=20221212151650918&sso=ok`,
  },
]

export const museumServices = [
  {
    id: 'museum', number: '01', title: '공식 박물관 소개',
    // Adapted from the official purpose, collection/education goals and next-generation vision.
    // Source: https://museum.seoul.go.kr/www/intro/introPurpose.jsp?sso=ok
    introHeading: ['서울의 역사와 문화를', '만나는 박물관'],
    introParagraphs: [
      '서울의 문화유산을 수집·보존하고, 도시의 역사와 문화를 종합적으로 연구·전시합니다. 서울 시민과 서울을 찾는 이들에게 전시와 평생교육을 통해 서울의 문화를 배우고 체험할 기회를 제공합니다. 오늘의 서울을 기록해 다음 세대에 전합니다.',
    ],
    introRoles: [
      { title: '수집·보존', detail: '서울의 문화유산' },
      { title: '연구·전시', detail: '도시의 역사와 문화' },
      { title: '교육·문화', detail: '시민의 배움과 체험' },
    ],
    description: '서울의 문화유산을 수집·보존하고, 도시 서울의 역사와 문화를 연구·전시합니다.',
    image: museumExteriorPhotos[0].src, alt: museumExteriorPhotos[0].alt,
    caption: '서울역사박물관 본관 · 서울특별시 제공',
    links: [{ label: '박물관 알아보기', href: official.about }],
  },
  {
    id: 'visit', number: '02', title: '오시는 길・관람안내',
    description: '주소, 관람시간, 휴관일을 확인하세요.',
    links: [
      { label: '오시는 길', href: official.location },
      { label: '관람안내', href: official.visit },
    ],
  },
  {
    id: 'learning', number: '03', title: '교육 프로그램',
    description: '어린이부터 성인까지, 서울을 배우는 교육 일정과 참여 방법을 확인하세요.',
    image: educationPoster, alt: '성인 교육 프로그램 내 인생의 18번 시대의 명곡이 되다 안내 포스터',
    caption: '교육 사례 · 내 인생의 18번, 시대의 명곡이 되다',
    links: [{ label: '교육 일정 보기', href: official.education }],
  },
  {
    id: 'research', number: '04', title: '서울역사아카이브',
    description: '유물과 지도, 사진, 조사기록에서 서울의 장소와 생활을 찾아보세요.',
    image: archivePhoto, alt: '1911년 동대문 문루에서 바라본 종로의 전차 선로와 시가지',
    caption: '동대문 문루에서 바라본 종로, 1911 · 공공누리 제1유형',
    links: [{ label: '아카이브 보기', href: official.archive }],
  },
  {
    id: 'news', number: '05', title: '행사·소식',
    description: '음악회와 문화행사, 박물관의 새로운 소식을 확인하세요.',
    image: eventPoster, alt: '제33회 백인제가옥 북촌음악회 정취 안내 포스터',
    caption: '행사 사례 · 제33회 백인제가옥 북촌음악회 정취',
    links: [
      { label: '문화행사 보기', href: official.events },
      { label: '공지사항', href: official.notices },
    ],
  },
]
