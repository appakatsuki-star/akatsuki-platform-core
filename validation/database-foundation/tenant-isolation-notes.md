# Tenant Isolation Convention

## Repository rule

Every tenant-owned repository method receives `tenantId` as a required, explicit first-class value. It never obtains tenant scope from mutable global state and never accepts an optional tenant ID.

```text
orders.findById(tenantId, orderId)
orders.insert(tenantId, newOrder)
ledger.post(tenantId, postingCommand)
```

Every SQL predicate includes tenant scope, including updates/deletes, joins, subqueries, uniqueness, pagination cursors, locks, and raw SQL. Relationships between tenant-owned tables use tenant-aware composite keys/FKs. Cache keys, object paths, jobs, events, idempotency keys, exports, audit queries, and AI retrieval namespaces include tenant ID.

Platform-global repositories are separate types and packages. They are callable only from explicitly authorized Super Admin use cases. There is no `tenantId?: string` repository method and no silent “missing tenant means all tenants” behavior. Cross-tenant reporting uses purpose-built read models, least-privilege database roles, approval/audit, and never reuses ordinary tenant repositories.

## Trusted context

Tenant context originates from an authenticated membership/scoped credential and verified domain/internal job metadata. A header, path, query, or body value from the client is not authoritative. If two trusted signals disagree, fail closed and audit the event.

## Isolation test strategy

For every tenant repository and API capability:

1. Create tenant A and B with colliding human identifiers/slugs where allowed.
2. Authenticate as A and prove A can access its own row.
3. Attempt A read/update/delete using B's opaque ID; expect indistinguishable not-found/denied behavior and no mutation.
4. Exercise list, search, sorting, pagination cursor, aggregate/count, join, export, and raw-SQL paths.
5. Exercise duplicate idempotency keys, caches, signed objects, background jobs/events, webhooks, audit views, and failure/retry paths across tenants.
6. Verify composite constraints reject cross-tenant relationships.
7. If RLS is enabled, repeat using the runtime database role and prove missing/wrong tenant session context returns no rows or fails.

Architecture tests should prohibit application modules from importing unrestricted database clients. Integration tests use real PostgreSQL; mocks cannot prove isolation.
