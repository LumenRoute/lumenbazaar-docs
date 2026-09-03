# Problem And Goals

LumenBazaar exists because paid APIs are difficult for autonomous software to use.

## Problem

Most paid API models assume a human is present to create an account, enter a credit card, configure billing, manage API keys, buy credits, and monitor a dashboard.

Those assumptions do not fit:

- AI agents.
- MCP tools.
- Automation systems.
- Wallet-integrated applications.
- Composable developer tools.

An autonomous buyer should be able to find a paid service, inspect its price and schema, authorize a bounded payment, call the service, and receive a receipt without opening a seller-specific account.

## Current Friction

Traditional paid APIs often require:

- Manual account creation.
- Credit-card billing.
- API keys.
- Prepaid credits.
- Monthly subscriptions.
- Human-operated dashboards.
- Centralized reconciliation.

These requirements make small, one-off, machine-driven payments awkward.

## Ecosystem Gap

x402 provides the payment handshake, but Stellar still needs open infrastructure around:

- Stellar facilitator operation.
- Bazaar discovery.
- Natural language resource search.
- MCP agent access.
- Seller metadata helpers.
- Buyer payment helpers.
- Conformance testing.
- Mainnet-ready operations.
- Capped metered payment sessions.

LumenBazaar is designed to fill that gap.

## Primary Goals

LumenBazaar should:

1. Build a production-ready Stellar x402 facilitator for testnet and mainnet.
2. Build a Bazaar discovery layer for paid HTTP APIs and MCP tools.
3. Build an MCP server that lets agents discover and call paid resources.
4. Build SDKs for sellers and buyers.
5. Build a dashboard for resource discovery, seller onboarding, payments, and operations.
6. Build Soroban contracts for capped metered x402 `upto` payment sessions.
7. Publish full documentation, examples, conformance results, and operational runbooks.
8. Maintain all repos as open-source public goods with clear contributor workflows.

## Product Outcomes

For sellers:

- Simple middleware.
- Metadata helpers.
- Testnet onboarding.
- Settlement receipts.
- Dashboard visibility.

For buyers:

- Resource discovery.
- Price and schema inspection.
- Payment authorization.
- Retry helper.
- Receipt handling.

For agents:

- MCP-compatible discovery.
- Deterministic tool schemas.
- Machine-readable errors.
- Budget controls.

For operators:

- Docker setup.
- Network support.
- Monitoring.
- Runbooks.
- Key management guidance.

For reviewers:

- Public repositories.
- Milestones.
- Test results.
- Conformance reports.
- Security posture.
- On-chain metrics.

## Implementation Strategy

Implementation should move from local to testnet to mainnet:

1. Repository readiness.
2. Exact x402 facilitator.
3. Bazaar discovery.
4. SDKs.
5. MCP server.
6. `Upto` contract.
7. Full frontend.
8. Conformance and security.
9. Mainnet launch.
10. Maintenance and growth.

Each unit of work should be small enough for one contributor and one pull request.
