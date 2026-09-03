# Source Links

This page tracks external references used by LumenBazaar docs. External protocol, package, and funding references can change, so verify them before publishing reference-heavy updates.

## Verification Rule

Before release:

1. Open every changed external reference.
2. Confirm the URL still resolves.
3. Confirm the referenced behavior still matches the docs.
4. Update compatibility notes if behavior changed.
5. Mark any unverified references as stale or pending.

## Stellar Funding References

| Reference | URL | Drift Risk | Used For |
| --- | --- | --- | --- |
| Stellar Community Fund Build Award | [SCF Build Award](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award) | Medium | Funding context and proposal framing. |
| SCF RFP Track | [SCF RFP Track](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/rfp-track) | High | RFP alignment and proposal positioning. |

Funding references are time-sensitive. Verify track names, eligibility, award rules, and proposal expectations before submission.

## Stellar Protocol References

| Reference | URL | Drift Risk | Used For |
| --- | --- | --- | --- |
| Stellar x402 docs | [Stellar x402](https://developers.stellar.org/docs/build/agentic-payments/x402) | High | x402 overview and Stellar-specific behavior. |
| Built on Stellar x402 facilitator | [Built on Stellar x402 facilitator](https://developers.stellar.org/docs/build/agentic-payments/x402/built-on-stellar) | High | Facilitator expectations and implementation guidance. |
| Stellar smart wallets | [Stellar smart wallets](https://developers.stellar.org/docs/build/guides/contract-accounts/smart-wallets) | Medium | Smart account and policy wallet context. |

Protocol references are drift-prone. Verify before publishing facilitator, smart wallet, or mainnet guidance.

## x402 References

| Reference | URL | Drift Risk | Used For |
| --- | --- | --- | --- |
| x402 Foundation repository | [x402 repository](https://github.com/x402-foundation/x402) | High | Upstream x402 protocol context. |
| x402 Bazaar extension | [Bazaar extension](https://github.com/x402-foundation/x402/blob/main/specs/extensions/bazaar.md) | High | Discovery metadata behavior. |
| x402 Stellar exact scheme | [Stellar exact scheme](https://github.com/x402-foundation/x402/blob/main/specs/schemes/exact/scheme_exact_stellar.md) | High | Exact payment reference. |
| x402 upto scheme | [Upto scheme](https://github.com/x402-foundation/x402/blob/main/specs/schemes/upto/scheme_upto.md) | High | Capped metered payment reference. |

Upstream x402 specs can evolve. Generated conformance and compatibility notes should identify the upstream version or commit used for validation.

## Tooling References

| Reference | URL | Drift Risk | Used For |
| --- | --- | --- | --- |
| Stellar x402 tooling repository | [stellar/x402-stellar](https://github.com/stellar/x402-stellar) | High | Stellar x402 implementation guidance. |
| `@x402/stellar` package | [`@x402/stellar` on npm](https://www.npmjs.com/package/@x402/stellar) | High | Backend payment integration. |

Tooling references are version-sensitive. Record package versions in conformance reports.

## Drips Reference

| Reference | URL | Drift Risk | Used For |
| --- | --- | --- | --- |
| Drips Wave docs | [Drips Wave](https://docs.drips.network/wave/) | Medium | Contributor workflow and funding evidence context. |

Verify Drips workflow details before opening large issue batches or preparing contributor reports.

## Internal References

LumenBazaar repositories:

- [lumenbazaar-frontend](https://github.com/LumenRoute/lumenbazaar-frontend)
- [lumenbazaar-backend](https://github.com/LumenRoute/lumenbazaar-backend)
- [lumenbazaar-contracts](https://github.com/LumenRoute/lumenbazaar-contracts)
- [lumenbazaar-docs](https://github.com/LumenRoute/lumenbazaar-docs)

## Publication Checklist

Before publishing docs that depend on these sources:

- External links resolve.
- Referenced docs still describe the behavior claimed.
- Package versions are recorded.
- x402 spec paths are current.
- Stellar network names and asset guidance are current.
- SCF track requirements are current.
- Drips workflow guidance is current.
- Unverified claims are marked as pending.

## Reference Status Labels

Use:

```txt
current
verified
pending-verification
stale
replaced
removed
```

## Change Log Template

When a source changes, record:

| Date | Source | Old Status | New Status | Docs Updated |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |
