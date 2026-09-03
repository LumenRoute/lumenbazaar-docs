# Metrics

Metrics let operators, contributors, reviewers, and funders evaluate whether LumenBazaar is working. Metrics should distinguish repository progress, local validation, testnet activity, mainnet activity, conformance, uptime, and adoption.

## Metric Principles

- Label environment and network.
- Separate local, testnet, staging, and mainnet.
- Prefer receipts and transaction hashes over screenshots.
- Publish only non-sensitive information.
- Keep metrics reproducible.
- Avoid claiming success for unrun CI or pending checks.

## Repository Metrics

Track:

- Public repositories created.
- Issues opened.
- Issues closed.
- Pull requests opened.
- Pull requests merged.
- Contributors merged through Drips.
- CI pass rate.
- Test coverage where available.
- Generated reference freshness.

## Settlement Metrics

Track:

- Verification attempts.
- Verification success count.
- Verification failure count by error code.
- Settlement attempts.
- Settlement success count.
- Settlement failure count by error code.
- Settlement volume by network.
- Settlement volume by asset.
- p50 settlement latency.
- p95 settlement latency.
- Pending receipt count.
- Finalized receipt count.

## Indexed Resource Metrics

Track:

- Total indexed resources.
- Active resources.
- Disabled resources.
- Resources by type.
- Resources by network.
- Resources by asset.
- Resources with complete schemas.
- Resources with MCP metadata.
- Resources with verified seller domains.
- Catalog validation failures.
- Catalog events.

## Seller Metrics

Track:

- Active sellers.
- Verified seller domains.
- Sellers with published resources.
- Sellers with successful settlements.
- Seller onboarding completion rate.
- Domain verification failure count.

## Buyer And Agent Metrics

Track:

- Resource searches.
- Resource inspections.
- Paid call attempts.
- Successful paid calls.
- Failed paid calls by error code.
- Receipt fetches.
- Budget rejections.
- MCP tool calls.
- MCP paid-call successes.
- MCP paid-call failures.

## Conformance Metrics

Track:

- Latest conformance run ID.
- `/v1/supported` pass/fail.
- `/v1/verify` pass/fail.
- `/v1/settle` pass/fail.
- Exact scheme pass/fail.
- Stable error behavior pass/fail.
- Testnet conformance status.
- Mainnet conformance status when live.
- `Upto` conformance status after contract integration.
- Compatibility notes for unmodified x402 clients.

## Uptime And Latency Metrics

Track:

- API uptime.
- MCP server uptime.
- Frontend uptime.
- Docs uptime.
- p50 API latency.
- p95 API latency.
- p50 verify latency.
- p95 verify latency.
- p50 settle latency.
- p95 settle latency.
- Search latency.
- RPC latency.
- Horizon latency where used.

## Search Quality Metrics

Track:

- Query count.
- Empty result count.
- `partialResults` count.
- Click or selection rate where available.
- Resource type match quality.
- Seller verification coverage.
- Schema completeness coverage.
- Index freshness.
- Search latency.

## Contract Metrics

After `upto` contract integration, track:

- Session creation count.
- Session settlement count.
- Session cancellation count.
- Over-cap rejection count.
- Double-settlement rejection count.
- Expired settlement rejection count.
- TTL extension count.
- Contract error count.
- Gas/resource usage by function.

## Public Metrics Page

The public metrics page should show:

- Indexed resources.
- Active sellers.
- Successful settlements.
- Testnet transaction hashes.
- Mainnet transaction hashes when live.
- Uptime.
- p50 and p95 latency.
- Conformance status.

Public metrics should not expose private buyer data.

## Funding Report Metrics

SCF and Drips reports should include:

- Repository work completed.
- Issues completed.
- Contributors involved.
- Testnet transaction evidence.
- Mainnet transaction evidence when live.
- Conformance status.
- Public metrics.
- Known limitations.

## Metric Status Labels

Use these labels:

```txt
planned
instrumented
collecting
published
degraded
blocked
retired
```

## Evidence Table Template

| Metric | Environment | Network | Source | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Successful settlements | testnet | `stellar:testnet` | receipts | planned | Add after backend launch. |
| Mainnet settlements | mainnet | `stellar:pubnet` | receipts | blocked | Requires mainnet launch. |
| Conformance status | testnet | `stellar:testnet` | runner | planned | Add after conformance runner exists. |
