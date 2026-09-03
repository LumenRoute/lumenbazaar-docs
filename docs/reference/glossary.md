# Glossary

This glossary defines common LumenBazaar terms.

## x402

A web-native payment pattern where a resource can respond with HTTP 402 payment requirements and a client can retry with an authorized payment payload.

See [Payment Flow](/architecture/payment-flow).

## Facilitator

The backend service that verifies and settles x402 payment payloads. In LumenBazaar, the facilitator validates network, asset, amount, recipient, expiry, authorization, and replay state.

See [Facilitator API Reference](/api-reference/facilitator).

## Bazaar Discovery

The off-chain discovery layer for paid HTTP endpoints and MCP tools. It stores and searches resource metadata, schemas, payment requirements, seller verification state, and catalog events.

See [Discovery Flow](/architecture/discovery-flow).

## MCP

Model Context Protocol. LumenBazaar uses MCP to expose tools that let agents search paid resources, inspect resources, prepare payment, call paid resources, fetch receipts, inspect budgets, and list supported networks.

See [Agent Guide](/guides/agent-guide) and [MCP API Reference](/api-reference/mcp).

## Stellar Asset Contract

The Soroban contract representation of a Stellar asset. LumenBazaar uses Stellar assets such as USDC for payment settlement.

See [Mainnet Guide](/guides/mainnet-guide).

## SEP-41

The Stellar ecosystem standard for token interfaces on Soroban. LumenBazaar should support configured SEP-41 assets.

See [Facilitator API Reference](/api-reference/facilitator).

## Soroban Auth Entry

Authorization data used by Soroban transactions. LumenBazaar uses Stellar and Soroban authorization concepts so buyers can authorize payments without giving LumenBazaar private keys.

See [Trust Model](/architecture/trust-model).

## Smart Account

A contract account that can implement custom authorization policy through smart wallet logic. LumenBazaar includes a policy wallet example to demonstrate agent spending constraints.

See [Policy Wallet Example](/contracts/policy-wallet-example).

## Exact Payment

A fixed-price payment where the amount is known before the buyer authorizes payment. This is the first x402 flow LumenBazaar should implement.

See [Payment Flow](/architecture/payment-flow).

## Upto Session

A capped metered payment session where the buyer authorizes a maximum spend and the seller or facilitator settles only actual usage. LumenBazaar uses the `upto-session` contract for this flow.

See [Upto Session Contract](/contracts/upto-session).

## Receipt

A durable record of payment and settlement status. Receipts should include resource, seller, network, asset, amount, transaction hash where settled, ledger where confirmed, and failure code when failed.

See [Payments API Reference](/api-reference/payments).

## Resource

A paid HTTP endpoint or MCP tool that can be discovered, inspected, paid for, and called.

See [Resources API Reference](/api-reference/resources).

## Seller

The owner of a paid API, model endpoint, data service, or MCP tool.

See [Seller Guide](/guides/seller-guide).

## Buyer

A developer, app, wallet, automation service, or agent runtime that calls paid resources.

See [Buyer Guide](/guides/buyer-guide).

## AI Agent

An autonomous or semi-autonomous software system that discovers and calls tools programmatically. LumenBazaar agents should use MCP tools and budget controls.

See [Agent Guide](/guides/agent-guide).

## Operator

A person or team running LumenBazaar infrastructure, including the API, worker, MCP server, database, Redis, search, frontend, docs, and monitoring.

See [Operator Guide](/guides/operator-guide).

## Catalog Event

A stored event describing resource cataloging activity, such as creation, update, validation failure, or indexing state.

See [Discovery API Reference](/api-reference/discovery).

## Payment Attempt

A backend record representing an attempted payment verification or settlement path.

See [Payments API Reference](/api-reference/payments).

## Settlement

The act of submitting or confirming a payment transaction on Stellar after a valid payment payload is presented.

See [Payment Flow](/architecture/payment-flow).

## Conformance

Evidence that facilitator endpoints and payment flows match expected x402 behavior. Conformance should be proven through runner output, receipts, and transaction evidence, not screenshots.

See [Conformance Report Template](/funding/conformance-report-template).

## Partial Results

A discovery response flag indicating that search or ranking may be incomplete because indexing or ranking is degraded.

See [Discovery Flow](/architecture/discovery-flow).

## Trustline

An account-level relationship required for some Stellar assets. Trustline failures should be surfaced as `TRUSTLINE_REQUIRED` where known.

See [Mainnet Guide](/guides/mainnet-guide).
