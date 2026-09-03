import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const requiredFiles = [
  'generated/openapi/README.md',
  'generated/contracts/README.md',
];

const failures = [];

for (const file of requiredFiles) {
  const path = join(process.cwd(), file);

  if (!existsSync(path)) {
    failures.push(`${file} is missing`);
    continue;
  }

  const content = readFileSync(path, 'utf8');

  if (!content.includes('Generated Reference Status')) {
    failures.push(`${file} does not include a generated reference status heading`);
  }

  if (!content.includes('Source Repository')) {
    failures.push(`${file} does not identify the source repository`);
  }
}

if (failures.length > 0) {
  console.error('Generated reference validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Generated reference placeholders are present.');
