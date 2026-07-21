/**
 * Sinh ảnh WebP nhiều kích thước cho website.
 *
 *   node scripts/optimize-images.mjs           # sinh ảnh, giữ nguyên file gốc
 *   node scripts/optimize-images.mjs --clean   # sinh xong xoá luôn PNG/JPG gốc
 *
 * Ảnh gốc độ phân giải đầy đủ được lưu ngoài repo tại D:\Spa_Image.
 * Chạy lại script này bất cứ lúc nào cần xuất lại.
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const IMG_DIR = 'public/images'
const MANIFEST = 'src/data/images.json'

// 160 cho thumbnail bước đặt lịch, 1440 cho ảnh nền tràn màn hình.
const WIDTHS = [160, 480, 800, 1440]
const QUALITY = 78

const clean = process.argv.includes('--clean')
// Hai file này do chính script sinh ra, không được coi là ảnh gốc,
// nếu không chạy lần hai với --clean sẽ xoá nhầm chúng.
const GENERATED = new Set(['og-image.jpg', 'favicon.png'])

// Ảnh sinh ra chủ yếu là .webp nên chỉ cần lọc đúng đuôi ảnh gốc.
// (Cẩn thận: tên như lounge-1.png là ảnh gốc, không phải bản đã resize.)
const isSource = (f) => /\.(png|jpe?g)$/i.test(f) && !GENERATED.has(f.toLowerCase())

const kb = (n) => (n / 1024).toFixed(0) + ' KB'

async function run() {
  const files = (await fs.readdir(IMG_DIR)).filter(isSource)
  if (!files.length) {
    console.log('Không tìm thấy ảnh gốc trong ' + IMG_DIR)
    return
  }

  const manifest = {}
  let before = 0
  let after = 0

  for (const file of files) {
    const full = path.join(IMG_DIR, file)
    const base = file.replace(/\.[^.]+$/, '')
    const src = sharp(full)
    const meta = await src.metadata()

    before += (await fs.stat(full)).size
    manifest[base] = { w: meta.width, h: meta.height }

    // Không phóng to quá ảnh gốc — vô nghĩa và chỉ tốn dung lượng
    const widths = WIDTHS.filter((w) => w <= meta.width)
    if (!widths.includes(meta.width) && meta.width < Math.max(...WIDTHS)) {
      widths.push(meta.width)
    }

    const out = []
    for (const w of widths) {
      const dest = path.join(IMG_DIR, `${base}-${w}.webp`)
      await sharp(full)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(dest)
      const size = (await fs.stat(dest)).size
      after += size
      out.push(`${w}w ${kb(size)}`)
    }

    console.log(`${file.padEnd(26)} ${String(meta.width) + 'x' + meta.height}  ->  ${out.join('  ')}`)
  }

  // Ảnh chia sẻ mạng xã hội: nhiều nền tảng vẫn chưa đọc tốt WebP nên xuất JPEG
  if (files.includes('lounge-evening.jpg')) {
    await sharp(path.join(IMG_DIR, 'lounge-evening.jpg'))
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(IMG_DIR, 'og-image.jpg'))
  }

  // Favicon: giữ PNG cho chắc ăn với mọi trình duyệt
  if (files.includes('logo.jpg')) {
    await sharp(path.join(IMG_DIR, 'logo.jpg'))
      .resize(96, 96, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(path.join(IMG_DIR, 'favicon.png'))
  }

  // Gộp vào manifest cũ thay vì ghi đè: cho phép xử lý lại đúng một ảnh
  // mà không xoá mất kích thước của những ảnh đã sinh từ trước.
  let previous = {}
  try {
    previous = JSON.parse(await fs.readFile(MANIFEST, 'utf8'))
  } catch {
    /* chưa có manifest thì thôi */
  }
  const merged = Object.fromEntries(
    Object.entries({ ...previous, ...manifest }).sort(([a], [b]) => a.localeCompare(b)),
  )

  await fs.mkdir(path.dirname(MANIFEST), { recursive: true })
  await fs.writeFile(MANIFEST, JSON.stringify(merged, null, 2) + '\n')

  console.log('\n' + '-'.repeat(70))
  console.log(`Ảnh gốc   : ${(before / 1024 / 1024).toFixed(1)} MB (${files.length} file)`)
  console.log(`WebP sinh : ${(after / 1024 / 1024).toFixed(1)} MB (mọi kích thước cộng lại)`)
  console.log(`Đã ghi    : ${MANIFEST}`)

  if (clean) {
    for (const file of files) await fs.unlink(path.join(IMG_DIR, file))
    console.log(`Đã xoá    : ${files.length} file gốc PNG/JPG`)
  } else {
    console.log('\nChạy lại với --clean để xoá file gốc sau khi đã kiểm tra.')
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
