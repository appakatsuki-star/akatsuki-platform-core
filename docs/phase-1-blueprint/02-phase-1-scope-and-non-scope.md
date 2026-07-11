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

### Future-safe non-AI presentation foundation

- Design tokens and bounded tenant theme settings required by the normal white-label UI.
- Product/category image metadata required by the normal catalog.
- An approved declarative widget-registry concept only if ordinary Phase 1 UI already needs it.
- Existing feature flags/audit vocabulary may remain extensible, but `ai_builder_enabled` stays false and no future AI permission is active/assignable.
- Do not add any item solely to prepare AI Builder; prefer normal draft/preview/publish/version/audit mechanisms.

## Explicit non-scope

- SMM customer products, refill, drip-feed, bulk orders, or quantity services.
- Finance/transfers, withdrawals, peer-to-peer movement, cryptocurrency, lending, or FX.
- AI model/provider integration or AI execution of any provider/catalog/pricing/financial action.
- AI Builder/Design Studio/AI Studio UI, prompt center, AI image/widget/theme/layout/animation generation, Figma/design import, Codex/Replit cloud integration, code generation, or preview-environment automation.
- Tenant arbitrary code prompts, AI direct deployment/publication, or external AI access to production secrets, provider keys, customer PII, order inputs, or financial data.
- Native mobile apps or public partner API.
- Runtime plugins, provider marketplace, broad provider-catalog auto-publication, multi-provider routing, or automatic failover.
- Stock/code and manual fulfillment implementation.
- Complex agent networks, multi-level commission, payout/withdrawal, automatic rank ladders, or retroactive commission.
- Subscriptions, split tender, partial refunds, chargeback automation, multi-item cart, or multiple currencies.
- Multiple advanced templates, marketplace sellers, public production launch, multi-region, multi-cloud, Kubernetes, or microservice extraction.

## Scope control rule

Any proposed addition must identify the decision, security/data/accounting impact, test/operations cost, and which planned item it replaces. It cannot enter Phase 1 merely because the schema could support it. Scope changes reopen affected approvals and may keep the gate `NO-GO`.
