import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatUsd, formatVnd, fromPrice, isDiscountable, ONLINE_DISCOUNT } from '../data/services'
import { IconArrow, IconClock } from './Icons'
import Img from './Img'

/** clamp: cắt mô tả còn 3 dòng (dùng ở trang chủ). Trang dịch vụ hiện đầy đủ. */
export default function ServiceCard({ service, clamp = true }) {
  const { t } = useTranslation()
  const min = fromPrice(service)
  const durations = service.prices.filter((p) => p.vnd != null).map((p) => p.min)
  const hasOffer = isDiscountable(service, min?.min)

  return (
    // Cả thẻ là một link: trước đây chỉ nút mũi tên 40×40 bấm được,
    // bấm vào ảnh hay tiêu đề đều không có tác dụng.
    <Link
      to={`/dat-lich?service=${service.id}`}
      aria-label={`${t('services.bookThis')} — ${t(`services_list.${service.id}.name`)}`}
      className="card group flex h-full flex-col"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Img
          src={service.image}
          alt={t(`services_list.${service.id}.name`)}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/55 to-transparent" />

        {/* Nhắc ưu đãi ngay trên ảnh — bảng giá vẫn niêm yết giá gốc */}
        {hasOffer && (
          <span className="absolute top-3 right-3 rounded-full bg-clay-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            −{ONLINE_DISCOUNT * 100}%
          </span>
        )}

        {durations.length > 0 && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink-700 backdrop-blur-sm">
            <IconClock size={13} />
            {durations.join(' / ')} {t('common.min')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl leading-snug font-semibold text-ink-800 transition-colors group-hover:text-clay-700">
          {t(`services_list.${service.id}.name`)}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed text-ink-500 ${clamp ? 'line-clamp-3' : ''}`}>
          {t(`services_list.${service.id}.desc`)}
        </p>

        {/* Điều kiện riêng của gói trẻ em */}
        {service.maxHeightCm && (
          <p className="mt-3 rounded-xl bg-clay-50 px-3 py-2 text-xs leading-relaxed text-clay-700">
            {t('services.kidsHeight')}
          </p>
        )}

        {/* mt-auto đẩy chân thẻ xuống đáy, thay cho div spacer rỗng trước đây */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="min-w-0">
            <p className="text-[11px] tracking-wide text-ink-300 uppercase">{t('common.from')}</p>
            <p className="mt-0.5 font-display text-2xl leading-none font-semibold text-clay-600">
              {formatVnd(min?.vnd)}
              <span className="ml-1.5 text-xs font-normal text-ink-300">
                {formatUsd(min?.usd)}
              </span>
            </p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600 transition-colors duration-300 group-hover:bg-clay-500 group-hover:text-white">
            <IconArrow size={18} />
          </span>
        </div>
      </div>
    </Link>
  )
}
