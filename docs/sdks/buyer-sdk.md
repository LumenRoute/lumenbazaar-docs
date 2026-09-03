# Buyer SDK

`@lumenbazaar/buyer-sdk` helps buyers and agent runtimes discover paid resources, inspect payment terms, prepare payment payloads, verify, retry, settle, fetch receipts, and enforce local budgets.

The SDK starts in `lumenbazaar-backend/packages/buyer-sdk`.

## Responsibilities

The buyer SDK should provide:

- Resource search.
- Resource inspection.
- Payment terms inspection.
- Payment payload preparation.
- Verification submission.
- Paid request retry.
- Settlement handling.
- Receipt fetching.
- Local budget enforcement.
- Stable error mapping.

## Client Setup

```ts
import { LumenBazaarClient } from "@lumenbazaar/buyer-sdk";

const client = new LumenBazaarClient({
  facilitatorUrl: "https://api.lumenbazaar.dev",
  network: "stellar:testnet",
});
```

Recommended configuration:

```ts
type LumenBazaarClientConfig = {
  facilitatorUrl: string;
  network: "stellar:testnet" | "stellar:pubnet";
  defaultAsset?: string;
  budget?: {
    perCallMaxAmount?: string;
    dailyMaxAmount?: string;
    allowedSellers?: string[];
    allowedAssets?: string[];
    allowedNetworks?: string[];
  };
};
```

The final type should come from the SDK package.

## Search

```ts
const resources = await client.search("weather api for Lagos");
```

Search should call discovery APIs and return:

- Resources.
- `partialResults`.
- Cursor.
- Ranking metadata where available.

Buyers should not authorize payment from search output alone. Use search to select candidates, then inspect.

## Inspect Resource

```ts
const resource = await client.inspectResource("resource_123");
```

Inspection should return:

- Resource metadata.
- Seller verification state.
- Payment requirements.
- Input schema.
- Output schema.
- MCP metadata when applicable.

## Prepare Payment

```ts
const prepared = await client.preparePayment({
  resourceId: "resource_123",
  maxAmount: "0.10",
});
```

Preparation should:

- Load current payment requirements.
- Check local budget.
- Check network.
- Check asset.
- Check seller policy.
- Create or request payment payload authorization.

The SDK should never require users to pass private keys into docs examples.

## Verify

```ts
const verification = await client.verifyPayment({
  paymentPayload: prepared.paymentPayload,
  paymentRequirements: prepared.paymentRequirements,
});
```

Verification should call:

```txt
POST /v1/verify
```

The SDK should expose stable failure codes rather than only throwing generic errors.

## Call Paid Resource

```ts
const result = await client.callPaidResource({
  resourceId: "resource_123",
  input: { city: "Lagos" },
  maxAmount: "0.10",
});
```

Expected internal flow:

1. Inspect resource.
2. Check budget.
3. Prepare payment.
4. Verify payment.
5. Retry original request.
6. Settle payment.
7. Return result and receipt.

## Settle

Settlement should call:

```txt
POST /v1/settle
```

Depending on seller flow, settlement may be coordinated by the seller resource, the facilitator, or a helper in the buyer SDK. The docs should describe the concrete implementation once backend behavior is finalized.

The SDK should expose:

- Settlement ID.
- Receipt ID.
- Transaction hash.
- Ledger.
- Network.
- Asset.
- Amount.
- Status.

## Fetch Receipt

```ts
const receipt = await client.getReceipt("receipt_123");
```

Receipt fields should include:

- Receipt ID.
- Payment attempt ID.
- Settlement ID.
- Resource ID.
- Seller ID.
- Network.
- Asset.
- Amount.
- Status.
- Transaction hash.
- Ledger.
- Failure code when failed.

## Budget Enforcement

The SDK must enforce budget before authorization.

Recommended policies:

- `maxAmount` per call.
- Daily maximum amount.
- Allowed networks.
- Allowed assets.
- Allowed sellers.
- Allowed resource IDs or hashes.
- Stop after repeated failures.

Budget failure should not fall through into payment preparation.

## Error Mapping

The SDK should map backend and payment errors to stable client errors.

Important codes:

```txt
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
RATE_LIMITED
INTERNAL_ERROR
```

## Test Expectations

Buyer SDK tests should cover:

- Search resources.
- Inspect resource.
- Prepare payment.
- Budget rejection.
- Verification success and failure.
- Paid retry.
- Settlement success and failure.
- Receipt fetching.
- Stable error mapping.

## Agent Compatibility

The MCP server should be able to reuse buyer SDK behavior for paid-call flows. Any SDK result shape used by agents must remain deterministic.
