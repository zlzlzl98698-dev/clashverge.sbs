# PROGRESS.md — 订阅指南 (clashverge.sbs) 全站建设与核验进度表

> 最后更新时间：2026-11-18

## 一、已完成的核心工程与内容模块（100% 生产构建验证通过）

- [x] **阶段一：工作区与本地资产审计**
  - 完成 `32家机场品牌清单.txt`、`光速云品牌信息.txt`、`第三方代理客户端.txt`、`机场品牌图表样式.txt`、`内容矩阵.txt` 全部 5 份核心资料审计。
  - 完成桌面 `logos/` 目录 30 个品牌图片资产归档（已复制至 `public/logos/`）。
  - 完成品牌去重审计：识别第 8 项 `Firefly` 与第 32 项 `Firefly 萤火虫` 为重复品牌并合并，确认 **31 家独立机场品牌**。
- [x] **阶段二：Astro 5 静态架构与构建链路**
  - 完成 Astro 5 + TypeScript + Tailwind CSS v4 + `@astrojs/mdx` + `@astrojs/sitemap` + `Pagefind` 集成。
  - 配置 `output: 'static'`、`trailingSlash: 'always'`、目录式 HTML 输出。
- [x] **阶段三：卡片式博客设计系统与 Dark Network Observatory 图表组件**
  - 完成 9 大 Layout（`BaseLayout`、`HomeLayout`、`ArticleLayout`、`CategoryLayout`、`TopicLayout`、`BrandLayout`、`ReviewLayout`、`ComparisonLayout`、`GuideLayout`）。
  - 完成 11 类卡片组件（`ArticleCard`、`FeaturedArticleCard`、`CompactArticleCard`、`CategoryCard`、`TopicCard`、`BrandCard`、`ReviewCard`、`ComparisonCard`、`PricingCard`、`GuideCard`、`RelatedArticleCard`）。
  - 完成 4 大专业实验室图表组件（`NetworkPerformanceReport`、`StreamingAvailabilityMatrix`、`NetworkTopology`、`BrandInfrastructureSnapshot`）。
- [x] **阶段四：正式页面与三级内容体系建设**
  - 完成 17 模块数据驱动首页（`/`）。
  - 完成 4 个一级导航频道页（`/airport/`、`/vpn/`、`/clash/`、`/resources/`）。
  - 完成 28 个独立二级专题页（采用 6 种差异化 `layoutVariant` 信息架构）。
  - 完成 56 个三级内容集群规划与前端展示入口。
  - 完成 14 篇高价值深度原创文章（涵盖 Pillar 支柱长文、光速云 MDX 深度评测、四大品牌横评、5.6元便宜机场同系审计、Clash Verge Rev 保姆级教程、Mihomo 内核详解、订阅与 Timeout 故障排查、VPN vs 机场对比、iOS/Android/Windows/OpenWrt 全平台教程、跑路预警与 FAQ 百科）。
- [x] **阶段五：31 家品牌数据库与光速云优先评测建设**
  - 完成 `/brands/` 多维度筛选与搜索数据库页面。
  - 完成全部 31 家独立品牌详情评测页（`/brands/[slug]/`），其中 **光速云（`/brands/guangsuyun/`）** 优先完成商业置顶披露、7 档套餐表、59GB/69GB 历史口径核实说明及五地实测图表。
- [x] **阶段六至九：SEO/GEO 规划文档、Pagefind 中文搜索与 Apache 部署**
  - 输出全部 13 份 SEO/GEO 规划文件于 `docs/seo-geo/`（含 560 条独立文章标题规划库）。
  - 完成 `/search/` Pagefind 中文搜索页面并生成生产环境索引。
  - 完成 `.htaccess` Apache 静态部署配置与 `scripts/validate-dist.mjs` 全站推广链接合规扫描。
  - 完成 `scripts/preview-server.mjs` 动态智能端口探测服务（自动避让冲突端口，配置 `no-store` 防跨项目缓存污染）。

---

## 二、尚未撰写/待补充核实的后续规划内容（诚实披露，不虚报）

1. **储备规划文章待撰写状态**：
   - 在 `docs/seo-geo/SEO-完整文章标题库.md` 规划的 **560 篇** 细分文章中，目前已正式撰写并发布上线 **14 篇核心跨集群支柱文章**（在 `/articles/`、`/reviews/`、`/comparisons/`、`/guides/` 及标签页共生成 166 个静态 HTML 页面）；其余 **546 篇长尾规划标题** 处于 `待撰写` 储备状态，未作为空壳文章发布。
2. **品牌资料待核实项（需后续补充当期截图或实测）**：
   - **宇宙云 (`yuzhou`)**：仅有早期起价（¥96/年）与优惠码记录，缺完整套餐表与五地实测数据，已标记为 `待核实 (pending)`。
   - **浪网 (`langwang`)**：源自 `2026-08-09` 历史档案，原资料标注「未实测」且入门档流量存在截图遮挡，已标记为 `历史记录 (historical)`。
   - **边缘节点 EdgeNova (`edgenova`)**：源自 `2026-08-09` 历史档案，缺逐地区测速与逐项流媒体解锁数据，已标记为 `历史记录 (historical)`。
   - **隐形人 (`yinxingren`)**：套餐完整，但 `2026-10-19` 测速表中五地延迟与下载数值均为空缺（`—`），已如实标注为 `待核实`。
   - **5.6元档五品牌（大佬云/闪电鼠/云界线/榴莲云/环球梯）及 18–25元档部分品牌（极连云/光年梯/可信云/速界/神行加速/梯子云）**：已有基础套餐与协议定位，尚待补充独立分地区 Speedtest 实测数值。
