# Resources API Reference

The resources API manages seller-owned paid resources. It is used by the frontend seller dashboard, discovery service, seller SDK, and admin workflows.

Base path:

```txt
/v1
```

## Resource Object

```json
{
  "id": "resource_123",
  "sellerId": "seller_123",
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
  "inputSchema": {},
  "outputSchema": {},
  "extensions": {},
  "status": "active",
  "createdAt": "2026-09-03T00:00:00.000Z",
  "updatedAt": "2026-09-03T00:00:00.000Z"
}
```

## List Resources

```txt
GET /v1/resources
```

Query parameters:

| Parameter | Description |
| --- | --- |
| `sellerId` | Filter by seller. |
| `status` | Filter by resource status. |
| `network` | Filter by Stellar network. |
| `asset` | Filter by asset code. |
| `type` | Filter by resource type. |
| `cursor` | Pagination cursor. |
| `limit` | Page size. |

## Create Resource

```txt
POST /v1/resources
```

Creates a seller-owned resource. The backend should validate ownership, schema, route template, payment terms, and seller verification requirements.

Required fields:

- `sellerId`
- `type`
- `name`
- `description`
- `url`
- `routeTemplate`
- `network`
- `payTo`
- `assetCode`
- `assetIssuer`
- `amount`
- `inputSchema`
- `outputSchema`

## Get Resource

```txt
GET /v1/resources/:id
```

Returns a single resource, including current payment requirements, schemas, extensions, seller trust state, and public settlement metadata where available.

## Update Resource

```txt
PATCH /v1/resources/:id
```

Updates a resource and creates a new resource version when metadata, price, schema, route, or payment terms change.

Resource updates should preserve history so previous receipts remain explainable.

## Delete Resource

```txt
DELETE /v1/resources/:id
```

Deletes or disables a resource depending on implementation policy. Prefer soft deletion for resources with historical payment attempts or receipts.

## Seller Object

```json
{
  "id": "seller_123",
  "displayName": "Example Seller",
  "walletAddress": "G...",
  "domain": "seller.example",
  "domainVerifiedAt": "2026-09-03T00:00:00.000Z",
  "createdAt": "2026-09-03T00:00:00.000Z",
  "updatedAt": "2026-09-03T00:00:00.000Z"
}
```

## Create Seller

```txt
POST /v1/sellers
```

Creates a seller identity.

Required fields:

- `displayName`
- `walletAddress`
- `domain`

## Get Seller

```txt
GET /v1/sellers/:sellerId
```

Returns seller profile and verification state.

## Verify Seller Domain

```txt
POST /v1/sellers/:sellerId/verify-domain
```

Creates or checks a domain verification challenge. Supported challenge methods should be documented by the backend response.

## Seller Resources

```txt
GET /v1/sellers/:sellerId/resources
```

Returns resources owned by a seller.

## Seller Payments

```txt
GET /v1/sellers/:sellerId/payments
```

Returns payment attempts and settlements for a seller.

## Error Codes

Resource and seller endpoints should use:

```txt
RESOURCE_NOT_FOUND
SELLER_DOMAIN_UNVERIFIED
CATALOG_VALIDATION_FAILED
ROUTE_TEMPLATE_INVALID
UNSUPPORTED_NETWORK
UNSUPPORTED_ASSET
RATE_LIMITED
INTERNAL_ERROR
```

## Versioning Notes

The backend should store versioned resource metadata. When price, asset, route, schemas, seller domain, or payment requirements change, old receipts should still point to the terms that were active at the time of settlement.
