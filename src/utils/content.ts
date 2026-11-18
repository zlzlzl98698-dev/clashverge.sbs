import { getCollection } from 'astro:content';

export interface UnifiedContentItem {
  id: string;
  collection: 'articles' | 'reviews' | 'guides' | 'comparisons';
  slug: string;
  href: string;
  articleHref: string;
  readingMinutes: number;
  charCount: number;
  body: string;
  data: {
    title: string;
    description: string;
    slug: string;
    pubDate: string;
    updatedDate: string;
    category: 'airport' | 'vpn' | 'clash' | 'resources';
    topicSlug: string;
    clusterId?: string;
    contentType: 'article' | 'review' | 'guide' | 'comparison';
    tags: string[];
    cover: string;
    coverAlt: string;
    author: string;
    excerpt?: string;
    faq: { q: string; a: string }[];
    relatedSlugs: string[];
    relatedBrands: string[];
    pillar: boolean;
    draft: boolean;
    featured: boolean;
    seoTitle?: string;
    canonical?: string;
    searchIntent: 'Commercial Investigation' | 'Informational' | 'Transactional' | 'Troubleshooting';
    primaryKeyword: string;
    secondaryKeywords: string[];
    priceVerifiedDate: string;
    testDate: string;
    verificationStatus: 'measured' | 'vendor' | 'historical' | 'verified-guide';
    sources: string[];
    answerFirst?: string;
  };
  rawEntry: any;
}

export function estimateReadingMinutes(text: string = ''): { minutes: number; chars: number } {
  const clean = text.replace(/```[\s\S]*?```/g, '').replace(/[#>*_`~\-\[\]\(\)]/g, '').trim();
  const chars = clean.length;
  const minutes = Math.max(4, Math.round(chars / 420));
  return { minutes, chars };
}

export function getCanonicalHrefForItem(
  _collection: 'articles' | 'reviews' | 'guides' | 'comparisons',
  slug: string
): string {
  return `/articles/${slug}/`;
}

export async function getAllPublishedContent(): Promise<UnifiedContentItem[]> {
  const [articlesEntries, reviewsEntries, guidesEntries, comparisonsEntries] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('reviews', ({ data }) => !data.draft),
    getCollection('guides', ({ data }) => !data.draft),
    getCollection('comparisons', ({ data }) => !data.draft),
  ]);

  const mapEntry = (
    entry: any,
    collection: 'articles' | 'reviews' | 'guides' | 'comparisons'
  ): UnifiedContentItem => {
    const slug = entry.data.slug || entry.id;
    const { minutes, chars } = estimateReadingMinutes(entry.body || '');
    const href = getCanonicalHrefForItem(collection, slug);
    return {
      id: entry.id,
      collection,
      slug,
      href,
      articleHref: `/articles/${slug}/`,
      readingMinutes: minutes,
      charCount: chars,
      body: entry.body || '',
      data: entry.data,
      rawEntry: entry,
    };
  };

  const combined = [
    ...articlesEntries.map((e) => mapEntry(e, 'articles')),
    ...reviewsEntries.map((e) => mapEntry(e, 'reviews')),
    ...guidesEntries.map((e) => mapEntry(e, 'guides')),
    ...comparisonsEntries.map((e) => mapEntry(e, 'comparisons')),
  ];

  return combined.sort((a, b) => {
    if (a.data.pillar !== b.data.pillar) return a.data.pillar ? -1 : 1;
    return b.data.updatedDate.localeCompare(a.data.updatedDate);
  });
}

export function getCategoryLabel(cat: 'airport' | 'vpn' | 'clash' | 'resources'): string {
  const map: Record<string, string> = {
    airport: '机场推荐',
    vpn: 'VPN 与加速器',
    clash: 'Clash 客户端',
    resources: '资源与情报',
  };
  return map[cat] || '专题文章';
}
