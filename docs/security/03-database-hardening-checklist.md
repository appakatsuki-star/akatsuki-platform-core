# Database Hardening Checklist

## PostgreSQL service and network

- [ ] Use a supported managed PostgreSQL version with documented patch/upgrade ownership.
- [ ] Place the database on private networking; no unrestricted public ingress.
- [ ] Require TLS with certificate verification; reject unencrypted application connections.
- [ ] Enable managed encryption at rest and approved key controls.
- [ ] Configure HA, automated backups, WAL/PITR, monitoring, maintenance windows, and capacity alerts.
- [ ] Set connection limits/pooling, statement/lock/idle-transaction timeouts, and safe query cancellation.
- [ ] Approved extensions only; default/public schema creation privileges revoked from application roles.

## Roles and least privilege

- [ ] Separate named roles/identities for service runtime, worker if needed, migration, read-only operations, monitoring, backup service, and break-glass administration.
- [ ] Runtime roles do not own database/schema/table/function objects, cannot create extensions/roles, cannot run migrations, and do not have `SUPERUSER`, `BYPASSRLS`, or broad database creation privileges.
- [ ] Migration role is unavailable to normal runtime and CI jobs except the controlled release step.
- [ ] Read-only roles use approved views/queries and respect tenant/data classification; “read-only” is not “read everything.”
- [ ] Break-glass access is time-bound, MFA-approved outside PostgreSQL where possible, logged, alerted, and reviewed.
- [ ] Default privileges are explicitly set for future objects; grants are tested for both allowed and denied operations.
- [ ] Credentials are short-lived/rotatable where supported and stored only in the selected secret manager.

## Tenant isolation

- [ ] Every tenant-owned table contains non-null `tenant_id` with a foreign key to the tenant record.
- [ ] Every tenant-owned foreign relationship includes `tenant_id` in composite key/constraint so cross-tenant references fail in PostgreSQL.
- [ ] Tenant uniqueness is composite, e.g. `(tenant_id, external_reference)`; global uniqueness is explicit and justified.
- [ ] Tenant-owned indexes lead with `tenant_id` unless query evidence justifies and documents another safe pattern.
- [ ] Repository methods require tenant context; platform-global repositories are separate and missing tenant never means all tenants.
- [ ] RLS scope is decided. If enabled, policies use transaction-local trusted context, fail closed when absent, apply to workers, and are tested under pooling.
- [ ] Table owners/migration roles that can bypass RLS never service ordinary requests; maintenance bypass is audited.
- [ ] Negative tests cover CRUD, joins, lists, cursors, raw SQL, functions, views, exports, jobs, and support tools.

## Schema integrity

- [ ] Primary keys, foreign keys, `NOT NULL`, unique and check constraints encode core invariants rather than relying only on application validation.
- [ ] Money uses exact integer minor units or reviewed exact numeric type plus explicit ISO currency; floating point is prohibited.
- [ ] Enumerations/status checks and transition ownership are documented; database enum migration tradeoffs are reviewed.
- [ ] Timestamps use an unambiguous zone-aware convention and database/application clocks are synchronized.
- [ ] JSONB is limited to validated flexible metadata; core identity, money, tenant, status, and relationships remain relational.
- [ ] Unbounded list/query patterns are prohibited; indexes map to known access paths, tenant scope, sort order, and uniqueness.
- [ ] Index creation/removal on large tables uses production-safe strategy and monitoring; unused/duplicate indexes are periodically reviewed.

## Ledger and append-only records

- [ ] Ledger account has exactly one tenant and currency; approved account type/taxonomy is constrained.
- [ ] Ledger entries have positive exact amounts, debit/credit direction, transaction/account/currency/tenant-consistent relationships.
- [ ] Posting is atomic and enforces at least two entries balanced per currency before terminal `posted` state.
- [ ] Posted ledger transactions and entries reject `UPDATE` and `DELETE`, including from normal maintenance tooling.
- [ ] Corrections use linked reversal/replacement transactions; uniqueness prevents multiple unintended reversals.
- [ ] Balance projections are transactionally updated/rebuildable and cannot bypass postings.
- [ ] Holds have constrained states and exactly-once capture/release references.
- [ ] Financial, idempotency, settlement, reconciliation, and audit records are retained/append-only according to policy.

## Migration journal and execution

- [ ] Production uses Drizzle's reviewed migration mechanism with a durable journal; disposable Phase 0.3 raw bootstrap is never used.
- [ ] Each migration has immutable identity/order/checksum and reviewed generated/handwritten SQL.
- [ ] One release migration job holds a database-level lock; concurrent deploys cannot run the same migration.
- [ ] Detect and block unexpected schema/journal drift; never hide it with broad `IF NOT EXISTS`.
- [ ] Test clean install, upgrade from supported version, rerun/no-op behavior, rollback/forward recovery, and application compatibility against real PostgreSQL.
- [ ] Use expand/migrate/contract, bounded resumable backfills, progress metrics, lock/time estimates, and stop conditions.
- [ ] Network/provider calls never occur inside database transactions; outbox records commit with local state.

## Deletion and retention

- [ ] Classify each entity as mutable, soft-deletable, hard-deletable, anonymizable, or append-only.
- [ ] Use soft delete only where restoration/business visibility is required; it is not a substitute for authorization or legal deletion.
- [ ] Soft-deleted rows remain tenant-scoped, excluded explicitly from normal queries, uniquely constrained as designed, and purged by policy if allowed.
- [ ] Hard delete is allowed only for ephemeral/uncommitted data after ownership, retention, dependency, and audit checks.
- [ ] Never hard-delete posted ledger entries/transactions, settlement evidence, required audit history, or records under legal hold.
- [ ] Customer privacy deletion anonymizes or removes permitted personal fields while preserving legally required financial integrity and references.
- [ ] Cascading deletes are narrowly reviewed; no tenant/customer delete can cascade into immutable financial history.

## Audit table strategy

- [ ] Domain audit table is append-only to runtime roles and records event ID, actor/principal, tenant, action, target, outcome, reason, timestamp, correlation, and safe metadata.
- [ ] No secrets or unnecessarily duplicated sensitive payloads in audit rows; before/after data is allowlisted/redacted.
- [ ] Audit writes accompany critical state changes transactionally or through a durable outbox without silent loss.
- [ ] Security/audit events are exported to a separately controlled centralized destination for tamper resistance and alerting.
- [ ] Access to audit data is itself permissioned and audited; tenant-visible and platform-security views are distinct.

## Pre-Phase 1 blockers

- [ ] Managed PostgreSQL/version/region approved.
- [ ] Role/privilege matrix approved.
- [ ] RLS decision and executable evidence approved.
- [ ] Migration journal/locking/drift policy approved.
- [ ] Accounting posting matrix and database ledger protections approved.
