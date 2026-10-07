import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const repositories = {
  backend: {
    commit: '46379592d0912cd2efc7885119d95715ea86608c',
    generationCommand: 'pnpm openapi:generate',
    path: resolve(root, '..', 'lumenbazaar-backend'),
    release: 'Phase 24 pinned release candidate (not deployed)',
    url: 'https://github.com/LumenRoute/lumenbazaar-backend',
  },
  contracts: {
    commit: '10460b5740a42def0e00fd03800b6d2ddf15d8ae',
    generationCommand: 'pnpm artifacts:generate && pnpm bindings:generate',
    path: resolve(root, '..', 'lumenbazaar-contracts'),
    release: 'v0.2.0-testnet.20261007',
    url: 'https://github.com/LumenRoute/lumenbazaar-contracts',
  },
};

const artifacts = [
  ['backend', 'docs/api/openapi.json', 'generated/openapi/openapi.json'],
  ['backend', 'docs/api/openapi.md', 'generated/openapi/openapi.md'],
  ['contracts', 'artifacts/spec/upto-session.json', 'generated/contracts/upto-session.spec.json'],
  ['contracts', 'bindings/upto-session/src/index.ts', 'generated/contracts/upto-session.ts'],
  ['contracts', 'artifacts/interface/upto-session-v2.json', 'generated/contracts/upto-session.interface.json'],
  ['contracts', 'artifacts/testnet/lifecycle-2026-10-07.json', 'generated/contracts/testnet-lifecycle.json'],
  ['contracts', 'deployments/testnet-2026-10-07.json', 'generated/contracts/testnet-deployment.json'],
];

const files = [];
for (const [repositoryName, sourcePath, destinationPath] of artifacts) {
  const repository = repositories[repositoryName];
  const content = execFileSync('git', ['show', `${repository.commit}:${sourcePath}`], {
    cwd: repository.path,
    maxBuffer: 16 * 1024 * 1024,
  });
  const destination = resolve(root, destinationPath);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, content);
  files.push({
    destination: destinationPath.replaceAll('\\', '/'),
    repository: repositoryName,
    sha256: createHash('sha256').update(content).digest('hex'),
    sourcePath,
  });
}

const manifest = {
  schemaVersion: 1,
  generatedAt: '2026-10-07T17:22:45+01:00',
  repositories: Object.fromEntries(
    Object.entries(repositories).map(([name, repository]) => [
      name,
      {
        commit: repository.commit,
        generationCommand: repository.generationCommand,
        release: repository.release,
        url: repository.url,
      },
    ]),
  ),
  files,
};

writeFileSync(
  resolve(root, 'generated/manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
);
console.log(`Synchronized ${files.length} artifacts from pinned revisions.`);
