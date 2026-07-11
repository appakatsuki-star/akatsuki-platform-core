# Phase 1 Scope and Non-Scope

## Conditional MVP scope

### Platform and access

- Minimal Super Admin tenant provisioning, activation/deactivation, owner assignment, module enablement, overview, and audit.
- Tenant Admin, Catalog Manager, Order Agent, Support Agent, Customer, and permission foundations.
- Email/password identity, verified email, opaque sessions, privileged MFA, recovery, and session revocation.
- Trusted tenant resolution and cross-tenant denial.

### Provider and catalog

- One provider connection contract and protected credentials.
- Connection test, one scheduled/manual catalog sync, raw Provider Product storage, and change detection.
- Admin-reviewed Store Category, Store Product, Product Package/Variant, mapping, visuals, inputs, and publication.
- `ADD_AS_PACKAGE` end-to-end for one Games/PUBG-like product and a small package set.
- `ADD_AS_STANDALONE_PRODUCT` represented in contracts/data model only; no SMM storefront implementation.
- Dynamic Player ID and only the selected service's approved server/region field.

### Pricing, orders, and money

- One USD currency, subject to final approval; no FX.
- Default `Ninja`/Retail tier and versioned percentage markup model.
- Agent/commission concepts represented; commission execution disabled in the first pilot unless later approved.
- One payment/funding path, wallet/ledger, holds, capture/release, full refund/reversal, settlement references, and reconciliation foundation.
- One-item provider order lifecycle, idempotent submission/inquiry, provider/internal statuses, and immutable commercial snapshot.
- Tenant Admin order/cost/price/tier/commission/profit view with field permissions.

### Operational foundation

- Append-only audit records, structured redacted logs, health/readiness, metrics/alerts for critical paths.
- Migration journal, reviewed schema changes, outbox/inbox/idempotency records, queue failure handling.
- Encrypted backups/PITR and production-like restore validation as entry/completion requirements where applicable.

## Explicit non-scope

- SMM customer products, refill, drip-feed, bulk orders, or quantity services.
- Finance/transfers, withdrawals, peer-to-peer movement, cryptocurrency, lending, or FX.
- AI model/provider integration or AI execution of any provider/catalog/pricing/financial action.
- Native mobile apps or public partner API.
- Runtime plugins, provider marketplace, broad provider-catalog auto-publication, multi-provider routing, or automatic failover.
- Stock/code and manual fulfillment implementation.
- Complex agent networks, multi-level commission, payout/withdrawal, automatic rank ladders, or retroactive commission.
- Subscriptions, split tender, partial refunds, chargeback automation, multi-item cart, or multiple currencies.
- Multiple advanced templates, marketplace sellers, public production launch, multi-region, multi-cloud, Kubernetes, or microservice extraction.

## Scope control rule

Any proposed addition must identify the decision, security/data/accounting impact, test/operations cost, and which planned item it replaces. It cannot enter Phase 1 merely because the schema could support it. Scope changes reopen affected approvals and may keep the gate `NO-GO`.
