import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 纯静态站点：无后端 / 无 API 中间件。
// 图片与 albums.json 均在构建期由 scripts/build-gallery.mjs 生成为 public/ 下的静态文件。
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: false
  },
  preview: {
    port: 4173,
    open: false
  }
})
