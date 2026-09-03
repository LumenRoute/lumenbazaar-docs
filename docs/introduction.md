---
slug: /
sidebar_position: 1
---

# LumenBazaar Documentation

LumenBazaar is a Stellar-native x402 facilitator and Bazaar discovery layer for paid APIs, MCP tools, and AI agent payments.

It helps sellers publish payable HTTP endpoints and MCP tools, helps buyers and agents discover those resources, and uses Stellar payment flows to verify and settle requests without credit-card billing, prepaid credits, account dashboards, or custodial wallets.

## Quick Links

**Get started in 5 minutes:**
- [Seller Guide](/guides/seller-guide) • [Buyer Guide](/guides/buyer-guide) • [Agent Guide](/guides/agent-guide)

**Explore the system:**
- [Architecture](/architecture/overview) • [Payment Flow](/architecture/payment-flow) • [Discovery Flow](/architecture/discovery-flow)

**Deploy & operate:**
- [Testnet Guide](/guides/testnet-guide) • [Mainnet Guide](/guides/mainnet-guide) • [Self-Hosting](/operations/self-hosting)

## What LumenBazaar Provides

LumenBazaar combines five pieces of open infrastructure:

- An x402 facilitator for Stellar verification and settlement.
- A Bazaar discovery index for paid HTTP resources and MCP tools.
- Buyer and seller SDKs for payment requirements, paid calls, retries, receipts, and metadata.
- An MCP server so agent runtimes can search, inspect, and call paid resources.
- Soroban contracts for capped metered `upto` sessions when a resource needs bounded usage-based settlement.

## One-Sentence Pitch

LumenBazaar lets AI agents and developers discover paid APIs, authorize payments with Stellar assets, and settle requests through an open-source x402 facilitator and Bazaar discovery layer.

## Short Pitch

Paid APIs are still commonly built around human-operated account creation, API keys, subscriptions, prepaid credits, and credit cards. That model is awkward for autonomous agents and composable developer tools.

LumenBazaar brings x402 to Stellar as open infrastructure: a facilitator for verification and settlement, a Bazaar discovery layer for paid resources, an MCP interface for agents, SDKs for sellers and buyers, and Soroban contracts for capped metered payment policies.

## Who Should Read This Site

Start with the path that matches your role:

- Sellers should read [Seller Guide](/guides/seller-guide) to publish paid APIs or MCP tools.
- Buyers should read [Buyer Guide](/guides/buyer-guide) to discover resources and complete paid calls.
- Agent developers should read [Agent Guide](/guides/agent-guide) to use the MCP server.
- Operators should read [Self-Hosting](/operations/self-hosting) and [Monitoring](/operations/monitoring).
- Contributors should read [Repository Standards](/contributing/repository-standards).
- Reviewers and funders should read [Milestones](/funding/milestones), [Metrics](/funding/metrics), and [Audit Readiness](/security/audit-readiness).

## Repository Model

The project is split into four public repositories:

- `lumenbazaar-frontend` for the web dashboard and discovery UI.
- `lumenbazaar-backend` for the facilitator, discovery API, MCP server, SDK packages, workers, examples, and conformance runner.
- `lumenbazaar-contracts` for Soroban `upto` sessions, policy examples, bindings, and contract tests.
- `lumenbazaar-docs` for this public documentation site.

SDK and example packages begin inside `lumenbazaar-backend` and may move to dedicated repositories later if they become large enough to justify a split.

## Boundaries

LumenBazaar is not a custodial wallet, does not hold user funds, and must never store private keys. It verifies payment details, helps settle authorized requests, records receipts, and exposes settlement evidence.

LumenBazaar is also not official Stellar Development Foundation infrastructure. The project is designed for the Stellar ecosystem, but it should not imply SDF or SCF endorsement unless such support is explicitly granted and documented.

## Documentation Status

This site is built from the project plan and will become increasingly implementation-backed as the frontend, backend, contracts, and examples are delivered. Pages should separate planned behavior, local verification, testnet evidence, mainnet evidence, and conformance results.
