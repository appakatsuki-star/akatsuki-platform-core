# DB Schema Approval Gate

## Status and scope

This gate reviews the existing `packages/db` Auth schema as documentation and source only. It does not change or approve schema code, migrations, PostgreSQL/Docker runtime, database connections, Auth runtime, real data, or production deployment.

## 1. Review result

**Needs cleanup before continuing.**

The schema has strong baseline coverage and remains inert, but it is not ready for migration generation. In particular, the current session relationship does not enforce that a referenced tenant membership belongs to the same user as the session. Other tenant, audit, identity-population, lifecycle, and PostgreSQL validation decisions remain unresolved.

This result does not reject the current package as unsafe to keep. It rejects advancing the current schema directly into migration generation.

## 2. Auth schema coverage

| Concept | Coverage | Review note |
|---|---|---|
| Users | Covered | Global identity, normalized email uniqueness, lifecycle status, password verifier field, lock and security timestamps |
| Tenant memberships | Covered with conditions | Tenant/user uniqueness, one-role-per-membership MVP, lifecycle timestamps and tenant-role composite FK; tenant table FK is deferred |
| Roles | Covered | Platform/tenant scopes, stable key, lifecycle status, and scope/tenant consistency check |
| Permissions | Covered | Globally unique server-owned key, platform/tenant scope, and lifecycle status |
| Role permissions | Covered | Active-link uniqueness and composite FKs require role/permission scope agreement |
| Sessions | Covered with a required fix | Token digest, expiry, idle expiry, last use and revocation exist; user-to-membership consistency is not enforced |
| Login attempts | Covered with conditions | Outcome/failure categories and privacy-preserving fingerprints/hashes exist; tenant FK and retention policy are deferred |
| Audit/Auth relationship | Conceptually covered | `audit_actor_links` links Auth actors/subjects/session/membership to a future audit event; the audit table/FK is intentionally absent |

The separate `platform_role_assignments` table correctly keeps platform authority outside `tenant_memberships` and restricts assignments to platform-scoped roles.

## 3. Security review

| Security check | Result |
|---|---|
| Password storage | `password_hash` only; no plaintext or reversible password field |
| Session credential storage | `session_token_digest` only; no raw bearer-token field |
| Session lifecycle | Absolute expiry, optional idle expiry, last use, status, revocation time and reason are represented |
| Login attempt evidence | Represented with allowlisted outcome/failure categories and hashed/fingerprinted signals rather than raw IP/user-agent |
| Production secrets or credentials | None found |
| Real users or production records | None found |
| Database connection/runtime code | None found |
| Docker/PostgreSQL runtime | None required or present in `packages/db` |

The schema does not implement password hashing, token generation/digest policy, cookies, session rotation, authorization evaluation, retention, or runtime revocation. Those remain separate Security and Auth implementation decisions.

## 4. Tenant isolation review

- `users` are modeled as platform-global identities and grant no tenant access by themselves.
- `tenant_memberships` are the explicit tenant-access relationship and use tenant-aware uniqueness and role ownership constraints.
- Super Admin/platform authority is represented separately through `platform_role_assignments`; it does not imply membership in every tenant.
- The schema contains no client-header authority or request resolver. Tenant authority must later come from trusted membership/domain/credential/job context and be rechecked server-side; client headers must never establish it.
- Customer users and platform operators share the global `users` identity store, but the schema does not classify or constrain their operational populations. The approved concept says they must not be mixed into one operational population or permission path unless separately approved. That policy and its enforcement mechanism remain unresolved before runtime Auth.

Required isolation fix: `user_sessions.user_id` and `user_sessions.tenant_membership_id` are independently referenced. A database constraint does not currently prevent a session for user A from referencing user B's membership. The schema needs a reviewed same-user composite relationship or a deliberate alternative before migration generation.

The absence of the future `tenants` table means `roles.tenant_id`, `tenant_memberships.tenant_id`, `login_attempts.tenant_id`, and `audit_actor_links.tenant_id` cannot yet have tenant foreign keys. This is documented deferral, not migration readiness.

## 5. Migration readiness

**Migrations are not allowed now.** No migration may be generated or applied from this gate.

Conditions required before migration generation:

1. accept or otherwise explicitly approve the database direction in ADR 0004; ADR 0005 accepts Drizzle, but PostgreSQL selection remains Proposed;
2. accept or explicitly approve the tenant-isolation direction in ADR 0011 and resolve the session-to-membership same-user invariant;
3. approve the migration policy, including ordering, immutable review artifacts, checksums, forward-fix rules and release ownership;
4. separately approve a local Docker/PostgreSQL test environment and its exact safe commands;
5. approve rollback/roll-forward strategy and define which schema changes are recoverable;
6. approve synthetic test-data and cleanup policy, with no real users or customer data;
7. enforce that no production secrets, credentials, connection strings, or production database are used;
8. resolve the schema gaps below and pass a new schema review;
9. validate generated DDL and constraints against an approved PostgreSQL version rather than treating TypeScript typecheck as database evidence.

## 6. Gaps and risks before migration generation

### Required schema/constraint cleanup

- Enforce that a session's optional tenant membership belongs to the same `user_id` as the session.
- Decide when the separately owned `tenants` table is available and add reviewed tenant foreign keys; do not invent that table in an Auth cleanup task.
- Decide how `audit_actor_links.audit_event_id` is constrained once the audit boundary exists.
- Review whether `rotated_from_session_id` requires a self-FK and token-family invariants after Security defines rotation policy.
- Add or deliberately reject database checks tying membership statuses to `activated_at`, `suspended_at`, and `revoked_at`; current timestamps can contradict status.
- Review similar assignment/session lifecycle checks for all allowed transitions and expiry relationships.

### Decisions and validation still required

- Approve the customer-versus-platform-operator population policy and its application/schema enforcement.
- Approve normalized-email production rules and test that application normalization matches the unique stored value.
- Approve password verifier nullability/lifecycle, hashing policy, and required privileged-user MFA without implementing them in this gate.
- Approve absolute/idle session lifetimes, digest algorithm, rotation/reuse behavior, retention and concurrent-session limits.
- Approve login-attempt and security-signal retention, hashing/key rotation, access controls, and deletion policy.
- Verify partial unique indexes, composite foreign keys, checks, enum ordering, deletion actions, and query indexes through generated-SQL review and approved PostgreSQL tests.
- Resolve the documented ownership tension between module-owned Auth persistence and placing business schema definitions in shared `packages/db`; do not expand this exception into unrelated schemas or repositories.

No provider, wallet, ledger, order, payment, frontend, production-user, or secret concern is present in the reviewed package.

## 7. Exact next safe step

**DB schema cleanup only.**

A separate founder approval should authorize only the smallest reviewed corrections to the existing Auth schema, starting with the session-to-membership same-user invariant and documenting which deferred cross-boundary constraints remain intentionally unavailable. It must still exclude migrations, connections, Docker/PostgreSQL runtime, Auth runtime, real data, and unrelated domains.
