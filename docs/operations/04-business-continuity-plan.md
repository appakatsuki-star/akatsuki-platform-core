# Business Continuity Plan

## Purpose

Maintain safe critical service, protect tenant/customer funds and data, and recover within approved targets during infrastructure, provider, credential, staffing, or regional disruption. Continuity does not mean every feature remains available: when truth or safety is uncertain, stop new consequential actions while preserving support, evidence, inquiry, and reconciliation.

## Business impact priorities

| Priority | Capability | Continuity objective |
|---|---|---|
| P0 | Tenant isolation, auth security, ledger integrity, audit evidence | Never trade integrity/confidentiality for availability |
| P1 | Existing payment/order inquiry, holds, provider reconciliation, security/admin kill switches | Restore first; safe read/reconcile may precede new writes |
| P2 | New deposits/orders, notifications, customer support | Restore after authoritative state and dependencies are safe |
| P3 | Catalog/branding edits, reporting, exports, noncritical admin | Can remain degraded longer |
| Excluded | Finance/transfers and autonomous AI in Phase 1 | No continuity promise because not enabled |

Final Maximum Tolerable Downtime, RPO, RTO, and degraded-mode expectations require business approval per capability.

## Dependencies and ownership

Maintain a current dependency register with primary/backup owner, vendor/account/region, support plan/contact, data class, credentials/KMS, failure mode, RPO/RTO, monitoring, manual workaround, and exit/recovery path for:

- DNS/registrar, CDN/WAF, certificate authority;
- container/compute platform and registry/CI/CD;
- PostgreSQL, Redis/queue, object storage, secret manager/KMS;
- payment, fulfillment, email/notification, malware scanner, and observability providers;
- identity/operator access and out-of-band communications;
- accounting, security, incident, provider, and customer-support personnel.

No critical dependency has an unnamed owner or undocumented support/escalation path.

## Continuity strategies

### Application/compute failure

- Recreate stateless services from immutable signed artifacts and versioned infrastructure/configuration.
- Use health checks, multiple instances/availability zones where targets require, graceful worker shutdown, and capacity limits.
- Roll back to known-good compatible application version without deleting database history.

### Database failure/corruption

- Use managed HA/failover for node failure and encrypted backup/WAL PITR for logical/region corruption.
- Freeze migrations/provider dispatch, restore isolated, validate migration journal/tenant isolation/ledger, then reconcile external effects before cutover.
- Region recovery must respect residency and have dependent secrets/storage/network/observability available.

### Queue/Redis failure

- PostgreSQL outbox/domain state remains authoritative. Rebuild transport and publish only unprocessed safe work.
- Prevent duplicate external operations with stable idempotency/inbox records and inquiry/reconciliation.
- Apply backpressure and tenant/provider fairness during backlog recovery.

### Provider outage or ambiguity

- Open circuit/disable new dispatch for affected capability while retaining inquiry/webhook/reconciliation.
- Keep internal state pending/reviewable; do not claim success or automatically retry ambiguous create.
- Failover only if duplicate prevention, compatibility, financial responsibility, and approval are proven.
- Communicate status and service promises; reconcile fully after recovery.

### Secret/KMS or account compromise

- Revoke/rotate affected secret/identity, isolate workload, switch to independently protected recovery identity/key path, and inspect access history.
- If decrypt capability is unavailable, restore it through dual-controlled provider recovery; do not invent plaintext backup copies.
- Reissue sessions/provider credentials and reconcile activity within exposure window.

### DNS/CDN/WAF failure

- Protect registrar and DNS with MFA, registry lock where available, least privilege, audit, and documented recovery contacts.
- Maintain export/versioned record of zones/configuration without secrets.
- Alternative edge/DNS is later scope unless business targets justify complexity; document expected outage and customer communication.

### Staffing/communication disruption

- Primary/backup for every critical role, out-of-band contact list, secure incident bridge, current vendor contacts, and accessible runbooks.
- Maker-checker continuity does not permit self-approval; pause the sensitive operation if independent approver is unavailable.

## Degraded-mode rules

- If database truth is unavailable: serve only explicitly safe cached public content; disable authenticated writes, deposits, orders, financial status claims, and admin changes.
- If provider state is ambiguous: show pending/review state, prevent duplicate submit, and preserve support/inquiry.
- If audit pipeline is unavailable: buffer durably only if proven; otherwise block high-risk privileged/financial operations.
- If secret/KMS validation fails: fail closed for affected integration/auth path.
- If notification fails: business transaction remains authoritative; expose status in authenticated UI and retry safely.
- Tenant/module/provider suspension matrices define which in-flight reconciliation/support actions remain allowed.

## Recovery procedure

1. Incident Commander declares continuity event, severity, affected capabilities, and safety constraints.
2. Stop conflicting deployments/migrations and risky new work; preserve evidence.
3. Choose recovery point/strategy based on authoritative data and approved RPO/RTO.
4. Restore dependencies in order: identity/access and keys, network/DNS, database, objects, telemetry/audit, queue, API/workers/web.
5. Validate infrastructure, migration journal, isolation, auth/RBAC, ledger balance/immutability, object integrity, and audit flow.
6. Reconcile payment/provider/settlement/holds/outbox/inbox; quarantine ambiguous work.
7. Restore read paths, then low-risk writes, then financial/provider dispatch with owner approvals and close monitoring.
8. Communicate recovery and residual limitations; conduct post-event review.

## Recovery validation checklist

- [ ] Recovery point and measured data loss are within approved RPO.
- [ ] Service restoration and critical journey are within approved RTO or breach is escalated.
- [ ] No cross-tenant access through database, cache, objects, jobs, exports, or domains.
- [ ] Ledger transactions balance and remain immutable; projections/control totals reconcile.
- [ ] No duplicate deposit/order/refund/provider action from replay.
- [ ] Session/credential/key integrity and revocation state are correct.
- [ ] Backup/PITR, monitoring, alerting, audit, and provider callbacks are healthy.
- [ ] All ambiguous/discrepant items have cases, owners, and deadlines.

## Exercises and maintenance

- Quarterly production-like database/object restore and ledger/replay validation is the recommended minimum.
- Twice-yearly continuity tabletop covers region/database loss and simultaneous provider/credential incident.
- Annually or after major platform/provider change, test full dependency recovery against measured RTO; more often if business targets demand.
- Monthly review backup/PITR coverage, contacts, certificates, key recovery, provider status/escalation, runbook links, and outstanding corrective actions.
- Update plan after incidents, architecture/region/provider changes, new data class, and material RPO/RTO change.

## Open decisions

- Business-approved RPO/RTO and maximum degraded duration per priority.
- Primary/recovery region and whether cross-region copies are lawful and cost-justified.
- Managed provider recovery capabilities and support tiers.
- Minimum on-call coverage and customer communication commitments.
- Whether any capability requires multi-provider/edge redundancy before MVP; default recommendation is operational recovery over premature multi-cloud complexity.
