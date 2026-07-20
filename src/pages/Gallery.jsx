import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import FilterTabs from '../components/FilterTabs'
import Img from '../components/Img'
import { IconClose, IconArrow } from '../components/Icons'

// group: space (không gian chung) | room (phòng trị liệu) | service (dịch vụ)
const photos = [
  { src: '/images/facade.jpg', group: 'space' },
  { src: '/images/reception.png', group: 'space' },
  { src: '/images/lounge-evening.jpg', group: 'space' },
  { src: '/images/lounge-1.png', group: 'space' },
  { src: '/images/lounge-2.png', group: 'space' },
  { src: '/images/entrance-arch.png', group: 'space' },
  { src: '/images/decor-shelf.png', group: 'space' },
  { src: '/images/decor-frame.png', group: 'space' },
  { src: '/images/decor-corner.png', group: 'space' },
  { src: '/images/art-wall.png', group: 'space' },
  { src: '/images/google-review-desk.png', group: 'space' },
  { src: '/images/room-couple.png', group: 'room' },
  { src: '/images/room-twin.png', group: 'room' },
  { src: '/images/room-group.png', group: 'room' },
  { src: '/images/room-shelf-1.jpg', group: 'room' },
  { src: '/images/room-shelf-2.jpg', group: 'room' },
  { src: '/images/room-shelf-dark.jpg', group: 'room' },
  { src: '/images/shampoo-room.png', group: 'room' },
  { src: '/images/bathroom.png', group: 'room' },
  { src: '/images/massage-service.png', group: 'service' },
  { src: '/images/hotstone.png', group: 'service' },
  { src: '/images/shampoo-service.png', group: 'service' },
  { src: '/images/shampoo-cart.png', group: 'service' },
  { src: '/images/welcome-drink.png', group: 'service' },
  { src: '/images/menu-full.jpg', group: 'service' },
]

const filters = [
  { key: 'all', labelKey: 'gallery.filterAll' },
  { key: 'space', labelKey: 'gallery.filterSpace' },
  { key: 'room', labelKey: 'gallery.filterRoom' },
  { key: 'service', labelKey: 'gallery.filterService' },
]

export default function Gallery() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null) // chỉ số ảnh đang xem

  const visible = useMemo(
    () => (filter === 'all' ? photos : photos.filter((p) => p.group === filter)),
    [filter],
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % visible.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + visible.length) % visible.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, visible.length])

  return (
    <>
      <PageHeader title={t('gallery.title')} sub={t('gallery.sub')} image="/images/lounge-1.png" />

      <section className="py-16 lg:py-20">
        <div className="container-page">
          <FilterTabs
            items={filters.map((f) => ({ key: f.key, label: t(f.labelKey) }))}
            value={filter}
            onChange={(key) => {
              setFilter(key)
              setLightbox(null)
            }}
          />

          {/* Lưới masonry nhẹ bằng CSS columns — ảnh giữ đúng tỉ lệ gốc */}
          <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3">
            {visible.map((p, i) => (
              <Reveal key={p.src} delay={(i % 6) * 60} className="mb-3 sm:mb-4">
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group block w-full overflow-hidden rounded-2xl"
                >
                  <Img
                    src={p.src}
                    alt={t(`gallery.filter${p.group.charAt(0).toUpperCase() + p.group.slice(1)}`)}
                    sizes="(min-width: 1024px) 360px, 46vw"
                    className="w-full transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LIGHTBOX ---------- */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/95 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label={t('common.close')}
            className="absolute top-5 right-5 text-white/80 transition hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <IconClose size={30} />
          </button>

          <button
            type="button"
            aria-label="Previous"
            className="absolute left-3 rotate-180 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-8"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i - 1 + visible.length) % visible.length)
            }}
          >
            <IconArrow size={22} />
          </button>

          <Img
            src={visible[lightbox].src}
            priority
            sizes="90vw"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
          />

          <button
            type="button"
            aria-label="Next"
            className="absolute right-3 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-8"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i + 1) % visible.length)
            }}
          >
            <IconArrow size={22} />
          </button>

          <p className="absolute bottom-5 text-sm text-white/60">
            {lightbox + 1} / {visible.length}
          </p>
        </div>
      )}
    </>
  )
}
