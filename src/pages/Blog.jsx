import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { IconArrow } from '../components/Icons'

export const posts = [
  { id: 'p1', image: '/images/welcome-drink.png' },
  { id: 'p2', image: '/images/decor-shelf.png' },
  { id: 'p3', image: '/images/lounge-2.png' },
  { id: 'p4', image: '/images/room-couple.png' },
]

export default function Blog() {
  const { t } = useTranslation()
  const [lead, ...rest] = posts

  return (
    <>
      <PageHeader title={t('blog.title')} sub={t('blog.sub')} image="/images/decor-corner.png" />

      <section className="py-16 lg:py-20">
        <div className="container-page">
          {/* Bài nổi bật */}
          <Reveal>
            <Link
              to={`/tin-tuc/${lead.id}`}
              className="group grid overflow-hidden rounded-3xl bg-white ring-1 ring-ink-900/5 transition hover:shadow-xl lg:grid-cols-2"
            >
              <div className="aspect-16/10 overflow-hidden lg:aspect-auto">
                <img
                  src={lead.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-clay-50 px-3 py-1 font-medium text-clay-600">
                    {t(`blog.posts.${lead.id}.tag`)}
                  </span>
                  <span className="text-ink-300">{t(`blog.posts.${lead.id}.date`)}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl leading-snug font-semibold text-ink-800 sm:text-3xl">
                  {t(`blog.posts.${lead.id}.title`)}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-500">
                  {t(`blog.posts.${lead.id}.excerpt`)}
                </p>
                <span className="mt-6 flex items-center gap-2 text-sm font-semibold text-clay-600">
                  {t('blog.readMore')} <IconArrow size={16} />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Các bài còn lại */}
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <Link to={`/tin-tuc/${p.id}`} className="card group flex h-full flex-col">
                  <div className="aspect-16/10 overflow-hidden">
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-clay-50 px-3 py-1 font-medium text-clay-600">
                        {t(`blog.posts.${p.id}.tag`)}
                      </span>
                      <span className="text-ink-300">{t(`blog.posts.${p.id}.date`)}</span>
                    </div>
                    <h2 className="mt-3 font-display text-xl leading-snug font-semibold text-ink-800">
                      {t(`blog.posts.${p.id}.title`)}
                    </h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">
                      {t(`blog.posts.${p.id}.excerpt`)}
                    </p>
                    <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-clay-600">
                      {t('blog.readMore')} <IconArrow size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
