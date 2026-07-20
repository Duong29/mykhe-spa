import { useEffect } from 'react'
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Header from './components/Header'
import Footer from './components/Footer'
import FloatingChat from './components/FloatingChat'

import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

function ScrollToTop() {
  const { pathname } = useLocation()
  // Thân hàm phải là block: nếu viết arrow rút gọn, React coi giá trị trả về là hàm cleanup.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/** Thanh đặt lịch cố định đáy màn hình — chỉ hiện trên mobile (mobile-first). */
function MobileBookingBar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  if (pathname === '/dat-lich') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-900/10 bg-cream/95 px-4 py-3 backdrop-blur-md sm:hidden">
      <Link to="/dat-lich" className="btn-primary w-full">
        {t('common.bookNow')}
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dich-vu" element={<Services />} />
          <Route path="/khong-gian" element={<Gallery />} />
          <Route path="/dat-lich" element={<Booking />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/tin-tuc" element={<Blog />} />
          <Route path="/tin-tuc/:id" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <FloatingChat />
      <MobileBookingBar />
      {/* Chừa chỗ cho thanh đặt lịch cố định trên mobile */}
      <div className="h-16 sm:hidden" aria-hidden />
    </div>
  )
}
