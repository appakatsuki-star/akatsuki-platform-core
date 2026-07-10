# Phase 0.1 — Technical Spike Results

**Date:** 2026-07-11  
**Scope:** architecture investigation only  
**Dependency installation:** none  
**Execution/benchmarking:** none

## 1. Accepted outcome

- **Backend: Fastify on Node.js/TypeScript.** It best preserves an explicit, framework-independent modular-monolith design with less ceremony and fewer framework-specific concepts. Akatsuki must supply a small, documented composition/auth/error convention layer.
- **ORM: Drizzle with PostgreSQL.** Its SQL proximity and transparent access to PostgreSQL constraints, tenant-aware composite keys, transactions, and specialized ledger SQL fit strict financial and isolation requirements better than a higher abstraction.

The project accepted these directions in [ADR 0002](../adr/0002-backend-runtime.md) and [ADR 0005](../adr/0005-orm-and-migrations.md). Acceptance is based on architectural fit and the recorded code-shape comparison, not measured runtime results. Exact versions and executable integration behavior must still be confirmed before production scaffolding.

## 2. Backend runtime comparison

Scoring uses 1 (weak for Akatsuki) to 5 (strong). Scores express architectural fit, not universal framework quality.

| Criterion | Fastify | NestJS | Finding |
|---|---:|---:|---|
| Startup simplicity | 5 | 3 | Fastify needs a server plus registered plugins; NestJS adds bootstrap, modules, providers, decorators, and metadata. |
| Routing | 5 | 4 | Both are clear; Fastify colocates schemas/hooks, while Nest controllers are highly readable but decorator-driven. |
| Plugins/modules | 4 | 5 | Nest provides stronger module/DI conventions. Fastify plugins are lighter and explicit but need project rules. |
| Validation | 5 | 4 | Fastify's route schemas align validation and serialization. Nest pipes are capable but commonly require additional validation/schema decisions. |
| Auth/session support | 4 | 4 | Both integrate guards/hooks and cookie/session adapters. Neither supplies Akatsuki's session, tenant, or policy model automatically. |
| Testing approach | 5 | 4 | Fastify injection enables small HTTP tests. Nest has strong testing utilities but more DI/module setup. |
| Performance expectation | 5 | 4 | Fastify is designed for low overhead; Akatsuki-specific latency was not benchmarked and provider/database time will dominate many flows. |
| Maintainability | 4 | 4 | Fastify wins on transparency; Nest wins on enforced conventions. Either deteriorates without boundary tests. |
| Modular monolith fit | 5 | 4 | Fastify is a thin interface adapter and avoids confusing framework modules with domain modules. Nest can work if its modules remain interface/composition concerns. |
| Multi-tenant SaaS fit | 4 | 4 | Equivalent: isolation belongs in trusted context, use cases, repositories, async messages, caches, and storage. |
| Developer experience with Codex | 5 | 4 | Explicit functions/types and fewer hidden decorators make generated changes easier to inspect. Nest's conventions help discovery but can encourage boilerplate. |
| **Total** | **51/55** | **44/55** | Fastify is preferred for this architecture. |

### Backend conclusion

Select Fastify as the HTTP/interface framework, not as the architecture. Domain and application code must not import Fastify. Define one composition root, typed request context, authentication/permission hooks, schema convention, stable error mapper, logging/tracing hooks, and plugin-boundary tests. Workers should call the same application use cases without an HTTP framework.

NestJS remains a credible alternative if the implementation team already has materially stronger NestJS operational expertise or needs its opinionated DI convention. That evidence should be recorded before overriding the recommendation.

## 3. ORM comparison

