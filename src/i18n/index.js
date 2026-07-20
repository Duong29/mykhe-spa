import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import vi from './locales/vi.js'
import en from './locales/en.js'
import ko from './locales/ko.js'
import ru from './locales/ru.js'
import zh from './locales/zh.js'

const STORAGE_KEY = 'mykhe-lang'

const detect = () => {
  const saved = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)
  if (saved) return saved
  const browser = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'vi'
  return ['vi', 'en', 'ko', 'ru', 'zh'].includes(browser) ? browser : 'vi'
}

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    ko: { translation: ko },
    ru: { translation: ru },
    zh: { translation: zh },
  },
  lng: detect(),
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng)
  document.documentElement.lang = lng
})
document.documentElement.lang = i18n.language

export default i18n
