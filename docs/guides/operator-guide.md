# Operator Guide

An operator runs LumenBazaar infrastructure for local development, testnet, staging, or mainnet. Operators may run a public hosted facilitator or a private self-hosted deployment.

This guide covers the operational shape of the system. Detailed deployment commands belong in [Self-Hosting](/operations/self-hosting) and repeatable procedures belong in [Runbook](/operations/runbook).

## Operator Responsibilities

Operators are responsible for:

- Running backend API, worker, MCP server, database, Redis, search, frontend, docs, and monitoring services.
- Configuring supported Stellar networks and assets.
- Keeping private keys out of the platform.
- Monitoring settlement health.
- Publishing accurate status and metrics.
- Running conformance checks.
- Handling incidents.
- Keeping docs and generated references current.

## Environments

LumenBazaar should support:

```txt
local
testnet
staging
mainnet
```

Each environment should have explicit configuration. Do not silently fall back from mainnet to testnet or from one asset issuer to another.

## Required Services

A full deployment includes:

- PostgreSQL.
- Redis.
- Search index.
- Backend API.
- Worker.
- MCP server.
- Frontend.
- Docs site.
- Monitoring stack.

For local development, Docker Compose should run PostgreSQL, Redis, and any selected search service. Production can use managed services.

## Backend API

The backend API exposes:

- Health and metadata endpoints.
- x402 facilitator endpoints.
- Bazaar discovery endpoints.
- Resource and seller endpoints.
- Payment, settlement, and receipt endpoints.
- Conformance endpoints.
- Metrics.

Operators should monitor availability, latency, error rate, and dependency health for these endpoints.

## Worker

Worker jobs include:

- `settlement-confirmation-worker`
- `resource-indexing-worker`
- `search-sync-worker`
- `conformance-runner-worker`
- `network-health-worker`
- `receipt-finalizer-worker`
- `stale-payment-cleanup-worker`

Operators should watch queue depth, retry counts, dead-letter jobs, and processing latency.

## MCP Server

The MCP server exposes paid resource discovery and paid call tools to agents. Operators should enforce budgets, stable errors, and rate limits.

The MCP server should not hold buyer private keys. Agent spending policy belongs in wallet, smart account, or controlled runtime configuration.

## Network Configuration

Operators should configure:

- `stellar:testnet`
- `stellar:pubnet`
- RPC URL per network.
- Horizon URL where needed.
- Network passphrase.
- Supported SEP-41 assets.
- USDC defaults.
- Trustline guidance.
- Fee sponsorship behavior if supported.

Mainnet configuration should require explicit enablement and review.

## Key Management

LumenBazaar should never store buyer private keys. Documentation and examples must avoid seed phrases and live credentials.

If an operator needs service credentials for infrastructure, those credentials should be stored in the deployment platform's secret manager and omitted from logs.

## Monitoring Expectations

Track:

- API uptime.
- Verify latency.
- Settle latency.
- RPC error rate.
- Settlement success rate.
- Queue depth.
- Search latency.
- Cataloging failures.
- Resource count.
- Payment volume.
- Contract errors.

The frontend operator dashboard and public metrics should draw from the same backend status model.

## Public Metrics

For ecosystem trust and funding review, publish:

- Number of indexed resources.
- Number of active sellers.
- Number of successful settlements.
- Testnet transaction hashes.
- Mainnet transaction hashes when live.
- Uptime.
- p50 and p95 latency.
- Conformance run status.

## Conformance

Operators should run conformance checks against:

- `/v1/supported`
- `/v1/verify`
- `/v1/settle`
- Exact scheme behavior.
- Stable error codes.
- Testnet configuration.
- Mainnet configuration when enabled.
- `Upto` scheme behavior after contract integration.

## Incident Response

Operators should have response procedures for:

- Settlement failure spike.
- RPC or Horizon degradation.
- Search index poisoning.
- Catalog validation bypass.
- Replay detection anomaly.
- Contract error spike.
- Rate-limit abuse.

See [Incident Response](/operations/incident-response) for detailed procedures.

## Mainnet Gate

Mainnet should not launch until:

- Testnet flows work.
- Conformance runs pass.
- Monitoring is live.
- Rate limits are active.
- Security docs are published.
- Operator runbook exists.
- Incident response guide exists.
- Asset and trustline requirements are documented.
- Contract mainnet deployment, if used, has passed review gates.
