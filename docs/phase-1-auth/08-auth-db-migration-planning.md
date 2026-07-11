# Auth DB Migration Planning

## Status and purpose

- **Scope:** Documentation-only planning for a future first Auth database migration.
- **Founder approval:** This migration planning document only.
- **Current schema review:** Auth DB schema code is **PASS WITH DEFERRED RUNTIME VALIDATION**.
- **Migration status:** No migration, generated SQL, migration journal, or Drizzle configuration exists or is approved here.
- **Runtime status:** No PostgreSQL, Docker, database connection, seed, or migration execution is used or approved here.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

This document defines dependency ordering, review gates, validation evidence, rollback expectations, and deferred relationships before any migration tooling is installed or SQL is generated. It is not migration SQL and must not be treated as an executable runbook.

## Current Auth schema status

The reviewed Drizzle PostgreSQL definitions in `packages/db/src/schema/auth.ts` contain nine tables:

| Table | Current responsibility |
|---|---|
| `users` | Global identities, normalized-email uniqueness, lifecycle status, and password-hash storage field |
| `roles` | Stable platform- or tenant-scoped role definitions and scope/tenant consistency |
| `permissions` | Stable server-owned permission keys with platform/tenant scope |
| `platform_role_assignments` | Platform-role assignment separated from tenant membership |
| `tenant_memberships` | One active/inactive relationship per tenant/user with one same-tenant role for MVP |
| `role_permissions` | Role-to-permission link with matching scope |
| `user_sessions` | Opaque session-token digest, expiry, use, and revocation metadata; no raw token |
| `login_attempts` | Minimized authentication security events using fingerprints/hashes rather than raw network/device values |
| `audit_actor_links` | Auth-side actor/subject/tenant/membership/session association to a future audit event; not a full audit system |

Supporting PostgreSQL enums describe user, membership, role, assignment, session, login outcome/failure, scope, and audit actor categories. The TypeScript definitions pass typecheck but have not been converted to SQL or validated against PostgreSQL.

## Proposed migration ordering

The first future migration should be generated as one reviewable Auth foundation unit only if the tooling plan and generation step are separately approved. Whether the generator emits statements in exactly this grouping or another equivalent dependency-safe order, review must establish the following logical sequence.

### 1. Create Auth enum types

Create the enum types before any table column that uses them:

1. `auth_user_status`
2. `auth_membership_status`
3. `auth_role_scope`
4. `auth_role_status`
5. `auth_assignment_status`
6. `auth_session_status`
7. `auth_login_attempt_outcome`
8. `auth_login_failure_reason`
9. `auth_audit_actor_type`

Their values must match the reviewed schema exactly. Enum changes after application are additive/forward-migration decisions and must not be improvised during rollback.

### 2. Create independent identity and RBAC tables

Create in this dependency-safe order:

1. `users`
2. `roles`
3. `permissions`

Create their primary keys, checks, and supporting unique keys before dependent foreign keys. In particular:

- `users.normalized_email` uniqueness must exist before identities can be populated;
- `roles` needs identity-plus-tenant and identity-plus-scope unique keys before composite references target them;
- `permissions` needs identity-plus-scope uniqueness before `role_permissions` targets it;
- the `roles_scope_tenant_consistency` check must exist before role assignments are allowed.

The future `roles.tenant_id → tenants.id` foreign key is not part of this migration unless an approved `tenants` schema and migration ordering exist first.

### 3. Create role assignment and membership tables

After `users`, `roles`, and `permissions` exist:

1. create `platform_role_assignments`;
2. create `tenant_memberships`;
3. create `role_permissions`.

This order makes every referenced identity/role/permission key available. The migration must preserve:

- platform assignments reference only a platform-scoped role;
- membership references one role owned by the same tenant;
- one membership exists per `(tenant_id, user_id)`;
- role and permission scopes match in `role_permissions`;
- active role/permission and platform-assignment uniqueness follows the reviewed partial-index behavior.

The eventual `tenant_memberships.tenant_id → tenants.id` foreign key is deferred with the `tenants` schema. No placeholder tenant table may be created merely to satisfy this migration.

### 4. Create sessions and login security tables

Create:

1. `user_sessions`, after `users` and `tenant_memberships`;
2. `login_attempts`, after `users`.

`user_sessions` needs user and optional membership references plus digest uniqueness, expiry indexes, and revocation consistency. `login_attempts` needs its optional user reference, time/correlation indexes, and outcome/failure consistency check. The optional login-attempt tenant foreign key remains deferred until `tenants` exists.

The deferred session-rotation self-reference must not be added by generated SQL unless the schema code and Security review explicitly approve its exact family/reuse behavior first.

### 5. Create the Auth audit association last

Create `audit_actor_links` after `users`, `tenant_memberships`, and `user_sessions`, because it may reference all three. Create its indexes and human-actor check with the table.

`audit_event_id` remains an indexed/unique identifier without a foreign key until the future audit boundary defines and owns `audit_logs`. Once that table exists, a separate reviewed migration may add the relationship without making Auth own the audit event store.

