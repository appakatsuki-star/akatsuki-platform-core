# Auth DB Schema Code Review Result

## Status

- **Scope:** Review and narrowly harden existing Auth Drizzle PostgreSQL schema definitions.
- **Founder approval:** Auth DB schema code review only.
- **Review result:** **PASS WITH DEFERRED RUNTIME VALIDATION.**
- **Runtime status:** No database, Docker, connection, SQL generation, or migration was used.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

The code matches the approved Auth concept and now enforces the critical role/scope relationships that can be expressed without the future `tenants` and `audit_logs` tables.

## Files reviewed

- `packages/db/src/schema/auth.ts`
- `packages/db/src/index.ts`
- `packages/db/package.json`
- `packages/db/tsconfig.json`
- `packages/db/README.md`
- Auth concept, revision, approval-gate, implementation-result, and current-source documentation.

No connection, migration, repository, runtime query, Auth route, login, hashing, cookie, business logic, production user, or secret exists in `packages/db`.

## Concept conformance

| Requirement | Result |
|---|---|
| Globally unique `normalized_email` | PASS — explicit unique index |
| User statuses | PASS — `pending`, `active`, `suspended`, `disabled` enum |
| Membership statuses | PASS — `invited`, `active`, `suspended`, `revoked` enum |
| One role per membership | PASS — one non-null `role_id` per unique tenant/user membership |
| Platform assignments separate | PASS — dedicated `platform_role_assignments` table |
| Role-permission link | PASS — `role_permissions` links stable role and permission IDs |
| Stable permission keys | PASS — globally unique server-owned `permission_key` |
| Digest-only sessions | PASS — `session_token_digest`; no raw token column |
| Session lifecycle fields | PASS — `expires_at`, optional idle expiry, `revoked_at`, and `last_used_at` |
| Login-attempt privacy | PASS — fingerprints plus `ip_hash`/`user_agent_hash`; no raw IP/user-agent or credential payload |
| Failure categories | PASS — allowlisted enum and outcome/reason consistency check |
| Auth audit relationship only | PASS — `audit_actor_links` references future event IDs without creating `audit_logs` |

## Hardening corrections

1. Added a composite tenant-role foreign key so `tenant_memberships` cannot reference a platform role or a role owned by another tenant.
2. Added a constrained `role_scope` discriminator and composite foreign key so `platform_role_assignments` can reference only platform-scoped roles.
3. Added a constrained scope discriminator and composite foreign keys so every `role_permissions` link uses a role and permission from the same scope.
4. Added supporting unique keys on role/permission identity-plus-scope and role identity-plus-tenant.
5. Added checks that revoked platform assignments carry `revoked_at`, revoked sessions carry `revoked_at`, successful login attempts have no failure reason, unsuccessful attempts have one, and human audit actors have an actor user.
6. Clarified in the package README that database constraints complement application authorization and negative isolation tests.

No dependency, package manifest, export, lockfile, application, or workspace configuration change was required.

## Remaining risks and limitations

- Definitions have typechecked but have not been converted to SQL or exercised against PostgreSQL; actual DDL validity and behavior remain unverified.
- `tenant_id` cannot reference `tenants` until that separately approved schema exists.
- `audit_event_id` cannot reference `audit_logs` until the future audit boundary defines it.
- Session rotation self-reference/family, exact digest algorithm/length, retention durations, and cleanup policy remain intentionally deferred.
- Exact email canonicalization occurs outside schema code and needs later contract/runtime tests.
- Status-transition legality beyond local timestamp consistency requires approved application policy and, if selected, later database constraints.
- RLS, database roles, grants, migration ordering, concurrency behavior, and cross-tenant executable negative tests remain unverified.
- DB typecheck temporarily reuses the installed API TypeScript tool; package-local TypeScript ownership needs separate tooling approval.

## Exact next safe step

**Auth DB migration planning only.**

The next separately approved task should be documentation-only and specify migration ordering, naming, immutability/checksum review, enum/table/constraint dependencies, forward-fix and rollback limits, and required isolated PostgreSQL evidence. It must not generate migrations, run Docker/PostgreSQL, add a connection, or implement Auth.
