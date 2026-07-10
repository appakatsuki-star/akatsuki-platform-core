# System Architecture

## 1. Recommended starting architecture

Use a **modular monolith with background workers** in a monorepo. Domain modules are isolated in code and data ownership but run in one backend deployment initially. This preserves transactional consistency and delivery speed while creating extraction seams.

```text
Web / future mobile / partner clients
                |
        CDN + WAF + API gateway
                |
     Backend API (modular monolith)
       |         |          |
 PostgreSQL    Redis     Object storage
       |         |
 Outbox ----> Job queue ----> Workers ----> External providers
                |
      Notifications / webhooks / reconciliation
```

## 2. Logical layers

Each backend module follows the same dependency direction:

1. **Domain:** entities, value objects, policies, domain events; no framework or infrastructure dependency.
2. **Application:** commands, queries, use cases, ports, transaction boundaries, authorization orchestration.
3. **Infrastructure:** database repositories, queue adapters, provider clients, storage, email/SMS/push adapters.
4. **Interface:** HTTP handlers, webhook handlers, job consumers, serializers, request validation.

Interfaces may call application use cases. Infrastructure implements application ports. A module must not import another module's tables or internals; it uses a published application interface or event.

## 3. Recommended repository structure

This is a blueprint only; directories should be created during implementation.

```text
akatsuki-platform-core/
├── apps/
│   ├── super-admin-web/       # Platform operator web application
│   ├── tenant-admin-web/      # Tenant management web application
│   ├── customer-web/          # Tenant-branded customer storefront/account
│   ├── api/                   # HTTP API and webhook entry points
│   ├── worker/                # Queues, schedules, reconciliation, notifications
│   └── docs-portal/           # Optional product/API documentation surface
├── packages/
│   ├── contracts/             # Versioned API/event DTOs and schemas
│   ├── domain-shared/         # IDs, money, time, errors; no business modules
│   ├── auth/                  # Authentication client/session primitives
│   ├── authorization/         # Permission vocabulary and policy helpers
│   ├── tenancy/               # Tenant context, resolution, isolation guards
│   ├── config/                # Typed configuration conventions
│   ├── observability/         # Logging, tracing, metrics conventions
│   ├── ui/                    # Accessible shared UI primitives and tokens
│   ├── template-runtime/      # Safe template schema and renderer contracts
│   ├── provider-sdk/          # Provider adapter interfaces and test harness
│   ├── module-sdk/            # Module manifest/lifecycle conventions
│   └── testing/               # Fixtures, contract tests, test utilities
├── modules/
│   ├── identity-access/
│   ├── tenants/
│   ├── templates/
│   ├── catalog/
│   ├── wallet-ledger/
│   ├── orders/
│   ├── payments/
│   ├── providers/
│   ├── notifications/
│   ├── support/
│   ├── audit/
│   ├── smm/
│   ├── digital-products/
│   ├── finance-transfers/
│   └── ai-automation/
├── infrastructure/
│   ├── database/              # Migrations, seeds, database conventions
│   ├── deployment/            # Environment and deployment definitions
│   ├── monitoring/            # Dashboards and alert definitions
│   └── runbooks/              # Operations and incident procedures
├── docs/
├── scripts/                   # Repository tooling only
└── tests/
    ├── architecture/
    ├── contract/
    └── end-to-end/
```

## 4. Apps and shared packages

- `super-admin-web`: global operations only; never reuses tenant-admin authorization assumptions.
- `tenant-admin-web`: tenant-scoped back office with module-aware navigation and permission checks.
- `customer-web`: resolves domain/tenant before rendering; loads tenant theme, locale, module navigation, and customer session.
- `api`: stateless request handling, versioned public endpoints, admin endpoints, webhooks, health probes.
- `worker`: asynchronous fulfillment, provider polling, retries, reconciliation, scheduled cleanup, and delivery.
- `contracts`: transport schemas, event envelopes, compatibility rules; it contains no implementations.
- `domain-shared`: small stable primitives only. It must not become a miscellaneous dependency bucket.
- SDK packages define safe extension contracts; domain implementations remain within their owning modules.

## 5. Request and tenant context

Tenant resolution uses, in order: trusted internal tenant identifier, authenticated membership, mapped custom domain/subdomain, or explicit API credential scope. Client-supplied tenant headers are accepted only at a trusted gateway and must be checked against identity claims.

The resolved context contains `tenant_id`, actor, memberships, effective permissions, locale, correlation ID, and request origin. Repositories require this context for tenant-owned access. Background jobs and events include the tenant ID explicitly and restore the same context.

## 6. Contracts and communication

- Synchronous calls: published module application interfaces for workflows needing immediate consistency.
- Asynchronous calls: versioned domain/integration events through an outbox for side effects and cross-module reactions.
- External APIs: `/api/v1/...`; breaking changes require a new version and migration window.
- Events: include event ID, type, version, occurred time, tenant ID, aggregate ID, correlation/causation IDs, and payload.
- Commands and webhooks use idempotency keys; consumers store processed event IDs.

## 7. Data and infrastructure

Start with PostgreSQL, Redis for ephemeral caching/rate limits/locks, object storage for assets and digital files, and a durable queue. PostgreSQL remains the system of record. Use transactional outbox records written with domain state, then published by workers. Caches are disposable and never authoritative for permissions or money.

## 8. Deployment evolution

Deploy web apps independently from API and worker. Initially, API modules share a process and database cluster with strict schema/table ownership. Extract a module into a service only when it has a distinct scaling profile, reliability boundary, security boundary, or dedicated team—and only after contract, observability, and operational maturity exists.
