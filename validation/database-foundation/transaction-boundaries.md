# Transaction Boundaries

A database transaction protects one local consistency boundary. It must be short, deterministic, retry-aware, and must not remain open during an external provider/network call. Provider intent is persisted with an outbox/job; asynchronous completion runs a new idempotent transaction.

## Required boundaries

| Workflow | Atomic database work | External work and rollback behavior |
|---|---|---|
| Deposit approval | Lock pending deposit; verify transition/idempotency; create balanced ledger posting; mark approved; write audit/outbox | Provider evidence is obtained before the transaction. Any validation/post failure rolls back approval and all ledger rows. |
| Wallet credit/debit | Lock relevant account/hold state; create ledger transaction and entries; assert balance/currency; post; update projection if used | Insufficient available funds or imbalance rolls back everything. Never mutate a wallet balance directly. |
| Order creation | Validate stored offer snapshot; create order/items; reserve funds/create hold; write outbox | Provider fulfillment occurs after commit. Failure later changes fulfillment state and releases/reverses funds in a new transaction. |
| Provider order sync | Lock internal fulfillment/version; deduplicate provider observation; transition state; settle/release ledger hold if final; write audit/outbox | Never hold DB locks while calling provider. Stale/duplicate observations become no-ops. Failure rolls back the observed transition, then retries safely. |
| Refund | Lock eligible order/payment totals; enforce remaining refundable amount; create refund intent and hold/reversal plan | Provider request runs asynchronously. Success posts reversal/refund atomically; failure releases pending state without rewriting original entries. |
| Debt settlement | Lock debt and funding accounts; validate limits/authorization; create balanced posting; mark settlement; audit | Any posting or state failure rolls back the complete settlement. Corrections use reversal transactions. |

## Concurrency and retry

- Use unique idempotency constraints and explicit aggregate versions.
- Lock only rows needed for an invariant, in a documented order, to reduce deadlocks.
- Retry serialization/deadlock failures with bounded backoff at the application boundary; never blindly retry permanent errors.
- Publish external effects through a transactional outbox after commit.
- A rollback produces no audit claim of success and no queued success effect. Failed attempts may be recorded separately outside/retried after rollback without exposing secrets.
- Do not promise exactly-once delivery; ensure exactly-once business effects through idempotent transitions and postings.
