# Security Policy

LumenBazaar is non-custodial infrastructure. The project must never store private keys or act as the source of buyer funds.

## Reporting

Report security issues privately to the maintainers before opening public issues. Include affected component, reproduction steps, expected impact, and any relevant logs with secrets removed.

## Scope

Security reports may cover:

- x402 verification or settlement errors.
- Replay protection failures.
- Wrong asset, network, recipient, or amount handling.
- Discovery catalog poisoning.
- Route template validation bypasses.
- Contract cap, expiry, cancellation, or double-settlement failures.
- Sensitive data exposure in logs or docs.

## Public Documentation

Security-sensitive docs should separate confirmed behavior from planned behavior and should not publish private keys, seed phrases, bearer tokens, or live credentials.
