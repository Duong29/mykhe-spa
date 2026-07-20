import { Link, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { posts } from './Blog'
import Reveal from '../components/Reveal'
import { IconArrow } from '../components/Icons'
import Img from '../components/Img'

export default function BlogPost() {
  const { id } = useParams()
  const { t } = useTranslation()
  const post = posts.find((p) => p.id === id)

  if (!post) return <Navigate to="/tin-tuc" replace />

  const related = posts.filter((p) => p.id !== id).slice(0, 3)

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <Img
          src={post.image}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/72" />
        <div className="container-page relative max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 text-xs">
            <span className="rounded-full bg-clay-500 px-3 py-1 font-medium text-white">
              {t(`blog.posts.${id}.tag`)}
            </span>
            <span className="text-white/70">{t(`blog.posts.${id}.date`)}</span>
          </div>
          <h1 className="mt-5 font-display text-3xl leading-tight font-semibold text-white sm:text-5xl">
            {t(`blog.posts.${id}.title`)}
          </h1>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="border-l-2 border-clay-500 pl-5 font-display text-xl leading-relaxed text-ink-700 italic">
              {t(`blog.posts.${id}.excerpt`)}
            </p>
            <div className="mt-8 space-y-5">
              {t(`blog.posts.${id}.body`)
                .split('\n\n')
                .map((para, i) => (
                  <p key={i} className="leading-[1.85] text-ink-700">
                    {para}
                  </p>
                ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-12 flex flex-wrap gap-3 border-t border-ink-900/10 pt-8">
            <Link to="/tin-tuc" className="btn-outline">
              {t('blog.backToList')}
            </Link>
            <Link to="/dat-lich" className="btn-primary">
              {t('common.bookNow')} <IconArrow size={17} />
            </Link>
          </Reveal>
        </div>
      </article>

      <section className="bg-white py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl font-semibold text-ink-800">{t('blog.title')}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <Link to={`/tin-tuc/${p.id}`} className="card group flex h-full flex-col">
                  <div className="aspect-16/10 overflow-hidden">
                    <Img
                      src={p.image}
                      sizes="(min-width: 640px) 360px, 92vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-ink-300">{t(`blog.posts.${p.id}.date`)}</span>
                    <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold text-ink-800">
                      {t(`blog.posts.${p.id}.title`)}
                    </h3>
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
