# Paid MCP Tool

The paid MCP tool example demonstrates a resource that is discoverable and callable by agents through LumenBazaar MCP workflows.

Example location:

```txt
lumenbazaar-backend/apps/examples/paid-mcp-tool
```

## Purpose

This example should prove:

- MCP tool metadata can be cataloged.
- Agents can search paid tools.
- Agents can inspect deterministic tool schemas.
- Agents can call the tool with a budget cap.
- The result includes receipt and transaction evidence.

## Tool Shape

Example tool:

```txt
summarize_dataset
```

Input schema:

```json
{
  "type": "object",
  "properties": {
    "datasetUrl": {
      "type": "string"
    },
    "maxRows": {
      "type": "integer",
      "minimum": 1,
      "maximum": 1000
    }
  },
  "required": ["datasetUrl"]
}
```

Output schema:

```json
{
  "type": "object",
  "properties": {
    "summary": {
      "type": "string"
    },
    "receipt": {
      "type": "object"
    }
  },
  "required": ["summary", "receipt"]
}
```

## Payment Terms

Default testnet terms:

```txt
network: stellar:testnet
asset: USDC
amount: 0.15
scheme: exact
```

## MCP Flow

Agent flow:

1. Call `list_supported_networks`.
2. Call `search_paid_resources`.
3. Call `inspect_resource`.
4. Check budget through `inspect_budget`.
5. Call `prepare_payment`.
6. Call `call_paid_resource`.
7. Store the returned receipt.

## Expected Tool Call

```json
{
  "resourceId": "mcp_resource_id",
  "input": {
    "datasetUrl": "https://example.com/data.csv",
    "maxRows": 100
  },
  "maxAmount": "0.20"
}
```

## Acceptance Criteria

- MCP example server starts locally.
- Tool metadata is valid.
- Tool appears in discovery.
- Agent can inspect schemas.
- Budget controls prevent overspending.
- Paid testnet call succeeds.
- Tool output includes result, receipt, and transaction hash.
- Stable errors are returned for budget, schema, payment, and settlement failures.

## Evidence

Record:

- MCP tool name.
- Resource ID.
- Receipt ID.
- Transaction hash.
- Ledger.
- Network.
- Asset.
- Amount.
- MCP tool call input.
