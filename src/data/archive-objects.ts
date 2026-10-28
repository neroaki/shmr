import image0 from '../assets/images/collection/bulanggi.webp'
import image1 from '../assets/images/collection/yeonggajip.webp'
import image2 from '../assets/images/collection/hanho.webp'
import image3 from '../assets/images/collection/victrola.webp'
import image4 from '../assets/images/collection/stereoscope.webp'
import image5 from '../assets/images/collection/sutra-chest.webp'
import image6 from '../assets/images/collection/ryu-sunjeong.webp'
import image7 from '../assets/images/collection/ryu-hong.webp'
import image8 from '../assets/images/collection/landscape-jar.webp'
import image9 from '../assets/images/collection/military-chest.webp'
import image10 from '../assets/images/collection/copper-jar.webp'
import image11 from '../assets/images/collection/surangama.webp'

export interface ArchiveObject {
  id: string
  title: string
  shortTitle: string
  category: string
  period: string
  recordNumber: string
  kind: string
  description: string
  source: string
  alt: string
  image: string
}

export const archiveObjects: ArchiveObject[] = [
  { ...{"id": "bulanggi", "title": "불랑기자포", "shortTitle": "불랑기자포", "category": "보물", "period": "1563년", "recordNumber": "서위역박436", "kind": "금속 · 화포", "description": "군기시 터에서 출토된 후장식 화포의 장전용 자포입니다. 포신에 새긴 글에서 1563년 장인 김석년이 제작했음을 확인할 수 있습니다. 화약과 포탄을 넣은 자포를 모포에 갈아 끼워 발사했습니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000068", "alt": "불랑기자포"}, image: image0 },
  { ...{"id": "yeonggajip", "title": "선종영가집", "shortTitle": "선종영가집", "category": "보물", "period": "1472년", "recordNumber": "서7562", "kind": "전적 · 불경", "description": "고려시대 충주 청룡사에서 판각한 책판을 다시 인쇄하고, 1472년 김수온의 발문을 덧붙인 책입니다. 목판으로 찍은 본문과 금속활자로 인쇄한 발문이 한 책에 남아 조선 초기 왕실의 불경 간행 방식을 보여줍니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000041", "alt": "선종영가집"}, image: image1 },
  { ...{"id": "hanho", "title": "한호 필적 — 석봉한호해서첩", "shortTitle": "한호 필적", "category": "보물", "period": "조선 · 선조 연간", "recordNumber": "서619", "kind": "서예 · 필적", "description": "석봉 한호가 문장가 최립의 글 21편을 해서로 옮겨 쓴 서첩입니다. 원래 책으로 묶였던 필적을 상하 두 첩으로 꾸몄습니다. 단정한 글씨와 많은 분량의 필사를 통해 사자관 한호의 서풍을 살필 수 있습니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000037", "alt": "한호 필적 — 석봉한호해서첩"}, image: image2 },
  { ...{"id": "victrola", "title": "빅터 오소포닉 빅트롤라 축음기", "shortTitle": "빅트롤라 축음기", "category": "월간서울유산", "period": "1927년 이후", "recordNumber": "", "kind": "생활 · 음향기기", "description": "나팔을 나무 캐비닛 안에 넣은 축음기로, 전기 녹음 음반을 재생하도록 만들어졌습니다. 옆의 손잡이로 태엽을 감아 사용했습니다. 1920~30년대 경성에서 음악이 일상과 대중문화 속으로 퍼져가던 모습을 전하는 자료입니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1026&seq=20221116152259146", "alt": "빅터 오소포닉 빅트롤라 축음기"}, image: image3 },
  { ...{"id": "stereoscope", "title": "입체경", "shortTitle": "입체경", "category": "월간서울유산", "period": "1930년대", "recordNumber": "서46688", "kind": "생활 · 광학기기", "description": "서로 다른 각도에서 촬영한 두 장의 사진을 양쪽 눈으로 보게 하는 기기입니다. 두 눈이 받아들이는 영상의 차이를 이용해 평면 사진에서 깊이감을 느끼도록 합니다. 목제 상자형 입체경으로 당시의 시각 문화를 살펴볼 수 있습니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1026&seq=20170913094804403", "alt": "입체경"}, image: image4 },
  { ...{"id": "sutra-chest", "title": "대장경궤", "shortTitle": "대장경궤", "category": "서울시지정문화유산", "period": "조선", "recordNumber": "서16084", "kind": "목공예 · 경전 보관", "description": "문판에 ‘대장경궤’라고 새긴 불경 보관용 가구입니다. 붉은 빛의 칠과 꽃무늬 금속 장식이 앞면과 다리 끝을 감싸고 있습니다. 둥글게 다듬은 기둥과 높인 다리, 세심한 마감에서 특별한 용도에 맞춰 제작한 가구의 특징을 볼 수 있습니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20260721170139066", "alt": "대장경궤"}, image: image5 },
  { ...{"id": "ryu-sunjeong", "title": "류순정영정", "shortTitle": "류순정 영정", "category": "서울시지정문화유산", "period": "16세기 초", "recordNumber": "서16597", "kind": "회화 · 초상", "description": "중종반정의 정국공신 류순정을 그린 전신 좌상입니다. 푸른 단령을 입고 의자에 앉아 있으며 발아래에는 무늬 있는 깔개가 놓여 있습니다. 섬세한 얼굴 표현과 복식에서 조선 중기 공신 초상으로 이어지는 변화를 읽을 수 있습니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000029", "alt": "류순정영정"}, image: image6 },
  { ...{"id": "ryu-hong", "title": "류홍영정", "shortTitle": "류홍 영정", "category": "서울시지정문화유산", "period": "조선 · 16세기", "recordNumber": "서16598", "kind": "회화 · 초상", "description": "1506년 중종반정의 공으로 정국공신에 오른 류홍을 그린 초상입니다. 흉배 없는 푸른 단령과 간결한 옷주름, 다문 입가가 눈에 띕니다. 초상화를 보관한 영정함과 향 주머니도 함께 남아 당시의 보관 방식까지 전합니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000028", "alt": "류홍영정"}, image: image7 },
  { ...{"id": "landscape-jar", "title": "백자청화산수문호", "shortTitle": "백자청화산수문호", "category": "서울시지정문화유산", "period": "19세기", "recordNumber": "서21872", "kind": "도자 · 청화백자", "description": "몸체 앞뒤에 산수 풍경을, 양옆에는 대나무와 매화를 청화로 그린 항아리입니다. 산수화 곁에는 두보의 시구가 적혀 있습니다. 산과 물 사이를 비워 둔 구도와 섬세한 필치가 그림의 공간감을 더합니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000038", "alt": "백자청화산수문호"}, image: image8 },
  { ...{"id": "military-chest", "title": "진위대 군안궤", "shortTitle": "진위대 군안궤", "category": "서울시지정문화유산", "period": "1900~1907년 사용 추정", "recordNumber": "서13602", "kind": "목공예 · 문서 보관", "description": "대한제국 진위대 제4연대 제2대대의 군인 명부를 보관하던 상자입니다. 전면에 새겨진 부대명과 ‘군안’이라는 글자로 용도를 알 수 있습니다. 소나무 판재와 황동 장식, 옻칠뿐 아니라 당시 자물쇠까지 남아 있습니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20180604130706045", "alt": "진위대 군안궤"}, image: image9 },
  { ...{"id": "copper-jar", "title": "백자동화원형문각호", "shortTitle": "백자동화원형문각호", "category": "서울시지정문화유산", "period": "조선 후기", "recordNumber": "서19621", "kind": "도자 · 동화백자", "description": "둥글게 빚은 몸체를 깎아 열 개의 면을 만든 항아리입니다. 자줏빛 동화 안료로 원을 그리고 그 안에 새와 식물을 배치했습니다. 어깨의 당초무늬와 원 안의 새무늬가 함께 나타나는 드문 조합이 특징입니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000052", "alt": "백자동화원형문각호"}, image: image10 },
  { ...{"id": "surangama", "title": "대불정여래밀인수증료의제보살만행수능엄경 (언해) 권4·7·8", "shortTitle": "능엄경 언해", "category": "보물", "period": "1461년", "recordNumber": "서7564", "kind": "전적 · 불경", "description": "1461년 금속활자 을해자와 한글 활자로 간행한 불경의 언해본입니다. 전체 열 권 가운데 권4·7·8이 서울역사박물관에 남아 있습니다. 한문 경전과 한글 풀이가 함께 실려 15세기 국어와 초기 금속활자 인쇄를 연구하는 자료가 됩니다.", "source": "https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000048", "alt": "대불정여래밀인수증료의제보살만행수능엄경 (언해) 권4·7·8"}, image: image11 }
]
