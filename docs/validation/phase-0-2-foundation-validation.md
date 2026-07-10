# Phase 0.2 — Foundation Validation Report

**Date:** 2026-07-11  
**Status:** Completed as design/shape validation  
**Dependencies installed:** None  
**Runtime/database execution:** Not performed

## 1. Scope and evidence

Phase 0.2 examined the risky foundation before production scaffolding without creating an application. Artifacts cover a minimal Fastify boundary, trusted tenant request context, Drizzle/PostgreSQL entity shapes, composite tenant keys/indexes, immutable double-entry ledger constraints, transaction boundaries, repository isolation conventions, negative isolation tests, migration direction, and PostgreSQL RLS feasibility.

This validates coherence and reviewability, not library compatibility or runtime correctness. TypeScript/SQL sketches are intentionally incomplete and must not be copied unchanged into production.

## 2. Validation conclusions

### Fastify foundation

Fastify remains suitable as a thin HTTP adapter. A health route and tenant-scoped order route can be expressed with explicit plugin/hook composition while the application port stays framework-independent. Trusted authentication and verified tenant-domain signals establish immutable request context before authorization/handlers. Client-provided tenant values never establish scope.

### Drizzle and PostgreSQL shape

The required entities fit PostgreSQL and Drizzle's explicit schema style. Platform-global `tenants` and `users` are classified separately; all sketched tenant-owned operational tables contain `tenant_id`. Composite primary/unique keys and tenant-leading indexes demonstrate the default convention. The abbreviated identity model still needs memberships before production design.

### Ledger

Wallets/accounts have no directly mutable balance. Money moves through immutable ledger transactions containing positive debit/credit entries, exact minor-unit amounts, one currency, and tenant-aware references. Posting occurs atomically only after at least two entries balance. Application/service validation plus a database assertion function is recommended initially; deferred constraint triggers and immutability triggers require executable PostgreSQL validation. Corrections use reversals.

### Transactions

Deposits, wallet posting, order creation/reservation, provider synchronization, refund transitions, and debt settlement each have explicit short transaction boundaries. External calls never occur while holding database transactions. Outbox records commit with local state; later effects are idempotent. Any invariant failure rolls back the entire local state transition and ledger posting.

### Tenant isolation and RLS

Repository APIs require a non-optional `tenantId`; unrestricted global queries belong to separate Super Admin repositories/use cases with explicit permission and audit. Negative integration tests must cover CRUD, lists, cursors, joins, raw SQL, caches, files, jobs, exports, and cross-tenant relationships. RLS is feasible using transaction-local tenant context and non-bypass runtime roles, but must be tested with pooling, Drizzle, workers, migrations, and maintenance access before acceptance.

### Migrations

Continue with Drizzle-generated, human-reviewed SQL and allow reviewed handwritten SQL for constraints, functions, triggers, RLS, and specialized financial operations. Production changes follow expand/migrate/contract, run as controlled release jobs, and include forward-recovery/rollback and production-like integration tests. Never rely on ORM schema generation alone as an integrity review.

## 3. Recommended conventions

1. Fastify types stop at the interface boundary; domain/application layers expose plain typed ports.
2. One trusted context resolver establishes tenant, actor, session, permissions, and correlation ID; disagreement fails closed.
3. Every tenant repository method requires tenant ID and every tenant relationship/key/query carries it.
4. Platform-global and tenant-scoped repositories are distinct; missing scope never means “all tenants.”
5. Ledger balances derive from immutable balanced postings; use holds for pending funds and reversals for correction.
6. Keep transactions short, avoid network calls inside them, use idempotency/versioning/ordered locks, and publish through an outbox.
7. Review all generated/handwritten SQL and verify migrations against real PostgreSQL.
8. Treat RLS as additional containment, not a substitute for application/repository isolation.

## 4. Risks remaining

- No dependencies were installed, so Fastify/Drizzle types, hooks, plugins, migrations, exact versions, and runtime behavior remain unverified.
- The full identity/membership, chart of accounts, currency, holds, settlement, refund, and reconciliation models are not designed here.
- Ledger semantics and account taxonomy require qualified accounting review.
- Application-level balance checks alone can be bypassed; database immutability/balance enforcement needs concurrency testing.
- Tenant scoping can be omitted in handwritten SQL unless repository boundaries, reviews, lint/architecture rules, and negative tests prevent it.
- RLS role ownership, pooling context, migration bypass, support tooling, performance, and failure modes remain unresolved.
- `bigint` minor units need confirmed currency/maximum-value policy; currencies with unusual precision or FX may require a reviewed exact-decimal approach.
- Provider/webhook failures and outbox/queue behavior need later executable failure testing.

## 5. Required before production scaffolding

1. Confirm exact supported Node.js, Fastify, Drizzle, PostgreSQL driver/server, schema-validation, migration, and test-runner versions.
2. Authorize a minimal disposable dependency workspace and real PostgreSQL instance for executable validation; do not turn it into `apps/api`.
3. Compile/start the minimal server and test health, tenant mismatch, permission denial, schema errors, and application delegation using Fastify injection.
4. Run reviewed migrations and integration tests for tenant composite FKs/uniqueness, transaction rollback, concurrent idempotency, balanced posting, reversal, and immutability.
5. Prototype RLS with pooled connections and distinct runtime/migration/admin roles; decide its scope in an ADR note.
6. Obtain accounting approval for ledger terminology, account taxonomy, signs, holds, currency precision, fees, refunds, chargebacks, and settlements.
7. Define the production membership model and repository/architecture-test templates.

## 6. Phase recommendation

**Proceed conditionally, but do not begin Phase 1 production scaffolding yet.** The selected foundations are coherent and no architectural blocker was found. Complete the narrow executable checks, version confirmation, RLS decision, and accounting review above. Once those gates pass, record results and authorize Phase 1 scaffolding with Fastify, Drizzle, and PostgreSQL.
