import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { site } from '../data/site'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import GoogleReview from '../components/GoogleReview'
import {
  IconPin,
  IconPhone,
  IconMail,
  IconClock,
  IconCheck,
  IconArrow,
  IconKakao,
  IconInstagram,
} from '../components/Icons'

const socials = [
  { href: site.social.kakao, Icon: IconKakao, label: 'KakaoTalk' },
  { href: site.social.instagram, Icon: IconInstagram, label: 'Instagram' },
]

export default function Contact() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  const onSubmit = (e) => {
    e.preventDefault()
    // Chưa có backend — mở sẵn email tới lễ tân với nội dung đã điền.
    const body = `${form.message}\n\n---\n${form.name} · ${form.phone} · ${form.email}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Liên hệ từ website — ${form.name}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const infos = [
    { Icon: IconPin, label: t('common.address'), value: site.address, href: site.mapLink },
    { Icon: IconPhone, label: t('common.hotline'), value: site.phone, href: site.phoneHref },
    { Icon: IconMail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    {
      Icon: IconClock,
      label: t('common.openHours'),
      value: `${t('common.everyday')} · ${site.hoursFrom} – ${site.hoursTo}`,
    },
  ]

  return (
    <>
      <PageHeader title={t('contact.title')} sub={t('contact.sub')} image="/images/facade.jpg" />

      <section className="py-16 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Thông tin liên hệ */}
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-800">
              {t('contact.infoTitle')}
            </h2>
            <span className="mt-4 block h-px w-14 bg-clay-500" />

            <ul className="mt-8 space-y-6">
              {infos.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs tracking-wide text-ink-300 uppercase">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer noopener"
                        className="mt-0.5 block leading-relaxed text-ink-800 transition hover:text-clay-600"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 leading-relaxed text-ink-800">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-xl bg-clay-50 px-4 py-3 text-sm text-ink-700">
              {t('contact.branchNote')}
            </p>

            <div className="mt-8">
              <p className="text-xs tracking-wide text-ink-300 uppercase">{t('footer.followUs')}</p>
              <div className="mt-3 flex gap-2.5">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-700 ring-1 ring-ink-900/10 transition hover:bg-clay-500 hover:text-white"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <GoogleReview compact />
            </div>
          </Reveal>

          {/* Form liên hệ */}
          <Reveal delay={120}>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-900/8 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink-800">
                {t('contact.formTitle')}
              </h2>

              {sent ? (
                <div className="py-10 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                    <IconCheck size={32} />
                  </span>
                  <p className="mt-5 leading-relaxed text-ink-700">{t('contact.sent')}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="c-name" className="label">
                      {t('contact.yourName')} *
                    </label>
                    <input
                      id="c-name"
                      required
                      value={form.name}
                      onChange={(e) => set({ name: e.target.value })}
                      className="field"
                      autoComplete="name"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-phone" className="label">
                        {t('contact.yourPhone')} *
                      </label>
                      <input
                        id="c-phone"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set({ phone: e.target.value })}
                        className="field"
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="label">
                        {t('contact.yourEmail')}
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set({ email: e.target.value })}
                        className="field"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-msg" className="label">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="c-msg"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => set({ message: e.target.value })}
                      className="field resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    {t('contact.send')} <IconArrow size={17} />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bản đồ */}
      <section className="pb-16 lg:pb-20">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink-800">
              {t('contact.findUs')}
            </h2>
            <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-ink-900/8">
              <iframe
                title="Google Maps — Da Nang My Khe Spa"
                src={site.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full border-0 sm:h-[460px]"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
