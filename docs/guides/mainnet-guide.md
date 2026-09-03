# Mainnet Guide

Mainnet support must be enabled deliberately. Mainnet settlement touches real assets, so the docs, backend, frontend, contracts, and operations runbooks must all make network, asset, amount, recipient, and evidence clear.

## Mainnet Rule

Do not enable mainnet by accident. Mainnet support should require explicit configuration, completed testnet evidence, monitoring, rate limits, conformance checks, and security review decisions.

## Readiness Gates

Before mainnet launch, require:

- Exact payment flow works on Stellar testnet.
- Testnet conformance checks pass.
- `/v1/supported`, `/v1/verify`, and `/v1/settle` are tested.
- Payment receipts include transaction hashes where settlement succeeds.
- Stable error codes are implemented.
- Logs exclude private keys and sensitive payment data.
- Rate limiting is active.
- Audit logs are active.
- Public metrics are available.
- Operator runbook is published.
- Incident response guide is published.
- Security disclosure policy is published.
- Asset and trustline requirements are documented.
- Mainnet environment variables are reviewed.
- Contract mainnet deployment, if used, has passed review gates.

## Network Configuration

Mainnet configuration should identify:

- `stellar:pubnet` support.
- Pubnet RPC URL.
- Horizon URL where needed.
- Pubnet network passphrase.
- Supported SEP-41 assets.
- USDC production configuration.
- Facilitator public URL.
- Worker queues.
- Database.
- Redis.
- Search service.
- Monitoring endpoints.

The backend should fail closed if required mainnet settings are missing.

## Asset Requirements

LumenBazaar should support any configured SEP-41 token, with USDC as the default production stablecoin where configured.

For each mainnet asset, document:

- Asset code.
- Asset issuer.
- Stellar Asset Contract address where applicable.
- Trustline requirements.
- Display precision.
- Minimum supported payment amount.
- Any operator-specific allowlist behavior.

## Trustline Guidance

Buyers and sellers may need trustlines depending on the asset and account state. The facilitator and SDKs should expose trustline failures with `TRUSTLINE_REQUIRED` rather than generic settlement failure when the cause is known.

Docs should explain trustline setup without asking users to reveal private keys.

## Fee Sponsorship

If fee sponsorship is supported, document:

- Who sponsors fees.
- Which networks support sponsorship.
- Which operations are sponsored.
- Abuse protections.
- Failure behavior.
- How sponsorship appears in receipts.

If fee sponsorship is not implemented, say so plainly.

## Mainnet Exact Payment Flow

The exact payment flow is the first mainnet target:

1. Seller resource returns HTTP 402 payment requirements.
2. Buyer authorizes exact payment on `stellar:pubnet`.
3. Facilitator verifies network, asset, recipient, amount, expiry, authorization, and replay state.
4. Buyer retries the paid request.
5. Seller settles through facilitator.
6. Facilitator submits settlement transaction.
7. Receipt records settlement state, transaction hash, and ledger.

## Mainnet Upto Sessions

`Upto` sessions should not launch on mainnet until:

- Contract tests pass.
- Testnet deployment is documented.
- Contract IDs are recorded.
- ABI/spec files are generated.
- TypeScript bindings are generated and tested.
- Gas/resource usage is documented.
- Security limitations are documented.
- Audit readiness is complete.

Exact payments and `upto` sessions must remain separate in docs and implementation.

## Public Evidence

Mainnet evidence should include:

- Mainnet transaction hashes.
- Receipt IDs.
- Ledger numbers.
- Conformance run IDs.
- Supported network and asset configuration.
- Public metrics.
- Uptime history.

Never label testnet transaction hashes as mainnet evidence.

## Rollback And Disablement

Operators need a fast way to disable:

- New mainnet verification.
- New mainnet settlement.
- New cataloging.
- Specific assets.
- Specific sellers.
- Specific resources.
- MCP paid calls.
- Fee sponsorship if supported.

Disablement procedures belong in the operator runbook and should be tested before launch.

## User-Facing Warnings

The frontend and docs should make mainnet state obvious. Users should always see:

- Network.
- Asset.
- Amount.
- Recipient.
- Seller.
- Resource.
- Settlement status.
- Transaction hash when settled.

Mainnet UX should not hide settlement details behind simplified success screens.
