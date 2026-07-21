import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { site } from '../data/site'
import {
  services,
  findService,
  formatVnd,
  formatUsd,
  isDiscountable,
  discountVnd,
  discountUsd,
  ONLINE_DISCOUNT,
} from '../data/services'
import PageHeader from '../components/PageHeader'
import Img from '../components/Img'
import { IconCheck, IconArrow, IconClock, IconCalendar } from '../components/Icons'
import { PromoBanner, BookingPerks } from '../components/BookingPromo'

const STEPS = ['step1', 'step2', 'step3', 'step4']

/** Khung giờ 30 phút, từ giờ mở cửa tới giờ đóng cửa. */
const buildSlots = () => {
  const [openH] = site.hoursFrom.split(':').map(Number)
  const [closeH] = site.hoursTo.split(':').map(Number)
  const out = []
  for (let h = openH; h < closeH; h++) {
    out.push(`${String(h).padStart(2, '0')}:00`)
    out.push(`${String(h).padStart(2, '0')}:30`)
  }
  return out
}
const SLOTS = buildSlots()

const todayStr = () => new Date().toISOString().slice(0, 10)

/** '2026-07-22' -> 'Thứ Tư, 22 tháng 7, 2026' (theo ngôn ngữ đang chọn) */
const formatDateLong = (iso, lang) => {
  if (!iso) return '—'
  try {
    return new Intl.DateTimeFormat(lang, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso + 'T00:00:00'))
  } catch {
    return iso
  }
}

/**
 * Thẻ tóm tắt đơn đặt lịch — dùng chung cho bước 4 và màn hình hoàn tất
 * để hai nơi luôn trông giống nhau.
 */
