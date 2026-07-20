import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import { IconStar, IconGoogle, IconArrow } from './Icons'

/** Khối đánh giá Google — bấm vào là chuyển sang trang đánh giá trên Google. */
export default function GoogleReview({ compact = false }) {
  const { t } = useTranslation()
  const { rating, count, reviewUrl } = site.google

  return (
    <a
      href={reviewUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={`group flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-ink-900/8 transition hover:shadow-xl ${
        compact ? '' : 'sm:gap-6 sm:p-6'
      }`}
    >
      <IconGoogle size={compact ? 32 : 40} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
          {t('review.title')}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-display text-3xl leading-none font-semibold text-ink-800">
            {rating.toFixed(1)}
          </span>
          <span className="flex text-gold" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <IconStar key={i} size={16} filled={i < Math.round(rating)} />
            ))}
          </span>
        </div>
        <p className="mt-1 truncate text-xs text-ink-500">
          {t('review.basedOn', { count })}
        </p>
      </div>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600 transition group-hover:bg-clay-500 group-hover:text-white">
        <IconArrow size={18} />
      </span>
    </a>
  )
}
