# Repository Standards

Every LumenBazaar repository should follow the same baseline standards so contributors can move between repos without learning a new process each time.

## Required Repositories

The first build uses four repositories:

- `lumenbazaar-frontend`
- `lumenbazaar-backend`
- `lumenbazaar-contracts`
- `lumenbazaar-docs`

Optional future repositories:

- `lumenbazaar-sdk`
- `lumenbazaar-examples`
- `lumenbazaar-infra`

SDKs and examples should stay in the backend repo until there is a clear reason to split them.

## Required Files

Every repository should include:

```txt
README.md
LICENSE
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md
.github/PULL_REQUEST_TEMPLATE.md
.github/ISSUE_TEMPLATE/contributor_task.yml
.github/workflows/ci.yml
.editorconfig
.gitignore
```

## README Requirements

Every README should include:

- What the repo does.
- How it connects to other LumenBazaar repos.
- Setup commands.
- Test commands.
- Environment variables.
- Contribution guide.
- License.
- Links to docs.

## License

Use Apache-2.0 unless maintainers explicitly decide otherwise.

Avoid dependencies that create license conflicts with permissive infrastructure use.

## CI Requirements

Every repo should run checks on pull requests.

Frontend CI should include:

- Install.
- Lint.
- Typecheck.
- Unit tests.
- Playwright smoke tests when available.
- Build.

Backend CI should include:

- Install.
- Lint.
- Typecheck.
- Unit tests.
- Integration tests.
- Database migration tests.
- OpenAPI generation check.

Contracts CI should include:

- Format.
- Clippy.
- `cargo test`.
- Contract build.
- ABI/spec generation check where applicable.

Docs CI should include:

- Install.
- Markdown lint.
- Link check.
- Generated-reference check.
- Content quality check.
- Build.

## Environment Examples

Every repo with runtime configuration should include an environment example.

Environment examples must not include:

- Private keys.
- Seed phrases.
- Bearer tokens.
- Production credentials.

## Pull Request Standards

Pull requests should:

- Stay scoped to one issue.
- Explain what changed.
- List verification performed.
- Include screenshots only for UI evidence.
- Include transaction hashes where payment evidence is relevant.
- Include generated artifact diffs where references changed.
- Include closing directives for GitHub issues.

## Issue Standards

Issues should include:

- Description.
- Requirements and context.
- Scope.
- Acceptance criteria.
- Test requirements.
- Relevant files.
- Suggested execution.
- Guidelines.

See [Issue Template](/contributing/issue-template).

## Cross-Repo Links

Each repo should link to:

- Docs site.
- Other LumenBazaar repositories.
- Relevant setup guide.
- Security policy.
- Contribution guide.

## Evidence Standards

Use precise labels:

- Local.
- Mock.
- Testnet.
- Staging.
- Mainnet.
- CI.
- Generated.

Do not present screenshots as protocol conformance proof.

## Naming Standards

Use:

- `LumenBazaar` for the project.
- `LumenRoute` for the GitHub organization.
- `Veridatum Labs` for proposal organization context when needed.

Avoid implying that the project is operated by the Stellar Development Foundation or guaranteed by SCF.
