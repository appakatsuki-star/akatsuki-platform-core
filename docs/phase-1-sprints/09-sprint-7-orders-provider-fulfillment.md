# Sprint 7 — Orders and Provider Fulfillment

## Tickets

- `ORDER-001` — Quote, order, inputs, and immutable snapshots.
- `ORDER-002` — Ledger hold and provider dispatch intent.
- `ORDER-003` — Provider submit, inquiry, and normalized status.
- `ORDER-004` — Timeout, capture/release/refund, and timeline.

## Goal

Connect catalog, pricing, ledger, and provider into one duplicate-safe backend order journey.

## Planned work

- Create expiring quote and one-item order with catalog/input/commercial/provider snapshots.
- Revalidate server-side and atomically place ledger hold plus dispatch outbox intent.
- Submit provider order through the selected adapter with stable idempotency/business reference.
- Store provider order ID and separate raw-safe provider/internal/customer statuses.
- Process inquiry/poll/webhook and allowed state transitions with inbox dedupe.
- Enter `pending inquiry` after ambiguous timeout; no blind retry.
- Apply accountant-approved capture on confirmed success and release/full refund on definite failure.
- Add append-only status/audit timeline and reconciliation cases.

## Entry conditions

- Sprints 4–6 accepted.
- Provider sandbox create/inquiry/status behavior verified.
- Ledger hold/capture/release/refund postings and capture state accepted.
- Order state machine, customer failure/refund language, and idempotency/retry policies accepted.

## Required tests

- Quote expiry/stale cost/input/mapping/tier and client tampering.
- Duplicate submit, response loss, outbox replay, two workers, wrong tenant/customer.
- Provider success/rejection/invalid input/insufficient balance/unknown status/late/duplicate/reordered update.
- Timeout before/after provider acceptance and inquiry-first behavior.
- Hold/capture/release/refund exactly once; restore/replay reconciliation.
- Internal vs provider/customer status separation and complete audit timeline.

## Acceptance criteria

- One authorized confirmation creates one internal/provider order effect.
- No capture occurs before the approved provider-success rule.
- No refund/reversal exists without ledger entries.
- Ambiguous provider outcome never triggers blind retry or contradictory financial outcome.
- Every transition and external attempt is explainable/audited.

## Stop conditions

- Provider timeout behavior is unclear or inquiry unavailable.
- Duplicate provider order or money movement.
- Price/cost/order snapshot mismatch.
- Internal status copies/regresses from provider status unsafely.
- Capture/refund/reversal does not match signed ledger rules.
