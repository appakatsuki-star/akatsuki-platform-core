# ADR 0005: ORM and Migration Strategy

**Status:** Accepted

**Accepted:** 2026-07-11

**Evidence:** [Phase 0.1 technical spike](../spikes/phase-0-1-results.md)

## Context

The data layer must support explicit SQL constraints, tenant-scoped repositories, transactions, exact ledger operations, controlled migrations, and testability. Tool convenience must not hide database semantics or permit cross-module model access.

## Decision

Use **Drizzle with PostgreSQL** as the accepted typed persistence and migration direction. Keep schemas and repositories owned by their modules, and require every tenant-owned repository operation to receive and apply trusted tenant context. Treat generated migrations as reviewed SQL artifacts and use expand/migrate/contract for production changes. Permit reviewed, parameterized SQL for constraints, locks, balance assertions, reconciliation, PostgreSQL RLS, and other operations that are clearer or safer in SQL.

Drizzle was selected over Prisma because it remains closer to PostgreSQL and makes SQL behavior easier to inspect. That control better fits strict double-entry ledger modeling, composite tenant keys, exact financial constraints, specialized transactions/locking, and explicit migrations. Its raw SQL escape hatch is a natural extension of the typed query layer rather than an exceptional path. Drizzle does not replace database design, repository enforcement, or accounting validation.

## Options considered

- **Drizzle:** selected for PostgreSQL proximity, typed queries, composite-key/constraint visibility, transparent migrations, and a strong parameterized SQL escape hatch. It requires strict repository and migration conventions.
- **Prisma:** offers excellent schema/client ergonomics and developer onboarding. It was not selected because its generated abstraction and migration workflow provide less direct control for advanced PostgreSQL constraints, RLS, ledger assertions, and specialized financial queries.
- **Query builder/raw SQL:** maximum control, but more repetitive typing/mapping and inconsistent patterns without discipline.
- **Active Record ORM:** convenient for CRUD, but encourages domain entities to depend on persistence and cross-module navigation.

## Consequences

Database behavior remains visible and advanced PostgreSQL features remain accessible. The team owns strict transaction/repository conventions and must review generated SQL. ORM records remain separate from domain entities. Migrations deploy through a controlled release step and remain compatible with rolling application versions. Tenant-isolation tests are mandatory, and PostgreSQL RLS remains a future defense-in-depth evaluation rather than an assumed ORM feature.

## Risks

- Repository conventions must prevent tenant-owned queries without trusted `tenant_id` scope; type safety alone cannot enforce authorization.
- Cross-tenant negative tests are required for repositories, transactions, pagination, raw SQL, and background work.
- PostgreSQL RLS still requires an executable evaluation with Drizzle, migrations, connection roles, and audited maintenance bypass.
- Ledger account taxonomy, debit/credit semantics, currency precision, holds, reversals, and reconciliation require accounting review.
- Exact Drizzle, migration-tool, PostgreSQL, and driver versions require confirmation before production scaffolding.
- Raw SQL or migration mistakes can bypass tenant/financial guards; Drizzle tooling and upgrade edge cases require disciplined review.

## Open questions

- Which exact Drizzle, PostgreSQL driver, migration tool, and PostgreSQL versions will be pinned?
- Which repository API makes tenant scope mandatory and difficult to bypass?
- Will RLS apply to every tenant table or selected high-risk domains, and how will maintenance bypass be audited?
- Will migrations run as a dedicated release job, and who approves generated and handwritten SQL?
- Which database integration-test and rollback/forward-recovery process will be mandatory?
- Who approves the ledger accounting model and database-enforced financial invariants?