| Criterion | Drizzle | Prisma | Finding |
|---|---:|---:|---|
| PostgreSQL support | 5 | 4 | Both support PostgreSQL; Drizzle keeps PostgreSQL constructs closer, while some advanced features in either require SQL. |
| Migrations | 4 | 4 | Both generate migrations requiring review. Drizzle is more SQL-visible; Prisma offers polished workflow but advanced constraints/RLS need custom SQL. |
| Type safety | 5 | 5 | Both are strongly typed. Prisma generates a client; Drizzle infers types from TypeScript schemas. Runtime policy safety is separate. |
| Ledger modeling | 5 | 4 | Drizzle exposes exact types, checks, locks, functions, and SQL assertions more directly. Prisma models relations well but ledger invariants cross into raw SQL. |
| Tenant filtering | 4 | 4 | Both can express `tenantId`; neither guarantees it cannot be omitted. Scoped repositories and RLS/negative tests are mandatory. |
| Transactions | 5 | 5 | Both support interactive/batch transactions. Exact isolation, locking, retry, and timeout behavior requires executable validation. |
| Raw SQL escape hatch | 5 | 4 | Both provide parameterized raw SQL; Drizzle's SQL-first model makes mixed queries less conceptually exceptional. |
| Schema readability | 4 | 5 | Prisma's DSL is exceptionally concise. Drizzle keeps schema next to TypeScript but is noisier. |
| Long-term maintainability | 5 | 4 | For a PostgreSQL-heavy platform, visible SQL lowers abstraction surprises; Prisma may be easier for CRUD-heavy onboarding. |
| Strict financial ledger fit | 5 | 4 | Drizzle better matches the need for reviewed constraints, composite keys, exact SQL, locking, and database functions. |
| **Total** | **47/50** | **43/50** | Drizzle is preferred for database control. |

### ORM conclusion

Select Drizzle as a typed query/schema layer, not as a substitute for database design. Modules own schemas and repositories; tenant context is explicit; migrations are reviewed SQL using expand/migrate/contract. Use parameterized SQL for balance assertions, complex locks, RLS, or reconciliations when clearer. Domain entities remain separate from persistence records.

Prisma remains attractive for schema readability, generated-client consistency, and onboarding. It should replace the recommendation only if an executable spike proves equal control over the required PostgreSQL invariants while showing a meaningful team-velocity advantage.

## 4. Cross-cutting risks

1. **No runtime evidence:** dependencies were not installed, so startup, type errors, version compatibility, test ergonomics, migrations, and performance were not measured.
2. **Convention burden:** Fastify and Drizzle are explicit but less prescriptive; without templates and architecture tests, teams can implement inconsistent composition/repositories.
3. **Tenant-filter omission:** neither framework nor ORM inherently prevents cross-tenant queries. Trusted tenant context, scoped repositories, composite constraints, optional RLS, and negative tests remain required.
4. **Ledger correctness:** an ORM cannot define the accounting model. Account taxonomy, debit/credit semantics, holds, reversals, currency precision, and reconciliation require accounting review.
5. **Ecosystem/version drift:** conclusions must be rechecked against the exact versions selected at scaffolding time.
6. **Team fit:** unfamiliarity with Fastify/Drizzle could erase theoretical simplicity; training and ownership must be assessed.
7. **Codex guardrails:** code generation can replicate a flawed pattern quickly. Public module APIs, lint/architecture rules, migrations, and security tests require human review.

## 5. ADR disposition

Architecture review produced the following disposition:

- **ADR 0002 — Accepted:** Node.js/TypeScript with Fastify; Fastify is an interface adapter, application/domain layers are framework-independent, and workers remain separate.
- **ADR 0005 — Accepted:** Drizzle with PostgreSQL; module-owned repositories/schema, reviewed SQL migrations, parameterized raw SQL, and expand/migrate/contract are required.
- **ADR 0011:** retain explicit tenant context and mandatory `tenant_id`; acceptance of RLS remains conditional on an executable Drizzle/RLS validation.
- **ADR 0001:** pnpm remains proposed but was not exercised because dependency/workspace setup was outside this spike.

The accepted ADRs record the approval date and link to this evidence. Exact implementation versions remain intentionally open until production scaffolding preparation.

## 6. Open questions

- Does the team have production experience that materially favors NestJS or Prisma?
- Is PostgreSQL RLS mandatory for every tenant-owned table, and how will privileged maintenance be audited?
- Which exact Node, Fastify, Drizzle, PostgreSQL, test runner, validation-schema, and migration tool versions will be supported?
- What transaction isolation, lock/retry behavior, and latency are required for ledger posting?
- Who approves migration SQL and the ledger/accounting invariants?
- What minimum measured evidence is required before production scaffolding?

## 7. Recommended next step

Before production scaffolding, confirm exact Node.js, Fastify, Drizzle, PostgreSQL driver, migration, validation, and testing versions. Then run a narrow executable foundation validation against disposable PostgreSQL: verify tenant-scoped repositories, composite keys, reviewed migrations, transactions/concurrency, ledger constraints, rollback behavior, and the future RLS approach. This validation must not become production scaffolding until its results are reviewed.
