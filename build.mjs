import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = resolve(projectRoot, 'dist');
if (outputDir !== resolve(projectRoot, 'dist')) throw new Error('Destino de build inválido.');
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'favicon.svg']) {
  await cp(resolve(projectRoot, file), resolve(outputDir, file));
}
await cp(resolve(projectRoot, 'public'), resolve(outputDir, 'public'), { recursive: true });
console.log('Build concluído em dist/.');
