/**
 * Hàng nút lọc.
 * Mobile: lưới 2 cột — các nút bằng nhau, không bị wrap lẻ loi một nút ở dòng cuối.
 * Từ sm trở lên: pill nằm ngang, canh giữa như cũ.
 */
export default function FilterTabs({ items, value, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={`grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2.5 ${className}`}
    >
      {items.map((item) => {
        const active = value === item.key
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={`flex min-h-11 items-center justify-center text-balance rounded-full px-4 py-2.5
              text-center text-[13px] leading-snug font-medium transition sm:text-sm ${
                active
                  ? 'bg-clay-500 text-white shadow-md shadow-clay-500/25'
                  : 'bg-white text-ink-700 ring-1 ring-ink-900/10 hover:text-clay-600'
              }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