function BookingSummary({ service, form, total, totalUsd }) {
  const { t, i18n } = useTranslation()
  if (!service) return null

  const discounted = isDiscountable(service, form.minutes)
  const finalVnd = discountVnd(total, service, form.minutes)
  const finalUsd = discountUsd(totalUsd, service, form.minutes)

  // Chỉ hiện dòng nào khách thực sự điền, khỏi phải nhìn một loạt dấu gạch ngang
  const rows = [
    [t('booking.name'), form.name],
    [t('booking.phone'), form.phone],
    [t('booking.email'), form.email],
    [t('booking.noteShort'), form.note],
  ].filter(([, value]) => value)

  return (
    <div className="overflow-hidden rounded-2xl text-left ring-1 ring-ink-900/10">
      {/* Dịch vụ */}
      <div className="flex gap-4 bg-cream p-4 sm:p-5">
        <Img
          src={service.image}
          sizes="112px"
          className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
        />
        <div className="min-w-0 self-center">
          <p className="font-display text-lg leading-snug font-semibold text-ink-800">
            {t(`services_list.${service.id}.name`)}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-500">
            <IconClock size={14} />
            {form.minutes} {t('common.min')} × {form.guests}
          </p>
        </div>
      </div>

      {/* Ngày & giờ hẹn — thông tin khách cần nhớ nhất nên tách riêng cho nổi */}
      <div className="flex items-center gap-4 border-t border-ink-900/8 bg-white px-4 py-4 sm:px-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
          <IconCalendar size={20} />
        </span>
        <div className="min-w-0">
          <p className="font-medium text-ink-800 first-letter:uppercase">
            {formatDateLong(form.date, i18n.language)}
          </p>
          <p className="mt-0.5 text-sm text-ink-500">{form.time}</p>
        </div>
      </div>

      {/* Thông tin khách */}
      {rows.length > 0 && (
        <dl className="divide-y divide-ink-900/8 border-t border-ink-900/8 bg-white text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-4 px-4 py-3 sm:px-5">
              <dt className="w-28 shrink-0 text-ink-500 sm:w-32">{label}</dt>
              <dd className="min-w-0 flex-1 break-words text-ink-800">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* Tạm tính */}
      <div className="border-t border-ink-900/8 bg-clay-50 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <span className="text-sm font-medium text-ink-700">{t('booking.total')}</span>
            {discounted && (
              <span className="mt-1.5 flex w-fit items-center gap-1 rounded-full bg-clay-500 px-2.5 py-1 text-[11px] font-semibold text-white">
                <IconCheck size={12} />
                {t('booking.discountApplied', { percent: ONLINE_DISCOUNT * 100 })}
              </span>
            )}
          </div>

          <div className="text-right">
            {discounted && (
              <s className="block text-sm text-ink-300">{formatVnd(total)}</s>
            )}
            <span className="font-display text-2xl leading-none font-semibold text-clay-600">
              {formatVnd(finalVnd)}
              <span className="ml-1.5 text-sm font-normal text-ink-500">
                ({formatUsd(finalUsd)})
              </span>
            </span>
          </div>
        </div>

        {!discounted && (
          <p className="mt-3 text-xs leading-relaxed text-ink-400">
            {t('booking.noDiscountNote')}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Booking() {
  const { t, i18n } = useTranslation()
  const [params] = useSearchParams()

  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState(() => {
    const preset = params.get('service')
    const svc = preset && findService(preset) ? findService(preset) : null
    return {
      serviceId: svc?.id || '',
      minutes: svc?.prices.find((p) => p.vnd != null)?.min || null,
      date: '',
      time: '',
      guests: 1,
      name: '',
      phone: '',
      email: '',
      note: '',
    }
  })

  const service = form.serviceId ? findService(form.serviceId) : null
  const priceRow = service?.prices.find((p) => p.min === form.minutes) || null
  const total = priceRow?.vnd ? priceRow.vnd * form.guests : null
  const totalUsd = priceRow?.usd ? priceRow.usd * form.guests : null
  // Số tiền khách thực trả sau ưu đãi đặt online
  const totalAfterDiscount = discountVnd(total, service, form.minutes)

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step, done])

  const validate = (s) => {
    const e = {}
    if (s === 0 && !form.serviceId) e.serviceId = t('common.required')
    if (s === 1) {
      if (!form.date) e.date = t('booking.errDate')
      if (!form.time) e.time = t('booking.errTime')
    }
    if (s === 2) {
      if (!form.name.trim()) e.name = t('booking.errName')
      if (!/^[+\d][\d\s().-]{7,}$/.test(form.phone.trim())) e.phone = t('booking.errPhone')
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
        e.email = t('booking.errEmail')
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => validate(step) && setStep((s) => Math.min(s + 1, 3))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = () => {
    // Chưa có nơi nhận đơn — tạm lưu ở máy khách cho tới khi dựng xong phần gửi về spa.
    try {
      const all = JSON.parse(localStorage.getItem('mykhe-bookings') || '[]')
      all.push({
        ...form,
        total,
        totalAfterDiscount,
        discountApplied: isDiscountable(service, form.minutes),
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem('mykhe-bookings', JSON.stringify(all))
    } catch {
      /* bỏ qua nếu trình duyệt chặn localStorage */
    }
    setDone(true)
  }

  /* ------------------------- MÀN HÌNH HOÀN TẤT ------------------------- */
  if (done) {
    return (
      <>
        <PageHeader title={t('booking.title')} image="/images/entrance-arch.png" />
        {/* Nền trắng để thẻ tóm tắt (có phần đầu màu kem) nổi hẳn lên,
            giống hệt bối cảnh của nó ở bước 4. */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container-page max-w-xl">
            <div className="text-center">
              <span className="animate-pop-in mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-500 text-white shadow-lg shadow-clay-500/30">
                <IconCheck size={32} />
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold text-ink-800">
                {t('booking.doneTitle')}
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-500">
                {t('booking.doneSub')}
              </p>
            </div>

            <div className="mt-8">
              <BookingSummary
                service={service}
                form={form}
                total={total}
                totalUsd={totalUsd}
              />
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed text-ink-300">
              {t('booking.noteChannel')}
            </p>

            <button
              type="button"
              onClick={() => {
                setDone(false)
                setStep(0)
                set({ date: '', time: '', note: '' })
              }}
              className="btn-outline mx-auto mt-8 flex"
            >
              {t('booking.newBooking')}
            </button>
          </div>
        </section>
      </>
    )
  }

  /* ------------------------------ WIZARD ------------------------------ */
  return (
    <>
      <PageHeader
        title={t('booking.title')}
        sub={t('booking.sub')}
        image="/images/reception.png"
      />

      <section className="pt-12 lg:pt-16">
        <div className="container-page max-w-4xl">
          <PromoBanner />
        </div>
      </section>

      {/* scroll-mt để header cố định không che mất form khi nhảy tới #booking-form */}
      <section id="booking-form" className="scroll-mt-24 py-10 lg:py-14">
        <div className="container-page max-w-4xl">
          {/* Thanh tiến trình */}
          <ol className="flex items-center">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                      i < step
                        ? 'bg-clay-500 text-white'
                        : i === step
                          ? 'bg-clay-500 text-white ring-4 ring-clay-500/20'
                          : 'bg-white text-ink-300 ring-1 ring-ink-900/10'
                    }`}
                  >
                    {i < step ? <IconCheck size={18} /> : i + 1}
                  </span>
                  <span
                    className={`hidden text-center text-xs sm:block ${
                      i <= step ? 'font-medium text-ink-800' : 'text-ink-300'
                    }`}
                  >
                    {t(`booking.${s}`)}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    className={`mx-2 mb-6 h-px flex-1 sm:mx-3 ${
                      i < step ? 'bg-clay-500' : 'bg-ink-900/12'
                    }`}
                  />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-ink-900/8 sm:p-9">
            {/* ---------- BƯỚC 1: CHỌN DỊCH VỤ ---------- */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink-800">
                  {t('booking.pickService')}
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {services.map((s) => {
                    const active = form.serviceId === s.id
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() =>
                          set({
                            serviceId: s.id,
                            minutes: s.prices.find((p) => p.vnd != null)?.min || null,
                          })
                        }
                        className={`flex items-center gap-3.5 rounded-2xl p-3 text-left transition ${
                          active
                            ? 'bg-clay-50 ring-2 ring-clay-500'
                            : 'ring-1 ring-ink-900/10 hover:ring-clay-300'
                        }`}
                      >
                        <Img
                          src={s.image}
                          sizes="64px"
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink-800">
                            {t(`services_list.${s.id}.name`)}
                          </span>
                          {(() => {
                            // Giá "từ ..." cũng phải là giá sau ưu đãi, nếu không
                            // con số sẽ nhảy khi khách sang bước xác nhận.
                            const cheapest = s.prices.filter((p) => p.vnd)[0]
                            const off = isDiscountable(s, cheapest?.min)
                            return (
                              <span className="mt-0.5 flex items-baseline gap-1.5 text-xs">
                                <span className="text-ink-400">{t('common.from')}</span>
                                {off && (
                                  <s className="text-ink-300">{formatVnd(cheapest?.vnd)}</s>
                                )}
                                <span className="font-semibold text-clay-600">
                                  {formatVnd(discountVnd(cheapest?.vnd, s, cheapest?.min))}
                                </span>
                              </span>
                            )
                          })()}
                        </span>
                        {active && <IconCheck size={20} className="shrink-0 text-clay-500" />}
                      </button>
                    )
                  })}
                </div>
                {errors.serviceId && (
                  <p className="mt-3 text-sm text-red-600">{errors.serviceId}</p>
                )}

                {/* Chọn thời lượng */}
                {service && service.prices.filter((p) => p.vnd != null).length > 1 && (
                  <div className="mt-8">
                    <p className="label">{t('booking.pickDuration')}</p>
                    <div className="flex flex-wrap gap-2.5">
                      {service.prices
                        .filter((p) => p.vnd != null)
                        .map((p) => (
                          <button
                            key={p.min}
                            type="button"
                            onClick={() => set({ minutes: p.min })}
                            className={`rounded-xl px-4 py-3 text-sm transition ${
                              form.minutes === p.min
                                ? 'bg-clay-500 text-white'
                                : 'bg-cream text-ink-700 ring-1 ring-ink-900/10 hover:ring-clay-300'
                            }`}
                          >
                            <span className="flex items-center gap-1.5 font-medium">
                              <IconClock size={14} /> {p.min} {t('common.min')}
                            </span>
                            <span className="mt-0.5 flex items-baseline gap-1.5 text-xs">
                              {isDiscountable(service, p.min) && (
                                <s className="opacity-55">{formatVnd(p.vnd)}</s>
                              )}
                              <span className="opacity-90">
                                {formatVnd(discountVnd(p.vnd, service, p.min))}
                              </span>
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---------- BƯỚC 2: NGÀY & GIỜ ---------- */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink-800">
                  {t('booking.step2')}
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="label">
                      {t('booking.pickDate')}
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={todayStr()}
                      value={form.date}
                      onChange={(e) => set({ date: e.target.value })}
                      className="field"
                    />
                    {errors.date && <p className="mt-1.5 text-sm text-red-600">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="guests" className="label">
                      {t('booking.guests')}
                    </label>
                    <select
                      id="guests"
                      value={form.guests}
                      onChange={(e) => set({ guests: Number(e.target.value) })}
                      className="field"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="label">{t('booking.pickTime')}</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
                    {SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => set({ time: slot })}
                        className={`rounded-xl py-2.5 text-sm font-medium transition ${
                          form.time === slot
                            ? 'bg-clay-500 text-white'
                            : 'bg-cream text-ink-700 ring-1 ring-ink-900/10 hover:ring-clay-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="mt-2 text-sm text-red-600">{errors.time}</p>}
                </div>
              </div>
            )}

            {/* ---------- BƯỚC 3: THÔNG TIN KHÁCH ---------- */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink-800">
                  {t('booking.step3')}
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">
                      {t('booking.name')} *
                    </label>
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => set({ name: e.target.value })}
                      className="field"
                      autoComplete="name"
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">
                      {t('booking.phone')} *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set({ phone: e.target.value })}
                      className="field"
                      autoComplete="tel"
                      placeholder="+84 ..."
                    />
                    {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="label">
                      {t('booking.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set({ email: e.target.value })}
                      className="field"
                      autoComplete="email"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="note" className="label">
                      {t('booking.note')}
                    </label>
                    <textarea
                      id="note"
                      rows={4}
                      value={form.note}
                      onChange={(e) => set({ note: e.target.value })}
                      className="field resize-none"
                      placeholder={t('booking.notePlaceholder')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ---------- BƯỚC 4: XÁC NHẬN ---------- */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink-800">
                  {t('booking.summary')}
                </h2>

                <div className="mt-6">
                  <BookingSummary
                    service={service}
                    form={form}
                    total={total}
                    totalUsd={totalUsd}
                  />
                </div>

                <p className="mt-4 text-xs leading-relaxed text-ink-300">
                  {t('booking.noteChannel')}
                </p>
              </div>
            )}

            {/* Điều hướng */}
            <div className="mt-9 flex items-center justify-between gap-3 border-t border-ink-900/8 pt-6">
              {step > 0 ? (
                <button type="button" onClick={back} className="btn-outline">
                  {t('common.back')}
                </button>
              ) : (
                <Link to="/dich-vu" className="btn-outline">
                  {t('nav.services')}
                </Link>
              )}

              {step < 3 ? (
                <button type="button" onClick={next} className="btn-primary">
                  {t('common.next')} <IconArrow size={17} />
                </button>
              ) : (
                <button type="button" onClick={submit} className="btn-primary">
                  <IconCheck size={18} /> {t('booking.confirm')}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <BookingPerks />
    </>
  )
}
