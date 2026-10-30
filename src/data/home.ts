import museumShm1 from '../assets/images/shm1.webp'
import museumShm2 from '../assets/images/shm2.webp'
import educationPoster from '../assets/images/about-education.webp'
import eventPoster from '../assets/images/about-event.webp'
import street from '../assets/images/gyeongseong-street.webp'
import urbanPoster from '../assets/images/seoul-urban-planning-2026.jpg'
import defensePoster from '../assets/images/yeomin-gongsu-2026.jpg'
import taehwagwanPoster from '../assets/images/taehwagwan-2026.jpg'
import postcard from '../assets/images/joseon-postcard-000030.webp'
import archiveMap from '../assets/images/archive-map.webp'
import archivePhoto from '../assets/images/archive-photo.webp'
import archiveCity from '../assets/images/archive-city-dongjak.jpg'
import archiveExcavation from '../assets/images/archive-excavation.webp'
import archiveLife from '../assets/images/archive-life.webp'
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
  image: street, width: 3313, height: 2104,
  alt: 'A sepia photograph of Gyeongseong showing a tram, pedestrians and buildings along a broad street',
  title: 'Gyeongseong street scene',
  // User-supplied photograph: do not inherit the former panorama's 1925 date or source.
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

// Six representative records introduce the archive's breadth, not its complete holdings.
export const collections = [{
  number: '01', image: postcard, tone: 'paper', frame: 'document', width: 1200, height: 760,
  alt: '다듬이질하는 여성들이 담긴 조선풍속 엽서',
  title: '소장유물', description: '조선풍속 엽서 — 다듬이질',
  period: '일제강점기', record: '우리소리박물관000030',
  credit: '서울역사박물관 제공 · 서울우리소리박물관 소장 · 공공누리 제2유형',
  source: `${museum}/archive/archiveNew/NR_relicView.do?mcsjgbnc=PS01003026018&mcseqno1=000030&mcseqno2=00000&cdLanguage=KOR`,
}, {
  number: '02', image: archiveMap, tone: 'paper', frame: 'map', width: 1200, height: 900,
  alt: '한성부 영역의 산과 하천, 지명을 표시한 경성부근지도',
  title: '서울지도', description: '경성부근지도',
  period: '1900년 · 고지도', record: 'srd-415205',
  credit: '서울역사박물관 제공 · 공공누리 제1유형',
  source: `${museum}/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY780&upperNodeId=CTGRY780&fileSn=1098&fileId=6279af91-be6d-4ddf-b8d1-30acd687347d&type=C`,
}, {
  number: '03', image: archivePhoto, tone: 'photo', frame: 'photo', width: 1200, height: 901,
  alt: '동대문에서 종로 안쪽으로 이어지는 전차 선로와 시가지',
  title: '근현대서울사진', description: '동대문 문루에서 바라본 종로',
  period: '1911년 · 종로', record: 'H-TRNS-74779-804',
  credit: '서울역사박물관 제공 · 공공누리 제1유형',
  source: `${museum}/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY804&upperNodeId=CTGRY804&fileSn=300&fileId=H-TRNS-74779-804&type=D`,
}, {
  number: '04', image: archiveCity, tone: 'photo', frame: 'photo', width: 1981, height: 2000,
  alt: '이촌동에서 바라본 개통 후 동작대교와 주변 한강종합개발 공사 현장',
  title: '서울시정사진', description: '개통 후 동작대교',
  period: '1984년 11월 26일', record: 'H-TRNS-101625-775',
  credit: '서울역사박물관 제공 · 공공누리 제1유형',
  source: `${museum}/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY772&upperNodeId=CTGRY775&fileSn=300&fileId=H-TRNS-101625-775&type=B`,
}, {
  number: '05', image: archiveExcavation, tone: 'photo', frame: 'photo', width: 1200, height: 800,
  alt: '건물 터와 우물지가 드러난 의정부지 발굴 현장을 위에서 본 사진',
  title: '서울발굴기록', description: '의정부지 — 2019년 조사 후',
  period: '2019년 · 발굴 현장', record: 'H-TRNS-103913-919',
  credit: '서울역사박물관 제공 · 공공누리 제1유형',
  source: `${museum}/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY919&upperNodeId=CTGRY919&fileSn=400&fileId=H-TRNS-103913-919&type=E`,
}, {
  number: '06', image: archiveLife, tone: 'paper', frame: 'document', width: 1059, height: 1200,
  alt: '안채와 사랑채 등 가회동 30-2번지 가옥의 공간 배치를 추정한 도면',
  title: '서울생활문화자료조사', description: '1930년대 이후 가회동 30-2번지 가옥 추정 도면',
  period: '2018년 조사자료 · 북촌', record: 'H-TRNS-99845-301',
  credit: '서울역사박물관 제공 · 공공누리 제1유형',
  source: `${museum}/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY301&upperNodeId=CTGRY301&fileSn=300&fileId=H-TRNS-99845-301&type=A`,
}]

export const museumServices = [
  {
    id: 'museum', number: '01', title: '공식 박물관 소개',
    // Official mission and collection/research goals, edited for the photo introduction.
    // Source: https://museum.seoul.go.kr/www/intro/introPurpose.jsp?sso=ok
    introHeading: ['서울의 장소와 역사와 기억을', '저장하는 박물관'],
    introParagraphs: [
      '서울의 문화유산을 수집·보존하고, 도시의 역사와 문화를 종합적으로 연구·전시합니다.',
      '서울 시민과 서울을 찾는 이들에게 전시와 평생교육을 통해 서울의 문화를 배우고 체험할 기회를 제공합니다.',
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
