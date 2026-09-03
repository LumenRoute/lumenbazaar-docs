# Audit Readiness

Audit readiness means reviewers can understand the system, reproduce important checks, inspect generated references, and verify that known risks have tests or documented mitigations.

This page defines the evidence package for backend, contracts, docs, and operations review.

## Scope

Audit readiness should cover:

- x402 exact facilitator flow.
- Bazaar discovery and catalog validation.
- MCP server paid-call tools.
- Buyer and seller SDK payment helpers.
- Worker jobs related to settlement and indexing.
- `upto-session` Soroban contract.
- Policy wallet example boundaries.
- Operational monitoring and incident response.

## Facilitator Checklist

The backend audit package should include:

- `/v1/supported` schema and examples.
- `/v1/verify` schema and examples.
- `/v1/settle` schema and examples.
- Stable error code list.
- Payment payload validation tests.
- Replay protection tests.
- Expiry tests.
- Wrong network tests.
- Wrong asset tests.
- Wrong recipient tests.
- Wrong amount tests.
- Trustline failure handling.
- Settlement failure handling.
- Receipt persistence tests.
- Logs redaction review.
- Rate-limit tests.

## Discovery Checklist

The discovery audit package should include:

- Resource schema.
- Seller schema.
- Payment requirement schema.
- Catalog validation rules.
- Route template parser rules.
- Domain verification flow.
- Catalog event model.
- Search indexing model.
- `partialResults` behavior.
- Search index poisoning tests.
- Forged seller metadata tests.
- Invalid schema tests.

## MCP Checklist

The MCP audit package should include:

- Tool list.
- Tool input schemas.
- Tool output schemas.
- Budget enforcement rules.
- Error mapping.
- Paid-call flow tests.
- Resource inspection before payment.
- Network and asset policy tests.
- No private key storage confirmation.

## Contract Checklist

The `upto-session` contract audit package should include:

- Public interface.
- Session fields.
- Storage keys.
- Storage versioning.
- Authorization model.
- Asset transfer model.
- Error codes.
- Event shapes.
- TTL strategy.
- Gas/resource usage.
- Generated ABI/spec files.
- Generated TypeScript bindings.
- Local deployment script.
- Testnet deployment script.
- Testnet contract ID.

## Contract Test Evidence

Required tests:

- Create valid session.
- Reject unauthorized session creation.
- Reject zero or negative cap.
- Settle valid session.
- Reject settlement over cap.
- Reject double settlement.
- Reject expired settlement.
- Reject settlement by wrong seller.
- Cancel session before settlement.
- Reject cancel after settlement.
- Extend TTL.
- Validate storage persistence.
- Validate emitted events.

## Dependency Evidence

Provide:

- Dependency audit output.
- License report.
- Prohibited license check.
- Review notes for security-sensitive dependencies.
- Decision record for `@x402/stellar`.
- Decision record for search technology.
- Decision record for database ORM.

## Conformance Evidence

Conformance evidence should include:

- `/v1/supported` output check.
- `/v1/verify` request and response check.
- `/v1/settle` request and response check.
- Exact scheme behavior.
- Stable error behavior.
- Testnet run ID.
- Mainnet run ID when live.
- `Upto` scheme behavior after contract integration.
- Compatibility notes for unmodified x402 clients.

## Operational Evidence

Operators should provide:

- Deployment topology.
- Environment variable reference.
- Secret handling approach.
- Monitoring dashboard list.
- Alert list.
- Incident response guide.
- Runbook.
- Rollback plan.
- Mainnet disablement procedures.

## Known Limitations

Every audit package should include known limitations. Examples:

- Mainnet not enabled yet.
- `Upto` contract not deployed yet.
- Search ranking still using PostgreSQL full-text search.
- MCP paid-call proxy still testnet-only.
- External x402 discovery conventions may evolve.
- Dependency audit findings under review.

Limitations should be specific. Avoid vague statements like "more testing needed" unless the missing tests are listed.

## Evidence Labeling

Label evidence as:

- Local.
- Mock.
- Testnet.
- Staging.
- Mainnet.
- Generated.
- Manual review.
- CI.

Never mix labels. A testnet transaction hash is not mainnet settlement evidence.

## Publication Gate

Publish audit readiness only after:

- The referenced checks have been run.
- Generated artifacts are current.
- Known limitations are listed.
- External links have been verified.
- No page claims official Stellar, SDF, or SCF endorsement.
