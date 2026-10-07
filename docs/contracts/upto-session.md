# Upto Session Contract

The `upto-session` contract supports capped metered payments for x402 `upto` workflows. It lets a buyer authorize a maximum spend for a resource while the seller or facilitator settles only the actual usage.

Exact x402 payments should remain contract-free when Stellar/Soroban authorization entries and the Stellar Asset Contract provide enough enforcement. Use this contract only when a resource needs metered settlement after execution.

## Use Cases

Use `upto-session` for:

- LLM inference billed by token.
- Search APIs billed by result count.
- Data APIs billed by bytes or rows.
- MCP tools billed by usage.
- Long-running agent tasks with a maximum spend cap.

## Public Interface

```rust
initialize(admin: Address, supported_assets: Vec<Address>)

create_session(
    buyer: Address,
    seller: Address,
    asset: Address,
    max_amount: i128,
    expires_at_ledger: u32,
    resource_hash: BytesN<32>
) -> BytesN<32>

settle(
    session_id: BytesN<32>,
    actual_amount: i128,
    usage_hash: BytesN<32>
)

cancel(session_id: BytesN<32>)

get_session(session_id: BytesN<32>) -> Session

extend_ttl(session_id: BytesN<32>)

recover_expired(session_id: BytesN<32>)

interface_version() -> u32
```

## Session Type

```rust
Session {
    id: BytesN<32>,
    buyer: Address,
    seller: Address,
    asset: Address,
    max_amount: i128,
    settled_amount: i128,
    expires_at_ledger: u32,
    resource_hash: BytesN<32>,
    usage_hash: Option<BytesN<32>>,
    status: SessionStatus,
}
```

## `initialize`

Stores contract admin configuration and the initial supported-asset allowlist.

Requirements:

- Must be called once.
- Repeated calls fail with `AlreadyInitialized`.
- Admin address must be recorded for future administrative actions if any are added.

## `create_session`

Creates a capped session.

Inputs:

- `buyer`: buyer address that authorizes the cap.
- `seller`: fixed recipient.
- `asset`: fixed Stellar Asset Contract address.
- `max_amount`: maximum spend cap.
- `expires_at_ledger`: last ledger where settlement is valid.
- `resource_hash`: hash binding the session to a resource.

Guarantees:

- Buyer authorization is required.
- Seller is fixed.
- Asset is fixed.
- Maximum amount is fixed.
- Expiry is fixed.
- Resource hash is recorded.
- Session starts unsettled.

## `settle`

Settles actual usage against the cap.

Inputs:

- `session_id`: existing session ID.
- `actual_amount`: amount to transfer.
- `usage_hash`: hash of usage receipt or billing evidence.

Settlement must reject:

- Missing sessions.
- Expired sessions.
- Cancelled sessions.
- Already settled sessions.
- Amounts above cap.
- Invalid amounts.
- Wrong seller or unauthorized settlement actor.
- Wrong asset path.

After successful settlement, the contract records `settled_amount`, `usage_hash`, and settled status.

## `cancel`

Cancels an unsettled session.

Expected behavior:

- Buyer can cancel before settlement.
- Settled sessions cannot be cancelled.
- Cancelled sessions cannot be settled.
- Missing sessions fail with `SessionNotFound`.

## `get_session`

Returns current session state by ID. Backend services use this to inspect capped payment state, generate receipts, and reconcile frontend display.

## `extend_ttl`

Extends contract storage TTL safely for active sessions. TTL behavior must be documented with resource usage expectations and tests.

## `recover_expired`

Allows any caller to recover an expired open session. The escrowed balance is refunded to the buyer;
the caller never receives funds. Recovery fails before expiry and cannot replay after the session
becomes terminal.

## `interface_version`

Returns `2` for this release. Consumers must reject an unexpected interface version before submitting
state-changing calls.

## Contract Guarantees

The contract must guarantee:

- Buyer authorization is required.
- Seller recipient is fixed.
- Asset is fixed.
- Maximum amount cannot be exceeded.
- Session cannot be settled twice.
- Expired session cannot be settled.
- Cancelled session cannot be settled.
- Usage receipt hash is recorded.
- TTL is extended safely.
- Storage layout is versioned.

## Error Codes

```txt
AlreadyInitialized
Unauthorized
InvalidAmount
ExpiredSession
SessionNotFound
SessionAlreadySettled
SessionCancelled
AmountExceedsCap
InvalidAsset
InvalidSeller
TtlExtensionFailed
InvalidResourceHash
InvalidUsageHash
UnsupportedAsset
InvalidSupportedAssets
SessionDurationTooLong
LiabilityOverflow
LiabilityUnderflow
EscrowUnderfunded
NotInitialized
SessionExpired
SessionNotExpired
```

## Events

The released version 2 interface emits stable events for:

- `SessionCreated`.
- `SessionSettled`.
- `SessionCancelled`.
- `SessionRecovered`.

Each event includes `event_version = 2`, a session ID topic, and typed reconciliation fields recorded
in `generated/contracts/upto-session.interface.json`. Live examples are in
`generated/contracts/testnet-lifecycle.json`.

## Required Tests

Contract tests should cover:

- Create valid session.
- Reject unauthorized session creation.
- Reject zero or negative cap.
- Settle valid session.
- Reject settlement over cap.
- Reject double settlement.
- Reject expired settlement.
- Reject settlement by wrong seller.
- Cancel session before settlement.
- Reject cancel after settlement.
- Extend TTL.
- Validate storage persistence.
- Validate emitted events.

## Generated Artifacts

The pinned contract release publishes:

- Contract ABI/spec files.
- TypeScript bindings where applicable.
- Contract IDs for local and testnet deployments.
- Gas/resource usage notes.
- Security limitations.

The imported binding, spec, interface, deployment manifest, and lifecycle fixture are stored under
`generated/contracts/` and checksummed by `generated/manifest.json`. The backend should consume the
generated binding instead of hand-typing the contract interface.
