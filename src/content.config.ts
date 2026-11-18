import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sharedArticleSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  slug: z.string(),
  pubDate: z.string().default('2026-11-18'),
  updatedDate: z.string().default('2026-11-18'),
  category: z.enum(['airport', 'vpn', 'clash', 'resources']).default('airport'),
  topicSlug: z.string().default('recommend'),
  clusterId: z.string().optional(),
  contentType: z.enum(['article', 'review', 'guide', 'comparison']).default('article'),
  tags: z.array(z.string()).default([]),
  cover: z.string().default('/images/covers/editorial-network.svg'),
  coverAlt: z.string().default('订阅指南原创评测与技术图解封面'),
  author: z.string().default('订阅指南网络实验室'),
  excerpt: z.string().optional(),
  faq: z
    .array(
      z.object({
        q: z.string(),
        a: z.string(),
      })
    )
    .default([]),
  relatedSlugs: z.array(z.string()).default([]),
  relatedBrands: z.array(z.string()).default([]),
  pillar: z.boolean().default(false),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  canonical: z.string().optional(),
  searchIntent: z
    .enum(['Commercial Investigation', 'Informational', 'Transactional', 'Troubleshooting'])
    .default('Informational'),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  priceVerifiedDate: z.string().default('2026-10-19'),
  testDate: z.string().default('2026-10-19'),
  verificationStatus: z.enum(['measured', 'vendor', 'historical', 'verified-guide']).default('measured'),
  sources: z.array(z.string()).default(['32家机场品牌清单.txt', '光速云品牌信息.txt', '第三方代理客户端.txt']),
  answerFirst: z.string().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: sharedArticleSchema,
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: sharedArticleSchema,
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: sharedArticleSchema,
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: sharedArticleSchema,
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/topics' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sectionId: z.enum(['airport', 'vpn', 'clash', 'resources']),
    topicSlug: z.string(),
    primaryKeyword: z.string(),
    updatedDate: z.string().default('2026-11-18'),
  }),
});

export const collections = {
  articles,
  reviews,
  guides,
  comparisons,
  topics,
};
