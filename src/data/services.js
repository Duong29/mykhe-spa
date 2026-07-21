// Danh mục dịch vụ & giá lấy nguyên từ bảng menu tại quầy lễ tân.
// vnd/usd = null nghĩa là spa không phục vụ mốc thời lượng đó.
// Tên & mô tả nằm trong file ngôn ngữ: services.<id>.name / services.<id>.desc

export const CATEGORIES = ['massage', 'combo', 'single']

export const services = [
  // ---------- MASSAGE ----------
  {
    id: 'aroma',
    category: 'massage',
    image: '/images/massage-service.png',
    featured: true,
    prices: [
      { min: 60, vnd: 750000, usd: 28 },
      { min: 90, vnd: 950000, usd: 36 },
      { min: 120, vnd: 1150000, usd: 44 },
    ],
  },
  {
    id: 'hotStone',
    category: 'massage',
    image: '/images/hotstone.png',
    featured: true,
    prices: [
      { min: 60, vnd: null, usd: null },
      { min: 90, vnd: 1000000, usd: 38 },
      { min: 120, vnd: 1250000, usd: 46 },
    ],
  },
  {
    id: 'dry',
    category: 'massage',
    image: '/images/room-couple.png',
    prices: [
      { min: 60, vnd: 750000, usd: 28 },
      { min: 90, vnd: 950000, usd: 36 },
      { min: 120, vnd: null, usd: null },
    ],
  },
  {
    id: 'footSpa',
    category: 'massage',
    image: '/images/room-shelf-2.jpg',
    featured: true,
    prices: [
      { min: 60, vnd: 550000, usd: 20 },
      { min: 90, vnd: 800000, usd: 30 },
      { min: 120, vnd: null, usd: null },
    ],
  },
  {
    id: 'prenatal',
    category: 'massage',
    image: '/images/room-group.png',
    prices: [
      { min: 60, vnd: 750000, usd: 28 },
      { min: 90, vnd: 950000, usd: 36 },
      { min: 120, vnd: 1150000, usd: 44 },
    ],
  },
  {
    id: 'fourHands',
    category: 'massage',
    image: '/images/room-shelf-dark.jpg',
    featured: true,
    prices: [
      { min: 60, vnd: 1250000, usd: 46 },
      { min: 90, vnd: 1450000, usd: 54 },
      { min: 120, vnd: null, usd: null },
    ],
  },
  {
    id: 'kids',
    category: 'massage',
    image: '/images/room-twin.png',
    // Điều kiện dùng gói trẻ em — hiển thị kèm mọi nơi có dịch vụ này
    maxHeightCm: 140,
    prices: [
      { min: 60, vnd: 270000, usd: 10 },
      { min: 90, vnd: 400000, usd: 15 },
      { min: 120, vnd: 550000, usd: 20 },
    ],
  },
  {
    id: 'vip',
    category: 'massage',
    image: '/images/lounge-evening.jpg',
    featured: true,
    prices: [
      { min: 60, vnd: null, usd: null },
      { min: 90, vnd: 1900000, usd: 70 },
      { min: 120, vnd: 2100000, usd: 80 },
    ],
  },

  // ---------- COMBO GỘI ĐẦU + MASSAGE ----------
  {
    id: 'shampooEar',
    category: 'combo',
    image: '/images/shampoo-service.png',
    featured: true,
    prices: [{ min: 60, vnd: 500000, usd: 19 }],
  },
  {
    id: 'shampooBody60',
    category: 'combo',
    image: '/images/shampoo-room.png',
    prices: [{ min: 90, vnd: 1000000, usd: 38 }],
  },
  {
    id: 'shampooBody90',
    category: 'combo',
    image: '/images/shampoo-service.png',
    prices: [{ min: 120, vnd: 1200000, usd: 45 }],
  },
  {
    id: 'shampooEarBody',
    category: 'combo',
    image: '/images/shampoo-cart.png',
    prices: [{ min: 120, vnd: 1100000, usd: 41 }],
  },
  {
    id: 'shampoo60Body60',
    category: 'combo',
    image: '/images/shampoo-room.png',
    prices: [{ min: 120, vnd: 1100000, usd: 41 }],
  },

  // ---------- DỊCH VỤ LẺ ----------
  {
    id: 'shampoo30',
    category: 'single',
    image: '/images/shampoo-service.png',
    prices: [{ min: 30, vnd: 350000, usd: 13 }],
  },
  {
    id: 'shampoo60',
    category: 'single',
    image: '/images/shampoo-room.png',
    prices: [{ min: 60, vnd: 500000, usd: 19 }],
  },
  {
    id: 'earCleaning',
    category: 'single',
    image: '/images/shampoo-cart.png',
    prices: [{ min: 30, vnd: 250000, usd: 9 }],
  },
]

