// Thông tin doanh nghiệp — sửa tập trung tại đây, mọi trang đều dùng chung.
export const site = {
  brand: "DA NANG MY KHE SPA",
  brandShort: "My Khe Spa",
  logo: "/images/logo.jpg",

  // Hiển thị dạng quốc tế vì phần lớn khách là người nước ngoài;
  // số này bấm gọi được cả trong lẫn ngoài Việt Nam.
  phone: "+84 362 772 449",
  phoneHref: "tel:+84362772449",
  email: "hello@danangmykhespa.com",

  // Chi nhánh chính (yêu cầu: chỉ hiển thị 1 địa chỉ)
  address: "402 Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng",

  // Toạ độ lấy từ hồ sơ Google Business của spa, ghim đúng cửa hàng
  // thay vì để Google tự đoán theo địa chỉ dạng chữ.
  mapEmbed: "https://maps.google.com/maps?q=16.0424367,108.248137&z=17&output=embed",
  // cid = mã doanh nghiệp trên Google (0x45cbe7e550d22840 đổi sang hệ 10)
  mapLink: "https://maps.google.com/?cid=5029368380978767936",

  hoursFrom: "09:00",
  hoursTo: "22:00",

  // Đánh giá Google — cả hai số đều lấy từ hồ sơ thật của spa
  google: {
    rating: 4.3,
    count: 871,
    // Mở thẳng tab đánh giá của spa (đuôi !9m1!1b1), khách bấm "Viết bài đánh giá" ngay tại đó
    reviewUrl:
      "https://www.google.com/maps/place/Da+Nang+Mykhe+Spa/@16.0424418,108.2455621,2167m/data=!3m1!1e3!4m16!1m9!3m8!1s0x3142176637977605:0x45cbe7e550d22840!2sDa+Nang+Mykhe+Spa!8m2!3d16.0424367!4d108.248137!9m1!1b1!16s%2Fg%2F11fyzbpzpw!3m5!1s0x3142176637977605:0x45cbe7e550d22840!8m2!3d16.0424367!4d108.248137!16s%2Fg%2F11fyzbpzpw!5m1!1e1",
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
