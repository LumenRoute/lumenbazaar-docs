# Discovery API Reference

The discovery API lets clients browse, search, validate, and catalog paid HTTP endpoints and MCP tools. It is the API surface behind the frontend resource explorer, buyer SDK, and MCP search tools.

Base path:

```txt
/v1/discovery
```

## Resource Browse

```txt
GET /v1/discovery/resources
```

Returns paginated catalog resources.

Query parameters:

| Parameter | Description |
| --- | --- |
| `network` | Filter by `stellar:testnet` or `stellar:pubnet`. |
| `asset` | Filter by asset code, such as `USDC`. |
| `type` | Filter by resource type, such as `http` or `mcp`. |
| `sellerId` | Filter by seller. |
| `minPrice` | Filter by minimum amount. |
| `maxPrice` | Filter by maximum amount. |
| `extension` | Filter by extension such as `bazaar` or `mcp`. |
| `cursor` | Continue from a prior page. |
| `limit` | Maximum number of resources to return. |

Example response:

```json
{
  "resources": [
    {
      "id": "resource_123",
      "sellerId": "seller_123",
      "type": "http",
      "name": "Paid Weather API",
      "description": "Returns current weather for a city.",
      "url": "https://seller.example/weather/{city}",
      "routeTemplate": "/weather/{city}",
      "network": "stellar:testnet",
      "payTo": "G...",
      "assetCode": "USDC",
      "assetIssuer": "G...",
      "amount": "0.05",
      "status": "active"
    }
  ],
  "nextCursor": null,
  "partialResults": false
}
```

## Search Resources

```txt
GET /v1/discovery/search
```

Returns ranked resources for a query.

Query parameters:

| Parameter | Description |
| --- | --- |
| `q` | Search query. |
| `network` | Network filter. |
| `asset` | Asset filter. |
| `type` | Resource type filter. |
| `sellerId` | Seller filter. |
| `limit` | Result limit. |
| `cursor` | Pagination cursor. |

Ranking should consider:

- Text relevance.
- Metadata quality.
- Resource type.
- Network.
- Payment asset.
- Price.
- Seller verification.
- Historical uptime.
- Recent settlement success.
- Schema completeness.

Example response:

```json
{
  "resources": [],
  "ranking": {
    "strategy": "postgres-full-text-v1"
  },
  "partialResults": false,
  "nextCursor": null
}
```

Return `partialResults: true` when indexing or ranking is incomplete.

## Validate Metadata

```txt
POST /v1/discovery/validate
```

Validates resource metadata without cataloging it.

Example request:

```json
{
  "sellerId": "seller_123",
  "resource": {
    "type": "http",
    "name": "Paid Weather API",
    "description": "Returns current weather for a city.",
    "url": "https://seller.example/weather/Lagos",
    "routeTemplate": "/weather/{city}",
    "network": "stellar:testnet",
    "payTo": "G...",
    "assetCode": "USDC",
    "assetIssuer": "G...",
    "amount": "0.05",
    "inputSchema": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        }
      },
      "required": ["city"]
    },
    "outputSchema": {
      "type": "object"
    },
    "extensions": {
      "bazaar": true
    }
  }
}
```

Example response:

```json
{
  "ok": true,
  "warnings": [],
  "errors": []
}
```

Validation should check:

- Seller existence.
- Domain verification when trusted catalog status is required.
- URL shape.
- Route template safety.
- Network support.
- Asset support.
- Amount format.
- Recipient address.
- Schema validity.
- Extension compatibility.

## Catalog Resource

```txt
POST /v1/discovery/catalog
```

Catalogs a valid resource and queues indexing.

Example response:

```json
{
  "ok": true,
  "resourceId": "resource_123",
  "versionId": "resource_version_123",
  "catalogEventId": "catalog_event_123",
  "indexingStatus": "queued"
}
```

Cataloging should:

- Persist the resource.
- Persist versioned metadata.
- Store input and output schemas.
- Store payment requirements.
- Store catalog event history.
- Queue search indexing.

## Error Codes

Discovery endpoints should use stable codes:

```txt
RESOURCE_NOT_FOUND
CATALOG_VALIDATION_FAILED
ROUTE_TEMPLATE_INVALID
SELLER_DOMAIN_UNVERIFIED
UNSUPPORTED_NETWORK
UNSUPPORTED_ASSET
RATE_LIMITED
INTERNAL_ERROR
```

## Security Notes

The discovery index is off-chain by default. That makes it fast and searchable, but it means metadata validation and catalog poisoning controls are mandatory.

Discovery APIs should avoid indexing:

- Forged seller metadata.
- Malformed route templates.
- Unsupported assets.
- Unverified trusted seller claims.
- Invalid schemas.
- Ambiguous MCP metadata.

## Generated Reference

When backend OpenAPI output exists, this page should be generated from or checked against `generated/openapi`.
