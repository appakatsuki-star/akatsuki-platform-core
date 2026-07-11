# Provider API MVP Blueprint

## Boundary

One provider adapter implements an internal capability contract. Provider-specific requests, statuses, errors, authentication, and field names remain inside the adapter. Domain orders and customer UI use Akatsuki's canonical vocabulary.

## Provider connection

- Tenant-scoped connection with provider definition/version, base URL/config, secret reference, status, health/balance, last test/sync.
- Credentials entered/replaced through write-only flow and retrieved only by the authorized runtime identity.
- Test connection validates safe capability/auth behavior without logging/returning credentials.
- Disable blocks new dispatch while permitting safe inquiry/reconciliation for in-flight work.

## Catalog sync

- Proposed 30-minute default with configurable 15/30/60 schedule and rate-limited manual command.
- Fetch catalog outside database transaction; validate size/schema/content; write normalized raw snapshot/change records in short transactions.
- Detect new, updated, disabled, removed, price, currency, input, min/max/step, and availability changes.
- Import never publishes. Material change on a mapped/published service creates review/alert and may suspend new purchase.
- Record sync actor/scheduler, provider/tenant, start/end, adapter version, counts, safe error, and correlation.

## Order submit

1. Revalidate tenant/module/product/package/mapping/input/provider/quote/financial state.
2. Commit internal dispatch intent/outbox with stable provider idempotency/business reference.
3. Worker submits once with approved fields and credentials.
4. Persist provider order ID, safe response evidence, attempt/outcome, and normalized state.
5. Emit versioned status event; order/ledger service applies only allowed transition.

## Status inquiry and synchronization

- Poll/inquire using stored provider order ID or stable reference; signed webhook may complement it if provider supports one.
- Store safe raw provider status separately and map to internal queued/processing/completed/rejected/failed/unknown vocabulary.
- Unknown/new status never guesses success and enters review.
- Terminal internal state cannot regress from an ordinary provider callback.

## Failure rules

- Timeout/connection loss after create is ambiguous: inquiry first; no blind retry or provider failover.
- Definite safe transient failure before acceptance uses bounded backoff/jitter and attempt limit.
- Provider duplicate response resolves to existing attempt/order.
- Insufficient provider balance opens alert/circuit and blocks new dispatch.
- Changed cost above approved tolerance rejects/requotes before submit; customer is never silently charged more.
- Invalid input is normalized, audited safely, and follows definite rejection/release policy.
- Disabled/removed service blocks new order but preserves mappings/history/inquiry.
- Dead-letter/manual replay requires permission, reason, audit, and duplicate/outcome check.

## Monitoring and reconciliation

Monitor sync age/change counts, connection health, provider balance where available, latency/timeouts/errors/rate limits, unknown statuses, ambiguous age, rejected input, provider/internal status mismatch, cost variance, and reconciliation cases.

## Provider acceptance evidence

Before implementation: named provider, legal/terms/data review, sandbox credentials, catalog samples, capability/status/error/input matrix, idempotency/inquiry behavior, rate limits, balance/price semantics, escalation contacts, and credential rotation plan.
