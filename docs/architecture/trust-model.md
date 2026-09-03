# Trust Model

LumenBazaar is designed as non-custodial payment infrastructure. It helps buyers, sellers, agents, and operators verify payment requirements, settle authorized requests, and discover paid resources without giving LumenBazaar custody of funds.

## Core Principles

- Never store private keys.
- Never act as the source of buyer funds.
- Verify exact recipient, asset, amount, network, expiry, and authorization.
- Prevent replayed payments.
- Prevent catalog poisoning.
- Make all failure states machine-readable.
- Keep sensitive user data out of logs.
- Separate testnet, mainnet, local, and simulated evidence.

## Trust Boundaries

| Boundary | What crosses it | Main risk | Required control |
| --- | --- | --- | --- |
| Buyer to seller resource | Initial request and paid retry | Buyer calls wrong or malicious endpoint | Resource inspection, price checks, domain checks |
| Seller resource to buyer | HTTP 402 payment requirements | Forged or misleading payment terms | Buyer validates network, asset, amount, recipient, and expiry |
| Buyer to facilitator | Payment payload | Invalid signature, wrong asset, replay | Strict facilitator verification and payment hash uniqueness |
| Facilitator to Stellar | Settlement transaction | RPC failure, wrong network, settlement failure | Network-specific clients, monitoring, stable errors |
| Seller to discovery index | Bazaar metadata | Catalog poisoning, fake seller identity | Domain verification, schema validation, audit logs |
| Backend to search index | Search document sync | Stale or manipulated results | Versioned metadata, workers, `partialResults`, reindexing |
| Frontend to backend | Dashboard API calls | Misleading state or stale UI | Typed schemas, explicit status, transaction links |

## Non-Custodial Design

The facilitator verifies and settles authorized payment payloads. It does not hold balances for buyers and does not sign as the buyer. Buyers authorize payments through wallets, smart accounts, or controlled automation policies.

Documentation, APIs, logs, examples, and screenshots must never include private keys, seed phrases, bearer tokens, or live credentials.

## Seller Metadata Trust

Seller metadata should not be trusted just because it is submitted. A trusted catalog entry requires validation:

- Seller identity exists.
- Seller wallet address is valid.
- Seller domain is verified.
- Resource URL and route template are valid.
- Payment terms match supported networks and assets.
- `payTo` matches the seller's declared recipient.
- Input and output schemas are valid.
- MCP metadata is valid for MCP resources.

Unverified resources may be shown separately only if the UI and API make the trust state explicit.

## Route Template Validation

Route templates are a security-sensitive input because they describe how agents and buyers call resources. The backend should reject templates that allow traversal, ambiguous expansion, unsupported characters, or schema mismatches.

Invalid route templates should fail with `ROUTE_TEMPLATE_INVALID`.

## Payment Verification

Exact payment verification must check:

- Supported network.
- Supported asset.
- Expected recipient.
- Exact amount.
- Authorization validity.
- Expiry.
- Replay state.
- Payment payload shape.

The facilitator should prefer specific error codes over generic failure whenever possible. Examples include `UNSUPPORTED_NETWORK`, `UNSUPPORTED_ASSET`, `INVALID_PAYMENT_PAYLOAD`, `INVALID_SIGNATURE`, `AUTH_EXPIRED`, `REPLAY_DETECTED`, `AMOUNT_MISMATCH`, `ASSET_MISMATCH`, and `RECIPIENT_MISMATCH`.

## Replay Prevention

A payment payload that has already been used must not be accepted again. The backend should store a stable payment hash and enforce uniqueness before settlement.

Replay failures should return `REPLAY_DETECTED` and should be visible in payment attempt records without exposing sensitive payload fields.

## Discovery Index Trust

The discovery index is off-chain and optimized for search. This means it must be protected like any public catalog:

- Validate metadata before cataloging.
- Store versioned resource metadata.
- Keep catalog event history.
- Add rate limits.
- Add audit logs.
- Track seller verification.
- Publish resource quality signals.
- Return `partialResults` when ranking is degraded or incomplete.

## Network Dependency Risk

The facilitator depends on Stellar RPC, Horizon where needed, and configured assets. Network failures must not be hidden from users.

Operators should track:

- RPC health.
- Horizon health.
- Settlement latency.
- Settlement success rate.
- Trustline-related failures.
- Ledger expiry failures.
- Queue depth.

## Upto Contract Trust

`Upto` sessions add a Soroban contract boundary. The contract must enforce:

- Buyer authorization.
- Fixed seller.
- Fixed asset.
- Maximum amount.
- Expiry.
- Single settlement.
- Cancelled-session rejection.
- Usage receipt hash recording.
- Safe TTL extension.

The policy wallet example is not production wallet infrastructure. It exists to demonstrate smart account spending constraints for agents.

## Evidence Rules

Trustworthy evidence includes:

- Test output.
- Conformance run output.
- Receipt records.
- Transaction hashes.
- Contract IDs.
- Generated OpenAPI output.
- Generated contract ABI/spec output.

Screenshots can support a narrative, but they are not protocol conformance evidence.
