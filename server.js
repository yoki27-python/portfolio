const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = parseInt(process.env.PORT, 10) || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);

  // Security: prevent path traversal out of __dirname
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>404 Not Found - Yokeshwaran R Portfolio</title>
          <style>
            body { background: #08090C; color: #E2E8F0; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { text-align: center; padding: 2.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; background: #0F172A; max-width: 450px; }
            h1 { color: #00F2FE; margin: 0 0 10px 0; font-size: 3rem; }
            p { color: #94A3B8; margin-bottom: 20px; }
            a { color: #00F2FE; text-decoration: none; border: 1px solid rgba(0, 242, 254, 0.4); padding: 8px 18px; border-radius: 8px; font-weight: 600; }
            a:hover { background: rgba(0, 242, 254, 0.1); }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>404</h1>
            <p>File not found: ${escapeHtml(reqPath)}</p>
            <p><a href="/">Return to Home</a></p>
          </div>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    });
    stream.pipe(res);
  });
});

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function listen(port) {
  server.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`  🌟 Yokeshwaran R — Portfolio Server Live`);
    console.log(`  🚀 URL: http://localhost:${port}`);
    console.log(`  📂 Root Directory: ${__dirname}`);
    console.log(`  ⚡ Ready for local preview or cloud container`);
    console.log(`======================================================\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} is currently in use, falling back to port ${PORT + 1}...`);
    PORT++;
    listen(PORT);
  } else {
    console.error('Server encountered an error:', err);
  }
});

if (require.main === module) {
  listen(PORT);
}

module.exports = server;
