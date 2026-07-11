# Phase 1 Readiness Gate

## Gate outcome

The only valid outcome is **GO** or **NO-GO**. Phase 1 may start only when every mandatory condition below is evidenced and signed by its accountable owner. Conditional approval, an undocumented exception, or “resolve while coding” is `NO-GO` for a blocking item.

Phase 0.3 passed runtime validation. Its disposable database and migration limitation are recorded evidence, not production readiness.

## Required sign-off record

| Field | Required value |
|---|---|
| Review date | Recorded date |
| Product owner | Name and GO/NO-GO |
| Security owner | Name and GO/NO-GO |
| Finance/accounting owner | Name and GO/NO-GO |
| Architecture/database owner | Name and GO/NO-GO |
| Platform/operations owner | Name and GO/NO-GO |
| Open exceptions | None for blocking conditions |
| Evidence links | Decision IDs, ADRs, matrices, and runbooks |
| Final outcome | GO only if all mandatory reviewers approve |

## 1. Product scope gate

- [ ] DEC-001–009 are approved.
- [ ] One first fulfillment module—minimal SMM or one digital-product type—is selected; both are not implicitly included.
- [ ] One payment/deposit path and one fulfillment provider are named with sandbox access and operational owners.
- [ ] Countries, one MVP currency, legal entity, merchant/settlement model, customer verification, and refund boundaries are written.
- [ ] MVP inclusions, exclusions, user journeys, quotas, acceptance criteria, and Phase 1 exit criteria are signed.
- [ ] Finance/transfers, autonomous AI, FX, withdrawals, peer-to-peer transfers, and runtime tenant plugins are explicitly excluded.

**Evidence:** approved `04-mvp-critical-decisions.md`, product scope, provider/payment assessment, jurisdiction note.

## 2. Security gate

- [ ] Production threat model covers account takeover, cross-tenant access, privilege escalation, webhook/payment fraud, provider compromise, ledger abuse, upload/template risks, supply chain, backups, and operator access.
- [ ] Security baseline is accepted: deny by default, least privilege, input/output validation, rate limiting, CSRF/security headers, encryption, redaction, and no secret in source.
- [ ] RBAC permission matrix, non-delegable actions, maker-checker thresholds, admin MFA, and break-glass procedure are approved.
- [ ] Security ownership, vulnerability triage/patch targets, pre-pilot assessment, and pre-production penetration-test requirement are assigned.
- [ ] Tenant isolation negative-test matrix includes HTTP, repositories, raw SQL, caches, objects, jobs, events, webhooks, exports, audit queries, and support tooling.

**Evidence:** security baseline, threat model, permission matrix, security test plan, incident plan.

## 3. Database gate

- [ ] Managed PostgreSQL target, supported version, region, HA expectation, encryption, connection limits, and maintenance ownership are approved.
- [ ] Runtime, migration, read-only/analytics, backup, and break-glass roles have a least-privilege matrix; the runtime role cannot own schemas/tables or bypass controls.
- [ ] Every tenant-owned table requires non-null `tenant_id`; tenant-aware composite relationships, uniqueness, and tenant-leading indexes are the default.
- [ ] RLS scope is decided and validated with pooling, workers, migrations, maintenance, and fail-closed tenant context.
- [ ] Production migration runner uses a journal, advisory/concurrency control, checksum/drift policy, reviewed SQL, and expand/migrate/contract.
- [ ] Foreign keys, exact amount types, check constraints, append-only records, deletion policy, and audit strategy are documented.

**Evidence:** database checklist, accepted ADR 0004/0011 disposition, role matrix, RLS report, migration policy.

## 4. Ledger/accounting gate

- [ ] A qualified accounting owner approves chart of accounts, debit/credit convention, customer liability, clearing, settlement, revenue, fees, refunds, and suspense.
- [ ] Posting matrix covers deposit confirmation, hold, capture, release, refund, reversal, manual adjustment, provider cost, and reconciliation.
- [ ] One currency's precision, maximum amounts, rounding, negative-balance policy, and balance meanings are approved.
- [ ] Posted transactions/entries are immutable; correction uses linked reversal/replacement; no direct balance mutation exists.
- [ ] Idempotency scope, concurrency/locking, balancing enforcement, projection rebuild, and maker-checker thresholds have executable acceptance cases planned.

**Evidence:** signed accounting memo, posting matrix, ledger security checklist, concurrency test plan.

