import { lstat, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const fallbackLocales = ['de', 'nl', 'it'];
let removed = 0;

for (const locale of fallbackLocales) {
  const target = path.join(distRoot, locale, 'kb-preview');
  if (!target.startsWith(`${distRoot}${path.sep}`)) throw new Error(`Unsafe prune path: ${target}`);
  try {
    const stats = await lstat(target);
    if (!stats.isDirectory()) throw new Error(`Refusing to prune non-directory path: ${target}`);
    await rm(target, { recursive: true, force: false });
    removed += 1;
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

console.log(`Pruned ${removed} synthetic KB fallback tree${removed === 1 ? '' : 's'}.`);
