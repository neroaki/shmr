# 소장자료 12점 · 출처 및 자산 기록

확인일: 2026-10-28. 서울역사아카이브의 보물·서울시지정문화유산·월간서울유산 목록과 각 상세 본문을 직접 확인했다. 화면 설명은 공식 본문을 짧게 재작성했다.

이미지: 사용자가 제공한 WebP 원본을 변경 없이 `src/assets/images/collection/`에 복사. 영문 소문자 파일명과 정적 import 사용. Vite가 배포 시 해시 경로를 생성하므로 Desktop/outputs 경로에 의존하지 않는다. 원본의 비율과 색상 유지, CSS contain으로 전체 피사체 표시.

| 프로젝트 파일 | 제공 원본 파일 | 공식 상세 출처 | 적용 위치 |
|---|---|---|---|
| `bulanggi.webp` | 보물_불랑기자포.webp | [불랑기자포](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000068) | 소장자료 그리드·확장 상세 |
| `yeonggajip.webp` | 보물_선종영가집.webp | [선종영가집](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000041) | 소장자료 그리드·확장 상세 |
| `hanho.webp` | 보물_한호필적.webp | [한호 필적 — 석봉한호해서첩](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000037) | 소장자료 그리드·확장 상세 |
| `victrola.webp` | 월간서울유산_빅터오소포닉빅트룰라축음기.webp | [빅터 오소포닉 빅트롤라 축음기](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1026&seq=20221116152259146) | 소장자료 그리드·확장 상세 |
| `stereoscope.webp` | 월간서울유산_입체경.webp | [입체경](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1026&seq=20170913094804403) | 소장자료 그리드·확장 상세 |
| `sutra-chest.webp` | 지정_대장경궤.webp | [대장경궤](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20260721170139066) | 소장자료 그리드·확장 상세 |
| `ryu-sunjeong.webp` | 지정_류순정영정.webp | [류순정영정](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000029) | 소장자료 그리드·확장 상세 |
| `ryu-hong.webp` | 지정_류홍영정.webp | [류홍영정](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000028) | 소장자료 그리드·확장 상세 |
| `landscape-jar.webp` | 지정_백자청화산수문호.webp | [백자청화산수문호](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000038) | 소장자료 그리드·확장 상세 |
| `military-chest.webp` | 지정_진위대군안궤.webp | [진위대 군안궤](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20180604130706045) | 소장자료 그리드·확장 상세 |
| `copper-jar.webp` | 지정_백자동화원형문각호.webp | [백자동화원형문각호](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000052) | 소장자료 그리드·확장 상세 |
| `surangama.webp` | 보물_대불정여래밀인수증료의제보살만행수능엄경.webp | [대불정여래밀인수증료의제보살만행수능엄경 (언해) 권4·7·8](https://museum.seoul.go.kr/archive/archiveNew/NR_mainRelicView.do?bbsCd=1126&seq=20140421080000048) | 소장자료 그리드·확장 상세 |

- 능엄경: 동일한 이름의 보물 제1603호(2책)와 구별. 첨부한 3책 사진은 보물 제973호 언해본 권4·7·8, 서7564로 연결.
- 축음기: 공식 상세 페이지 상단은 서45874, 본문은 서45847로 상충. 화면에 유물번호를 노출하지 않음. ‘빅트룰라’ 파일명을 공식 표기 ‘빅트롤라’로 정리.
- 진위대 군안궤의 1900~1907년은 제작 확정연도가 아니라 공식 본문의 사용 시기 추정임을 유지.
- 대장경궤의 제작 연도는 특정하지 않고 조선으로 표기.

## 화면 동작

소장자료: 중앙 제목 → 진입 후 1.4초 또는 추가 스크롤에 왼쪽 패널로 이동(본문 이동 800ms, 글자와 부속 문구의 시차 모션까지 약 1030ms). 4열×3행 12개 이미지는 처음에 숨기고, 제목의 왼쪽 패널 이동 완료 후 100ms부터 90ms 간격으로 랜덤 순차 등장(각 카드 1150ms). 재진입할 때 등장 순서만 다시 섞으며 그리드 위치는 유지. 카드에 850ms 머무르거나 클릭하면 카드 자체가 확장. Escape, 닫기 버튼 또는 카드 바깥 클릭으로 복귀. 원본 이미지는 편집하지 않음.

Pinterest 영상은 재생 불가. 사용자의 첨부 이미지와 명시한 단계가 구현 근거이며 영상 0:06을 직접 재생했다고 주장하지 않음.
