# DB Schema Cleanup Result

## Status and scope

The approved narrow Auth schema cleanup is complete. This change only closes the session-to-membership user-integrity gap. It does not add migrations, database runtime, Docker/PostgreSQL, Auth behavior, real data, or secrets.

## 1. Problem found by the approval gate

`user_sessions.user_id` referenced `users.id`, while nullable `user_sessions.tenant_membership_id` independently referenced only `tenant_memberships.id`. Those separate foreign keys proved that both records existed, but did not prove that the membership belonged to the session user. A session for user A could therefore have referenced user B's membership at the schema level.

## 2. Exact cleanup made

In `packages/db/src/schema/auth.ts`:

- added the unique composite key `tenant_memberships_id_user_unique` on `tenant_memberships(id, user_id)`;
- removed the single-column foreign key from `user_sessions.tenant_membership_id` to `tenant_memberships.id`;
- added `user_sessions_membership_user_fk`, a composite foreign key from `user_sessions(tenant_membership_id, user_id)` to `tenant_memberships(id, user_id)`;
- documented why `tenant_membership_id` remains nullable.

No export or package metadata change was required.

## 3. Why mismatch is prevented

When `tenant_membership_id` is present, PostgreSQL must find one `tenant_memberships` row whose `id` and `user_id` both match the session values. A membership owned by another user cannot satisfy the composite foreign key, so the database rejects the mismatch independently of application code.

When `tenant_membership_id` is `NULL`, the relationship intentionally represents a global/platform session with no selected tenant membership. That nullable state grants no tenant access: later runtime authorization must require and revalidate an active membership before any tenant-scoped action.

## 4. What remains blocked

The following remain unimplemented and unapproved:

- Drizzle configuration, generated SQL, migrations, migration journal, and seeds;
- Docker/PostgreSQL runtime, database drivers, connections, queries, repositories, and transactions;
- Auth routes, password hashing behavior, session token/cookie behavior, and authorization runtime;
- real users, customer data, production credentials, and secrets;
- provider, wallet, ledger, order, payment, frontend, and deployment work;
- deferred tenant/audit foreign keys and other lifecycle/policy decisions identified by the schema approval gate.

## 5. Why migrations were not generated

This approval permits schema cleanup only. Migration generation requires separate approval of the database and tenant-isolation decisions, migration and rollback policy, safe PostgreSQL test environment, synthetic test-data policy, generated-SQL review, and the absence of production secrets. TypeScript typecheck validates definitions but is not PostgreSQL DDL evidence.

## 6. Verification

Required checks for this cleanup:

- `pnpm --filter @akatsuki/db typecheck` — passed.
- `git diff --check` — passed with no whitespace errors.
- `git status --short` — reported the schema and documentation changes listed in this result; the task-file modification was already present.

## 7. Exact next safe step

**DB schema approval gate rerun only.**

Re-review the cleaned schema to confirm the same-user membership/session invariant is closed and decide whether any other schema cleanup is required. Do not generate migrations or implement Auth runtime as part of that gate.
