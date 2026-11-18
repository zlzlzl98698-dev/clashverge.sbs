<div align="center">

# 🌐 订阅指南 (clashverge.sbs)

**下一代高性能网络工具知识媒体 · 31+ 机场品牌多维评测库 · 现代卡片式 Astro 静态站**

[![Astro](https://img.shields.io/badge/Astro-5.12.0-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pagefind](https://img.shields.io/badge/Search-Pagefind_WASM-white?style=for-the-badge&logo=pagefind&logoColor=black)](https://pagefind.app)
[![SEO & GEO Ready](https://img.shields.io/badge/SEO%20%26%20GEO-100%25_Optimized-success?style=for-the-badge&logo=google&logoColor=white)](https://clashverge.sbs)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[在线体验](https://clashverge.sbs/) • [功能特性](#-核心特性) • [目录结构](#-项目目录结构) • [快速开始](#-快速开始) • [部署指南](#-生产部署)

</div>

---

## 📖 项目简介

**订阅指南 (`clashverge.sbs`)** 是一座以客观实测数据与网络架构深度拆解为核心的现代网络知识媒体平台。拒绝无依据的主观吹捧与模板化套路，系统化追踪 IEPL/IPLC 跨境专线延迟吞吐、主流 AI (ChatGPT/Claude/Gemini) 与 4K 流媒体解锁表现，并提供覆盖全平台的科学分流排障指南。

本站点采用最新 **Astro 5 SSG (Static Site Generation)** 纯静态架构打造，全站构建后为纯净 HTML，无客户端 JS 运行时依赖，兼具极致的页面加载速度、工业级 SEO 索引友好度与生成式引擎 (GEO) 实体解析支持。

---

## ⚡ 核心特性

- 🚀 **极致静态性能**：基于 Astro 5 静态构建，全站零 JS 水合开销，TTFB 与首屏渲染达到毫秒级。
- 🔍 **Pagefind 毫秒级离线搜索**：集成纯前端 WASM 全文检索，无需后端搜索引擎支持，中文分词精准迅速。
- 📊 **31+ 品牌实测数据库**：收录 31 家主流服务商，包含五地测速、解锁矩阵、协议支持、套餐明细及测试环境基准。
- 🤖 **GEO & AEO 生成式引擎优化**：
  - 首屏 **Answer-First** 结论先行设计。
  - 专属 `GEO // ENTITY SNAPSHOT` 机器可读实体快照。
  - 机器友好的对比表格与 `<details>/<summary>` 结构化 FAQ。
- 🛡️ **技术 SEO 顶格规范**：
  - **100% 规范化 Canonical**：彻底杜绝镜像、双斜杠与协议重复。
  - **双轨 Sitemap**：自动生成 `sitemap.xml` 与 `sitemap-index.xml`，自动排除单薄标签页。
  - **全搜素引擎 Robots**：显式优化 Googlebot、bingbot、Baiduspider 与 yisouspider。
  - **JSON-LD Schema 矩阵**：完整匹配 `WebSite`、`Organization`、`Article`、`BreadcrumbList` 与 `FAQPage`。
- 🎨 **Modern Editorial 设计系统**：采用 Tailwind CSS v4 现代卡片式风格设计，多端响应式与高清晰排版体验。

---

## 🗂️ 项目目录结构

```text
clashverge.sbs/
├── public/                     # 静态公共资源 (Favicon, Logos, .htaccess)
│   ├── logos/                  # 31+ 品牌高分辨率 Logo 图标
│   ├── .htaccess               # Apache 301 重定向与长效缓存规范
│   └── favicon.svg             # 矢量网站图标
├── src/
│   ├── components/             # 复用 UI 组件
│   │   ├── Header.astro        # 顶栏导航与品牌标识
│   │   ├── Footer.astro        # 底栏版权与合规链接
│   │   ├── Navigation.astro    # 频道与专题下拉菜单
│   │   ├── SearchModal.astro   # Pagefind 浮层搜索弹窗
│   │   ├── SEOHead.astro       # 统一 Meta / Canonical / Schema 注入
│   │   └── BrandFilter.astro   # 品牌多维实时筛选器
│   ├── content/                # Content Collections (MD/MDX 原创文章)
│   │   ├── articles/           # 深度科普与基础指南
│   │   ├── guides/             # 客户端实操配置教程
│   │   ├── reviews/            # 品牌深度评测长文
│   │   └── comparisons/        # 横向对比专栏
│   ├── data/                   # 结构化核心数据源
│   │   ├── brands/             # 31 家品牌实测数据档案
│   │   ├── clients.ts          # 22+ 款客户端配置数据
│   │   ├── site.ts             # 全站核心 SEO 与主域配置
│   │   └── navigation.ts       # 四大频道与主题集群分类
│   ├── layouts/                # 基础页面布局
│   │   ├── BaseLayout.astro    # 全局骨架
│   │   ├── ArticleLayout.astro # 文章阅读布局 (含目录与实体元数据)
│   │   └── BrandLayout.astro   # 品牌实测看板专属布局
│   ├── pages/                  # 静态路由入口
│   │   ├── index.astro         # 首页
│   │   ├── airport/            # 机场推荐与细分专题
│   │   ├── vpn/                # VPN / 加速器专区
│   │   ├── clash/              # 客户端与分流规则专区
│   │   ├── brands/             # 品牌数据库与品牌详情页
│   │   ├── articles/           # 统一文章索引与动态文章页
│   │   └── robots.txt.ts       # 动态生成 robots.txt
│   └── styles/
│       └── global.css          # Tailwind CSS v4 全局设计变量
├── scripts/                    # 自动化工程脚本
│   ├── validate-dist.mjs       # 构建产物完整性与死链校验
│   └── audit-seo-geo.mjs       # SEO / GEO 全站健康度审计工具
├── astro.config.mjs            # Astro 核心配置文件
├── package.json                # 项目依赖与 Scripts
└── tsconfig.json               # TypeScript 严格类型配置
```

---

## 🛠️ 快速开始

### 1. 环境准备
确保本机已安装 [Node.js](https://nodejs.org/) (推荐 v18+ 或 v20+) 与 `npm`。

### 2. 克隆项目并安装依赖
```bash
git clone https://github.com/zlzlzl98698-dev/clashverge.sbs.git
cd clashverge.sbs
npm install
```

### 3. 启动本地开发服务器
```bash
npm run dev
```
打开浏览器访问 `http://localhost:4321/` 即可实时预览热重载页面。

### 4. 生产环境构建与测试
```bash
npm run build
```
该命令会自动完成：
1. 编译静态 HTML 与 CSS 到 `dist/`。
2. 调用 `pagefind` 扫描 `dist/` 建立中文搜索词典索引。
3. 校验并生成标准的 `dist/sitemap.xml` 与 `dist/robots.txt`。

### 5. 本地生产产物预览
```bash
npm run preview
```
本地预览环境将启动并在终端输出访问地址（默认 `http://localhost:4321/`）。

---

## 🚀 生产部署

打包后的静态网页位于 **`dist/`** 目录，可一键部署至任何主流静态托管平台：

### 方式 A：Cloudflare Pages / Vercel
- **Framework Preset**: `Astro`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **环境变量**（可选，用于站长验证）：
  - `PUBLIC_GOOGLE_SITE_VERIFICATION`
  - `PUBLIC_BING_SITE_VERIFICATION`
  - `PUBLIC_BAIDU_SITE_VERIFICATION`
  - `PUBLIC_SHENMA_SITE_VERIFICATION`

### 方式 B：Nginx / Apache 传统服务器
直接将 `dist/` 中的所有文件（包含 `.htaccess`）上传至网站根目录即可。

---

## 🤝 贡献与规范

欢迎提交 Issue 与 Pull Request：
- 新增品牌请同步更新 `src/data/brands/` 与 `src/data/links.ts`。
- 新增技术文章请置于 `src/content/articles/`，遵循统一的 Frontmatter 规范。
- 提交前请确保运行 `npm run build` 无任何错误与警告。

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源发布。
