# Deployment And Capability Matrix

Last verified: 2026-10-07 from a logged-out network request where a public URL is listed.

This matrix is the public source of truth for deployment state. A source commit, passing local test,
or generated schema is not described as deployed unless the exact artifact is reachable and exposes
matching evidence.

## Current Release Candidate

| Component | Source revision | Public target | Evidence state | Current capability |
| --- | --- | --- | --- | --- |
| Contracts | [`10460b5`](https://github.com/LumenRoute/lumenbazaar-contracts/tree/10460b5740a42def0e00fd03800b6d2ddf15d8ae), tag `v0.2.0-testnet.20261007` | [Stellar testnet contract](https://stellar.expert/explorer/testnet/contract/CCENNI5ZMMD3DCJXG5MURDXWUU3NG6JCFHDCDSEI4OMNWDJRY2IR36L3) | `testnet-proven` | Escrow-backed `upto` create, partial settle/refund, cancel, expiry recovery, negative authorization, and event evidence. |
| Backend API | `46379592d0912cd2efc7885119d95715ea86608c` | No deployment of this revision | `local` | Official x402 v2 `exact`, persistence, reconciliation, real catalog resource, MCP Streamable HTTP, readiness, and probes pass locally. Live Gate B is blocked. |
| Worker | Same backend revision | Not deployed | `local` | Settlement finality and reconciliation implementation exists; no public worker evidence. |
| MCP | Same backend revision | Not deployed | `local` | Streamable HTTP service passes local tests; no public MCP endpoint for this revision. |
| Paid example | Same backend revision | Not deployed | `local` | Deterministic real catalog/resource implementation exists; no public paid resource for this revision. |
| Frontend | `dc41e2c3689602d070d181e44a445f9c89eb4528` | No deployment of this revision | `local` | x402 v2 challenge, Freighter authorization, paid retry, receipt recovery, and live-data boundaries pass deterministic desktop/mobile gates. Fresh-wallet Gate C is blocked. |
| Docs | `d48d595c0bb290257d8ec034eb12d906ccc2b682` plus this matrix | [Vercel site](https://lumenbazaar-docs.vercel.app) | `local`; public site commit unknown | Generated references and this matrix pass locally. The host does not expose an immutable commit, so the current local docs are not claimed as deployed. |

## Contract Evidence

| Item | Value |
| --- | --- |
| Network | Stellar testnet (`Test SDF Network ; September 2015`) |
| Contract ID | `CCENNI5ZMMD3DCJXG5MURDXWUU3NG6JCFHDCDSEI4OMNWDJRY2IR36L3` |
| WASM SHA-256 | `121431386fedf8149476cbcd79740c242101286520d16456bce5affa7a0a2241` |
| Deploy transaction | [`f3f4fcc8...d65d9a3`](https://stellar.expert/explorer/testnet/tx/f3f4fcc890b648029dfdabd3053d659af496890063e0c1051b8580733d65d9a3) |
| Initialize transaction | [`7c6891b9...22ced7d`](https://stellar.expert/explorer/testnet/tx/7c6891b9703004b4c060f47dd5cfa3c01458805a49333647c64a88f1e22ced7d) |
| Partial settlement | [`b642b9f3...4b927f`](https://stellar.expert/explorer/testnet/tx/b642b9f3ec95d88424709b8e4b04e87ea6656f395fe680205a02a9a7d44b927f) |
| Expiry recovery | [`d40127ee...97c9bc`](https://stellar.expert/explorer/testnet/tx/d40127ee6706d20c4dd73f5d7dbe9c27ccef72d0553f5056e65d53b58897c9bc) |
| Asset | `LBT`, custom test-only token; not USDC |

The full deployment and lifecycle records are checksummed under `generated/contracts/`. Testnet
evidence does not establish mainnet security, availability, liquidity, or asset configuration.

## Capability Boundaries

| Capability | State | Meaning |
| --- | --- | --- |
| `exact` x402 v2 | Local release candidate | Official transport and Stellar scheme are implemented and tested, but the current backend/frontend revisions are not publicly deployed. |
| `upto` contract | Testnet proven | The contract lifecycle is public; backend `upto` integration remains disabled and is not part of the exact reviewer flow. |
| Simulation | Test-only | Simulation and deterministic fixtures support negative/local testing and are never live settlement evidence. |
| Demo data | Explicit fallback | Frontend demo records are labeled and cannot satisfy the external payment gate. |
| Mainnet | Disabled | No component is claimed mainnet-ready or mainnet-deployed. |

## External Blockers

- Deploy backend API, worker, MCP, and paid resource from the pinned backend revision with funded
  testnet signer and durable PostgreSQL/Redis services.
- Run the backend exact flow externally, restart services, and recover the same receipt.
- Deploy the pinned frontend against that backend and complete the no-interception fresh-wallet run.
- Deploy these docs at a host that exposes or records the immutable source commit.
