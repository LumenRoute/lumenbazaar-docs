# Issue Template

Contributor issues should be small enough for one contributor and one pull request. They should provide enough context to implement safely without encouraging unrelated refactors.

## Required Structure

Use this structure for contributor tasks:

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

## Description

The description should explain:

- What needs to change.
- Why it matters.
- Which user or maintainer problem it solves.
- Whether the work is frontend, backend, contracts, docs, or cross-repo.

Keep this section short and specific.

## Requirements And Context

Use this section to explain required background:

- Protocol behavior.
- Related endpoint.
- Related contract function.
- Related SDK helper.
- Related docs page.
- Known constraints.
- Security-sensitive boundaries.

Do not assume contributors have read the full project plan.

## Scope

Scope should list expected files or modules.

Good examples:

```txt
apps/api/src/routes/verify.ts
packages/shared/src/errors.ts
docs/api-reference/facilitator.md
```

Avoid vague scope like:

```txt
Update backend
Improve docs
Fix payments
```

## Acceptance Criteria

Acceptance criteria should describe observable outcomes.

Examples:

- `POST /v1/verify` rejects unsupported networks with `UNSUPPORTED_NETWORK`.
- Resource search returns `partialResults` when the index is degraded.
- The docs build passes.
- Contract test rejects settlement above cap.

## Test Requirements

Tests should match risk.

Frontend:

- Component tests.
- Form validation tests.
- API client tests.
- Playwright flows where user behavior matters.

Backend:

- Unit tests.
- Integration tests.
- Migration tests.
- Worker tests.
- Conformance tests where relevant.

Contracts:

- `cargo test`.
- Authorization tests.
- Settlement tests.
- Event tests.
- TTL tests.

Docs:

- Markdown lint.
- Link check.
- Generated-reference check.
- Content quality check.
- Build.

## Relevant Files

List files contributors should inspect before changing code.

Include docs and tests when relevant. If generated artifacts must change, list them explicitly.

## Suggested Execution

Use a short ordered path. Do not over-prescribe implementation details when the contributor should use judgment.

Example:

```md
1. Read existing error handling.
2. Add the new stable error code.
3. Wire it into verification.
4. Add focused tests.
5. Update docs.
```

## Guidelines

Every issue should remind contributors:

- Keep the pull request scoped.
- Do not change unrelated files.
- Include verification output.
- Include generated artifacts when required.
- Include a closing directive.

## Closing Directive

Pull requests should include:

```txt
Closes #ISSUE_NUMBER
```

For multiple issues:

```txt
Closes #123
Closes #124
```

Use exact GitHub issue numbers once issues exist.

## Evidence

Pull request evidence should distinguish:

- Local tests.
- Mock tests.
- Testnet behavior.
- Mainnet behavior.
- CI state.
- Generated output.
- Conformance output.

Do not call unrun checks green. Do not label testnet evidence as mainnet evidence.

## Complexity

Use higher complexity for:

- Mainnet settlement.
- Payment verification.
- Replay protection.
- Contract settlement.
- Domain verification.
- Catalog poisoning defenses.
- MCP paid-call budget controls.

Use lower complexity for:

- Copy edits.
- Navigation updates.
- Non-generated explanatory docs.
- Small UI polish that does not touch payment behavior.