### 6. Review generated statement ordering

Before application, reviewers must confirm that every referenced unique/primary key exists before each foreign key, all named objects are deterministic, no generator-created implicit behavior weakens `RESTRICT`, and no unrelated validation/legacy tables appear. Generated output must be immutable after approval; changes require regeneration as a new reviewed candidate, not hand-editing without an explicit exception and rationale.

## Deferred dependencies

### `tenants`

No approved production `tenants` schema exists in this Auth boundary. The first Auth migration therefore cannot enforce foreign keys from `roles.tenant_id`, `tenant_memberships.tenant_id`, `login_attempts.tenant_id`, or `audit_actor_links.tenant_id` to `tenants`. The later tenancy migration must define ownership, deletion behavior, composite keys, ordering, and backfill/validation strategy before adding these foreign keys.

This deferral is a material limitation: application/repository policy and synthetic validation must not interpret an arbitrary UUID as trusted tenant authority.

### `audit_logs`

The future audit boundary owns `audit_logs`; Auth owns only `audit_actor_links`. The first Auth migration must not invent an audit table. A later migration may add the `audit_event_id` foreign key after event identity, immutability, retention, partitioning, deletion, and transactional-delivery decisions are approved.

### RLS policy

ADR 0011 and the RLS decision remain Proposed. No RLS policy should be generated accidentally with the first migration. A future RLS plan must define covered tables, trusted transaction-local tenant context, runtime/migration roles, pooled-connection reset behavior, fail-closed absence, maintenance bypass, and negative tests before policy SQL is approved.

### Database roles and grants

Runtime, worker, migration, read-only, monitoring, and break-glass roles/grants are not defined. The migration runner must eventually use a dedicated migration identity; ordinary runtime identities must not own objects, migrate schemas, bypass RLS, or receive broad access. Grants require a separate least-privilege matrix and executable denial tests.

### Migration journal

No production migration journal exists. Before generation/execution, the project must approve the journal location/table, immutable migration identity/order/checksum, drift detection, single-runner locking, environment separation, and release ownership. The disposable validation bootstrap must not be reused.

## Constraint validation plan

A future isolated PostgreSQL validation must inspect generated DDL and execute positive and negative cases for at least the following:

### Uniqueness

- duplicate `users.normalized_email` is rejected;
- duplicate platform or tenant role keys in the same applicable scope are rejected;
- duplicate `permissions.permission_key` is rejected;
- duplicate `(tenant_id, user_id)` membership is rejected;
- duplicate active platform assignment and duplicate active role/permission link are rejected while approved retained revoked history remains possible;
- duplicate session-token digest and duplicate `audit_actor_links.audit_event_id` are rejected.

### Composite foreign keys and scope alignment

- membership with a platform role is rejected;
- membership referencing a role from another tenant is rejected;
- platform assignment with a tenant role is rejected;
- role/permission link with mismatched scopes is rejected;
- references to missing users, roles, permissions, memberships, or sessions are rejected as currently defined;
- delete attempts against referenced identities use the reviewed `RESTRICT` behavior.

### Check constraints

- a platform role with non-null `tenant_id` and a tenant role with null `tenant_id` are rejected;
- platform assignment scope other than `platform` is rejected;
- active/revoked platform assignment timestamp combinations are enforced;
- human audit actor without `actor_user_id` is rejected.

### Session consistency

- revoked session without `revoked_at` is rejected;
- active/expired session with `revoked_at` is rejected under the current schema;
- expiry and digest indexes exist with the reviewed names;
- only `session_token_digest` is present—there is no raw token column.

### Login-attempt consistency and privacy

- success with a failure reason is rejected;
- failure/blocked without an allowlisted failure reason is rejected;
- enum-invalid failure categories are rejected;
- the table contains `email_fingerprint`, `ip_hash`, and `user_agent_hash`, not raw password/token/request-body/IP/user-agent columns.

The validation must use synthetic values only and verify actual constraint names/messages without exposing secrets or treating database errors as public API responses.

## Docker/PostgreSQL decision

Docker or another explicitly approved isolated PostgreSQL service becomes necessary only when reviewers need evidence that generated migration SQL applies and behaves correctly against the selected PostgreSQL version. TypeScript typecheck cannot prove DDL validity, foreign-key ordering, partial-index behavior, enum behavior, locking, or rollback characteristics.

**Docker/PostgreSQL is not approved in this planning step.** A future runtime-validation request must first provide:

- explicit approval to generate/review the migration candidate;
- the selected supported local PostgreSQL image/version and compatibility target;
- exact startup, bind, health, migration, inspection, test, teardown, and volume-handling commands;
- local-only access and synthetic data;
- no production credentials, secrets, data, hostnames, backups, or networks;
- clean-start and repeatability expectations plus stop conditions;
- confirmation that Docker approval is validation-only, not production deployment approval.

If Docker is unavailable, an alternative isolated service requires equivalent explicit approval and evidence boundaries. No connection string belongs in Git.

## Migration tooling decision

