# Payments API Reference

The payments API exposes payment attempts, settlements, and receipts for buyers, sellers, operators, and reviewers.

Base path:

```txt
/v1
```

## Payment Attempt Object

```json
{
  "id": "pay_123",
  "resourceId": "resource_123",
  "sellerId": "seller_123",
  "paymentHash": "hash_123",
  "network": "stellar:testnet",
  "assetCode": "USDC",
  "assetIssuer": "G...",
  "amount": "0.05",
  "payTo": "G...",
  "status": "verified",
  "failureCode": null,
  "failureReason": null,
  "expiresAtLedger": 123456,
  "createdAt": "2026-09-03T00:00:00.000Z",
  "updatedAt": "2026-09-03T00:00:00.000Z"
}
```

## Settlement Object

```json
{
  "id": "set_123",
  "paymentAttemptId": "pay_123",
  "transactionHash": "tx_hash",
  "ledger": 123460,
  "network": "stellar:testnet",
  "amount": "0.05",
  "assetCode": "USDC",
  "assetIssuer": "G...",
  "status": "settled",
  "settledAt": "2026-09-03T00:00:00.000Z",
  "createdAt": "2026-09-03T00:00:00.000Z"
}
```

## Receipt Object

```json
{
  "id": "receipt_123",
  "paymentAttemptId": "pay_123",
  "settlementId": "set_123",
  "resourceId": "resource_123",
  "sellerId": "seller_123",
  "transactionHash": "tx_hash",
  "ledger": 123460,
  "network": "stellar:testnet",
  "amount": "0.05",
  "assetCode": "USDC",
  "assetIssuer": "G...",
  "status": "settled",
  "failureCode": null,
  "failureReason": null
}
```

## List Payments

```txt
GET /v1/payments
```

Query parameters:

| Parameter | Description |
| --- | --- |
| `resourceId` | Filter by resource. |
| `sellerId` | Filter by seller. |
| `network` | Filter by Stellar network. |
| `asset` | Filter by asset code. |
| `status` | Filter by payment attempt status. |
| `cursor` | Pagination cursor. |
| `limit` | Page size. |

## Get Payment

```txt
GET /v1/payments/:paymentId
```

Returns one payment attempt and associated settlement or receipt links.

## Get Settlement

```txt
GET /v1/settlements/:transactionHash
```

Returns settlement details by transaction hash.

This endpoint is useful for operators and reviewers who start from on-chain evidence.

## Get Receipt

```txt
GET /v1/receipts/:receiptId
```

Returns receipt details by receipt ID.

Receipts are the primary evidence object for completed paid resource calls.

## Status Values

Payment attempts may use:

```txt
created
verified
verification_failed
settlement_pending
settled
settlement_failed
expired
replayed
cancelled
```

The final enum should be generated from backend schemas when available.

## Failure Codes

Payment, settlement, and receipt endpoints should expose:

```txt
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
RATE_LIMITED
INTERNAL_ERROR
```

## Evidence Rules

Receipts and transaction hashes are settlement evidence. UI screenshots are not conformance proof.

Docs should label:

- Local simulation.
- Testnet verification.
- Testnet settlement.
- Mainnet verification.
- Mainnet settlement.
- Failed settlement.
- Pending settlement.

## Privacy Notes

Payment APIs should not expose private keys, seed phrases, bearer tokens, or sensitive wallet metadata. Buyer identity should be public only when intentionally supported and authorized.
