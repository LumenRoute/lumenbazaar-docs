# MCP API Reference

The LumenBazaar MCP server exposes paid resource discovery and paid-call workflows to AI agent runtimes.

Application path:

```txt
lumenbazaar-backend/apps/mcp-server
```

## Tool List

```txt
search_paid_resources
inspect_resource
prepare_payment
call_paid_resource
get_payment_receipt
inspect_budget
list_supported_networks
```

## `search_paid_resources`

Searches the Bazaar discovery index.

Input:

```json
{
  "query": "string",
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

Notes:

- `network` should be explicit when the agent has a network policy.
- `asset` should be explicit when the agent has an asset policy.
- `partialResults` warns that indexing or ranking may be incomplete.

## `inspect_resource`

Returns full resource details before payment authorization.

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

Agents should inspect resources before calling them. Search results are not enough to safely authorize payment.

## `prepare_payment`

Prepares a payment payload or authorization request for the selected resource.

Input:

```json
{
  "resourceId": "resource_123",
  "maxAmount": "0.10",
  "network": "stellar:testnet",
  "asset": "USDC"
}
```

Output:

```json
{
  "paymentRequirements": {},
  "paymentPayload": {},
  "expiresAtLedger": 123456,
  "budgetAccepted": true
}
```

The tool must reject payment preparation when resource price, network, asset, seller, or expiry violates policy.

## `call_paid_resource`

Runs the paid call workflow when the runtime has payment authorization support.

Input:

```json
{
  "resourceId": "resource_123",
  "input": {},
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

Expected flow:

1. Inspect resource.
2. Enforce budget.
3. Prepare payment.
4. Verify payment.
5. Retry paid request.
6. Settle payment.
7. Return result and receipt.

## `get_payment_receipt`

Fetches receipt evidence.

Input:

```json
{
  "receiptId": "receipt_123"
}
```

Output:

```json
{
  "receipt": {
    "id": "receipt_123",
    "status": "settled",
    "network": "stellar:testnet",
    "amount": "0.05",
    "assetCode": "USDC",
    "transactionHash": "tx_hash"
  }
}
```

## `inspect_budget`

Returns the agent runtime's current budget policy and remaining budget.

Input:

```json
{}
```

Output:

```json
{
  "budget": {
    "perCallMaxAmount": "0.10",
    "dailyMaxAmount": "5.00",
    "remainingToday": "4.75",
    "allowedNetworks": ["stellar:testnet"],
    "allowedAssets": ["USDC"]
  }
}
```

Budget inspection should happen before paid calls in autonomous workflows.

## `list_supported_networks`

Returns facilitator network and asset support.

Input:

```json
{}
```

Output:

```json
{
  "networks": [
    {
      "id": "stellar:testnet",
      "assets": ["USDC"],
      "schemes": ["exact"]
    }
  ]
}
```

## Error Shape

MCP errors should be deterministic.

Example:

```json
{
  "error": {
    "code": "AMOUNT_MISMATCH",
    "message": "Resource price exceeds the provided maxAmount.",
    "retryable": false
  }
}
```

Recommended fields:

- `code`
- `message`
- `retryable`
- `details`

## Error Codes

MCP tools should map backend failures to stable codes:

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

## Safety Requirements

The MCP server should:

- Start locally.
- Search resources.
- Inspect schemas.
- Call a paid testnet resource.
- Return stable error codes.
- Enforce budget limits.
- Avoid private key storage.
- Keep testnet and mainnet behavior explicit.

## Generated Reference

When MCP tool schemas are generated from backend source, this page should be generated from or checked against those schemas.
