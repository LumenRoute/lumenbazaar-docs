# Contract Deployment

This page defines how the contracts repo should document local and testnet deployment for LumenBazaar Soroban contracts.

Mainnet deployment is intentionally gated and should not happen until tests, generated artifacts, security review decisions, and operational sign-off are complete.

## Contracts

The contracts repo should contain:

```txt
contracts/
  upto-session/
  policy-wallet-example/
  test-token/
```

Only `upto-session` is part of the core capped metered payment path. `policy-wallet-example` is an example only, and `test-token` is for local or test support.

## Local Deployment

Local deployment should prove the contract can be built, deployed, initialized, and exercised without relying on public network state.

Expected local commands should cover:

```txt
cargo test
stellar contract build
stellar contract deploy
stellar contract invoke -- initialize
stellar contract invoke -- create_session
stellar contract invoke -- get_session
stellar contract invoke -- settle
stellar contract invoke -- cancel
stellar contract invoke -- extend_ttl
```

The exact commands should be generated from the contracts repo after the contract scaffold exists.

## Test Token

If local tests require a token contract, deploy `test-token` separately.

The docs should make clear:

- Test token is not production infrastructure.
- Test token state should not be confused with real USDC.
- Local test token addresses are environment-specific.

## Testnet Deployment

Testnet deployment should happen only after:

- `cargo test` passes.
- Contract build succeeds.
- ABI/spec files are generated.
- TypeScript bindings are generated if used by backend.
- Local deployment smoke test passes.
- Security limitations are documented.

Testnet deployment should record:

- Network.
- Deployer public address.
- Contract ID.
- Commit SHA.
- Build command.
- Deployment command.
- Initialization transaction hash.
- Contract spec artifact path.
- Binding artifact path.

## Contract ID Record

Contract IDs should be recorded in a structured table.

| Network | Contract | Contract ID | Commit | Status |
| --- | --- | --- | --- | --- |
| local | `upto-session` | TBD | TBD | development |
| testnet | `upto-session` | TBD | TBD | pending |
| mainnet | `upto-session` | TBD | TBD | gated |

Mainnet rows should stay `gated` until launch requirements are complete.

## Generated Artifacts

The contracts repo should publish:

- ABI/spec files.
- TypeScript bindings.
- Deployment logs with secrets removed.
- Contract ID records.
- Gas/resource usage notes.

The docs repo should import generated artifacts into:

```txt
generated/contracts/
```

Generated reference docs should be checked in CI so contract docs do not drift from source.

## Resource Usage

Document resource usage for:

- `create_session`
- `settle`
- `cancel`
- `get_session`
- `extend_ttl`

For each function, record:

- Network.
- Contract version.
- Ledger or simulation context.
- CPU instructions where available.
- Memory where available.
- Storage changes.
- Transaction fee where available.

## TTL Strategy

The deployment docs should explain:

- Which storage entries need TTL extension.
- When `extend_ttl` should be called.
- Who is allowed to extend TTL.
- What happens after expiry.
- How storage cleanup affects receipts and backend records.

## Backend Handoff

After testnet deployment, the contracts repo should provide the backend repo with:

- Contract ID.
- ABI/spec files.
- TypeScript bindings.
- Network configuration.
- Function names and parameter types.
- Error codes.
- Event shapes.
- Example session IDs.
- Example usage hashes.

The backend should consume generated bindings, not hand-written guesses.

## Mainnet Deployment Gate

Mainnet deployment requires:

- Completed local and testnet tests.
- Documented testnet contract ID.
- Generated artifacts reviewed.
- Gas/resource usage documented.
- Security checklist complete.
- Audit readiness package complete.
- Operator sign-off.
- Incident response and rollback procedures.

Mainnet deployment should not be presented as complete until contract IDs and transaction evidence are recorded.
