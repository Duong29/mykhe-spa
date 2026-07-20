import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import LanguageSwitcher from './LanguageSwitcher'
import { IconMenu, IconClose, IconPhone } from './Icons'
import Img from './Img'

const links = [
  { to: '/', key: 'home' },
  { to: '/dich-vu', key: 'services' },
  { to: '/khong-gian', key: 'gallery' },
  { to: '/tin-tuc', key: 'blog' },
  { to: '/lien-he', key: 'contact' },
]

export default function Header() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const onHome = pathname === '/'
  // Chỉ trang chủ mới có header trong suốt chồng lên ảnh hero
  const transparent = onHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Đóng menu bằng phím Esc
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          transparent
            ? 'bg-gradient-to-b from-ink-900/60 to-transparent py-4'
            : 'bg-cream/95 py-2 shadow-sm backdrop-blur-md'
        }`}
      >
        <div className="container-page flex items-center gap-3">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <Img
              src={site.logo}
              alt={site.brand}
              priority
              sizes="44px"
              className="h-11 w-11 rounded-full object-cover ring-1 ring-white/30"
            />
            <span className="hidden leading-tight sm:block">
              <span
                className={`block font-display text-lg font-semibold ${
                  transparent ? 'text-white' : 'text-ink-800'
                }`}
              >
                My Khe Spa
              </span>
              <span
                className={`block text-[10px] tracking-[0.22em] ${
                  transparent ? 'text-white/70' : 'text-clay-600'
                }`}
              >
                DA NANG
              </span>
            </span>
          </Link>

          {/* Chọn ngôn ngữ: ngay sau logo, trước menu (theo yêu cầu) */}
          <div className="ml-1 hidden lg:block">
            <LanguageSwitcher dark={transparent} />
          </div>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    transparent
                      ? isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/85 hover:bg-white/10 hover:text-white'
                      : isActive
                        ? 'text-clay-600'
                        : 'text-ink-700 hover:text-clay-600'
                  }`
                }
              >
                {t(`nav.${l.key}`)}
              </NavLink>
            ))}
            <a
              href={site.phoneHref}
              className={`ml-2 flex items-center gap-1.5 text-sm font-medium ${
                transparent ? 'text-white/85 hover:text-white' : 'text-ink-700 hover:text-clay-600'
              }`}
            >
              <IconPhone size={16} />
              <span className="hidden xl:inline">{site.phone}</span>
            </a>
            <Link to="/dat-lich" className="btn-primary ml-2 !px-5 !py-2.5">
              {t('common.bookNow')}
            </Link>
          </nav>

          {/* Mobile */}
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <LanguageSwitcher dark={transparent} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menu"
              aria-expanded={open}
              className={`rounded-full p-2 ${transparent ? 'text-white' : 'text-ink-800'}`}
            >
              <IconMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu toàn màn hình trên mobile.
          Phải nằm NGOÀI <header>: header có backdrop-blur, mà backdrop-filter tạo
          containing block mới nên `fixed inset-0` bên trong sẽ bị bó vào khung header. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-60 flex flex-col overflow-y-auto overscroll-contain bg-cream lg:hidden"
        >
          <div className="container-page flex shrink-0 items-center justify-between py-5">
            <div className="flex items-center gap-2.5">
              <Img src={site.logo} sizes="40px" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-lg font-semibold">My Khe Spa</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('common.close')}
              className="rounded-full p-2 text-ink-800"
            >
              <IconClose size={26} />
            </button>
          </div>

          <nav className="container-page flex flex-1 flex-col pt-4 pb-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `border-b border-ink-900/10 py-4 font-display text-2xl transition ${
                    isActive ? 'text-clay-600' : 'text-ink-800'
                  }`
                }
              >
                {t(`nav.${l.key}`)}
              </NavLink>
            ))}
            <Link to="/dat-lich" className="btn-primary mt-8 w-full">
              {t('common.bookNow')}
            </Link>
            <a
              href={site.phoneHref}
              className="mt-3 flex items-center justify-center gap-2 py-2 text-sm text-ink-500"
            >
              <IconPhone size={16} /> {site.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
