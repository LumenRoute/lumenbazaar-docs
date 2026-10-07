# Five-Minute Reviewer And Contributor Quickstart

The signer-free contract check is available now. The browser and CLI exact-payment checks are
documented but blocked until the pinned backend and frontend revisions in the
[deployment matrix](/operations/deployment-matrix) are deployed.

## Prerequisites

- Git.
- Node.js 24 or newer.
- Stellar CLI 27.1 or newer for read-only contract inspection.
- A browser with Freighter configured for Stellar testnet for the future browser path.
- A fresh, minimally funded testnet wallet only after the exact product deployment is published.

No step asks for a seed phrase or private key in a command, source file, issue, web form, screenshot,
or evidence artifact.

## Verify The Contract

This path requires no local project configuration, signer, or funded account:

```bash
git clone --branch v0.2.0-testnet.20261007 --depth 1 https://github.com/LumenRoute/lumenbazaar-contracts.git
cd lumenbazaar-contracts
stellar contract info hash --id CCENNI5ZMMD3DCJXG5MURDXWUU3NG6JCFHDCDSEI4OMNWDJRY2IR36L3 --network testnet
stellar contract invoke --id CCENNI5ZMMD3DCJXG5MURDXWUU3NG6JCFHDCDSEI4OMNWDJRY2IR36L3 --source-account GCYEX7MPJL64ZJ7ABZSPRC7YEBSI7OMC62FFEVFHCZFREBOYJPQDUCYJ --network testnet --send no -- interface_version
node scripts/check-deployment-evidence.mjs
```

Expected safe output:

```txt
121431386fedf8149476cbcd79740c242101286520d16456bce5affa7a0a2241
2
validated 2 sanitized testnet deployment manifest(s)
```

On 2026-10-07, those three commands took 2.87 seconds after a clean detached checkout. Network and
clone time vary. The release, source commit, contract explorer, transactions, event evidence, threat
model, and limitations are linked from the [deployment matrix](/operations/deployment-matrix).

## Browser Exact Payment

Status: blocked until the matrix publishes a frontend URL whose commit is
`dc41e2c3689602d070d181e44a445f9c89eb4528` and a backend URL whose commit is
`46379592d0912cd2efc7885119d95715ea86608c`.

When those entries become deployed:

1. Open the frontend in a signed-out profile and confirm it reports testnet mode and the pinned
   backend commit.
2. Discover the named paid resource, request terms, and compare network, atomic amount, asset,
   recipient, resource URL, and expiry.
3. Connect a fresh Freighter testnet wallet. Reject any prompt whose account, network, or terms differ.
4. Authorize once and submit once. Observe verification, paid retry, settlement submission, and a
   finalized durable receipt.
5. Open the Stellar transaction, match its hash to the receipt, reload the page, and confirm recovery
   of the same receipt.

Fixtures, demo mode, intercepted success responses, wallet drafts, v1 payloads, or an old public URL
do not satisfy this path.

## CLI Exact Payment

Status: blocked while `docs/deployment/testnet-endpoints.json` in the backend release still contains
template hosts and no pinned services are running.

After an operator publishes a real manifest, a CI or operator shell with `CLIENT_PRIVATE_KEY`
injected from masked secret storage runs:

```bash
pnpm deploy:testnet:probe -- --manifest docs/deployment/testnet-endpoints.json
pnpm deploy:testnet:exact -- --manifest docs/deployment/testnet-endpoints.json --output deployment-evidence/testnet-exact-flow.json
```

Never set or echo the signing key in the command history. The exact gate pauses for an operator to
restart API and worker services, then requires the same receipt and transaction after restart and an
idempotent repeated settlement. Safe output contains hashes, public transaction/ledger data,
correlation ID, receipt ID, and deployment versions; it excludes signing material and the raw
authorization payload.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Wallet lacks funds | Use Stellar Laboratory Friendbot for the fresh testnet account, then confirm the configured test asset separately. Do not fund a mainnet account. |
| Network mismatch | Switch Freighter to Stellar testnet and re-request terms; never sign pubnet terms in this guide. |
| Challenge expired | Request fresh terms and compare every field again. Do not reuse the old authorization. |
| Settlement remains pending | Do not authorize again. Keep the attempt/receipt ID and wait for reconciliation or operator review. |
| Backend or paid resource is unavailable | Stop the reviewer run and record the failing URL, UTC time, and request ID. Demo data is not a fallback for evidence. |
| Docs disagree with the app | Trust the pinned generated artifact and deployment manifest, report the stale page, and do not infer deployment from source. |

## Contributor Setup

Use the command set for the repository being changed:

| Repository | Setup and complete local gate |
| --- | --- |
| Frontend | `pnpm install --frozen-lockfile` then `pnpm check && pnpm test:e2e && pnpm audit:prod` |
| Backend | `pnpm install --frozen-lockfile` then `pnpm check && pnpm audit --prod` |
| Contracts | `cargo fmt --all -- --check`, `cargo clippy --workspace --all-targets --all-features -- -D warnings`, `cargo test --workspace --all-features`, then `stellar contract build --locked` |
| Docs | `npm ci` then `npm run check` |

Read each repository's `README.md`, `CONTRIBUTING.md`, and `SECURITY.md` before changing code. A
passing local command is not public CI, deployment, or live-network evidence.

## Gate D Status

Gate D remains open. Contract verification fits the five-minute budget, but the paid browser and CLI
paths cannot be timed from a clean reviewer environment until the backend, worker, MCP, paid resource,
and frontend are deployed and externally probed.