## 5. API provider gate

- [ ] Payment and fulfillment providers have owners, sandbox credentials, data-flow classification, contractual/terms review, and exit/failure contacts.
- [ ] Capability matrix documents idempotency, inquiry, cancellation, refund, status polling, signed webhook, rate limits, timeouts, and ambiguous-outcome behavior.
- [ ] Credentials use the selected secret manager/encrypted store with tenant/environment scope and rotation.
- [ ] Normalized statuses/errors, retry classes, circuit breaker, reconciliation, manual disable, and dead-letter procedures are specified.
- [ ] Browser redirects are never accepted as payment truth; webhook/query verification is required.

**Evidence:** provider assessments, capability matrix, adapter contract plan, credential and incident runbooks.

## 6. Deployment gate

- [ ] Hosting target, region, production/staging account separation, DNS/TLS, network boundaries, and managed dependencies are approved.
- [ ] CI/CD promotes immutable reviewed artifacts; production credentials are not available to untrusted builds or preview environments.
- [ ] API, worker, web, and migration job have independent health, rollout, graceful-shutdown, and rollback requirements.
- [ ] Release plan defines backward-compatible database changes, migration order, approval, canary/rolling strategy, and stop conditions.
- [ ] Production access requires SSO/MFA or equivalent strong control, named roles, and audited break-glass access.

**Evidence:** hosting requirements, environment diagram, release/rollback plan, access matrix.

## 7. Backup/recovery gate

- [ ] Business-approved RPO and RTO exist for database, object data, configuration/secrets, and audit evidence.
- [ ] Managed encrypted backups and continuous WAL/PITR meet the target; backup location/account/region reduces correlated failure.
- [ ] Retention, legal hold, key recovery, deletion, and restore authorization are defined.
- [ ] A production-like restore rehearsal plan verifies integrity, ledger balance, tenant isolation, migration level, and application startup.
- [ ] A failed migration and failed deployment have forward-recovery/rollback procedures that do not mutate posted financial history.

**Evidence:** backup plan, provider capability evidence, restore checklist and scheduled rehearsal owner.

## 8. Audit/logging gate

- [ ] Audit event catalog covers authentication, sessions/MFA, permissions, tenant/module lifecycle, secrets/providers, financial commands, refunds/adjustments, exports, impersonation, and break-glass.
- [ ] Audit records include actor/system principal, tenant, action, target, outcome, reason, correlation, time, and safe before/after references.
- [ ] Audit and security logs are append-only/tamper-evident to application roles, access-controlled, retained, searchable, and time-synchronized.
- [ ] Logs/traces/jobs redact credentials, tokens, personal/payment data, digital goods, and beneficiary data.
- [ ] Alert rules, severity, owner, acknowledgement, escalation, and test cadence are defined.

**Evidence:** observability/audit plan, event matrix, redaction tests, alert/runbook catalog.

## 9. AI automation gate

- [ ] AI is explicitly disabled/excluded from Phase 1 MVP, **or** a separate suggestion-only pilot is approved.
- [ ] No model has direct database, shell, secret, unrestricted network, provider, financial, permission, or messaging authority.
- [ ] Any pilot has tenant opt-in, approved data classes, human review, redaction, budget/rate limits, evaluations, audit, and kill switches.
- [ ] Autonomous consequential actions remain prohibited and Finance/Transfers cannot be operated or approved by AI.

**Evidence:** DEC-029 disposition and, only if applicable, approved AI pilot assessment.

## Automatic NO-GO conditions

- Any blocking decision remains `Open`, `Proposed`, or lacks an accountable owner/evidence.
- No qualified accounting approval exists for ledger semantics.
- Launch jurisdiction, payment/merchant model, or provider is unknown.
- Production secrets, backups, RPO/RTO, hosting target, database role model, or RLS scope are undecided.
- The plan depends on direct balance mutation, unsigned/unverified payment callbacks, shared production credentials, or tenant scope supplied only by clients.
- A requested Phase 1 scope includes Finance/Transfers or autonomous AI without a separately approved later-phase gate.

## Gate review procedure

1. Register owner freezes the candidate decision/evidence set 24 hours before review.
2. Each owner checks only evidence, not intention or future promises.
3. Failed items receive an owner, corrective deliverable, and review date; Phase 1 remains unauthorized.
4. The signed outcome is stored next to this gate. Changes to a critical decision require impact review and possible gate re-run.
