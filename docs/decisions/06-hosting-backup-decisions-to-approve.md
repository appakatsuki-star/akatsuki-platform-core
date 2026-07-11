# Hosting and Backup Decisions to Approve

## Purpose

These decisions define where data and services live, how environments stay separate, and how the business recovers from loss. Exact vendor names remain open until country, region, capability, and cost are compared.

## HOST-01 — Local development

**Recommended decision:** local development uses only fake/disposable data and local test credentials. No production or staging database, customer data, provider credential, backup, or cloud administrator key may be copied locally. Local secret files are ignored by Git.

Local development may use documented disposable services later, but Phase 0.6 does not authorize running or installing them.

**Why:** a developer laptop should not become a hidden production environment.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## HOST-02 — Staging

**Recommended decision:** staging is a separate cloud account/project with separate network, database, storage, keys, secret paths, domains, provider sandboxes, and service identities. Use generated test data; production data is prohibited unless a formal masked-data exception is approved.

**Why:** releases and recovery can be tested without risking customers or production credentials.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## HOST-03 — Production

**Recommended decision:** use a managed container platform in one approved primary region. Deploy web, API, worker, and migration job independently as non-root immutable artifacts. Use private managed data services, TLS, named MFA-protected production access, and controlled rollback. Do not adopt Kubernetes or multi-cloud for MVP without evidence.

**Why:** managed services lower operational burden while preserving clean deployment boundaries.

**Founder must select:** cloud/provider, region, expected monthly budget, and acceptable vendor dependency.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## HOST-04 — Managed PostgreSQL

**Recommended decision:** choose a supported managed PostgreSQL offering with private networking, TLS, encryption at rest, HA/failover option, WAL/PITR, automated backups, isolated restore, metrics, maintenance/upgrade support, and the required region.

**Do not select solely on price:** confirm connection limits, backup retention, restoration granularity/time, key ownership, support plan, and data egress.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## HOST-05 — Backup frequency and retention

**Recommended decision:** continuous WAL archiving/PITR plus at least one daily recoverable database backup. Initial retention proposal: PITR for 14–35 days and daily backups for 35 days. Keep access separately controlled from application runtime. Object storage and audit evidence require matching lifecycle/recovery plans.

**Why:** daily backup alone could lose almost a day of orders and money events.

**Founder must approve:** cost and business data-loss tolerance. Legal/Privacy must approve retention.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## HOST-06 — Point-in-time recovery

**Recommended decision:** target database RPO of 15 minutes or better. PITR must restore to an isolated environment without overwriting production. Final RTO is approved only after a measured full rehearsal; set an initial business target before provider selection.

**Plain meaning:** if bad data appears at 14:30, the team can restore near the last safe minute rather than only last night's copy.

**Important:** recovery pauses outbound provider/payment work and reconciles it before replay to avoid duplicate effects.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## HOST-07 — Restore testing

**Recommended decision:** perform one production-like restore before public launch, then quarterly full restore rehearsals and monthly automated consistency/restore checks where affordable. Test after major database, backup, region, or key changes.

Acceptance checks tenant isolation, migration version, ledger balance/immutability, projection rebuild, object integrity, secrets access, application health, and safe queue/outbox reconciliation.

**Why:** a successful backup notification does not prove the backup is usable.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## HOST-08 — Environment separation and secrets

**Recommended decision:** local, development/CI, staging, and production never share databases, storage, KMS keys, secret paths, provider credentials, domains, or deployment identities. Untrusted/preview builds receive no protected credentials. Use cloud Secret Manager/KMS and workload identity.

**Why:** a staging bug or leaked test key must not become a production incident.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## Vendor selection scorecard

Compare shortlisted vendors using this table before approval:

| Criterion | Weight | Candidate A | Candidate B | Candidate C |
|---|---:|---:|---:|---:|
| Required country/region and residency | Mandatory | | | |
| Managed PostgreSQL HA/PITR/restore | Mandatory | | | |
| Secret Manager/KMS and workload identity | Mandatory | | | |
| Private networking and TLS | Mandatory | | | |
| Managed container platform | High | | | |
| Logs/alerts/audit export | High | | | |
| Support, status, and recovery SLA | High | | | |
| Monthly pilot cost and predictable scaling | High | | | |
| Object storage/Redis/CDN/WAF fit | Medium | | | |
| Exit/export/egress practicality | Medium | | | |

## Approval record

| Field | Value |
|---|---|
| Selected provider/region | ____ |
| Managed PostgreSQL offering | ____ |
| Approved monthly budget | ____ |
| RPO / initial RTO target | ____ |
| Retention | ____ |
| Backup/restore owner | ____ |
| Security/Platform approval | ____ |
| Founder approval and date | ____ |

Until vendor, region, RPO/RTO, retention, and ownership are filled and approved, hosting/backup remains a Phase 1 blocker.
