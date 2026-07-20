import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { site } from '../data/site'
import { services, findService, formatVnd, formatUsd } from '../data/services'
import PageHeader from '../components/PageHeader'
import {
  IconCheck,
  IconArrow,
  IconClock,
  IconZalo,
  IconMail,
  IconChat,
} from '../components/Icons'

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

  // Nội dung gửi về lễ tân (Zalo / Telegram / Email)
  const message = useMemo(() => {
    if (!service) return ''
    return [
      `[${site.brand}] ĐẶT LỊCH MỚI`,
      `• Dịch vụ: ${t(`services_list.${service.id}.name`)} (${form.minutes}')`,
      `• Thời gian: ${form.date} ${form.time}`,
      `• Số khách: ${form.guests}`,
      `• Khách hàng: ${form.name}`,
      `• SĐT: ${form.phone}`,
      form.email ? `• Email: ${form.email}` : null,
      form.note ? `• Ghi chú: ${form.note}` : null,
      total ? `• Tạm tính: ${formatVnd(total)}` : null,
      `• Ngôn ngữ khách: ${i18n.language.toUpperCase()}`,
    ]
      .filter(Boolean)
      .join('\n')
  }, [service, form, total, t, i18n.language])

  const submit = () => {
    // Chưa có phần mềm quản lý riêng → lưu tạm ở máy khách và chuyển tiếp qua kênh chat/email.
    try {
      const all = JSON.parse(localStorage.getItem('mykhe-bookings') || '[]')
      all.push({ ...form, total, createdAt: new Date().toISOString() })
      localStorage.setItem('mykhe-bookings', JSON.stringify(all))
    } catch {
      /* bỏ qua nếu trình duyệt chặn localStorage */
    }
    setDone(true)
  }

  const mailHref = `mailto:${site.booking.receptionEmail}?subject=${encodeURIComponent(
    `Đặt lịch — ${form.name}`,
  )}&body=${encodeURIComponent(message)}`

  /* ------------------------- MÀN HÌNH HOÀN TẤT ------------------------- */
  if (done) {
    return (
      <>
        <PageHeader title={t('booking.title')} image="/images/entrance-arch.png" />
        <section className="py-16 lg:py-24">
          <div className="container-page max-w-2xl text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-clay-50 text-clay-600">
              <IconCheck size={40} />
            </span>
            <h2 className="mt-7 font-display text-3xl font-semibold text-ink-800">
              {t('booking.doneTitle')}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-500">{t('booking.doneSub')}</p>

            <pre className="mt-8 overflow-x-auto rounded-2xl bg-white p-6 text-left font-sans text-sm leading-relaxed whitespace-pre-wrap text-ink-700 ring-1 ring-ink-900/8">
              {message}
            </pre>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <a
                href={`${site.social.zalo}`}
                target="_blank"
                rel="noreferrer noopener"
                className="btn bg-[#0068ff] text-white hover:brightness-110"
              >
                <IconZalo size={19} /> {t('booking.sendZalo')}
              </a>
              <a
                href={site.booking.telegramBot}
                target="_blank"
                rel="noreferrer noopener"
                className="btn bg-[#229ED9] text-white hover:brightness-110"
              >
                <IconChat size={19} /> {t('booking.sendTelegram')}
              </a>
              <a href={mailHref} className="btn-outline">
                <IconMail size={19} /> {t('booking.sendEmail')}
              </a>
            </div>

            <p className="mt-6 text-xs text-ink-300">{t('booking.noteChannel')}</p>

            <button
              type="button"
              onClick={() => {
                setDone(false)
                setStep(0)
                set({ date: '', time: '', note: '' })
              }}
              className="btn-outline mt-8"
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

      <section className="py-14 lg:py-20">
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
                        <img
                          src={s.image}
                          alt=""
                          loading="lazy"
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink-800">
                            {t(`services_list.${s.id}.name`)}
                          </span>
                          <span className="mt-0.5 block text-xs text-clay-600">
                            {t('common.from')}{' '}
                            {formatVnd(s.prices.filter((p) => p.vnd)[0]?.vnd)}
                          </span>
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
                            <span className="mt-0.5 block text-xs opacity-80">
                              {formatVnd(p.vnd)}
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

                <div className="mt-6 flex gap-4 rounded-2xl bg-cream p-4">
                  <img
                    src={service?.image}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold text-ink-800">
                      {service && t(`services_list.${service.id}.name`)}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                      <IconClock size={14} /> {form.minutes} {t('common.min')} × {form.guests}
                    </p>
                    <p className="mt-1 text-sm text-ink-500">
                      {form.date} · {form.time}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 divide-y divide-ink-900/8 text-sm">
                  {[
                    [t('booking.name'), form.name],
                    [t('booking.phone'), form.phone],
                    [t('booking.email'), form.email || '—'],
                    [t('booking.note'), form.note || '—'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-6 py-3">
                      <dt className="w-32 shrink-0 text-ink-500">{k}</dt>
                      <dd className="min-w-0 flex-1 break-words text-ink-800">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-clay-50 px-5 py-4">
                  <span className="font-medium text-ink-700">{t('booking.total')}</span>
                  <span className="font-display text-2xl font-semibold text-clay-600">
                    {formatVnd(total)}
                    <span className="ml-2 text-sm font-normal text-ink-500">
                      ({formatUsd(totalUsd)})
                    </span>
                  </span>
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
    </>
  )
}
