# Agent Guide

This guide explains how AI agents use the LumenBazaar MCP server to discover, inspect, and call paid resources.

Agents should treat payments as bounded operations. A tool call should never authorize payment unless the resource, price, asset, seller, and budget are acceptable.

## MCP Server Role

The MCP server lives in `lumenbazaar-backend/apps/mcp-server`. It exposes a machine-readable interface over the same discovery, payment, and receipt capabilities used by buyer applications.

The MCP server should:

- Search paid resources.
- Inspect resource schemas and payment terms.
- Prepare payment payloads.
- Call paid resources.
- Fetch receipts.
- Inspect budgets.
- List supported networks.
- Return deterministic tool inputs, outputs, and errors.

## Required Tools

LumenBazaar MCP should expose:

```txt
search_paid_resources
inspect_resource
prepare_payment
call_paid_resource
get_payment_receipt
inspect_budget
list_supported_networks
```

## Search Tool

`search_paid_resources` lets an agent discover resources by task.

Input:

```json
{
  "query": "weather api for Lagos",
  "network": "stellar:testnet",
  "asset": "USDC",
  "limit": 10
}
```

Output:

```json
{
  "resources": [],
  "partialResults": false,
  "nextCursor": null
}
```

The agent should treat `partialResults: true` as a warning that search may be incomplete.

## Inspect Tool

`inspect_resource` returns the selected resource, payment requirements, input schema, and output schema.

Input:

```json
{
  "resourceId": "resource_123"
}
```

Output:

```json
{
  "resource": {},
  "paymentRequirements": {},
  "inputSchema": {},
  "outputSchema": {}
}
```

Agents should inspect before calling. Do not infer payment terms from search snippets.

## Prepare Payment

`prepare_payment` should build or request the payload needed for the selected payment requirements. It should not exceed the caller's configured budget.

The tool should validate:

- Resource ID.
- Network.
- Asset.
- Amount.
- Recipient.
- Expiry.
- Budget.
- Seller trust state.

## Paid Call Tool

`call_paid_resource` performs the full paid call flow where supported.

Input:

```json
{
  "resourceId": "resource_123",
  "input": {
    "city": "Lagos"
  },
  "maxAmount": "0.10"
}
```

Output:

```json
{
  "result": {},
  "receipt": {},
  "transactionHash": "string"
}
```

The tool should stop before authorization if `maxAmount` is lower than the resource price.

## Receipt Tool

`get_payment_receipt` fetches settlement evidence for a prior paid call.

Receipts should include:

- Receipt ID.
- Payment attempt ID.
- Resource ID.
- Seller ID.
- Network.
- Asset.
- Amount.
- Settlement status.
- Transaction hash.
- Ledger.
- Failure code when failed.

## Budget Tool

`inspect_budget` lets an agent runtime inspect configured spending limits before attempting paid calls.

Useful budget fields:

- Per-call cap.
- Per-session cap.
- Daily cap.
- Remaining budget.
- Allowed sellers.
- Allowed assets.
- Allowed networks.
- Allowed resource IDs or hashes.

## Network Tool

`list_supported_networks` should return configured network and asset support. Agents should call it before assuming mainnet or asset availability.

Initial support should include:

- `stellar:testnet`
- `stellar:pubnet`

Mainnet behavior should remain gated by operational readiness and explicit configuration.

## Deterministic Errors

Agents need stable error codes because free-form messages are hard to reason about safely.

MCP errors should map to backend error codes, including:

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
- `CATALOG_VALIDATION_FAILED`
- `SELLER_DOMAIN_UNVERIFIED`
- `RATE_LIMITED`
- `INTERNAL_ERROR`

## Agent Safety Rules

Agent integrations should follow these rules:

- Search first.
- Inspect before payment.
- Enforce local budgets before authorization.
- Prefer verified seller domains.
- Avoid resources with incomplete schemas when deterministic output is required.
- Stop on recipient, asset, amount, or network mismatch.
- Store receipts and transaction hashes.
- Treat testnet and mainnet evidence separately.

## Local Development

The backend repo should provide MCP server startup instructions and fixtures. Until live resources exist, agent examples should use deterministic testkit fixtures and testnet resources.

See also:

- [MCP API Reference](/api-reference/mcp)
- [Buyer Guide](/guides/buyer-guide)
- [Discovery Flow](/architecture/discovery-flow)
- [Payment Flow](/architecture/payment-flow)
