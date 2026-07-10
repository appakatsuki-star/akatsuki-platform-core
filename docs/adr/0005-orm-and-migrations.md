# ADR 0005: ORM and Migration Strategy

**Status:** Proposed

## Context

The data layer must support explicit SQL constraints, tenant-scoped repositories, transactions, exact ledger operations, controlled migrations, and testability. Tool convenience must not hide database semantics or permit cross-module model access.

## Decision

Prefer **Drizzle ORM with PostgreSQL**, subject to a Phase 0 spike covering tenant-aware queries, multi-table transactions, exact numerics, locking, migration review, and repository ergonomics. Keep schemas and repositories owned by modules. Treat generated migrations as reviewed SQL artifacts and use expand/migrate/contract for production changes. Permit reviewed parameterized SQL for operations the ORM cannot express safely.

## Options considered

- **Drizzle:** preferred for SQL proximity, typed queries, lightweight runtime, and transparent migrations; requires stronger repository conventions.
- **Prisma:** excellent schema/client ergonomics and developer onboarding, but generated abstraction and migration workflow can be restrictive for advanced PostgreSQL constraints, RLS, and ledger queries.
- **Query builder/raw SQL:** maximum control, but more repetitive typing/mapping and inconsistent patterns without discipline.
- **Active Record ORM:** convenient for CRUD, but encourages domain entities to depend on persistence and cross-module navigation.

## Consequences

Database behavior remains visible and advanced PostgreSQL features remain accessible. The team owns transaction/repository conventions and must review generated SQL. ORM entities are persistence records, not domain entities. Migrations deploy independently and compatibly with rolling application versions.

## Risks

Drizzle tooling maturity or migration edge cases may cause friction; ad hoc SQL can bypass tenant guards; type safety does not guarantee runtime authorization; switching ORM after implementation would be costly.

## Open questions

- Does the spike prove safe decimal, locking, RLS, and composite tenant-key behavior?
- Does Prisma materially improve team velocity enough to outweigh PostgreSQL control concerns?
- Will migrations run as a dedicated release job, and who approves them?
- Which database integration-test and rollback/forward-recovery process will be mandatory?
