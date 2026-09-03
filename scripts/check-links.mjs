import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';

const root = process.cwd();
const markdownFiles = [];
const failures = [];

function walk(directory) {
  for (const entry of readdirSync(directory)) {
    if (['node_modules', 'build', '.docusaurus', '.git'].includes(entry)) {
      continue;
    }

    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (['.md', '.mdx'].includes(extname(entry))) {
      markdownFiles.push(fullPath);
    }
  }
}

function normalizeLink(rawLink) {
  return rawLink.split('#')[0].trim();
}

function shouldCheck(link) {
  return (
    link &&
    !link.startsWith('http://') &&
    !link.startsWith('https://') &&
    !link.startsWith('mailto:') &&
    !link.startsWith('#') &&
    !link.startsWith('/')
  );
}

walk(root);

for (const file of markdownFiles) {
  const content = await import('node:fs').then(({ readFileSync }) =>
    readFileSync(file, 'utf8'),
  );
  const links = content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g);

  for (const match of links) {
    const link = normalizeLink(match[1]);

    if (!shouldCheck(link)) {
      continue;
    }

    const target = resolve(dirname(file), link);
    if (!existsSync(target)) {
      failures.push(`${file.replace(`${root}\\`, '')}: ${match[1]}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Broken local markdown links:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked local markdown links in ${markdownFiles.length} files.`);
