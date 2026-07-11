# Sprint 10 — Security, Testing, and Release Readiness

## Tickets

- `SEC-001` — Audit event catalog and append-only implementation plan/evidence.
- `TEST-001` — Auth, permission, and tenant-isolation suite.
- `TEST-002` — Provider mapping, pricing, and order lifecycle suite.
- `TEST-003` — Ledger balance, immutability, and recovery suite.
- `TEST-004` — Health, audit, observability, and backup-readiness suite.
- `REL-001` — Staging and production environment plans.
- `REL-002` — Secrets, backup/PITR, observability, rollback readiness.
- `REL-003` — Final Phase 1 completion evidence.

## Goal

Produce independent evidence that the approved MVP is secure, isolated, financially correct, observable, recoverable, and operationally owned.

## Planned work

- Complete append-only audit coverage and central security-log export.
- Run full permission/field masking/tenant isolation matrix across HTTP, DB/RLS, caches, files, jobs/events, provider connections, exports, and support.
- Run provider mapping/change/idempotency/timeout and pricing/order lifecycle matrix.
- Run accountant-aligned ledger balance/immutability/concurrency/reversal/reconciliation tests.
- Validate health/readiness, structured redaction, correlation, dashboards/alerts, migration journal/lock/drift/forward recovery.
- Finalize isolated staging/production topology, Secret Manager, managed PostgreSQL, backup/PITR, release/rollback, incident/continuity ownership.
- Perform production-like restore and safe provider/outbox reconciliation exercise.
- Assemble traceable final evidence and collect required Phase 1-completion signoffs.

## Entry conditions

- Sprints 1–9 accepted with no unresolved critical defect.
- Selected staging/production services and access paths available.
- Accountant, Security, Legal, Architecture, and Platform owners available for evidence review.

## Required tests

- Every suite and scenario named in the four TEST tickets.
- Secret/dependency/source/image/infrastructure scans under accepted policy.
- Provider/payment sandbox end-to-end duplicates/failure/reconciliation.
- Migration clean/upgrade/rerun/drift/concurrent/forward-recovery.
- PITR/full restore with tenant isolation, ledger, snapshots, audit, secrets/objects, application health, and no duplicate external replay.
- Alert delivery, incident tabletop, access review, rollback, graceful worker behavior.

## Acceptance criteria

- All critical tests/evidence pass with named versions/environment/owners.
- No unresolved isolation, authorization, secret, financial, duplicate-provider, audit, migration, backup, or recovery defect.
- Founder/Product, Legal, Finance/Accountant, Security, Architecture/Database, and Platform/Operations sign the Phase 1 completion record.
- Public launch remains a separate later decision.

## Stop conditions

- Any critical test/evidence fails or is missing.
- Backup exists without successful restore evidence.
- Audit/alert/redaction/secret/access control gap.
- Provider/payment/ledger reconciliation mismatch.
- Request to waive blocking evidence for schedule reasons.
