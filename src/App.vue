<template>
  <div class="app">
    <!-- 顶栏：玻璃拟态 -->
    <header class="topbar">
      <div class="brand">
        <img class="logo" :src="BASE + 'icon.svg'" alt="天天养基" />
        <div class="brand-text">
          <h1>天天养基 · 图片馆</h1>
          <p class="sub">基金 / 股票每日快照 · 本地画廊</p>
        </div>
      </div>
      <div class="top-actions">
        <div class="hero3d-wrap"><Hero3D /></div>
        <span class="status" v-if="lastUpdate">{{ lastUpdate }}</span>
        <button class="refresh" :class="{ spinning: loading }" @click="load" :disabled="loading">
          <span class="ic">↻</span>{{ loading ? '同步中' : '刷新' }}
        </button>
      </div>
    </header>

    <!-- 概览统计 -->
    <section class="stats" v-if="albums.length">
      <a
        class="stat stat-link"
        href="https://niulai.vuejs-core.cn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="stat-ic"><Trophy3D /></div>
        <div class="stat-body">
          <div class="stat-num">天天养基</div>
          <div class="stat-label">返回主站 ↗</div>
        </div>
      </a>
      <div class="stat">
        <div class="stat-ic"><Calendar3D /></div>
        <div class="stat-body">
          <div class="stat-num">{{ albums.length }}</div>
          <div class="stat-label">累计天数</div>
        </div>
      </div>
      <div class="stat">
        <div class="stat-ic"><Stack3D /></div>
        <div class="stat-body">
          <div class="stat-num">{{ totalImages }}</div>
          <div class="stat-label">快照总数</div>
        </div>
      </div>
      <div class="stat">
        <div class="stat-ic"><Star3D /></div>
        <div class="stat-body">
          <div class="stat-num">{{ albums[0] ? formatDate(albums[0].date) : '—' }}</div>
          <div class="stat-label">最新快照</div>
        </div>
      </div>
    </section>

    <div class="layout">
      <!-- 侧边日期栏 -->
      <aside class="sidebar">
        <div class="sidebar-title">日期归档</div>
        <ul class="date-list">
          <li
            v-for="a in albums"
            :key="a.date"
            :class="{ active: a.date === selected }"
            @click="select(a.date)"
          >
            <span class="dot" v-if="a.date === albums[0]?.date"></span>
            <span class="date">{{ formatDate(a.date) }}</span>
            <span class="count">{{ a.images.length }}</span>
          </li>
          <li v-if="!loading && !albums.length" class="empty">暂无快照文件夹</li>
          <li v-if="loading" class="empty">读取中…</li>
        </ul>
      </aside>

      <!-- 内容区 -->
      <main class="content">
        <div v-if="!selectedAlbum && !loading" class="placeholder">
          <div class="ph-icon">🗂️</div>
          <p>从左侧选择日期，浏览当日的基金 / 股票快照</p>
        </div>

        <div v-else-if="!selectedAlbum && loading" class="skeleton-grid">
          <div class="skel-card" v-for="n in 8" :key="n"></div>
        </div>

        <template v-else>
          <div class="content-head">
            <h2>{{ formatDate(selectedAlbum.date) }}</h2>
            <span class="badge">{{ selectedAlbum.images.length }} 张</span>
          </div>

          <!-- 图片网格 -->
          <div class="grid">
            <div
              v-for="(img, i) in selectedAlbum.images"
              :key="img.name"
              class="card"
              :style="{ animationDelay: i * 45 + 'ms' }"
              @mousemove="onCardMove"
              @mouseleave="onCardLeave"
              @click="openLightbox(i)"
            >
              <div class="thumb">
                <img :src="img.url" :alt="img.name" loading="lazy" @error="onImgError" />
              </div>
              <div class="card-foot">
                <span class="fname" :title="img.name">{{ labelFor(img.name) }}</span>
                <span class="expand">⤢</span>
              </div>
            </div>
          </div>
        </template>
      </main>
    </div>

    <!-- 灯箱 -->
    <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox">
      <div class="lb-actions" v-if="currentImage">
        <a class="lb-btn lb-act" :href="currentImage.url" :download="currentImage.name" title="下载原图">⬇</a>
        <a class="lb-btn lb-act" :href="currentImage.url" target="_blank" rel="noopener" title="新标签打开原图">↗</a>
      </div>
      <button class="lb-btn lb-close" @click="closeLightbox" title="关闭 (Esc)">✕</button>
      <button
        class="lb-btn lb-nav prev"
        v-if="selectedAlbum && selectedAlbum.images.length > 1"
        @click.stop="prev"
        title="上一张 (←)"
      >‹</button>

      <div class="lb-stage">
        <img v-if="currentImage" class="lb-img" :src="currentImage.url" :alt="currentImage.name" />
      </div>

      <button
        class="lb-btn lb-nav next"
        v-if="selectedAlbum && selectedAlbum.images.length > 1"
        @click.stop="next"
        title="下一张 (→)"
      >›</button>

      <div class="lb-bottom" v-if="selectedAlbum">
        <div class="lb-cap">{{ currentImage ? labelFor(currentImage.name) : '' }}</div>
        <div class="lb-counter">{{ lightboxIndex + 1 }} / {{ selectedAlbum.images.length }}</div>
        <div class="lb-thumbs" v-if="selectedAlbum.images.length > 1">
          <button
            v-for="(t, i) in selectedAlbum.images"
            :key="t.name"
            class="lb-thumb"
            :class="{ on: i === lightboxIndex }"
            @click.stop="lightboxIndex = i"
          >
            <img :src="t.url" :alt="t.name" @error="onImgError" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { Trophy3D, Calendar3D, Stack3D, Star3D, Hero3D } from './components/Icon3D.vue'

