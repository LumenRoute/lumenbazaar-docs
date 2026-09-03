# Milestones

This roadmap covers repository readiness, testnet delivery, mainnet launch, conformance, security, and long-term maintenance across all LumenBazaar repositories.

## 1. Foundation And Repository Readiness

Repositories:

- Frontend
- Backend
- Contracts
- Docs

Deliverables:

- Public GitHub repositories.
- License files.
- Contributor guides.
- Security policy.
- Code of conduct.
- PR templates.
- Issue templates.
- CI for all repos.
- Environment examples.
- Initial architecture docs.
- Shared naming and branding.

Acceptance criteria:

- Every repo is clean-clone runnable.
- Every repo has documented setup commands.
- CI runs on pull requests.
- Docs explain the four-repo architecture.

## 2. Exact x402 Facilitator

Repositories:

- Backend
- Docs

Deliverables:

- `/v1/supported`
- `/v1/verify`
- `/v1/settle`
- Testnet configuration.
- SEP-41 asset support.
- USDC default config.
- Payment receipt records.
- Machine-readable errors.
- Unit and integration tests.
- OpenAPI spec.

Acceptance criteria:

- Exact payment flow works on Stellar testnet.
- Failed verification returns stable error codes.
- Receipts include transaction hash where settlement succeeds.
- Docs include seller and buyer testnet guide.

## 3. Bazaar Discovery Layer

Repositories:

- Backend
- Frontend
- Docs

Deliverables:

- Resource model.
- Metadata validator.
- Route template validator.
- `/v1/discovery/resources`
- `/v1/discovery/search`
- Catalog event log.
- Search indexing.
- Resource explorer UI.
- Resource detail UI.

Acceptance criteria:

- Resources can be cataloged automatically.
- HTTP endpoints and MCP tools are represented.
- Search supports query and filters.
- Invalid metadata is rejected with stable reasons.
- Frontend can browse and inspect resources.

## 4. Seller And Buyer SDKs

Repositories:

- Backend
- Docs

Deliverables:

- Seller SDK.
- Buyer SDK.
- Testkit package.
- Express or Fastify middleware.
- Next.js helper.
- Discovery metadata builder.
- Payment retry helper.
- Receipt helper.
- Package documentation.

Acceptance criteria:

- A seller can add paid access with minimal code.
- A buyer can search and call paid resources through SDK.
- SDK tests pass.
- Example apps use the SDKs.

## 5. MCP Server And Agent Workflows

Repositories:

- Backend
- Frontend
- Docs

Deliverables:

- MCP discovery server.
- Search tool.
- Resource inspection tool.
- Paid-call proxy tool.
- Receipt tool.
- Budget inspection tool.
- Agent demo.
- Frontend MCP inspector.

Acceptance criteria:

- Agent can search paid resources.
- Agent can inspect schemas.
- Agent can call a paid testnet resource.
- Tool errors are deterministic and machine-readable.
- Docs include agent integration guide.

## 6. Soroban Upto Session Contract

Repositories:

- Contracts
- Backend
- Docs

Deliverables:

- `upto-session` contract.
- Contract tests.
- TTL strategy.
- TypeScript bindings.
- Backend integration.
- Payment session APIs.
- Upto scheme documentation.

Acceptance criteria:

- Buyer can create a capped payment session.
- Seller or facilitator can settle actual usage up to cap.
- Contract rejects over-cap and double settlement.
- Contract testnet deployment is documented.
- Backend supports exact and `upto` flows.

## 7. Full Frontend Product

Repositories:

- Frontend
- Backend
- Docs

Deliverables:

- Dashboard.
- Explore page.
- Resource detail page.
- Seller onboarding.
- Payment playground.
- Transaction dashboard.
- Operator dashboard.
- Conformance dashboard.
- Wallet connection.

Acceptance criteria:

- Seller, buyer, agent, and operator flows are usable.
- UI shows testnet resources and receipts.
- UI supports failure inspection.
- Responsive testing passes.

## 8. Conformance, Security, And Audit Readiness

Repositories:

- Backend
- Contracts
- Docs

Deliverables:

- Conformance runner.
- Security threat model.
- Dependency license report.
- Replay attack tests.
- Catalog poisoning tests.
- Route template security tests.
- Contract security checklist.
- Audit readiness package.

Acceptance criteria:

- Conformance tests pass on testnet.
- Known security threats have regression tests.
- Audit package is published in docs.
- No prohibited dependency license is used as a base.

## 9. Mainnet Launch

Repositories:

- Frontend
- Backend
- Contracts
- Docs

Deliverables:

- Mainnet deployment.
- Production environment configs.
- Public status page.
- Public metrics.
- Mainnet settlement receipts.
- Operator runbook.
- Incident response guide.
- Launch documentation.

Acceptance criteria:

- Mainnet exact payments work.
- Mainnet facilitator endpoints are live.
- Docs include mainnet guide.
- Public metrics are available.
- Operators can self-host from documentation.

## 10. Ecosystem Growth And Maintenance

Repositories:

- All repos

Deliverables:

- More examples.
- Partner integrations.
- More MCP tools.
- Search quality evaluation.
- Community issues.
- Maintenance schedule.
- SCF tranche reports.
- Drips contributor reports.

Acceptance criteria:

- Multiple real paid resources are indexed.
- At least two end-to-end example integrations are live.
- Project has active public issues and contributor workflow.
- Funding reports show measurable on-chain and repository activity.

## Evidence Rules

Each milestone should record:

- Commits.
- Pull requests.
- Test output.
- Generated references.
- Testnet transaction hashes where relevant.
- Mainnet transaction hashes where relevant.
- Conformance run IDs.
- Known limitations.

Do not present local checks as live-network behavior, and do not present testnet transactions as mainnet evidence.
