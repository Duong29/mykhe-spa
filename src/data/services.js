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
export const tipGuide = [
  { label: '60′', vnd: 50000, usd: 2 },
  { label: '90′', vnd: 80000, usd: 3 },
  { label: '120′', vnd: 130000, usd: 5 },
  { label: 'Dry / Four hands 60′', vnd: 110000, usd: 4 },
  { label: 'Dry / Four hands 90′', vnd: 160000, usd: 6 },
]

export const featuredServices = services.filter((s) => s.featured)

export const findService = (id) => services.find((s) => s.id === id)

export const formatVnd = (v) => (v == null ? '—' : v.toLocaleString('vi-VN') + '₫')
export const formatUsd = (v) => (v == null ? '—' : '$' + v)

/** Giá thấp nhất của một dịch vụ — dùng cho thẻ "từ ..." */
export const fromPrice = (service) => {
  const valid = service.prices.filter((p) => p.vnd != null)
  return valid.length ? valid.reduce((a, b) => (a.vnd < b.vnd ? a : b)) : null
}
