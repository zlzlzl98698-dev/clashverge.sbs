import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site?.toString() || siteConfig.url).replace(/\/$/, '');
  const content = [
    '# ============================================================================== #',
    '# robots.txt for 订阅指南 (https://clashverge.sbs/)',
    '# Standardized Pre-launch Search Engine Infrastructure Config',
    '# ============================================================================== #',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /draft/',
    'Disallow: /internal/',
    '',
    '# Explicit Search Engine Allow Directives',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: bingbot',
    'Allow: /',
    '',
    'User-agent: Baiduspider',
    'Allow: /',
    '',
    'User-agent: yisouspider',
    'Allow: /',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    `Sitemap: ${baseUrl}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
