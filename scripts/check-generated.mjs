import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const manifestPath = join(root, 'generated/manifest.json');
const failures = [];

if (!existsSync(manifestPath)) {
  console.error('Generated reference validation failed:\n- generated/manifest.json is missing');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
for (const repositoryName of ['backend', 'contracts']) {
  const repository = manifest.repositories?.[repositoryName];
  if (!/^[0-9a-f]{40}$/.test(repository?.commit ?? '')) {
    failures.push(`${repositoryName} does not identify an immutable source commit`);
  }
  for (const field of ['generationCommand', 'release', 'url']) {
    if (typeof repository?.[field] !== 'string' || repository[field].length === 0) {
      failures.push(`${repositoryName} is missing ${field}`);
    }
  }
}

for (const artifact of manifest.files ?? []) {
  const path = join(root, artifact.destination);
  if (!existsSync(path)) {
    failures.push(`${artifact.destination} is missing`);
    continue;
  }
  const checksum = createHash('sha256').update(readFileSync(path)).digest('hex');
  if (checksum !== artifact.sha256) {
    failures.push(`${artifact.destination} checksum differs from generated/manifest.json`);
  }
}

const openapi = readJson('generated/openapi/openapi.json');
for (const path of [
  '/ready',
  '/v1/supported',
  '/v1/verify',
  '/v1/settle',
  '/v1/receipts/{receiptId}',
  '/v1/discovery/search',
  '/v1/resources/{id}',
]) {
  if (openapi !== undefined && openapi.paths?.[path] === undefined) {
    failures.push(`OpenAPI is missing ${path}`);
  }
}

const contractInterface = readJson('generated/contracts/upto-session.interface.json');
for (const method of [
  'cancel',
  'create_session',
  'extend_ttl',
  'get_session',
  'initialize',
  'interface_version',
  'recover_expired',
  'settle',
]) {
  if (contractInterface !== undefined && !contractInterface.methods?.includes(method)) {
    failures.push(`Contract interface is missing method ${method}`);
  }
}
for (const event of ['SessionCreated', 'SessionSettled', 'SessionCancelled', 'SessionRecovered']) {
  if (
    contractInterface !== undefined &&
    !contractInterface.events?.some((candidate) => candidate.name === event)
  ) {
    failures.push(`Contract interface is missing event ${event}`);
  }
}
if (contractInterface !== undefined && contractInterface.errors?.length !== 22) {
  failures.push('Contract interface must expose the 22 released contract errors');
}

const deployment = readJson('generated/contracts/testnet-deployment.json');
const lifecycle = readJson('generated/contracts/testnet-lifecycle.json');
if (deployment?.contracts?.['upto-session']?.contractId !== lifecycle?.contractId) {
  failures.push('Contract ID differs between deployment and lifecycle evidence');
}
if (
  deployment?.contracts?.['upto-session']?.artifactSha256 !==
  deployment?.contracts?.['upto-session']?.wasmHash
) {
  failures.push('Released WASM hash differs from its artifact checksum');
}

if (failures.length > 0) {
  console.error('Generated reference validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${manifest.files.length} pinned generated references and checksums.`);

function readJson(relativePath) {
  try {
    return JSON.parse(readFileSync(join(root, relativePath), 'utf8'));
  } catch (error) {
    failures.push(`${relativePath} is not valid JSON: ${error.message}`);
    return undefined;
  }
}
