# Release and Rollback Plan

## Objectives

Release immutable reviewed artifacts with controlled database changes, rapid detection, explicit stop/rollback criteria, and no corruption or duplicate external effect. Application rollback and database rollback are different: database forward recovery is preferred after an applied migration.

## Release artifacts and environments

- Produce separate versioned images for each web surface, API, worker, and migration job from pinned inputs.
- Generate scan results, SBOM, provenance/signature where supported, source revision, dependency lock, and configuration schema version.
- Build once; promote the same image digest to staging and production.
- Staging uses production-like topology but isolated credentials/data/providers.
- Every release has owner, approver, change summary, risk, impacted tenants/modules/providers/data, migration ID, test evidence, rollback/forward plan, and monitoring window.

## Change classes

| Class | Examples | Approval and rollout |
|---|---|---|
| Standard low-risk | Compatible UI/text/observability change | Normal review, automated gates, staged rollout |
| High-risk | Auth/RBAC, tenant scope, ledger, payment, provider create, migration, secrets | Security/domain owner review, explicit production approval, canary and enhanced monitoring |
| Emergency | Active exploit or severe outage fix | Incident Commander + required owner; smallest safe change; retrospective review |

## Pre-release gates

- [ ] Scope/acceptance and owners approved; no Phase 1-excluded capability enters release.
- [ ] Unit/integration/contract/end-to-end tests pass, including tenant-isolation and authorization denial.
- [ ] High-risk flows pass idempotency/concurrency/reconciliation and audit tests.
- [ ] Dependency, secret, source, image, and IaC scans meet policy; exceptions are approved and expiring.
- [ ] Migration SQL/journal/checksum reviewed and rehearsed against production-like data/size.
- [ ] Backup/PITR coverage is healthy and recovery/forward plan is current for high-risk data change.
- [ ] Provider compatibility/sandbox checks and credentials/config exist in target environment.
- [ ] Dashboards, alerts, feature/module/provider kill switches, and runbooks are ready.
- [ ] Artifact digest and configuration changes are frozen/recorded.

## Deployment sequence

1. Announce change window and freeze conflicting migrations/releases.
2. Confirm backup, database/queue/provider/monitoring health and current version.
3. Run backward-compatible expand migration with single migration job and lock; record journal/checksum/outcome.
4. Deploy compatible worker/API/web instances by canary or rolling strategy; prevent old/new workers from duplicate job ownership.
5. Run smoke tests: health, authentication, tenant mismatch denial, permission denial, selected order/payment path in safe mode, audit/telemetry delivery.
6. Observe canary for defined window and compare error, latency, queue, database, provider, auth, and financial/reconciliation signals.
7. Expand rollout only with explicit release-owner approval.
8. Perform backfill asynchronously in bounded resumable batches with progress, verification, throttle, and stop conditions.
9. Contract/remove old schema only in a later release after compatibility window and verified zero use.

## Stop and rollback criteria

Immediately stop/rollback or disable affected capability for:

- cross-tenant access, permission bypass, secret exposure, ledger imbalance/mutation, duplicate payment/fulfillment, or unverifiable financial state;
- material increase in error/latency/queue age/database saturation/provider failures beyond approved threshold;
- migration lock/data-integrity failure, audit/monitoring loss for critical actions, or inability to reconcile;
- failed health/smoke tests or unexpected version/config/schema mismatch.

The release owner or Incident Commander can stop rollout. Business pressure cannot override a security/financial stop condition without formal incident authority and evidence.

## Application rollback

- Route traffic back to the last known-good immutable image digest/config.
- Ensure the old application remains compatible with expanded schema and event contracts before rollback.
- Pause affected workers/provider dispatch if version mixing risks duplicate or invalid work.
- Do not delete new domain/ledger/audit rows to make old code appear consistent.
- Re-run smoke/security checks and reconcile any requests processed during the change window.

## Database migration recovery

- Before apply, define whether migration is reversible or forward-only and its lock/runtime/data risks.
- Prefer additive expand and forward fix. Destructive down migrations on production data are not the default.
- A failed transactional migration rolls back transactionally where PostgreSQL supports it; verify journal state before retry.
- For partial/non-transactional operations (e.g. some concurrent indexes/backfills), use explicit resumable/cleanup steps and evidence.
- Restore/PITR is last-resort disaster recovery, not ordinary deployment rollback; it requires incident declaration and reconciliation of external effects.
- Posted ledger and append-only audit records are never mutated/deleted by rollback.

## Worker, queue, and provider compatibility

- Jobs/events have versioned envelopes and consumers tolerate supported old/new versions during rollout.
- Deployment ensures graceful shutdown and stable message/idempotency IDs; retries do not become new business commands.
- Pause or partition queues during incompatible worker change; document replay/DLQ ownership.
- Provider adapter/config changes preserve in-flight connection/version/reference or include explicit migration.
- After rollback/recovery, inquiry and reconcile ambiguous external actions before replay.

## Verification and closeout

- Record deployed digest, migration journal, config/feature state, approvers, start/end time, metrics, smoke tests, and incidents.
- Confirm audit/log/trace flow, backup coverage, queue health, provider reconciliation, and no unexplained ledger/projection discrepancies.
- Maintain enhanced monitoring through the defined bake period.
- Close only after acceptance; failed releases receive review and corrective tasks.
- Periodically rehearse application rollback, worker pause/replay, failed migration forward recovery, and database restore.
