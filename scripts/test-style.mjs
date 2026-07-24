import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

const forbiddenCharacter = String.fromCodePoint(0x2014);
const defaultTargets = ['astro.config.mjs', 'public', 'scripts', 'src'];
const ignoredDirectories = new Set(['.astro', '.git', 'dist', 'node_modules']);
const textExtensions = new Set([
  '',
  '.astro',
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.scss',
  '.ts',
  '.tsx',
  '.txt',
  '.xml',
  '.yaml',
  '.yml',
]);

async function collectFiles(path) {
  const info = await stat(path);
  if (info.isFile()) return textExtensions.has(extname(path)) ? [path] : [];

  const files = [];
  for (const entry of await readdir(path, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    files.push(...(await collectFiles(resolve(path, entry.name))));
  }
  return files;
}

const targets = process.argv.slice(2).length > 0 ? process.argv.slice(2) : defaultTargets;
const files = (
  await Promise.all(
    targets.map(async (target) => {
      const absoluteTarget = resolve(target);
      try {
        return await collectFiles(absoluteTarget);
      } catch (error) {
        if (error?.code === 'ENOENT') return [];
        throw error;
      }
    }),
  )
).flat();

const violations = [];
for (const file of files) {
  const contents = await readFile(file, 'utf8');
  contents.split('\n').forEach((line, index) => {
    if (line.includes(forbiddenCharacter)) {
      violations.push(`${relative(process.cwd(), file)}:${index + 1}`);
    }
  });
}

if (violations.length > 0) {
  console.error(`Forbidden U+2014 character found in ${violations.length} line(s):`);
  violations.forEach((violation) => console.error(`  ${violation}`));
  process.exit(1);
}

console.log(`Style check passed across ${files.length} text file(s): no U+2014 character found.`);
