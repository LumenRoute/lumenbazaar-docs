import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const docsRoot = join(root, 'docs');
const failures = [];

const requiredFiles = [
  'docs/introduction.md',
  'docs/getting-started.md',
  'docs/project/positioning.md',
  'docs/project/problem-and-goals.md',
  'docs/project/personas.md',
  'docs/project/non-goals.md',
  'docs/architecture/overview.md',
  'docs/architecture/payment-flow.md',
  'docs/architecture/discovery-flow.md',
  'docs/architecture/trust-model.md',
  'docs/architecture/repository-map.md',
  'docs/guides/seller-guide.md',
  'docs/guides/buyer-guide.md',
  'docs/guides/agent-guide.md',
  'docs/guides/operator-guide.md',
  'docs/guides/reviewer-quickstart.md',
  'docs/guides/testnet-guide.md',
  'docs/guides/mainnet-guide.md',
  'docs/security/threat-model.md',
  'docs/operations/runbook.md',
  'docs/operations/deployment-matrix.md',
  'docs/operations/maintenance.md',
  'docs/funding/tranche-evidence.md',
  'docs/reference/source-links.md',
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`${file} is missing`);
  }
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function requireText(file, text) {
  if (!read(file).includes(text)) {
    failures.push(`${file} must include: ${text}`);
  }
}

function walk(directory, files = []) {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (['.md', '.mdx'].includes(extname(entry))) {
      files.push(fullPath);
    }
  }

  return files;
}

for (const file of walk(docsRoot)) {
  const content = readFileSync(file, 'utf8');
  const relativePath = relative(root, file);

  if (/This page will/i.test(content)) {
    failures.push(`${relativePath} still contains placeholder wording`);
  }
}

requireText('docs/project/positioning.md', 'LumenBazaar lets AI agents and developers discover paid APIs');
requireText('docs/project/non-goals.md', 'LumenBazaar should not become a custodial wallet.');
requireText('docs/project/non-goals.md', 'Store buyer private keys.');
requireText('docs/architecture/payment-flow.md', 'Exact payments and `upto` sessions are separate flows.');
requireText('docs/architecture/discovery-flow.md', 'The discovery index stays off-chain by default.');
requireText('docs/architecture/trust-model.md', 'The facilitator verifies and settles authorized payment payloads.');
requireText('docs/architecture/trust-model.md', 'The two payment schemes have different trust and funding boundaries:');
requireText('docs/architecture/repository-map.md', 'LumenBazaar is split into four public repositories under the `LumenRoute` GitHub organization.');
requireText('docs/funding/tranche-evidence.md', 'Testnet transaction hashes are not mainnet evidence.');
requireText('docs/guides/reviewer-quickstart.md', 'Gate D remains open.');
requireText('docs/guides/reviewer-quickstart.md', 'Never set or echo the signing key');
requireText('docs/operations/deployment-matrix.md', 'No deployment of this revision');
requireText('docs/operations/deployment-matrix.md', 'Mainnet | Disabled');
requireText('docs/contracts/deployment.md', 'CCENNI5ZMMD3DCJXG5MURDXWUU3NG6JCFHDCDSEI4OMNWDJRY2IR36L3');
requireText('docs/reference/source-links.md', 'External protocol, package, and funding references can change');

if (/\bTBD\b/.test(read('docs/contracts/deployment.md'))) {
  failures.push('docs/contracts/deployment.md must not contain TBD deployment evidence');
}

if (failures.length > 0) {
  console.error('Documentation consistency validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Documentation consistency checks passed.');
