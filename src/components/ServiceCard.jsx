import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatUsd, formatVnd, fromPrice } from '../data/services'
import { IconArrow, IconClock } from './Icons'
import Img from './Img'

/** clamp: cắt mô tả còn 3 dòng (dùng ở trang chủ). Trang dịch vụ hiện đầy đủ. */
export default function ServiceCard({ service, clamp = true }) {
  const { t } = useTranslation()
  const min = fromPrice(service)
  const durations = service.prices.filter((p) => p.vnd != null).map((p) => p.min)

  return (
    <article className="card group flex h-full flex-col">
      <div className="relative aspect-4/3 overflow-hidden">
        <Img
          src={service.image}
          alt={t(`services_list.${service.id}.name`)}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
        {durations.length > 0 && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-ink-700 backdrop-blur-sm">
            <IconClock size={13} />
            {durations.join(' / ')} {t('common.min')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-snug font-semibold text-ink-800">
          {t(`services_list.${service.id}.name`)}
        </h3>
        <p
          className={`mt-2 flex-1 text-sm leading-relaxed text-ink-500 ${clamp ? 'line-clamp-3' : ''}`}
        >
          {t(`services_list.${service.id}.desc`)}
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-ink-900/8 pt-4">
          <div>
            <p className="text-[11px] tracking-wide text-ink-300 uppercase">{t('common.from')}</p>
            <p className="font-display text-xl font-semibold text-clay-600">
              {formatVnd(min?.vnd)}
              <span className="ml-1.5 text-xs font-normal text-ink-300">
                ({formatUsd(min?.usd)})
              </span>
            </p>
          </div>
          <Link
            to={`/dat-lich?service=${service.id}`}
            aria-label={`${t('services.bookThis')} — ${t(`services_list.${service.id}.name`)}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-clay-50 text-clay-600 transition group-hover:bg-clay-500 group-hover:text-white"
          >
            <IconArrow size={18} />
          </Link>
        </div>
      </div>
    </article>
  )
}
