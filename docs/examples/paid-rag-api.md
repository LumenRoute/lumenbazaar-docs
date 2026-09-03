# Paid RAG API

The paid RAG API example demonstrates a higher-value paid HTTP endpoint that performs retrieval-augmented generation or document lookup behind x402 payment requirements.

Example location:

```txt
lumenbazaar-backend/apps/examples/paid-rag-api
```

## Purpose

This example should prove:

- Structured input and output schemas work for a paid resource.
- Search metadata can describe data and model endpoints.
- A buyer can inspect schema before payment.
- Receipts can be attached to generated or retrieved results.
- Stable errors are useful when resource input is invalid.

## Resource Shape

```txt
POST /rag/query
```

Route template:

```txt
/rag/query
```

Input schema:

```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string"
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 10
    }
  },
  "required": ["query"]
}
```

Output schema:

```json
{
  "type": "object",
  "properties": {
    "answer": {
      "type": "string"
    },
    "sources": {
      "type": "array"
    }
  },
  "required": ["answer", "sources"]
}
```

## Payment Terms

Default testnet terms:

```txt
network: stellar:testnet
asset: USDC
amount: 0.10
scheme: exact
```

Later versions may demonstrate `upto` sessions for token-billed or result-count-billed usage.

## Seller Run

Expected flow:

```bash
npm install
npm run dev:rag
```

The actual command should be updated from the backend repo when implemented.

## Buyer Run

```ts
const result = await client.callPaidResource({
  resourceId: "rag_resource_id",
  input: {
    query: "Summarize the latest indexed settlement receipts",
    limit: 3,
  },
  maxAmount: "0.25",
});
```

## Acceptance Criteria

- Example starts locally.
- Resource metadata includes input and output schemas.
- Discovery search can find the resource.
- Buyer can inspect schema before payment.
- Exact testnet payment succeeds.
- Result includes answer, sources, and receipt.
- Invalid input fails with stable validation errors.

## Evidence

Record:

- Resource ID.
- Query input.
- Receipt ID.
- Transaction hash.
- Ledger.
- Network.
- Asset.
- Amount.
