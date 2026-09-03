# Getting Started

LumenBazaar is delivered as four separate repositories. Start by choosing the path that matches your role, then bring up the repositories in dependency order.

## Repository Order

Use this order for a full local environment:

1. `lumenbazaar-backend`
2. `lumenbazaar-contracts`
3. `lumenbazaar-frontend`
4. `lumenbazaar-docs`

The backend comes first because it owns the facilitator API, Bazaar discovery API, MCP server, SDK packages, examples, workers, generated OpenAPI output, and conformance runner. The contracts repo becomes required when testing `upto` sessions. The frontend depends on backend APIs, and the docs repo links to all of them.

## Required Local Services

A complete local stack needs:

- PostgreSQL for sellers, resources, payment attempts, settlements, receipts, catalog events, conformance runs, and operational state.
- Redis for queues and rate-limit support.
- A search index, starting with PostgreSQL full-text search and optionally moving to Meilisearch, Typesense, or pgvector-backed ranking.
- Backend API for x402, discovery, resources, payments, sellers, and conformance.
- Worker process for settlement confirmation, resource indexing, search sync, network health, receipt finalization, and stale payment cleanup.
- MCP server for agent-facing paid resource search and calls.
- Frontend dashboard for sellers, buyers, operators, and reviewers.
- Docs site for architecture, guides, reference material, operations, funding, and security.

## Local Documentation Setup

From this repository:

```bash
npm install
npm run start
```

Run the local checks before opening a pull request:

```bash
npm run lint
npm run links
npm run build
```

## Role-Based Paths

Sellers should start with:

- [Seller Guide](/guides/seller-guide)
- [Testnet Guide](/guides/testnet-guide)
- [Seller SDK](/sdks/seller-sdk)

Buyers should start with:

- [Buyer Guide](/guides/buyer-guide)
- [Buyer SDK](/sdks/buyer-sdk)
- [Payment Flow](/architecture/payment-flow)

AI agent developers should start with:

- [Agent Guide](/guides/agent-guide)
- [MCP API Reference](/api-reference/mcp)
- [Discovery Flow](/architecture/discovery-flow)

Operators should start with:

- [Operator Guide](/guides/operator-guide)
- [Self-Hosting](/operations/self-hosting)
- [Monitoring](/operations/monitoring)
- [Runbook](/operations/runbook)

Contributors should start with:

- [Repository Standards](/contributing/repository-standards)
- [Issue Template](/contributing/issue-template)
- [Drips Contributor Plan](/funding/drips-plan)

Reviewers, funders, and security auditors should start with:

- [Architecture Overview](/architecture/overview)
- [Milestones](/funding/milestones)
- [Metrics](/funding/metrics)
- [Threat Model](/security/threat-model)
- [Audit Readiness](/security/audit-readiness)

## Network Progression

Implementation should progress in this order:

1. Local mock and integration tests.
2. Stellar testnet verification and settlement evidence.
3. Staging deployment with monitoring and conformance checks.
4. Mainnet launch only after operational and security gates are complete.

The docs should never describe local checks as live-network proof, and testnet transaction hashes should not be presented as mainnet settlement evidence.
