# Conformance Report Template

Use this template to publish x402 facilitator conformance evidence. A report should be generated from real conformance output whenever possible.

## Report Metadata

| Field | Value |
| --- | --- |
| Report ID | TBD |
| Date | TBD |
| Environment | local, testnet, staging, or mainnet |
| Network | `stellar:testnet` or `stellar:pubnet` |
| Backend commit | TBD |
| Contracts commit | TBD |
| Docs commit | TBD |
| Facilitator URL | TBD |
| Runner version | TBD |

## Summary

| Check | Status | Evidence |
| --- | --- | --- |
| `/v1/supported` | pending | TBD |
| `/v1/verify` | pending | TBD |
| `/v1/settle` | pending | TBD |
| Exact scheme | pending | TBD |
| Stable errors | pending | TBD |
| Testnet behavior | pending | TBD |
| Mainnet behavior | gated | TBD |
| `Upto` scheme | gated | Requires contract integration. |

Status values:

```txt
pending
passed
failed
skipped
gated
not-applicable
```

## `/v1/supported`

Record:

- Request URL.
- Response status.
- Response body.
- Supported schemes.
- Supported networks.
- Supported assets.
- Extensions.

Expected result:

- Exact scheme is present when enabled.
- `stellar:testnet` is present for testnet.
- `stellar:pubnet` is present only when mainnet support is enabled.
- `Upto` is present only after contract integration.

## `/v1/verify`

Record:

- Valid payment payload result.
- Invalid payload result.
- Unsupported network result.
- Unsupported asset result.
- Expired authorization result.
- Replay result.
- Amount mismatch result.
- Asset mismatch result.
- Recipient mismatch result.

Expected stable error codes:

```txt
INVALID_PAYMENT_PAYLOAD
UNSUPPORTED_NETWORK
UNSUPPORTED_ASSET
AUTH_EXPIRED
REPLAY_DETECTED
AMOUNT_MISMATCH
ASSET_MISMATCH
RECIPIENT_MISMATCH
```

## `/v1/settle`

Record:

- Valid settlement result.
- Settlement failure result.
- Trustline failure result where reproducible.
- Transaction hash.
- Ledger.
- Receipt ID.
- Settlement ID.

Expected stable error codes:

```txt
SETTLEMENT_FAILED
TRUSTLINE_REQUIRED
REPLAY_DETECTED
AUTH_EXPIRED
INTERNAL_ERROR
```

## Exact Scheme Status

| Requirement | Status | Notes |
| --- | --- | --- |
| Valid exact payment verifies | pending | TBD |
| Wrong amount rejected | pending | TBD |
| Wrong asset rejected | pending | TBD |
| Wrong recipient rejected | pending | TBD |
| Expired authorization rejected | pending | TBD |
| Replay rejected | pending | TBD |
| Settlement receipt produced | pending | TBD |

## Upto Scheme Status

`Upto` checks should remain gated until the `upto-session` contract and backend integration are implemented.

| Requirement | Status | Notes |
| --- | --- | --- |
| Session creation | gated | Requires contract deployment. |
| Settlement up to cap | gated | Requires backend integration. |
| Over-cap rejection | gated | Requires contract tests. |
| Double-settlement rejection | gated | Requires contract tests. |
| Usage hash recorded | gated | Requires contract tests. |

## Testnet Section

Record:

- Testnet facilitator URL.
- Resource ID.
- Seller ID.
- Receipt ID.
- Transaction hash.
- Ledger.
- Asset.
- Amount.
- Run output.

## Mainnet Section

Mainnet checks should remain gated until launch.

Record only when live:

- Mainnet facilitator URL.
- Resource ID.
- Seller ID.
- Receipt ID.
- Transaction hash.
- Ledger.
- Asset.
- Amount.
- Run output.

Do not copy testnet transaction hashes into the mainnet section.

## Compatibility Notes

Document:

- x402 client version.
- Stellar tooling version.
- `@x402/stellar` version.
- Known deviations.
- Known unsupported features.
- Upstream spec links checked before publication.

## Limitations

List anything not proven by the run:

- Mainnet not tested.
- `Upto` not implemented.
- Only mock wallet used.
- Only one asset tested.
- Search or discovery outside scope.

## Approval

| Reviewer | Role | Status | Date |
| --- | --- | --- | --- |
| TBD | Backend | pending | TBD |
| TBD | Security | pending | TBD |
| TBD | Operations | pending | TBD |
