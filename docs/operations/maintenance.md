# Maintenance

Maintenance keeps the docs aligned with implementation, generated references, protocol changes, and operational evidence.

## Maintenance Principles

- Treat docs as part of the product.
- Update docs in the same pull request as behavior changes where possible.
- Separate planned behavior from implemented behavior.
- Label local, testnet, staging, and mainnet evidence.
- Preserve historical conformance reports.
- Do not delete evidence unless it contains sensitive data.

## Backend API Changes

When backend APIs change:

1. Update OpenAPI generation.
2. Import generated output into `generated/openapi/`.
3. Update API reference pages.
4. Update SDK docs if client behavior changes.
5. Update frontend docs if UI behavior changes.
6. Run generated-reference checks.

Affected pages may include:

- [Facilitator API Reference](/api-reference/facilitator)
- [Discovery API Reference](/api-reference/discovery)
- [Resources API Reference](/api-reference/resources)
- [Payments API Reference](/api-reference/payments)
- [MCP API Reference](/api-reference/mcp)

## Contract Interface Changes

When contract interfaces change:

1. Run contract tests.
2. Regenerate ABI/spec files.
3. Regenerate TypeScript bindings.
4. Import generated artifacts into `generated/contracts/`.
5. Update contract reference pages.
6. Update backend integration docs.
7. Update deployment docs and contract ID records.

Affected pages may include:

- [Upto Session Contract](/contracts/upto-session)
- [Contract Deployment](/contracts/deployment)
- [Audit Readiness](/security/audit-readiness)

## Frontend UX Changes

When frontend workflows change:

- Update seller guide.
- Update buyer guide.
- Update agent guide if MCP inspection changes.
- Update operator guide if dashboard status changes.
- Update screenshots only as supporting material, not proof.

Frontend docs should keep network, asset, amount, recipient, status, and transaction hashes visible in payment-related workflows.

## x402 And Stellar Updates

External protocol and package details can drift. Before publishing reference updates:

1. Verify upstream x402 references.
2. Verify Stellar x402 docs.
3. Verify Stellar smart wallet docs if policy docs changed.
4. Verify `@x402/stellar` package behavior.
5. Update source links.
6. Add compatibility notes.

## Conformance Report Retention

Conformance reports should be retained as historical evidence.

Archive old reports by:

- Keeping report ID.
- Keeping date.
- Keeping environment.
- Keeping network.
- Keeping commit SHAs.
- Keeping status.
- Marking superseded reports as historical.

Do not overwrite old testnet reports with mainnet reports.

## Release Checklist

Before a docs release:

```bash
npm run lint
npm run links
npm run check:generated
npm run check:content
npm run build
```

Also check:

- Generated references are current or clearly marked stale.
- External source links are current.
- No page implies official Stellar, SDF, or SCF endorsement.
- Testnet and mainnet evidence are separate.
- Known limitations are listed.

## Recurring Tasks

Weekly or per milestone:

- Review open docs issues.
- Review generated reference freshness.
- Review dependency audit output.
- Review source links.
- Review conformance report status.
- Review public metrics freshness.

## Ownership

Docs maintainers coordinate with:

- Backend maintainers for API and generated OpenAPI changes.
- Contract maintainers for ABI/spec and deployment changes.
- Frontend maintainers for workflow changes.
- Operators for runbooks, incidents, and monitoring.
- Security reviewers for threat model and disclosure updates.
