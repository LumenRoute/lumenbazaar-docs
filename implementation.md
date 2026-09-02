# LumenBazaar Docs Implementation Plan

Source document: `../LUMENBAZAAR_FULL_PROJECT_DOCUMENTATION.md`

Repo role: the public source of truth for the entire LumenBazaar project, including protocol explanations, guides, API references, contract references, SDK references, operations, security, conformance evidence, Drips planning, and SCF proposal material.

Primary stack options:

- Mintlify
- Docusaurus
- Nextra
- GitBook-compatible markdown or MDX
- Mermaid diagrams
- OpenAPI generated references

Target structure:

```txt
introduction.md
getting-started.md
project/
  positioning.md
  problem-and-goals.md
  personas.md
  non-goals.md
architecture/
  overview.md
  payment-flow.md
  discovery-flow.md
  trust-model.md
  repository-map.md
guides/
  seller-guide.md
  buyer-guide.md
  agent-guide.md
  operator-guide.md
  testnet-guide.md
  mainnet-guide.md
api-reference/
  facilitator.md
  discovery.md
  resources.md
  payments.md
  mcp.md
contracts/
  upto-session.md
  policy-wallet-example.md
  deployment.md
sdks/
  seller-sdk.md
  buyer-sdk.md
examples/
  paid-weather-api.md
  paid-rag-api.md
  paid-mcp-tool.md
security/
  threat-model.md
  dependency-policy.md
  disclosure-policy.md
  audit-readiness.md
operations/
  self-hosting.md
  monitoring.md
  incident-response.md
  runbook.md
funding/
  scf-rfp-proposal.md
  drips-plan.md
  milestones.md
  metrics.md
contributing/
  repository-standards.md
  issue-template.md
reference/
  glossary.md
  source-links.md
```

Docs-as-code structure:

```txt
README.md
LICENSE
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md
package.json
.editorconfig
.gitignore
.github/
  PULL_REQUEST_TEMPLATE.md
  ISSUE_TEMPLATE/
    contributor_task.yml
  workflows/
    ci.yml
docs/
  introduction.md
  getting-started.md
  project/
  architecture/
  guides/
  api-reference/
  contracts/
  sdks/
  examples/
  security/
  operations/
  funding/
  contributing/
  reference/
static/
  diagrams/
  images/
snippets/
  seller-sdk/
  buyer-sdk/
  mcp/
generated/
  openapi/
  contracts/
```

Implementation rules:

- Docs are the canonical source of truth.
- Prefer generated API and contract references where possible.
- Keep examples runnable on testnet.
- Clearly state that LumenBazaar is not official Stellar or SDF infrastructure.
- Separate testnet proof from mainnet readiness.
- Avoid presenting screenshots as conformance proof.
- Preserve the source document's product positioning: Stellar-native x402 facilitator, Bazaar discovery layer, MCP server, SDKs, and Soroban metered-payment contracts.
- Serve the documented readers explicitly: sellers, buyers, AI agent developers, operators, contributors, reviewers, and security auditors.
- Keep exact payments and `upto` sessions documented as separate flows.
- Use source links as references, but treat live protocol and package details as drift-prone and verify them before publishing generated or reference docs.

## Phase 1: Repository Foundation

Parts:

- Choose Mintlify, Docusaurus, Nextra, or a GitBook-compatible setup.
- Add docs site scaffold.
- Add `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, PR template, issue template, and CI.
- Add markdown linting and link checking.
- Add folders for static diagrams, reusable snippets, and generated references.

Completion check:

- Fresh clone can install dependencies and run the docs dev server.

## Phase 2: Navigation And Information Architecture

Parts:

- Create top-level navigation.
- Create architecture, guides, API reference, contracts, SDKs, examples, security, operations, and funding sections.
- Create project, contributing, and reference sections.
- Configure sidebars so beginner paths and reviewer paths are easy to scan.
- Add redirects or placeholders for pages that depend on later implementation.

Completion check:

- Every planned doc path exists and is reachable from navigation.

## Phase 3: Introduction

Parts:

- Write `introduction.md`.
- Explain LumenBazaar in one sentence.
- Include short and long pitch material.
- Explain x402 facilitator, Bazaar discovery, MCP server, SDKs, and Soroban contracts.
- State open-source and self-hostable goals.
- State that the project is developer infrastructure, not a consumer wallet or custodial payment service.

Completion check:

- New readers understand what the project is and what it is not.

## Phase 4: Getting Started

Parts:

- Write `getting-started.md`.
- Explain the four repositories.
- Explain local setup order.
- List required services.
- Link to seller, buyer, agent, and operator paths.
- Link to contributor and reviewer paths.

Completion check:

- A developer knows which repo to open first for their role.

## Phase 5: Repository Map

Parts:

- Write `architecture/repository-map.md`.
- Document `lumenbazaar-frontend`.
- Document `lumenbazaar-backend`.
- Document `lumenbazaar-contracts`.
- Document `lumenbazaar-docs`.
- Explain that SDKs start in backend packages.

Completion check:

- The four-repo architecture is clear and matches the project plan.

## Phase 6: Architecture Overview

Parts:

- Write `architecture/overview.md`.
- Explain seller API, seller SDK, buyer SDK, backend API, facilitator, discovery service, MCP server, search, workers, contracts, frontend, and docs.
- Add system architecture Mermaid diagram.
- Document component responsibilities and boundaries.
- Show how frontend, backend, contracts, and docs connect without merging repository ownership.

Completion check:

- Readers can follow the full system from seller to buyer to settlement.

## Phase 7: Payment Flow

Parts:

- Write `architecture/payment-flow.md`.
- Explain initial paid request.
- Explain 402 payment requirements.
- Explain buyer authorization.
- Explain facilitator verification.
- Explain retry and settlement.
- Explain receipt creation.
- Distinguish exact payment flow from future `upto` session flow.
- State that receipts and transaction hashes are the evidence, not screenshots.

Completion check:

- The exact x402 payment lifecycle is documented step by step.

## Phase 8: Discovery Flow

Parts:

- Write `architecture/discovery-flow.md`.
- Explain Bazaar metadata.
- Explain resource cataloging.
- Explain resource search.
- Explain HTTP endpoint and MCP tool discovery.
- Explain `partialResults`.
- Explain why discovery indexing is off-chain by default.
- Add discovery flow Mermaid diagram.

Completion check:

- Sellers and agents understand how resources enter and leave the discovery index.

## Phase 9: Trust Model

Parts:

- Write `architecture/trust-model.md`.
- Explain non-custodial design.
- Explain domain verification.
- Explain off-chain discovery index.
- Explain payment verification boundaries.
- Explain what the facilitator can and cannot guarantee.
- Explain seller metadata trust, route-template validation, replay prevention, and network dependency risk.

Completion check:

- Security-sensitive assumptions are explicit.

## Phase 10: Seller Guide

Parts:

- Write `guides/seller-guide.md`.
- Explain seller prerequisites.
- Explain wallet and domain setup.
- Explain metadata creation.
- Explain middleware integration.
- Explain testnet payment validation.
- Explain publishing to Bazaar discovery.

Completion check:

- Seller can add paid access to an API with minimal external context.

## Phase 11: Buyer Guide

Parts:

- Write `guides/buyer-guide.md`.
- Explain resource search.
- Explain payment term inspection.
- Explain payment authorization.
- Explain retry after verification.
- Explain settlement receipts.
- Explain budget limits.

Completion check:

- Buyer can discover and call a paid resource through documented SDK flow.

## Phase 12: Agent Guide

Parts:

- Write `guides/agent-guide.md`.
- Explain MCP server setup.
- Document available MCP tools.
- Explain deterministic tool schemas.
- Explain budget controls.
- Explain machine-readable error handling.

Completion check:

- Agent developers can use LumenBazaar through MCP.

## Phase 13: Operator Guide

Parts:

- Write `guides/operator-guide.md`.
- Explain local and hosted operation.
- Explain required services.
- Explain environment variables.
- Explain network configuration.
- Explain key management expectations without storing secrets.

Completion check:

- Operators can identify everything needed to self-host.

## Phase 14: Testnet Guide

Parts:

- Write `guides/testnet-guide.md`.
- Explain testnet setup.
- Explain testnet Stellar asset configuration.
- Explain sample seller and buyer flow.
- Explain how to find transaction hashes.
- Explain known testnet limitations.

Completion check:

- Testnet flow can be reproduced from docs.

## Phase 15: Mainnet Guide

Parts:

- Write `guides/mainnet-guide.md`.
- Explain production configuration.
- Explain USDC and SEP-41 asset requirements.
- Explain trustline requirements.
- Explain fee sponsorship behavior if supported.
- Add mainnet readiness checklist.

Completion check:

- Mainnet instructions exist but are gated by security and operational readiness.

## Phase 16: Facilitator API Reference

Parts:

- Write `api-reference/facilitator.md`.
- Document `GET /v1/supported`.
- Document `POST /v1/verify`.
- Document `POST /v1/settle`.
- Document request and response examples.
- Document stable errors.

Completion check:

- API reference matches generated OpenAPI output when backend publishes it.

## Phase 17: Discovery API Reference

Parts:

- Write `api-reference/discovery.md`.
- Document `GET /v1/discovery/resources`.
- Document `GET /v1/discovery/search`.
- Document `POST /v1/discovery/validate`.
- Document `POST /v1/discovery/catalog`.

Completion check:

- Discovery API is clear for both frontend and SDK consumers.

## Phase 18: Resource And Payment API Reference

Parts:

- Write `api-reference/resources.md`.
- Write `api-reference/payments.md`.
- Document resource CRUD endpoints.
- Document sellers endpoints.
- Document payments, settlements, and receipts endpoints.

Completion check:

- Dashboard and SDK API dependencies are documented.

## Phase 19: MCP API Reference

Parts:

- Write `api-reference/mcp.md`.
- Document `search_paid_resources`.
- Document `inspect_resource`.
- Document `prepare_payment`.
- Document `call_paid_resource`.
- Document `get_payment_receipt`.
- Document `inspect_budget`.
- Document `list_supported_networks`.

Completion check:

- MCP tool schemas and outputs are deterministic in the docs.

## Phase 20: Contract Reference

Parts:

- Write `contracts/upto-session.md`.
- Document `initialize`.
- Document `create_session`.
- Document `settle`.
- Document `cancel`.
- Document `get_session`.
- Document `extend_ttl`.
- Document session fields and errors.

Completion check:

- Contract behavior is understandable without reading Rust source first.

## Phase 21: Policy Wallet Example Docs

Parts:

- Write `contracts/policy-wallet-example.md`.
- Explain that it is an example only.
- Document max amount per payment.
- Document daily spending cap.
- Document seller, asset, network, resource hash, and expiry policies.

Completion check:

- Agent spending policy example is useful without being marketed as production wallet code.

## Phase 22: Contract Deployment Docs

Parts:

- Write `contracts/deployment.md`.
- Document local deployment.
- Document testnet deployment.
- Document contract ID recording.
- Document generated ABI/spec and TypeScript binding locations.
- Document gas/resource usage.

Completion check:

- Backend and reviewers can verify deployed contract artifacts.

## Phase 23: Seller SDK Docs

Parts:

- Write `sdks/seller-sdk.md`.
- Document Express middleware.
- Document Fastify middleware.
- Document Next.js route helper.
- Document metadata builder.
- Document route template and schema validation.

Completion check:

- Sellers can integrate `@lumenbazaar/seller-sdk` from examples.

## Phase 24: Buyer SDK Docs

Parts:

- Write `sdks/buyer-sdk.md`.
- Document search helper.
- Document inspect helper.
- Document payment preparation.
- Document verify, retry, settle, and receipt helpers.
- Document budget limits.

Completion check:

- Buyers can implement the full paid call loop.

## Phase 25: Example Guides

Parts:

- Write `examples/paid-weather-api.md`.
- Write `examples/paid-rag-api.md`.
- Write `examples/paid-mcp-tool.md`.
- Link to backend example applications.
- Include testnet execution commands.

Completion check:

- Example docs match runnable backend examples.

## Phase 26: Security Threat Model

Parts:

- Write `security/threat-model.md`.
- Document forged seller metadata.
- Document forged route templates.
- Document replay attacks.
- Document expired auth reuse.
- Document wrong asset and recipient settlement.
- Document over-settlement and double settlement.
- Document discovery poisoning and abusive facilitator calls.

Completion check:

- Documented threats map to backend and contract tests.

## Phase 27: Security Policies

Parts:

- Write `security/dependency-policy.md`.
- Write `security/disclosure-policy.md`.
- Document license rules, including avoiding AGPL base dependencies for facilitator infrastructure.
- Document responsible disclosure process.

Completion check:

- Security reporters and contributors know the project expectations.

## Phase 28: Audit Readiness

Parts:

- Write `security/audit-readiness.md`.
- Include contract checklist.
- Include facilitator checklist.
- Include conformance evidence requirements.
- Include known limitations.

Completion check:

- Reviewers can evaluate security posture from docs.

## Phase 29: Self-Hosting

Parts:

- Write `operations/self-hosting.md`.
- Document Postgres, Redis, search index, API, worker, MCP server, frontend, docs, and monitoring.
- Document Docker Compose.
- Document production service separation.

Completion check:

- An operator can self-host from the docs once repos are implemented.

## Phase 30: Monitoring

Parts:

- Write `operations/monitoring.md`.
- Document API uptime.
- Document verify and settle latency.
- Document RPC error rate.
- Document settlement success rate.
- Document queue depth.
- Document search latency and catalog failures.

Completion check:

- Monitoring docs match backend metrics and frontend operator dashboard.

## Phase 31: Incident Response

Parts:

- Write `operations/incident-response.md`.
- Define severity levels.
- Define settlement failure response.
- Define RPC degradation response.
- Define search index poisoning response.
- Define communication expectations.

Completion check:

- Operators have a practical incident process.

## Phase 32: Runbook

Parts:

- Write `operations/runbook.md`.
- Document deploy steps.
- Document rollback steps.
- Document worker restart steps.
- Document database migration procedure.
- Document conformance rerun procedure.

Completion check:

- Routine operations are documented as repeatable steps.

## Phase 33: SCF RFP Proposal Draft

Parts:

- Write `funding/scf-rfp-proposal.md`.
- Include project summary, problem, solution, why Stellar, why x402, architecture, repo plan, stack, milestones, budget placeholder, open-source plan, maintenance plan, security plan, conformance plan, metrics, team placeholder, risks, and links.

Completion check:

- Proposal draft is ready for team-specific credentials, timeline, and budget.

## Phase 34: Drips Contributor Plan

Parts:

- Write `funding/drips-plan.md`.
- Explain issue structure.
- Include frontend issues.
- Include backend issues.
- Include contract issues.
- Include docs issues.
- Include acceptance and test requirements.

Completion check:

- Maintainers can open contributor-ready issues from the docs.

## Phase 35: Milestones

Parts:

- Write `funding/milestones.md`.
- Document repository foundation.
- Document exact facilitator.
- Document Bazaar discovery.
- Document SDKs.
- Document MCP server.
- Document `upto` contracts.
- Document full frontend.
- Document conformance and security.
- Document mainnet launch.
- Document ecosystem growth.

Completion check:

- Milestone docs mirror the project roadmap and are easy to track.

## Phase 36: Metrics

Parts:

- Write `funding/metrics.md`.
- Define public repo metrics.
- Define settlement metrics.
- Define indexed resource metrics.
- Define active seller metrics.
- Define MCP call metrics.
- Define conformance pass rate.
- Define uptime and search quality metrics.

Completion check:

- SCF and ecosystem metrics can be tracked consistently.

## Phase 37: Conformance Report Template

Parts:

- Add conformance report page or template.
- Include `/supported`, `/verify`, and `/settle` checks.
- Include exact scheme status.
- Include `upto` scheme status after contract milestone.
- Include testnet and mainnet sections.

Completion check:

- Conformance evidence can be published without ad hoc formatting.

## Phase 38: Generated Reference Sync

Parts:

- Import backend OpenAPI output.
- Import contract ABI/spec output.
- Validate generated docs in CI.
- Add warning for stale generated references.

Completion check:

- Docs do not drift silently from implementation.

## Phase 39: Link And Content QA

Parts:

- Run markdown lint.
- Run link checks.
- Check code snippets.
- Check Mermaid diagrams.
- Check that no doc claims official SDF or SCF endorsement.

Completion check:

- Docs are publishable and accurate for public review.

## Phase 40: Publishing

Parts:

- Configure docs hosting.
- Configure production domain.
- Publish versioned docs.
- Add repository links.
- Add public feedback or issue links.

Completion check:

- Public docs are live and linked from all repositories.

## Phase 41: Maintenance

Parts:

- Update docs for backend API changes.
- Update docs for contract interface changes.
- Update docs for frontend UX changes.
- Update docs for x402 and Stellar spec changes.
- Archive stale conformance reports without deleting historical evidence.

Completion check:

- Docs remain the reliable project source of truth over time.

## Phase 42: Project Positioning Pages

Parts:

- Write `project/positioning.md`.
- Capture the one-sentence pitch, short pitch, and long pitch.
- Explain the Stellar, x402, Bazaar, MCP, SDK, and Soroban positioning.
- State that LumenBazaar is open-source infrastructure and not official SDF infrastructure.
- State the hosted-service, self-hosted-infrastructure, and open-reference-infrastructure use cases.

Completion check:

- Project positioning is available outside the SCF proposal and matches the source project documentation.

## Phase 43: Problem, Goals, And Non-Goals

Parts:

- Write `project/problem-and-goals.md`.
- Document the paid API onboarding problem.
- Document the eight primary product goals.
- Write `project/non-goals.md`.
- Document non-custodial boundaries, no private key custody, no required hosted operator, no speculative token incentives, and no hidden settlement details.

Completion check:

- Product scope is clear enough to prevent docs, issue, and implementation drift.

## Phase 44: Persona Reading Paths

Parts:

- Write `project/personas.md`.
- Add seller reading path.
- Add buyer reading path.
- Add AI agent developer reading path.
- Add operator reading path.
- Add contributor reading path.
- Add reviewer, funder, and security auditor reading paths.

Completion check:

- Each documented user type can find the right sequence of docs without guessing.

## Phase 45: Repository Standards Docs

Parts:

- Write `contributing/repository-standards.md`.
- Document required files for every repo: `README.md`, `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, PR template, issue template, CI, `.editorconfig`, and `.gitignore`.
- Document required README content for every repo.
- Document cross-repo link requirements.

