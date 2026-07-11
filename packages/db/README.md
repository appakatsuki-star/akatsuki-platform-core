# `@akatsuki/db`

## Status

**Scaffold only.** This package currently contains metadata and boundary documentation. It has no executable source, exports, dependencies, scripts, schema, migrations, database connection, or runtime behavior.

Creating this directory does not approve database infrastructure, PostgreSQL, Drizzle, Auth implementation, or any broader Phase 1 work.

## Future responsibility

If separately approved, `@akatsuki/db` may provide narrow shared technical database infrastructure such as:

- approved connection and transaction primitives;
- approved migration-runner integration and technical conventions;
- shared low-level database configuration types that contain no secrets;
- technical composition points used by module-owned persistence adapters.

Auth identity, membership, platform-role assignment, RBAC, session, login-attempt, and Auth-to-audit policy remain owned by the future Auth/identity-access persistence boundary. This package must not become a shared-table dumping ground, own business rules, expose global unscoped repositories, or let callers bypass tenant and platform authorization boundaries.

## Not implemented or allowed yet

Until a later explicit approval, this package must not contain:

- Drizzle ORM or Drizzle Kit dependencies/configuration;
- PostgreSQL or other database drivers;
- database connection, pool, transaction, query, repository, or runtime code;
- schema/table definitions, including users, memberships, roles, permissions, sessions, login attempts, or audit relationships;
- generated or handwritten migrations, a migration journal, seed data, or fixtures;
- Docker/database runtime configuration;
- authentication, password hashing, session tokens/cookies, routes, or application code;
- provider, wallet, ledger, order, payment, frontend, UI, or AI code;
- credentials, connection strings, production users/data, or secrets.

No `src/` directory or `index.ts` is present because this scaffold has no approved executable API.

## Dependency and workspace state

- `package.json` intentionally has no `dependencies` or `devDependencies`.
- It intentionally has no scripts requiring unavailable tooling.
- The existing `packages/*` workspace pattern already includes this package.
- Creating the scaffold must not require `pnpm install` or change `pnpm-lock.yaml`.

## Exact next planned step

**Auth DB schema implementation planning**, under a separate Founder approval.

That planning step should translate the approved Auth concept into a non-executable database schema plan: ownership, entities, keys, tenant-aware relationships, uniqueness, lifecycle constraints, indexes, retention, audit coupling, and negative tests. Auth schema code may begin only after that plan and its required Security, Legal/Privacy, Architecture/Database, and ADR decisions are approved.
