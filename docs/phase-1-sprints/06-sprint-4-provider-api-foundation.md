# Sprint 4 — Provider API Foundation

## Tickets

- `PROV-001` — Provider connection and protected credentials.
- `PROV-002` — Connection test and capability contract.
- `PROV-003` — Catalog synchronization and change detection.
- `PROV-004` — Outbox/inbox and idempotent provider submission plan.
- `PROV-005` — Status inquiry, timeout handling, and reconciliation.

## Goal

Establish one provider connection, raw catalog synchronization, and duplicate-safe submission/inquiry foundations without customer order submission or real money flow.

## Planned work

- Create tenant-scoped connection record and Secret Manager-backed credential reference.
- Add write-only credential/test/disable/rotate behavior and safe health/balance metadata.
- Implement selected provider's versioned capability/error/input/status contract in sandbox.
- Import raw hidden Provider Products on approved schedule/manual command.
- Detect new/changed/disabled/removed/price/input/status changes and audit sync.
- Establish outbox/inbox/idempotency and provider attempt/inquiry contracts.
- Prove timeout-after-create enters pending inquiry and never blind retry.

## Entry conditions

- Sprint 3 accepted.
- Named provider, sandbox, terms/data/security review, capability matrix, contacts, and rate limits accepted.
- Secret Manager/KMS path available and tested.
- No real production/provider secret in repository.

## Required tests

- Credential masking/tenant isolation/rotation/disable and SSRF/TLS/timeout-safe connection test.
- Catalog initial/repeat/change/disable/remove/partial/overlap/rate-limit sync.
- No raw product customer visibility or auto-publication.
- Idempotency/outbox/inbox duplicate/replay/two-worker/shutdown behavior using safe sandbox/fake adapter.
- Timeout before/after acceptance, inquiry, unknown/late/reordered status, insufficient balance.

## Acceptance criteria

- Authorized admin can safely connect/test and import raw hidden catalog records.
- Change detection is versioned/audited and cannot alter customer catalog.
- Provider submission/inquiry contract proves no blind retry.
- No customer order or ledger integration is active.

## Explicit non-scope

- Store Product publication, customer orders, payment/holds/capture, multi-provider routing/failover, SMM, or production provider calls.

## Stop conditions

- Missing Secret Manager or leaked provider key.
- Provider inquiry/idempotency behavior cannot resolve ambiguous create.
- Unknown provider status has no safe review mapping.
- Catalog sync auto-publishes/overwrites tenant data.
- Provider terms/capability/payment/legal blocker appears.
