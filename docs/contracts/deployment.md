# Contract Deployment

The `upto-session` version 2 contract is deployed on Stellar testnet. Mainnet remains disabled.

## Released Testnet Contract

| Field | Value |
| --- | --- |
| Release | `v0.2.0-testnet.20261007` |
| Release commit | `10460b5740a42def0e00fd03800b6d2ddf15d8ae` |
| Implementation source commit | `41940839d8f49c733b1815e108fc9740b1285f32` |
| Network | Stellar testnet |
| Contract ID | `CCENNI5ZMMD3DCJXG5MURDXWUU3NG6JCFHDCDSEI4OMNWDJRY2IR36L3` |
| WASM SHA-256 | `121431386fedf8149476cbcd79740c242101286520d16456bce5affa7a0a2241` |
| Interface version | `2` |
| Asset | `LBT`, custom test-only token; not USDC |

The [deployment matrix](/operations/deployment-matrix) links the contract, upload, deployment,
initialization, settlement, and recovery evidence. The checksummed source manifests are
`generated/contracts/testnet-deployment.json` and `generated/contracts/testnet-lifecycle.json`.

## Contract Scope

Only `upto-session` is part of the capped metered payment design. The `policy-wallet-example` is an
unaudited smart-account example, and `test-token` is test infrastructure. Neither is production
wallet or asset infrastructure.

The current lifecycle proves:

- Escrow funding at session creation.
- Seller-authorized partial settlement with buyer refund.
- Buyer cancellation and full refund.
- Permissionless expiry recovery that refunds only the buyer.
- Rejection of unauthorized, over-cap, cross-session, duplicate, and invalid terminal operations.
- Versioned creation, settlement, cancellation, and recovery events.

## Local Verification

From a clean contracts checkout at the release commit, use the commands published by that
repository:

```bash
pnpm check
pnpm wasm:repro
pnpm bindings:smoke
pnpm deployment:evidence
```

These commands prove source, build, binding, and evidence consistency. They do not create a new live
deployment.

## Imported Artifacts

The docs repository imports and checksums:

- Decoded contract XDR spec.
- TypeScript binding containing the encoded contract spec.
- Versioned method, event, field, and error interface.
- Testnet deployment manifest and WASM hash.
- Testnet lifecycle and rejection evidence.

Run `npm run sync:generated` and `npm run check:generated` to reproduce the import from the pinned
Git revisions.

## Backend Boundary

The deployed contract proves the independent `upto` lifecycle only. The Phase 24 backend release
candidate advertises `upto: false`; its active payment product is x402 v2 `exact`. No docs page should
infer backend integration merely from the contract deployment.

## Mainnet Gate

There is no mainnet contract ID. Mainnet deployment requires an explicit asset/liquidity decision,
security review, reproducible release, operational monitoring, incident response, and recorded
transactions. Testnet IDs and LBT evidence must never be copied into a mainnet configuration.
