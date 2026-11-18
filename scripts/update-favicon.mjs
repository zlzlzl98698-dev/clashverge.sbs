import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const b64 = fs.readFileSync(path.join(root, 'public/avatar.webp')).toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <clipPath id="avatar-clip">
      <rect width="64" height="64" rx="14" ry="14" />
    </clipPath>
  </defs>
  <rect width="64" height="64" rx="14" ry="14" fill="#FFFFFF" />
  <image width="64" height="64" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice" href="data:image/webp;base64,${b64}" />
</svg>`;

fs.writeFileSync(path.join(root, 'public/favicon.svg'), svg, 'utf-8');
if (fs.existsSync(path.join(root, 'dist'))) {
  fs.writeFileSync(path.join(root, 'dist/favicon.svg'), svg, 'utf-8');
}

// Also write avatar.webp directly to favicon.ico as a fallback image
const webpBuffer = fs.readFileSync(path.join(root, 'public/avatar.webp'));
fs.writeFileSync(path.join(root, 'public/favicon.ico'), webpBuffer);
if (fs.existsSync(path.join(root, 'dist'))) {
  fs.writeFileSync(path.join(root, 'dist/favicon.ico'), webpBuffer);
}

// Clean up temporary txt file
if (fs.existsSync(path.join(root, 'public/avatar.b64.txt'))) {
  fs.unlinkSync(path.join(root, 'public/avatar.b64.txt'));
}

console.log('[SUCCESS] public/favicon.svg and favicon.ico updated with avatar image.');
