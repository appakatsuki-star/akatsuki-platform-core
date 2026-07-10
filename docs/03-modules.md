# Module System and Domain Modules

## 1. Module contract

Every module has a manifest declaring: stable key, semantic version, owner, dependencies, incompatible modules, required platform version, permissions, feature flags, navigation contributions, configuration schema, event subscriptions/publications, API capabilities, scheduled jobs, and data-retention classification.

Lifecycle states per tenant are `unavailable`, `available`, `enabled`, `suspended`, and `disabled`. Enabling validates dependencies and configuration. Disabling blocks new work, hides entry points, cancels safe scheduled work, and preserves data according to retention rules; it must not silently delete data.

## 2. Isolation rules

- A module owns its domain objects, tables, migrations, jobs, permissions, and provider secrets.
- No cross-module table reads/writes, foreign repository imports, or shared mutable models.
- Cross-module behavior uses public use cases or versioned events.
- Shared packages contain technical primitives, not business logic.
- Routes, menus, jobs, event consumers, and policies are registered only when entitled and enabled.
- All tenant-owned calls carry `tenant_id`; module access is checked server-side, not merely hidden in UI.
- Architecture tests enforce allowed imports and module dependency direction.
- Contract tests protect public interfaces; event changes remain backward compatible during rollout.

## 3. Core platform modules

| Module | Owns | Key interactions |
|---|---|---|
| Identity & Access | Users, credentials, sessions, MFA, memberships, roles, permissions | Supplies actor and authorization context |
| Tenants | Tenant lifecycle, domains, plans, locales, settings | Supplies tenant context and entitlements |
| Templates | Theme tokens, layouts, slots, template versions, assignments | Renders tenant surfaces safely |
| Catalog | Categories, products, variants, tenant offers and prices | Supplies purchasable offers to Orders |
| Wallet & Ledger | Accounts, journal transactions, entries, holds | Posts money movements for payments/orders/transfers |
| Orders | Carts, orders, items, state transitions, fulfillment orchestration | Calls catalog snapshots and fulfillment modules |
| Payments | Payment methods, intents, attempts, refunds, settlements | Posts reconciled results to ledger |
| Providers | Provider definitions, credentials, adapters, health and usage | Used by fulfillment/payment modules through ports |
| Notifications | Templates, preferences, deliveries, channels | Reacts to events; email/SMS/push/in-app |
| Support | Tickets, messages, attachments, assignment, SLA | Links customers and business objects |
| Audit | Append-only privileged activity records | Receives security and business audit events |

## 4. Business modules

### SMM

Owns SMM services, provider service mappings, customer targets, fulfillment requests, provider orders, status synchronization, refill/cancel rules, and cost/margin snapshots. It accepts an order fulfillment command and reports immutable fulfillment events. Provider-specific status values are normalized inside adapters.

### Digital Products

Owns digital product fulfillment, inventory/license units, delivery grants, download tokens, access limits, expiry, and revocation. Files are private objects delivered through short-lived signed URLs. Secrets/license values are encrypted and revealed only to authorized customers and staff.

### Finance / Transfers

Owns transfer instructions, beneficiary profiles, limits, fees, approvals, compliance/risk review status, execution attempts, and reconciliation. It never edits balances; it creates ledger holds and postings. Maker-checker approval is required for configured thresholds. Availability is jurisdiction- and tenant-policy-dependent.

## 5. Module enablement flow

1. Platform marks the module available under a tenant plan/license.
2. Tenant admin with permission supplies validated module configuration.
3. System verifies dependency versions and required provider/payment connections.
4. Enablement is recorded and audited; routes/jobs/subscriptions become active.
5. Health checks and usage metrics are exposed to tenant and platform operators.

## 6. Failure boundaries

Provider timeouts leave internal work in a recoverable pending state. Retries use backoff and jitter, bounded attempts, and dead-letter review. Circuit breakers reduce cascading failures. A reconciliation job compares internal records with provider truth. Manual correction is an explicit permissioned command producing ledger/domain and audit records.
