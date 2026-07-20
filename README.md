# Da Nang My Khe Spa — Website

Giao diện website spa: giới thiệu thương hiệu + hệ thống đặt lịch online, 6 trang, 5 ngôn ngữ.
Dựng bằng **React 18 + Vite + Tailwind CSS v4**, không cần backend để chạy thử.

## Chạy dự án

```bash
npm install      # đã cài sẵn
npm run dev      # http://localhost:5173
npm run build    # xuất bản ra thư mục dist/
npm run preview  # xem thử bản build
```

## Cấu trúc

```
public/images/          27 ảnh thật của spa (đã đổi tên gọn)
src/
  data/site.js          ← THÔNG TIN CẦN SỬA: SĐT, email, Zalo, Google Place ID…
  data/services.js      16 dịch vụ + giá lấy từ menu tại quầy
  i18n/locales/         vi · en · ko · ru · zh (186 chuỗi mỗi ngôn ngữ)
  components/           Header, Footer, FloatingChat, GoogleReview, ServiceCard…
  pages/                Home, Services, Gallery, Booking, Contact, Blog, BlogPost
```

## Các trang

| Đường dẫn      | Trang                                                          |
| -------------- | -------------------------------------------------------------- |
| `/`            | Trang chủ — hero, giới thiệu, dịch vụ nổi bật, không gian, đánh giá |
| `/dich-vu`     | Dịch vụ — lọc theo nhóm, thẻ dịch vụ, bảng giá đầy đủ, gợi ý tip |
| `/khong-gian`  | Gallery — lọc theo nhóm, lightbox (phím ←/→/Esc)                |
| `/dat-lich`    | Đặt lịch — wizard 4 bước                                        |
| `/lien-he`     | Liên hệ — thông tin, form, bản đồ, Google Review                |
| `/tin-tuc`     | Blog — 4 bài mẫu, có trang chi tiết `/tin-tuc/:id`              |

## Cần thay trước khi lên production

Tất cả nằm trong **`src/data/site.js`**:

- `phone`, `phoneHref`, `email` — hiện là số giả `+84 000 000 000`
- `social.zalo` / `social.messenger` / `social.kakao` / `social.instagram`
- `google.reviewUrl` — thay `YOUR_PLACE_ID` bằng Place ID thật để nút đánh giá hoạt động
- `google.rating` / `google.count` — số liệu đánh giá thật
- `booking.telegramBot`, `booking.receptionEmail` — kênh nhận đơn của lễ tân

Ngoài ra trong `src/pages/Home.jsx` có mảng `stats` (8+ năm, 3.000+ khách/tháng, 12 phòng) —
đây là số phỏng đoán, cần thay bằng số thật.

## Luồng đặt lịch

Chọn dịch vụ + thời lượng → chọn ngày/giờ/số khách → nhập thông tin → xác nhận.

Vì spa chưa có phần mềm quản lý riêng, sau khi xác nhận hệ thống sẽ:

1. Lưu tạm đơn vào `localStorage` (key `mykhe-bookings`)
2. Hiển thị nội dung đơn đã định dạng sẵn kèm 3 nút chuyển tiếp: **Zalo · Telegram · Email**

Khi có backend, chỉ cần thay hàm `submit()` trong `src/pages/Booking.jsx` bằng một lệnh gọi API.

## Đa ngôn ngữ

Đổi ngôn ngữ ở header (dropdown cạnh logo). Lựa chọn được nhớ trong `localStorage`;
lần đầu vào web sẽ tự đoán theo ngôn ngữ trình duyệt, mặc định là tiếng Việt.

Thêm/sửa nội dung: `src/i18n/locales/<mã>.js` — cả 5 file dùng chung một bộ khoá.
