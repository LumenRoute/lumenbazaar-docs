# Payments API Reference

The released backend persists payment attempts, settlements, and receipts, but its public HTTP
surface exposes verification, settlement, and receipt lookup only. It does not currently expose
payment-attempt or settlement collection/detail endpoints.

Base path:

```txt
/v1
```

## Verify And Settle

The canonical x402 v2 endpoints are documented in the
[facilitator reference](./facilitator.md):

```txt
POST /v1/verify
POST /v1/settle
```

Both accept the released x402 payment payload. A successful verification response includes durable
LumenBazaar attempt and correlation identifiers under its extension data. A successful settlement
response includes the transaction hash and receipt identifier needed for recovery.

## Get Receipt

```txt
GET /v1/receipts/{receiptId}
```

Returns one durable receipt by ID. The released receipt record contains:

- `id`, `correlationId`, and `paymentAttemptId`.
- Nullable `resourceId` and `sellerId`.
- Nullable `transactionHash`, `ledger`, and `settledAt` while finality is pending.
- `network`, atomic `amount`, `assetCode`, and `assetIssuer`.
- `status`, nullable `failureCode`, and nullable `failureReason`.
- `evidenceHash`, `createdAt`, and `updatedAt`.

Receipts are the public evidence object for completed or recoverable paid resource calls. Compare a
finalized receipt's transaction hash and ledger with Stellar testnet before treating it as settlement
evidence.

## Unavailable Collection Endpoints

The Phase 24 OpenAPI does not define these routes:

```txt
GET /v1/payments
GET /v1/payments/{paymentId}
GET /v1/settlements/{transactionHash}
GET /v1/sellers/{sellerId}/payments
```

Clients and operator pages must report that capability as unavailable. They must not substitute demo
fixtures or infer these records from screenshots. These routes remain future work until they appear
in a pinned generated OpenAPI artifact.

## Status And Failure Evidence

Database status values are internal implementation detail unless returned by a released endpoint.
Clients must preserve unknown values and use the response's structured error code instead of
guessing finality from an HTTP message.

Receipts and transaction hashes are settlement evidence. Local simulation, testnet verification,
testnet settlement, pending outcomes, and failed outcomes must remain visibly distinct. No testnet
receipt is mainnet evidence.

## Generated Source

The exact released path and response declaration is in
`generated/openapi/openapi.json`, pinned and checksummed by `generated/manifest.json`.
