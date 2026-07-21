import { useTranslation } from 'react-i18next'
import { IconCheck, IconStar, IconArrow } from './Icons'

/**
 * Dải ưu đãi đặt phía trên form đặt lịch.
 * Cố tình giữ gọn: mồi câu 20% phải đập vào mắt ngay nhưng không được
 * đẩy form xuống quá sâu, phần thuyết phục dài để xuống dưới form.
 */
export function PromoBanner() {
  const { t } = useTranslation()

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-7 sm:px-9 sm:py-8">
      {/* Quầng sáng trang trí, không nhận sự kiện chuột */}
      <div
        className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-clay-500/25 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        {/* Con số ưu đãi */}
        <div className="flex shrink-0 items-center gap-5">
          <p className="flex items-start font-display leading-none font-semibold text-gold">
            <span className="text-6xl sm:text-7xl">20</span>
            <span className="mt-1 text-2xl sm:text-3xl">%</span>
          </p>
          <span className="hidden h-16 w-px bg-white/15 sm:block" aria-hidden />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-gold uppercase">
            {t('booking.promo.badge')}
          </p>
          <h2 className="mt-2 font-display text-2xl leading-snug font-semibold text-white sm:text-3xl">
            {t('booking.promo.title')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
            {t('booking.promo.lead')}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            {/* w-full trên mobile: đẩy nhãn xuống dòng riêng để 2 chip đứng cùng hàng */}
            <span className="w-full text-xs text-white/45 sm:w-auto">
              {t('booking.promo.exceptLabel')}:
            </span>
            {[t('booking.promo.except1'), t('booking.promo.except2')].map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Khối lợi ích + ưu đãi khách quay lại, đặt dưới form.
 * Khách nào cần đặt luôn thì đã thấy form ngay từ đầu; khách còn phân vân
 * mới cuộn xuống đọc tiếp rồi bấm nút quay lại form.
 */
export function BookingPerks() {
  const { t } = useTranslation()
  const reasons = [1, 2, 3, 4].map((n) => t(`booking.promo.why${n}`))

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Vì sao nên đặt trước */}
          <div className="rounded-3xl bg-cream p-7 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-ink-800">
              {t('booking.promo.whyTitle')}
            </h2>
            <span className="mt-4 block h-px w-12 bg-clay-500" />
            <ul className="mt-6 space-y-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-clay-500 text-white">
                    <IconCheck size={14} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ưu đãi khách quay lại */}
          <div className="flex flex-col rounded-3xl bg-cream p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-ink-800">
                {t('booking.promo.returnTitle')}
              </h2>
              <span className="shrink-0 rounded-full bg-clay-500 px-3 py-1.5 font-display text-lg leading-none font-semibold text-white">
                +10%
              </span>
            </div>
            <span className="mt-4 block h-px w-12 bg-clay-500" />

            <p className="mt-6 text-sm leading-relaxed text-ink-500">
              {t('booking.promo.returnLead')}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              {t('booking.promo.returnHow')}
            </p>

            <ul className="mt-4 space-y-2.5">
              {[t('booking.promo.returnReq1'), t('booking.promo.returnReq2')].map((req) => (
                <li
                  key={req}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm text-ink-800 ring-1 ring-ink-900/8"
                >
                  <IconStar size={16} className="shrink-0 text-gold" />
                  {req}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-ink-500">
              {t('booking.promo.returnResult')}
            </p>
          </div>
        </div>

        {/* Chốt lại: đưa khách trở lại form */}
        <div className="mt-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink-800">
            {t('booking.promo.ctaTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-500">
            {t('booking.promo.ctaSub')}
          </p>
          <a href="#booking-form" className="btn-primary mt-7 !px-8 !py-4">
            {t('common.bookNow')} <IconArrow size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
