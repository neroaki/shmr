import { useLanguage } from '../i18n/LanguageContext'
import type { CSSProperties } from 'react'
import { useHighlightsScene } from '../hooks/useHighlightsScene'
import { highlights } from '../data/home'
import './exhibit-highlights.scss'

export function ExhibitHighlights() {
  const { t } = useLanguage()
  const { sequenceRef, sceneRef, stageRef, toolbarRef, goToRef } = useHighlightsScene()

  return (
    <section className="highlights" id="featured" aria-labelledby="highlights-title">
      <div className="highlights-sequence" ref={sequenceRef}>
        <div className="highlights-scene" ref={sceneRef}>
          <div className="highlights-toolbar" ref={toolbarRef}>
            {/* Controls retained for restoration; the toolbar preserves the title's position.
            To restore, also destructure countRef, previousRef, nextRef and moveRef from useHighlightsScene.
            <div className="highlights-navigation">
              <span className="highlights-count" ref={countRef}>{t('전체')} {highlights.length}{t('점')}</span>
              <button className="highlights-list-button" type="button" aria-label={t("주요 전시품 목록으로 돌아가기")} onClick={event => goToRef.current(0, event.detail === 0)}>{t("목록")} <span aria-hidden="true">↖</span></button>
              <div className="highlights-buttons">
                <button type="button" ref={previousRef} aria-label={t("이전 전시품")} onClick={() => moveRef.current(-1)}>←</button>
                <button type="button" ref={nextRef} aria-label={t("다음 전시품")} onClick={() => moveRef.current(1)}>→</button>
              </div>
              <a className="highlights-skip" href="#exhibitions">{t("기획전시·프로그램으로 이동")} <span aria-hidden="true">↓</span></a>
            </div>
            */}
          </div>
          <div className="highlights-stage" ref={stageRef}>
            <header className="highlights-panel highlights-overview" style={{ '--exhibit-layer': 0 } as CSSProperties}>
              <div className="highlights-overview-heading">
                <h2 id="highlights-title" tabIndex={-1}>{t("주요 전시품")}</h2>
              </div>
              <div className="highlights-overview-body">
                <div className="highlights-overview-copy">
                  <p>{t("지도와 책, 도시의 기록에서")}<br />{t("서울의 변화를 살펴보세요")}</p>
                  <p>{t("한양의 지도와 새로운 문물을 담은 책, 전차 안내서와 올림픽 성화봉까지 네 점을 소개합니다")}</p>
                </div>
                <ol className="highlights-index" aria-label={t("주요 전시품 목록")}>
                  {highlights.map((item, index) => (
                    <li key={item.id}>
                      <button type="button" aria-controls={`exhibit-${item.id}`} onClick={event => goToRef.current(index + 1, event.detail === 0)}>
                        <span className="highlights-index-number">{item.number}</span>
                        <span>{t(item.title)}<small>{t(item.category)}</small></span>
                        <span aria-hidden="true">↗</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </header>

            <div className="highlights-viewport">
              {highlights.map((item, index) => (
              <section className="highlights-panel exhibit-panel" id={`exhibit-${item.id}`} aria-labelledby={`exhibit-title-${item.id}`} key={item.id} style={{
                '--exhibit-image-width': `${item.displayWidth}px`,
                '--exhibit-image-height': `${item.displayWidth * item.height / item.width}px`,
                '--exhibit-image-ratio': `${item.width} / ${item.height}`,
                '--exhibit-layer': index + 1,
              } as CSSProperties}>
                <div className="exhibit-panel-body">
                  <div className="exhibit-panel-image">
                    <img src={item.image} alt={t(item.alt)} width={item.width} height={item.height} loading="lazy" decoding="async" />
                  </div>
                  <div className="exhibit-panel-copy">
                    <p className="eyebrow">{t(item.category)}</p>
                    <h3 id={`exhibit-title-${item.id}`} tabIndex={-1}>{t(item.title)}</h3>
                    <p className="exhibit-panel-description">{t(item.description)}</p>
                    <p className="exhibit-panel-credit">{t("서울역사박물관 제공")}</p>
                    <a className="text-link" href={item.source} aria-label={`${t(item.title)} ${t('공식 전시물 설명 보기')}`}>{t("전시물 설명 보기")} <span aria-hidden="true">↗</span></a>
                  </div>
                </div>
              </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
