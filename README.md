# 서울역사박물관 리뉴얼

React · TypeScript · Vite · SCSS 기반의 디자인 포트폴리오입니다. PC 화면의 이미지, 타이포그래피와 스크롤 경험을 중심으로 제작한 단일 페이지이며, 공식 운영 사이트가 아닙니다.

## 실행과 검증

Node.js 24 환경에서 확인했습니다. 테스트는 Node의 TypeScript 실행 지원을 사용합니다.

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm test
npm run build
npm run preview
```

`build`는 TypeScript 검사와 배포용 빌드를 함께 실행하며 결과는 `dist/`에 생성됩니다. Vercel은 Vite 프리셋을 사용합니다. 현재 실행에는 환경 변수나 데이터베이스 연결이 필요하지 않습니다.

## 현재 화면 구성

- 히어로: 전체 화면 사진이 정착하는 인트로와 타이틀 모션
- 주요 전시품: 개요와 전시품 4점, 왼쪽 목록을 유지하는 가로 패널
- 기획전시·프로그램: 포스터 5개와 카드에서 확장되는 상세 화면
- 소장자료: 초상화 2점을 포함한 유물 10점의 그리드와 상세 화면
- 박물관 소개: 전경 이미지와 네 방향의 방문·교육·아카이브·행사 안내

섹션 사이에는 50vh 여백을 사용합니다. 테마는 페이지를 열 때 라이트로 시작하며, 한국어·일본어 전환을 제공합니다. 상세 안내와 예약은 공식 사이트로 연결됩니다. 모바일 전용 화면과 백엔드는 현재 범위에 포함하지 않습니다.

## 코드 구성

| 위치 | 책임 |
| --- | --- |
| `src/pages/Home.tsx` | 메인 페이지와 섹션 순서 |
| `src/components/` | 화면 구성, 공통 상세 화면, 테마·언어 UI |
| `src/components/collection/`, `programme/` | 각 자료 유형의 카드 표현 |
| `src/hooks/useCardIntent.ts` | 카드 호버 대기, 선택, 닫은 뒤 재열림 방지 |
| `src/hooks/useInlineCardDialog.ts` | 상세 화면의 포커스, Esc·바깥 클릭, 스크롤 잠금 |
| `src/hooks/useDetailTextFit.ts` | 상세 텍스트가 화면 안에 들어오도록 배율 조정 |
| `src/hooks/useHighlightsScene.ts` | 주요 전시품의 스크롤 측정과 패널 전환 |
| `src/hooks/`의 나머지 파일 | 히어로·그리드·박물관 소개의 개별 모션 |
| `src/lib/` | 스크롤 계산, 섹션 정렬, 배경 dim 처리 |
| `src/data/` | 화면에 사용하는 자료, 이미지 경로, 공식 링크 |
| `src/data/reference/` | 현재 화면에서 사용하지 않는 조사 후보 보존 |
| `src/i18n/` | 언어 상태와 일본어 번역 |
| `src/styles/` | 색상·타이포·공통 레이아웃 토큰 |
| `tests/` | 가로 스크롤 계산의 경계값·역산 검증 |

컴포넌트별 SCSS는 해당 컴포넌트 옆에 둡니다. 공통 디자인 값은 `src/styles/_tokens.scss`, 타이포그래피 역할은 `src/styles/_typography.scss`에서 관리합니다. 조사 후보 파일은 실행 코드에서 가져오지 않아 사용하지 않는 이미지가 배포 번들에 포함되지 않도록 합니다.

원본 이미지, 누끼 마스크와 제작 기록은 복원·재작업을 위해 보존합니다. 숨겨 둔 주요 전시품 조작바도 요청에 따라 JSX 주석으로 남겨 두었습니다.

- [구현 이력](docs/implementation.md)
- [이미지 출처 기록](docs/image-sources.md)

위 문서는 시점별 제작 기록을 포함합니다. 현재 항목 수와 실행 구조는 이 README 및 실행 코드를 기준으로 확인합니다.
