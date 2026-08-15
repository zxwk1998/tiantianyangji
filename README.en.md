<h1 align="center">🌱 TianTian YangJi (天天养基)</h1>

<p align="center">
  <strong>All-in-One Fund Valuation & Stock Quant Platform · Real-Time NAV · Quant Signals · AI Tools · News Archive</strong>
</p>

<p align="center">
  <a href="./README.md">中文</a> | <strong>English</strong>
</p>

<p align="center">
  <a href="https://qdii.vuejs-core.cn/"><img src="https://img.shields.io/badge/🚀_Live_Demo-qdii.vuejs--core.cn-success" alt="Live Demo"></a>
  <a href="https://github.com/zxwk1998/tiantianyangji"><img src="https://img.shields.io/github/stars/zxwk1998/tiantianyangji?style=flat-square&logo=GitHub" alt="Stars"></a>
  <a href="https://github.com/zxwk1998/tiantianyangji"><img src="https://img.shields.io/github/forks/zxwk1998/tiantianyangji?style=flat-square&logo=GitHub" alt="Forks"></a>
  <a href="https://github.com/zxwk1998/tiantianyangji"><img src="https://img.shields.io/github/license/zxwk1998/tiantianyangji?style=flat-square" alt="License"></a>
  <a href="https://github.com/zxwk1998/vue-admin-better"><img src="https://img.shields.io/badge/Author-zxwk1998_(vue--admin--better)-blue?style=flat-square" alt="Author"></a>
</p>

<p align="center">
  <a href="#-live-demo">🚀 Live Demo</a> •
  <a href="#-core-features">✨ Core Features</a> •
  <a href="#-quick-start">⚡ Quick Start</a> •
  <a href="#-tech-architecture">🏗 Architecture</a> •
</p>

---

## 📌 Introduction

**TianTian YangJi** is an open-source **fund valuation and stock quantitative investment platform**, providing fund investors and stock traders with **real-time fund NAV estimation** (QDII / A-share / overseas funds), **stock quant signals** (MACD / RSI / Bollinger Bands / KDJ / multi-factor scoring), **market data aggregation**, **financial news archiving**, and an **AI toolbox** — all in one place.

