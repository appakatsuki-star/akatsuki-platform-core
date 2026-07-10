# Akatsuki Platform Core — Product Vision

## 1. Purpose

Akatsuki Platform Core is a multi-tenant, white-label commerce and digital-services platform. One platform operator manages tenants, shared capabilities, risk, and infrastructure; each tenant operates an isolated branded business; customers interact only with their tenant's catalog, wallet, orders, and support channels.

The platform is intended to grow from a modular monolith into independently deployable services only where scale, ownership, or reliability justifies that cost. Web applications are the initial delivery channel, while all domain capabilities expose versioned APIs suitable for future mobile clients and partner integrations.

## 2. Product surfaces

| Surface | Primary users | Responsibility |
|---|---|---|
| Super Admin | Platform operators | Tenant lifecycle, global catalog/modules, plans, provider governance, risk, audits, platform reporting |
| Tenant Admin | Tenant owners and staff | Branding, templates, products, pricing, customers, orders, wallets, payments, support, staff access |
| Customer App | End customers | Registration, catalog, checkout, wallet, orders, downloads, transfers, notifications, tickets |
| Public/Partner API | Mobile apps and approved integrations | Stable, scoped access to customer and business workflows |

## 3. Product principles

- **Tenant isolation by default:** every tenant-owned record, cache entry, file, event, and log carries tenant context.
- **Modular capability model:** modules are explicitly enabled, configured, authorized, metered, and observable per tenant.
- **API-first:** UI clients contain presentation logic; business rules remain in domain/application services.
- **White-label without forks:** branding, domains, navigation, content, feature flags, and templates are data/configuration, not tenant-specific code branches.
- **Ledger-based money:** balances are derived from immutable accounting entries, never edited directly.
- **Asynchronous by design:** slow or unreliable provider work is processed using durable jobs, idempotency, retries, and reconciliation.
- **Secure defaults and traceability:** least privilege, strong authentication, encryption, audit trails, and explicit approval for sensitive actions.
- **Evolution over premature distribution:** begin with a modular monolith and extract services behind stable contracts when evidence demands it.

## 4. Scope boundaries

Initial scope includes tenant administration, identity and permissions, template/branding configuration, module entitlement, products, wallets, orders, payment intake, providers, notifications, tickets, audit logs, and a governed AI automation layer. SMM, digital products, and finance/transfers are domain modules built on shared platform capabilities.

Not assumed in the initial MVP: native mobile apps, multi-region active-active operation, arbitrary third-party executable plugins, full ERP/accounting, lending, cryptocurrency custody, or automated high-risk financial decisions. Regulatory availability of transfers and payment methods must be evaluated per operating jurisdiction before activation.

## 5. Success measures

- A new tenant can be provisioned and branded without a deployment.
- A module can be enabled or disabled without leaking its routes, data, jobs, or permissions.
- Financial totals reconcile to immutable ledger entries and provider settlements.
- Provider failures do not duplicate orders, charges, transfers, or notifications.
- Privileged actions are attributable to an actor and tenant through searchable audit records.
- Customer APIs can serve web and future mobile clients without domain rewrites.

## 6. Key terminology

- **Platform:** the operator-owned Akatsuki installation.
- **Tenant:** an isolated business/account operating on the platform.
- **Membership:** a user's role-bearing relationship to a tenant.
- **Module:** an installable/entitled bounded business capability.
- **Template:** a versioned presentation definition using controlled slots and tokens.
- **Provider:** an external API integration used to fulfill or settle a workflow.
- **Ledger:** the immutable source of truth for monetary movement.