Drizzle Kit is likely needed later to generate a migration candidate from the reviewed Drizzle definitions and maintain the selected journal format. It is **not installed or approved now**. Its presence in historical/validation work does not make it an approved production dependency or configuration.

Before installing or invoking Drizzle Kit, a separate tooling plan/approval must specify:

- exact compatible `drizzle-kit`, `drizzle-orm`, TypeScript, and PostgreSQL versions;
- supply-chain/license review and whether the tool is package-local development tooling;
- one explicit schema input (`packages/db/src/schema/auth.ts`) and owned output directory;
- configuration location with no embedded connection string or secret;
- migration naming, ordering, journal, checksum/immutability, and drift policy;
- exact permitted generation command and prohibition on automatic application/push;
- generated-SQL review checklist, including unexpected drops, casts, defaults, locks, extension use, schemas, ownership, grants, RLS, and unrelated objects;
- how deferred `tenants`, `audit_logs`, RLS, grants, and self-references are prevented from being invented;
- repository scripts and CI behavior, including who can generate and who approves;
- what database driver, if any, is required only for later execution and its separate approval.

Generation and execution must remain separate permissions. Installing Drizzle Kit must not install a PostgreSQL client, start a database, generate SQL, or apply anything unless each action is explicitly approved.

## Rollback and forward-fix plan

- A generated migration candidate that has never been applied anywhere may be discarded/regenerated after review; the approved migration identity must not be silently overwritten.
- Before first application, reviewers must document whether each statement is transaction-safe and provide a tested down/rollback or forward-fix strategy. PostgreSQL enum rollback limitations require explicit treatment.
- Once applied to a shared/staging/production-like database, rollback requires a named incident/release decision, known application compatibility, data-preservation analysis, and an explicit reviewed procedure. A generated “down” file is not automatically safe.
- Prefer forward fixes after application when reversal could lose data, break newer application versions, or conflict with later migrations.
- Never reset, drop, recreate, or broadly truncate a production database to undo a migration.
- No destructive drop, type narrowing, enum-value removal, column rewrite, cascade, or data deletion proceeds without backup/PITR readiness, impact/lock estimate, owner approval, and tested recovery.
- Production backup/restore evidence, RPO/RTO, maintenance window, monitoring, and stop/abort criteria must be approved before any production migration. This plan does not provide that approval.

## Runtime validation plan

A future authorized validation should use a clean isolated PostgreSQL instance and synthetic fixtures to prove:

1. the migration applies once from an empty approved baseline;
2. the resulting schema matches reviewed enums, tables, columns, indexes, checks, unique keys, and foreign keys;
3. re-running the controlled migration command is a journaled no-op rather than duplicate DDL;
4. migration/journal drift and a concurrent second runner fail safely;
5. cross-tenant membership-role and platform/tenant scope mismatches are rejected;
6. session revocation and login outcome/failure checks accept valid combinations and reject invalid ones;
7. raw session tokens, passwords, raw IPs, and raw user agents have no storage column or fixture value;
8. cleanup or rollback/forward-fix procedure preserves required audit/security evidence;
9. runtime and read-only database roles cannot mutate schema or bypass approved scope controls once those roles exist.

“No tenant access without active membership” is an application authorization invariant, not fully enforceable by the present table definitions alone. A later Auth policy/integration validation must prove that missing, invited, suspended, or revoked membership is denied; client `tenant_id` cannot create authority; and an active session cannot rely on stale membership/permission state. Database constraints and future RLS provide defense in depth but do not replace this test.

## Stop conditions

Stop before generation or execution if any of the following remains true for the requested next action:

- Drizzle Kit/version/configuration, migration directory, journal, or review ownership is unapproved;
- generated SQL includes unexpected objects, drops, grants, RLS, extensions, raw SQL, or deferred foreign keys;
- PostgreSQL version, isolated runtime, synthetic-data boundary, commands, teardown, or credentials policy is unspecified;
- schema definitions and generated SQL differ without a reviewed explanation;
- migration ordering cannot satisfy composite keys/foreign keys;
- a production/staging database, secret, real identity, or customer data is requested or discovered;
- rollback/forward-fix, backup/recovery, lock impact, application compatibility, or stop criteria are missing for an applied environment;
- the work expands into Auth runtime, routes, hashing, cookies, tenants/audit implementation, providers, finance, orders, UI, or deployment.

## Exact next recommended step

**Drizzle migration tooling plan only.**

This is the safest next step because tool/version/configuration/journal/output/review boundaries must be accepted before installing Drizzle Kit or generating SQL. Do not install tooling, generate a migration, start Docker/PostgreSQL, add a driver/connection, or execute SQL as part of that next planning document.

## Explicit exclusions

This plan creates no dependency, manifest/lockfile/workspace change, Drizzle Kit configuration, migration directory/file/journal, generated or handwritten SQL, Docker/PostgreSQL runtime, database driver/connection, seed/fixture, schema-code change, Auth runtime/route/login/hash/cookie, app/provider/wallet/ledger/order/payment/frontend/UI/AI code, real user/data, credential, secret, deployment, commit, or push.
