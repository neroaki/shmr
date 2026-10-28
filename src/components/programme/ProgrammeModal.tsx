import type { ProgrammeCard } from '../../data/programme-candidates'
import { InlineCardDetail } from '../InlineCardDetail'

interface Props { item: ProgrammeCard; active: boolean; onClose: () => void }

export function ProgrammeModal({ item, active, onClose }: Props) {
  return <InlineCardDetail active={active} onClose={onClose} titleId={`programme-title-${item.id}`}
    descriptionId={`programme-description-${item.id}`} category={item.category} title={item.title}
    description={item.description} fields={[
      { label: '기간', value: item.dates },
      ...(item.time ? [{ label: '시간', value: item.time }] : []),
      { label: '장소', value: item.place },
      ...(item.audience ? [{ label: '대상', value: item.audience }] : []),
    ]} notes={[item.dateNote, item.imageNote].filter((note): note is string => !!note)}
    source={item.source} cta={item.cta} credit="서울역사박물관 제공" />
}
