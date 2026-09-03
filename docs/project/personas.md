# Personas

LumenBazaar serves multiple audiences. Each audience needs a different path through the docs.

## Seller

A seller owns an API, model endpoint, data service, or MCP tool and wants to charge per call.

Seller needs:

- Simple middleware.
- Resource metadata helpers.
- Pricing configuration.
- Testnet onboarding.
- Settlement receipts.
- Dashboard visibility.

Seller reading path:

1. [Introduction](/)
2. [Seller Guide](/guides/seller-guide)
3. [Seller SDK](/sdks/seller-sdk)
4. [Discovery Flow](/architecture/discovery-flow)
5. [Testnet Guide](/guides/testnet-guide)
6. [Payments API Reference](/api-reference/payments)

## Buyer

A buyer is a developer, app, wallet, or automation service that wants to call paid resources.

Buyer needs:

- Resource discovery.
- Price and schema inspection.
- Payment authorization.
- Retry helper.
- Receipts and error handling.

Buyer reading path:

1. [Introduction](/)
2. [Buyer Guide](/guides/buyer-guide)
3. [Buyer SDK](/sdks/buyer-sdk)
4. [Payment Flow](/architecture/payment-flow)
5. [Discovery API Reference](/api-reference/discovery)
6. [Facilitator API Reference](/api-reference/facilitator)

## AI Agent Developer

An AI agent developer needs agents to find paid tools and call them safely.

Agent needs:

- MCP-compatible discovery tools.
- Deterministic tool schemas.
- Machine-readable errors.
- Budget controls.
- Receipts.

Agent reading path:

1. [Agent Guide](/guides/agent-guide)
2. [MCP API Reference](/api-reference/mcp)
3. [Discovery Flow](/architecture/discovery-flow)
4. [Buyer SDK](/sdks/buyer-sdk)
5. [Paid MCP Tool](/examples/paid-mcp-tool)
6. [Trust Model](/architecture/trust-model)

## Operator

An operator runs the facilitator, discovery index, MCP server, worker, frontend, docs, and monitoring.

Operator needs:

- Docker setup.
- Environment configuration.
- Network support.
- Monitoring.
- Key management guidance.
- Maintenance docs.

Operator reading path:

1. [Operator Guide](/guides/operator-guide)
2. [Self-Hosting](/operations/self-hosting)
3. [Monitoring](/operations/monitoring)
4. [Runbook](/operations/runbook)
5. [Incident Response](/operations/incident-response)
6. [Mainnet Guide](/guides/mainnet-guide)

## Contributor

A contributor implements scoped tasks across frontend, backend, contracts, or docs.

Contributor needs:

- Clear repository ownership.
- Small issues.
- Acceptance criteria.
- Test requirements.
- Pull request expectations.

Contributor reading path:

1. [Repository Map](/architecture/repository-map)
2. [Repository Standards](/contributing/repository-standards)
3. [Issue Template](/contributing/issue-template)
4. [Drips Contributor Plan](/funding/drips-plan)
5. [Content QA](/reference/content-qa)

## Reviewer Or Funder

An SCF or Drips reviewer needs evidence that the project is real and useful.

Reviewer needs:

- Working testnet demo.
- Mainnet deployment plan.
- Public repositories.
- Clear milestones.
- Test results.
- Conformance reports.
- Security posture.
- On-chain metrics.

Reviewer reading path:

1. [Project Positioning](/project/positioning)
2. [Problem And Goals](/project/problem-and-goals)
3. [Architecture Overview](/architecture/overview)
4. [Milestones](/funding/milestones)
5. [Metrics](/funding/metrics)
6. [SCF RFP Proposal](/funding/scf-rfp-proposal)
7. [Conformance Report Template](/funding/conformance-report-template)

## Security Auditor

A security auditor reviews facilitator logic, catalog trust, MCP budget controls, contract behavior, operations, and evidence.

Auditor needs:

- Trust boundaries.
- Threat model.
- Stable error codes.
- Contract guarantees.
- Generated references.
- Test evidence.
- Incident procedures.

Auditor reading path:

1. [Trust Model](/architecture/trust-model)
2. [Threat Model](/security/threat-model)
3. [Audit Readiness](/security/audit-readiness)
4. [Facilitator API Reference](/api-reference/facilitator)
5. [Upto Session Contract](/contracts/upto-session)
6. [Generated References](/reference/generated-references)
7. [Incident Response](/operations/incident-response)

## Path Maintenance

Update this page whenever:

- New guides are added.
- API or contract references move.
- Mainnet support becomes live.
- SDK packages move to a dedicated repository.
- New reviewer or operator evidence pages are added.
