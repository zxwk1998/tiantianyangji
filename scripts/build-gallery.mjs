// 纯静态站点构建脚本：扫描根目录下"日期文件夹"中的图片，
// 1) 生成 public/albums.json（前端直接 fetch 的静态清单）
// 2) 将图片复制到 public/<date>/，使 dev / build 都能以静态文件方式访问
// 不依赖任何后端 / API：最终产物 dist/ 是 100% 静态文件，可部署到任意静态托管。
import { readdir, writeFile, mkdir, copyFile, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..') // 项目根目录
const PUBLIC = path.join(ROOT, 'public')

// 日期文件夹命名：2026-08-23 / 20260823 / 20260823-2354 / 20260823-2354-01
const DATE_RE = /^(?:\d{4}-\d{2}-\d{2}|\d{8}(?:-\d{1,4})?)$/
const IMG_RE = /\.(png|jpe?g|gif|webp|svg|bmp)$/i

async function listDir(dir) {
  try {
    return await readdir(dir)
  } catch {
    return []
  }
}

async function isDir(p) {
  try {
    return (await stat(p)).isDirectory()
  } catch {
    return false
  }
}

// 仅在源文件比目标更新或大小不一致时才复制，避免每日重复全量拷贝
async function copyIfNewer(src, dest) {
  await mkdir(path.dirname(dest), { recursive: true })
  let need = true
  try {
    const [s, d] = await Promise.all([stat(src), stat(dest)])
    need = s.mtimeMs > d.mtimeMs || s.size !== d.size
  } catch {
    /* 目标不存在 */
  }
  if (need) await copyFile(src, dest)
}

async function main() {
  const rootEntries = await listDir(ROOT)
  const dateFolders = rootEntries.filter((n) => DATE_RE.test(n)).sort().reverse()

  const albums = []
  let copied = 0
  for (const date of dateFolders) {
    const srcDir = path.join(ROOT, date)
    if (!(await isDir(srcDir))) continue
    const files = (await listDir(srcDir)).filter((f) => IMG_RE.test(f)).sort()
    if (!files.length) continue
    const images = []
    for (const f of files) {
      const src = path.join(srcDir, f)
      const dest = path.join(PUBLIC, date, f)
      await copyIfNewer(src, dest)
      copied++
      images.push({ name: f, url: `/${date}/${encodeURIComponent(f)}` })
    }
    albums.push({ date, images })
  }

  // 清理：根目录已删除的日期文件夹，其 public 副本也应移除，保证清单与文件一致
  const pubEntries = await listDir(PUBLIC)
  for (const n of pubEntries) {
    if (DATE_RE.test(n) && !dateFolders.includes(n)) {
      await rm(path.join(PUBLIC, n), { recursive: true, force: true })
    }
  }

  await mkdir(PUBLIC, { recursive: true })
  await writeFile(path.join(PUBLIC, 'albums.json'), JSON.stringify(albums, null, 2))

  const total = albums.reduce((s, a) => s + a.images.length, 0)
  console.log(
    `[build-gallery] 共 ${albums.length} 个日期相册 / ${total} 张图片 → public/albums.json（本次复制 ${copied} 张）`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
