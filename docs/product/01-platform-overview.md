# Platform Overview

## Purpose

Define Akatsuki Platform Core as a multi-tenant, modular, white-label SaaS platform for selling and fulfilling digital services. The platform operator governs shared infrastructure, tenants, modules, risk, and global integrations. Each tenant runs an isolated branded business without a code fork, while customers see only that tenant's catalog, wallet, orders, and support experience.

This specification describes product behavior and boundaries; it does not prescribe production implementation.

## Main actors

- **Super Admin:** operates the platform, provisions tenants, controls module availability, and reviews global risk and audit activity.
- **Tenant Admin:** owns or manages one tenant's brand, staff, catalog, pricing, customers, providers, and operations.
- **Agent:** a tenant staff member with explicitly assigned operational permissions and no implicit administrative authority.
- **Customer:** registers with one tenant, funds and uses a wallet, purchases offers, and receives support.
- **External provider:** fulfills a service, accepts a payment, or executes an approved transfer through a governed adapter.
- **System worker:** performs asynchronous fulfillment, status polling, reconciliation, and notification delivery under tenant context.

## Core flows

1. A Super Admin creates a tenant, selects its plan and available modules, and invites its first Tenant Admin.
2. The Tenant Admin configures identity, branding, domain, locale, currency, staff permissions, and enabled modules.
3. The tenant publishes offers backed by internal inventory or approved providers.
4. A Customer authenticates, funds a wallet or uses an allowed payment path, and places an order.
5. Orders reserve or collect money, dispatch fulfillment, normalize provider outcomes, and reconcile final status.
6. Notifications, support, and append-only audit records explain consequential activity.
7. Modules can be suspended or disabled without deleting financial or historical records.

## Required entities

- Platform, Tenant, TenantPlan, TenantDomain, TenantSetting, BrandProfile
- User, Membership, Role, Permission, Session
- ModuleDefinition, ModuleEntitlement, TenantModuleConfiguration
- CustomerProfile, CatalogOffer, Order, Payment, Wallet, LedgerAccount
- Provider, ProviderConnection, SupportTicket, Notification, AuditRecord
- FeatureFlag and UsageQuota, distinct from entitlement and authorization

## Business rules

- Every tenant-owned record and operation must carry trusted tenant context; platform-global records must be explicitly classified.
- White-label differences are configuration and versioned content, never tenant-specific code branches.
- Module entitlement, module enabled state, rollout flags, and actor permission are separate checks; all must pass where applicable.
- Core business rules live behind versioned application/API contracts so future clients do not require domain rewrites.
- PostgreSQL/domain state is authoritative; caches, queues, projections, and provider responses are not independent sources of truth.
- Money is represented through an immutable balanced ledger. Orders, payments, refunds, fees, and transfers reference their ledger effects.
- Slow or unreliable external effects are asynchronous, idempotent, retryable, observable, and reconcilable.
- Consequential actions are attributable to an actor or system principal through audit records.
- A Tenant Admin cannot grant permissions that the tenant plan, module entitlement, or their own delegable permission set does not allow.
- Platform support access to tenant data is exceptional, purpose-bound, time-limited, and audited.

## Edge cases

- A custom domain resolves to the wrong tenant or is reassigned while sessions exist.
- A tenant is suspended while orders, payments, downloads, or transfers are pending.
- A module is disabled with historical records, outstanding jobs, or unsettled money.
- The same user belongs to several tenants with different roles.
- A provider callback arrives after an internal timeout or after manual reconciliation.
- A tenant exceeds plan limits or creates noisy-neighbor load.
- Currency, locale, or time-zone settings change after orders exist; historical snapshots must remain unchanged.
- A platform-wide incident requires a module or provider kill switch without corrupting in-flight work.

## MVP scope

- One platform installation supporting multiple isolated tenants.
- Super Admin, Tenant Admin, Agent, and Customer identities.
- Tenant provisioning, branding, one controlled template, domain mapping, locale, and one settlement currency per tenant.
- Explicit RBAC, admin MFA, audit logging, basic catalog, wallet/ledger, orders, one deposit/payment path, notifications, and support tickets.
- Module entitlement/configuration model documented and enforceable; at least one low-risk end-to-end fulfillment path may be piloted.
- Responsive customer web experience and versioned APIs suitable for future clients.

## Later scope

- Multiple templates, staged publishing, plan billing, trials, advanced quotas, and dedicated tenant placement.
- Native mobile applications, partner APIs, webhooks, marketplace capabilities, and approved third-party extensions.
- Full SMM and digital-product operations, verified-office finance/transfers, richer reporting, and multi-currency workflows.
- Service extraction, multi-region operation, and autonomous low-risk automation only when evidence and governance support them.

## Open questions

- Which jurisdictions, launch countries, currencies, languages, and data-residency constraints apply?
- What is the exact MVP tenant plan, quota, and commercial billing model?
- Which module provides the first sandbox end-to-end order path?
- Which capabilities are mandatory core modules and which can tenants disable?
- What availability, support-hour, recovery, and performance targets must the product promise?
- Under what controlled process may platform staff access or impersonate a tenant user?
