# 이미지 출처

확인·확보: 2026-10-23 / 주요 전시품 추가: 2026-10-25. 모든 사용 이미지는 서울역사박물관 공식 사이트에서 확보. 생성 이미지·스톡 이미지 없음.

## 히어로 — 경성 전경

- 파일: `src/assets/images/seoul-panorama-1925.webp` (1600×1202, 약 518KiB)
- 원본: 3165×2378 JPG. [원본 이미지](https://museum.seoul.go.kr:8088/ARCHIVE_DATA/master/1011/A000000247/ff79bd6c-4f9e-45b8-8ca8-6f59ca2991eb.jpg)
- [공식 기록](https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY812&upperNodeId=CTGRY812&type=D&fileSn=300&fileId=H-TRNS-75528-812)
- 자료명: 경성 전경 / 1925 / H-TRNS-75528-812 / 유물번호 서27617. 기록상 장소: 서울특별시 중구 회현동. 자료출처: 『朝鮮』(朝鮮總督府, 1925).
- 내용: 남산에서 내려다본 시가지. 공식 기록의 표제를 유지하며 장소나 연도를 임의 추정하지 않음.
- 조건: 원문에 **공공누리 제1유형(출처표시)** 명시. 화면에 ‘서울역사박물관 소장 · 공공누리 제1유형’과 원문 링크 표시.
- alt: 남산에서 내려다본 1925년 경성 시가지와 산 능선.
- 선택 이유: 도시 전체를 담은 기록사진으로 확정 카피와 연결되며, 중앙의 제한된 크기에서도 풍경이 읽힘. 현재 배치용 선택이며 최종 사진 확정 아님.
- 처리: 전체 비율을 유지한 축소·WebP 변환. 자르기·색보정·합성·AI 보정 없음. 데스크톱 표시 최대 448px.

## 전시 포스터 2점

| 파일 | 크기 | 원본 이미지 URL | 적용·alt |
|---|---|---|---|
| `src/assets/images/seoul-urban-planning-2026.jpg` | 460×690 | https://museum.seoul.go.kr/upload/bbs/2026/7/23/d29e6a83-b04c-4f60-a897-9ee7351654a1_t.jpg | 전시 첫 항목 / 서울도시계획 대관람 전시 포스터 |
| `src/assets/images/yeomin-gongsu-2026.jpg` | 460×690 | https://museum.seoul.go.kr/upload/bbs/2026/10/12/9f562ff4-c6de-430f-ab52-a1be525918e6_t.jpg | 전시 둘째 항목 / 여민공수與民共守 전시 포스터 |

- 기존 `Product Planning/img/` 확보본을 복사하고 공식 페이지에서 전시명·일정·이미지 경로를 재확인.
- [서울도시계획 대관람 공식 페이지](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1002&seq=20260723145427523&sso=ok)
- [여민공수 공식 페이지](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1002&seq=20260615104640628&sso=ok)
- 원비율 2:3 유지, 표시 최대 288px. 원본 이미지 그대로 사용. 상세 페이지에 고해상도 파일이 있으나 현재 표시 크기에는 기존 파일 사용.
- 화면에 서울역사박물관 제공 및 공식 안내 링크 표시. 포스터별 이용허락 유형은 원문에서 확인되지 않아 **needs-check**로 유지. 현 단계는 로컬 포트폴리오 시안이며 공개 배포 전 개별 조건 확인 필요.

## 소장자료 — 조선풍속 엽서

- 파일: `src/assets/images/joseon-postcard-000030.webp` (1200×760, 약 240KiB)
- [원본 이미지](https://museum.seoul.go.kr/_repo/image/2026/07/9fdef316-579f-45fc-9517-5dfb7355452c.png)
- [공식 기록](https://museum.seoul.go.kr/archive/archiveNew/NR_relicView.do?mcsjgbnc=PS01003026018&mcseqno1=000030&mcseqno2=00000&cdLanguage=KOR)
- 일제강점기 / 우리소리박물관000030 / 서울우리소리박물관 소장.
- 조건: 원문에 **공공누리 제2유형(출처표시·상업적 이용금지)** 명시. 화면 출처와 원문 링크 유지.
- alt: 다듬이질하는 여성들이 담긴 조선풍속 엽서.
- 전체 비율을 유지한 축소·WebP 변환. 이미지 안의 기록과 가장자리까지 보존.

## 교체 위치

`src/data/home.ts`의 `hero`, `highlights`, `exhibitions`, `collections`에서 파일·alt·크기·표제·출처를 함께 교체. 이미지 교체 시 실제 원비율, 이용조건, 레이아웃을 재확인.

## 주요 전시품 — 첫 가로 카드 섹션

2026-10-25 공식 페이지의 이미지 파일과 설명을 직접 확인. 각 카드에 서울역사박물관 출처와 공식 상세 링크 표시. 각 소장품에 독립 패널을 배정하고 원비율을 유지한 contain으로 원본 전체 표시. 너비 740px인 자료는 740 CSS px 이하, 전차는 1200 CSS px 이하로 표시하며 화면 크기에 따라 더 축소. 공통 4:3 비율은 사용하지 않음. 자르기·색보정·합성 없음.

| 파일 | 원본 → 사용 크기 | 원본 URL | 적용 섹션·alt |
|---|---|---|---|
| `src/assets/images/doseong-daegido.jpg` | 740×711 그대로, 408KB | https://museum.seoul.go.kr/upload/bbs/2022/12/8/c88052af-ceb1-4a71-997f-0674d888d716.jpg | 첫 카드 / 산세와 도성 안팎의 길, 궁궐을 그린 도성대지도 전체 모습 |
| `src/assets/images/tram-381.jpg` | 4496×3000 → 1600×1067, 712KB | https://museum.seoul.go.kr/upload/bbs/2025/10/1/3a02b9a6-547f-4b35-86d3-9a0c5d20952e.JPG | 셋째 카드 / 박물관 야외에 전시된 크림색과 초록색 차체의 전차 381호 |
| `src/assets/images/seocho-samho-apartment.jpg` | 740×555 그대로, 240KB | https://museum.seoul.go.kr/upload/bbs/2022/12/12/4008ec89-f8f0-494c-9f13-af9b0e3438af.jpg | 다섯째 카드 / 소파, 텔레비전, 거실장과 생활용품을 배치한 서초삼호아파트 재현 전시 |
| `src/assets/images/seoyu-gyeonmun.jpg` | 740×555 그대로, 229KB | https://museum.seoul.go.kr/upload/bbs/2022/12/12/7f7d4920-a516-474e-88a0-2032345e9dfd.jpg | 둘째 카드 / 서문과 손글씨가 보이는 펼쳐진 서유견문 |
| `src/assets/images/gyeongseong-tram-guide.jpg` | 740×555 그대로, 274KB | https://museum.seoul.go.kr/upload/bbs/2022/12/12/800b03db-29c5-4de8-b911-ffc71486301f.jpg | 넷째 카드 / 경성의 전차 노선과 명소를 그림으로 나타낸 가로형 접이식 안내서 |
| `src/assets/images/seoul-olympic-torch.jpg` | 740×578 그대로, 99KB | https://museum.seoul.go.kr/upload/bbs/2022/12/12/2fb2fff6-510e-45b2-8f32-894409038707.jpg | 여섯째 카드 / 서울올림픽 엠블럼과 오륜이 새겨진 금속 성화봉 |

- [도성대지도 공식 전시물 소개](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1182&seq=20221208151226671&sso=ok): 18세기 한양 지도. 별도 아카이브의 같은 유물에 다른 이용조건 표기가 있으므로 그 조건을 이 촬영본에 전용하지 않음.
- [전차 381호 공식 소개](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1126&seq=20140421080000069&sso=ok): 1930–1968년 운행, 야외전시 안내. 약 11MB 원본을 비율 유지 축소·JPEG 압축하여 사용.
- [서초삼호아파트 공식 전시물 소개](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1182&seq=20221212151530130&sso=ok): 수집 내장재·기증 가구와 일부 보완 자료로 재현한 공간. ‘1980년대 생활 · 재현 전시’라고 표기하며 단일 원형 유물로 설명하지 않음.
- [서유견문 공식 전시물 소개](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1182&seq=20221212103738699&sso=ok): 유길준의 서양 문물·제도 기록. ‘개항기 · 서적’으로 표기하고 미확인 판본·발행일은 추가하지 않음.
- [경성전차안내 공식 전시물 소개](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1182&seq=20221212133847472&sso=ok): 전차·버스 노선과 명소를 담은 안내서. 원문에서 설명한 식민 지배 정당화의 맥락을 카드 설명에도 유지.
- [1988, 올림픽과 서울 공식 전시물 소개](https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1182&seq=20221212151650918&sso=ok): 원문의 성화봉 사진 사용. 카드 제목 ‘서울올림픽 성화봉’은 사진 속 대상을 명확히 하기 위한 편집이며 원문 페이지명과 구별. 미확인 제작자·치수 정보 없음.
- 추가 세 이미지는 공식 원본 그대로 저장. AI 이미지 생성 없음. 순서는 지도 → 책 → 전차 → 안내서 → 주거 재현 → 올림픽으로 구성하며 엄밀한 연대표로 표방하지 않음.
- 개별 촬영본의 이용허락 유형은 **needs-check**. 공식 사이트 공통 푸터의 공공누리 링크만으로 각 이미지의 유형을 확정하지 않음. 현재는 로컬 시안 적용이며 공개 배포 전 해당 촬영본의 조건 확인 필요.
- 공식 전시 안내 등재와 이미지 상태를 확인한 것으로, 방문 당일의 전시 운영 여부를 검증한 것은 아님.

## 다운로드 메모

최초 제한된 셸에서 DNS 조회가 실패했으나 승인된 네트워크 접근으로 공식 원본 다운로드 완료. 아카이브 상세는 `upperNodeId=CTGRY812`가 있어야 개별 사진 기록이 표시되어 출처 URL에 해당 매개변수를 보존.

## 소장자료 추가 — 조선풍속 엽서 000029 · 000028 (2026-10-25)

공식 기록의 `fullViewPath`에서 원본을 확인하여 다운로드. 검색 도구에서는 cache miss가 발생했으나 공식 페이지 직접 요청은 정상 응답. 아래 두 이미지 모두 원문에서 공공누리 제2유형(출처표시·상업적 이용금지)을 확인. 전체 비율·색·가장자리를 유지하고 높이 1200px로 축소한 WebP 사용.

| 파일 | 원본 → 사용 크기 | 원본 URL | 적용·대체 텍스트 |
|---|---|---|---|
| `src/assets/images/joseon-postcard-000029.webp` | 1047×1640 → 766×1200, 238KB | https://museum.seoul.go.kr/_repo/image/2026/07/7868d837-0dfe-4439-87e1-fb0d4b956cd6.png | 소장자료 두 번째 / 널뛰기하는 여성들과 이를 구경하는 아이들이 담긴 조선풍속 엽서 |
| `src/assets/images/joseon-postcard-000028.webp` | 1052×1640 → 770×1200, 329KB | https://museum.seoul.go.kr/_repo/image/2026/07/66e70f29-6ecd-4d78-b463-e8b5127a9908.png | 소장자료 세 번째 / 실내에서 한복을 입고 있는 여성이 담긴 조선풍속 엽서 |

- [000029 공식 기록](https://museum.seoul.go.kr/archive/archiveNew/NR_relicView.do?mcsjgbnc=PS01003026018&mcseqno1=000029&mcseqno2=00000&cdLanguage=KOR): 일제강점기, 널뛰기하는 여자와 구경하는 아이들.
- [000028 공식 기록](https://museum.seoul.go.kr/archive/archiveNew/NR_relicView.do?mcsjgbnc=PS01003026018&mcseqno1=000028&mcseqno2=00000&cdLanguage=KOR): 일제강점기, 실내에서 한복을 입고 있는 여자.
- 세 점은 `src/data/home.ts`의 `collections`에서 관리하며 모든 항목에 소장처·이용조건·공식 기록 링크 표시. 기존 000030도 같은 섹션에 편입. AI 생성 이미지 없음.

## 소장자료 6점 확장 — 추가 000027·000026·000025 (2026-10-25)

공식 기록의 설명·원본 `fullViewPath`·공공누리 제2유형을 각각 직접 확인. 기존 세 점 뒤에 추가하며, 소장처는 서울우리소리박물관. 원비율·색·테두리를 유지해 긴 변 1200px WebP로 변환.

| 파일 | 원본 → 사용 크기 | 원본 URL | 화면 설명 |
|---|---|---|---|
| `joseon-postcard-000027.webp` | 1055×1654 → 765×1200 / 331KB | https://museum.seoul.go.kr/_repo/image/2026/07/b62bf21b-0d49-432f-8e18-e4e40b906faa.png | 한복을 입은 여성들 |
| `joseon-postcard-000026.webp` | 1052×1643 → 768×1200 / 280KB | https://museum.seoul.go.kr/_repo/image/2026/07/f932e6cf-c2d7-4a1d-ac5a-38790c4df310.png | 엽서 속 한복 차림 |
| `joseon-postcard-000025.webp` | 1064×1660 → 769×1200 / 182KB | https://museum.seoul.go.kr/_repo/image/2026/07/84140d29-08ae-42f5-9e35-bc3c9aa89ea7.png | 줄타기와 악기 연주 |

공식 기록: [000027](https://museum.seoul.go.kr/archive/archiveNew/NR_relicView.do?mcsjgbnc=PS01003026018&mcseqno1=000027&mcseqno2=00000&cdLanguage=KOR) / [000026](https://museum.seoul.go.kr/archive/archiveNew/NR_relicView.do?mcsjgbnc=PS01003026018&mcseqno1=000026&mcseqno2=00000&cdLanguage=KOR) / [000025](https://museum.seoul.go.kr/archive/archiveNew/NR_relicView.do?mcsjgbnc=PS01003026018&mcseqno1=000025&mcseqno2=00000&cdLanguage=KOR).

각 카드에 출처·이용조건·자료 번호와 원문 링크 제공. 대체 텍스트는 `collections` 데이터에 기록. 추가 생성 이미지 없음.


## 현재 적용 — 자료군별 대표 기록 6점 (2026-10-25)

앞선 엽서 6점 구성은 이 구성으로 대체. 000030은 소장유물의 사례 1점으로 유지하고, 000029–000025는 현재 화면에서 사용하지 않음. 파일과 이전 확인 내역은 보존.

공식 분류 근거: https://museum.seoul.go.kr/archive/NR_index.do . 전체 아카이브에는 아래 여섯 자료군 외에도 서울미래유산기록·주요유물소개가 있으며, 화면을 전체 분류표로 표방하지 않음.

새 이미지 5점은 각각 상세 페이지에 명시된 공공누리 제1유형(출처표시)을 확인. 아래는 소장자료 섹션 02–06에 순서대로 적용. 원비율·색·테두리 보존, 긴 변 최대 1200px WebP. 생성·스톡 이미지 없음.

| 파일 | 원본 → 사용 크기 | 자료군 / 자료명 / 시기 | 원본 이미지 | 공식 기록 |
|---|---|---|---|---|
| `src/assets/images/archive-map.webp` | 6671×5000 → 1200×900 | 서울지도 / 경성부근지도 / 1900년 | https://museum.seoul.go.kr:8088/ARCHIVE_DATA/1098/7fddcb32-cb25-4abe-86a8-67a6d30390b4.jpg | https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY780&upperNodeId=CTGRY780&fileSn=1098&fileId=6279af91-be6d-4ddf-b8d1-30acd687347d&type=C |
| `src/assets/images/archive-photo.webp` | 3600×2705 → 1200×901 | 근현대서울사진 / 동대문 문루에서 바라본 종로 / 1911년 | https://museum.seoul.go.kr:8088/ARCHIVE_DATA/master/1011/A000000247/66c48c4a-3764-4780-a3ae-463d1a79c09b.jpg | https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY804&upperNodeId=CTGRY804&fileSn=300&fileId=H-TRNS-74779-804&type=D |
| `src/assets/images/archive-city.webp` | 296×222 → 296×222 | 서울시정사진 / 시민들이 참여한 도로 포장 공사모습 / 1961-04-08 | https://museum.seoul.go.kr:8088/ARCHIVE_DATA/master/SJ1065.jpg | https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY724&upperNodeId=CTGRY724&fileSn=300&fileId=H-TRNS-2328-724&type=B |
| `src/assets/images/archive-excavation.webp` | 5760×3840 → 1200×800 | 서울발굴기록 / 2019년 조사 후 / 2019년 | https://museum.seoul.go.kr:8088/ARCHIVE_DATA/master/1011/A000000337/ffc1c734-d3d6-49ef-ba97-2c5fd7bed403.jpg | https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY919&upperNodeId=CTGRY919&fileSn=400&fileId=H-TRNS-103913-919&type=E |
| `src/assets/images/archive-life.webp` | 2260×2561 → 1059×1200 | 서울생활문화자료조사 / 1930년대 이후 가회동 30-2번지 가옥 추정 도면 / 2018년 조사자료 | https://museum.seoul.go.kr:8088/ARCHIVE_DATA/master/1011/A000000271/bc3ab7e6-3f5a-48ce-950b-ad58210647b5.jpg | https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY301&upperNodeId=CTGRY301&fileSn=300&fileId=H-TRNS-99845-301&type=A |

- 시정 사진은 원본 다운로드 엔드포인트에서도 296×222로 확인. 확대·보간하지 않고 원본 크기 이하로 표시.
- 가옥 도면의 ‘1930년대 이후’는 연구 대상 시기이며 공식 기록의 자료 시기는 2018년. 화면에 ‘2018년 조사자료 · 북촌’ 명시.
- 대체 텍스트: 지도—한성부 영역의 산과 하천, 지명을 표시한 경성부근지도 / 근현대사진—동대문에서 종로 안쪽으로 이어지는 전차 선로와 시가지 / 시정사진—거리에서 돌을 고르고 도로 포장 공사에 참여하는 시민들 / 발굴—건물 터와 우물지가 드러난 의정부지 발굴 현장을 위에서 본 사진 / 생활문화—안채와 사랑채 등 가회동 30-2번지 가옥의 공간 배치를 추정한 도면.


## 태화관 전시·통합 박물관 소개 (2026-10-25)

| 파일 | 원본 → 사용 크기 | 원본 URL | 적용 섹션 / 대체 텍스트 |
|---|---|---|---|
| `src/assets/images/taehwagwan-2026.jpg` | 3543×5315 → 920×1380, 120KB | https://museum.seoul.go.kr/upload/bbs/2026/6/23/f4d8d1e7-02b8-42e6-a951-bcdad9397b5d.jpg | 기획전시 03 / 태화관 시간을 잇는 공간 기획전시 포스터 |
| `src/assets/images/museum-exterior.webp` | 1200×420 → 동일 크기, 140KB | https://news.seoul.go.kr/culture/files/2012/02/673a9f1b81a2e6.46155955.png | 박물관 소개 왼쪽 / 소나무 너머로 보이는 서울역사박물관 본관 입구 |

- 태화관 공식 상세: https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1002&seq=20260623170800431&sso=ok . 상세 기간은 2026-06-26~2027-03-07, 포스터는 2026-06-27~2027-03-07로 다름. 상세 기간을 본문 기준으로 삼고 차이를 작은 주석으로 알림. 장소는 공평도시유적전시관 기획전시실이며 본관과 구분.
- 본관 사진 출처: 서울시 공식 소개 https://news.seoul.go.kr/culture/archives/91?listPage=1 . 박물관 안내도에서 확인한 171px 실내 썸네일은 품질과 내용이 적합하지 않아 사용하지 않고 서울시 제공 전경 사진을 채택. 새 촬영 사진이라고 표방하지 않음.
- 두 이미지 모두 원비율·전체 프레임 유지. 포스터는 축소·JPEG 압축, 전경은 WebP 변환만 적용. AI 생성 없음.
- 화면에 각 제공처 표시. 개별 이미지의 이용허락 유형은 needs-check이며 공통 푸터 표기를 해당 촬영본의 라이선스로 간주하지 않음. 현재 로컬 포트폴리오 시안용. 공개 배포 전 개별 조건 확인.


## 와이드 박물관 소개 — 교육·행사 이미지 (2026-10-25)

| 파일 | 원본 → 사용 크기 | 원본 URL | 공식 게시물 / 적용 |
|---|---|---|---|
| `src/assets/images/about-education.webp` | 891×1260 → 849×1200 | https://museum.seoul.go.kr/upload/bbs/2026/9/29/bc719f37-3bfb-43b6-811d-1f59f8231cfd.jpg | https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1005&seq=20260929132812249&sso=ok / 교육 프로그램 항목 |
| `src/assets/images/about-event.webp` | 300×400 → 동일 크기 | https://museum.seoul.go.kr/upload/ckeditor/2026/10/4/720efaad-d5d6-4da6-bd9a-d46a3b9d78e6.jpg | https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1018&seq=20260930083150125&sso=ok / 행사·소식 항목 |

- 원본 비율·색·내용 보존, 축소와 WebP 변환만 수행. 스톡·생성 이미지 없음. 낮은 해상도의 행사 포스터는 scale-down으로 확대하지 않음.
- 교육 사례: ‘내 인생의 18번, 시대의 명곡이 되다’ / 행사 사례: ‘제33회 백인제가옥 북촌음악회 정취’. 현재 진행 또는 모집 상태를 보증하지 않으며 일정·목록 링크 제공.
- 각 원본의 개별 공공누리 유형은 needs-check. 공식 제공 출처는 위 표에 기록. 공개 배포 전 개별 이용조건 확인.
- 본관 전경과 ‘동대문 문루에서 바라본 종로’는 앞서 기록한 공식 이미지 재사용. 아카이브 사진은 공공누리 제1유형.
