# Auth DB Schema Code Result

## Status

- **Scope:** Drizzle PostgreSQL Auth schema definitions only inside `packages/db`.
- **Founder approval:** Auth DB schema code only.
- **Result:** Nine Auth tables and their supporting enums, indexes, checks, and references were defined.
- **Runtime status:** No database was started or connected; no SQL or migration was generated or applied.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

## Package structure

- `packages/db/package.json` — `drizzle-orm` dependency, schema exports, and typecheck script.
- `packages/db/tsconfig.json` — strict TypeScript configuration.
- `packages/db/src/index.ts` — schema-only exports.
- `packages/db/src/schema/auth.ts` — Auth PostgreSQL schema definitions.
- `packages/db/README.md` — current boundary and exclusions.

The root `package.json` adds only `db:typecheck`. `pnpm-workspace.yaml` is unchanged.

## Tables defined

- `users`
- `platform_role_assignments`
- `tenant_memberships`
- `roles`
- `permissions`
- `role_permissions`
- `user_sessions`
- `login_attempts`
- `audit_actor_links`

The definitions encode globally unique normalized email, approved user/membership statuses, one tenant role per membership, separate platform-role assignments, stable permission links, digest-only sessions, expiry/revocation/activity fields, pseudonymous login-attempt signals, allowlisted failure categories, and the Auth-side link to a future audit event.

## Dependency result

`drizzle-orm@0.44.5` was already present in the workspace lock/store through validation work and was added as the only direct dependency of `@akatsuki/db`. No Drizzle Kit, database client, hashing, token, validation, provider, payment, or frontend dependency was added.

The DB typecheck temporarily invokes the already installed TypeScript tool from `@akatsuki/api`. A direct TypeScript development dependency was not added because this approval permits installing only `drizzle-orm`; package-local tooling ownership remains a limitation for later approval.

## Intentionally deferred

- tenant foreign keys until an approved `tenants` schema exists;
- the audit-event foreign key until the future audit boundary owns `audit_logs`;
- exact password and session digest algorithms/parameters;
- session token-family/self-reference details and retention durations;
- physical database, RLS, connection, pool, repository, and transaction behavior;
- migrations, migration journal/configuration/generation, seed data, and fixtures;
- runtime Auth, routes, login, hashing, cookies, real users, secrets, and deployment.

Comments in the schema mark these deferrals. They must not be silently filled by migration or runtime work.

## Exact next safe step

**Auth DB schema code review only.**

The next separately approved review should inspect schema fidelity, tenant/scope constraints, relationship safety, privacy minimization, indexes, and migration readiness. Do not generate migrations, run PostgreSQL/Docker, add connections, or implement Auth during that review.
