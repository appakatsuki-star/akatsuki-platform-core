# Incident Response Plan

## Purpose and scope

Provide a repeatable response for security, privacy, tenant-isolation, authentication, financial/ledger, provider, data-loss, secret, supply-chain, and availability incidents. Safety, evidence preservation, tenant isolation, financial integrity, and lawful notification take precedence over restoring traffic blindly.

## Roles

| Role | Responsibility |
|---|---|
| Incident Commander (IC) | Owns severity, priorities, decisions, cadence, and closure |
| Security Lead | Investigation, containment, evidence, credentials, threat assessment |
| Technical Lead | Service/database/provider diagnosis and safe remediation |
| Finance/Ledger Lead | Freezes/reconciles money flows and approves financial recovery |
| Operations/SRE Lead | Traffic, deployment, backup/restore, monitoring, vendor coordination |
| Communications Lead | Internal, tenant/customer, provider, regulator/legal communication |
| Scribe | Immutable timeline, decisions, evidence pointers, actions, owners |
| Legal/Privacy | Notification duties, privilege, regulator/law-enforcement guidance |

Named primary/backup contacts and secure out-of-band communication channels must exist before production.

## Severity

| Severity | Examples | Initial response target |
|---|---|---|
| SEV-1 Critical | Confirmed cross-tenant disclosure, active account takeover of privileged role, financial integrity compromise, production secret/key compromise, unrecoverable primary outage | Immediate page; IC within 15 minutes target |
| SEV-2 High | Material provider/payment outage, suspected contained disclosure, failed backups beyond RPO coverage, widespread auth failure | Page; IC within 30 minutes target |
| SEV-3 Medium | Limited degradation, isolated failed job/reconciliation ageing, low-risk vulnerability with no exploitation | Same business/on-call process |
| SEV-4 Low | Informational anomaly or minor defect with workaround | Planned triage |

Targets are proposals until business/on-call coverage is approved. Severity may increase as evidence changes.

## Response lifecycle

### 1. Detect and declare

1. Record reporter/alert, time, affected environment/tenant/service, indicators, and correlation IDs.
2. On-call assesses severity without accessing unnecessary customer data.
3. Declare incident, name IC/scribe, open restricted incident channel/timeline, and page required roles.
4. Do not paste secrets, raw personal/payment data, or digital goods into chat/tickets.

### 2. Contain

- Prefer reversible scoped controls: revoke session/credential, disable provider/module, block route/IP/actor, pause worker/queue, freeze deployment, or isolate tenant/workload.
- For suspected financial compromise, stop new postings/provider dispatch only as narrowly as safe; preserve reconciliation/support and do not mutate history.
- For cross-tenant risk, disable affected access path globally if tenant scope cannot be proven.
- For secret compromise, revoke/rotate—not merely delete from logs/source—and review access/use since earliest exposure.
- Preserve logs, database snapshots, provider evidence, artifact hashes, and volatile context under chain-of-custody/access policy.

### 3. Investigate and eradicate

- Establish earliest/latest affected time, attack/failure path, affected actors/tenants/data/money, and persistence.
- Use read-only evidence where possible; every production/break-glass access is logged.
- Remove root cause, compromised identities/secrets/artifacts, unsafe jobs, and unauthorized persistence.
- Search for related indicators across tenants/environments without assuming one alert is complete.
- Security and Finance leads approve eradication for their domains.

### 4. Recover

- Restore known-good artifacts/config/data using the business-continuity procedure.
- Before workers resume, reconcile provider outcomes, payment settlement, ledger balance, holds, inbox/outbox, and queued retries to prevent duplicate external effects.
- Validate tenant isolation, authentication, permissions, audit delivery, backups, and critical user journeys.
- Restore traffic gradually with enhanced monitoring and explicit IC approval.
- Maintain rollback/kill switch and communicate current risk/status.

### 5. Notify and close

- Legal/Privacy determines contractual, tenant/customer, regulator, insurer, provider, and law-enforcement notices and deadlines.
- Communications are factual, approved, audience-specific, and updated on a fixed cadence; never speculate or expose another tenant.
- Closure requires stable recovery, reconciled financial/data impact, evidence retention, known residual risk, and owners/dates for corrective actions.

## Scenario playbooks

### Cross-tenant access

- Disable the affected route/query/export/object/job path; preserve request/database/audit evidence.
- Determine read vs mutation, data classes, tenants, actors, and time range.
- Invalidate exposed signed URLs/exports/sessions as required and test equivalent paths.
- Do not rely only on fixing the reported identifier; review repository/RLS/context boundary.

### Ledger/payment anomaly

- Pause affected posting/provider path; never edit/delete posted entries.
- Reconcile idempotency keys, attempts, callbacks, clearing/settlement, holds, refunds, and provider source.
- Correct only through approved reversal/replacement/manual adjustment with maker-checker and incident reference.

### Provider credential compromise/outage

- Disable new dispatch, revoke/rotate credentials and webhook secrets, contact provider, and preserve access logs.
- Inquiry/reconcile in-flight external IDs before retries or failover.
- Assess tenant/data/financial blast radius and notify owners.

### Database/data loss or corruption

- Freeze migrations/writes as appropriate; preserve corrupted copy/evidence.
- Choose trusted PITR point, restore isolated, validate ledger/isolation/migration journal, and reconcile external actions before cutover.

### Supply-chain compromise

- Stop promotion/deployments, identify affected artifact/dependency/action/key, revoke publishing/deployment credentials, and roll to a verified signed artifact.
- Review SBOM, build provenance, runtime indicators, and all environments.

## Evidence and communications

- Timeline records timestamps in UTC, actor, action/decision, reason, command/change reference, outcome, and evidence link.
- Evidence storage is encrypted, access-controlled, integrity-protected, retained per legal/security policy, and separate from casual collaboration tools.
- Only Communications/Legal-designated roles issue external statements.
- Tenant-specific updates reveal only that tenant's impact unless law requires otherwise.

## Exercises and improvement

- Conduct tabletop exercises at least twice yearly and before public launch for cross-tenant leak, ledger/provider duplicate, secret compromise, and database recovery.
- Run technical restore and credential-rotation drills on their planned cadence.
- Complete blameless post-incident review for SEV-1/2 with root causes, control failures, detection gaps, timeline, corrective actions, owners, due dates, and verification.
- Update threat model, risk register, tests, alerts, runbooks, and training; track corrective actions to evidence-based closure.
