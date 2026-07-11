# `@akatsuki/db`

## Status

**Auth schema definitions only.** This package contains typed Drizzle PostgreSQL definitions for the approved Auth entities. It still has no database connection, migrations, runtime queries, repositories, Auth behavior, or production configuration.

These definitions describe future database structure; they do not create tables or connect to a database. Their presence does not approve database infrastructure, migrations, Auth runtime implementation, or broader Phase 1 work.

## Future responsibility

The currently approved responsibility is limited to Auth schema definitions. If separately approved later, `@akatsuki/db` may also provide narrow shared technical database infrastructure such as:

- approved connection and transaction primitives;
- approved migration-runner integration and technical conventions;
- shared low-level database configuration types that contain no secrets;
- technical composition points used by module-owned persistence adapters.

Auth identity, membership, platform-role assignment, RBAC, session, login-attempt, and Auth-to-audit policy remain owned by the future Auth/identity-access persistence boundary. This package must not become a shared-table dumping ground, own business rules, expose global unscoped repositories, or let callers bypass tenant and platform authorization boundaries.

Schema-level composite foreign keys currently enforce that a tenant membership references a role owned by the same tenant, that platform assignments reference platform-scoped roles, and that role-permission links use matching scopes. These constraints complement rather than replace application authorization and future cross-tenant negative tests.

## Not implemented or allowed yet

Until a later explicit approval, this package must not contain:

- Drizzle Kit or migration configuration;
- PostgreSQL or other database drivers;
- database connection, pool, transaction, query, repository, or runtime code;
- generated or handwritten migrations, a migration journal, seed data, or fixtures;
- Docker/database runtime configuration;
- authentication, password hashing, session tokens/cookies, routes, or application code;
- provider, wallet, ledger, order, payment, frontend, UI, or AI code;
- credentials, connection strings, production users/data, or secrets.

`src/index.ts` exports schema metadata only. It performs no connection, query, migration, or other runtime side effect.

## Dependency and workspace state

- `drizzle-orm@0.44.5` is the only package dependency and is used only for PostgreSQL schema definitions.
- The only package script is a TypeScript typecheck.
- The typecheck temporarily reuses the workspace's already installed API TypeScript tool; adding a direct TypeScript development dependency requires separate tooling approval.
- The existing `packages/*` workspace pattern already includes this package.
- Creating the scaffold must not require `pnpm install` or change `pnpm-lock.yaml`.

## Exact next planned step

**Auth DB migration planning only**, under a separate Founder approval.

That documentation-only planning step should define migration ordering, enum/table/constraint creation order, review and checksum rules, forward-fix policy, rollback limits, and required PostgreSQL validation evidence. It must not generate a migration or run PostgreSQL/Docker without another explicit approval.
