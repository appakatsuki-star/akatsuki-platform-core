# Database and Ledger Decisions to Approve

## Purpose

These choices protect tenant data and money. Founder approval confirms the business will fund and respect the controls. Database and accounting specialists must validate the detailed design.

## DATA-01 — PostgreSQL as the source of truth

**Recommended decision:** use a supported managed PostgreSQL service as the authoritative database for tenants, users, provider catalog snapshots, store categories/products/packages, pricing tiers, agent relationships, orders, payments, ledger, and audit metadata. Redis, caches, queues, provider APIs, and reports are not internal financial/order truth.

**Why:** PostgreSQL provides transactions, exact numbers, relationships, integrity constraints, backup/PITR, and mature operations.

**Alternative:** self-hosted PostgreSQL or another database. Not recommended for the first MVP because it increases operations or weakens the validated foundation.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-02 — Mandatory tenant isolation

**Recommended decision:** every tenant-owned row has a non-null `tenant_id`. Relationships, uniqueness, indexes, files, caches, jobs, events, provider connections, exports, and audit records also include tenant scope. Missing tenant context means deny, never “all tenants.”

**Why:** the most damaging SaaS failure is one business seeing another business's customers or money.

**Alternative:** separate database per tenant. Stronger physical separation but too expensive/complex for MVP; preserve it as a later option.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-03 — Immutable posted ledger

**Recommended decision:** once a ledger transaction is posted, normal application, staff, support, and migration operations cannot update or delete it. Database controls enforce this independently of the UI.

**Why:** a transaction history that can be edited is not reliable evidence for customers, reconciliation, or accounting.

**Alternative:** editable balance plus transaction notes. Rejected because it permits invisible drift and fraud.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-04 — Double-entry ledger

**Recommended decision:** every money movement has at least two entries; debits equal credits in the same currency. Each account has one currency. Amounts use exact minor units, never floating point. Customer balance is calculated from posted entries and active holds; there is no direct balance-edit function.

**Why:** this proves where value came from and where it went, and makes reconciliation possible.

**Required specialist evidence:** a qualified accountant approves accounts and numeric examples for deposits, holds, capture, release, refunds, fees, settlement, cost/revenue, and suspense.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-05 — Reversal instead of mutation

**Recommended decision:** correct a posted mistake with a new linked reversal, and a replacement transaction when needed. Record reason, evidence, maker, checker, and original reference. Never erase the original.

**Why:** the business can explain both the mistake and correction.

**Refund distinction:** a refund is a linked business event limited to remaining refundable captured value; it is not an arbitrary balance edit.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-06 — Production migration journal

**Recommended decision:** use a real Drizzle migration journal with immutable migration identity/checksum, one locked migration job, drift detection, human-reviewed SQL, and expand/migrate/contract. Prefer forward recovery after release; do not use the disposable Phase 0.3 bootstrap script.

**Plain meaning:** the system knows exactly which database changes ran and prevents two deployments changing the schema at once.

**Alternative:** make every SQL statement `IF NOT EXISTS` or synchronize schema automatically. Rejected because it can hide drift and partial failure.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-07 — Risk-based RLS

**Recommended decision:** explicit tenant-scoped application/repository checks remain mandatory. Add PostgreSQL Row-Level Security first to high-risk tenant tables: customers, provider connections/mappings, store catalog/pricing tiers, wallets/ledger, payments, orders/provider attempts, delivery data, agent commissions, and support. Enable it only after testing pooled connections, workers, migrations, and maintenance access. Expand coverage as patterns prove safe.

**Plain meaning:** even if a query forgets its tenant filter, the database gets another chance to block a leak on the most sensitive tables.

**Alternatives:** RLS everywhere immediately may add untested operational risk; no RLS removes valuable containment.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-08 — Soft delete versus hard delete

**Recommended decision:** classify each entity rather than use one universal delete rule.

- **Never hard-delete:** posted ledger, settlements, required financial references, and required audit history.
- **Soft-delete/deactivate:** tenants, staff memberships, catalog offers, provider connections, and customer profiles when business restoration/history is needed.
- **Hard-delete after policy checks:** expired sessions/tokens, abandoned drafts/uploads, temporary jobs, and other ephemeral data.
- **Privacy requests:** anonymize or remove permitted personal fields while retaining legally required financial integrity and legal holds.

**Why:** soft delete is useful for business history but is not real privacy deletion; hard delete is dangerous for money and audit.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## Proposed MVP money behavior

- Customer cannot have a negative available balance.
- Checkout creates a hold.
- The order snapshots provider cost/currency, customer price/currency, tier/rule version, markup, agent link, commission, and expected net profit before provider submission.
- Provider order submission occurs only after payment/ledger and current provider product/mapping/input checks pass.
- Capture timing follows the accountant-approved provider-order policy; a rejected/unsubmitted order releases the hold, while an ambiguous provider outcome remains pending inquiry rather than being retried blindly.
- MVP supports full refund/reversal rules approved for failed or rejected provider fulfillment; no retroactive repricing.
- All manual balance-affecting adjustments require maker-checker.
- Payment/ledger reconciliation runs at least daily.
- Projection mismatch, ledger imbalance, or posted mutation is a critical incident.

**Business behavior decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## Approval record

| Required approval | Name/status |
|---|---|
| Founder/business rules and cost | ____ |
| Qualified accountant/posting matrix | ____ |
| Database owner | ____ |
| Security owner | ____ |
| Review date and evidence | ____ |

Without the signed accounting posting matrix, Phase 1 remains `NO-GO` even if every checkbox above is founder-approved.

## DATA-09 — Provider catalog separation and versioning

**Recommended decision:** Provider Products, Store Products, and Product Packages/Variants are separate records.

- Provider sync updates/version-tracks raw provider facts but never publishes customer content directly.
- Store Category/Product presentation and visibility are tenant-owned and survive provider metadata changes.
- A package/variant holds an explicit versioned mapping to one provider product/service for the MVP.
- Removed/disabled provider records are retained for order history and mapping evidence; new purchase is suspended according to policy.
- Published input schemas, pricing rules, visuals, and mappings are versioned. Existing order snapshots never change after later sync or admin edit.

**Why:** mixing raw provider data with the storefront would let an external API rename, reprice, disable, or visually alter tenant products without review.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided

## DATA-10 — Pricing and commission snapshots

**Recommended decision:** calculate customer price from the reviewed provider cost and tier rule using accountant-approved rounding. Snapshot all cost, price, markup, tier, commission, agent, profit, currency, provider, mapping, and rule-version fields on the order.

- Provider cost changes affect new quotes/orders only.
- Agent commission is a liability/settlement concept, not merely a report column.
- Cancellation/refund/reversal also reverses or adjusts unearned commission using approved postings.
- Profit reports derive from immutable snapshots and ledger/settlement facts, not the provider's current catalog price.

**Decision:** ☐ Approved  ☐ Needs change  ☐ Not decided