Completion check:

- Maintainers can apply one consistent repository standard across all four repos.

## Phase 46: Contributor Issue Template Docs

Parts:

- Write `contributing/issue-template.md`.
- Include the required issue sections: description, requirements and context, scope, acceptance criteria, test requirements, relevant files, suggested execution, and guidelines.
- Document that every issue should be scoped for one contributor and one pull request.
- Document `Closes #ISSUE_NUMBER` usage for PR descriptions.

Completion check:

- Drips-ready issue creation can happen from documented templates.

## Phase 47: Glossary

Parts:

- Write `reference/glossary.md`.
- Define x402, facilitator, Bazaar discovery, MCP, Stellar Asset Contract, SEP-41, Soroban auth entry, smart account, exact payment, `upto` session, receipt, resource, seller, buyer, and operator.
- Link glossary terms back to architecture and guide pages.

Completion check:

- New contributors and reviewers can understand project terms without leaving the docs.

## Phase 48: Source Links And Reference Tracking

Parts:

- Write `reference/source-links.md`.
- Include primary references for Stellar Community Fund, SCF RFP Track, Stellar x402 docs, Built on Stellar x402 facilitator, Stellar smart wallets, x402 Foundation, Bazaar extension, Stellar exact scheme, `upto` scheme, Stellar x402 tooling, `@x402/stellar`, and Drips Wave.
- Mark external protocol and package references as drift-prone.
- Add a publication checklist requiring verification of external links before release.

Completion check:

- Docs preserve the source references and do not publish stale protocol claims without a verification step.

## Phase 49: Tranche And Evidence Model

Parts:

- Add SCF tranche structure to `funding/scf-rfp-proposal.md` or `funding/milestones.md`.
- Document Tranche 0 foundation, Tranche 1 exact facilitator and discovery testnet, Tranche 2 SDKs/MCP/frontend/upto testnet, and Tranche 3 mainnet/conformance/audit/public metrics.
- Document evidence expected for each tranche.
- Separate local checks, testnet transaction evidence, mainnet transaction evidence, CI state, and conformance results.

Completion check:

- Funding docs can support SCF review without overstating unverified work.

## Phase 50: Docs Content Consistency Audit

Parts:

- Check naming consistency for `LumenBazaar`, `LumenRoute`, and `Veridatum Labs`.
- Check every guide keeps seller, buyer, agent, and operator responsibilities separate.
- Check exact payment, discovery, MCP, and `upto` contract terms are not conflated.
- Check no content implies custodial fund handling.
- Check no page claims official Stellar, SDF, or SCF endorsement.

Completion check:

- Docs match the architecture, trust model, and scope in the source project documentation.
