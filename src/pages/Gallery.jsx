import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Img from '../components/Img'
import { IconClose, IconArrow } from '../components/Icons'

/**
 * Ảnh được chia chương và gán sẵn kích thước ô để lưới có nhịp điệu.
 *   feature = 2×2 ô, wide = 2×1, tall = 1×2, còn lại 1×1
 * Tổng số ô mỗi chương chia hết cho 4 (desktop) và 2 (mobile) nên hàng cuối
 * luôn kín, không bao giờ hở đáy như kiểu masonry cũ.
 */
const sections = [
  {
    id: 'space',
    titleKey: 'gallery.filterSpace',
    introKey: 'gallery.spaceIntro',
    items: [
      { src: '/images/lounge-evening.jpg', size: 'feature' },
      { src: '/images/facade.jpg', size: 'tall' },
      { src: '/images/reception.png' },
      { src: '/images/entrance-arch.png' },
      { src: '/images/lounge-1.png', size: 'wide' },
      { src: '/images/art-wall.png' },
      { src: '/images/decor-shelf.png' },
      { src: '/images/lounge-2.png' },
      { src: '/images/decor-frame.png' },
      { src: '/images/decor-corner.png' },
      { src: '/images/google-review-desk.png' },
    ],
  },
  {
    id: 'room',
    titleKey: 'gallery.filterRoom',
    introKey: 'gallery.roomIntro',
    items: [
      { src: '/images/room-couple.png', size: 'feature' },
      { src: '/images/room-group.png', size: 'wide' },
      { src: '/images/room-twin.png' },
      { src: '/images/room-shelf-1.jpg' },
      { src: '/images/room-shelf-2.jpg' },
      { src: '/images/room-shelf-dark.jpg' },
      { src: '/images/shampoo-room.png' },
      { src: '/images/bathroom.png' },
    ],
  },
  {
    id: 'service',
    titleKey: 'gallery.filterService',
    introKey: 'gallery.serviceIntro',
    items: [
      { src: '/images/massage-service.png', size: 'wide' },
      { src: '/images/hotstone.png' },
      { src: '/images/shampoo-service.png', size: 'wide' },
      { src: '/images/shampoo-cart.png' },
      { src: '/images/welcome-drink.png' },
      { src: '/images/menu-full.jpg' },
    ],
  },
]

const SPAN = {
  feature: 'col-span-2 row-span-2',
  wide: 'col-span-2',
  tall: 'row-span-2',
}

// Ảnh lớn cần bản độ phân giải cao hơn ô nhỏ
const SIZES = {
  feature: '(min-width: 1024px) 540px, 100vw',
  wide: '(min-width: 1024px) 540px, 100vw',
  tall: '(min-width: 1024px) 270px, 50vw',
  default: '(min-width: 1024px) 270px, 50vw',
}

// Danh sách phẳng để lightbox duyệt xuyên suốt các chương
const allPhotos = sections.flatMap((s) => s.items)

export default function Gallery() {
  const { t } = useTranslation()
  const [lightbox, setLightbox] = useState(null)
  const touchX = useRef(null)

  const move = (step) =>
    setLightbox((i) => (i === null ? i : (i + step + allPhotos.length) % allPhotos.length))

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <>
      <PageHeader title={t('gallery.title')} sub={t('gallery.sub')} image="/images/lounge-1.png" />

      {/* Điều hướng nhanh tới từng chương — thay cho bộ lọc cũ, không gây nhảy layout */}
      <div className="sticky top-16 z-30 border-b border-ink-900/8 bg-cream/90 backdrop-blur-md">
        <div className="container-page flex items-center gap-2 overflow-x-auto py-3">
          <span className="hidden shrink-0 text-xs tracking-wide text-ink-400 uppercase sm:block">
            {t('gallery.jumpTo')}
          </span>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-900/10 transition hover:text-clay-600 hover:ring-clay-300"
            >
              {t(s.titleKey)}
            </a>
          ))}
        </div>
      </div>

      {sections.map((section, si) => {
        // Vị trí bắt đầu của chương này trong danh sách phẳng
        const offset = sections.slice(0, si).reduce((n, s) => n + s.items.length, 0)

        return (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-32 py-14 lg:py-20 ${si % 2 === 1 ? 'bg-white' : ''}`}
          >
            <div className="container-page">
              <Reveal>
                <p className="font-display text-4xl leading-none font-semibold text-clay-200">
                  {String(si + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink-800 sm:text-4xl">
                  {t(section.titleKey)}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-500">{t(section.introKey)}</p>
              </Reveal>

              <div className="mt-8 grid auto-rows-[40vw] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[28vw] sm:gap-4 lg:auto-rows-[12.5rem] lg:grid-cols-4">
                {section.items.map((photo, i) => (
                  <Reveal
                    key={photo.src}
                    delay={(i % 4) * 70}
                    className={`${SPAN[photo.size] || ''} min-h-0`}
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(offset + i)}
                      aria-label={t(section.titleKey)}
                      className="group relative block h-full w-full overflow-hidden rounded-2xl"
                    >
                      <Img
                        src={photo.src}
                        sizes={SIZES[photo.size] || SIZES.default}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      {/* Lớp phủ nhẹ khi rê chuột, báo cho biết ảnh bấm được */}
                      <span className="absolute inset-0 bg-ink-900/0 transition-colors duration-300 group-hover:bg-ink-900/15" />
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ---------- LIGHTBOX ---------- */}
      {lightbox !== null && (
        <div
          className="animate-fade-in fixed inset-0 z-60 flex items-center justify-center bg-ink-900/92 p-4 backdrop-blur-md"
          onClick={() => setLightbox(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1)
            touchX.current = null
          }}
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
            className="absolute left-3 hidden rotate-180 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block sm:left-8"
            onClick={(e) => {
              e.stopPropagation()
              move(-1)
            }}
          >
            <IconArrow size={22} />
          </button>

          {/* Dùng Img để lấy đúng biến thể lớn nhất mỗi ảnh thực sự có —
              ghép tên -1440.webp bằng tay sẽ hỏng với ảnh dọc như facade. */}
          <Img
            src={allPhotos[lightbox].src}
            priority
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
            className="animate-pop-in max-h-[85vh] w-auto rounded-xl object-contain"
          />

          <button
            type="button"
            aria-label="Next"
            className="absolute right-3 hidden rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:block sm:right-8"
            onClick={(e) => {
              e.stopPropagation()
              move(1)
            }}
          >
            <IconArrow size={22} />
          </button>

          <p className="absolute bottom-5 text-sm text-white/60">
            {lightbox + 1} / {allPhotos.length}
          </p>
        </div>
      )}
    </>
  )
}
