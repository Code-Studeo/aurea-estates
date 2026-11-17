import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const servedRoot = resolve(projectRoot, process.argv[2] ?? '.');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let filePath = resolve(servedRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (filePath !== servedRoot && !filePath.startsWith(`${servedRoot}${sep}`)) {
      response.writeHead(403).end('Acesso negado');
      return;
    }
    if ((await stat(filePath)).isDirectory()) filePath = resolve(filePath, 'index.html');
    const file = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': mime[extname(filePath)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    response.end(file);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Não encontrado');
  }
});
const port = Number(process.env.PORT ?? 5173);
server.listen(port, '127.0.0.1', () => console.log(`AUREA ESTATES disponível em http://localhost:${port}`));
