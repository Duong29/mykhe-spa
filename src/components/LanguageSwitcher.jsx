import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../data/site'
import { IconChevronDown, IconCheck, IconGlobe } from './Icons'

export default function LanguageSwitcher({ dark = false }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition
          ${
            dark
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-ink-900/15 text-ink-700 hover:border-clay-500 hover:text-clay-600'
          }`}
      >
        <IconGlobe size={16} className="hidden sm:block" />
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.short}</span>
        <IconChevronDown size={14} className={open ? 'rotate-180 transition' : 'transition'} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl bg-white py-1 shadow-xl ring-1 ring-ink-900/10"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang.code === i18n.language}
                onClick={() => {
                  i18n.changeLanguage(lang.code)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition hover:bg-clay-50
                  ${lang.code === i18n.language ? 'font-semibold text-clay-600' : 'text-ink-700'}`}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span className="flex-1">{lang.label}</span>
                {lang.code === i18n.language && <IconCheck size={15} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
