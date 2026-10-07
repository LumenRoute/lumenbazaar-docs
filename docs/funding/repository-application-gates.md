# Repository Application Gates

This page records application decisions for repositories after the contracts
candidate. A prepared section is not an application, approval, deployment, or
live capability claim.

## Backend Repository

Decision: blocked on Gate B.

The current protected candidate is backend
[PR #35](https://github.com/LumenRoute/lumenbazaar-backend/pull/35) at
`7a1e183474f5b4ee482c813224dc920be34ce095`. Its required
[`checks` job](https://github.com/LumenRoute/lumenbazaar-backend/actions/runs/37675002579/job/112976105488)
passed. The exact-payment implementation is present locally, but the committed
testnet endpoint manifest remains a template with `replace_me` commit values
and `.example` hosts. There is no public deployment evidence for this revision.

### Gate B Proof Required

An independent reviewer must be able to verify all of the following against
one pinned public release:

| Surface | Required live result |
| --- | --- |
| `/health`, `/ready`, `/version` | Liveness, dependency readiness, and exact deployed commit are public and agree. |
| `/v1/supported` | Only configured, ready x402 v2 `exact` testnet capabilities are advertised. |
| Paid resource | A real catalog entry returns a 402 challenge, accepts one x402 v2 Stellar authorization produced through the pinned upstream library, and returns the paid result. |
| Verification and settlement | Network, asset, amount, recipient, expiry, signature, and replay controls fail closed; a valid payment reaches finality. |
| Persistence and receipt | Attempt, settlement, and finalized receipt survive API and worker restart with the same identifiers and transaction. |
| MCP | Public Streamable HTTP discovery and paid-call behavior use the same ready backend and durable receipt. |
| External probes | Public service probes, conformance, focused load smoke, dependency audit, and incident signals pass outside the host. |

The operator must replace the template deployment manifest, run
`pnpm deploy:testnet:probe`, run `pnpm deploy:testnet:exact`, perform the
explicit API and worker restart when prompted, and publish sanitized evidence.
A local test, fixture, simulated adapter, in-memory production state, old
Render endpoint, or placeholder capability cannot satisfy Gate B.

### Candidate Contributor Set

These issues are suitable for reconsideration only after the core product gate
passes. They are not added to Drips or assigned points by this record.

| Issue | Independent post-readiness outcome | Complexity |
| --- | --- | --- |
| [#14: Adversarial x402 verification integration matrix](https://github.com/LumenRoute/lumenbazaar-backend/issues/14) | Add bounded malicious and mismatched transaction vectors without changing production deployment. | High |
| [#16: Payment data retention and redaction](https://github.com/LumenRoute/lumenbazaar-backend/issues/16) | Implement configurable, auditable cleanup and prove structured-log redaction. | Medium |
| [#17: Durable rate limits across API replicas](https://github.com/LumenRoute/lumenbazaar-backend/issues/17) | Add Redis-backed security limits and explicit safe outage behavior. | Medium |
| [#19: Versioned OpenAPI and conformance artifacts](https://github.com/LumenRoute/lumenbazaar-backend/issues/19) | Publish checksummed release artifacts while preserving the local/live evidence distinction. | Medium |

Immediately before application, re-review these issues against the deployed
release. Reject any issue that became implemented, prerequisite work,
oversized, ambiguous, unsafe, or dependent on another candidate. Set
complexity and points in the authenticated Drips dashboard only after
repository approval and budget confirmation.

### Backend Evidence And Maintainers

The future application pack must pin the merged source and release, protected
CI, deployment manifest, external probe, exact-flow evidence, transaction,
durable receipt, restart result, MCP result, dependency review, threat model,
incident runbook, selected issues, and limitations. Every link must work while
logged out and refer to the same deployed commit.

Maintainer ownership, daily review windows, first-response target, backup
coverage, and two-way review responsibility are not yet publicly committed.
They must be recorded and independently challenged before submission. No KYC
or GitHub App action is authorized by this preparation record.

### Backend Stop Conditions

Do not apply while any exact path uses simulation, fixtures, in-memory
production state, placeholder endpoints, disabled readiness, an unpublished
signer, or a deployment that cannot recover the same receipt after restart.
Gate B remains open, so Phase 41 is not complete and the backend must not be
submitted.
