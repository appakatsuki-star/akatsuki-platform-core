# MVP Critical Decisions

> **Historical decision packet / first-module section superseded.** The original SMM-or-digital-product selection below predates the current proposed provider-backed game top-up path. Use `docs/00-current-source-of-truth.md`, `docs/decisions/03-recommended-mvp-path.md`, and the final GO/NO-GO and Phase 1 planning documents for current scope. This document remains evidence of earlier open questions; it grants no approval.

## Purpose

This is the minimum decision packet required before writing production code. It narrows broad product questions into nine signed decisions. Recommended defaults are proposals, not approvals.

## Decision packet

### MVP-01 — First MVP module

- **Must decide:** minimal SMM fulfillment or one digital-product fulfillment type.
- **Recommended selection method:** choose the path with lawful operation, sandbox availability, deterministic testability, reliable inquiry/idempotency, and lowest irreversible-data risk.
- **Required detail:** allowed offer type, customer input, success/failure/partial rules, capture/refund timing, provider owner, and one end-to-end acceptance case.
- **Explicit boundary:** selecting one does not include the complete module or the other module.
- **Approver:** Product owner, with Security/Finance review.

### MVP-02 — First fulfillment provider

- **Must decide:** provider/legal name, product capability, tenant-vs-platform connection ownership, sandbox and production availability.
- **Required evidence:** terms/data review; status map; idempotency/inquiry/cancel/refund/webhook/rate-limit matrix; incident and support contacts; credential rotation plan.
- **Reject provider if:** ambiguous create outcomes cannot be reconciled safely or intended service violates terms.
- **Approver:** Product + Integration + Security.

### MVP-03 — First payment method

- **Must decide:** one hosted/tokenized method/provider, supported country/currency, merchant account owner, confirmation source, fees, refunds, settlement, and dispute liability.
- **Required evidence:** signed webhook/query controls, sandbox flow, settlement report sample, retry/reconciliation rules, and funds-flow diagram.
- **Recommended boundary:** no raw card storage, no browser redirect as payment truth, no withdrawal/FX/split tender.
- **Approver:** Finance + Legal + Product + Security.

### MVP-04 — Supported countries and currencies

- **Must decide:** legal operating entity, customer/tenant launch countries, prohibited locations, one ISO currency, precision, minimum/maximum amount, and data region.
- **Required evidence:** legal/compliance note and accounting amount policy.
- **Recommended boundary:** one tenant/customer wallet currency, no conversion.
- **Approver:** Executive/Product + Legal + Finance.

### MVP-05 — Admin roles and permissions

- **Must decide:** Super Admin, Tenant Admin, launch Agent templates, non-delegable permissions, field masking, high-risk actions, maker-checker thresholds, and break-glass access.
- **Required evidence:** actor/action/resource matrix with allow/deny and tenant/module/state conditions.
- **Recommended boundary:** fixed roles plus limited safe Agent customization; no implicit Super Admin tenant bypass.
- **Approver:** Product + Security.

### MVP-06 — Customer onboarding rules

- **Must decide:** global-vs-tenant customer identity, email verification checkpoints, self-registration control, terms/consent versions, minimum age/eligibility if applicable, recovery, and any provider-required verification.
- **Required evidence:** state diagram and abuse/recovery cases.
- **Recommended boundary:** email/password, verified email before deposit/order, opaque session, no social login/SSO in MVP.
- **Approver:** Product + Security + Legal/Privacy.

### MVP-07 — Ledger posting rules

- **Must decide:** approved chart of accounts; debit/credit convention; customer liability; payment clearing/settlement; tenant revenue; provider cost; fees; suspense; holds; capture/release; refund; reversal; manual adjustment; negative balance; rounding; and reconciliation cadence.
- **Required evidence:** qualified accountant-signed posting matrix containing balanced numeric examples for every MVP money event.
- **Required security:** immutable posted entries, direct balance mutation prohibited, idempotency and business references, maker-checker for defined adjustments.
- **Approver:** Qualified accounting owner + Finance + Engineering.

### MVP-08 — Backup provider and recovery targets

- **Must decide:** managed database backup/PITR capability, backup location/account, encryption/key owner, retention, RPO, RTO, restore-test frequency, and object/audit/config recovery.
- **Recommended starting target for review:** database PITR with an RPO of 15 minutes or better; daily retained backups; quarterly full restore rehearsal; recovery target sized from an actual pilot restore. Business owners must approve final numbers.
- **Required evidence:** provider feature evidence, restore runbook, scheduled test owner, and restore validation checklist.
- **Approver:** Business owner + Platform + Security.

### MVP-09 — Hosting target

- **Must decide:** cloud/provider, region, managed container service, managed PostgreSQL, Redis, object storage, secret manager/KMS, DNS/CDN/WAF, monitoring, and environment/account topology.
- **Recommended boundary:** separate staging and production accounts/projects, managed PostgreSQL with HA/PITR, managed secret store, TLS everywhere, private data services, immutable artifacts, no day-one Kubernetes unless team evidence justifies it.
- **Required evidence:** architecture/data-flow diagram, service responsibility matrix, costs/support limits, access model, and rollback design.
- **Approver:** Platform + Architecture + Security + Business owner.

## Additional blocking technical decisions

The nine product/operating decisions above also require:

- Supported production Node LTS and pinned Fastify/Drizzle/PostgreSQL driver/migration versions.
- PostgreSQL runtime/migration/break-glass roles and an accepted RLS scope.
- Migration journal, locking, drift detection, and expand/migrate/contract policy.
- Session storage, idle/absolute expiry, MFA/recovery parameters.
- Secret manager and audit-log retention/integrity model.

## Approval template

Copy this block for each decision; do not edit history after approval:

```text
Decision ID:
Selected option:
Effective date:
Scope and exclusions:
Evidence links:
Risks accepted:
Accountable owner:
Required reviewers:
Approval status: Approved | Rejected | Needs revision
Supersedes:
```

## Start rule

Phase 1 production code may start only after MVP-01 through MVP-09 and all additional blocking technical decisions are approved, the readiness checklist is `GO`, and the authorization record links the exact evidence set. A prototype, dependency choice, or prior validation run does not substitute for this authorization.
