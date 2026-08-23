<h1 align="center">🌱 天天养基（TianTian YangJi）</h1>

<p align="center">
  <strong>一站式基金估值与股票量化投资平台 · 实时估值 · 量化信号 · AI 工具 · 资讯归档</strong>
</p>

<p align="center">
  <strong>中文</strong> | <a href="./README.en.md">English</a>
</p>

<p align="center">
  <a href="https://qdii.vuejs-core.cn/"><img src="https://img.shields.io/badge/🚀_在线体验-qdii.vuejs--core.cn-success" alt="在线体验"></a>
  <a href="https://github.com/zxwk1998/tiantianyangji"><img src="https://img.shields.io/github/stars/zxwk1998/tiantianyangji?style=flat-square&logo=GitHub" alt="Stars"></a>
  <a href="https://github.com/zxwk1998/tiantianyangji"><img src="https://img.shields.io/github/forks/zxwk1998/tiantianyangji?style=flat-square&logo=GitHub" alt="Forks"></a>
  <a href="https://github.com/zxwk1998/tiantianyangji"><img src="https://img.shields.io/github/license/zxwk1998/tiantianyangji?style=flat-square" alt="License"></a>
  <a href="https://github.com/zxwk1998/vue-admin-better"><img src="https://img.shields.io/badge/作者-zxwk1998_(vue--admin--better)-blue?style=flat-square" alt="作者"></a>
</p>

<p align="center">
  <a href="#-在线体验">🚀 在线体验</a> •
  <a href="#-安卓-apk-下载">📲 安卓 APK 下载</a> •
  <a href="#-核心功能">✨ 核心功能</a> •
  <a href="#-快速开始">⚡ 快速开始</a> •
  <a href="#-技术架构">🏗 技术架构</a> •
</p>

---

## 📌 项目简介

**天天养基**是一个开源的**基金估值与股票量化投资平台**，为基金投资者和股票交易者提供**实时基金估值**（QDII / A股 / 海外基金）、**股票量化信号**（MACD / RSI / 布林带 / KDJ / 多因子打分）、**市场行情聚合**、**财经资讯归档**与 **AI 工具箱**等一站式能力。

