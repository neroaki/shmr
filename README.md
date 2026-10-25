# 서울역사박물관 리뉴얼

React · TypeScript · Vite · SCSS 기반의 디자인 포트폴리오. 현재는 메인 페이지 1차 구현입니다.

```bash
npm install
npm run dev
```

검증: `npm run build`, `npm run lint`.

- 페이지: `src/pages/Home.tsx`
- 첫 가로 전시품 섹션: `src/components/ExhibitHighlights.tsx`
- 기획전시: `src/components/ExhibitionProgramme.tsx`
- 소장자료: `src/components/CollectionArchive.tsx`
- 박물관 소개·방문·교육·자료·행사 안내: `src/components/MuseumAbout.tsx`
- 이미지·카피·공식 링크: `src/data/home.ts`
- 공통 디자인 값: `src/styles/_tokens.scss`
- [구현 범위·디자인 조정·검증](docs/implementation.md)
- [이미지 출처·이용 조건](docs/image-sources.md)

메뉴는 현재 메인 섹션으로 이동하며 상세 안내는 공식 사이트로 연결됩니다. 인트로 다음에는 주요 전시품 개요 1장과 전시품 6장이 하나의 호라이즌탈 구간에서 차례로 겹쳐집니다. 모바일·낮은 화면에서도 세로 목록으로 바꾸지 않습니다. 마지막 전시품을 지난 뒤 다음 세로 섹션으로 이어집니다. 기획전시 다음의 소장자료도 화면에 고정되며 자료군 소개 영역 옆으로 유물·지도·근현대사진·시정사진·발굴기록·생활문화 조사자료의 대표 이미지 여섯 장이 가로 이동합니다. 기획전시는 태화관을 포함한 3건입니다. 박물관 소개는 중앙 전경과 이미지 우측 하단 제목, 네 가장자리의 안내 메뉴로 구성합니다. 방문·교육·아카이브·행사 안내가 각 가장자리 방향에서 포개지며, 진입과 역방향 이탈 모두 부드럽게 연결됩니다. 페이지 스크롤과 가로 섹션의 마지막 전환은 완만하게 이어집니다. 서브페이지·추가 인터랙션·DB는 이후 단계입니다. 공식 운영 사이트가 아닙니다.

01–04 사이의 세 경계에는 PC 화면 높이에 따라 200–300px의 여백을 둡니다. 경계 직전에 스크롤을 멈추면 최대48px 안에서 짧게 정렬하고, 새 입력이 오면 바로 풀립니다. 푸터 앞 여백도 유지합니다.
