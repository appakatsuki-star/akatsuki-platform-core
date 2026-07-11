# Database, Ledger, and Hosting Answer Draft

## DATA-01 — PostgreSQL

**Draft answer:** Use PostgreSQL as the official source of truth for tenants, identities, provider/store catalogs, pricing tiers, customers, orders, payments, ledger, commissions, and audit references. Redis, queues, caches, provider APIs, and reports are not official financial/order truth.

**Status:** Needs architecture review

## DATA-02 — Tenant isolation

**Draft answer:** Require non-null `tenant_id` on every tenant-owned table and tenant scope in relationships, uniqueness, indexes, files, caches, jobs, events, provider connections, pricing, exports, and audit. Missing tenant context denies access.

**Status:** Needs architecture review

## DATA-03 — Double-entry ledger

**Draft answer:** Every money movement contains at least two exact entries that balance debit and credit in one currency. Use USD exact minor units for the MVP. Customer balance derives from posted entries and active holds; there is no direct balance setter.

A qualified accountant must approve the chart, signs, and numeric examples.

**Status:** Needs finance review

## DATA-04 — Immutable posted ledger

**Draft answer:** Posted transactions and entries cannot be edited or deleted by runtime, staff, support, normal admin, or migration convenience. Database controls enforce this independently of the UI.

**Status:** Needs architecture review

## DATA-05 — Reversal policy

**Draft answer:** Correct a posted mistake with a new linked reversal and replacement when needed. Preserve original, reason, evidence, maker/checker, and timestamps.

**Status:** Needs finance review

## DATA-06 — Order snapshots

**Draft answer:** Preserve provider/service IDs and catalog version, Store Product/package/mapping, provider cost, customer price, currency, tier/rule, markup, agent/commission, expected profit, input schema/safe input, provider/internal status, timestamps, and audit references on every order.

Later sync, visual, mapping, provider price, or tier changes never rewrite the order.

**Status:** Needs architecture review

## DATA-07 — Quote, hold, capture, and refund

**Draft answer:**

1. Quote stores price/cost/tier details and expiry.
2. Checkout places a hold before provider submission.
3. Capture occurs at the accountant-approved confirmed fulfillment state.
4. Definite pre-fulfillment failure releases/refunds under approved rules.
5. Ambiguous timeout remains pending inquiry; do not blindly retry or refund.
6. Refund/correction is a linked new ledger event.

**Status:** Needs finance review

## DATA-08 — Migration journal

**Draft answer:** Before production scaffolding, require a real Drizzle migration journal with immutable IDs/checksums, one locked migration job, drift detection, reviewed SQL, gradual expand/migrate/contract changes, and forward-recovery plan. Do not reuse the disposable Phase 0.3 bootstrap as production migration tooling.

**Status:** Needs architecture review

## DATA-09 — RLS and deletion

**Draft answer:** Keep explicit tenant checks everywhere and add tested Row-Level Security to high-risk tables first. RLS is an extra PostgreSQL tenant lock, not a replacement for application checks.

Never hard-delete posted ledger/settlement/required audit history. Deactivate tenants/staff/products/mappings/tiers/connections where history is needed. Hard-delete temporary data after retention checks; anonymize permitted personal data for privacy requests.

**Status:** Needs architecture review

## HOST-01 — Managed PostgreSQL production

**Draft answer:** Choose a supported managed PostgreSQL service in the approved region with private networking, TLS, encryption, HA option, monitoring, automated backup, PITR, and isolated restore. Exact cloud/service remains `________________`.

**Status:** Needs founder review

## HOST-02 — Managed container platform

**Draft answer:** Use one managed container platform for web/API/workers and a separate controlled migration job. Build immutable non-root artifacts. Do not use Kubernetes or multi-cloud in the MVP unless the operations team proves a specific need.

**Status:** Needs architecture review

## HOST-03 — PITR and backups

**Draft answer:** Require point-in-time recovery with an **RPO target of 15 minutes or better**, continuous recovery records, and at least one encrypted daily recoverable backup. Initial proposal: PITR for 14–35 days and daily backups for 35 days.

RPO means the maximum recent data the business may lose. Final RTO—the time to restore service—must be set after a measured rehearsal.

**Status:** Needs founder review

## HOST-04 — Restore testing

**Draft answer:** Complete one production-like restore before public launch, then a full restore rehearsal every quarter and a monthly automated check where affordable. Validate tenant isolation, ledger balance/immutability, migration level, order/provider snapshots, secrets, objects, application health, and no duplicate provider-job replay.

**Status:** Needs architecture review

## HOST-05 — Environment separation

**Draft answer:** Local development uses fake/disposable data only. Staging and production use separate cloud accounts/projects, networks, databases, storage, domains, keys, secrets, service identities, and provider/payment credentials.

**Status:** Needs security review

## HOST-06 — Hosting decision still open

**Draft answer:** Founder selects one cloud provider, primary region, managed container service, managed PostgreSQL offering, and pilot monthly budget after Platform/Security compare capability, recovery, residency, support, limits, and cost.

**Status:** Needs founder review
