import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import mapLight from '../assets/images/maps/museum-access-light-cutout.webp'
import mapDark from '../assets/images/maps/museum-access-dark-cutout.webp'
import './museum-visit.scss'

const officialGuide = 'https://museum.seoul.go.kr/www/guide/vis/infomation.jsp?sso=ok'
const directions = 'https://www.google.com/maps/search/?api=1&query=서울역사박물관'
const seoulDate = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date())

// Verified schedule: November 2026 has no Monday public-holiday exception.
// Do not extrapolate the dated extended-hours notice into an unverified period.
function getSchedule(date: string) {
  const day = new Date(`${date}T12:00:00+09:00`).getUTCDay()
  if (!date.startsWith('2026-11-')) return { kind: 'unknown' as const }
  if (day === 1) return { kind: 'closed' as const }
  return { kind: 'open' as const, end: day === 4 ? '18:00' : '21:00', admission: day === 4 ? '17:30' : '20:30' }
}

export function MuseumVisit({ date: previewDate }: { date?: string } = {}) {
  const { language, t } = useLanguage()
  const [today, setToday] = useState(seoulDate)
  useEffect(() => {
    const refresh = () => setToday(seoulDate())
    const interval = window.setInterval(refresh, 60_000)
    window.addEventListener('focus', refresh)
    return () => { clearInterval(interval); window.removeEventListener('focus', refresh) }
  }, [])
  const date = previewDate ?? today
  const hours = getSchedule(date)
  const dateLabel = new Intl.DateTimeFormat(language === 'ja' ? 'ja-JP' : 'ko-KR', { month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Asia/Seoul' }).format(new Date(`${date}T12:00:00+09:00`))
  return <div className="visit-study">
    <div className="visit-study-content">
    <section className="visit-study-location" aria-labelledby="study-location">
      <h3 id="study-location">{t('찾아오시는 길')}</h3>
      <div className="visit-study-address"><p>{t('서울역사박물관')}</p><address>{t('서울특별시 종로구 새문안로 55')}</address></div>
      <figure className="visit-study-map">
        <img className="study-map-light" src={mapLight} alt={t("서울역사박물관 약도: 경희궁과 새문안로, 서대문역과 광화문역 위치")} />
        <img className="study-map-dark" src={mapDark} alt={t("서울역사박물관 약도: 경희궁과 새문안로, 서대문역과 광화문역 위치")} />
      </figure>
      <a className="study-link" href={directions} target="_blank" rel="noreferrer">{t('오시는 길 보기')} <span aria-hidden="true">↗</span></a>
    </section>
    <section className="visit-study-hours" aria-labelledby="study-hours">
      <h3 id="study-hours">{t('오늘의 관람시간')}</h3>
      <div className="study-today" key={date} aria-live="polite" aria-atomic="true">
        {hours.kind === 'open' ? <>
          <div className="study-time-group">
            <time className="study-opening-date" dateTime={date}>{dateLabel}</time>
            <p className="study-time"><span>09:00</span><span className="study-time-dash">—</span><span>{hours.end}</span></p>
            <div className="study-time-notes">
              <p className="study-admission">{t('입장 마감')} <strong>{hours.admission}</strong></p>
            </div>
          </div>
        </> : hours.kind === 'closed' ? <>
          <p className="study-status">{t('매주 월요일은 정기 휴관일입니다')}</p>
          <p className="study-closed">{t('오늘은 휴관')}</p>
          <time className="study-state-date" dateTime={date}>{dateLabel}</time>
          <p className="study-admission">{t('다음 관람일')} <strong>{t('내일 09:00부터')}</strong></p>
        </> : <>
          <p className="study-closed">{t('운영시간 확인')}</p>
          <time className="study-state-date" dateTime={date}>{dateLabel}</time>
          <p className="study-admission">{t('공식 관람안내에서 해당 날짜를 확인해 주세요')}</p>
        </>}
      </div>
      <div className="study-support"><dl><div><dt>{t('관람료')}</dt><dd>{t('무료')}</dd></div><div><dt>{t('정기 휴관')}</dt><dd>{t('월요일 · 1월 1일')}<small>{t('월요일이 공휴일이면 개관')}</small></dd></div></dl>
      </div>
      <a className="study-link" href={officialGuide} target="_blank" rel="noreferrer">{t('최신 관람안내 확인')} <span aria-hidden="true">↗</span></a>
    </section>
    </div>
  </div>
}
