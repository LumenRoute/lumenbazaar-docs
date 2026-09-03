# Drips Contributor Plan

Drips should be used as the execution and contributor engine for LumenBazaar. Issues should be small, scoped, testable, and suitable for one contributor and one pull request.

## Issue Principles

Every issue should:

- Describe why the task matters.
- Define exact scope.
- List relevant files or modules.
- Include acceptance criteria.
- Include test requirements.
- Avoid unrelated refactors.
- Include a closing directive in the pull request description.
- Be reviewable without requiring a contributor to understand the whole project.

## Frontend Issues

```txt
FE-001 Scaffold Next.js app and CI
FE-002 Add API client and typed schemas
FE-003 Build dashboard layout
FE-004 Build resource search page
FE-005 Build resource filters
FE-006 Build resource detail page
FE-007 Build seller onboarding flow
FE-008 Build metadata builder UI
FE-009 Build route template validator UI
FE-010 Build payment playground
FE-011 Add wallet connection
FE-012 Build transaction dashboard
FE-013 Build operator health dashboard
FE-014 Build conformance status page
FE-015 Add responsive and accessibility tests
```

Frontend issue standards:

- Use typed backend schemas.
- Keep UI states explicit.
- Test mobile and desktop behavior.
- Do not imply official Stellar, SDF, or SCF endorsement.
- Show network, asset, amount, recipient, status, and transaction hash where relevant.

## Backend Issues

```txt
BE-001 Scaffold Fastify API and CI
BE-002 Add database schema and migrations
BE-003 Implement /health, /version, /networks
BE-004 Implement /supported
BE-005 Implement exact payment verification
BE-006 Implement exact payment settlement
BE-007 Add payment receipt persistence
BE-008 Add stable error code system
BE-009 Build discovery resource schema
BE-010 Implement discovery metadata validation
BE-011 Implement routeTemplate validation
BE-012 Implement /discovery/resources
BE-013 Implement /discovery/search
BE-014 Add search indexing worker
BE-015 Add seller domain verification
BE-016 Add seller SDK middleware
BE-017 Add buyer SDK call helper
BE-018 Add MCP server search tool
BE-019 Add MCP paid-call proxy
BE-020 Add conformance runner
BE-021 Add OpenAPI generation
BE-022 Add Docker Compose setup
BE-023 Add rate limiting and audit logs
BE-024 Add metrics endpoint
BE-025 Add load tests
```

Backend issue standards:

- Use `@x402/stellar` for Stellar x402 behavior.
- Return stable error codes.
- Keep exact and `upto` validation paths separate.
- Never store private keys.
- Add focused unit or integration tests.
- Avoid repo-wide formatting churn.

## Contract Issues

```txt
CT-001 Scaffold Soroban workspace and CI
CT-002 Add upto-session storage model
CT-003 Implement initialize
CT-004 Implement create_session
CT-005 Implement settle
CT-006 Implement cancel
CT-007 Implement get_session
CT-008 Implement TTL extension
CT-009 Add contract events
CT-010 Add auth tests
CT-011 Add over-cap and double-settlement tests
CT-012 Add expiry and cancellation tests
CT-013 Generate contract bindings
CT-014 Add testnet deployment script
CT-015 Add policy wallet example
```

Contract issue standards:

- Keep contract scope narrow.
- Test every authorization and settlement boundary.
- Generate ABI/spec artifacts when interfaces change.
- Document gas/resource usage.
- Keep policy wallet clearly marked as an example.

## Docs Issues

```txt
DOC-001 Scaffold docs site
DOC-002 Write introduction and project overview
DOC-003 Write architecture overview
DOC-004 Write payment flow guide
DOC-005 Write discovery flow guide
DOC-006 Write seller guide
DOC-007 Write buyer guide
DOC-008 Write agent guide
DOC-009 Write operator guide
DOC-010 Write API reference
DOC-011 Write contract reference
DOC-012 Write security threat model
DOC-013 Write Drips contributor plan
DOC-014 Write SCF RFP proposal draft
DOC-015 Publish conformance report template
```

Docs issue standards:

- Separate planned behavior from implemented behavior.
- Link to generated references where possible.
- Do not treat screenshots as conformance proof.
- Keep testnet and mainnet evidence separate.
- Run lint, link checks, and build.

## Issue Template

Use this structure:

```md
## Description

Describe the task and why it matters.

## Requirements and Context

Explain related protocol, repo, and implementation context.

## Scope

List exactly what files or modules are expected to change.

## Acceptance Criteria

- Criterion 1
- Criterion 2
- Criterion 3

## Test Requirements

- Unit tests
- Integration tests
- E2E tests if applicable

## Relevant Files

- path/to/file

## Suggested Execution

1. Step one
2. Step two
3. Step three

## Guidelines

- Keep the PR scoped to this issue.
- Do not change unrelated files.
- Include `Closes #ISSUE_NUMBER` in the PR description.
```

## Complexity Guidance

Higher-risk work should be marked accordingly in the Drips maintainer dashboard.

Higher-risk examples:

- Mainnet settlement.
- Verification logic.
- Replay protection.
- Contract settlement.
- Domain verification.
- Catalog poisoning defenses.
- MCP budget controls.

Lower-risk examples:

- Copy edits.
- Navigation updates.
- Example docs.
- Non-generated reference clarifications.

## Review Evidence

Pull requests should include:

- Local command output.
- Testnet transaction hashes where relevant.
- Generated reference diffs where relevant.
- Screenshots only as supporting UI evidence.
- Clear statement of untested live behavior.

## Funding Evidence

Drips activity can support SCF reporting when it shows:

- Issues opened.
- Issues closed by merged pull requests.
- Contributors involved.
- Tests added.
- Testnet settlements recorded.
- Conformance reports published.
- Docs updated with accurate status.
