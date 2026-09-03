# Monitoring

Monitoring is required for both hosted and self-hosted LumenBazaar deployments. Operators need to know whether verification, settlement, discovery, search, workers, MCP tools, and network dependencies are healthy.

## Monitoring Goals

Monitoring should answer:

- Is the API up?
- Are verify requests succeeding?
- Are settlement requests succeeding?
- Is Stellar RPC healthy?
- Is Horizon healthy where used?
- Are workers keeping up?
- Is search fresh?
- Are catalog validation failures normal or suspicious?
- Are receipts finalized?
- Is conformance passing?
- Are public metrics current?

## Core Metrics

Track:

| Metric | Why it matters |
| --- | --- |
| API uptime | Shows whether clients can reach the facilitator and discovery APIs. |
| Verify latency | Measures payment verification performance. |
| Settle latency | Measures time from settlement request to transaction submission or confirmation. |
| RPC error rate | Detects Stellar dependency degradation. |
| Settlement success rate | Shows whether payments are completing. |
| Queue depth | Detects delayed workers. |
| Search latency | Measures discovery usability. |
| Cataloging failures | Detects bad metadata and poisoning attempts. |
| Resource count | Shows discovery index growth. |
| Payment volume | Supports operator and funding reporting. |
| Contract errors | Detects `upto` session or policy wallet failures. |

## API Metrics

The backend should expose:

```txt
GET /metrics
GET /health
GET /version
GET /v1/networks
```

Recommended API metrics:

- Request count.
- Error count.
- p50 latency.
- p95 latency.
- p99 latency if available.
- Status codes.
- Route-level latency.
- Rate-limit count.
- Authentication or authorization failures where applicable.

## Facilitator Metrics

Track facilitator behavior separately:

- `/v1/supported` requests.
- `/v1/verify` requests.
- `/v1/verify` success rate.
- `/v1/verify` failure count by error code.
- `/v1/settle` requests.
- `/v1/settle` success rate.
- `/v1/settle` failure count by error code.
- Replay detection count.
- Expired auth count.
- Amount mismatch count.
- Asset mismatch count.
- Recipient mismatch count.

## Stellar Dependency Metrics

Track:

- RPC availability.
- RPC latency.
- RPC error count.
- Horizon availability where used.
- Horizon latency where used.
- Latest observed ledger.
- Settlement submission failures.
- Confirmation delay.
- Trustline failures.

Network metrics must be tagged by network. Do not mix testnet and mainnet data.

## Worker Metrics

Worker jobs:

```txt
settlement-confirmation-worker
resource-indexing-worker
search-sync-worker
conformance-runner-worker
network-health-worker
receipt-finalizer-worker
stale-payment-cleanup-worker
```

Track for each:

- Queue depth.
- Active jobs.
- Completed jobs.
- Failed jobs.
- Retry count.
- Dead-letter count.
- Processing latency.
- Last successful run.

## Discovery And Search Metrics

Track:

- Resource count.
- Active seller count.
- Catalog events.
- Catalog validation failures.
- Route template failures.
- Domain verification failures.
- Search request count.
- Search latency.
- Empty search result count.
- `partialResults` count.
- Index freshness.

High catalog failure rates can be normal during development, but sudden spikes in production may indicate abuse or poisoning attempts.

## MCP Metrics

Track:

- MCP server uptime.
- Tool call count.
- Tool call latency.
- Tool error count by code.
- Search tool calls.
- Inspect tool calls.
- Paid call tool calls.
- Budget rejections.
- Receipt fetches.
- Supported network queries.

MCP metrics should not log private prompts, secrets, or payment credentials.

## Contract Metrics

After `upto` integration, track:

- Session creation count.
- Settlement count.
- Cancellation count.
- Expiry count.
- Over-cap rejection count.
- Double-settlement rejection count.
- TTL extension count.
- Contract error count by code.
- Gas/resource usage.

## Public Metrics

For SCF and ecosystem trust, publish:

- Number of indexed resources.
- Number of active sellers.
- Number of successful settlements.
- Testnet transaction hashes.
- Mainnet transaction hashes when live.
- Uptime.
- p50 and p95 latency.
- Conformance run status.

Public metrics should avoid leaking sensitive buyer information.

## Alerts

Recommended alerts:

- API unavailable.
- Verify error rate above threshold.
- Settlement failure rate above threshold.
- RPC unavailable.
- Horizon unavailable where used.
- Queue depth above threshold.
- Dead-letter jobs detected.
- Search index stale.
- Catalog poisoning signal detected.
- Mainnet settlement disabled.
- Conformance run failed.
- Contract error spike.

## Dashboard Views

The frontend operator dashboard should show:

- API status.
- Queue depth.
- Settlement latency.
- RPC health.
- Horizon health.
- Error rate.
- Search index health.
- Supported networks.
- Conformance status.

## Evidence And Reporting

Monitoring data should support:

- Operator incident response.
- Public status page.
- SCF progress reports.
- Drips contributor evidence.
- Security review.
- Mainnet launch review.

Metrics should be timestamped and tagged by environment and network.
