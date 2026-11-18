---
title: "2026 iPhone / iPad (iOS) 科学上网指南：Shadowrocket（小火箭）、Stash、圈X与免费客户端选型"
seoTitle: "iOS 手机 VPN 与小火箭教程：Shadowrocket / Stash / Hiddify 选型与配置 | 订阅指南"
description: "基于《2026 机场代理客户端大全》iOS 章节核实资料，详解 iPhone 与 iPad 平台 11 款主流代理软件（Shadowrocket、Stash、Quantumult X、Surge 5、Hiddify、Karing、Streisand等）的价格差异、协议支持与订阅导入步骤。"
slug: "ios-shadowrocket-stash-guide"
pubDate: "2026-10-29"
updatedDate: "2026-11-18"
category: "vpn"
topicSlug: "mobile"
clusterId: "cluster-vpn-mob-2"
contentType: "guide"
tags: ["手机 VPN", "Shadowrocket", "小火箭", "Stash", "Quantumult X", "iOS代理"]
cover: "/images/covers/mobile-and-router.svg"
coverAlt: "iPhone 与 iPad (iOS) 代理客户端 Shadowrocket、Stash 与 Hiddify 选型指南"
author: "订阅指南网络实验室"
excerpt: "苹果 iPhone 和 iPad 用户在配置科学上网时，最大的门槛在于需要一个非中国大陆地区的 Apple ID 登录 App Store。本文完整对比 iOS 平台 11 款付费与免费客户端，帮你避开假冒安装包与协议不兼容问题。"
pillar: false
featured: false
searchIntent: "Informational"
primaryKeyword: "手机 VPN"
secondaryKeywords: ["Shadowrocket教程", "小火箭怎么用", "Stash与小火箭区别", "iOS免费VPN客户端"]
priceVerifiedDate: "2026-10-19"
testDate: "2026-10-19"
verificationStatus: "verified-guide"
sources: ["第三方代理客户端.txt", "32家机场品牌清单.txt"]
answerFirst: "iPhone / iPad 用户使用第三方代理客户端需先登录非国区（如美区/港区）App Store：预算允许时首选 $2.99 的 Shadowrocket（小火箭，协议兼容性最全）或原生支持 Clash 规则的 Stash；若不想花钱购买付费 App，可直接在非国区 App Store 免费下载 Hiddify、Karing、Clash Mi、Streisand 或官方 sing-box (SFI)，再导入光速云、星岛梦、唯兔云、一翻云等通用订阅即可使用。"
relatedSlugs: ["clash-clients-selection-guide", "android-vpn-and-clash-client-guide", "2026-airport-recommendation-pillar-guide"]
relatedBrands: ["guangsuyun", "xingdaomeng", "weitu", "yifan", "tiziyun"]
faq:
  - q: "为什么在中国大陆区 App Store 搜不到 Shadowrocket（小火箭）？搜出来的同名软件能买吗？"
    a: "因为所有代理类工具均已从国区 App Store 下架。在国区搜到的所谓「小火箭加速器」100% 是骗钱的山寨李鬼软件！必须切换至美区、港区或日区等非国区 Apple ID 后再搜索 Shadowrocket（开发者为 Shadow Launch Technology Limited）。"
  - q: "iPhone 上有哪些不用花钱买 App 的免费代理客户端？"
    a: "根据《第三方代理客户端.txt》核实清单，Hiddify、Karing、Clash Mi、Streisand、sing-box (SFI) 和 OneClick 均可在非国区 App Store 免费获取，其中 Hiddify、Karing 和 Streisand 对 VLESS、Trojan、Hysteria 2 等现代协议支持良好。"
---

## 一、iPhone / iPad 平台 11 款代理客户端完整核实对照表

根据《2026 机场代理客户端大全》（`第三方代理客户端.txt`）第三部分核实资料，iOS / iPadOS 平台共有 11 款常见客户端。需要特别注意：**这些客户端并非都免费**，例如 Shadowrocket、Stash 和 Quantumult X 在美区 App Store 显示为付费应用，Surge 5 则包含高额应用内购买，实际售价和上架情况以你所属的 App Store 地区为准。

