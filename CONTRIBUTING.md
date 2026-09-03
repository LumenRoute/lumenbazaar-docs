# Contributing

LumenBazaar docs changes should be small, reviewable, and tied to a clear project need.

## Workflow

1. Open or claim a scoped issue.
2. Keep the pull request limited to the documented scope.
3. Run local checks before requesting review.
4. Include linked issues and verification output in the pull request.

## Local Checks

```bash
npm run lint
npm run links
npm run build
```

## Content Standards

- Prefer precise protocol language over marketing language.
- Separate testnet evidence from mainnet evidence.
- Do not imply official Stellar, SDF, or SCF endorsement.
- Do not present screenshots as conformance proof.
- Keep API and contract references aligned with generated artifacts where possible.
