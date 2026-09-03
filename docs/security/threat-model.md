# Threat Model

LumenBazaar handles payment verification, settlement coordination, resource discovery, MCP agent access, and optional Soroban capped sessions. The security model is built around non-custodial operation, strict payment validation, metadata trust controls, and machine-readable failure states.

## Core Principles

- Never store private keys.
- Never act as the source of buyer funds.
- Verify exact recipient, asset, amount, network, expiry, and authorization.
- Prevent replay.
- Prevent catalog poisoning.
- Make all failure states machine-readable.
- Keep sensitive user data out of logs.
- Document testnet, mainnet, and simulated behavior separately.

## Threats And Controls

| Threat | Impact | Controls | Required Tests |
| --- | --- | --- | --- |
| Forged seller metadata | Buyers pay the wrong seller or trust a fake resource. | Domain verification, seller ownership checks, audit logs. | Reject forged seller metadata. |
| Forged route template | Agents call unintended paths or unsafe routes. | Route traversal checks, schema matching, template parser. | Reject malformed and traversal templates. |
| Replay attack | A payment payload is reused. | Payment hash uniqueness, expiry checks, settlement state. | Reused payload returns `REPLAY_DETECTED`. |
| Expired auth reuse | Old authorization is accepted. | Ledger expiry validation. | Expired payload returns `AUTH_EXPIRED`. |
| Wrong asset settlement | Buyer pays with unsupported or unexpected asset. | Strict asset checks and allowlists. | Wrong asset returns `ASSET_MISMATCH`. |
| Wrong recipient settlement | Funds go to unintended recipient. | Strict `payTo` validation. | Wrong recipient returns `RECIPIENT_MISMATCH`. |
| Over-settlement in `upto` sessions | Seller settles above buyer cap. | Contract cap enforcement. | Contract rejects `AmountExceedsCap`. |
| Double settlement | Same session or payment is settled twice. | Payment hash uniqueness, contract status checks. | Double settlement is rejected. |
| Search index poisoning | Malicious resources appear trusted. | Metadata validation, seller verification, catalog events, moderation. | Poisoned metadata is rejected. |
| Fake domain ownership | Seller claims a domain they do not control. | DNS or well-known challenge verification. | Unverified domain returns `SELLER_DOMAIN_UNVERIFIED`. |
| Abusive facilitator calls | Availability or cost attack. | Rate limits, audit logs, queue controls. | Rate limit returns `RATE_LIMITED`. |
| RPC failure or degraded settlement | Payment cannot settle or status becomes stale. | Network health checks, retries, stable errors, operator alerts. | RPC failures map to settlement/network errors. |
| Dependency license conflicts | Project cannot remain permissively redistributable. | Dependency policy and license scanning. | CI reports prohibited licenses. |

## Payment Verification Controls

The facilitator must validate:

- Payment payload shape.
- Scheme.
- Network.
- Asset code and issuer.
- Amount.
- Recipient.
- Expiry.
- Authorization.
- Payment hash uniqueness.

Use `@x402/stellar` for Stellar-specific x402 behavior instead of reimplementing core payment logic from scratch.

## Catalog Controls

Cataloging must validate:

- Seller exists.
- Seller domain is verified for trusted listing.
- Resource URL is valid.
- Route template is safe.
- Network is supported.
- Asset is supported.
- Recipient address is valid.
- Schemas are valid.
- MCP metadata is valid where applicable.

The discovery index is off-chain by default, so catalog validation and audit trails are mandatory.

## Contract Controls

The `upto-session` contract must enforce:

- Buyer authorization.
- Fixed seller.
- Fixed asset.
- Maximum spend cap.
- Settlement before expiry.
- No settlement after cancellation.
- No repeated settlement.
- Usage receipt hash recording.
- Safe TTL extension.

## Logging Controls

Logs may include:

- Request ID.
- Resource ID.
- Seller ID.
- Payment attempt ID.
- Settlement ID.
- Receipt ID.
- Error code.
- Network.
- Asset.
- Non-sensitive status.

Logs must not include:

- Private keys.
- Seed phrases.
- Bearer tokens.
- Wallet secrets.
- Full sensitive payment payloads when not required for audit.
- Unredacted infrastructure secrets.

## Stable Error Codes

Security-sensitive failures should use:

```txt
PAYMENT_REQUIRED
UNSUPPORTED_NETWORK
UNSUPPORTED_ASSET
INVALID_PAYMENT_PAYLOAD
INVALID_SIGNATURE
AUTH_EXPIRED
REPLAY_DETECTED
AMOUNT_MISMATCH
ASSET_MISMATCH
RECIPIENT_MISMATCH
SETTLEMENT_FAILED
TRUSTLINE_REQUIRED
RESOURCE_NOT_FOUND
CATALOG_VALIDATION_FAILED
ROUTE_TEMPLATE_INVALID
SELLER_DOMAIN_UNVERIFIED
RATE_LIMITED
INTERNAL_ERROR
```

## Evidence Requirements

Security evidence should include:

- Unit tests.
- Integration tests.
- Contract tests.
- Conformance runs.
- Dependency license reports.
- Audit readiness checklist.
- Testnet transaction evidence.
- Mainnet transaction evidence when live.

Do not use screenshots as conformance proof.
