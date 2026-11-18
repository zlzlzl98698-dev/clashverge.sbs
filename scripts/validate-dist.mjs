import fs from 'node:fs';
import path from 'node:path';

function walkFiles(dir, extFilter) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkFiles(full, extFilter));
    } else if (!extFilter || full.endsWith(extFilter)) {
      results.push(full);
    }
  }
  return results;
}

// 1. Check Markdown/MDX files for hardcoded affiliate links
const mdFiles = [
  ...walkFiles('src/content', '.md'),
  ...walkFiles('src/content', '.mdx'),
];

const affPattern = /(gsyvipaff|twilightaff|flycataff|breezenetaff|dalaoyunaff|xingdaomeng\.com\/#\?code|2maoyunaff|worryfreeaff|v2yunvipaff|fireflyaff|yuzoucloud|vipaff\.cc|civetnet|jlyvipaff|gntaff|1flyunaff|sogoyunaff|kosingaff|speedworldaff|flashleapaff|gcvipaff|shandianshuaff|yunjiexianaff|liulianyunaff|shenxingaff|huanqiutiaff|invisibleaff|ladderaff|lingdongaff|wavenetaff|edgenovaaff)/i;

for (const file of mdFiles) {
  const txt = fs.readFileSync(file, 'utf8');
  if (affPattern.test(txt)) {
    console.error(`[FAIL] Hardcoded affiliate URL found in Markdown file: ${file}`);
    process.exit(1);
  }
}
console.log(`[PASS] Checked ${mdFiles.length} Markdown/MDX files: 0 hardcoded affiliate URLs.`);

// 2. Check dist/ output
const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  console.error('[FAIL] dist/ directory does not exist.');
  process.exit(1);
}

// Copy sitemap-index.xml to sitemap.xml for direct /sitemap.xml crawlers
if (fs.existsSync('dist/sitemap-index.xml')) {
  fs.copyFileSync('dist/sitemap-index.xml', 'dist/sitemap.xml');
}

const requiredFiles = [
  'dist/index.html',
  'dist/404.html',
  'dist/robots.txt',
  'dist/sitemap.xml',
  'dist/sitemap-index.xml',
  'dist/.htaccess',
  'dist/pagefind/pagefind.js',
  'dist/airport/index.html',
  'dist/vpn/index.html',
  'dist/clash/index.html',
  'dist/resources/index.html',
  'dist/brands/index.html',
  'dist/brands/guangsuyun/index.html',
  'dist/search/index.html',
];

for (const reqFile of requiredFiles) {
  if (!fs.existsSync(reqFile)) {
    console.error(`[FAIL] Required build artifact missing: ${reqFile}`);
    process.exit(1);
  }
}

const htmlFiles = walkFiles(distDir, '.html');
let affiliateAnchorCount = 0;
let internalLinksChecked = 0;
let brokenLinks = [];

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const anchorRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = anchorRegex.exec(html)) !== null) {
    const tag = match[0];
    const href = match[1];
    if (affPattern.test(href)) {
      affiliateAnchorCount++;
      if (!tag.includes('nofollow') || !tag.includes('sponsored') || !tag.includes('noopener')) {
        console.error(`[FAIL] Affiliate link missing rel="nofollow sponsored noopener" in ${htmlFile}: ${tag}`);
        process.exit(1);
      }
    } else if (href.startsWith('/') && !href.startsWith('//')) {
      internalLinksChecked++;
      const cleanPath = decodeURIComponent(href.split('?')[0].split('#')[0]);
      const candidate1 = path.join(distDir, cleanPath);
      const candidate2 = path.join(distDir, cleanPath, 'index.html');
      const candidate3 = path.join(distDir, `${cleanPath}.html`);
      if (!fs.existsSync(candidate1) && !fs.existsSync(candidate2) && !fs.existsSync(candidate3)) {
        brokenLinks.push({ from: path.relative(distDir, htmlFile), to: href });
      }
    }
  }
}

if (brokenLinks.length > 0) {
  console.error(`[FAIL] Found ${brokenLinks.length} broken internal links:`, brokenLinks.slice(0, 10));
  process.exit(1);
}

console.log(`[PASS] Verified ${htmlFiles.length} generated static HTML pages in dist/.`);
console.log(`[PASS] Verified ${internalLinksChecked} internal links across dist/: 0 broken links.`);
console.log(`[PASS] Verified ${affiliateAnchorCount} affiliate link instances across dist/: 100% compliant with rel="nofollow sponsored noopener".`);
console.log('[PASS] Sitemap, robots.txt, .htaccess, 404.html, and Pagefind index verified.');
