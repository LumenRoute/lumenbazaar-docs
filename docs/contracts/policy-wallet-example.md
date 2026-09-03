# Policy Wallet Example

The policy wallet is an optional example showing how a smart account can restrict agent spending. It is not production wallet infrastructure.

Use it as a reference for policy design, tests, and documentation. Do not treat it as audited wallet code.

## Purpose

Autonomous agents need payment constraints before they can safely call paid resources. A smart account can enforce those constraints on-chain or in wallet policy logic.

The example should demonstrate:

- Maximum amount per payment.
- Maximum amount per day.
- Allowed sellers.
- Allowed assets.
- Allowed networks.
- Allowed resource hashes.
- Expiration windows.

## Non-Production Warning

This contract should include a visible warning in source and docs:

```txt
This is an example policy wallet. It is not audited and should not be used as production wallet infrastructure.
```

The example exists to show how LumenBazaar agent payments can be bounded. It does not replace a security-reviewed wallet.

## Policy Fields

Recommended policy fields:

```rust
Policy {
    owner: Address,
    max_amount_per_payment: i128,
    max_amount_per_day: i128,
    allowed_sellers: Vec<Address>,
    allowed_assets: Vec<Address>,
    allowed_resource_hashes: Vec<BytesN<32>>,
    expires_at_ledger: u32,
}
```

The final contract may choose different storage details, but the public docs should preserve the policy concepts.

## Max Amount Per Payment

The wallet should reject any payment above a configured per-payment cap.

This protects agents from accidentally authorizing a single expensive resource call.

## Max Amount Per Day

The wallet should track or enforce a daily cap where practical.

This protects long-running agents from repeated small payments adding up to an unintended spend.

## Allowed Sellers

The wallet should restrict payments to approved seller addresses.

Allowed seller checks help prevent:

- Payment to a forged recipient.
- Search index poisoning impact.
- Agent prompt injection that redirects payment.

## Allowed Assets

The wallet should restrict assets to an allowlist.

Example:

```txt
USDC on stellar:testnet
USDC on stellar:pubnet
```

Wrong asset attempts should fail closed.

## Allowed Networks

The wallet or surrounding runtime should enforce network policy. Mainnet should require explicit enablement.

Allowed network checks prevent testnet workflows from accidentally becoming mainnet spending flows.

## Allowed Resource Hashes

Resource hashes bind spending to known resources.

The hash should be derived from stable resource metadata such as:

- Resource ID.
- Seller.
- Route template.
- Network.
- Asset.
- `payTo`.
- Schema version.

The exact hash derivation must be documented by the implementation.

## Expiration Windows

Policies should expire. A policy with no expiration is risky for autonomous workflows.

Recommended checks:

- Reject expired policy.
- Reject payment authorization with an excessive expiry window.
- Require renewal for long-lived agents.

## Example Outcomes

Allowed payment:

```txt
seller allowed
asset allowed
network allowed
resource hash allowed
amount below cap
policy not expired
```

Blocked payment:

```txt
seller not allowed
asset mismatch
network mismatch
resource hash not allowed
amount above cap
policy expired
```

## Test Requirements

The policy wallet example should test:

- Allowed payment.
- Amount above per-payment cap.
- Daily cap exceeded.
- Seller not allowed.
- Asset not allowed.
- Network not allowed.
- Resource hash not allowed.
- Expired policy.

## Relationship To Upto Sessions

The policy wallet and `upto-session` contract solve different problems.

The policy wallet constrains what an agent is allowed to authorize. The `upto-session` contract enforces capped metered settlement for one resource session.

They can be used together, but they should remain separate contracts and separate docs.
