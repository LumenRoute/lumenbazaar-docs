# Consistency Audit

The consistency audit keeps the docs aligned with the project architecture, trust model, scope boundaries, and funding evidence rules.

## Automated Check

Run:

```bash
npm run check:consistency
```

The check validates:

- Required docs pages exist.
- Placeholder wording has been removed from docs pages.
- Project positioning remains present.
- Non-custodial scope remains present.
- Exact payment and `upto` sessions remain separate.
- Discovery is documented as off-chain by default.
- Four-repo ownership remains explicit.
- Testnet evidence is not treated as mainnet evidence.
- External references are marked as drift-prone.

## Manual Audit Checklist

Reviewers should also check:

- `LumenBazaar` is used for the project name.
- `LumenRoute` is used for the GitHub organization.
- `Veridatum Labs` is used only for proposal organization context.
- Seller, buyer, agent, and operator responsibilities remain distinct.
- The facilitator is described as non-custodial.
- Docs never ask users for private keys or seed phrases.
- API reference pages match generated OpenAPI output when available.
- Contract pages match generated ABI/spec output when available.
- Mainnet behavior is gated until evidence exists.
- Conformance is proven through runner output, receipts, and transaction hashes.

## Content Boundaries

Do not merge these concepts:

- Exact fixed-price payments and capped metered `upto` sessions.
- Testnet and mainnet evidence.
- Local tests and live-network settlement.
- Frontend screenshots and protocol conformance.
- Policy wallet examples and production wallet infrastructure.
- Discovery metadata and on-chain settlement evidence.

## Current Audit Status

Current status:

```txt
required pages: present
placeholder wording: checked
project positioning: checked
non-custodial scope: checked
exact vs upto separation: checked
off-chain discovery: checked
four-repo model: checked
evidence separation: checked
source drift warning: checked
```
