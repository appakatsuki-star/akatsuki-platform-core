# Phase 1 Stop Conditions

## Rule

When a stop condition occurs, stop the current ticket and do not start or continue dependent tickets. Preserve evidence, report scope/impact, assign an owner, and obtain the named human review. Do not bypass, weaken, hide, or defer a critical condition merely to keep the sprint moving.

## Immediate security and tenant stop conditions

- Any tenant isolation test reads/mutates another tenant's database row, relationship, cache, object, job/event, provider connection, export, audit, support record, or UI data.
- RBAC, field masking, MFA/step-up, maker-checker, RLS, session revocation, or trusted tenant context can be bypassed.
- Provider/payment/database/session/MFA/cloud secret or real production credential/customer dump is found in repository, history, artifact, frontend, log, job, docs, fixture, or unsafe environment.
- Audit record is missing, mutable/deletable, cross-tenant, or contains a secret/sensitive payload for a required action.
- A public/client-controlled tenant ID, price, status, permission, hidden provider field, or provider URL becomes authoritative.

**Required review:** Security owner; Database/Architecture where tenant/RLS/data is involved; Incident Response if exposure may be real.

## Immediate ledger and money stop conditions

- Ledger debit/credit does not balance, currency/tenant relationships mismatch, or exact amount rule fails.
- Posted ledger transaction/entry can be updated/deleted or immutability is disabled for test cleanup/migration.
- Any API/admin/script/AI directly mutates wallet balance or a projection becomes source of truth.
- Concurrent or duplicate action causes double spend, capture, refund, reversal, adjustment, settlement, or provider purchase.
- Hold can be captured/released twice or has contradictory terminal state.
- Posting, capture, refund, provider-cost, commission, or settlement behavior lacks/contradicts the accountant-signed matrix.
- Reconciliation/projection mismatch is silently corrected instead of becoming a case.

**Required review:** Qualified Accountant/Finance, Ledger owner, Security, Database; incident process for affected real/shared data.

## Immediate provider and order stop conditions

- Provider timeout/create outcome is unclear and no safe inquiry/idempotency behavior is proven.
- Code/UI/job proposes blind retry or automatic failover after ambiguous provider create.
- Unknown provider status is guessed as success/failure or raw provider status overwrites internal state.
- Provider order is submitted before durable idempotency/outbox intent and required financial authorization.
- Price/cost/currency/input/mapping/quote mismatch occurs between customer confirmation, order snapshot, and provider submission.
- Provider sync auto-publishes, rewrites tenant visuals/forms/prices, deletes history, or exposes raw products.
- Provider key is visible to unauthorized staff or leaves secret-managed runtime boundary.
- Provider/payment legal terms, capability, balance, service, or data blocker emerges.

**Required review:** Provider/Integration owner, Product, Security, Finance; Legal where terms/service/payment are involved.

## Database, migration, and recovery stop conditions

- Migration journal/checksum/drift/lock state is unexpected or two runners can apply concurrently.
- Migration requires destructive edit/delete of posted financial or required audit history.
- RLS pooled/worker/migration context leaks or normal runtime owns/bypasses protected tables/policies.
- Backup/PITR coverage is missing, failed, outside target, encrypted with unrecoverable key, or has no successful restore evidence.
- Restore/replay may duplicate external provider/payment/ledger effects.
- Rollback plan depends on editing/deleting posted ledger/audit data.

**Required review:** Architecture/Database, Platform/Operations, Security, Finance for financial recovery.

## Legal, finance, scope, and approval stop conditions

- Founder decision changes or remains unclear for country/entity/currency/provider/payment/product/packages/markup/commission/cloud/scope.
- Legal/Privacy identifies a country, entity, provider/payment, product-rights, wallet, customer-data, refund, retention, or residency blocker.
- Finance/Accounting changes/rejects account taxonomy, capture/settlement/refund/commission/reconciliation assumptions.
- Requested work adds SMM, transfers, FX, AI execution, stock/manual fulfillment, multiple providers/failover, mobile/public API, Kubernetes, or public launch without reopening scope approval.
- A ticket dependency, approval, or required evidence is missing.

**Required review:** Founder/Product and the named Legal/Finance/Security/Architecture/Platform owner; gate coordinator updates NO-GO status.

## Tooling and environment stop conditions

- Required Docker/resource/database/provider sandbox validation is blocked or behaves differently from the accepted environment.
- Dependency/runtime version conflict invalidates the pinned matrix or security support.
- Tests cannot run reproducibly, critical tests are flaky, or passing requires weakening assertions/control.
- Local/staging/production boundaries or credentials/data are mixed.
- Sandbox/resource/network failure prevents required evidence.

Do not work around an approval/resource restriction. Report the exact failure and request authorized remediation/escalation. A Docker/resource problem is not permission to change production design or skip validation.

## Stop report template

```text
Ticket / sprint:
Condition triggered:
Observed evidence:
Environment and version:
Tenant/data/money/provider/security impact:
Actions stopped:
Safe containment performed:
Required human reviewers:
Decision/evidence needed:
Dependent tickets blocked:
Current gate status: NO-GO / ticket stopped
```

## Resume rule

Resume only after the accountable reviewers document root cause, corrective decision/change, evidence/tests, residual risk, and explicit authorization. Re-run all affected critical and regression tests before dependent work proceeds.