// Vite 构建时替换为 base（GitHub Pages 子路径下为 /tiantianyangji/，dev 为 /）
const BASE = import.meta.env.BASE_URL

const albums = ref([])
const selected = ref('')
const loading = ref(false)
const lightboxIndex = ref(null)
const lastUpdate = ref('')

const selectedAlbum = computed(
  () => albums.value.find((a) => a.date === selected.value) || null
)
const currentImage = computed(() => {
  if (!selectedAlbum.value || lightboxIndex.value === null) return null
  return selectedAlbum.value.images[lightboxIndex.value]
})
const totalImages = computed(() =>
  albums.value.reduce((sum, a) => sum + a.images.length, 0)
)

async function load() {
  loading.value = true
  try {
    const res = await fetch(BASE + 'albums.json', { cache: 'no-store' })
    const data = await res.json()
    albums.value = (Array.isArray(data) ? data : []).map((a) => ({
      ...a,
      images: a.images.map((img) => ({ ...img, url: BASE + img.url.replace(/^\//, '') })),
    }))
    if (albums.value.length) {
      const stillExists = albums.value.some((a) => a.date === selected.value)
      if (!stillExists) selected.value = albums.value[0].date
    } else {
      selected.value = ''
    }
    const now = new Date()
    lastUpdate.value = '更新于 ' + now.toLocaleTimeString('zh-CN', { hour12: false })
  } catch (e) {
    console.error('加载相册失败', e)
  } finally {
    loading.value = false
  }
}

function select(date) {
  selected.value = date
  nextTick(() => {
    const el = document.querySelector('.date-list li.active')
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  })
}
// 图片卡片鼠标跟随 3D 倾斜
function onCardMove(e) {
  const el = e.currentTarget
  el.classList.add('tilting')
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(900px) rotateY(${(x * 14).toFixed(2)}deg) rotateX(${(-y * 14).toFixed(2)}deg) translateY(-8px)`
}
function onCardLeave(e) {
  const el = e.currentTarget
  el.classList.remove('tilting')
  el.style.transform = ''
}
function openLightbox(i) {
  lightboxIndex.value = i
}
function closeLightbox() {
  lightboxIndex.value = null
}
function prev() {
  if (!selectedAlbum.value) return
  const n = selectedAlbum.value.images.length
  lightboxIndex.value = (lightboxIndex.value - 1 + n) % n
}
function next() {
  if (!selectedAlbum.value) return
  const n = selectedAlbum.value.images.length
  lightboxIndex.value = (lightboxIndex.value + 1) % n
}

// 图片加载失败兜底
const BROKEN =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#eef1f8"/><text x="50%" y="50%" font-size="14" fill="#8a9793" text-anchor="middle" dominant-baseline="middle">图片缺失</text></svg>'
  )
function onImgError(e) {
  const t = e.target
  if (t.dataset.fb) return
  t.dataset.fb = '1'
  t.src = BROKEN
}

// 文件名 → 中文标签
const NAME_MAP = {
  longhu: '龙虎榜',
  qdii: 'QDII 估值',
  qdii_funds: 'QDII 基金',
  rankings: '基金排行',
  rankings_funds: '基金排名',
  tiantian_rank: '天天排行',
  market_indices: '市场指数',
  a_share_industries: 'A股行业',
  a_kill: 'A股杀跌',
  flat_stock: '横盘个股',
  stock_hot: '热门个股',
  fund_hold_ranking: '基金持仓排行',
  fund_manager: '基金经理',
  fund_limit: '基金限购',
  fund_us_ratio: '基金美股权重',
  block_list: '板块榜单',
  block_surge: '板块涨幅',
  sector_rotation: '板块轮动',
  sector_capital_flow: '板块资金流',
  double_bottom: '双底形态',
  tail_rush: '尾盘拉升',
  quant_pick: '量化精选',
  market: '市场概览',
  quant: '量化信号',
  news: '财经新闻',
  block: '板块榜'
}
function labelFor(name) {
  const base = name.replace(/\.[^.]+$/, '').toLowerCase().replace(/-/g, '_')
  return NAME_MAP[base] || name
}

function formatDate(raw) {
  const m = raw.match(/^(\d{4})[-]?(\d{2})[-]?(\d{2})(?:[-]?(\d{2})[-]?(\d{2}))?$/)
  if (m) {
    const [, y, mo, d, h, mi] = m
    return h ? `${y}-${mo}-${d} ${h}:${mi}` : `${y}-${mo}-${d}`
  }
  return raw
}

function onKey(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

let timer = null
// 仅当标签页可见时才刷新，避免后台轮询打断查看
function tick() {
  if (document.visibilityState === 'visible') load()
}
onMounted(() => {
  load()
  window.addEventListener('keydown', onKey)
  document.addEventListener('visibilitychange', tick)
  timer = setInterval(tick, 5 * 60 * 1000)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.removeEventListener('visibilitychange', tick)
  if (timer) clearInterval(timer)
})
</script>

<style>
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  height: 100%;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Microsoft YaHei', sans-serif;
  color: #0f172a;
  background: radial-gradient(1200px 600px at 80% -10%, #eef0fb 0%, transparent 60%),
    radial-gradient(900px 500px at -10% 10%, #eef4ff 0%, transparent 55%), #f6f7fb;
}
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  opacity: 0.035;
}
#app {
  height: 100vh;
}
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
}

/* 顶栏 */
.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 26px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.logo {
  width: 44px;
  height: 44px;
  border-radius: 13px;
  object-fit: cover;
  background: linear-gradient(135deg, #5568d3, #6a7de0);
  box-shadow: 0 6px 18px rgba(85, 104, 211, 0.35);
}
.brand-text h1 {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.3px;
}
.sub {
  margin: 2px 0 0;
  font-size: 12px;
  color: #7c8a86;
}
.top-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.status {
  font-size: 12px;
  color: #94a3a8;
}
.refresh {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: linear-gradient(135deg, #5568d3, #6a7de0);
  color: #fff;
  padding: 9px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(85, 104, 211, 0.3);
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
}
.refresh:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(85, 104, 211, 0.4);
}
.refresh:disabled {
  opacity: 0.7;
  cursor: default;
}
.refresh .ic {
  display: inline-block;
  font-size: 14px;
}
.refresh.spinning .ic {
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 统计卡片 */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;
  padding: 20px 26px 4px;
  max-width: 1200px;
}
.stat {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}
.stat-ic {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  padding: 9px;
  background: linear-gradient(135deg, #eef0fb, #e3e8fb);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 6px 14px rgba(85, 104, 211, 0.12);
}
.stat-num {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}
.stat-label {
  font-size: 12px;
  color: #8a9793;
  margin-top: 2px;
}
.stat-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  outline: 1px solid transparent;
  transition: transform 0.16s ease, box-shadow 0.16s ease, outline-color 0.16s ease;
}
.stat-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 26px rgba(85, 104, 211, 0.22);
  outline-color: rgba(85, 104, 211, 0.5);
}
.stat-link .stat-num {
  color: #3d4fb0;
}

/* 布局 */
.layout {
  flex: 1;
  display: flex;
  min-height: 0;
  padding: 16px 26px 26px;
  gap: 20px;
}

/* 侧栏 */
.sidebar {
  width: 300px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(15, 23, 42, 0.05);
  border-radius: 16px;
  padding: 14px 12px;
  overflow-y: auto;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}
.sidebar-title {
  font-size: 12px;
  font-weight: 700;
  color: #94a3a8;
  letter-spacing: 1px;
  padding: 4px 10px 12px;
}
.date-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.date-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.14s, color 0.14s;
}
.date-list li:hover {
  background: #f0f2fb;
}
.date-list li.active {
  background: linear-gradient(135deg, #5568d3, #6a7de0);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(85, 104, 211, 0.3);
}
.date-list .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffb800;
  box-shadow: 0 0 0 3px rgba(255, 184, 0, 0.3);
  flex-shrink: 0;
}
.date-list li.active .dot {
  background: #fff;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}
.date-list .date {
  flex: 1;
}
.date-list .count {
  font-size: 11px;
  background: rgba(15, 23, 42, 0.06);
  color: #64748b;
  padding: 1px 8px;
  border-radius: 10px;
}
.date-list li.active .count {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}
.date-list .empty {
  color: #b6c0bc;
  cursor: default;
  justify-content: center;
  font-size: 13px;
}

/* 内容 */
.content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}
.placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9aa6a2;
  gap: 12px;
}
.ph-icon {
  font-size: 52px;
}
.content-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.content-head h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 800;
}
.badge {
  font-size: 12px;
  background: #e3e8fb;
  color: #3d4fb0;
  padding: 3px 12px;
  border-radius: 20px;
  font-weight: 600;
}

/* 图片网格 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}
.card {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  overflow: hidden;
  cursor: zoom-in;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: rise 0.5s ease both;
  will-change: transform;
}
.card.tilting {
  transition: none;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.card:hover {
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.16);
}
.thumb {
  height: 280px;
  background: repeating-linear-gradient(45deg, #fafcfa, #fafcfa 12px, #eef1f8 12px, #eef1f8 24px);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.thumb img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform: translateZ(16px);
  transition: transform 0.25s ease;
}
.card:hover .thumb img {
  transform: translateZ(16px) scale(1.04);
}
.card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-top: 1px solid #f0f3f1;
  font-size: 12px;
  color: #6b7b76;
  transform: translateZ(24px);
}
.card-foot .expand {
  color: #cbd5d1;
}

/* 3D 图标 */
.i3d {
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(0 6px 10px rgba(15, 23, 42, 0.16));
  transform-box: fill-box;
  transform-origin: center;
}
.stat-ic .i3d {
  animation: iconFloat 4.5s ease-in-out infinite;
}
.stat:nth-child(1) .i3d {
  animation-delay: 0s;
}
.stat:nth-child(2) .i3d {
  animation-delay: 0.8s;
}
.stat:nth-child(3) .i3d {
  animation-delay: 1.6s;
}
.stat:nth-child(4) .i3d {
  animation-delay: 2.4s;
}
.stat:hover .i3d {
  animation: iconBounce 0.7s ease infinite;
}
@keyframes iconFloat {
  0%,
  100% {
    transform: translateY(0) rotateY(-12deg) scale(1);
  }
  50% {
    transform: translateY(-6px) rotateY(12deg) scale(1.06);
  }
}
@keyframes iconBounce {
  0%,
  100% {
    transform: translateY(0) rotateY(0deg) scale(1);
  }
  40% {
    transform: translateY(-10px) rotateY(18deg) scale(1.12);
  }
  70% {
    transform: translateY(2px) rotateY(-6deg) scale(0.98);
  }
}

/* 顶部 3D 柱状图装饰 */
.hero3d-wrap {
  width: 46px;
  height: 38px;
  display: grid;
  place-items: center;
  animation: heroFloat 4.5s ease-in-out infinite;
}
.hero3d {
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(0 8px 14px rgba(85, 104, 211, 0.35));
}
@keyframes heroFloat {
  0%,
  100% {
    transform: translateY(0) rotateY(0deg);
  }
  50% {
    transform: translateY(-4px) rotateY(12deg);
  }
}

/* 灯箱 */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 14, 12, 0.94);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.lb-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  width: 100%;
}
.lb-img {
  max-width: 92vw;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: pop 0.25s ease;
}
@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.lb-btn {
  position: absolute;
  border: none;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.15s, transform 0.15s;
}
.lb-btn:hover {
  background: rgba(255, 255, 255, 0.28);
}
.lb-close {
  top: 20px;
  right: 24px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 18px;
}
.lb-nav {
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: 30px;
  line-height: 1;
}
.lb-nav.prev {
  left: 26px;
}
.lb-nav.next {
  right: 26px;
}
.lb-bottom {
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}
.lb-cap {
  color: #eef1fb;
  font-size: 13px;
}
.lb-counter {
  color: #aab4d6;
  font-size: 12px;
}
.lb-thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 2px 6px;
  max-width: 100%;
}
.lb-thumb {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid transparent;
  background: #1f2a26;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s, border-color 0.15s;
}
.lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.lb-thumb:hover {
  opacity: 1;
}
.lb-thumb.on {
  opacity: 1;
  border-color: #5568d3;
}

/* 骨架屏 */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}
.skel-card {
  height: 326px;
  border-radius: 16px;
  background: linear-gradient(100deg, #eef1f8 30%, #f6f8fc 50%, #eef1f8 70%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite linear;
}
@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

/* 灯箱操作按钮 */
.lb-actions {
  position: absolute;
  top: 20px;
  left: 24px;
  display: flex;
  gap: 10px;
  z-index: 2;
}
.lb-act {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  font-size: 18px;
  text-decoration: none;
}

/* 响应式 */
@media (max-width: 820px) {
  .hero3d-wrap {
    display: none;
  }
  .topbar {
    padding: 10px 14px;
    gap: 8px;
  }
  .brand {
    gap: 10px;
    min-width: 0;
  }
  .logo {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
  .brand-text {
    min-width: 0;
  }
  .brand-text h1 {
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sub {
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status {
    display: none;
  }
  .refresh {
    padding: 8px 12px;
    font-size: 12px;
  }
  .stats {
    grid-template-columns: 1fr;
    padding: 14px 14px 4px;
    gap: 12px;
  }
  .stats .stat:nth-child(n + 2) {
    display: none;
  }
  .stat {
    padding: 13px 14px;
  }
  .stat-ic {
    width: 46px;
    height: 46px;
    padding: 8px;
  }
  .layout {
    flex-direction: column;
    padding: 12px 14px calc(20px + env(safe-area-inset-bottom));
    gap: 14px;
  }
  .sidebar {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 10px;
    -webkit-overflow-scrolling: touch;
  }
  .sidebar-title {
    display: none;
  }
  .date-list {
    display: flex;
    gap: 8px;
  }
  .date-list li {
    flex: 0 0 auto;
    white-space: nowrap;
  }
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
  }
  .thumb {
    height: 170px;
  }
  .lb-nav {
    width: 44px;
    height: 44px;
    font-size: 24px;
  }
  .lb-nav.prev {
    left: 10px;
  }
  .lb-nav.next {
    right: 10px;
  }
}
</style>
