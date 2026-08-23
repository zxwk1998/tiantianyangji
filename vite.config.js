import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))

// 匹配根目录下「日期格式」的文件夹：
//   2026-08-23  /  20260823  /  20260823-2354
const DATE_RE = /^(?:\d{4}-\d{2}-\d{2}|\d{8}(?:-\d{1,4})?)$/
const IMG_RE = /\.(png|jpe?g|gif|webp|bmp|svg)$/i

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.bmp': 'image/bmp',
  '.svg': 'image/svg+xml'
}

function galleryPlugin() {
  return {
    name: 'gallery-server',
    configureServer(server) {
      // 直接在 configureServer 阶段注册，确保早于 Vite 的 SPA 回退中间件
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]

        // 1) 返回所有日期相册及其图片列表
        if (url === '/api/albums') {
          try {
            const dirs = fs
              .readdirSync(ROOT, { withFileTypes: true })
              .filter((e) => e.isDirectory() && DATE_RE.test(e.name))

            const albums = dirs
              .map((e) => {
                const dirPath = path.join(ROOT, e.name)
                let files = []
                try {
                  files = fs.readdirSync(dirPath)
                } catch {
                  files = []
                }
                const images = files
                  .filter((f) => IMG_RE.test(f))
                  .sort((a, b) => a.localeCompare(b))
                  .map((f) => ({
                    name: f,
                    url: `/img/${encodeURIComponent(e.name)}/${encodeURIComponent(f)}`
                  }))
                return { date: e.name, images }
              })
              .filter((a) => a.images.length > 0)
              .sort((a, b) => b.date.localeCompare(a.date))

            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.setHeader('Cache-Control', 'no-store')
            res.end(JSON.stringify(albums))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: String(err) }))
          }
          return
        }

        // 2) 提供图片文件流（虚拟 /img 路径，映射到根目录下的日期文件夹）
        if (url.startsWith('/img/')) {
          const rel = decodeURIComponent(url.slice('/img/'.length))
          if (rel.includes('..') || rel.startsWith('/')) {
            res.statusCode = 400
            return res.end('Bad request')
          }
          const filePath = path.join(ROOT, rel)
          if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath)) {
            res.statusCode = 404
            return res.end('Not found')
          }
          const ext = path.extname(filePath).toLowerCase()
          res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
          res.setHeader('Cache-Control', 'public, max-age=3600')
          fs.createReadStream(filePath).pipe(res)
          return
        }

        next()
      })
    }
  }
}

export default defineConfig({
  plugins: [vue(), galleryPlugin()],
  server: {
    port: 5173,
    open: false
  }
})