- 🔗 **官方在线体验地址：[https://qdii.vuejs-core.cn/](https://qdii.vuejs-core.cn/)**
- 💻 **GitHub 仓库地址：[https://github.com/zxwk1998/tiantianyangji](https://github.com/zxwk1998/tiantianyangji)**

项目采用**纯原生 JavaScript 前端 + Node.js（Express 5）后端**，零框架依赖、开箱即用。无论你是想追踪 QDII 基金实时估值、查看基金连涨连跌与申购限额变化，还是需要技术信号辅助股票决策，或使用 OCR 识别持仓截图、网页内容 AI 总结等效率工具，天天养基都能满足你。


---

## 📲 安卓 APK 下载

Android 客户端安装包（`tiantianyangji.apk`，约 5.0 MB），支持 Android 手机安装使用。以下提供多个**国内加速镜像**，若某个链接无法访问或下载缓慢，请依次尝试其他镜像：

| 镜像 | 下载链接 | 说明 |
| --- | --- | --- |
| ⚡ jsDelivr 加速（推荐） | [📥 点击下载](https://cdn.jsdelivr.net/gh/zxwk1998/tiantianyangji@main/tiantianyangji.apk) | 全球 CDN 加速，国内访问速度快、稳定 |
| ⚡ ghfast.top 加速 | [📥 点击下载](https://ghfast.top/https://github.com/zxwk1998/tiantianyangji/raw/main/tiantianyangji.apk) | GitHub 加速代理 |
| ⚡ gh-proxy.com 加速 | [📥 点击下载](https://gh-proxy.com/https://github.com/zxwk1998/tiantianyangji/raw/main/tiantianyangji.apk) | GitHub 加速代理 |
| ⚡ ghproxy.net 加速 | [📥 点击下载](https://ghproxy.net/https://github.com/zxwk1998/tiantianyangji/raw/main/tiantianyangji.apk) | GitHub 加速代理 |
| 🐙 GitHub 官方直链 | [📥 点击下载](https://raw.githubusercontent.com/zxwk1998/tiantianyangji/main/tiantianyangji.apk) | 官方原始文件，国内访问可能较慢 |

> 💡 **提示**：APK 文件保存在本仓库根目录，安装包更新后以上链接自动指向最新版本。
> 🔒 **校验**：安装包 MD5 为 `a4caf24360954ba5749fb693a1217045`，下载后可在文件属性中核对完整性。


---

## ✨ 核心功能

### 📈 基金估值与排行

| 功能 | 说明 |
| --- | --- |
| 实时估值追踪 | QDII / A股 / 海外基金实时估值，多数据源交叉验证 |
| 持仓明细 | 展开查看基金重仓股及涨跌幅，含汇率影响分析 |
| 基金排行榜 | 天天基金全市场排行，支持近 1 日 / 1 周 / 1 月 / 1 年等多周期 |
| 连涨连跌测算 | 自动统计基金连续上涨 / 下跌天数 |
| 基金限额监控 | 实时追踪基金申购限额变化，支持历史趋势分析 |
| 尾盘抢筹 | 监控尾盘资金异动，捕捉抢筹机会 |

### 📊 股票量化

| 功能 | 说明 |
| --- | --- |
| 技术信号扫描 | MACD / RSI / 布林带 / KDJ 等多指标全市场扫描 |
| 幻方多因子打分 | 综合估值、成长、动量、质量等多维度量化打分 |
| 主力资金流 | 主力净流入 / 流出实时监控 |
| 策略回测 | 历史信号回测验证，支持 T+1 / T+5 / T+20 准确率追踪 |
| 智能选股 | 多条件选股筛选，快速锁定标的 |
| 模拟盘 | 虚拟持仓管理，信号驱动买卖记录 |

### 🌍 市场行情

| 功能 | 说明 |
| --- | --- |
| 市场概览 | A股三大指数 + 沪深港通资金 + 主力资金流 + A股当日成交 + 全球指数 |
| 同花顺热榜 | 股票热度榜 / 涨幅榜 / 技术面 / 价值 / 趋势榜 |
| 板块榜 | 概念板块 / 行业板块涨跌幅排行 |
| 龙虎榜 | 游资席位追踪 |
| 财经新闻 | 实时财经资讯聚合与 AI 解读 |

### 🗂 资讯归档

| 功能 | 说明 |
| --- | --- |
| Truth Social 归档 | 特朗普言论实时抓取与 AI 中文翻译 |
| 邮件归档 | 智能邮件读取与分类归档 |

### 🤖 AI 工具箱

| 功能 | 说明 |
| --- | --- |
| URL 智能总结 | 输入网址自动提取核心内容生成摘要 |
| OCR 持仓识别 | 上传持仓截图，自动识别基金代码与金额 |
| 邮件日报 | VIP 会员每日自动接收估值日报邮件 |
| 去水印 | 抖音 / 小红书视频去水印下载 |

### 👥 用户体系

| 功能 | 说明 |
| --- | --- |
| 邮箱注册登录 | 邮箱验证码注册，单点登录 |
| VIP 会员 | 支付宝支付开通，解锁量化 / 收藏等高级功能 |
| 邀请奖励 | 邀请好友注册获得会员时长 |
| 主题换肤 | 默认主题 / 财富黑卡主题 |
| PWA 安装 | 可添加到手机桌面，类原生体验 |

---

## 🎯 亮点特色

- **零框架前端** — 纯原生 JS 实现 SPA，路由 / 组件 / 状态管理全手写，极致轻量，可作为原生 JS 大型单页应用的学习范本
- **多源 fallback** — 每个数据维度都配备备用数据源，单点故障不影响整体可用性
- **全市场扫描** — 6000+ 基金实时估值，2 分钟全市场刷新
- **量化闭环** — 信号生成 → 模拟盘 → 回测验证 → 准确率追踪，完整闭环
- **移动优先** — 全部页面移动端适配，PWA 可安装到桌面
- **防调试** — 生产模式自动启用防调试 / 防抓包策略

---

## 🏗 技术架构

| 层 | 技术 | 说明 |
| --- | --- | --- |
| 前端 | 原生 HTML / CSS / JavaScript | 无框架，SPA 单页应用，ES 模块化 |
| 后端 | Node.js + Express 5 | RESTful API，路由按功能拆分 |
| 数据库 | MySQL | 用户体系、会员、信号追踪 |
| 数据源 | 天天基金 / 新浪 / 腾讯 / 同花顺 / cunyd | 多源 fallback 保障可用性 |
| 部署 | 腾讯云 + Nginx | FTP 增量同步 + SSH 远程重启 |
| 工具链 | Prettier / Husky | 代码格式化 + Git pre-push 自动部署 |

### 数据源架构

```
用户请求 → Express API → 数据源 fallback 链
                            ├─ 天天基金（基金估值主源）
                            ├─ 腾讯财经（股票行情，无 IP 限流）
                            ├─ 新浪财经（备用行情源）
                            ├─ 同花顺（热榜 / 板块 / 新闻）
                            └─ cunyd（市场概览）
```

### 项目结构

```
tiantianyangji/
├── server.js              # 入口文件
├── config/                # 配置中心（API 端点 / 缓存 TTL / 类型映射）
├── routes/                # HTTP 路由层（按功能拆分）
├── services/              # 业务逻辑层（数据获取 / 缓存 / 定时任务）
├── public/                # 前端 SPA
│   ├── index.html         # 入口页面
│   ├── router.js          # Hash 路由器
│   ├── pages/             # 页面模块（每个导出 { title, html, init, destroy }）
│   ├── common/            # 公共组件（GlobalLoading / InfiniteScroll / EmptyState 等）
│   └── styles/            # 全局样式
├── scripts/               # 工具脚本（部署 / 图标下载 / 数据库初始化）
├── lib/                   # 第三方库（Tesseract OCR）
└── cache/                 # 运行时缓存（gitignore）
```

---

## ⚡ 快速开始

### 环境要求

- Node.js >= 14.0.0
- MySQL 5.7+（可选，不配置则用户体系降级）

### 安装

```bash
git clone https://github.com/zxwk1998/tiantianyangji.git
cd tiantianyangji
npm install
```

### 启动

```bash
# 生产模式
npm start

# 开发模式（热重载 + 调试工具不限制）
npm run dev
```

访问 `http://localhost:3003` 即可使用。

### 部署

项目已配置 git pre-push hook，`git push` 前自动执行 FTP 同步 + SSH 远程重启：

```bash
git push              # 自动部署 + 推送
git push --no-verify  # 跳过部署直接推送
```

---

## 🗺 页面导航

| 页面 | 路由 | 说明 |
| --- | --- | --- |
| 基金排行 | `#rankings` | 天天基金全市场排行 |
| 收藏 | `#favorites` | 收藏的基金（VIP） |
| QDII 估值 | `#qdii` | QDII 基金实时估值 |
| 市场概览 | `#market-overview` | 指数 / 资金流 / 成交 |
| 量化信号 | `#quant-stock` | 股票量化信号（VIP） |
| 同花顺热榜 | `#stock-hot` | 股票热度 / 涨幅榜 |
| 板块榜 | `#block-list` | 概念 / 行业板块 |
| 龙虎榜 | `#longhu` | 游资席位 |
| 财经新闻 | `#stock-news` | 资讯聚合 |
| Truth 归档 | `#truth` | 特朗普言论（VIP） |
| 限额监控 | `#fund-limit` | 基金限额变化 |
| 更多 | `#more` | AI 工具箱 / 个人中心 |

---

## 📸 功能预览

> 🚀 完整体验请访问在线地址：[https://qdii.vuejs-core.cn/](https://qdii.vuejs-core.cn/)

- **QDII 估值页** — 全市场 QDII 基金实时估值列表，支持排序筛选与持仓展开
- **市场概览页** — 指数行情、北向资金、板块热力一图聚合
- **量化信号页** — 技术指标信号卡片 + 回测准确率追踪
- **AI 工具箱** — URL 总结 / OCR 持仓识别 / 去水印，即开即用

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=zxwk1998/tiantianyangji&type=Date)](https://star-history.com/#zxwk1998/tiantianyangji&Date)

---

## 🙏 参与贡献

欢迎通过以下方式参与项目：

1. **Star / Fork** 本仓库，让更多人看到
2. 提交 **Issue** 反馈 Bug 或功能建议
3. 发起 **Pull Request** 贡献代码改进

---

## 🔑 关键词索引

`基金估值` `实时基金估值` `QDII估值` `基金排行` `基金定投` `股票量化` `量化交易` `量化选股` `MACD信号` `RSI指标` `多因子模型` `主力资金流` `龙虎榜` `财经资讯` `AI工具` `OCR持仓识别` `投资平台` `开源项目` `Node.js` `原生JavaScript` `fund valuation` `quantitative trading` `stock signals` `investment platform` `open source`

---

## 📄 License

[ISC](https://github.com/zxwk1998/tiantianyangji/blob/main/LICENSE)

## 📮 联系方式

- 在线体验：[https://qdii.vuejs-core.cn/](https://qdii.vuejs-core.cn/)

---

> ⚠️ **免责声明**：本系统所有内容均由系统自动采集公开市场数据并基于开源算法与 AI 指标分析生成，不构成任何投资建议。市场有风险，投资需谨慎，据此操作风险自担。

## 📸 运营导出截图

- [2026-08-24 01:16](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0116)

- [2026-08-24 01:09](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0106)

- [2026-08-24 00:54](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0053)

- [2026-08-24 00:52](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0051)

- [2026-08-24 00:31](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0031)

- [2026-08-24 00:02](https://github.com/zxwk1998/tiantianyangji/tree/main/20260824-0002)

- [2026-08-23 23:55](https://github.com/zxwk1998/tiantianyangji/tree/main/20260823-2354)
