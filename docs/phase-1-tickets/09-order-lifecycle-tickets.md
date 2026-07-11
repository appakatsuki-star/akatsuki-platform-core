# Order Lifecycle Tickets

## ORDER-001 — Model quote, order, inputs, and immutable snapshots

- **Goal:** Define one-item order creation from published package and expiring quote.
- **Why it matters:** Historical customer/commercial/provider facts must not change after sync or admin edits.
- **Scope:** Quote/version/expiry; order/item; safe Player ID/server inputs; catalog/mapping/provider/pricing snapshot; initial states; idempotency.
- **Non-scope:** Cart/multi-item, subscription, SMM quantity, password input, guest checkout, or provider network call.
- **Expected files or modules:** Future orders domain/application/schema/repository/contracts.
- **Data/entities touched:** `orders`, `order_items`, `order_inputs`, `order_price_snapshots`, idempotency/audit/outbox.
- **API groups if relevant:** Customer quote/create/list/detail; admin order reads.
- **Security requirements:** Customer ownership, tenant scope, strict dynamic schema, sensitive input classification/redaction, quote tamper/expiry protection.
- **Tests required:** Stale/changed price/input/mapping, duplicate submit, invalid/hidden input, cross-tenant/customer, snapshot immutability.
- **Acceptance criteria:** Confirmed order captures exactly the approved quote and safe input/schema versions once.
- **Do not do:** Trust client price/tier/provider ID or store unnecessary raw provider/customer secrets.
- **Notes for Codex:** Customer-visible reference and internal ID are separate.

## ORDER-002 — Integrate ledger hold and provider dispatch intent

- **Goal:** Atomically authorize funds and prepare one asynchronous provider dispatch.
- **Why it matters:** Avoids paid-without-order and order-without-safe-funds inconsistencies.
- **Scope:** Revalidate order/package/provider/quote/customer; place hold; move to authorized; write dispatch outbox/idempotency/audit in defined transaction boundaries.
- **Non-scope:** Provider HTTP call inside transaction, final capture, storefront UI, or payment provider implementation.
- **Expected files or modules:** Future orders application orchestrator using ledger/provider ports and outbox.
- **Data/entities touched:** Orders/status events, holds, idempotency, provider attempt intent, outbox, audit.
- **API groups if relevant:** Customer order-confirm command; internal dispatch event.
- **Security requirements:** Customer ownership, server-side price/permission/state, exact amount/currency, no direct balance update.
- **Tests required:** Insufficient/concurrent funds, duplicate request, rollback between states, outbox atomicity, module/tenant/provider suspension.
- **Acceptance criteria:** Either order+hold+dispatch intent commit consistently or no effect occurs.
- **Do not do:** Hold using client-provided amount or create provider request before durable intent.
- **Notes for Codex:** Transaction boundaries must follow ledger/provider blueprint.

## ORDER-003 — Orchestrate provider submit, inquiry, and normalized status

- **Goal:** Apply provider attempt outcomes to explicit internal order transitions and provider order ID.
- **Why it matters:** Provider state is external evidence, not the internal/customer state machine.
- **Scope:** Dispatch worker result; provider ID; queued/processing/completed/rejected/failed/unknown normalization; inquiry; allowed transitions; late/duplicate events.
- **Non-scope:** SMM partial/refill, multi-provider failover, manual success edit, or customer UI.
- **Expected files or modules:** Future orders fulfillment application/event consumers and provider ports.
- **Data/entities touched:** Provider attempts/statuses, orders, status events, inbox, audit/outbox.
- **API groups if relevant:** Internal event handlers; admin inquiry/review; customer safe status.
- **Security requirements:** Tenant/event identity validation, inbox dedupe, terminal-state protection, permission/MFA/audit on manual action.
- **Tests required:** Success/reject/unknown, duplicate/reordered/late, wrong order/tenant, terminal regression, provider ID collision, worker replay.
- **Acceptance criteria:** Every external outcome produces at most one allowed, traceable internal transition.
- **Do not do:** Expose raw provider errors to customer or let callback overwrite internal status arbitrarily.
- **Notes for Codex:** Store provider and internal status separately.

## ORDER-004 — Handle timeout, capture/release/refund, and timeline

- **Goal:** Complete financial/order outcome safely, including pending inquiry on timeout and append-only audit timeline.
- **Why it matters:** Ambiguous provider outcomes are the main duplicate/refund risk.
- **Scope:** Pending inquiry; bounded query; definite failure release/full refund; approved success capture; status/audit events; customer/admin timelines; reconciliation case.
- **Non-scope:** Blind retry, partial refund, chargeback, manual order-state edit, or agent commission execution.
- **Expected files or modules:** Future order outcome/reconciliation use cases using ledger/provider/notification/support ports.
- **Data/entities touched:** Orders/status events, provider attempts, holds/ledger/refunds, reconciliation/audit/outbox.
- **API groups if relevant:** Customer/admin timeline; permissioned inquiry/refund/manual review.
- **Security requirements:** Idempotent outcome commands, accountant-approved capture policy, maker-checker for manual financial action, safe messages.
- **Tests required:** Timeout before/after accept, late completion after inquiry, duplicate capture/release/refund, rejection, restore/replay, timeline/audit consistency.
- **Acceptance criteria:** No timeout can cause duplicate provider order or contradictory capture/refund, and every state is explainable.
- **Do not do:** Treat timeout as failure or change posted entries/status without command/audit.
- **Notes for Codex:** Notification failure never changes order/ledger truth.
