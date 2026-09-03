# Tranche Evidence

This page defines the suggested SCF tranche model and the evidence expected for each tranche.

## Evidence Principles

- Local checks are not live-network evidence.
- Mock tests are not testnet evidence.
- Testnet transaction hashes are not mainnet evidence.
- CI in progress is not green CI.
- Receipts and transaction hashes are settlement evidence.
- Conformance runner output is protocol compatibility evidence.
- Screenshots are supporting UX evidence only.

## Tranche 0: Award Acceptance And Foundation

Goal:

Set up the public project foundation.

Expected deliverables:

- Four public repositories.
- License files.
- README files.
- Contributor guides.
- Security policies.
- Code of conduct files.
- Pull request templates.
- Issue templates.
- CI scaffolds.
- Initial docs site.
- Repository map.

Evidence:

- Repository links.
- Initial commits.
- CI runs.
- Docs build output.
- Issue board links.
- Contributor workflow docs.

## Tranche 1: Exact Facilitator And Discovery Testnet

Goal:

Deliver the exact x402 facilitator and Bazaar discovery layer on testnet.

Expected deliverables:

- `/v1/supported`
- `/v1/verify`
- `/v1/settle`
- Testnet configuration.
- SEP-41 asset support.
- USDC default configuration.
- Payment receipt records.
- Machine-readable errors.
- Resource model.
- Metadata validator.
- Route template validator.
- Discovery browse and search endpoints.
- Catalog event log.
- OpenAPI spec.
- Seller and buyer testnet docs.

Evidence:

- Backend tests.
- Integration tests.
- Testnet transaction hashes.
- Receipt IDs.
- Conformance run output.
- OpenAPI artifact.
- Resource catalog records.
- Stable error test results.

## Tranche 2: SDKs, MCP, Frontend, And Upto Testnet

Goal:

Deliver user-facing and agent-facing workflows, plus capped metered session support on testnet.

Expected deliverables:

- Seller SDK.
- Buyer SDK.
- Testkit package.
- Example apps.
- MCP server.
- MCP tools for search, inspect, prepare payment, paid call, receipts, budgets, and networks.
- Frontend dashboard.
- Resource explorer.
- Seller onboarding.
- Payment playground.
- Transaction dashboard.
- Operator dashboard.
- `upto-session` contract.
- Contract tests.
- TypeScript bindings.
- Testnet contract deployment.

Evidence:

- SDK tests.
- MCP tests.
- Frontend tests.
- Playwright smoke tests.
- Contract `cargo test` output.
- Contract ID.
- ABI/spec artifacts.
- TypeScript bindings.
- Testnet `upto` session transaction hashes.
- Agent demo run output.

## Tranche 3: Mainnet Launch, Conformance, Audit Readiness, And Public Metrics

Goal:

Launch production-ready mainnet exact payments with public metrics, security review readiness, and operational maturity.

Expected deliverables:

- Mainnet deployment.
- Production environment configs.
- Public status page.
- Public metrics.
- Mainnet settlement receipts.
- Operator runbook.
- Incident response guide.
- Launch documentation.
- Security threat model.
- Dependency license report.
- Replay attack tests.
- Catalog poisoning tests.
- Route template security tests.
- Contract security checklist.
- Audit readiness package.

Evidence:

- Mainnet transaction hashes.
- Mainnet receipt IDs.
- Mainnet conformance output.
- Public metrics page.
- Uptime data.
- Security test output.
- Dependency license report.
- Audit readiness docs.
- Incident runbook links.

## Evidence Matrix

| Evidence Type | Local | Testnet | Mainnet | Notes |
| --- | --- | --- | --- | --- |
| Unit tests | yes | supporting | supporting | Proves logic, not live settlement. |
| Integration tests | yes | supporting | supporting | Should include database and service behavior. |
| Transaction hashes | no | yes | yes | Must be labeled by network. |
| Receipts | yes | yes | yes | Must identify environment and network. |
| Conformance run | yes | yes | yes | Mainnet only after launch. |
| Screenshots | supporting | supporting | supporting | Not protocol proof. |
| Generated OpenAPI | yes | yes | yes | Must include source commit. |
| Contract ABI/spec | yes | yes | yes | Must include source commit and network. |

## Reporting Template

```md
## Tranche

Name:
Status:
Date:

## Deliverables

- Deliverable:
- Status:
- Evidence:

## Verification

- Local checks:
- CI:
- Testnet:
- Mainnet:
- Conformance:

## Known Limitations

- Limitation:

## Links

- Repository:
- Pull request:
- Transaction:
- Receipt:
- Conformance report:
```

## Status Labels

Use:

```txt
planned
in-progress
delivered
verified-local
verified-testnet
verified-mainnet
blocked
superseded
```
