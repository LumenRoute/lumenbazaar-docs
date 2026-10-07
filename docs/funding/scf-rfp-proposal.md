# SCF RFP Proposal

This is the working draft structure for a Stellar Community Fund Build Award RFP Track proposal.

The proposal should be finalized only after team credentials, budget, timeline, public repository links, testnet evidence, and conformance evidence are current.

## Project Summary

LumenBazaar is open Stellar x402 infrastructure for paid APIs and AI agent workflows. It provides a Stellar-native x402 facilitator, Bazaar discovery layer, MCP server, seller SDK, buyer SDK, examples, frontend dashboard, conformance reporting, and Soroban contracts for capped metered `upto` sessions.

## Problem

Paid APIs usually depend on human-operated account creation, API keys, prepaid credits, subscriptions, dashboards, and credit cards. That flow does not fit autonomous agents, MCP tools, automation systems, or composable applications.

Agents need to:

- Find paid resources.
- Inspect price and schema.
- Authorize bounded payments.
- Call resources.
- Receive receipts.
- Avoid custodial account setup.

Stellar has the settlement properties needed for this, but the ecosystem needs production-quality open infrastructure around x402 facilitation, Bazaar discovery, SDKs, MCP tools, conformance, and operations.

## Solution

LumenBazaar provides:

- x402 facilitator endpoints for `/v1/supported`, `/v1/verify`, and `/v1/settle`.
- Bazaar discovery API for paid HTTP endpoints and MCP tools.
- Search and ranking for resource discovery.
- Seller SDK middleware and metadata helpers.
- Buyer SDK paid-call helpers and budget controls.
- MCP server for agent runtimes.
- Frontend dashboard for exploration, onboarding, payments, operations, and conformance.
- Soroban `upto-session` contract for capped metered payments.
- Docs, examples, conformance reports, and runbooks.

## Why Stellar

Stellar fits the project because it provides:

- Low-cost settlement suitable for per-request payments.
- SEP-41 tokens through the Stellar Asset Contract.
- USDC and stablecoin support.
- Soroban authorization entries.
- Smart account compatibility through `__check_auth`.
- Fast finality and predictable network settlement.
- Strong developer tooling around Stellar SDKs, RPC, Horizon, and Soroban contracts.

## Why x402

x402 gives sellers and buyers a web-native payment handshake. A resource can return HTTP 402 with payment requirements, the buyer can authorize payment, the facilitator can verify and settle, and the paid request can be retried.

LumenBazaar extends this into the Stellar ecosystem with discovery, SDKs, MCP tools, conformance reporting, and optional metered contracts.

## Why Veridatum Labs

Veridatum Labs is the proposed organization for LumenBazaar. The final proposal should add:

- Team background.
- Stellar or Soroban experience.
- Open-source delivery history.
- Security and operations experience.
- Drips contributor plan.
- Repository links.

## Architecture

The project uses four repositories:

- `lumenbazaar-frontend`
- `lumenbazaar-backend`
- `lumenbazaar-contracts`
- `lumenbazaar-docs`

The backend owns facilitator, discovery, MCP, SDKs, workers, metrics, receipts, and conformance. Contracts own `upto` enforcement and policy examples. Frontend owns user workflows. Docs own public explanation and generated references.

See [Architecture Overview](/architecture/overview) and [Repository Map](/architecture/repository-map).

## Technical Stack

Frontend:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui or equivalent
- TanStack Query
- Zod
- Stellar Wallets Kit
- Freighter support

Backend:

- Node.js
- TypeScript
- Fastify or NestJS
- PostgreSQL
- Redis
- BullMQ
- Prisma or Drizzle
- PostgreSQL full-text search first
- `@x402/stellar`
- Stellar SDK

Contracts:

- Rust
- Soroban SDK
- Stellar CLI
- Cargo

Docs:

- Docusaurus
- Markdown or MDX
- Mermaid
- OpenAPI-generated references
- Contract-generated references

## Milestones

1. Repository readiness and shared standards.
2. Exact x402 facilitator.
3. Bazaar discovery layer.
4. Seller and buyer SDKs.
5. MCP server and agent workflows.
6. Soroban `upto-session` contract.
7. Full frontend product.
8. Conformance, security, and audit readiness.
9. Mainnet launch.
10. Ecosystem growth and maintenance.

See [Milestones](/funding/milestones).

## Budget

Budget should be finalized with real team capacity and SCF expectations.

Suggested budget categories:

- Backend facilitator and discovery implementation.
- SDK and MCP implementation.
- Soroban contract implementation and tests.
- Frontend dashboard implementation.
- Documentation, examples, and conformance reporting.
- Security review preparation.
- Mainnet operations and monitoring.
- Contributor coordination through Drips.

## Open-Source Plan

LumenBazaar should be public and self-hostable under each repository's permissive root license. Each
repository should include repository standards, issue templates, PR templates, contributor guides,
security policy, and CI.

Drips should be used to coordinate scoped contributor issues.

## Maintenance Plan

Maintenance should include:

- Tracking x402 spec changes.
- Tracking Stellar tooling changes.
- Updating generated OpenAPI and contract references.
- Publishing conformance reports.
- Maintaining examples.
- Responding to security disclosures.
- Publishing public metrics.

## Security Plan

Security work includes:

- Non-custodial architecture.
- Stable payment validation errors.
- Replay prevention.
- Strict asset, amount, network, recipient, and expiry checks.
- Domain verification.
- Route-template validation.
- Catalog poisoning tests.
- Contract cap and double-settlement tests.
- Dependency and license review.
- Audit readiness package.

See [Threat Model](/security/threat-model) and [Audit Readiness](/security/audit-readiness).

## Conformance Plan

Conformance should verify:

- `/v1/supported` output.
- `/v1/verify` request and response behavior.
- `/v1/settle` request and response behavior.
- Exact scheme support.
- Stable error codes.
- Testnet behavior.
- Mainnet behavior when live.
- `Upto` scheme behavior after contract integration.
- Compatibility with unmodified x402 clients.

## Metrics

Track:

- Public repos created.
- Issues opened and closed.
- Contributors merged through Drips.
- Testnet settlements.
- Mainnet settlements.
- Indexed resources.
- Active sellers.
- MCP calls completed.
- Conformance pass rate.
- Uptime.
- Search quality metrics.

See [Metrics](/funding/metrics).

## Risks

Key risks:

- x402 discovery conventions may evolve.
- Mainnet settlement touches real assets.
- `Upto` contract design requires care.
- Discovery poisoning can mislead agents.
- The full project can become oversized.

Mitigations:

- Add conformance tests.
- Start on testnet.
- Scope contracts narrowly.
- Validate metadata and domains.
- Deliver by small contributor-ready issues.

## Links To Add Before Submission

- Frontend repository.
- Backend repository.
- Contracts repository.
- Docs repository.
- Testnet deployment.
- Conformance report.
- Example apps.
- Public metrics.
- Contract IDs when available.
- Drips issue board.
