# Publishing

The docs site is configured for GitHub Pages by default and can move to a custom production domain later.

## Default Public URL

Default GitHub Pages settings:

```txt
url: https://lumenroute.github.io
baseUrl: /lumenbazaar-docs/
```

Expected default site URL:

```txt
https://lumenroute.github.io/lumenbazaar-docs/
```

## Custom Domain

When a production domain is ready, configure:

```txt
DOCUSAURUS_URL=https://docs.example.com
BASE_URL=/
```

If GitHub Pages is still used with a custom domain, add the required CNAME configuration only after the domain is owned and DNS is ready.

## Deployment Workflow

Publishing is handled by:

```txt
.github/workflows/deploy.yml
```

The workflow runs:

```bash
npm ci
npm run lint
npm run links
npm run check:generated
npm run check:content
npm run build
```

Then it uploads the Docusaurus `build` folder to GitHub Pages.

## Versioning

The current docs version is labeled `Next`.

Use versioned docs when:

- Backend APIs are live and stable.
- Contract interfaces are deployed.
- SDK packages are published.
- Mainnet behavior is launched.
- External integrations depend on a stable doc snapshot.

Do not publish versioned docs for behavior that is still only planned.

## Repository Links

The docs should link to:

- [lumenbazaar-frontend](https://github.com/LumenRoute/lumenbazaar-frontend)
- [lumenbazaar-backend](https://github.com/LumenRoute/lumenbazaar-backend)
- [lumenbazaar-contracts](https://github.com/LumenRoute/lumenbazaar-contracts)
- [lumenbazaar-docs](https://github.com/LumenRoute/lumenbazaar-docs)

## Public Feedback

Use GitHub issues for public docs feedback:

```txt
https://github.com/LumenRoute/lumenbazaar-docs/issues
```

Security-sensitive reports should follow [Disclosure Policy](/security/disclosure-policy) instead of public issues.

## Publication Checklist

Before publishing:

- Lint passes.
- Local link check passes.
- Generated-reference check passes.
- Content quality check passes.
- Production build passes.
- External source links are reviewed.
- No page implies official Stellar, SDF, or SCF endorsement.
- Testnet and mainnet evidence are clearly separated.
- Generated references are marked current or stale.
