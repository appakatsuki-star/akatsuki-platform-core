# High-Level Data Model

## 1. Tenancy strategy

Start with shared PostgreSQL schemas/tables and a mandatory `tenant_id` on every tenant-owned aggregate. Platform-global records are explicitly classified and do not pretend to be tenant records. Use database row-level security as defense in depth where practical, alongside repository scoping and automated cross-tenant tests.

Indexes and unique constraints for tenant data generally begin with `tenant_id` (for example, tenant + slug). Foreign keys must not permit cross-tenant relationships; use composite tenant-aware keys or enforcement triggers/application invariants where needed. Very large tenants can later move to dedicated databases behind the same repository contracts.

## 2. Entity groups

### Identity and tenancy

- `users`, `identities`, `sessions`, `mfa_factors`, `recovery_codes`
- `tenants`, `tenant_settings`, `tenant_domains`, `tenant_plans`, `tenant_entitlements`
- `memberships`, `roles`, `permissions`, `role_permissions`, `membership_roles`
- `api_clients`, `api_credentials`, `webhook_endpoints`

A user can belong to multiple tenants through memberships. Platform operator access is modeled separately from tenant membership. Roles may be system-defined or tenant-defined; permissions are stable capability keys.

### Templates and modules

- `templates`, `template_versions`, `template_assets`, `tenant_template_drafts`, `tenant_template_publications`
- `modules`, `module_versions`, `module_dependencies`, `tenant_modules`, `tenant_module_configs`

Published versions/configurations are immutable snapshots. Secrets referenced by module configs live in encrypted secret records, not general JSON.

### Catalog and orders

- `categories`, `products`, `product_variants`, `offers`, `price_definitions`
- `carts`, `cart_items`, `orders`, `order_items`, `order_status_history`, `fulfillments`, `refunds`

Order items store immutable product, pricing, fee, currency, and fulfillment snapshots so history does not change with the catalog.

### Wallet and ledger

- `wallets`, `ledger_accounts`, `ledger_transactions`, `ledger_entries`, `fund_holds`

Ledger transactions are immutable, balanced postings: total debits equal total credits per currency. Amounts use exact numeric/minor-unit representation with an explicit currency; never floating point. Corrections are reversals/new entries. Cached balances are projections validated against the ledger.

### Payments and providers

- `payment_methods`, `tenant_payment_method_configs`, `payment_intents`, `payment_attempts`, `payment_events`, `refund_attempts`, `settlements`, `reconciliations`
- `providers`, `provider_capabilities`, `tenant_provider_connections`, `provider_requests`, `provider_webhook_receipts`, `provider_health_samples`

External IDs are unique within provider/connection scope. Webhook receipts and idempotency keys prevent duplicate effects. Sensitive credentials are encrypted and separately access-controlled.

### SMM and digital products

- `smm_services`, `smm_provider_mappings`, `smm_fulfillments`, `smm_provider_orders`, `smm_status_history`
- `digital_assets`, `digital_inventory_units`, `delivery_grants`, `download_tokens`, `download_events`

### Finance/transfers

- `beneficiaries`, `transfer_requests`, `transfer_fees`, `transfer_approvals`, `transfer_attempts`, `transfer_status_history`, `risk_reviews`

### Communications and governance

- `notification_templates`, `notification_preferences`, `notifications`, `delivery_attempts`
- `tickets`, `ticket_messages`, `ticket_assignments`, `ticket_attachments`, `ticket_events`
- `audit_events`, `outbox_events`, `inbox_messages`, `idempotency_records`, `scheduled_jobs`
- `ai_policies`, `ai_automation_rules`, `ai_runs`, `ai_approvals`, `ai_feedback`

## 3. Common record conventions

Use opaque primary IDs, `created_at`, relevant `updated_at`, tenant ID where owned, aggregate version for concurrency, and actor/source metadata for sensitive state. Statuses are explicit constrained values with transition history for orders, payments, transfers, tickets, and fulfillments. Soft deletion is used only where recovery/history is required; otherwise apply documented retention/anonymization.

## 4. Audit model

Audit events are append-only and include actor type/ID, tenant ID, action, target type/ID, timestamp, request correlation, source/IP/device metadata as policy permits, outcome, reason, and redacted before/after changes. Restrict access and export; protect integrity through append-only permissions and optional hash chaining/archive controls.

## 5. Data lifecycle and migrations

Classify fields as public, internal, personal, sensitive personal, financial, credential, or audit. Define retention, residency, backup, export, and deletion behavior per class. Tenant deletion is a verified asynchronous workflow honoring financial/legal retention and anonymizing remaining personal data.

Migrations are forward-compatible and use expand/migrate/contract: add compatible schema, deploy dual-compatible code, backfill in bounded batches, validate, then remove old schema later. Test backups and point-in-time restore; define RPO/RTO before production.
