import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { site } from '../data/site'
import { featuredServices } from '../data/services'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import GoogleReview from '../components/GoogleReview'
import Reveal from '../components/Reveal'
import Img from '../components/Img'
import {
  IconArrow,
  IconHands,
  IconLeaf,
  IconDoor,
  IconGlobe,
  IconStar,
  IconPin,
  IconClock,
} from '../components/Icons'

const featureIcons = [IconHands, IconLeaf, IconDoor, IconGlobe]

// Số liệu thật của spa. Điểm Google lấy từ site.js để chỉ phải sửa một nơi.
const stats = [
  { value: '3+', key: 'statYears' },
  { value: '12', key: 'statRooms' },
  { value: '2', key: 'statShampooRooms' },
  { value: `${site.google.rating}★`, key: 'statRating' },
]

const spaceShots = [
  { src: '/images/reception.png', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/images/entrance-arch.png', span: '' },
  { src: '/images/room-couple.png', span: '' },
  { src: '/images/welcome-drink.png', span: '' },
  { src: '/images/shampoo-room.png', span: '' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden">
        <Img
          src="/images/lounge-evening.jpg"
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900/80 via-ink-900/55 to-clay-900/40" />

        <div className="container-page relative pt-28 pb-20">
          <div className="max-w-2xl">
            <Reveal>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-clay-300 uppercase">
                <span className="h-px w-8 bg-clay-400" />
                {t('home.heroEyebrow')}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 font-display text-4xl leading-[1.1] font-semibold whitespace-pre-line text-white sm:text-6xl lg:text-7xl">
                {t('home.heroTitle')}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                {t('home.heroSub')}
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/dat-lich" className="btn-primary !px-8 !py-4">
                  {t('home.heroCtaBook')} <IconArrow size={18} />
                </Link>
                <Link to="/dich-vu" className="btn-ghost-light !px-8 !py-4">
                  {t('home.heroCtaService')}
                </Link>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <IconPin size={15} /> {site.address}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconClock size={15} /> {site.hoursFrom} – {site.hoursTo}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="border-b border-ink-900/8 bg-white">
        <div className="container-page grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.key} delay={i * 80} className="text-center">
              <p className="font-display text-3xl font-semibold text-clay-600 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs tracking-wide text-ink-500 uppercase">{t(`home.${s.key}`)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- GIỚI THIỆU ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Img
                src="/images/lounge-1.png"
                sizes="(min-width: 1024px) 520px, 92vw"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <div className="absolute -right-2 -bottom-10 hidden w-48 overflow-hidden rounded-2xl ring-8 ring-cream sm:block lg:-right-8 lg:w-60">
              <Img
                src="/images/massage-service.png"
                sizes="240px"
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <SectionHeading
              eyebrow={t('home.aboutEyebrow')}
              title={t('home.aboutTitle')}
              align="left"
            />
            <p className="mt-6 leading-relaxed text-ink-500">{t('home.aboutP1')}</p>
            <p className="mt-4 leading-relaxed text-ink-500">{t('home.aboutP2')}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((n, i) => {
                const Icon = featureIcons[i]
                return (
                  <div key={n} className="flex gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay-50 text-clay-600">
                      <Icon size={21} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink-800">
                        {t(`home.feature${n}Title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">
                        {t(`home.feature${n}Desc`)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DỊCH VỤ NỔI BẬT ---------------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t('home.servicesEyebrow')}
              title={t('home.servicesTitle')}
              sub={t('home.servicesSub')}
            />
          </Reveal>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 100}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link to="/dich-vu" className="btn-outline">
              {t('common.viewAll')} <IconArrow size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- KHÔNG GIAN ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t('home.spaceEyebrow')}
              title={t('home.spaceTitle')}
              sub={t('home.spaceSub')}
            />
          </Reveal>

          <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-4 sm:gap-4">
            {spaceShots.map((shot, i) => (
              <Reveal
                key={shot.src}
                delay={i * 70}
                className={`overflow-hidden rounded-2xl ${shot.span}`}
              >
                <Img
                  src={shot.src}
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link to="/khong-gian" className="btn-outline">
              {t('common.viewAll')} <IconArrow size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ĐÁNH GIÁ ---------------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow={t('home.reviewsEyebrow')}
              title={t('home.reviewsTitle')}
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <Reveal key={n} delay={i * 100}>
                <figure className="flex h-full flex-col rounded-2xl bg-cream p-6 ring-1 ring-ink-900/5">
                  <div className="flex text-gold" aria-hidden>
                    {[0, 1, 2, 3, 4].map((s) => (
                      <IconStar key={s} size={16} />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                    “{t(`home.review${n}`)}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/8 pt-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay-500 text-sm font-semibold text-white">
                      {t(`home.review${n}Name`).charAt(0)}
                    </span>
                    <span className="text-sm font-medium text-ink-800">
                      {t(`home.review${n}Name`)}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mx-auto mt-10 max-w-xl">
            <GoogleReview />
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <Img
          src="/images/entrance-arch.png"
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/72" />
        <div className="container-page relative text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
              {t('home.ctaTitle')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/80">
              {t('home.ctaSub')}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/dat-lich" className="btn-primary !px-8 !py-4">
                {t('common.bookNow')} <IconArrow size={18} />
              </Link>
              <a href={site.phoneHref} className="btn-ghost-light !px-8 !py-4">
                {t('common.call')} · {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
