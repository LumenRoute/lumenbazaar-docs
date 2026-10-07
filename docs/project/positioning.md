# Project Positioning

LumenBazaar is open infrastructure for machine-native commerce on Stellar. It connects x402 payment requests, Bazaar discovery, MCP agent workflows, SDK integration, and optional Soroban metered-payment contracts.

## Full Name

LumenBazaar: x402 Facilitator and Bazaar Discovery Layer for Stellar.

## One-Sentence Pitch

LumenBazaar lets AI agents and developers discover paid APIs, authorize payments with Stellar assets, and settle requests through an open-source x402 facilitator and Bazaar discovery layer.

## Short Pitch

Paid APIs are still built around accounts, API keys, manual onboarding, subscriptions, prepaid credits, and credit cards. That model is awkward for autonomous agents and composable developer tools.

LumenBazaar brings x402 to Stellar as open infrastructure: a facilitator for verification and settlement, a Bazaar discovery index for paid resources, an MCP interface for agents, SDKs for sellers and buyers, and Soroban contracts for capped metered spending policies.

## Long Pitch

LumenBazaar is a multi-repository open-source project for machine-native commerce on Stellar. Its
current release candidate combines an x402 facilitator, a Stellar Bazaar discovery service, an
agent-facing MCP server, seller and buyer SDKs, a web dashboard, and an independently testnet-proven
Soroban contract for capped metered sessions. The hosted exact-payment product is not yet deployed.

Sellers can make APIs and MCP tools payable with Stellar assets. Buyers and agents can search discoverable resources, understand price and input schemas, authorize payment, retry the original request, and receive settlement receipts.

## Ecosystem Fit

LumenBazaar is designed for:

- Stellar settlement.
- Soroban authorization and contracts.
- x402 payment handshakes.
- Bazaar discovery metadata.
- MCP agent tooling.
- AI agent payments.
- Seller and buyer SDKs.

## Stellar Positioning

Stellar fits LumenBazaar because it provides:

- Low-cost settlement for per-request payments.
- SEP-41 tokens through the Stellar Asset Contract.
- USDC and stablecoin support.
- Soroban authorization entries.
- Smart account compatibility.
- Fast finality.
- Strong developer tooling.

## x402 Positioning

x402 defines a web-native payment flow where a resource can respond with HTTP 402 payment requirements and a client can retry with an authorized payment payload.

LumenBazaar focuses on bringing that pattern to Stellar with a facilitator, discovery, SDKs, MCP tools, conformance, receipts, and operational runbooks.

## Bazaar Positioning

Bazaar discovery makes paid resources findable. LumenBazaar should index paid HTTP APIs and MCP tools with metadata for price, asset, network, seller, route template, input schema, output schema, and extensions.

The discovery index is off-chain by default so search remains fast, filterable, and practical for agents.

## MCP Positioning

MCP lets agents search, inspect, and call paid resources through deterministic tools. LumenBazaar should expose tools for resource search, inspection, payment preparation, paid calls, receipts, budgets, and supported networks.

## SDK Positioning

The seller SDK helps resource owners add x402 payment requirements and Bazaar metadata with minimal code.

The buyer SDK helps callers search resources, inspect payment terms, prepare payment payloads, verify, retry, settle, fetch receipts, and enforce budgets.

## Soroban Contract Positioning

The exact payment flow should stay contract-free where Stellar/Soroban authorization entries and the Stellar Asset Contract are sufficient.

Soroban contracts are used for capped metered `upto` sessions where on-chain enforcement is needed after actual usage is known.

## Use Cases

LumenBazaar should work in three modes:

- Hosted public service for developers who want fast onboarding.
- Self-hostable infrastructure for teams that need their own facilitator and discovery index.
- Open reference infrastructure for Stellar developers, SCF reviewers, and agent payment builders.

## What It Is Not

LumenBazaar is not:

- A custodial wallet.
- A source of buyer funds.
- A required centralized operator.
- A token incentive project.
- Infrastructure operated by the Stellar Development Foundation.
- A system that hides settlement details from developers.

## Funding Fit

The project is intended to fit the Stellar Community Fund Build Award RFP Track for x402 facilitator and Bazaar discovery support. Funding material should emphasize open-source infrastructure, testnet and mainnet deliverables, conformance, security readiness, SDKs, MCP workflows, examples, metrics, and operations.
