# Seller Guide

This guide explains how a seller publishes a paid HTTP API or MCP tool through LumenBazaar.

A seller is the owner of an API, model endpoint, data service, or MCP tool that wants to charge per call using x402 payment requirements and Stellar settlement.

## Seller Prerequisites

Before publishing a resource, prepare:

- A Stellar testnet wallet for development.
- A seller recipient address for payment settlement.
- A domain you control.
- A public HTTPS endpoint or local example endpoint.
- Input and output schemas for the resource.
- A price, asset, and network.
- Access to the LumenBazaar facilitator URL.

LumenBazaar must never ask for private keys. Seller examples should use public addresses and wallet-based authorization where applicable.

## Onboarding Flow

Seller onboarding should follow this sequence:

1. Connect or register seller identity.
2. Verify seller domain.
3. Create resource metadata.
4. Define accepted network, asset, amount, and `payTo` address.
5. Generate SDK middleware snippet.
6. Validate Bazaar metadata.
7. Run a testnet payment.
8. Publish the resource to discovery.

## Domain Verification

Domain verification protects buyers and agents from forged seller metadata.

The backend should issue a challenge through:

```txt
POST /v1/sellers/:sellerId/verify-domain
```

The seller completes the challenge using a supported method such as:

- DNS TXT record.
- Well-known HTTPS file.

After verification, the seller record should include `domainVerifiedAt`. Trusted catalog entries should require verified seller domains unless the resource is explicitly marked as unverified.

## Resource Metadata

A resource should define:

- `name`
- `description`
- `type`
- `url`
- `routeTemplate`
- `network`
- `payTo`
- `assetCode`
- `assetIssuer`
- `amount`
- `inputSchema`
- `outputSchema`
- `extensions`

Example route template:

```txt
/weather/{city}
```

Route templates must be validated before publication. Invalid templates should return `ROUTE_TEMPLATE_INVALID`.

## Seller SDK Middleware

The seller SDK should make a paid endpoint easy to add to existing applications.

Example:

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

The SDK should support Express, Fastify, and Next.js route helpers. It should generate x402 payment requirements and attach Bazaar metadata where configured.

## Metadata Validation

Before publishing, validate the metadata:

```txt
POST /v1/discovery/validate
```

Validation should check:

- Required fields.
- Domain verification state.
- URL and route template.
- Supported network.
- Supported asset.
- Amount format.
- Recipient address.
- Input schema.
- Output schema.
- MCP metadata when the resource is an MCP tool.

Validation should be non-mutating. It tells the seller what to fix before cataloging.

## Cataloging

After validation succeeds, publish through:

```txt
POST /v1/discovery/catalog
```

Cataloging should:

- Store the resource.
- Store a resource version.
- Store schemas and payment requirements.
- Write a catalog event.
- Queue indexing.
- Return the catalog outcome.

Published resources appear through discovery endpoints and the frontend explorer after indexing completes.

## Testnet Payment Check

Before a seller treats a resource as ready, run a testnet payment:

1. Call the protected resource.
2. Confirm it returns HTTP 402 with payment requirements.
3. Authorize payment from a testnet buyer wallet or fixture.
4. Verify through `/v1/verify`.
5. Retry the resource request.
6. Settle through `/v1/settle`.
7. Confirm the receipt includes transaction evidence.

Testnet evidence should include receipt ID, status, transaction hash when settled, ledger when confirmed, asset, amount, network, seller, and resource.

## Seller Payment Review

Sellers should be able to inspect:

- Payment attempts.
- Verification status.
- Settlement status.
- Transaction hash.
- Ledger number.
- Asset.
- Amount.
- Buyer when public or authorized.
- Failure reason.

Failures should use stable error codes so sellers can distinguish buyer mistakes, trustline problems, replay attempts, asset mismatches, recipient mismatches, expired authorizations, and infrastructure failures.

## Production Readiness

Do not move a seller resource to mainnet until:

- Testnet flow succeeds.
- Domain verification is complete.
- Asset and trustline requirements are documented.
- Monitoring is available.
- Receipts are queryable.
- Rate limits and audit logs are enabled.
- Security-sensitive logs exclude private data.
