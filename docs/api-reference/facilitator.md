# Facilitator API Reference

The facilitator API verifies and settles x402 payment payloads for Stellar. This page describes the intended public contract until generated OpenAPI output is available from the backend.

Base path:

```txt
/v1
```

## Supported Networks And Schemes

```txt
GET /v1/supported
```

Returns the payment schemes, networks, and assets supported by the facilitator.

Example response:

```json
{
  "schemes": [
    {
      "name": "exact",
      "network": "stellar:testnet",
      "assets": [
        {
          "code": "USDC",
          "issuer": "G..."
        }
      ]
    }
  ],
  "extensions": {
    "bazaar": true,
    "upto": false
  }
}
```

Initial support should include:

- `stellar:testnet`
- `stellar:pubnet`
- Exact scheme
- Configured SEP-41 assets
- USDC as the default production stablecoin where configured

`Upto` support should be disabled until the contracts and backend integration are complete.

## Verify Payment

```txt
POST /v1/verify
```

Verifies that a submitted payment payload satisfies the payment requirements.

The facilitator must validate:

- Payment payload shape.
- Supported network.
- Supported asset.
- Exact amount.
- Exact recipient.
- Authorization validity.
- Ledger expiry.
- Replay state.

Example request:

```json
{
  "paymentPayload": {
    "scheme": "exact",
    "network": "stellar:testnet",
    "asset": {
      "code": "USDC",
      "issuer": "G..."
    },
    "amount": "0.05",
    "payTo": "G...",
    "expiresAtLedger": 123456,
    "authorization": {}
  },
  "paymentRequirements": {
    "scheme": "exact",
    "network": "stellar:testnet",
    "amount": "0.05",
    "payTo": "G..."
  }
}
```

Example success response:

```json
{
  "ok": true,
  "paymentAttemptId": "pay_123",
  "paymentHash": "hash_123",
  "network": "stellar:testnet",
  "status": "verified"
}
```

Example failure response:

```json
{
  "ok": false,
  "error": {
    "code": "RECIPIENT_MISMATCH",
    "message": "Payment recipient does not match the required payTo address."
  }
}
```

## Settle Payment

```txt
POST /v1/settle
```

Settles a verified payment payload and records settlement evidence.

The facilitator should:

- Revalidate payment payload state.
- Reject replayed or expired payloads.
- Submit settlement transaction through Stellar tooling.
- Persist settlement state.
- Create or update a receipt.
- Return transaction hash when settlement succeeds.
- Return stable failure codes when settlement fails.

Example request:

```json
{
  "paymentAttemptId": "pay_123",
  "paymentPayload": {
    "scheme": "exact",
    "network": "stellar:testnet",
    "asset": {
      "code": "USDC",
      "issuer": "G..."
    },
    "amount": "0.05",
    "payTo": "G...",
    "authorization": {}
  },
  "resourceId": "resource_123"
}
```

Example success response:

```json
{
  "ok": true,
  "settlementId": "set_123",
  "receiptId": "receipt_123",
  "transactionHash": "tx_hash",
  "ledger": 123460,
  "network": "stellar:testnet",
  "status": "settled"
}
```

Example failure response:

```json
{
  "ok": false,
  "error": {
    "code": "SETTLEMENT_FAILED",
    "message": "The Stellar settlement transaction could not be submitted."
  }
}
```

## Receipt Fields

Settlement receipts should include:

- `id`
- `paymentAttemptId`
- `resourceId`
- `sellerId`
- `transactionHash`
- `ledger`
- `network`
- `amount`
- `assetCode`
- `assetIssuer`
- `status`
- `settledAt`
- `failureCode`
- `failureReason`

## Error Codes

Facilitator endpoints should use stable codes:

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
RATE_LIMITED
INTERNAL_ERROR
```

## OpenAPI Source

When the backend publishes generated OpenAPI output, this page should be generated or checked against that output. Until then, this page is the intended contract based on the project plan.
