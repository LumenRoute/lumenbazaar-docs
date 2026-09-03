# Runbook

This runbook contains repeatable operator procedures for LumenBazaar deployments. Keep commands implementation-specific once the backend, frontend, contracts, and docs repos publish their final scripts.

## Procedure Rules

- Identify environment before acting: local, testnet, staging, or mainnet.
- Identify network before payment actions: `stellar:testnet` or `stellar:pubnet`.
- Capture timestamps, commit SHAs, deployment IDs, and run IDs.
- Prefer disabling unsafe paths before restoring availability.
- Never paste private keys, seed phrases, bearer tokens, or production credentials into issue comments or public logs.

## Deploy Backend API

Checklist:

1. Confirm target environment.
2. Confirm backend commit SHA.
3. Confirm database migrations have been reviewed.
4. Confirm environment variables are present.
5. Confirm supported networks and assets.
6. Deploy API service.
7. Run health check.
8. Run `/v1/supported`.
9. Run smoke verification against testnet or staging fixtures.
10. Confirm metrics are flowing.

Evidence:

- Deployment ID.
- Commit SHA.
- Health result.
- `/v1/supported` output.
- Smoke test output.

## Deploy Worker

Checklist:

1. Confirm worker commit SHA matches backend API compatibility.
2. Confirm Redis and database connectivity.
3. Deploy worker service.
4. Confirm queue consumers are active.
5. Confirm dead-letter queue is empty or understood.
6. Process a test job where safe.
7. Confirm metrics.

Worker queues:

```txt
settlement-confirmation-worker
resource-indexing-worker
search-sync-worker
conformance-runner-worker
network-health-worker
receipt-finalizer-worker
stale-payment-cleanup-worker
```

## Deploy MCP Server

Checklist:

1. Confirm MCP server commit SHA.
2. Confirm backend API URL.
3. Confirm budget policy configuration.
4. Start MCP server.
5. Call `list_supported_networks`.
6. Call `search_paid_resources` with a safe test query.
7. Confirm tool errors are deterministic.

Disable `call_paid_resource` if payment safety is unclear.

## Deploy Frontend

Checklist:

1. Confirm frontend commit SHA.
2. Confirm API URL.
3. Confirm default network.
4. Confirm mainnet feature flags.
5. Deploy frontend.
6. Open dashboard.
7. Check explore, seller onboarding, payment playground, transactions, operator health, and conformance views.

The frontend must display network, asset, amount, recipient, status, and transaction hashes where available.

## Deploy Docs

Checklist:

1. Confirm docs commit SHA.
2. Run lint.
3. Run link checks.
4. Run production build.
5. Confirm no docs claim official Stellar, SDF, or SCF endorsement.
6. Deploy docs site.
7. Check navigation and generated references.

Local checks:

```bash
npm run lint
npm run links
npm run build
```

## Database Migration Procedure

Checklist:

1. Review migration diff.
2. Confirm backup exists for production.
3. Confirm migration has been tested on an empty database.
4. Confirm migration has been tested on representative existing data.
5. Deploy migration during maintenance window if needed.
6. Run application smoke tests.
7. Confirm payment, settlement, discovery, and receipt queries.

Rollback planning is required before production migrations.

## Contract Deployment Procedure

Checklist:

1. Run `cargo test`.
2. Build contract.
3. Generate ABI/spec files.
4. Generate TypeScript bindings if needed.
5. Deploy locally.
6. Run local smoke test.
7. Deploy to testnet.
8. Record contract ID.
9. Record transaction hash.
10. Update docs and backend configuration.

Mainnet contract deployment requires audit readiness and operator sign-off.

## Rollback Procedure

For service rollback:

1. Identify the bad deployment.
2. Identify affected environment and network.
3. Disable unsafe actions if needed.
4. Roll back to last known-good commit or image.
5. Verify health.
6. Verify payment safety.
7. Verify worker queues.
8. Publish status update if user-facing.

For mainnet payment concerns, disable settlement before experimenting.

## Worker Restart Procedure

Checklist:

1. Check queue depth.
2. Check active jobs.
3. Check failed jobs.
4. Stop worker gracefully.
5. Start worker.
6. Confirm consumers are active.
7. Confirm no duplicate settlement attempts.
8. Monitor job processing.

Settlement jobs must be idempotent.

## Search Reindex Procedure

Checklist:

1. Identify affected resource range.
2. Confirm source resource metadata versions are valid.
3. Pause cataloging if poisoning is suspected.
4. Rebuild search documents.
5. Confirm filters and ranking.
6. Clear `partialResults` only when indexing is complete.

## Conformance Rerun Procedure

Checklist:

1. Confirm target environment.
2. Confirm network.
3. Confirm facilitator URL.
4. Run `/v1/supported` check.
5. Run `/v1/verify` check.
6. Run `/v1/settle` check.
7. Record exact scheme result.
8. Record `upto` result only after contract integration exists.
9. Store conformance run ID.
10. Publish report.

## Emergency Disablement

Operators should be able to disable:

- Mainnet verification.
- Mainnet settlement.
- Affected asset.
- Affected seller.
- Affected resource.
- Cataloging.
- MCP paid calls.
- `Upto` session creation.
- `Upto` settlement.

Disablement should be reversible, logged, and visible in operator status.

## Post-Change Verification

After any operational change, run:

- Health checks.
- Network support checks.
- Metrics checks.
- Worker checks.
- Discovery search checks.
- Receipt fetch checks.
- Conformance checks where relevant.

Store evidence with the incident, deployment, or release record.
