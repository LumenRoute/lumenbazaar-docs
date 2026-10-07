# Generated References

Generated references keep the docs aligned with implementation.

## OpenAPI

Backend OpenAPI artifacts are imported into:

```txt
generated/openapi/
```

The pinned snapshot provides:

- API version.
- Source commit.
- Generation command.
- Facilitator endpoints.
- Discovery endpoints.
- Resource and seller endpoints.
- Payment, settlement, and receipt endpoints.
- Conformance endpoints.

The backend snapshot is pinned to commit `46379592d0912cd2efc7885119d95715ea86608c`.
It is a source release candidate and is not evidence that the backend is deployed.

## Contract Artifacts

Contract artifacts are imported into:

```txt
generated/contracts/
```

Release `v0.2.0-testnet.20261007` provides:

- ABI/spec files.
- TypeScript bindings.
- Contract IDs.
- Error codes.
- Event shapes.
- Deployment network.
- Source commit.

The imported deployment and lifecycle manifests prove the released testnet contract ID and WASM
hash. They do not establish backend integration or mainnet deployment.

## Stale Reference Warning

Generated references are stale if:

- Source commit is missing.
- Generation date is missing.
- Backend routes changed after OpenAPI generation.
- Contract interface changed after ABI/spec generation.
- Docs reference pages disagree with generated output.

## CI Check

The docs CI runs:

```bash
npm run check:generated
```

The check validates every imported SHA-256 checksum, immutable source revisions, required OpenAPI
paths, released contract methods, events, error count, contract ID agreement, and WASM checksum.
`npm run sync:generated` extracts files directly from the pinned Git commits rather than the sibling
working trees.
