# Open Questions and Risk Register

## Scoring and handling

- **Impact:** Critical, High, Medium, or Low.
- **Likelihood:** High, Medium, or Low based on current uncertainty, not false numeric precision.
- A risk marked `Yes` is a Phase 1 blocker until its mitigation evidence is approved or the affected capability is removed from MVP.
- The named owner is accountable for resolution; `TBD` itself keeps a blocking risk open.

## Risk register

| ID | Risk / open question | Impact | Likelihood | Mitigation / closure evidence | Owner | Phase 1 blocker? |
|---|---|---|---|---|---|---|
| R-001 | Launch jurisdiction or legal entity is undefined | Critical | High | Approve countries, entity, prohibited markets, legal responsibilities | Product + Legal | Yes |
| R-002 | Merchant/settlement ownership is unclear | Critical | High | Approved funds-flow diagram and provider/accounting contract | Finance + Legal | Yes |
| R-003 | First MVP module remains undecided, causing scope expansion | High | High | Select exactly one reference fulfillment path and freeze acceptance criteria | Product | Yes |
| R-004 | Payment or fulfillment provider lacks required idempotency/inquiry behavior | Critical | Medium | Capability assessment, sandbox test plan, ambiguous-outcome reconciliation | Integration owner | Yes |
| R-005 | Provider terms prohibit intended SMM/digital service or data use | Critical | Medium | Contract/terms review and approved service allowlist | Legal + Product | Yes |
| R-006 | Wrong ledger account taxonomy produces balanced but economically incorrect books | Critical | High | Qualified accountant approves chart and posting matrix | Finance/accounting | Yes |
| R-007 | Duplicate/concurrent operations create double funding, spending, refund, or fulfillment | Critical | Medium | Idempotency uniqueness, locking/order policy, concurrency tests, reconciliation | Engineering + Finance | Yes |
| R-008 | Mutable balance/projection becomes treated as source of truth | Critical | Medium | No balance mutation API; immutable postings; rebuild/verification tests | Ledger owner | Yes |
| R-009 | Shared-database query leaks data across tenants | Critical | Medium | Mandatory tenant repositories/composite keys, RLS decision, broad negative tests | Security + Database | Yes |
| R-010 | RLS is misconfigured or pooled tenant context leaks between requests/jobs | Critical | Medium | Executable pooling/worker/migration tests and non-bypass runtime role | Database + Security | Yes |
| R-011 | Production migration rerun/concurrency fails due to missing journal | High | High | Drizzle migration journal, lock/checksum/drift policy, production-like rehearsal | Database owner | Yes |
| R-012 | Destructive migration or rollback corrupts financial history | Critical | Medium | Expand/migrate/contract, immutable ledger protections, forward recovery, backup restore | Database + Release | Yes |
| R-013 | Backup exists but cannot restore within business target | Critical | Medium | Approved RPO/RTO, PITR, quarterly rehearsal with ledger/isolation validation | Platform + Business | Yes |
| R-014 | Backup key/account shares the same failure domain as production | Critical | Medium | Separate account/role, managed keys and tested break-glass key recovery | Security + Platform | Yes |
| R-015 | Hosting/region choice violates residency or has inadequate managed controls | High | Medium | Hosting decision mapped to jurisdiction, HA, PITR, encryption, support lifecycle | Platform + Legal | Yes |
| R-016 | Secrets leak through source, CI, logs, jobs, or preview environments | Critical | Medium | Managed secret store, scanning, redaction, environment isolation, rotation drill | Security owner | Yes |
| R-017 | Account recovery bypasses admin MFA | Critical | Medium | Approved recovery proof, dual control for privileged recovery, session revocation | Security owner | Yes |
| R-018 | RBAC role permits privilege escalation or self-approval | Critical | Medium | Permission/delegation matrix, maker-checker identity separation, negative tests | Security + Product | Yes |
| R-019 | Audit logs are editable, incomplete, or contain sensitive data | High | Medium | Event catalog, append-only access, centralized copy, redaction and alert tests | Security + Operations | Yes |
| R-020 | Payment callback is forged, replayed, or trusted from browser redirect | Critical | Medium | Signature/timestamp/replay verification, provider query, size/rate controls | Payment owner | Yes |
| R-021 | Ambiguous provider timeout causes duplicate external order | High | High | Inquiry-first policy, stable idempotency reference, manual reconciliation | Integration owner | Yes |
| R-022 | Queue/Redis loss or retry storm delays fulfillment | High | Medium | PostgreSQL outbox, bounded retries, DLQ, per-tenant/provider limits, runbook | Platform + Engineering | No; close before async path merge |
| R-023 | Upload or signed URL exposes digital/support data | High | Medium | Private storage, scoped short TTL, scan/checksum, ownership tests | Security + Storage owner | No; blocker if uploads enter MVP |
| R-024 | Logs/traces expose credentials, personal data, payment data, or digital goods | Critical | Medium | Data classification, structured allowlist logging, automated redaction tests | Security + Engineering | Yes |
| R-025 | No alert/on-call owner responds to financial/security anomaly | High | Medium | Severity matrix, named rotation/escalation, alert drills and runbooks | Operations owner | Yes |
| R-026 | Unsupported Node/dependency version reaches production scaffolding | High | Medium | Pin supported Node LTS/core versions with security lifecycle | Architecture owner | Yes |
| R-027 | Manual deposits/adjustments enable insider fraud | Critical | Medium | Exclude from MVP or require evidence, thresholds, maker-checker, audit | Finance + Product | Yes if included |
| R-028 | Tenant suspension abandons pending money/orders | High | Medium | Reason-specific suspension matrix and reconciliation-safe completion paths | Product + Operations | Yes |
| R-029 | AI leaks tenant data or executes consequential action | Critical | Low if disabled | Disable in MVP; strict separate pilot gate and no direct tools | Security + Product | Yes unless explicitly excluded |
| R-030 | Finance/Transfers enters MVP without licensing/compliance controls | Critical | Low | Explicitly exclude and keep module unavailable | Executive + Legal | Yes unless excluded |
| R-031 | Object/database retention conflicts with deletion or legal-hold duties | High | Medium | Data inventory, retention schedule, backup expiry and legal process | Legal + Data owner | No; minimum policy before personal data merge |
| R-032 | One tenant exhausts shared database/provider/queue capacity | High | Medium | Tenant quotas, tenant-leading indexes, query budgets, concurrency partitioning | Platform + Engineering | No; define initial limits during Phase 1 |
| R-033 | Restore replays stale external actions or duplicate outbox work | Critical | Medium | Recovery cutover procedure, queue pause, reconciliation, idempotent consumers | Platform + Engineering | Yes |
| R-034 | Break-glass/support access becomes an unaudited tenant bypass | Critical | Medium | Time-bound approval, least privilege, visible audit, post-use review | Security owner | Yes |

## Highest-priority open questions

1. What legal entity, launch countries, and one currency define the MVP boundary?
2. Which one fulfillment module/provider and which payment method/provider are the reference path?
3. Does the platform or each tenant own merchant/provider accounts and customer funds liability?
4. What chart of accounts and exact posting examples does the accounting owner approve?
5. What managed PostgreSQL/hosting region, database role design, and RLS scope are approved?
6. What business RPO/RTO, backup provider, retention, and recovery-region design apply?
7. What permission matrix, MFA/recovery policy, and maker-checker thresholds apply?
8. Is AI formally excluded from Phase 1? The recommended answer is yes.

## Review rule

Review blocking risks at every Phase 0.5 meeting and before Phase 1 authorization. During Phase 1, review all risks weekly, after an incident/provider change, and before a high-risk feature merge. Closed risks remain in the register with links to evidence and residual risk; they are not deleted.
