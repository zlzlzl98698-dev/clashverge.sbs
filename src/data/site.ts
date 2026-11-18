export const siteConfig = {
  name: '订阅指南',
  englishName: 'ClashVerge Subscription Guide',
  domain: 'clashverge.sbs',
  deployDomain: 'clash-cloud.run',
  url: process.env.PUBLIC_SITE_URL || 'https://clashverge.sbs',
  language: 'zh-CN',
  locale: 'zh_CN',
  titleSuffix: '订阅指南 · 中文机场评测与 Clash 知识媒体',
  defaultTitle: '订阅指南 - 2026 中文机场推荐、品牌评测数据库与 Clash 客户端教程媒体',
  defaultDescription:
    '订阅指南（clashverge.sbs）是以原创实测与资料核验为核心的中文机场推荐、VPN 评测、31 家机场品牌数据库与 Clash Verge Rev 客户端知识库，提供透明套餐对比、节点测速档案与订阅排障指南。',
  logo: '/avatar.webp',
  author: {
    name: '订阅指南网络实验室',
    role: '网络线路测评与代理协议研究组',
    avatar: '/avatar.webp',
    email: 'editorial@clashverge.sbs',
  },
  updatedDate: '2026-11-18',
  verifiedBatchDate: '2026-10-19',
  historicalBatchDate: '2026-08-09',
  affiliateDisclosure:
    '含推广链接：通过本站标记为推广的注册入口购买服务，可能为本站带来一定比例的合作佣金，但不会增加您的实际支付价格，亦不代表本站承诺其永久稳定。',
  editorialPolicy:
    '本站坚持将「商业推广展示位」与「实测/资料核验数据」严格区分。所有标注为「品牌资料显示 (Vendor Data)」的参数均来自品牌公开说明，未实测项目一律标记为「待核实」，绝不伪造晚高峰速度与解锁结论。',
  verification: {
    google: process.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.PUBLIC_BING_SITE_VERIFICATION || '',
    shenma: process.env.PUBLIC_SHENMA_SITE_VERIFICATION || '',
    baidu: process.env.PUBLIC_BAIDU_SITE_VERIFICATION || '',
  },
  theme: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F7F9FC',
    textPrimary: '#172033',
    textSecondary: '#64748B',
    brandBlue: '#2563EB',
    bgAccentLight: '#EFF6FF',
    borderColor: '#E5EAF1',
  },
};
