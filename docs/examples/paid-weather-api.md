# Paid Weather API

The paid weather API is the smallest end-to-end example for sellers and buyers. It demonstrates a fixed-price HTTP endpoint that returns weather data after x402 verification and settlement.

Example location:

```txt
lumenbazaar-backend/apps/examples/paid-weather-api
```

## Purpose

This example should prove:

- Seller SDK middleware can protect an HTTP endpoint.
- The endpoint returns HTTP 402 payment requirements.
- Buyer SDK can search and call the resource.
- The facilitator can verify and settle an exact testnet payment.
- A receipt is returned with transaction evidence.

## Resource Shape

```txt
GET /weather/:city
```

Route template:

```txt
/weather/{city}
```

Input schema:

```json
{
  "type": "object",
  "properties": {
    "city": {
      "type": "string"
    }
  },
  "required": ["city"]
}
```

Example output:

```json
{
  "city": "Lagos",
  "temperatureC": 28,
  "condition": "partly_cloudy"
}
```

## Payment Terms

Default testnet terms:

```txt
network: stellar:testnet
asset: USDC
amount: 0.05
scheme: exact
```

The final example should load `payTo` and facilitator URL from environment variables.

## Seller Run

Expected flow:

```bash
npm install
npm run dev:weather
```

The actual command should be updated from the backend repo when the example exists.

## Buyer Run

Expected buyer SDK flow:

```ts
const resources = await client.search("weather api for Lagos");

const result = await client.callPaidResource({
  resourceId: resources[0].id,
  input: { city: "Lagos" },
  maxAmount: "0.10",
});
```

## Acceptance Criteria

- Example API starts locally.
- Initial request returns HTTP 402.
- Payment requirements include network, asset, amount, and recipient.
- Valid payment verifies.
- Paid retry returns weather payload.
- Settlement produces a receipt.
- Receipt includes transaction hash when settled.
- Resource appears in discovery.

## Evidence

Record:

- Resource ID.
- Receipt ID.
- Transaction hash.
- Ledger.
- Network.
- Asset.
- Amount.
- Backend commit.
