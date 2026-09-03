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
initialize(admin: Address)

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

Stores contract admin configuration.

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
```

## Events

The contract should emit stable events for:

- Session creation.
- Settlement.
- Cancellation.
- TTL extension if useful for operators.

Events should include session ID and enough indexed values for backend reconciliation.

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

The contracts repo should publish:

- Contract ABI/spec files.
- TypeScript bindings where applicable.
- Contract IDs for local and testnet deployments.
- Gas/resource usage notes.
- Security limitations.

The backend should consume generated bindings instead of hand-typing the contract interface.
