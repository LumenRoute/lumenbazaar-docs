# Testnet Guide

Use testnet to prove LumenBazaar flows before any mainnet payment behavior is enabled. Testnet is where sellers validate metadata, buyers test authorization, operators verify settlement, and reviewers inspect transaction evidence without touching real assets.

## Testnet Goals

The testnet environment should prove:

- x402 exact payment requirements are generated correctly.
- `/v1/supported` reports expected Stellar testnet support.
- `/v1/verify` accepts valid payment payloads and rejects invalid ones.
- `/v1/settle` submits settlement and records receipts.
- Bazaar discovery accepts valid resources and rejects poisoned metadata.
- Search returns testnet resources with filters.
- MCP tools can search, inspect, and call a paid resource.
- Operator metrics report real health and settlement status.

## Required Components

A full testnet run needs:

- Backend API configured for `stellar:testnet`.
- Worker process.
- PostgreSQL.
- Redis.
- Search index.
- MCP server.
- Seller example API.
- Buyer SDK or client.
- Testnet wallet or controlled test signer.
- Frontend dashboard for inspection.

## Configuration Checklist

Configure:

- `APP_ENV=testnet`
- Facilitator public URL.
- Stellar testnet RPC URL.
- Horizon URL where needed.
- Testnet network passphrase.
- Supported asset list.
- USDC testnet asset configuration if available.
- Seller testnet public address.
- Redis connection.
- PostgreSQL connection.
- Search connection.

Do not store private keys in repository files. Use environment variables or a secret manager for service credentials.

## Seller Setup

1. Create or select a testnet seller account.
2. Configure `SELLER_STELLAR_ADDRESS`.
3. Start the paid example API.
4. Register the seller through the backend.
5. Complete domain verification or use a documented local fixture for development.
6. Create resource metadata.
7. Validate metadata through `/v1/discovery/validate`.
8. Publish through `/v1/discovery/catalog`.

## Buyer Setup

1. Create or select a testnet buyer account.
2. Ensure the buyer can authorize the configured asset.
3. Search for the resource through discovery.
4. Inspect the payment requirements.
5. Enforce local budget rules.
6. Authorize only the inspected payment terms.

## Exact Payment Test

Run the complete exact payment flow:

1. Buyer calls the protected seller resource.
2. Seller returns HTTP 402 with x402 terms.
3. Buyer authorizes payment.
4. Buyer submits payload to `/v1/verify`.
5. Facilitator validates network, asset, amount, recipient, expiry, authorization, and replay state.
6. Buyer retries the original request.
7. Seller submits settlement through `/v1/settle`.
8. Facilitator submits settlement to Stellar testnet.
9. Receipt is created.
10. Resource response is returned to the buyer.

## Discovery Test

After cataloging, verify:

- Resource appears in `GET /v1/discovery/resources`.
- Resource appears in `GET /v1/discovery/search`.
- Filters work for network, asset, type, seller, price, and extension.
- Invalid metadata returns stable validation reasons.
- `partialResults` is returned when indexing is incomplete.

## MCP Test

Verify the MCP server can:

- Run locally.
- List supported networks.
- Search paid resources.
- Inspect a selected resource.
- Prepare payment.
- Call a paid testnet resource.
- Return result, receipt, and transaction hash.
- Enforce budget controls.

## Evidence To Record

Record:

- Backend commit.
- Contracts commit if `upto` is involved.
- Frontend commit if UI was used.
- Docs commit.
- API base URL.
- Resource ID.
- Seller ID.
- Receipt ID.
- Transaction hash.
- Ledger number.
- Asset.
- Amount.
- Network.
- Conformance run ID.
- Test command output.

## What Testnet Does Not Prove

Testnet evidence does not prove:

- Mainnet asset configuration is correct.
- Mainnet trustlines exist.
- Production latency is acceptable.
- Production monitoring is complete.
- Security review is finished.
- Mainnet settlement is live.

Docs, dashboards, and proposals must not present testnet evidence as mainnet evidence.

## Expected Failure Checks

Testnet should also prove stable failures:

- Unsupported network returns `UNSUPPORTED_NETWORK`.
- Unsupported asset returns `UNSUPPORTED_ASSET`.
- Expired authorization returns `AUTH_EXPIRED`.
- Reused payload returns `REPLAY_DETECTED`.
- Wrong amount returns `AMOUNT_MISMATCH`.
- Wrong asset returns `ASSET_MISMATCH`.
- Wrong recipient returns `RECIPIENT_MISMATCH`.
- Invalid route template returns `ROUTE_TEMPLATE_INVALID`.
- Unverified seller domain returns `SELLER_DOMAIN_UNVERIFIED`.

## Readiness Result

A testnet environment is ready when exact payments, discovery, search, receipts, MCP tools, conformance checks, and operator health views all work against testnet configuration with recorded evidence.
