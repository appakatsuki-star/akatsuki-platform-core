# DB Package Current State Audit

## Status and scope

This is a read-only audit of the current `packages/db` implementation. It does not approve or add schema changes, migrations, database runtime, Auth runtime, production data, or infrastructure.

## 1. Current package inventory

Important files currently present:

- `packages/db/package.json` — package metadata, export map, one typecheck script, and the schema-definition dependency.
- `packages/db/README.md` — current boundary and explicit exclusions.
- `packages/db/tsconfig.json` — strict, no-emit TypeScript configuration.
- `packages/db/src/index.ts` — schema-only public export.
- `packages/db/src/schema/auth.ts` — Drizzle PostgreSQL Auth schema definitions.

`packages/db/node_modules` is a workspace installation link/artifact, not package source.

## 2. Package metadata

| Item | Current state |
|---|---|
| `package.json` | Exists |
| Name | `@akatsuki/db` |
| Version | `0.0.0` |
| Private | `true` |
| Module type | ESM (`module`) |
| Dependencies | `drizzle-orm` pinned to `0.44.5` |
| Development dependencies | None |
| Scripts | `typecheck` only |
| Exports | Package root and `./schema/auth`, both schema metadata only |

The typecheck script reuses the already-installed TypeScript executable from `@akatsuki/api`; this is workable for the current narrow check but is a coupling to retain as a documented condition rather than expand silently.

## 3. Drizzle status

| Capability | Present? | Evidence |
|---|---:|---|
| Drizzle ORM dependency | Yes | `drizzle-orm@0.44.5` in `packages/db/package.json` and the lockfile |
| Drizzle Kit dependency owned by this package | No | Not declared by `@akatsuki/db`; any lockfile occurrence belongs to other existing workspace validation tooling |
| Drizzle config | No | No config file under `packages/db` |
| Schema files | Yes | `src/schema/auth.ts` |
| Migrations folder | No | No package migration directory or SQL migration artifact |
| Migration journal | No | No Drizzle migration metadata/journal |
| Seed files | No | None under the package |
| Connection/runtime code | No | No client, pool, connection, query, repository, or transaction implementation |

The schema file creates TypeScript metadata only when imported. No command in this package generates or applies SQL.

## 4. Auth schema status

The current schema represents nine Auth-related tables and their supporting enums, indexes, checks, and foreign keys:

- `users`, including unique normalized email and lifecycle status;
- `tenant_memberships`, including one tenant role per membership for the MVP;
- `roles`, separated by platform or tenant scope;
- `permissions`, using a unique stable permission key;
- `role_permissions`, linking roles and permissions with matching scope;
- `platform_role_assignments`, separate from tenant memberships;
- `user_sessions`, storing a token digest rather than a raw bearer token and including expiry, last-use, and revocation fields;
- `login_attempts`, using privacy-preserving fingerprints/hashes and categorized outcomes/failures;
- `audit_actor_links`, providing the Auth-to-future-audit relationship without creating a full audit system.

The tenants and audit-log tables are intentionally absent, so their external foreign-key relationships remain deferred. No password hashing, token generation, cookie behavior, authorization evaluation, or other business logic exists.

## 5. Safety review

| Check | Result |
|---|---|
| Real secrets or production credentials | None found |
| Real database connection | None |
| Docker requirement | None |
| Real or production users/data | None |
| Data mutation | None; definitions only |
| Provider integration | None |
| Wallet, ledger, order, or payment logic | None |

Safety result: the checked-in package is inert schema-definition code. Importing its public entry point does not connect to a service, read environment variables, generate migrations, or mutate data.

## 6. Boundary review

- `packages/db` does not import from `apps/api` source. Its typecheck command locates the API workspace's installed TypeScript executable, which is tooling coupling rather than a source/runtime import.
- `packages/db` does not import from `validation/` or `spikes/`.
- No `apps/api` source imports `@akatsuki/db` or files from `packages/db`.
- No frontend source imports `@akatsuki/db` or files from `packages/db`.
- The package exports schema metadata only and has no runtime repository API.

Boundary condition: foundation documents originally preferred business-module ownership for Auth schemas and a shared DB package limited to technical primitives. The later, explicitly recorded Auth schema work placed these definitions in `packages/db`. Keep that narrow exception visible and do not allow the package to become a shared-table or unscoped-repository dumping ground.

## 7. Commands and checks

Safe existing checks selected for this audit:

- `pnpm --filter @akatsuki/db typecheck` — passed with exit code 0.
- `git diff --check` — passed with no whitespace errors.
- `git status --short` — reported the pre-existing modification to `docs/codex-next-task.md` and this new untracked `docs/phase-1-db/` directory.

No install, Docker, PostgreSQL, migration, generation, seed, or external connection command is required or authorized.

## 8. Decision

**Safe with conditions.**

The package is safe to retain in its current inert form because it contains no connection, credentials, data, mutations, migrations, or application dependency. Conditions:

1. do not treat successful TypeScript checking as PostgreSQL DDL or migration validation;
2. do not add a driver, connection, runtime query, repository, migration, or Drizzle configuration without a new approval;
3. preserve the documented Auth ownership exception and tenant/platform scope constraints;
4. retain the current source-of-truth warning that Phase 1 remains NO-GO.

## 9. Exact next safe step

**Pause and ask founder.**

Auth schema review and migration/tooling planning documents already exist, while the repository-wide source of truth remains NO-GO. The founder should choose and separately authorize the next narrow DB action; this audit does not recommend or authorize full Auth implementation.
