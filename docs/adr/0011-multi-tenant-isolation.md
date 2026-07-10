# ADR 0011: Multi-Tenant Isolation

**Status:** Proposed

## Context

The white-label platform hosts many businesses in shared infrastructure. Cross-tenant access is a critical security failure. Isolation must cover database rows, caches, files, queues, events, domains, provider connections, logs, exports, and AI retrieval—not only HTTP routes.

## Decision

Begin with a **shared PostgreSQL database and mandatory `tenant_id` on every tenant-owned domain entity**. Resolve tenant context only from trusted domain mapping, authenticated membership, scoped credential, or internal job/event metadata. Application use cases and repositories require explicit tenant context; all tenant uniqueness, relationships, and indexes are tenant-aware. Use PostgreSQL row-level security for high-risk/all tenant tables if the ORM/operations spike validates safe administration and migrations.

Include tenant ID in cache keys, object prefixes, jobs, events, webhook connections, idempotency scope, audit records, and AI indexes. Platform-global data is explicitly classified. Automated negative tests attempt cross-tenant reads/mutations through identifiers, pagination, search, files, exports, and async work. Repository contracts preserve an escape path for dedicated databases for exceptional tenants later.

## Options considered

- **Shared database/shared schema with tenant ID:** selected for operational efficiency and MVP provisioning speed, with layered controls.
- **Schema per tenant:** improved namespace separation but complex migrations, pooling, and large tenant counts.
- **Database per tenant:** strongest physical boundary/custom residency, but expensive provisioning, migrations, analytics, and operations.
- **Hybrid placement:** likely future option for regulated or very large tenants, but premature as the default.

## Consequences

Tenant onboarding is fast and schema evolution centralized. Every engineering layer must treat missing tenant scope as an error. Shared resources need quotas and noisy-neighbor controls. Migration to dedicated placement requires routing and data-movement tooling later.

## Risks

A single unscoped query, cache key, signed URL, job, support tool, or admin bypass can leak data. RLS misconfiguration can give false confidence. Shared-database performance and incident blast radius grow with tenant count.

## Open questions

- Will RLS be mandatory globally, and how will privileged maintenance bypass be audited?
- Which tenants/regulations require dedicated database or region placement?
- How will platform support access and time-limited impersonation be controlled?
- What quotas and partitioning thresholds address noisy tenants?
