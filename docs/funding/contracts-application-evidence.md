# Contracts Application Evidence Pack

Status: prepared, not submission-ready. Gate A has public testnet evidence;
Gate D, protected merge/release alignment, independent review, maintainer
availability, KYC, GitHub App installation, and current program limits remain
open.

## Purpose And Stellar Relevance

LumenBazaar Contracts provides Soroban escrow primitives for capped Stellar
payments, with buyer-authorized funding, bounded seller settlement, refund and
expiry recovery, and public testnet evidence.

The current contract release demonstrates an experimental `upto` payment
lifecycle on Stellar testnet. It does not claim mainnet readiness, official
x402 `exact` conformance, production asset support, or deployment of the
LumenBazaar backend and frontend release candidates.

## Pinned Evidence

| Evidence | Public reference | What it proves |
| --- | --- | --- |
| Prerelease | [`v0.2.0-testnet.20261007`](https://github.com/LumenRoute/lumenbazaar-contracts/releases/tag/v0.2.0-testnet.20261007) | A public, immutable testnet evidence release exists. |
| Release source | [`10460b5`](https://github.com/LumenRoute/lumenbazaar-contracts/tree/10460b5740a42def0e00fd03800b6d2ddf15d8ae) | Source for the contract artifact, scripts, manifests, and lifecycle evidence. |
| Governance candidate | [PR #32](https://github.com/LumenRoute/lumenbazaar-contracts/pull/32) at `a7a41beecf9b71b286565232af053e2d9f7601a3` | The current protected review candidate; it is not part of the prerelease until merged and released. |
| Candidate CI | [`contracts` check](https://github.com/LumenRoute/lumenbazaar-contracts/actions/runs/37687123156/job/113017696993) | The required contracts check passed on the PR head. It does not prove deployment. |
| Reproducible artifact | [Deployment manifest](https://github.com/LumenRoute/lumenbazaar-contracts/blob/v0.2.0-testnet.20261007/deployments/testnet-2026-10-07.json) | The pinned WASM SHA-256 is `121431386fedf8149476cbcd79740c242101286520d16456bce5affa7a0a2241`. |
| Contract | [`CCENNI...36L3`](https://stellar.expert/explorer/testnet/contract/CCENNI5ZMMD3DCJXG5MURDXWUU3NG6JCFHDCDSEI4OMNWDJRY2IR36L3) | The contract exists on Stellar testnet. |
| Deployment | [Deployment transaction](https://stellar.expert/explorer/testnet/tx/f3f4fcc890b648029dfdabd3053d659af496890063e0c1051b8580733d65d9a3) | The recorded contract deployment succeeded. |
| Positive lifecycle | [Lifecycle evidence](https://github.com/LumenRoute/lumenbazaar-contracts/blob/v0.2.0-testnet.20261007/artifacts/testnet/lifecycle-2026-10-07.json) | Funding, partial settlement/refund, cancellation, and expiry recovery operations are recorded. |
| Negative lifecycle | [Rejected simulations](https://github.com/LumenRoute/lumenbazaar-contracts/blob/v0.2.0-testnet.20261007/artifacts/testnet/lifecycle-2026-10-07.json#L160-L218) | Wrong signer, over-cap, expired, cancelled, and finalized calls reject without claiming transaction hashes. |
| Threat model | [Security threat model](/security/threat-model) | Authorization, replay, expiry, cap, settlement, catalog, logging, and dependency risks are explicit. |
| Limitations | [Deployment and capability matrix](/operations/deployment-matrix) | Testnet, local, deployed, and blocked capabilities are separated. |
| Reproduction | [Five-minute reviewer quickstart](/guides/reviewer-quickstart) | A signer-free reviewer can verify the hash, interface version, and sanitized manifests. |

The source tag and PR head are intentionally separate in this table. Before
submission, merge the reviewed PR, publish a release that identifies the exact
merged commit, rerun its required CI, and update this pack if any evidence
changes.

## Contributor Backlog

The proposed first set is the four-issue
[contracts Wave backlog](/funding/contracts-wave-backlog):

- one scheduled Horizon evidence verifier;
- one cross-platform deterministic specification gate;
- one bounded authorization and cap mutation suite;
- one contract resource-regression budget gate.

The mix is three Medium issues and one High issue. Drips dashboard points and
the total Wave budget are deliberately unassigned until the repository is
approved and the active program values are confirmed.

## Maintainer Readiness

| Requirement | Current record | Submission gate |
| --- | --- | --- |
| Repository owner | `LumenRoute`; current collaborators include `Hallab7` and `Clinton6801`. | Confirm which KYC-verified account is accountable for the application. |
| Daily availability | No public commitment recorded. | Publish named review windows for every day of the active Wave. |
| Assignment process | Use the four curated issues only after approval; assess fit, conflicts, and prior work before assignment. | Confirm the accountable maintainer and backup can operate this process. |
| Expected first response | Not committed. | Record a realistic response target that fits current Drips requirements. |
| Pull-request review | Require issue scope, closing reference, repository checks, security evidence, and protected review. | Confirm the named maintainer can meet the target throughout the Wave. |
| Two-way review | Contributor and maintainer reviews must both be completed within the program window. | Confirm current deadline and dashboard workflow in the Drips app. |

No private KYC material belongs in this repository. The real account owner must
complete KYC directly and must not share the identity account, recovery data,
or credentials.

## External Application Checks

Complete these checks immediately before submission and record only their
non-sensitive result:

- Install the Drips GitHub App only for `lumenbazaar-contracts` after the
  accountable owner confirms the intended installation scope.
- Confirm the current Stellar Wave application window, repository limit, issue
  limit, point budget, review deadlines, and two-way review requirements in the
  authenticated Drips app.
- Open every evidence link in a logged-out browser after the docs PR is merged
  and deployed from an identifiable commit.
- Obtain an independent technical review that challenges every claim against
  the exact linked release, commit, CI run, contract, and transaction record.
- Record reviewer identity and result publicly without storing KYC material or
  private contact information.

## Gate E Decision

Gate E is open. The evidence pack is structurally complete, but it must not be
submitted while Gate D is open or while the merge/release, independent review,
maintainer schedule, KYC, App installation, and current program checks above
are unresolved.
