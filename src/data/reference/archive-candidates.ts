// Historical research pool. Not imported by the running page. Keep original assets for future selection.
import postcard from '../../assets/images/joseon-postcard-000030.webp'
import archiveMap from '../../assets/images/archive-map.webp'
import archivePhoto from '../../assets/images/archive-photo.webp'
import archiveCity from '../../assets/images/archive-city-dongjak.jpg'
import archiveExcavation from '../../assets/images/archive-excavation.webp'
import archiveLife from '../../assets/images/archive-life.webp'

const museum = 'https://museum.seoul.go.kr'

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
