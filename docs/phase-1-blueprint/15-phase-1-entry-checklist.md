# Phase 1 Entry Checklist

## Gate rule

Every mandatory box must have linked evidence and owner. An unchecked box, `Proposed`, `Not Decided`, “we will decide while coding,” or missing reviewer keeps Phase 1 **NO-GO**. This checklist does not mark anything complete.

## Founder and product

- [ ] Founder decisions reviewed and recorded, including country/entity, USD, provider, game/product/packages, payment/merchant model, markup/commission, cloud/budget, and exclusions.
- [ ] Exact Phase 1 scope and non-scope accepted with one reference journey and measurable exit criteria.
- [ ] First provider/payment/cloud candidates are named; examples/placeholders are replaced.
- [ ] Public launch is explicitly outside Phase 1 authorization.

## Legal and Privacy

- [ ] Launch country/entity and operating authority reviewed.
- [ ] Provider/payment terms, product rights, merchant/funds flow, refunds/disputes, and customer disclosures accepted.
- [ ] Customer identity/consent/privacy/input retention/export/deletion and backup/data region accepted.
- [ ] Prohibited markets/services and later-scope conditions recorded.

## Finance and Accounting

- [ ] One currency, precision, limits, rounding, and wallet legal meaning recorded.
- [ ] Qualified accountant signs chart of accounts and debit/credit convention.
- [ ] Posting matrix covers deposit/payment, hold, provider outcome, capture, release, refund, reversal, fees, provider cost, revenue, settlement, suspense, adjustment, and commission behavior.
- [ ] Capture timing, ambiguous provider state, price-change tolerance, markup/profit definition, and reconciliation cadence recorded.

## Security

- [ ] Production security baseline accepted by named Security owner.
- [ ] Threat model and risk register updated for selected provider/payment/cloud/product/input.
- [ ] Session/MFA/recovery, RBAC/field masking, maker-checker, tenant isolation, audit/redaction, provider credential/secret, webhook/retry, and AI-exclusion policies accepted.
- [ ] Secret Manager/KMS selected; no real secrets/customer data exist in repository, artifacts, documentation, or unsafe environments.
- [ ] Security test/evidence plan and pre-pilot assessment ownership recorded.

## Architecture and Database

- [ ] PostgreSQL/provider/catalog/pricing/order/ledger entity boundaries and module contracts accepted.
- [ ] Managed PostgreSQL version/region and database runtime/migration/read-only/monitoring/break-glass roles selected.
- [ ] Tenant composite-key/index conventions and RLS scope/evidence plan accepted.
- [ ] Migration journal, locking, checksum/drift, expand/migrate/contract, and forward recovery accepted.
- [ ] Ledger immutability/balance/hold/idempotency/concurrency database approach matches signed accounting matrix.
- [ ] Supported production Node LTS confirmed.
- [ ] Exact Fastify, Drizzle, PostgreSQL driver/server, migration, schema-validation, and test-runner versions proposed/reviewed/recorded using Phase 0.3 evidence.

## Provider and payment readiness

- [ ] Named fulfillment provider sandbox and credentials are available through approved secure process.
- [ ] Catalog sample, service/input/status/error/cost/currency/rate-limit/idempotency/inquiry matrix accepted.
- [ ] Provider legal/data/security review, operational owner, balance/outage/escalation, and rotation plan accepted.
- [ ] Named payment method/provider sandbox, merchant ownership, signed confirmation, refund, settlement/report, and reconciliation behavior accepted.

## Hosting, backup, and operations

- [ ] Hosting target, region, managed container service, managed PostgreSQL, environment topology, and budget chosen.
- [ ] Staging/production separation, network/TLS/DNS/edge, access, Secret Manager/KMS, storage, queue, and observability responsibilities accepted.
- [ ] Business RPO/RTO, PITR, encrypted backup frequency/retention, recovery account/key access, and restore owner accepted.
- [ ] Pre-launch restore rehearsal and ongoing restore schedule/acceptance checks recorded.
- [ ] Release/rollback, migration job, monitoring/alerts, audit delivery, provider operations, incident response, and continuity owners/runbooks planned.

## Test and delivery readiness

- [ ] Acceptance tests cover auth, tenant isolation, RBAC, provider catalog/mapping, pricing, ledger, order/provider lifecycle, audit, health, migration, and restore.
- [ ] Definition of done requires failure, security, observability, reconciliation, accessibility, documentation, and operations evidence.
- [ ] Named owners and reviewers have capacity; sequence and stop conditions accepted.

## Required signoff

| Signer | Status | Evidence |
|---|---|---|
| Founder/Product | Not Approved | ____ |
| Legal/Privacy | Not Approved | ____ |
| Qualified Accountant/Finance | Not Approved | ____ |
| Security | Not Approved | ____ |
| Architecture/Database | Not Approved | ____ |
| Platform/Operations | Not Approved | ____ |

## Current result

**NO-GO.** No box or signer is marked complete. The blueprint describes future work only and does not authorize Phase 1 coding.
