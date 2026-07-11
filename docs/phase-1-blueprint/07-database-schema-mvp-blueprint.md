# Database Schema MVP Blueprint

## Status and database rules

This is a high-level entity blueprint, not SQL or a final accounting schema. PostgreSQL is proposed as authoritative. Every tenant-owned table has non-null `tenant_id`, tenant-aware relationships/uniqueness/indexes, timestamps, and retention classification. Exact fields/constraints require approved schema and accounting review.

## Platform, identity, and access

| Entity/table | Simple responsibility |
|---|---|
| `tenants` | One white-label business, lifecycle state, currency/locale references |
| `users` | Platform identity; no tenant permission by itself |
| `memberships` | User relationship/status in one tenant |
| `roles` | Fixed role definition, platform- or tenant-scoped |
| `permissions` | Stable allowed action vocabulary |
| `role_permissions` | Permission bundle for a role |
| `membership_roles` | Role assignment inside one scope |
| `sessions` | Hashed opaque session, expiry, assurance, revocation |
| `mfa_factors` / recovery | Protected MFA metadata and one-use recovery evidence |
| `invitations` / `consents` | Staff invite and exact terms/privacy acceptance |
| `tenant_modules` | Module entitlement/enabled/configured state |

## Provider and catalog

| Entity/table | Simple responsibility |
|---|---|
| `provider_connections` | Tenant/provider connection metadata, secret reference, status, balance/health |
| `provider_sync_runs` | Scheduled/manual sync time, outcome, counts, error summary |
| `provider_products` | Raw hidden service snapshot: provider ID/name/cost/currency/status/limits/last sync |
| `provider_product_versions` or change records | Safe before/after provider metadata evidence and detected change |
| `catalog_categories` | Tenant customer-facing category and visual/publication metadata |
| `catalog_products` | Tenant Store Product presentation, source/fulfillment type, publication state |
| `catalog_packages` | Sellable Package/Variant under product, status/order and pricing reference |
| `provider_product_mappings` | Versioned package-to-provider-service mapping and review state |
| `product_input_fields` | Versioned form fields, validation, visibility, provider payload mapping |
| `asset_metadata` | Tenant-owned approved image/icon/banner reference and classification |

## Pricing and commercial relationships

| Entity/table | Simple responsibility |
|---|---|
| `pricing_tiers` | Tenant/currency tier name/visual/markup/default/active and rule version |
| `customer_tier_assignments` | Customer's effective tier, reason, dates, actor |
| `package_price_overrides` | Optional separately authorized versioned override; likely unused MVP |
| `agents` | Tenant commercial Agent relationship, separate from staff membership |
| `agent_customer_links` | Versioned customer/agent attribution if later enabled |
| `commission_rules` | Disabled/unconfigured until approved; rate/base/earning policy version |

## Wallet and ledger

| Entity/table | Simple responsibility |
|---|---|
| `wallets` | Customer-facing wallet identity/currency; no editable balance column as truth |
| `ledger_accounts` | Accountant-approved currency/account class |
| `ledger_transactions` | One financial business event and immutable posted state/reference |
| `ledger_entries` | Debit/credit lines that balance per currency |
| `wallet_holds` | Pending reserved amount and idempotent capture/release state |
| `balance_projections` | Rebuildable performance view, never authoritative |
| `payment_intents` / `payment_attempts` | Payment provider request/result separate from ledger posting |
| `settlements` / `reconciliation_cases` | Provider/payment matching and unresolved discrepancies |

## Orders and provider execution

| Entity/table | Simple responsibility |
|---|---|
| `orders` | Tenant/customer order, internal state, immutable totals/commercial snapshot |
| `order_items` | One package snapshot in MVP; keeps product/package names/versions |
| `order_inputs` | Safe versioned input values; sensitive values classified/encrypted/redacted |
| `order_price_snapshots` | Provider cost, sale, tier, markup, agent/commission, profit, currencies |
| `provider_order_attempts` | Dispatch/inquiry attempt, stable reference, provider order ID/status/error |
| `order_status_events` | Append-only internal/provider/customer timeline |
| `idempotency_records` | Prevent duplicate commands with payload fingerprint and stored result reference |
| `outbox_events` / `inbox_messages` | Durable asynchronous publication and duplicate-safe consumption |

## Audit and support foundation

| Entity/table | Simple responsibility |
|---|---|
| `audit_logs` | Append-only actor/tenant/action/target/outcome/reason/correlation evidence |
| `support_tickets` / `ticket_messages` | Minimal customer-agent support linked to owned order |

## Integrity expectations

- Composite tenant foreign keys prevent cross-tenant relationships.
- Provider raw records, tenant presentation, mappings, and order snapshots remain separate.
- Published/posted/history records are versioned or append-only; provider sync never rewrites orders.
- Financial deletion/mutation is rejected; corrections use new linked records.
- Risk-based RLS would cover provider connections/mappings, catalog/pricing, customers, orders, ledger/payment, commission, delivery, and support after validation.
- Soft/hard deletion follows the approved data classification, not a universal boolean convention.
