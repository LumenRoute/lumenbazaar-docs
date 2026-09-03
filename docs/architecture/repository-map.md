# Repository Map

LumenBazaar is split into four public repositories under the `LumenRoute` GitHub organization. Each repository owns a separate delivery surface so the project can scale without mixing frontend, backend, contract, and documentation concerns.

## Repositories

| Repository | Purpose | Primary Stack |
| --- | --- | --- |
| `lumenbazaar-frontend` | Web application for sellers, buyers, agents, reviewers, and operators. | Next.js, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zod, Stellar Wallets Kit |
| `lumenbazaar-backend` | x402 facilitator, Bazaar discovery API, MCP server, SDK packages, workers, examples, metrics, receipts, and conformance tests. | Node.js, TypeScript, Fastify or NestJS, PostgreSQL, Redis, BullMQ, Prisma or Drizzle, Stellar SDK, `@x402/stellar` |
| `lumenbazaar-contracts` | Soroban contracts for capped metered `upto` sessions, smart account policy examples, test utilities, generated bindings, and deployment scripts. | Rust, Soroban SDK, Stellar CLI, Cargo |
| `lumenbazaar-docs` | Public documentation site, protocol guide, API reference, contract reference, SDK reference, operations, security, SCF material, and Drips planning. | Docusaurus, Markdown, MDX, Mermaid, OpenAPI-generated references |

## Frontend Responsibilities

The frontend repo owns:

- Resource explorer.
- Seller onboarding.
- Payment playground.
- Settlement receipt dashboard.
- Operator status dashboard.
- Conformance status view.
- Wallet connection and testnet demonstration UI.
- Links back to canonical docs.

The frontend should not redefine protocol truth. It should consume typed backend schemas and link users to this docs repo for detailed explanations.

## Backend Responsibilities

The backend repo owns:

- `GET /v1/supported`.
- `POST /v1/verify`.
- `POST /v1/settle`.
- Bazaar discovery browsing, validation, cataloging, and search.
- Sellers, resources, payments, settlements, and receipt APIs.
- MCP server tools.
- Seller SDK, buyer SDK, Stellar payments package, shared package, and testkit.
- Worker jobs for settlement confirmation, indexing, conformance, network health, receipt finalization, and cleanup.
- Metrics and operational status.

SDK packages begin in `lumenbazaar-backend/packages`. They can move to a dedicated SDK repository later if package size or release management requires it.

## Contracts Responsibilities

The contracts repo owns only the on-chain pieces that need on-chain enforcement:

- `upto-session` contract.
- Session creation, settlement, cancellation, retrieval, and TTL extension.
- Recipient, asset, max-spend, expiry, cancellation, and single-settlement guarantees.
- Usage receipt hash recording.
- Optional policy wallet examples for smart account spending constraints.
- Contract tests, ABI/spec generation, TypeScript bindings, and deployment scripts.

Exact x402 payments should remain contract-free when Stellar/Soroban auth entries and the Stellar Asset Contract provide enough enforcement.

## Docs Responsibilities

The docs repo owns:

- Architecture overview and flow diagrams.
- Seller, buyer, agent, operator, testnet, and mainnet guides.
- API, MCP, contract, and SDK references.
- Security model and disclosure policy.
- Operations runbooks and monitoring guidance.
- SCF proposal material, milestone tracking, public metrics, and Drips contributor planning.

Docs must separate planned behavior from implemented behavior. Testnet results, mainnet results, CI state, conformance runs, and local mocks should be labeled distinctly.

## Cross-Repo Flow

1. The backend publishes OpenAPI and conformance outputs.
2. The contracts repo publishes ABI/spec artifacts, bindings, deployment notes, and contract IDs.
3. The frontend consumes backend APIs and shows user-facing flows.
4. The docs repo imports generated references and explains how the pieces fit together.

## Future Repositories

Optional future repositories may be created only when there is a practical reason:

- `lumenbazaar-sdk` for SDK packages if release cadence diverges from backend.
- `lumenbazaar-examples` for a larger example catalog.
- `lumenbazaar-infra` for reusable deployment modules.

Until then, SDKs and examples stay in the backend repository.
