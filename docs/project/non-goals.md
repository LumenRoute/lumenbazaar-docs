# Non-Goals

LumenBazaar has explicit non-goals. These boundaries protect the project from scope creep, security risk, and misleading product claims.

## Custody

LumenBazaar should not become a custodial wallet.

It must not:

- Hold buyer funds.
- Store buyer private keys.
- Ask users to paste seed phrases.
- Act as the source of buyer funds.
- Hide who signs or authorizes a payment.

Wallets, smart accounts, and controlled signer environments should handle authorization.

## Required Hosted Operator

LumenBazaar should not require sellers to use one hosted operator.

The project should support:

- Hosted public service usage.
- Self-hosted infrastructure.
- Open reference infrastructure.

Operators should be able to run their own facilitator and discovery index.

## Restrictive Dependency Path

LumenBazaar should not require AGPL or strong copyleft infrastructure in the core facilitator dependency path.

Each repository's committed root license is authoritative. Dependencies should support permissive
redistribution and commercial or self-hosted operation.

## Ecosystem Claims

LumenBazaar should not claim to be operated by the Stellar Development Foundation or guaranteed by SCF.

Docs and UI may describe ecosystem fit, funding targets, and public references, but they must not imply endorsement that has not been explicitly granted and documented.

## Speculative Token Incentives

LumenBazaar should not start with speculative token incentives.

The project is developer infrastructure: facilitator, discovery, SDKs, MCP server, contracts, examples, conformance, docs, and operations.

## Hidden Settlement Details

LumenBazaar should not hide settlement details from developers.

Payment-related surfaces should show:

- Network.
- Asset.
- Amount.
- Recipient.
- Seller.
- Resource.
- Status.
- Receipt ID.
- Transaction hash when settled.
- Ledger when confirmed.
- Failure code when failed.

## Screenshot-Only Evidence

LumenBazaar should not treat screenshots as proof of conformance.

Acceptable evidence includes:

- Test output.
- Conformance run output.
- Receipts.
- Transaction hashes.
- Contract IDs.
- Generated references.

Screenshots may support UX review, but they do not prove protocol behavior.

## Overbuilt First Release

LumenBazaar should not put every possible feature into the first release.

The preferred path is:

- Exact payment flow first.
- Discovery second.
- SDKs and MCP after core APIs.
- `Upto` contracts after exact flow and discovery are stable.
- Mainnet only after testnet, conformance, monitoring, and security gates.
