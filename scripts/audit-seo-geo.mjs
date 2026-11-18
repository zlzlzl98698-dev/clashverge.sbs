import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log('Total HTML pages in dist:', htmlFiles.length);

// 1. Robots & Sitemap check
const robotsPath = path.join(distDir, 'robots.txt');
const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf-8') : 'MISSING';

const sitemapIdx = fs.existsSync(path.join(distDir, 'sitemap-index.xml')) ? fs.readFileSync(path.join(distDir, 'sitemap-index.xml'), 'utf-8') : 'none';
const sitemap0 = fs.existsSync(path.join(distDir, 'sitemap-0.xml')) ? fs.readFileSync(path.join(distDir, 'sitemap-0.xml'), 'utf-8') : 'none';
const sitemapUrls = (sitemap0.match(/<loc>(.*?)<\/loc>/g) || []).map(s => s.replace(/<\/?loc>/g, ''));

// 2. Canonical check & Duplications
const canonicalMap = new Map();
const titleMap = new Map();
const descMap = new Map();
const wordCounts = [];
const missingRelExternalLinks = [];
const emptyAnchors = [];
const pathLeaks = [];
const trackingCodes = [];
const schemaTypesFound = new Set();
const noindexPages = [];
const faqSchemaCheck = [];

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf-8');

  // Noindex check
  if (html.includes('noindex')) {
    noindexPages.push(relPath);
  }

  // Tracking codes
  const gaMatch = html.match(/(G-[A-Z0-9]+|UA-[0-9-]+|hm\.baidu\.com)/gi);
  if (gaMatch) {
    trackingCodes.push({ file: relPath, match: gaMatch });
  }

  // Canonical
  const canMatch = html.match(/<link rel="canonical" href="(.*?)"/);
  const canonical = canMatch ? canMatch[1] : null;
  if (!canonical) {
    console.log('Missing canonical:', relPath);
  } else {
    if (canonicalMap.has(canonical)) {
      canonicalMap.get(canonical).push(relPath);
    } else {
      canonicalMap.set(canonical, [relPath]);
    }
  }

  // Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : '';
  if (title) {
    if (titleMap.has(title)) titleMap.get(title).push(relPath);
    else titleMap.set(title, [relPath]);
  }

  // Description
  const descMatch = html.match(/<meta name="description" content="(.*?)"/);
  const desc = descMatch ? descMatch[1] : '';
  if (desc) {
    if (descMap.has(desc)) descMap.get(desc).push(relPath);
    else descMap.set(desc, [relPath]);
  }

  // Chinese character count in body
  const bodyMatch = html.match(/<main[\s\S]*?<\/main>/) || html.match(/<body[\s\S]*?<\/body>/);
  const bodyText = bodyMatch ? bodyMatch[0].replace(/<[^>]+>/g, '').replace(/\s+/g, '') : '';
  const chineseChars = (bodyText.match(/[\u4e00-\u9fa5]/g) || []).length;
  wordCounts.push({ file: relPath, count: chineseChars, totalLen: bodyText.length });

  // External links check
  const linkMatches = html.matchAll(/<a\s+[^>]*?href="(https?:\/\/[^"]+)"[^>]*>/gi);
  for (const m of linkMatches) {
    const fullTag = m[0];
    const href = m[1];
    if (!href.includes('clashverge.sbs') && !href.includes('schema.org') && !href.includes('localhost') && !href.includes('w3.org')) {
      const relMatch = fullTag.match(/rel="([^"]*)"/i);
      const rel = relMatch ? relMatch[1] : '';
      if (!rel.includes('nofollow') || !rel.includes('sponsored')) {
        missingRelExternalLinks.push({ file: relPath, href, rel, tag: fullTag });
      }
    }
  }

  // Empty anchors
  const emptyAMatches = html.matchAll(/<a(?![^>]*href)[^>]*>/gi);
  for (const m of emptyAMatches) {
    emptyAnchors.push({ file: relPath, tag: m[0] });
  }

  // Path leaks / internal IP leaks
  if (html.includes('C:\\Users') || html.includes('192.168.') || (html.includes('127.0.0.1') && !html.includes('schema.org'))) {
    pathLeaks.push(relPath);
  }

  // JSON-LD inspection
  const jsonLdMatches = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
  for (const jm of jsonLdMatches) {
    try {
      const parsed = JSON.parse(jm[1]);
      if (parsed['@graph']) {
        for (const item of parsed['@graph']) {
          if (item['@type']) schemaTypesFound.add(item['@type']);
          if (item['@type'] === 'FAQPage') {
            const domMatches = item.mainEntity ? item.mainEntity.every(q => html.includes(q.name.substring(0, 20))) : true;
            faqSchemaCheck.push({ file: relPath, qCount: item.mainEntity ? item.mainEntity.length : 0, domMatches });
          }
        }
      }
    } catch (e) {
      console.error('JSON-LD Parse Error in', relPath, e.message);
    }
  }
}

const report = {
  totalPages: htmlFiles.length,
  robotsTxt: robots,
  sitemapCount: sitemapUrls.length,
  sitemapMatchesDist: sitemapUrls.length === htmlFiles.length - 1, // minus 404.html
  canonicalCount: canonicalMap.size,
  duplicateCanonicals: Array.from(canonicalMap.entries()).filter(([k, v]) => v.length > 1),
  duplicateTitles: Array.from(titleMap.entries()).filter(([k, v]) => v.length > 1),
  duplicateDescriptions: Array.from(descMap.entries()).filter(([k, v]) => v.length > 1),
  missingRelExternalLinks: missingRelExternalLinks,
  emptyAnchors: emptyAnchors,
  pathLeaks: pathLeaks,
  trackingCodes: trackingCodes,
  noindexPages: noindexPages,
  schemaTypes: Array.from(schemaTypesFound),
  faqPagesCount: faqSchemaCheck.length,
  wordCountStats: {
    min: wordCounts.slice().sort((a,b) => a.count - b.count).slice(0, 5),
    max: wordCounts.slice().sort((a,b) => b.count - a.count).slice(0, 5),
    lessThan1000: wordCounts.filter(w => w.count < 1000),
    between1000And2000: wordCounts.filter(w => w.count >= 1000 && w.count < 2000),
    greaterThan2000: wordCounts.filter(w => w.count >= 2000),
    averageChineseChars: Math.round(wordCounts.reduce((s, w) => s + w.count, 0) / wordCounts.length),
  }
};

fs.writeFileSync('audit-result.json', JSON.stringify(report, null, 2));
console.log('Audit completed and written to audit-result.json');
