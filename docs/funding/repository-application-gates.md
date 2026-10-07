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

## Frontend Repository

Decision: blocked on Gates B and C.

The current protected candidate is frontend
[PR #29](https://github.com/LumenRoute/lumenbazaar-frontend/pull/29) at
`4afb04fb257bea973657be2eecad100b062e9d15`. Its required
[`check` job](https://github.com/LumenRoute/lumenbazaar-frontend/actions/runs/37675002827/job/112976106978)
passed and its pull request has a Vercel preview. Neither result proves a live
payment: the deterministic release suite uses a Freighter protocol stub and a
simulated paid-resource response, while the no-interception live suite requires
a deployed backend, resource ID, and real Freighter test profile.

### Gate C Proof Required

A logged-out independent reviewer must complete the same pinned x402 v2 exact
flow proven by Gate B on both desktop and mobile:

1. Load the public testnet UI and confirm its frontend commit, backend commit,
   network, and non-demo runtime mode.
2. Discover the real paid resource and compare asset, issuer, atomic amount,
   recipient, resource URL, and expiry before signing.
3. Connect a fresh, minimally funded Freighter testnet wallet and authorize the
   displayed canonical challenge once.
4. Observe paid retry, verification, settlement submission, an explicit
   pending or unknown state where applicable, and a finalized durable receipt.
5. Open the Stellar testnet transaction, compare its hash and ledger with the
   receipt, reload, and recover the same receipt without another payment.
6. Repeat focused tests for rejected signature, signing timeout, wrong network,
   backend outage, a pending settlement, and an already completed payment.
7. Run the production dependency review and accessibility checks against the
   release candidate.

The live browser test must make no request interception and must not succeed
through fixtures, explicit demo mode, a wallet draft, synthetic identifiers, a
v1 payload, or an intercepted success response. Desktop/mobile local suites are
supporting regression evidence only.

### Candidate Contributor Set

These issues are independent improvements suitable for reconsideration only
after Gates B and C pass. They are not program nominations.

| Issue | Independent post-readiness outcome | Complexity |
| --- | --- | --- |
| [#9: Trustline and balance preflight](https://github.com/LumenRoute/lumenbazaar-frontend/issues/9) | Distinguish missing trustline, insufficient balance, and network failure without creating assets or permitting unsafe signing. | Medium |
| [#13: API outage and recovery tests](https://github.com/LumenRoute/lumenbazaar-frontend/issues/13) | Prove critical routes recover without substituting fixture data or losing accessible status. | High |
| [#18: Payment and wallet WCAG 2.1 AA audit](https://github.com/LumenRoute/lumenbazaar-frontend/issues/18) | Add keyboard, focus, announcement, contrast, reduced-motion, automated, and manual evidence for payment surfaces. | Medium |
| [#20: Payment-critical error boundaries](https://github.com/LumenRoute/lumenbazaar-frontend/issues/20) | Provide accessible, idempotent recovery for unexpected route failures without reporting payment success. | Medium |

Immediately before application, verify each issue remains unimplemented,
bounded to one contributor and one pull request, objectively testable, and
independent of the other candidates. Complexity and points must be assigned in
the Drips dashboard only after repository approval and current budget review.

### Frontend Evidence And Maintainers

The future application pack must pin the merged release and public URL, exact
frontend and backend commits, protected CI, production dependency review,
desktop/mobile live run, wallet failure cases, paid transaction, durable
receipt, reload recovery, explorer link, accessibility evidence, selected
issues, and explicit demo boundaries. Every public claim must resolve while
logged out and refer to the same release.

Maintainer ownership, daily review windows, response target, backup coverage,
and two-way review commitment remain unconfirmed. No KYC, GitHub App,
repository application, or issue nomination should occur from this record.

### Frontend Stop Conditions

Do not apply while the live UI can succeed through fixtures, a wallet draft,
interception, synthetic transaction evidence, or a v1 payload. Do not apply
before the backend is itself eligible. Gates B and C remain open, so Phase 42
is not complete and the frontend must not be submitted.