- 🔗 **Live Demo: [https://qdii.vuejs-core.cn/](https://qdii.vuejs-core.cn/)**
- 💻 **GitHub Repo: [https://github.com/zxwk1998/tiantianyangji](https://github.com/zxwk1998/tiantianyangji)**

The project is built with a **pure vanilla JavaScript frontend + Node.js (Express 5) backend** — zero framework dependency, ready out of the box. Whether you want to track real-time QDII fund NAV, monitor winning/losing streaks and subscription limits, get technical signals to assist stock decisions, or use OCR to parse portfolio screenshots and AI-summarize web pages, TianTian YangJi has you covered.

> 💡 Developed and maintained by **zxwk1998**, author of [vue-admin-better](https://github.com/zxwk1998/vue-admin-better) (a high-star Vue admin framework on GitHub). Actively updated — Stars ⭐ and Forks are welcome!

---

## ✨ Core Features

### 📈 Fund Valuation & Rankings

| Feature | Description |
| --- | --- |
| Real-Time NAV | Real-time valuation for QDII / A-share / overseas funds, cross-validated across multiple data sources |
| Holdings Detail | Expandable top holdings with P&L, including FX impact analysis |
| Fund Rankings | Full-market rankings from Eastmoney, multi-period (1D / 1W / 1M / 1Y ...) |
| Win/Loss Streaks | Automatic tracking of consecutive up/down days per fund |
| Limit Monitoring | Real-time tracking of subscription limit changes with historical trends |
| Late-Session Flow | End-of-session capital flow monitoring to catch accumulation moves |

### 📊 Stock Quant

| Feature | Description |
| --- | --- |
| Signal Scanning | Full-market scan with MACD / RSI / Bollinger Bands / KDJ and more |
| Multi-Factor Scoring | Valuation, growth, momentum, quality — composite quant scoring |
| Main Capital Flow | Real-time monitoring of institutional net inflow/outflow |
| Backtesting | Historical signal backtesting with T+1 / T+5 / T+20 accuracy tracking |
| Smart Screener | Multi-condition stock screening |
| Paper Trading | Virtual portfolio management with signal-driven trade records |

### 🌍 Market Overview

| Feature | Description |
| --- | --- |
| Market Snapshot | A-share major indices + Stock Connect capital + main fund flow + global indices |
| THS Hot Lists | Stock popularity / gainers / technical / value / trend rankings |
| Sector Boards | Concept and industry sector performance rankings |
| Dragon-Tiger List | Top trader seat tracking (LongHuBang) |
| Financial News | Real-time news aggregation with AI interpretation |

### 🗂 News Archive

| Feature | Description |
| --- | --- |
| Truth Social Archive | Real-time scraping of Trump posts with AI Chinese translation |
| Email Archive | Intelligent email reading and classification |

### 🤖 AI Toolbox

| Feature | Description |
| --- | --- |
| URL Summarizer | Paste a URL, get an auto-extracted summary of the core content |
| OCR Portfolio Reader | Upload a portfolio screenshot — fund codes and amounts auto-detected |
| Email Daily Report | VIP members receive a daily valuation report by email |
| Watermark Remover | Watermark-free download for Douyin / Xiaohongshu videos |

### 👥 User System

| Feature | Description |
| --- | --- |
| Email Sign-up | Verification-code based registration with SSO |
| VIP Membership | Unlock quant / favorites and premium features via Alipay |
| Referral Rewards | Invite friends to earn membership time |
| Theme Switching | Default theme / Wealth Black Card theme |
| PWA Install | Add to home screen for a native-like experience |

---

## 🎯 Highlights

- **Zero-Framework Frontend** — A full SPA in pure vanilla JS (routing / components / state management all hand-written). Extremely lightweight, and a great reference for large-scale vanilla JS applications
- **Multi-Source Fallback** — Every data dimension has backup sources; a single point of failure never takes down the whole feature
- **Full-Market Scan** — Real-time NAV for 6000+ funds, full-market refresh every 2 minutes
- **Closed Quant Loop** — Signal generation → paper trading → backtesting → accuracy tracking, a complete loop
- **Mobile-First** — Every page is mobile-optimized; installable as a PWA
- **Anti-Debugging** — Anti-debug / anti-capture protection automatically enabled in production

---

## 🏗 Tech Architecture

| Layer | Technology | Description |
| --- | --- | --- |
| Frontend | Vanilla HTML / CSS / JavaScript | Framework-free SPA, ES modules |
| Backend | Node.js + Express 5 | RESTful API, feature-based route splitting |
| Database | MySQL | User system, membership, signal tracking |
| Data Sources | Eastmoney / Sina / Tencent / THS / cunyd | Multi-source fallback for availability |
| Deployment | Tencent Cloud + Nginx | Incremental FTP sync + SSH remote restart |
| Tooling | Prettier / Husky | Code formatting + Git pre-push auto-deploy |

### Data Source Architecture

```
User Request → Express API → Data source fallback chain
                                ├─ Eastmoney (fund NAV, primary)
                                ├─ Tencent Finance (stock quotes, no IP throttling)
                                ├─ Sina Finance (backup quote source)
                                ├─ THS (hot lists / sectors / news)
                                └─ cunyd (market overview)
```

### Project Structure

```
tiantianyangji/
├── server.js              # Entry point
├── config/                # Config hub (API endpoints / cache TTL / type mapping)
├── routes/                # HTTP route layer (feature-based)
├── services/              # Business logic (data fetching / cache / scheduled jobs)
├── public/                # Frontend SPA
│   ├── index.html         # Entry page
│   ├── router.js          # Hash router
│   ├── pages/             # Page modules (each exports { title, html, init, destroy })
│   ├── common/            # Shared components (GlobalLoading / InfiniteScroll / EmptyState ...)
│   └── styles/            # Global styles
├── scripts/               # Utility scripts (deploy / icon download / DB init)
├── lib/                   # Third-party libs (Tesseract OCR)
└── cache/                 # Runtime cache (gitignored)
```

---

## ⚡ Quick Start

### Requirements

- Node.js >= 14.0.0
- MySQL 5.7+ (optional; the user system degrades gracefully without it)

### Install

```bash
git clone https://github.com/zxwk1998/tiantianyangji.git
cd tiantianyangji
npm install
```

### Run

```bash
# Production
npm start

# Development (hot reload + devtools unrestricted)
npm run dev
```

Then open `http://localhost:3003`.

### Deployment

The project ships with a git pre-push hook that runs FTP sync + SSH remote restart before every `git push`:

```bash
git push              # auto-deploy + push
git push --no-verify  # skip deployment
```

---

## 🗺 Page Map

| Page | Route | Description |
| --- | --- | --- |
| Fund Rankings | `#rankings` | Full-market fund rankings |
| Favorites | `#favorites` | Watchlisted funds (VIP) |
| QDII Valuation | `#qdii` | Real-time QDII fund NAV |
| Market Overview | `#market-overview` | Indices / capital flow / turnover |
| Quant Signals | `#quant-stock` | Stock quant signals (VIP) |
| THS Hot Lists | `#stock-hot` | Stock popularity / gainers |
| Sector Boards | `#block-list` | Concept / industry sectors |
| Dragon-Tiger List | `#longhu` | Top trader seats |
| Financial News | `#stock-news` | News aggregation |
| Truth Archive | `#truth` | Trump posts (VIP) |
| Limit Monitor | `#fund-limit` | Fund subscription limits |
| More | `#more` | AI toolbox / profile |

---

## 📸 Screenshots

> 🚀 For the full experience, visit the live demo: [https://qdii.vuejs-core.cn/](https://qdii.vuejs-core.cn/)

- **QDII Valuation** — Full-market QDII fund NAV list with sorting, filtering, and expandable holdings
- **Market Overview** — Indices, northbound capital, and sector heatmap in one dashboard
- **Quant Signals** — Technical signal cards + backtest accuracy tracking
- **AI Toolbox** — URL summarizer / OCR portfolio reader / watermark remover, ready to use

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=zxwk1998/tiantianyangji&type=Date)](https://star-history.com/#zxwk1998/tiantianyangji&Date)

---

## 🙏 Contributing

All contributions are welcome:

1. **Star / Fork** this repo to help it reach more people
2. Open an **Issue** for bugs or feature requests
3. Submit a **Pull Request** with your improvements

---

## 🔑 Keywords

`fund valuation` `real-time NAV` `QDII` `fund ranking` `quantitative trading` `quant trading` `stock signals` `MACD` `RSI` `multi-factor model` `capital flow` `financial news` `AI tools` `OCR` `investment platform` `open source` `Node.js` `vanilla JavaScript`

---

## 📄 License

[ISC](https://github.com/zxwk1998/tiantianyangji/blob/main/LICENSE)

## 📮 Contact

- Live Demo: [https://qdii.vuejs-core.cn/](https://qdii.vuejs-core.cn/)

---

> ⚠️ **Disclaimer**: All content is automatically aggregated from public market data and generated by open-source algorithms and AI indicators. It does not constitute investment advice. Markets carry risk — invest with caution and at your own risk.
