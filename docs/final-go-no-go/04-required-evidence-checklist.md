# Required Evidence Checklist

## Rule

No checkbox is complete in this document. Evidence must be dated, linked, owned, and reviewed. A statement such as “standard practice” or “we will decide while coding” is not evidence.

## Founder and scope

- [ ] Founder decision signoff for country/entity, USD, provider/product/packages, payment/merchant model, pricing/commission, hosting/budget, and exclusions.
- [ ] Signed Phase 1 scope/non-scope and reference acceptance journey.
- [ ] Explicit statement that internal MVP build is not public production launch.

## Legal and Privacy

- [ ] Legal/Privacy review notes signed by named reviewer.
- [ ] Provider/payment/product rights and contract conditions.
- [ ] Merchant/funds/wallet responsibility memo.
- [ ] Customer terms, refund/dispute/complaint and consent/privacy rules.
- [ ] Data/input classification, retention, export/delete, residency, backup/subprocessor rules.

## Finance and Accounting

- [ ] Qualified accountant-signed chart of accounts/debit-credit convention.
- [ ] Numeric posting examples for deposit/payment, hold, provider outcome, capture, release, refund, reversal, provider cost, revenue, fees, settlement, suspense, adjustment, and commission-disabled behavior.
- [ ] USD precision, limits, rounding, negative-balance, price/profit terminology, and reconciliation policy.

## Security

- [ ] Security baseline acceptance by named Security owner.
- [ ] Selected provider/payment/cloud/input threat/risk update.
- [ ] Session/MFA/recovery and RBAC/maker-checker/field-masking matrices.
- [ ] Tenant isolation/RLS negative-test plan.
- [ ] Secret Manager/KMS selection, credential access/rotation/revocation plan.
- [ ] Audit event/redaction/retention/access/alert plan.
- [ ] Evidence that no real secret/customer dump exists in repository, history, docs, artifacts, or unsafe environment.

## Architecture, database, and runtime

- [ ] Accepted module/data/API/event contracts.
- [ ] Managed PostgreSQL provider/version/region and role/grant design.
- [ ] Tenant key/index/relationship and RLS scope/evidence plan.
- [ ] Migration journal/lock/checksum/drift/expand-migrate-contract/forward-recovery policy.
- [ ] Production Node LTS confirmed.
- [ ] Exact Fastify, Drizzle, PostgreSQL driver/server, migration, validation, and test versions recorded.
- [ ] Phase 0.3 migration limitation explicitly excluded from production tooling.

## Provider and payment

- [ ] Fulfillment provider selected and named.
- [ ] Provider sandbox credentials available through approved secure process.
- [ ] Catalog/service/input/status/error/cost/currency/rate-limit/idempotency/inquiry capability matrix.
- [ ] Provider terms/data/security review and operational contacts/runbook.
- [ ] Payment method/provider selected and named.
- [ ] Payment sandbox, merchant ownership, signed confirmation/inquiry, refund/settlement/reconciliation evidence.

## Hosting and operations

- [ ] Hosting target, cloud/region, managed container service, managed PostgreSQL, budget, and environment diagram selected.
- [ ] Staging/production separation and access/responsibility matrix.
- [ ] Secret/storage/queue/observability/edge/TLS decisions.
- [ ] RPO/RTO, PITR, encrypted backup/retention/key/recovery assumptions recorded.
- [ ] Restore-test owner, schedule, and acceptance checklist.
- [ ] Release/rollback/migration/worker/provider-replay/monitoring/incident/continuity plans.

## Repository and sprint entry

- [ ] Repository status is reviewed and clean of unintended changes before the first authorized coding ticket; intended documentation commits are identified separately.
- [ ] Secret scan and sensitive-file review are clean.
- [ ] Sprint 0 is completed with all required signatures and no blocking exception.
- [ ] First coding request names only Sprint 1 or one selected ticket and follows the command rules.

## Signoff status

| Required owner | Current status | Evidence |
|---|---|---|
| Founder/Product | Not Approved | ____ |
| Legal/Privacy | Not Approved | ____ |
| Qualified Accountant/Finance | Not Approved | ____ |
| Security | Not Approved | ____ |
| Architecture/Database | Not Approved | ____ |
| Platform/Operations | Not Approved | ____ |

**Current gate: NO-GO.**
