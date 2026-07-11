# Data Protection and Backup Plan

## Objectives

Protect confidentiality, integrity, availability, tenant isolation, and recoverability of transactional data, private objects, configuration, secrets, and audit evidence. PostgreSQL remains authoritative for domain and financial state; queues, caches, search, and projections must be rebuildable or explicitly backed up according to business impact.

## Data inventory and classification

| Class | Examples | Minimum protection |
|---|---|---|
| Restricted secrets | Session/API tokens, provider keys, MFA seeds, digital keys | Secret manager/envelope encryption, narrow access, never logged |
| Restricted financial/identity | Ledger, payment/settlement references, verification, beneficiary data | Strong access control, field encryption where needed, immutable/audited changes |
| Confidential tenant/customer | Profiles, orders, tickets, attachments, settings | Tenant isolation, encryption, retention/export/deletion policy |
| Internal operational | Provider attempts, health, jobs, runbooks | Least privilege, redaction, defined retention |
| Public | Published catalog and versioned brand assets | Integrity/versioning; no confidential metadata |

Each new field/object/event must name owner, tenant/global scope, classification, purpose, retention, exportability, deletion constraints, and log/AI policy.

## Backup strategy

### PostgreSQL

- Use a managed PostgreSQL service supporting automated encrypted backups and continuous WAL archiving/PITR.
- Recommended planning target: PITR with **RPO ≤ 15 minutes**; business owner must approve the final target after cost/impact review.
- Take at least daily recoverable backup snapshots in addition to PITR and retain according to approved schedule.
- Keep backup copies/metadata and restore authority in a separate account or failure domain from application runtime where provider capability permits.
- Monitor backup/WAL success, lag, storage, key availability, and expiration; page on loss of recovery coverage.
- Backups inherit data classification and tenant commingling. They are not a convenient tenant-level deletion mechanism.

### Object storage

- Enable versioning for private assets where deletion/replacement risk justifies it; use encryption, checksums, lifecycle policies, and deletion protection for critical objects.
- Replicate or back up objects to meet approved RPO/RTO/residency. Database metadata and object versions must be recoverable to a mutually consistent point or reconciled.
- Public CDN copies are disposable; the private origin and metadata are authoritative.

### Configuration, secrets, and audit

- Infrastructure/configuration definitions are versioned and reproducible without embedding secrets.
- Secret-manager backup/recovery uses provider-supported recovery/versioning and a tested key/identity break-glass process. Never export plaintext bulk secrets as a backup shortcut.
- Audit/security logs are exported continuously or promptly to a separately controlled append-only/tamper-resistant destination.
- Redis/queues are not the source of financial truth. Recovery rebuilds from PostgreSQL outbox/inbox state and reconciles before dispatch.

## Frequency and retention proposal

Final durations require legal/business approval. Starting proposal:

| Artifact | Frequency | Initial retention proposal |
|---|---|---|
| PostgreSQL WAL/PITR | Continuous | 14–35 days |
| PostgreSQL daily backup | Daily | 35 days |
| Monthly recovery copy | Monthly | 12 months only if legally justified |
| Private object versions | Continuous on change | Product/legal schedule |
| Audit/security archive | Continuous export | Security/legal schedule, typically longer than app logs |
| Ordinary app logs | Continuous | Short operational window, e.g. 30–90 days |

Retention must minimize personal data, preserve required financial evidence, support legal holds, and include automatic verified expiry. Longer is not automatically safer.

## Restore testing

- Before production launch: restore a production-like backup into an isolated recovery environment and meet the acceptance checklist.
- Recommended cadence: quarterly full restore rehearsal; monthly automated restore/consistency check where cost permits; after material database/backup/key changes.
- Test at least one point-in-time recovery and one scenario involving accidental migration/data corruption.
- Restore operators must not expose production data in ordinary staging; use isolated access, masking where feasible, logging, and prompt destruction after the exercise.

Restore acceptance verifies:

- expected recovery timestamp and measured data loss/downtime;
- database starts at the expected migration journal/version;
- foreign keys/check constraints and tenant isolation hold;
- every posted ledger transaction remains immutable and balanced, projections rebuild, and aggregate control accounts reconcile;
- object metadata/checksums and private access controls are valid;
- outbox/jobs are paused until duplicates/ambiguous external effects are reconciled;
- application health and critical read paths work with rotated/recovered secrets;
- evidence, discrepancies, owner, and corrective deadline are recorded.

## Disaster recovery

1. Incident Commander declares recovery and freezes deployments/migrations/provider dispatch.
2. Preserve evidence and identify the last trustworthy database/time boundary.
3. Select restore region/account consistent with residency and service dependencies.
4. Restore database, objects, configuration, secrets access, and audit connectivity in dependency order.
5. Keep workers/outbound financial/provider actions disabled while ledger, settlements, inbox/outbox, and external status reconcile.
6. Validate isolation/security, then authorize staged traffic restoration.
7. Monitor closely, notify stakeholders as required, and complete post-incident review.

Define separate scenarios for region loss, database corruption, compromised credentials, accidental deletion, ransomware/provider-account takeover, and unavailable primary cloud service.

## Export and portability

- Tenant/customer exports are asynchronous, tenant-scoped, permissioned, audited, encrypted in transit/at rest, checksum-protected, short-lived, and delivered by authorized signed access.
- Export schemas are versioned and document omitted/restricted fields. Provider secrets, password/session hashes, internal security controls, and other tenants' data are never exported.
- Financial exports include immutable references and currency/amount semantics; they are not a replacement for ledger retention.
- Failed/expired export objects are deleted by lifecycle rule.

## Migration and rollback safety

- Use a real migration journal with checksums, one controlled migration runner, concurrency/advisory lock, reviewed SQL, and drift detection.
- Follow expand/migrate/contract: add compatible shape, deploy compatible code, backfill in bounded resumable batches, verify, then remove old shape in a later release.
- Before high-risk migration, prove backup recovery coverage and record restore/forward-recovery procedure.
- Application rollback must remain compatible with the expanded schema. Destructive database rollback is not the default; prefer forward recovery.
- Never rollback by deleting/re-writing posted ledger or append-only audit history.

## Open decisions before Phase 1

- Managed database/object/backup providers and regions.
- Business-approved RPO/RTO per data class and maximum acceptable degraded period.
- Retention schedule, legal holds, residency, and deletion obligations.
- Recovery account/region, key custody, and authorized restore roles.
- Restore rehearsal owner, cadence, datasets, and measured acceptance threshold.
