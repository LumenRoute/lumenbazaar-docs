import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const checkedExtensions = new Set(['.md', '.mdx']);
const failures = [];
const files = [];

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

    if (checkedExtensions.has(extname(entry))) {
      files.push(fullPath);
    }
  }
}

function isSafeDenial(line) {
  const lower = line.toLowerCase();

  return (
    lower.includes('not official') ||
    lower.includes('do not imply') ||
    lower.includes('must not imply') ||
    lower.includes('must never imply') ||
    lower.includes('should never imply') ||
    lower.includes('does not imply') ||
    lower.includes('should not imply') ||
    lower.includes('without claiming') ||
    lower.includes('no page claims') ||
    lower.includes('no page implies') ||
    lower.includes('no docs claim') ||
    lower.includes('no doc claims')
  );
}

walk(root);

for (const file of files) {
  const relativePath = relative(root, file);
  const content = readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  let fenceCount = 0;

  for (const [index, line] of lines.entries()) {
    const lineNumber = index + 1;

    if (line.startsWith('```')) {
      fenceCount += 1;
    }

    if (/```mermaid\s+\S/.test(line)) {
      failures.push(`${relativePath}:${lineNumber} Mermaid fence should only declare mermaid`);
    }

    if (/\bTODO\b/i.test(line)) {
      failures.push(`${relativePath}:${lineNumber} contains TODO`);
    }

    if (
      /\bofficial\s+(Stellar|SDF|SCF)\b/i.test(line) &&
      !isSafeDenial(line)
    ) {
      failures.push(`${relativePath}:${lineNumber} may imply official ecosystem status`);
    }

    if (
      /\b(endorse|endorsed|endorsement)\b.*\b(Stellar|SDF|SCF)\b/i.test(line) &&
      !isSafeDenial(line)
    ) {
      failures.push(`${relativePath}:${lineNumber} may imply endorsement`);
    }
  }

  if (fenceCount % 2 !== 0) {
    failures.push(`${relativePath} has an unbalanced markdown fence`);
  }
}

if (failures.length > 0) {
  console.error('Content quality validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked content quality in ${files.length} markdown files.`);
