# Dependency Policy

LumenBazaar should remain permissively licensed and practical for self-hosted operators, SDK users, and commercial integrations. Dependency choices must support that goal.

## License Policy

Each repository's root `LICENSE` is authoritative. The frontend, backend, and contracts repositories
currently use MIT; the docs repository uses Apache-2.0. The contracts crate metadata also permits
`MIT OR Apache-2.0`, but that metadata does not override the repository's root license notice.

This documentation does not impose one license across all four repositories and must not describe
the whole project as Apache-2.0. A future license change requires maintainer and contributor review;
it is not a dependency-maintenance operation.

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

CI produces:

- A high-severity production dependency audit before build and deployment.

Dependency-maintenance reviews must also record the full build-tool audit, license changes, known
vulnerabilities, and any prohibited license before the lockfile is merged. Automated license policy
enforcement remains planned and must not be described as an active CI control.

## Static Deployment Boundary

The published site is the static `build/` directory. GitHub Pages and Vercel serve those files; they
do not run `docusaurus start`, `docusaurus serve`, webpack-dev-server, or a Node.js proxy in
production. All Docusaurus, React, Mermaid, markdown, compiler, preview-server, worker-pool, globbing,
proxy, and serialization packages are therefore declared as development dependencies.

`npm run audit:prod` is the deployed-runtime gate and must report no unreviewed high or critical
finding. A full `npm audit` is still reviewed during dependency maintenance because malicious or
untrusted documentation input could reach the build toolchain in CI. Build-time findings do not
become production-server findings, but they are not ignored: keep the compatible Docusaurus packages
on one version, regenerate the lockfile, build only reviewed repository content, and update the stack
when upstream patches exist.

The Mermaid ELK layout package remains pinned at `0.1.9` because Docusaurus `3.10.2` loads it as an
optional peer during the production build. The newer ELK package is not part of the theme's declared
compatible range, so it must not be upgraded independently. Do not add a development proxy or deploy
a preview server to work around broken links or cross-origin failures.

## Current Audit Record

Audit date: 2026-10-07.

| Scope | Low | Moderate | High | Critical | Disposition |
| --- | ---: | ---: | ---: | ---: | --- |
| Published static runtime (`npm audit --omit=dev`) | 0 | 0 | 0 | 0 | CI release gate passes. |
| Local and CI build toolchain (`npm audit`) | 6 | 22 | 27 | 18 | Build-time only; upstream-compatible patches are not currently available for the complete Docusaurus chain. |

The full audit findings are concentrated in the Docusaurus compiler, Mermaid renderer, local preview
server, proxy, serialization, globbing, image parsing, and worker-pool trees. The audit's suggested
Docusaurus `3.7.0` change is a downgrade and is not accepted. Maintainers must rerun both audits when
changing the lockfile and replace this record when a compatible patched release is available.

## Publishing Policy

Docs should never imply that dependency checks are clean unless current CI or local output proves it.
