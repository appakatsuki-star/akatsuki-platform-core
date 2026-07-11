# Remaining NO-GO Items

## Current position

The proposed answers make the preferred direction clearer, but **Phase 1 remains NO-GO**. A proposal is not evidence and is not an approval.

## Founder can decide

- Confirm Lebanon or select another single launch country.
- Name the operating legal entity candidate.
- Confirm USD-only MVP.
- Select the fulfillment provider candidate and first PUBG/game service.
- Confirm Games, PUBG Mobile, and the first package list.
- Select the payment provider/method candidate.
- Choose tenant-owned versus platform-owned merchant direction, subject to Legal/Finance.
- Confirm onboarding and MVP exclusions.
- Confirm 0% silent provider cost-change tolerance.
- Choose default tier name and commercial markup target.
- Confirm that agent commission is disabled for the first pilot, or request the 1% simple alternative.
- Decide who may see provider cost/profit and who confirms publication.
- Select cloud/region/budget candidates and accept proposed RPO/backup/restore targets.

Until the founder records these choices, corresponding items remain `Needs founder review`.

## Needs Legal/Privacy review

- Launch country and legal entity authority.
- Provider game/service resale terms, trademarks/visuals, data use, retention, support, breach notice, and customer disclosures.
- Payment provider availability, merchant ownership, funds flow, refunds, disputes, reserves, and chargeback liability.
- Legal meaning of USD wallet value and whether the proposed model creates stored-value/custody obligations.
- Customer terms, verification, privacy/consent, age/eligibility where relevant, complaint/refund rights.
- Retention, export/deletion, backup region, and personal/provider input handling.
- Any later email/password provider input, stock/code resale, manual fulfillment, SMM, or transfer service.

Required evidence: named reviewer and signed memo listing permitted scope, conditions, and prohibited markets/services.

## Needs Finance/Accounting review

- USD precision, minimum/maximum/velocity limits, rounding order, and negative-balance prohibition.
- Chart of accounts and debit/credit convention.
- Customer liability, payment clearing/settlement, provider cost/payable, tenant revenue, fees, refunds, suspense, and agent commission payable.
- Numeric posting examples for deposit, hold, provider submission/outcome, capture, release, refund, reversal, adjustment, and settlement.
- Capture timing for provider fulfillment and handling of ambiguous outcomes.
- 6% markup proposal and treatment of payment fees/taxes/settlement differences.
- Agent commission disabled/enabled choice, earning point, reversal, settlement, and reporting.
- Daily reconciliation, provider balance/cost, suspense ownership, and profit definition.

Required evidence: qualified accountant-signed posting matrix. Without it, the gate is automatically NO-GO.

## Needs Security review

- Admin MFA, secure sessions, password hashing, step-up, recovery, and privileged reset.
- Fixed RBAC permission matrix, commercial Agent separation, field masking, and maker-checker thresholds.
- Provider credential write-only flow, managed Secret Manager/KMS, environment isolation, rotation, and emergency revocation.
- Provider webhook/inquiry/idempotency/replay/timeout and price/input/status change controls.
- Dynamic input validation, sensitive input minimization, image import, no hot-linking, and upload protections.
- Audit event catalog, central security logging, redaction, retention, access, and alerts.
- No direct balance mutation and AI disabled from all provider/catalog/pricing/financial actions.
- Cross-tenant negative-test plan across database, cache, object, jobs, events, provider connections, exports, and support tools.

Required evidence: Security owner sign-off, threat/risk updates, and test-evidence plan.

## Needs Architecture/Database review

- Provider Product, Store Category, Store Product, Package/Variant, mapping, input, tier, Agent, commission, and order snapshot boundaries.
- Provider sync scheduling/version/change detection and separate internal/provider states.
- Managed PostgreSQL target/version and separate runtime/migration/read-only/monitoring/break-glass roles.
- Mandatory tenant keys/composite relationships/indexes and risk-based RLS scope.
- Immutable balanced ledger database enforcement, holds, idempotency, concurrency, and projection rebuild.
- Real migration journal, lock, checksum/drift detection, expand/migrate/contract, and forward recovery.
- Supported Node LTS and exact Fastify/Drizzle/driver/migration/validation/test versions.
- Soft/hard deletion and retention-safe schema behavior.

Required evidence: accepted decision/ADR updates and evidence plan; no production code is required for Phase 0.9.

## Needs Platform/Operations review

- Cloud/provider, region, managed container service, managed PostgreSQL, Redis/queue, storage, Secret Manager/KMS, and observability candidates.
- Cost/support/capacity/residency comparison and ownership matrix.
- Separate local/development/staging/production accounts, data, credentials, and provider environments.
- RPO/RTO, PITR, daily backup, retention, separate recovery access, key recovery, and object/audit recovery.
- Pre-launch and recurring restore tests with ledger/isolation/provider-replay validation.
- Release/rollback, migration job, worker shutdown/replay, monitoring/alerts, incident response, and business continuity.
- Provider catalog sync/order operations, balance/status alerts, dead-letter/reconciliation, and on-call ownership.

Required evidence: hosting decision, environment/data-flow diagram, service responsibility matrix, recovery targets, and restore schedule.

## Gate rule

Phase 1 can move to GO only when:

1. Founder choices are recorded.
2. Every required reviewer accepts the related evidence.
3. Every blocking decision is no longer Proposed/Not Decided/Needs review.
4. No blocking exception remains.
5. The final Phase 0.5/0.7 gate is signed by Founder/Product, Legal, Finance/Accountant, Security, Architecture/Database, and Platform/Operations.
