// Thông tin doanh nghiệp — sửa tập trung tại đây, mọi trang đều dùng chung.
export const site = {
  brand: "DA NANG MY KHE SPA",
  brandShort: "My Khe Spa",
  logo: "/images/logo.jpg",

  phone: "+84 000 000 000",
  phoneHref: "tel:+84000000000",
  email: "hello@danangmykhespa.com",

  // Chi nhánh chính (yêu cầu: chỉ hiển thị 1 địa chỉ)
  address: "402 Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng",
  mapEmbed:
    "https://www.google.com/maps?q=402+V%C3%B5+Nguy%C3%AAn+Gi%C3%A1p,+Ng%C5%A9+H%C3%A0nh+S%C6%A1n,+%C4%90%C3%A0+N%E1%BA%B5ng&output=embed",
  mapLink: "https://maps.google.com/?q=402+Vo+Nguyen+Giap+Ngu+Hanh+Son+Da+Nang",

  hoursFrom: "09:00",
  hoursTo: "22:00",

  // Đánh giá Google — số lượt đánh giá vẫn là số tạm, cập nhật khi có con số thật
  google: {
    rating: 4.3,
    count: 486,
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",
  },

  social: {
    kakao: "https://pf.kakao.com/_xkXISj/chat",
    instagram: "https://www.instagram.com/danang_mykhe_spa",
  },
};

export const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", short: "VI", flag: "🇻🇳" },
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "ko", label: "한국어", short: "KO", flag: "🇰🇷" },
  { code: "ru", label: "Русский", short: "RU", flag: "🇷🇺" },
  { code: "zh", label: "中文", short: "ZH", flag: "🇨🇳" },
];
