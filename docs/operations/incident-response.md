# Incident Response

Incident response defines how operators handle service degradation, payment failures, discovery abuse, and security-sensitive events. LumenBazaar incidents must be handled with clear evidence, conservative public communication, and strict separation between testnet and mainnet impact.

## Severity Levels

| Severity | Meaning | Examples | Response Target |
| --- | --- | --- | --- |
| Critical | Funds, private data, or mainnet settlement integrity may be at risk. | Wrong recipient settlement, replay accepted, private key exposure, contract cap bypass. | Immediate mitigation and maintainer escalation. |
| High | A major user flow or trust boundary is broken. | Mainnet settlement failures, forged trusted catalog entries, MCP budget bypass. | Same-day mitigation and public status update if user-facing. |
| Medium | Degraded reliability or incomplete evidence affects users. | RPC degradation, stale search index, missing receipts, high verification latency. | Triage and fix within normal incident workflow. |
| Low | Documentation, observability, or non-critical behavior is unclear. | Incorrect runbook step, missing dashboard label, stale generated reference warning. | Track and resolve through normal issue workflow. |

## Incident Roles

Assign clear ownership:

- Incident lead coordinates response.
- Backend owner investigates API, payment, worker, and database behavior.
- Contracts owner investigates `upto` session or smart account behavior.
- Operator owner manages deployment, rollback, disablement, and monitoring.
- Communications owner writes status updates and post-incident notes.

Small teams can have one person hold multiple roles, but the responsibilities should still be explicit.

## First Actions

For any incident:

1. Identify affected environment: local, testnet, staging, or mainnet.
2. Identify affected network: `stellar:testnet`, `stellar:pubnet`, or both.
3. Identify affected component: API, worker, MCP server, search, database, Redis, frontend, docs, contract, RPC, or Horizon.
4. Capture timestamps.
5. Capture request IDs, payment attempt IDs, settlement IDs, receipt IDs, transaction hashes, and error codes.
6. Stop unsafe behavior before optimizing for uptime.
7. Avoid publishing private keys, bearer tokens, seed phrases, or sensitive payment payloads.

## Settlement Failure Response

Use this path when `/v1/settle` fails or settlement confirmation is delayed.

Immediate checks:

- Is the issue testnet or mainnet?
- Is Stellar RPC reachable?
- Is Horizon reachable where used?
- Are workers processing settlement confirmation jobs?
- Are failures isolated to one asset?
- Are failures isolated to one seller or resource?
- Are receipts stuck in pending state?
- Are trustline failures being surfaced as `TRUSTLINE_REQUIRED`?

Mitigations:

- Pause settlement for affected network if mainnet risk is unclear.
- Keep verification enabled only if settlement safety is not affected.
- Retry idempotent confirmation jobs.
- Disable affected asset if asset configuration is suspect.
- Publish status update if user-facing.

Evidence to retain:

- Settlement request ID.
- Payment attempt ID.
- Settlement ID.
- Receipt ID.
- Transaction hash when available.
- Error code.
- RPC response summary.
- Worker job ID.

## RPC Or Horizon Degradation

Use this path when Stellar network dependencies are degraded.

Immediate checks:

- Latest observed ledger.
- RPC latency.
- RPC error rate.
- Horizon latency and error rate where used.
- Whether degradation is network-specific.
- Whether settlement submissions are failing or only confirmations are delayed.

Mitigations:

- Switch to configured backup endpoint if available.
- Slow settlement retry cadence if RPC is rate limiting.
- Mark operator health as degraded.
- Return stable failure or pending states instead of generic errors.
- Avoid duplicate settlement attempts.

Communication:

- State affected network.
- State whether verification, settlement, confirmation, or discovery is affected.
- State whether funds are at risk if known.

## Search Index Poisoning

Use this path when malicious or incorrect resources appear in discovery.

Immediate checks:

- Resource ID and seller ID.
- Seller domain verification state.
- Catalog event history.
- Resource metadata version.
- Route template.
- Payment requirements.
- Search document content.

Mitigations:

- Remove or quarantine affected resource.
- Disable seller if forged metadata is confirmed.
- Rebuild search document from trusted resource versions.
- Increase cataloging rate limits if abuse is active.
- Add regression tests for the bypass.

Evidence to retain:

- Catalog event IDs.
- Submitted metadata.
- Validation result.
- Search result snapshot.
- Audit log entry.

## Replay Or Verification Incident

Use this path when reused, invalid, or expired payment payloads are accepted.

Immediate checks:

- Payment hash uniqueness constraint.
- Verification service logs.
- Expiry validation.
- Network and asset validation.
- Recipient and amount validation.
- Database transaction boundaries.

Mitigations:

- Disable settlement if replay acceptance is possible.
- Patch verification before re-enabling affected flows.
- Add regression tests.
- Review affected receipts and settlements.

Critical replay issues require private security handling until mitigated.

## MCP Budget Incident

Use this path when an agent can exceed configured budget or call resources outside policy.

Immediate checks:

- Tool input.
- Tool output.
- Budget configuration.
- Resource inspection result.
- Payment preparation path.
- Paid call path.

Mitigations:

- Disable `call_paid_resource`.
- Keep `search_paid_resources` and `inspect_resource` available if safe.
- Add budget enforcement regression tests.
- Update agent docs if policy semantics changed.

## Contract Incident

Use this path for `upto-session` failures.

Immediate checks:

- Contract ID.
- Network.
- Session ID.
- Buyer.
- Seller.
- Asset.
- Cap.
- Actual amount.
- Expiry ledger.
- Status.
- Usage hash.
- Transaction hash.

Mitigations:

- Disable new `upto` sessions.
- Disable backend `upto` settlement.
- Preserve exact payment flow if unaffected.
- Publish contract-specific limitations.
- Prepare patched contract deployment only after review.

## Communication Expectations

Public updates should include:

- Affected environment.
- Affected network.
- Affected component.
- User-visible impact.
- Mitigation status.
- Whether mainnet funds are affected.
- Next update time if incident is ongoing.

Do not speculate about root cause before evidence exists.

## Post-Incident Review

After resolution:

1. Write root cause.
2. List user impact.
3. List evidence.
4. List mitigations applied.
5. Add tests or monitoring that would catch recurrence.
6. Update runbooks and docs.
7. Link related commits, issues, receipts, transaction hashes, and conformance runs.

## Status Labels

Use consistent labels:

```txt
investigating
identified
mitigating
monitoring
resolved
postmortem-pending
```

## Evidence Rules

Keep evidence precise:

- Local checks are not live-network evidence.
- Testnet transaction hashes are not mainnet evidence.
- Screenshots are not conformance proof.
- Receipts and transaction hashes are settlement evidence.
- Conformance run output is protocol compatibility evidence.
