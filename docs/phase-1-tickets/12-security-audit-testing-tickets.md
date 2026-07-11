# Security, Audit, and Testing Tickets

## SEC-001 — Implementable audit event catalog and append-only plan

- **Goal:** Map every sensitive MVP command/read/export to a safe versioned audit event.
- **Why it matters:** Security, financial, provider, and catalog disputes require trustworthy evidence.
- **Scope:** Event schema/integrity, transactional/outbox write, central export, tenant/platform views, retention/redaction/access, alert-critical events.
- **Non-scope:** Debug body logging, SIEM vendor selection alone, mutable notes, or full event payload copies.
- **Expected files or modules:** Future audit domain/application/schema/repository/export adapters and event matrix.
- **Data/entities touched:** `audit_logs`, outbox/export status, safe evidence references.
- **API groups if relevant:** Authorized audit search/detail/export request; no generic audit-create API.
- **Security requirements:** Append-only runtime, separately controlled copy, access audited, secrets/PII/input redaction, UTC/correlation.
- **Tests required:** Required event coverage, atomicity/delivery failure, mutation/delete denial, permission/tenant/export, redaction, clock/correlation.
- **Acceptance criteria:** Every listed critical workflow produces complete safe evidence that application roles cannot alter/delete.
- **Do not do:** Store provider keys, passwords, tokens, full sensitive inputs, or arbitrary before/after objects.
- **Notes for Codex:** Use event IDs consistently across domain audit and centralized logs.

## TEST-001 — Authentication, permission, and tenant-isolation suite plan

- **Goal:** Define executable positive/negative matrix for identity, sessions, MFA, fixed roles, context, and cross-tenant surfaces.
- **Why it matters:** Authorization and isolation failures are release blockers.
- **Scope:** HTTP/use case/repository/RLS/cache/file/job/event/provider/export/support cases; session/recovery/CSRF; role/field/action denial.
- **Non-scope:** Running tests now, penetration test, or relying only on unit mocks.
- **Expected files or modules:** Future integration/security test suites, fixtures/builders, architecture checks.
- **Data/entities touched:** Test tenants/users/roles/catalog/orders/files/jobs/audit.
- **API groups if relevant:** Every protected group and health/context boundaries.
- **Security requirements:** Unique fixtures, no production data/secrets, test deny and non-disclosure, pooled RLS context.
- **Tests required:** This ticket defines them; include success plus wrong tenant/role/module/state/owner/assurance for every capability.
- **Acceptance criteria:** Traceability matrix maps each permission/isolation rule to automated test and expected safe error.
- **Do not do:** Use validation-only trusted headers as production auth or declare isolation from one wallet test.
- **Notes for Codex:** Critical matrix must run against real PostgreSQL in later authorized execution.

## TEST-002 — Provider mapping, pricing, and order lifecycle suite plan

- **Goal:** Define contract/integration scenarios for raw sync-to-publish-to-order behavior.
- **Why it matters:** Provider/catalog/price changes and retries can cause incorrect products, prices, or duplicate fulfillment.
- **Scope:** Sync/change/version/hidden rules, mapping/publication/inputs/assets, exact quote/snapshot, submit/inquiry/status/timeout/idempotency.
- **Non-scope:** SMM, multi-provider routing, performance benchmark, or executing provider production calls.
- **Expected files or modules:** Future provider adapter contract tests, catalog/pricing/order integration/e2e suites.
- **Data/entities touched:** Provider/catalog/pricing/order/attempt/outbox/inbox/audit test fixtures.
- **API groups if relevant:** Provider connection/sync/products; catalog; pricing; orders; admin/customer views.
- **Security requirements:** Sandbox/fake adapter only, no real keys/customer data, malformed/oversized/untrusted metadata, tenant/role masking.
- **Tests required:** New/change/disable/remove, stale mapping/quote, cost/input change, double submit, response loss, timeout inquiry, late/unknown/duplicate status.
- **Acceptance criteria:** Every provider failure/change class has deterministic internal/customer/financial/audit expected result.
- **Do not do:** Stub away idempotency/transactions or assert provider status equals internal status.
- **Notes for Codex:** Selected provider needs its own pinned fixture/contract evidence.

## TEST-003 — Ledger balance, immutability, and recovery suite plan

- **Goal:** Define accountant-aligned database/integration/concurrency tests for all MVP money operations.
- **Why it matters:** Financial correctness cannot rely on happy-path application tests.
- **Scope:** Balanced posting, immutability/reversal, holds/concurrency/idempotency, capture/release/refund, projections/reconciliation, migration/restore/replay.
- **Non-scope:** Inventing postings, load testing, FX, partial refund, or running infrastructure now.
- **Expected files or modules:** Future ledger/database integration tests, posting fixtures, concurrency/recovery suites.
- **Data/entities touched:** All ledger/hold/payment/order/settlement/reconciliation/idempotency records.
- **API groups if relevant:** Internal ledger commands and authorized statement/reconciliation views.
- **Security requirements:** Test DB roles/privileges/RLS, maker-checker, no cleanup bypass of posted immutability.
- **Tests required:** Unbalanced/one-entry, update/delete, duplicate/reorder, simultaneous spend/refund, projection corruption/rebuild, restore/outbox replay.
- **Acceptance criteria:** Every signed posting example and invariant maps to automated test including concurrent/negative path.
- **Do not do:** Disable immutability trigger for teardown or compare only cached balance.
- **Notes for Codex:** Preserve immutable fixtures or reset disposable database safely in later tests.

## TEST-004 — Health, audit, observability, and backup-readiness suite plan

- **Goal:** Define operational evidence for health endpoints, logs/alerts, audit delivery, migration, backup/PITR, and restore.
- **Why it matters:** A working UI is insufficient if failures cannot be detected or recovered.
- **Scope:** Liveness/readiness, safe degradation, structured/redacted logs, correlation, alert tests, audit export, migration journal/drift/lock, restore checklist/tabletop.
- **Non-scope:** Choosing vendor in this ticket, running restore now, or public launch.
- **Expected files or modules:** Future operational tests/scripts/config dashboards/runbooks and restore report template.
- **Data/entities touched:** Migration journal, audit/export status, backup metadata, recovery test records.
- **API groups if relevant:** Health endpoints and safe operational/admin summaries.
- **Security requirements:** No sensitive health/log data; isolated restore; access/audit; pause provider dispatch and reconcile before replay.
- **Tests required:** Dependency degradation, redaction canaries, alert delivery, audit loss, migration rerun/drift/concurrency, PITR/full restore acceptance.
- **Acceptance criteria:** Named owner can demonstrate detection and production-like recovery with measured RPO/RTO and no duplicate provider/ledger effect.
- **Do not do:** Treat backup-success notification as restore evidence or expose admin diagnostics publicly.
- **Notes for Codex:** This ticket feeds release evidence and remains blocked on hosting selection.
