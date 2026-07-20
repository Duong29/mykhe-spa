import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { site } from '../data/site'
import { IconZalo, IconMessenger, IconKakao, IconPhone, IconChat, IconClose } from './Icons'

// Chỉ mở app chat tương ứng khi bấm — không nhúng livechat.
const channels = [
  { key: 'zalo', href: site.social.zalo, Icon: IconZalo, label: 'Zalo', color: 'bg-[#0068ff]' },
  {
    key: 'messenger',
    href: site.social.messenger,
    Icon: IconMessenger,
    label: 'Messenger',
    color: 'bg-[#0084ff]',
  },
  { key: 'kakao', href: site.social.kakao, Icon: IconKakao, label: 'KakaoTalk', color: 'bg-[#fae100] !text-[#3c1e1e]' },
  { key: 'phone', href: site.phoneHref, Icon: IconPhone, label: site.phone, color: 'bg-clay-500' },
]

export default function FloatingChat() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col items-end gap-2.5 sm:bottom-6">
      {open &&
        channels.map(({ key, href, Icon, label, color }, i) => (
          <a
            key={key}
            href={href}
            target={key === 'phone' ? undefined : '_blank'}
            rel="noreferrer noopener"
            style={{ animationDelay: `${i * 50}ms` }}
            className="group flex items-center gap-2"
          >
            <span className="rounded-full bg-ink-900/85 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
              {label}
            </span>
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ring-1 ring-black/5 transition hover:scale-105 ${color}`}
            >
              <Icon size={24} />
            </span>
          </a>
        ))}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('common.chatWithUs')}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-900 text-white shadow-xl transition hover:scale-105 hover:bg-clay-500"
      >
        {open ? <IconClose size={24} /> : <IconChat size={24} />}
        {!open && (
          <span className="absolute h-14 w-14 animate-ping rounded-full bg-clay-500/25" aria-hidden />
        )}
      </button>
    </div>
  )
}
