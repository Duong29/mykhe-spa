import { useEffect, useRef, useState } from 'react'
import manifest from '../data/images.json'

// Phải khớp với WIDTHS trong scripts/optimize-images.mjs
const WIDTHS = [160, 480, 800, 1440]

/** Các bản đã sinh cho một ảnh — không bao giờ vượt quá kích thước gốc. */
function variantsOf(meta) {
  const list = WIDTHS.filter((w) => w <= meta.w)
  if (!list.includes(meta.w) && meta.w < Math.max(...WIDTHS)) list.push(meta.w)
  return list.sort((a, b) => a - b)
}

/**
 * Thẻ ảnh dùng chung: tự gắn srcset WebP nhiều kích thước, lazy-load,
 * khai báo tỉ lệ khung để trang không bị nhảy, và fade nhẹ khi ảnh tải xong.
 *
 * `src` cứ truyền đường dẫn gốc như cũ ('/images/room-couple.png'),
 * component tự quy đổi sang các bản .webp tương ứng.
 *
 * `priority`: đặt true cho ảnh nằm ngay màn hình đầu (hero). Ảnh đó sẽ được
 * tải sớm nhất có thể và bỏ qua fade để không làm chậm điểm LCP.
 */
export default function Img({
  src,
  alt = '',
  sizes = '100vw',
  priority = false,
  className = '',
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  // Ảnh nằm sẵn trong cache thì onLoad đã chạy xong trước khi React gắn handler
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [])

  const base = src.replace(/^.*\/images\//, '').replace(/\.[^.]+$/, '')
  const meta = manifest[base]

  if (!meta) {
    if (import.meta.env.DEV) {
      console.warn(
        `[Img] Không có "${base}" trong images.json — chạy: node scripts/optimize-images.mjs`,
      )
    }
    return <img src={src} alt={alt} className={className} {...rest} />
  }

  const widths = variantsOf(meta)
  const srcSet = widths.map((w) => `/images/${base}-${w}.webp ${w}w`).join(', ')
  const fallback = widths.filter((w) => w <= 800).pop() ?? widths[0]

  return (
    <img
      ref={ref}
      src={`/images/${base}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={meta.w}
      height={meta.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
      className={`${className} ${
        priority ? '' : `transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`
      }`}
      {...rest}
    />
  )
}
