# Buyer Guide

A buyer is a developer, application, wallet, automation service, or agent runtime that wants to call a paid resource without creating a seller-specific account or billing relationship.

This guide explains the expected buyer flow: search, inspect, authorize, verify, retry, settle, and store the receipt.

## Buyer Responsibilities

Before calling a paid resource, the buyer should:

- Search for resources that match the task.
- Inspect price, asset, network, seller, route, input schema, and output schema.
- Enforce local budget limits.
- Confirm the resource is from the intended seller.
- Authorize only the exact payment terms accepted by local policy.
- Keep receipts for reconciliation.

## Search Resources

Use the discovery API or buyer SDK to search resources.

```ts
import { LumenBazaarClient } from "@lumenbazaar/buyer-sdk";

const client = new LumenBazaarClient({
  facilitatorUrl: "https://api.lumenbazaar.dev",
  network: "stellar:testnet",
});

const resources = await client.search("weather api for Lagos");
```

Search results should include:

- Resource ID.
- Name and description.
- Seller domain and verification state.
- Resource type.
- Network.
- Asset.
- Amount.
- Input and output schema summaries.
- `partialResults` when ranking is incomplete.

## Inspect Payment Terms

Before signing, inspect the selected resource:

```txt
GET /v1/resources/:id
```

The buyer should confirm:

- Network is expected.
- Asset is accepted.
- Amount is within local budget.
- `payTo` recipient matches the intended seller.
- Endpoint and route template match the intended resource.
- Expiry window is acceptable.
- Input schema matches the request body.
- Output schema is usable by the application.

## Authorize Payment

Payment authorization should happen through a wallet, smart account, or controlled signer. LumenBazaar should never ask the buyer to hand over a private key.

Local buyer policy should check:

- Maximum amount per call.
- Maximum total amount per workflow.
- Allowed networks.
- Allowed assets.
- Allowed sellers.
- Allowed resource IDs or hashes.
- Expiry limits.

## Verify Payment

Submit the payment payload to:

```txt
POST /v1/verify
```

Verification checks payment shape, network, asset, amount, recipient, expiry, authorization, and replay state.

If verification fails, stop unless the error is explicitly recoverable. For example:

- `AUTH_EXPIRED` may require a fresh authorization.
- `TRUSTLINE_REQUIRED` may require wallet setup.
- `RATE_LIMITED` may require waiting or changing request rate.
- `AMOUNT_MISMATCH`, `ASSET_MISMATCH`, and `RECIPIENT_MISMATCH` should be treated as hard stops.

## Retry Paid Request

After verification succeeds, retry the original resource request with the payment payload attached according to the x402 client behavior.

The buyer SDK should hide repetitive HTTP retry wiring while still exposing the payment requirement, verification result, settlement result, and receipt.

## Settle And Fetch Receipt

Settlement normally happens through the seller resource and facilitator. Buyers should still capture the returned receipt or fetch it later:

```txt
GET /v1/receipts/:receiptId
```

A receipt should include:

- Receipt ID.
- Payment attempt ID.
- Resource ID.
- Seller ID.
- Network.
- Asset code and issuer.
- Amount.
- Settlement status.
- Transaction hash when settled.
- Ledger when confirmed.
- Failure code when failed.

## Full Buyer SDK Flow

```ts
const resources = await client.search("weather api for Lagos");

const result = await client.callPaidResource({
  resourceId: resources[0].id,
  input: { city: "Lagos" },
  maxAmount: "0.10",
});

console.log(result.receipt.transactionHash);
```

The buyer SDK should provide:

- Resource search.
- Payment term inspection.
- Payment payload preparation.
- Verification submission.
- Paid request retry.
- Settlement handling.
- Receipt fetching.
- Local budget enforcement.

## Budget Controls

Budget controls are required for automation and agent workflows. A buyer should define limits before any payment authorization happens.

Recommended controls:

- Per-call maximum amount.
- Per-session maximum amount.
- Per-day maximum amount.
- Allowed assets.
- Allowed seller domains.
- Allowed networks.
- Allowed resource types.
- Stop conditions for repeated failures.

## Error Handling

Buyer clients and agents should branch on stable error codes instead of parsing human-readable messages.

Important buyer-facing error codes:

- `PAYMENT_REQUIRED`
- `UNSUPPORTED_NETWORK`
- `UNSUPPORTED_ASSET`
- `INVALID_PAYMENT_PAYLOAD`
- `INVALID_SIGNATURE`
- `AUTH_EXPIRED`
- `REPLAY_DETECTED`
- `AMOUNT_MISMATCH`
- `ASSET_MISMATCH`
- `RECIPIENT_MISMATCH`
- `SETTLEMENT_FAILED`
- `TRUSTLINE_REQUIRED`
- `RESOURCE_NOT_FOUND`
- `RATE_LIMITED`
- `INTERNAL_ERROR`

## Evidence

For testnet and mainnet usage, buyers should retain:

- Request ID.
- Resource ID.
- Payment payload hash where safe to store.
- Verification result.
- Settlement result.
- Receipt ID.
- Transaction hash.
- Ledger.

Do not treat a successful UI screen as settlement proof. Use receipts and transaction hashes.
