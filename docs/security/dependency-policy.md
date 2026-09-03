# Dependency Policy

LumenBazaar should remain permissively licensed and practical for self-hosted operators, SDK users, and commercial integrations. Dependency choices must support that goal.

## License Policy

Recommended project license:

```txt
Apache-2.0
```

Apache-2.0 is suitable because it is familiar for infrastructure, compatible with broad commercial and open-source use, and practical for SDKs and service operators.

## Avoided Dependency Classes

Avoid:

- AGPL dependencies in the facilitator infrastructure path.
- Strong copyleft dependencies that impose unclear network-service obligations.
- Dependencies with unclear redistribution terms.
- Packages with abandoned maintainership in security-sensitive paths.
- Packages that require storing private keys or custodying funds.
- Packages that prevent permissive redistribution.

## Dependency Review

Before adding a dependency, check:

- License.
- Maintenance status.
- Security advisory history.
- Transitive dependency risk.
- Runtime footprint.
- Whether the code path is security-sensitive.
- Whether the dependency is required or can be replaced with a standard library or existing project dependency.

## Security-Sensitive Paths

Apply stricter review to dependencies used for:

- x402 verification.
- Stellar settlement.
- Payment payload parsing.
- Schema validation.
- Route template parsing.
- Domain verification.
- Rate limiting.
- Audit logging.
- Contract bindings.
- MCP tool execution.

## Required Reports

CI should eventually produce:

- Dependency audit report.
- License report.
- Known vulnerability summary.
- Prohibited license failure if one is detected.

## Current Docs Stack Note

The docs site uses a Node.js documentation stack. npm audit output should be reviewed regularly, but dependency updates should avoid breaking the docs build or silently changing generated output.

## Publishing Policy

Docs should never imply that dependency checks are clean unless current CI or local output proves it.
