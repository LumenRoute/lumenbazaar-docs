# Generated References

Generated references keep the docs aligned with implementation.

## OpenAPI

Backend OpenAPI artifacts should be imported into:

```txt
generated/openapi/
```

The backend should provide:

- API version.
- Source commit.
- Generation command.
- Facilitator endpoints.
- Discovery endpoints.
- Resource and seller endpoints.
- Payment, settlement, and receipt endpoints.
- Conformance endpoints.

Docs API reference pages should be regenerated from or checked against these artifacts.

## Contract Artifacts

Contract artifacts should be imported into:

```txt
generated/contracts/
```

The contracts repo should provide:

- ABI/spec files.
- TypeScript bindings.
- Contract IDs.
- Error codes.
- Event shapes.
- Deployment network.
- Source commit.

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

The current check validates placeholder metadata. It should become stricter after backend and contract artifacts exist.