// Bảng tip tham khảo in trên menu tại quầy
/**
 * Bảng tip in trên menu tại quầy. Để dạng dữ liệu (không phải chuỗi có sẵn)
 * để vừa dựng được bảng tham khảo, vừa tra ra đúng mức tip cho một đơn cụ thể.
 * dry = mức riêng cho massage khô và massage bốn tay.
 */
export const tipGuide = [
  { min: 60, vnd: 50000, usd: 2 },
  { min: 90, vnd: 80000, usd: 3 },
  { min: 120, vnd: 130000, usd: 5 },
  { min: 60, vnd: 110000, usd: 4, dry: true },
  { min: 90, vnd: 160000, usd: 6, dry: true },
]

const DRY_TIP_SERVICES = new Set(['dry', 'fourHands'])

/** Mức tip cho một lựa chọn cụ thể. Trả null nếu gói đã bao gồm tip. */
export const tipFor = (service, minutes) => {
  if (!service || isTipIncluded(minutes)) return null
  const dry = DRY_TIP_SERVICES.has(service.id)
  return (
    tipGuide.find((r) => r.min === minutes && Boolean(r.dry) === dry) ||
    tipGuide.find((r) => r.min === minutes && !r.dry) ||
    null
  )
}

export const featuredServices = services.filter((s) => s.featured)

export const findService = (id) => services.find((s) => s.id === id)

export const formatVnd = (v) => (v == null ? '—' : v.toLocaleString('vi-VN') + '₫')
export const formatUsd = (v) => (v == null ? '—' : '$' + v)

/** Giá thấp nhất của một dịch vụ — dùng cho thẻ "từ ..." */
export const fromPrice = (service) => {
  const valid = service.prices.filter((p) => p.vnd != null)
  return valid.length ? valid.reduce((a, b) => (a.vnd < b.vnd ? a : b)) : null
}

/* ---------------------- Ưu đãi đặt lịch trực tuyến ---------------------- */

export const ONLINE_DISCOUNT = 0.2

/**
 * Ưu đãi 20% áp dụng cho toàn menu, trừ dịch vụ trẻ em và các gói 30 phút.
 * Đây là nguồn duy nhất quyết định giảm giá — mọi nơi hiển thị tiền đều hỏi hàm này
 * để không có chỗ nào lệch chỗ nào.
 */
export const isDiscountable = (service, minutes) =>
  Boolean(service) && service.id !== 'kids' && minutes !== 30

/** Làm tròn xuống bội số 1.000₫ cho gọn hoá đơn */
export const discountVnd = (vnd, service, minutes) =>
  vnd == null || !isDiscountable(service, minutes)
    ? vnd
    : Math.round((vnd * (1 - ONLINE_DISCOUNT)) / 1000) * 1000

export const discountUsd = (usd, service, minutes) =>
  usd == null || !isDiscountable(service, minutes)
    ? usd
    : Math.round(usd * (1 - ONLINE_DISCOUNT))

/** Gói 30 phút đã bao gồm tiền tip, khách không phải đưa thêm */
export const isTipIncluded = (minutes) => minutes === 30

/**
 * Tổng tiền của một đơn đặt lịch.
 * Khách trong cùng một đơn luôn đồng nhất: gói trẻ em thì toàn trẻ em,
 * các gói còn lại thì toàn người lớn — nên chỉ cần một mức giảm cho cả đơn.
 */
export const bookingTotals = (priceRow, service, minutes, guests) => {
  if (!priceRow?.vnd || guests < 1) {
    return { before: null, beforeUsd: null, after: null, afterUsd: null, discounted: false }
  }

  const before = priceRow.vnd * guests
  const beforeUsd = priceRow.usd == null ? null : priceRow.usd * guests

  return {
    before,
    beforeUsd,
    after: discountVnd(before, service, minutes),
    afterUsd: discountUsd(beforeUsd, service, minutes),
    discounted: isDiscountable(service, minutes),
  }
}