| 客户端名称 | 收费模式 (美区参考) | 核心技术特点与定位 | 协议与订阅兼容性说明 |
| :--- | :--- | :--- | :--- |
| **Shadowrocket（小火箭）** | 付费应用 (约$2.99) | 规则代理、订阅管理、延迟测速、流量与请求查看 | **全协议通吃**（VLESS/Reality/Trojan/Hysteria2/SS/VMess） |
| **Stash** | 付费应用 | **iOS 端正统 Clash 风格客户端**，支持策略组与覆写 | 原生读取 Clash YAML 订阅，适合习惯桌面 Clash 的用户 |
| **Quantumult X（圈 X）** | 付费应用 | 强大的分流规则、HTTP 请求重写、Task 脚本、自定义 DNS | 支持 Trojan/SS/VMess 等，部分新协议需注意版本兼容 |
| **Surge 5** | 免费下载 + 专业版内购 | 面向网络工程师的高级网络代理、抓包分析与调试 | 性能极佳，但买断内购价格昂贵，普通用户不必强求 |
| **Hiddify** | **免费开源** | 多协议代理、一键导入订阅、大按钮界面新手极度友好 | 基于 sing-box 系，支持 VLESS/Trojan/Hysteria2 |
| **Karing** | **免费** | 支持多种订阅格式、向导式规则分流、跨设备体验统一 | 基于 sing-box 系，支持多机场订阅同时聚合 |
| **Clash Mi** | **免费** | 内置 Mihomo 内核，支持标准 Clash 风格 YAML 配置 | 适合需要免费 Mihomo 内核体验的 iOS 用户 |
| **Streisand** | **免费** | 轻量简洁，支持 VLESS、VMess、Trojan、Hysteria 等主流协议 | 非国区 App Store 免费实用的轻量备选 |
| **sing-box (SFI)** | **免费开源** | 官方原生 sing-box iOS 客户端 | 适合熟悉原生 sing-box JSON 配置的进阶玩家 |
| **Potatso** | 免费 | 支持 Shadowsocks、SSR、SOCKS、HTTP(S) | 仅支持传统老协议，不支持 VLESS/Hysteria2 |
| **OneClick** | 免费 | 支持 VMess、Shadowsocks、Trojan 和常规订阅链接 | 基础免费工具，不支持最新 Hysteria2 协议 |

---

## 二、Shadowrocket（小火箭）三步导入机场订阅教程

如果你已经用非国区 Apple ID 下载了 **Shadowrocket**，并购买了支持通用订阅的机场（如 [光速云](/brands/guangsuyun/)、[星岛梦](/brands/xingdaomeng/)、[微风网络](/brands/weifeng/)、[唯兔云](/brands/weitu/)、[一翻云](/brands/yifan/)、[二猫云](/brands/ermao/)、[梯子云](/brands/tiziyun/)）：

1. **一键导入或复制订阅**：
   - 在 iPhone 的 Safari 浏览器中登录机场官网后台，点击 **「一键导入 Shadowrocket」**，系统弹窗提示「在 Shadowrocket 中打开？」时点击允许即可自动完成添加。
   - 若手动添加：复制机场后台的「通用订阅链接」，打开 Shadowrocket 点击左上角 **`+` 号** → 第一行「类型 (Type)」选择 **`Subscribe`（订阅）** → 将链接粘贴进「URL」栏，备注填上机场名字，点击右上角「完成 (Save)」。
2. **开启全局路由「配置 (Config)」分流模式**：
   - 在 Shadowrocket 首页中间找到 **「全局路由 (Global Routing)」**，务必将其设置为 **「配置 (Config)」**（对应 Clash 里的 Rule 规则分流模式，切勿长开 Proxy 全局模式以免微信耗电卡顿）。
3. **测速选点与开启连接**：
   - 点击「连通性测试」，点选一个绿色低延迟的香港或新加坡节点（前方的橙色小圆点亮起），然后拨动顶部的「未连接」开关（首次开启需允许添加 VPN 配置并验证 Face ID）。
4. **开启打开应用自动更新订阅**：
   - 点击底部「设置 (Settings)」→ 滑到底部进入「订阅 (Subscribe)」→ 打开 **「打开时更新 (Update On Open)」**，这样每次打开小火箭都会自动同步机场最新节点。
