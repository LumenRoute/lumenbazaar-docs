# Seller SDK

`@lumenbazaar/seller-sdk` helps sellers make HTTP APIs and MCP tools payable through x402 payment requirements and Bazaar metadata.

The SDK starts in `lumenbazaar-backend/packages/seller-sdk`.

## Responsibilities

The seller SDK should provide:

- Express middleware.
- Fastify middleware.
- Next.js route helper.
- MCP tool metadata helper.
- x402 payment requirement builder.
- Bazaar metadata builder.
- Route template validation.
- Schema validation.
- Cataloging response parser.

## Configuration

Common configuration fields:

```ts
type LumenBazaarSellerConfig = {
  facilitatorUrl: string;
  network: "stellar:testnet" | "stellar:pubnet";
  asset: "USDC" | string;
  amount: string;
  payTo: string;
  name: string;
  description: string;
  routeTemplate: string;
  inputSchema: Record<string, unknown>;
  outputSchema?: Record<string, unknown>;
};
```

The final type should be generated or exported from the SDK package.

## Express Middleware

```ts
import { withLumenBazaarPayment } from "@lumenbazaar/seller-sdk";

app.get(
  "/weather/:city",
  withLumenBazaarPayment({
    name: "Paid Weather API",
    description: "Returns current weather for a city.",
    network: "stellar:testnet",
    asset: "USDC",
    amount: "0.05",
    payTo: process.env.SELLER_STELLAR_ADDRESS!,
    routeTemplate: "/weather/{city}",
    inputSchema: {
      type: "object",
      properties: {
        city: { type: "string" },
      },
      required: ["city"],
    },
  }),
  async (request, reply) => {
    return { city: request.params.city, temperatureC: 28 };
  }
);
```

Expected middleware behavior:

- If no valid payment is attached, return HTTP 402 with x402 terms.
- If payment is attached, verify or delegate verification according to configuration.
- On successful settlement, attach receipt data to the response path.
- On failure, return stable error codes.

## Fastify Middleware

The Fastify helper should provide equivalent behavior while using Fastify request and reply types.

Expected shape:

```ts
import { lumenBazaarFastify } from "@lumenbazaar/seller-sdk/fastify";

fastify.get(
  "/weather/:city",
  {
    preHandler: lumenBazaarFastify({
      name: "Paid Weather API",
      network: "stellar:testnet",
      asset: "USDC",
      amount: "0.05",
      payTo: process.env.SELLER_STELLAR_ADDRESS!,
      routeTemplate: "/weather/{city}",
      inputSchema: {
        type: "object",
        properties: {
          city: { type: "string" },
        },
        required: ["city"],
      },
    }),
  },
  async (request) => {
    return { city: request.params.city };
  }
);
```

## Next.js Route Helper

The Next.js helper should support route handlers and avoid framework-specific global state.

Expected shape:

```ts
import { withLumenBazaarRoute } from "@lumenbazaar/seller-sdk/next";

export const GET = withLumenBazaarRoute(
  {
    name: "Paid Weather API",
    network: "stellar:testnet",
    asset: "USDC",
    amount: "0.05",
    payTo: process.env.SELLER_STELLAR_ADDRESS!,
    routeTemplate: "/api/weather/{city}",
    inputSchema: {
      type: "object",
      properties: {
        city: { type: "string" },
      },
      required: ["city"],
    },
  },
  async () => Response.json({ temperatureC: 28 }),
);
```

## Payment Requirement Builder

The SDK should generate x402 payment requirements that include:

- Scheme.
- Network.
- Asset.
- Amount.
- Recipient.
- Expiry.
- Resource metadata.
- Bazaar extension.
- MCP extension where applicable.

The builder should fail fast for invalid network, asset, recipient, amount, schema, or route template.

## Bazaar Metadata Builder

The metadata builder should produce resource metadata for:

- HTTP endpoints.
- MCP tools.
- Route templates.
- Input schemas.
- Output schemas.
- Seller identity.
- Domain verification hints.

The output should be valid input for `/v1/discovery/validate`.

## Route Template Validation

The SDK should expose a route-template validator so sellers can catch mistakes before deploy.

Reject:

- Empty templates.
- Path traversal.
- Unbalanced braces.
- Duplicate parameters.
- Parameters missing from input schema where applicable.
- Unsupported characters.

## Schema Validation

The SDK should validate JSON schemas for input and output. Agents depend on deterministic schemas to call tools safely.

## Cataloging Response Parser

The SDK should parse cataloging responses into stable states:

- Valid and cataloged.
- Valid but indexing pending.
- Invalid metadata.
- Unverified seller domain.
- Unsupported network.
- Unsupported asset.
- Route template invalid.

## Test Expectations

Seller SDK tests should cover:

- HTTP 402 generation.
- Express middleware.
- Fastify middleware.
- Next.js helper.
- Metadata builder.
- Route template validation.
- Schema validation.
- Cataloging response parsing.
- Stable error codes.

## Security Notes

The seller SDK should never handle buyer private keys. It should not hide settlement details from developers. Seller docs and examples should expose network, asset, amount, recipient, receipt ID, and transaction hash where available.
