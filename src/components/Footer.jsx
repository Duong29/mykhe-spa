import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import { IconPin, IconPhone, IconMail, IconClock, IconZalo, IconMessenger, IconKakao, IconInstagram } from './Icons'

const links = [
  { to: '/', key: 'home' },
  { to: '/dich-vu', key: 'services' },
  { to: '/khong-gian', key: 'gallery' },
  { to: '/dat-lich', key: 'booking' },
  { to: '/tin-tuc', key: 'blog' },
  { to: '/lien-he', key: 'contact' },
]

const socials = [
  { href: site.social.zalo, Icon: IconZalo, label: 'Zalo' },
  { href: site.social.messenger, Icon: IconMessenger, label: 'Messenger' },
  { href: site.social.kakao, Icon: IconKakao, label: 'KakaoTalk' },
  { href: site.social.instagram, Icon: IconInstagram, label: 'Instagram' },
]

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-ink-900 text-ink-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:pr-6">
          <div className="flex items-center gap-3">
            <img src={site.logo} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div className="leading-tight">
              <p className="font-display text-xl font-semibold text-white">My Khe Spa</p>
              <p className="text-[10px] tracking-[0.22em] text-clay-400">DA NANG</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{t('footer.tagline')}</p>
          <div className="mt-5 flex gap-2.5">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-ink-100 ring-1 ring-white/10 transition hover:bg-clay-500 hover:text-white"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            {t('footer.quickLinks')}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-ink-300 transition hover:text-clay-400">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            {t('footer.contactInfo')}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li className="flex gap-2.5">
              <IconPin size={17} className="mt-0.5 shrink-0 text-clay-400" />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-2.5">
              <IconPhone size={17} className="mt-0.5 shrink-0 text-clay-400" />
              <a href={site.phoneHref} className="transition hover:text-clay-400">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <IconMail size={17} className="mt-0.5 shrink-0 text-clay-400" />
              <a href={`mailto:${site.email}`} className="transition hover:text-clay-400">
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <IconClock size={17} className="mt-0.5 shrink-0 text-clay-400" />
              <span>
                {t('common.everyday')} · {site.hoursFrom} – {site.hoursTo}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
            {t('nav.booking')}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{t('home.ctaSub')}</p>
          <Link to="/dat-lich" className="btn-primary mt-5 w-full sm:w-auto">
            {t('common.bookNow')}
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand}. {t('footer.rights')}
          </p>
          <p>{site.address}</p>
        </div>
      </div>
    </footer>
  )
}
