<h1 align="center">🌱 天天养基 · 图片馆</h1>

<p align="center">
  <strong>基金 / 股票每日快照的本地图片展示画廊</strong>
</p>

<p align="center">
  <strong>中文</strong>
</p>

---

## 📌 项目简介

**天天养基 · 图片馆** 是一个纯前端的本地图片展示网站。图片由每日任务生成，按日期存放在项目根目录下的独立文件夹中（如 `20260823-2354/`），本网站自动扫描这些文件夹并以画廊形式呈现，方便按日回溯基金 / 股票快照。

- 🔗 **天天养基官网**：[https://niulai.vuejs-core.cn](https://niulai.vuejs-core.cn)
- 🔗 **图片馆在线访问**：[https://zxwk1998.github.io/tiantianyangji/](https://zxwk1998.github.io/tiantianyangji/)

- 🚫 **不跳转任何外部网址**：所有数据均来自本地文件系统，完全自托管。
- 🗂 **自动归档**：自动识别根目录下符合日期格式的文件夹（`2026-08-23` / `20260823` / `20260823-2354`）。
- 🖼 **画廊体验**：日期侧栏 + 图片网格 + 灯箱大图预览（缩略图轨道、键盘 ←/→/Esc、下载原图、新标签打开）。
- 🎨 **品牌一致**：配色取自项目图标 `public/icon.svg`（蓝紫渐变 + 金色点缀）。

## 🚀 快速开始

```bash
npm install
npm run dev        # 开发模式，访问 http://localhost:5173/
```

## 🏗 构建与部署（纯静态）

本项目**无任何后端 / API / 运行时服务**。所有图片与相册清单均在构建期由 `scripts/build-gallery.mjs` 生成为静态文件，最终 `dist/` 可直接部署到任意静态托管（GitHub Pages、Netlify、对象存储、Nginx、FTP 等）。

```bash
npm run build      # 1) 生成 public/albums.json 并复制图片到 public/  2) vite 打包出 dist/
npm run preview    # 本地预览构建产物（默认 http://localhost:4173）
```

> `dist/` 是 100% 静态文件：日期图片文件夹、`albums.json`、`icon.svg`、`assets/`、`index.html`。直接把 `dist/` 整个目录上传即可，无需 Node 服务。

## 📁 目录结构

```
tiantianyangji/
├── index.html              # 入口（含 favicon，无跳转）
├── src/
│   ├── main.js             # 挂载 Vue 应用
│   └── App.vue             # 画廊界面（侧栏 / 网格 / 灯箱）
├── scripts/
│   └── build-gallery.mjs   # 构建期：扫描日期文件夹 → 生成 albums.json + 复制图片到 public/
├── public/
│   ├── icon.svg            # 项目图标（favicon + 顶栏 Logo）
│   ├── albums.json         # 构建生成的相册清单（前端直接 fetch）
│   └── <日期文件夹>/        # 构建生成的图片副本，如 20260823-2354/
├── <日期文件夹>/            # 每日生成的原始图片（源），如 20260823-2354/
│   ├── longhu.png
│   ├── qdii.png
│   └── rankings.png
├── vite.config.js          # Vite 配置（纯前端，无中间件）
└── package.json
```

## 🔧 工作原理

```
根目录日期文件夹 ──(构建期扫描)──▶ public/albums.json + public/<日期>/<图片>
                                            │
                                            ▼
                         前端 fetch('/albums.json') 静态读取 ──▶ 按日展示
                                            │
                         浏览器直接加载 /<日期>/<图片> 静态文件 ──▶ 原图
```

- `scripts/build-gallery.mjs` 在 `dev` / `build` 前自动运行：扫描根目录日期文件夹、生成 `public/albums.json`、并将图片增量复制到 `public/`，使 dev 与构建产物都能以静态方式访问。
- 前端仅做静态请求：清单读 `albums.json`，图片读对应的静态路径，全程无后端参与。

## 📝 说明

- 图片文件夹命名需符合日期格式，否则不会被收录。
- 前端每 5 分钟自动刷新一次（仅当标签页可见时），也可手动点击「刷新」。
- 顶栏「天天养基 · 返回主站 ↗」卡片链接到主站点（新标签页打开）。

---

> ⚠️ **免责声明**：本系统所有内容均由系统自动采集公开市场数据并基于开源算法与 AI 指标分析生成，不构成任何投资建议。市场有风险，投资需谨慎，据此操作风险自担。

## 📸 最新上传快照

| 图片 | 文件 |
| --- | --- |
| ![rankings-funds.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/rankings-funds.png) | [rankings-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/rankings-funds.png) |
| ![qdii-funds.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/qdii-funds.png) | [qdii-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/qdii-funds.png) |
| ![a-share-industries.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/a-share-industries.png) | [a-share-industries.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/a-share-industries.png) |
| ![block-list.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/block-list.png) | [block-list.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/block-list.png) |
| ![longhu.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/longhu.png) | [longhu.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/longhu.png) |
| ![fund-limit.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/fund-limit.png) | [fund-limit.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-limit.png) |
| ![fund-manager.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/fund-manager.png) | [fund-manager.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-manager.png) |
| ![fund-us-ratio.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/fund-us-ratio.png) | [fund-us-ratio.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-us-ratio.png) |
| ![tiantian-rank.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/tiantian-rank.png) | [tiantian-rank.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/tiantian-rank.png) |
| ![fund-hold-ranking.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/fund-hold-ranking.png) | [fund-hold-ranking.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-hold-ranking.png) |
| ![a-kill.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/a-kill.png) | [a-kill.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/a-kill.png) |
| ![flat-stock.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/flat-stock.png) | [flat-stock.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/flat-stock.png) |
| ![double-bottom.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/double-bottom.png) | [double-bottom.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/double-bottom.png) |
| ![stock-hot.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/stock-hot.png) | [stock-hot.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/stock-hot.png) |
| ![market-indices.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/market-indices.png) | [market-indices.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/market-indices.png) |
| ![block-surge.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/block-surge.png) | [block-surge.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/block-surge.png) |
| ![sector-capital-flow.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/sector-capital-flow.png) | [sector-capital-flow.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/sector-capital-flow.png) |
| ![sector-rotation.png](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/20260904-2350/sector-rotation.png) | [sector-rotation.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/sector-rotation.png) |

## 📸 运营导出截图

- [2026-09-04 23:50](https://github.com/zxwk1998/tiantianyangji/tree/main/20260904-2350)（18 张）：[rankings-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/rankings-funds.png)、[qdii-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/qdii-funds.png)、[a-share-industries.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/a-share-industries.png)、[block-list.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/block-list.png)、[longhu.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/longhu.png)、[fund-limit.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-limit.png)、[fund-manager.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-manager.png)、[fund-us-ratio.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-us-ratio.png)、[tiantian-rank.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/tiantian-rank.png)、[fund-hold-ranking.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/fund-hold-ranking.png)、[a-kill.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/a-kill.png)、[flat-stock.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/flat-stock.png)、[double-bottom.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/double-bottom.png)、[stock-hot.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/stock-hot.png)、[market-indices.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/market-indices.png)、[block-surge.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/block-surge.png)、[sector-capital-flow.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/sector-capital-flow.png)、[sector-rotation.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260904-2350/sector-rotation.png)

- [2026-09-03 21:30](https://github.com/zxwk1998/tiantianyangji/tree/main/20260903-2130)（19 张）：[rankings-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/rankings-funds.png)、[qdii-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/qdii-funds.png)、[a-share-industries.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/a-share-industries.png)、[block-list.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/block-list.png)、[longhu.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/longhu.png)、[fund-limit.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/fund-limit.png)、[fund-manager.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/fund-manager.png)、[fund-us-ratio.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/fund-us-ratio.png)、[tiantian-rank.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/tiantian-rank.png)、[fund-hold-ranking.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/fund-hold-ranking.png)、[a-kill.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/a-kill.png)、[flat-stock.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/flat-stock.png)、[double-bottom.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/double-bottom.png)、[stock-hot.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/stock-hot.png)、[market-indices.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/market-indices.png)、[block-surge.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/block-surge.png)、[sector-capital-flow.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/sector-capital-flow.png)、[sector-rotation.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/sector-rotation.png)、[tail-rush.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260903-2130/tail-rush.png)

- [2026-08-24 03:32](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0330)（20 张）：[rankings-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/rankings-funds.png)、[qdii-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/qdii-funds.png)、[a-share-industries.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/a-share-industries.png)、[block-list.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/block-list.png)、[longhu.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/longhu.png)、[fund-limit.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/fund-limit.png)、[fund-manager.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/fund-manager.png)、[fund-us-ratio.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/fund-us-ratio.png)、[tiantian-rank.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/tiantian-rank.png)、[quant-pick.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/quant-pick.png)、[fund-hold-ranking.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/fund-hold-ranking.png)、[a-kill.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/a-kill.png)、[flat-stock.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/flat-stock.png)、[double-bottom.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/double-bottom.png)、[stock-hot.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/stock-hot.png)、[market-indices.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/market-indices.png)、[block-surge.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/block-surge.png)、[sector-capital-flow.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/sector-capital-flow.png)、[sector-rotation.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/sector-rotation.png)、[tail-rush.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0330/tail-rush.png)

- [2026-08-24 03:07](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0306)（20 张）：[rankings-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/rankings-funds.png)、[qdii-funds.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/qdii-funds.png)、[a-share-industries.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/a-share-industries.png)、[block-list.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/block-list.png)、[longhu.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/longhu.png)、[fund-limit.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/fund-limit.png)、[fund-manager.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/fund-manager.png)、[fund-us-ratio.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/fund-us-ratio.png)、[tiantian-rank.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/tiantian-rank.png)、[quant-pick.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/quant-pick.png)、[fund-hold-ranking.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/fund-hold-ranking.png)、[a-kill.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/a-kill.png)、[flat-stock.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/flat-stock.png)、[double-bottom.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/double-bottom.png)、[stock-hot.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/stock-hot.png)、[market-indices.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/market-indices.png)、[block-surge.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/block-surge.png)、[sector-capital-flow.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/sector-capital-flow.png)、[sector-rotation.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/sector-rotation.png)、[tail-rush.png](https://github.com/zxwk1998/tiantianyangji/blob/main/20260824-0306/tail-rush.png)


