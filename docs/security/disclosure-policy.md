# Disclosure Policy

Use private disclosure for security-sensitive issues. Do not open public issues for vulnerabilities that could harm buyers, sellers, operators, or ecosystem users before maintainers have had time to investigate.

## What To Report

Report issues involving:

- Payment verification bypass.
- Settlement with wrong asset, amount, network, or recipient.
- Replay protection failure.
- Expired authorization acceptance.
- Catalog poisoning.
- Seller domain verification bypass.
- Route template validation bypass.
- MCP tool budget bypass.
- Contract over-cap settlement.
- Contract double settlement.
- Contract cancellation or expiry bypass.
- Sensitive data in logs.
- Private key or credential exposure.
- Dependency vulnerability in a security-sensitive path.

## Report Content

Include:

- Affected repository.
- Affected version or commit.
- Affected environment.
- Reproduction steps.
- Expected behavior.
- Actual behavior.
- Impact.
- Any relevant transaction hashes.
- Logs with secrets removed.
- Suggested fix if known.

## What Not To Include

Do not include:

- Private keys.
- Seed phrases.
- Bearer tokens.
- Production credentials.
- Full unredacted user payment payloads unless explicitly requested through a secure channel.

## Response Process

Maintainers should:

1. Acknowledge receipt.
2. Triage severity.
3. Reproduce the issue.
4. Prepare a fix or mitigation.
5. Add regression tests.
6. Publish advisory or release notes when appropriate.
7. Update docs if behavior or operator guidance changes.

## Severity Guidance

Critical:

- Funds can move to the wrong recipient.
- Payment can be replayed.
- Contract cap can be bypassed.
- Private keys or live credentials are exposed.

High:

- Catalog trust can be forged.
- MCP budget controls can be bypassed.
- Mainnet settlement state can be misreported.

Medium:

- Stable errors are missing for security-sensitive failures.
- Route validation allows ambiguous but not directly exploitable paths.
- Monitoring misses important degraded states.

Low:

- Documentation ambiguity.
- Non-sensitive metadata leak.
- Hardening recommendation without confirmed exploit.

## Public Communication

Public communication should be factual:

- Separate affected and unaffected components.
- Separate testnet and mainnet impact.
- Include fixed version or commit.
- Include mitigation steps.
- Avoid overstating conformance or security review status.
