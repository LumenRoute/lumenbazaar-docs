# Content QA

Content quality checks protect the docs from broken references, malformed examples, and claims that overstate project status.

## Automated Checks

The docs CI runs:

```bash
npm run lint
npm run links
npm run check:generated
npm run check:content
npm run build
```

## Link Checks

`npm run links` checks local markdown links across the repository. External protocol references should still be manually verified before publication because upstream specs and packages can change.

## Generated Reference Checks

`npm run check:generated` confirms that generated-reference placeholder files exist and identify their source repositories. The check should become stricter once backend OpenAPI and contract ABI/spec files are available.

## Content Checks

`npm run check:content` checks:

- Markdown fence balance.
- Mermaid fence declarations.
- Unresolved placeholder markers.
- Accidental official-endorsement language.

## Manual Review

Before publishing, reviewers should confirm:

- Code snippets match implemented packages.
- Mermaid diagrams render.
- Exact payment and `upto` sessions are not conflated.
- Testnet and mainnet evidence are separate.
- No page implies LumenBazaar is official Stellar, SDF, or SCF infrastructure.
- Screenshots are not used as protocol conformance proof.
