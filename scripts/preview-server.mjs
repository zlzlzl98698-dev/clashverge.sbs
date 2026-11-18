import http from 'node:http';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4321;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pagefind': 'application/octet-stream',
  '.pf_meta': 'application/octet-stream',
  '.pf_index': 'application/octet-stream',
  '.pf_fragment': 'application/octet-stream',
};

// Check if a port is available on both IPv4 and IPv6
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        tester.close(() => resolve(true));
      })
      .listen(port);
  });
}

// Automatically probe and increment to find a clean, non-conflicting port
async function findFreePort(startPort, maxAttempts = 50) {
  for (let i = 0; i < maxAttempts; i++) {
    const candidate = startPort + i;
    const available = await isPortAvailable(candidate);
    if (available) {
      return candidate;
    }
  }
  throw new Error(`No free port found between ${startPort} and ${startPort + maxAttempts}`);
}

const server = http.createServer((req, res) => {
  try {
    let reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    let filePath = path.join(DIST_DIR, pathname);

    // If directory or ends with slash, look for index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath)) {
      if (fs.existsSync(`${filePath}.html`)) {
        filePath = `${filePath}.html`;
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const stat = fs.statSync(filePath);

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stat.size,
        // Strong no-cache header to prevent cross-project browser cache mixing
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
      });
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      return;
    }

    // 404 handler
    const notFoundPage = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(notFoundPage)) {
      const content = fs.readFileSync(notFoundPage);
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end(content);
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      res.end('404 Not Found');
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`500 Server Error: ${err.message}`);
  }
});

async function start() {
  const allocatedPort = await findFreePort(BASE_PORT);
  server.listen(allocatedPort, () => {
    console.log(`\n======================================================`);
    console.log(` [clashverge.sbs] 动态端口探测成功，服务已就绪！`);
    console.log(`------------------------------------------------------`);
    console.log(` 网站名称: 订阅指南 (clashverge.sbs)`);
    console.log(` 独占端口: ${allocatedPort}${allocatedPort !== BASE_PORT ? ` (原端口 ${BASE_PORT} 被占用，已自动避让)` : ''}`);
    console.log(` 访问地址: http://localhost:${allocatedPort}/`);
    console.log(` 备用地址: http://127.0.0.1:${allocatedPort}/`);
    console.log(`======================================================\n`);
  });
}

start().catch((err) => {
  console.error('Failed to start preview server:', err);
  process.exit(1);
});
