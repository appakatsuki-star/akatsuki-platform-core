# Hosting and Backup Decisions to Approve — Simple Version

## Why these choices matter

Akatsuki needs somewhere safe to run, a separate place to test changes, and a proven way to recover if data is deleted or corrupted. A backup notification is not enough; the business must know that the backup can actually be restored.

## HOST-01 — Local development

**Recommended choice:** developers use fake/disposable data and test credentials only. Production/staging customer data, provider keys, payment keys, database copies, and administrator credentials are never copied to a laptop.

**Founder status:** Not Decided

## HOST-02 — Staging

**Recommended choice:** staging is a separate cloud account/project with its own database, storage, keys, secrets, domain, and provider sandbox credentials. It uses generated test data.

**Simple meaning:** a test mistake cannot charge customers or damage production.

**Founder status:** Not Decided

## HOST-03 — Production

**Recommended choice:** production uses a separate cloud account/project and one approved primary region. Named MFA-protected staff get only the access needed for their job.

**Founder must choose:** cloud/provider: ____  region: ____  pilot monthly budget: ____

**Founder status:** Not Decided

## HOST-04 — Managed container platform

**Recommended choice:** use a managed service to run the web, API, and background workers. Use separate controlled migration jobs and immutable release artifacts.

Do not adopt Kubernetes for MVP unless the operating team can show a clear need and existing skill. Do not add multi-cloud complexity initially.

**Simple meaning:** pay the cloud provider to handle more of the machine/platform operations while Akatsuki focuses on the product.

**Founder status:** Not Decided

## HOST-05 — Managed PostgreSQL

**Recommended choice:** select a supported managed PostgreSQL service with private network access, encrypted connections/storage, high-availability option, monitoring, automated backups, PITR, and isolated restore capability.

Do not choose only by cheapest price; compare recovery time, limits, region, support, and data export.

**Founder status:** Not Decided

## HOST-06 — PITR

**Recommended choice:** require point-in-time recovery with a proposed RPO of 15 minutes or better.

**Simple meaning:** if a bad change occurs at 14:30, the database can be restored near the last safe minute instead of only to last night's copy.

Final RTO—the time needed to restore service—must be set after a measured rehearsal.

**Founder status:** Not Decided

## HOST-07 — Daily encrypted backups

**Recommended choice:** continuous recovery records plus at least one encrypted daily recoverable backup. Initial proposal: keep PITR for 14–35 days and daily backups for 35 days, subject to legal/privacy and cost approval.

Backup access should be separately controlled from the application so one compromised service cannot destroy both data and recovery copies.

**Founder status:** Not Decided

## HOST-08 — Restore tests

**Recommended choice:** complete one production-like restore before public launch, then a full restore rehearsal every quarter and an automated consistency/restore check monthly where affordable.

The test checks migration version, tenant separation, ledger balance, order/provider snapshots, object access, secrets recovery, application health, and safe queue/provider reconciliation.

**Founder status:** Not Decided

## HOST-09 — Environment separation

**Recommended choice:** local, development/CI, staging, and production never share databases, storage, domains, KMS keys, secret paths, provider/payment credentials, or deployment identities.

**Founder status:** Not Decided

## HOST-10 — Secret Manager/KMS

**Recommended choice:** use the selected cloud's managed Secret Manager and Key Management Service. Prefer temporary workload identity instead of long-lived cloud access keys. Test credential rotation and emergency recovery.

**Founder status:** Not Decided

## Founder choices

| Choice | Value |
|---|---|
| Cloud/provider | ____ |
| Primary region | ____ |
| Managed container service | ____ |
| Managed PostgreSQL offering | ____ |
| Monthly pilot budget | ____ |
| RPO | ____ (15 minutes or better recommended) |
| Initial RTO target | ____ |
| Backup retention | ____ |
| Restore owner | ____ |
| Founder overall status | Not Decided |

Platform and Security owners must verify that the selected services actually provide the promised controls before Phase 1 can become `GO`.
