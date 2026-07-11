# Sprint 0 — Preflight and Approval

## Purpose

Close every Phase 1 entry blocker before production code starts. Sprint 0 is a decision/evidence gate, not an implementation sprint.

## Entry status

Current status: **Not entered / NO-GO**. Founder answers remain proposed and required specialist signoffs are missing.

## Required checks

### Founder and product

- [ ] Founder reviews country/entity, USD, provider, Games/PUBG/packages, payment/merchant model, pricing/commission, hosting/budget, and exclusions.
- [ ] Exact MVP scope/non-scope and one reference journey are accepted.
- [ ] All placeholders for provider, payment, legal entity, cloud, region, and supported versions are replaced.

### Legal and Privacy

- [ ] Launch country/entity and operating authority are confirmed.
- [ ] Provider/payment terms, product rights, merchant/funds flow, refund/dispute/customer disclosures are accepted.
- [ ] Identity/consent/input retention/export/deletion and backup/data region are accepted.
- [ ] Prohibited services/markets and later-scope requirements are recorded.

### Finance and Accounting

- [ ] USD precision/limits/rounding/wallet meaning are recorded.
- [ ] Qualified accountant signs chart of accounts and posting matrix.
- [ ] Hold/capture/release/refund/reversal/provider cost/revenue/fees/settlement/suspense and commission-disabled behavior are covered.
- [ ] Provider ambiguity, price change, reconciliation cadence, and profit terminology are accepted.

### Security

- [ ] Security baseline and selected-provider/payment/cloud threat updates are accepted.
- [ ] Sessions/MFA/recovery, RBAC/maker-checker, tenant isolation, audit/redaction, credentials/webhooks/retry, and AI exclusion are accepted.
- [ ] Secret Manager/KMS approach is selected and no real secret/customer data exists in repository/docs/artifacts.

### Architecture, database, and runtime

- [ ] Module/entity/API boundaries and RLS/database-role/migration approach are accepted.
- [ ] Managed PostgreSQL/version/region and hosting target are chosen.
- [ ] Production Node LTS and exact Fastify/Drizzle/driver/migration/validation/test versions are confirmed.
- [ ] Phase 0.3 evidence and limitations are reflected; disposable bootstrap is excluded.

### Provider, payment, and operations

- [ ] Named provider sandbox/capability/status/input/error/idempotency/inquiry evidence exists.
- [ ] Named hosted payment sandbox, signed confirmation, merchant ownership, refund/settlement evidence exists.
- [ ] Staging/production topology, RPO/RTO, PITR/backups/restore owner, monitoring/release/incident ownership are chosen.

## Sprint 0 evidence package

- Founder decision record.
- Legal/Privacy memo.
- Accountant-signed chart and posting examples.
- Security signoff and evidence plan.
- Architecture/Database signoff and pinned version matrix.
- Platform/Operations hosting/recovery decision.
- Provider/payment capability reviews.
- Signed Phase 1 entry GO/NO-GO record.

## Acceptance criteria

- Every entry checklist blocker has an owner, final answer, evidence link, and required signature.
- No blocking exception, placeholder, or “decide during coding” remains.
- Phase 1 scope and stop conditions are acknowledged.
- Final result is explicitly recorded by all required signers.

## Do not do

- Do not scaffold apps, install dependencies, run Docker, create databases, provision cloud, or call providers.
- Do not mark GO because documentation exists; evidence and signatures are required.
- Do not let founder approval substitute for legal/accounting/security/technical approval.

## Current result

**NO-GO.** Sprint 1 cannot start.
