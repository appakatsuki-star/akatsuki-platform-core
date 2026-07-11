# Release Readiness Tickets

## REL-001 — Finalize staging and production environment plans

- **Goal:** Select and document isolated staging/production topology and responsibilities.
- **Why it matters:** Safe implementation/testing/release needs known cloud, network, data, identity, and cost boundaries.
- **Scope:** Managed container platform, PostgreSQL, Redis/queue, object storage, Secret Manager/KMS, DNS/TLS/edge, observability, accounts/regions/access/budget.
- **Non-scope:** Provisioning, Kubernetes, multi-cloud, public launch, or using production data in staging.
- **Expected files or modules:** Future infrastructure/deployment/monitoring docs/config after authorization; environment diagram/responsibility matrix.
- **Data/entities touched:** Environment/configuration metadata only.
- **API groups if relevant:** Health/readiness and operational endpoints constraints.
- **Security requirements:** Separate accounts/data/keys/provider/payment credentials; private data services; named MFA/JIT access; workload identity.
- **Tests required:** Planned environment mismatch, access denial, TLS/private network, configuration validation, staging provider sandbox isolation.
- **Acceptance criteria:** Cloud/services/region/cost/owners are selected and satisfy Security/Legal/RPO requirements.
- **Do not do:** Provision resources, share credentials/data, or adopt Kubernetes without approved evidence.
- **Notes for Codex:** This is both an entry blocker and future release dependency.

## REL-002 — Confirm secrets, backup/PITR, observability, and rollback readiness

- **Goal:** Produce evidence plan for credentials, recovery, monitoring, release, and failure handling.
- **Why it matters:** Financial/provider system must recover safely and roll back without rewriting history.
- **Scope:** Secret inventory/rotation/recovery; PITR/daily encrypted backup/retention/RPO/RTO/restore; dashboards/alerts; immutable artifacts; migration order; application rollback/forward recovery.
- **Non-scope:** Executing backup/deployment, destructive database rollback, or choosing unapproved vendors.
- **Expected files or modules:** Future secret/access matrix, backup/restore/release runbooks, dashboards/alerts, artifact/migration evidence templates.
- **Data/entities touched:** Backup/audit/config/migration/incident evidence only.
- **API groups if relevant:** Health/readiness and operator safe summaries.
- **Security requirements:** Separate recovery access/key custody, no plaintext backup secrets, redaction, audited break-glass, provider dispatch pause/reconciliation after restore.
- **Tests required:** Rotation/revoke drill, alert delivery, app rollback compatibility, migration forward recovery, isolated PITR/full restore.
- **Acceptance criteria:** Named owners can demonstrate planned detection/rollback/restore within targets without duplicate money/provider effects.
- **Do not do:** Restore over production casually, delete posted records on rollback, or replay outbox blindly.
- **Notes for Codex:** Proposed RPO ≤15 minutes/retention remain unapproved until founder/platform/legal review.

## REL-003 — Assemble final Phase 1 completion GO/NO-GO evidence

- **Goal:** Define final evidence package and signoff after all authorized Phase 1 tickets are complete.
- **Why it matters:** Completion is based on evidence, not feature demos or schedule pressure.
- **Scope:** Scope traceability; test/security/accounting/provider/migration/restore/observability/access/audit/runbook evidence; defects/risks/exceptions; signer record.
- **Non-scope:** Marking entry GO now, public production launch approval, or waiving blockers.
- **Expected files or modules:** Future release evidence index and signed GO/NO-GO record.
- **Data/entities touched:** Evidence references only.
- **API groups if relevant:** All critical flows represented in evidence.
- **Security requirements:** No secret/customer data in evidence; integrity/access/retention; blocking vulnerabilities/isolation/financial defects prohibit GO.
- **Tests required:** Verify every acceptance criterion/ticket maps to result, version, environment, owner; rerun critical end-to-end and restore evidence.
- **Acceptance criteria:** Founder/Product, Legal, Finance/Accountant, Security, Architecture/Database, Platform/Operations all sign with no blocking exception.
- **Do not do:** Reuse Phase 0.3 as full production evidence or confuse Phase 1 completion with public launch.
- **Notes for Codex:** Current Phase 1 status remains NO-GO; this ticket is last in future sequence.
