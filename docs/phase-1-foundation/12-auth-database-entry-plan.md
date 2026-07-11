# Auth + Database Entry Plan

## Status

- **Scope:** Decide one safe entry step after the verified API foundation shell.
- **Authorization:** Founder Conditional GO for this planning document only.
- **Recommended next step:** **Auth schema planning only**.
- **Implementation status:** No database, migration, Drizzle, authentication, or schema code is approved or created.
- **Phase 1 status:** Remains **NO-GO** outside the explicitly approved foundation work.

This plan does not approve Sprint 2, database infrastructure, real users, production credentials, or any authentication endpoint.

## 1. Current Backend Foundation Status

| Area | Verified state |
|---|---|
| API composition root | `apps/api` exists as an internal foundation shell |
| Runtime foundation | Dependency-free liveness/readiness, strict request IDs, safe errors, allowlist logging, and graceful lifecycle are implemented |
| Verification | Typecheck passed; 5 test files and 12 tests passed after hardening |
| Network testing | Fastify injection is used; tests do not open a network port |
| Database | No production database client, connection, schema, migration, query, repository, or transaction exists |
| Authentication | No user, password, session, MFA, RBAC, membership, login, cookie, or auth route exists |
| Tenant behavior | No tenant business context or tenant-scoped repository exists; client tenant/role headers create no authority |
| Business modules | No provider, catalog, pricing, wallet/ledger, payment, order, worker, frontend, UI, or AI logic exists |
| Secrets/real data | None are required or approved |

The API shell is a safe interface foundation, not evidence that persistence, identity, authorization, tenant isolation, legal/privacy, or production operations are ready.

## 2. Why Authentication Cannot Start Blindly

Authentication is not just a login route. It creates durable identity, authority, session, privacy, and audit records. Starting route or hashing implementation before the following contracts are accepted would embed security decisions accidentally.

### Database decision

- ADR 0004 (PostgreSQL) remains **Proposed**.
- ADR 0005 accepts Drizzle and reviewed PostgreSQL migrations, but that acceptance does not by itself approve a database host, connection package, schema, migration journal, or dependency installation.
- The ownership boundary must confirm whether auth schema/repositories live in the future `identity-access` module and what—if anything—a shared database package may contain.

### User model

The model must decide:

- one global identity versus tenant-specific identity duplication;
- normalized login identifiers and uniqueness rules;
- user lifecycle/status, verification, lockout, deletion/anonymization, and retention;
- separation of identity attributes from tenant membership and role assignments;
- Super Admin identity boundaries and whether platform authority is represented separately from tenant membership.

### Membership model

A user must not gain tenant access merely because the user exists. The plan must define:

- `user_id` + `tenant_id` membership uniqueness;
- membership status and invitation/acceptance lifecycle;
- tenant-scoped roles and permission evaluation;
- suspension/revocation effects on active sessions;
- prevention of cross-tenant role or resource inference.

### Session model

Opaque browser sessions require decisions for:

- raw token generation and one-way token hashing at rest;
- expiry, idle timeout, absolute lifetime, rotation, revocation, logout, and concurrent sessions;
- session-to-user and optional tenant/membership context;
- MFA/step-up state and sensitive-action reauthentication;
- HTTP-only, Secure, SameSite cookie policy and CSRF boundary;
- never storing/logging the raw session token.

### Roles and permissions

Fixed MVP roles and permission names must be approved before an authorization check can be correct. Platform permissions, tenant permissions, customer behavior, and future agent behavior must remain distinct. UI visibility cannot be authority.

### Password hashing policy

Security review must approve:

- an adaptive password hashing algorithm and parameters suitable for the production host;
- per-password salts, optional pepper ownership/rotation, and no reversible password storage;
- verification, rehash-on-login, reset, breach/strength policy, rate limits, and lockout behavior;
- safe test parameters that cannot leak into production defaults.

No exact hashing dependency or parameter is selected by this plan.

### Session token hashing policy

Password hashing and session-token hashing are different policies. Session tokens need high entropy, fast one-way digest/index lookup where appropriate, constant-time comparison, token-family/rotation rules, and strict non-logging. The database stores only the approved digest/reference, never the bearer token.

### Tenant isolation

ADR 0011 remains **Proposed**. Before persistence, every tenant-owned table, key, unique constraint, repository query, cache key, session context, and negative test must have an isolation rule. Client `tenant_id` headers remain untrusted.

### Audit policy

The audit catalog must define durable events for invitations, activation/suspension, login success/failure, logout, session creation/revocation, password changes/resets, MFA changes, role/permission changes, cross-tenant support actions, and admin security actions. Operational logs do not satisfy these audit requirements.

## 3. Options Evaluated

| Option | Benefit | Current blocker/risk | Decision |
|---|---|---|---|
| A. Database schema shell planning/implementation | Establishes persistence shape early | Implementation would precede accepted PostgreSQL/tenant-isolation/auth data decisions and could create empty infrastructure without an approved model | **Do not implement now**; schema planning is useful only after the auth data contract is drafted |
| B. Auth contracts only | Can define framework-neutral use-case/port shapes | Contracts without an agreed durable identity/session/membership model may encode wrong IDs, lifecycles, errors, and tenant assumptions | **Postpone** until auth schema planning is reviewed |
| C. DB package scaffold only | Could reserve connection/migration tooling location | `packages/db` was previously deferred; no approved consumer/ownership boundary exists, and module-owned schemas must not become a shared-table dumping ground | **Postpone** |
| D. Users/sessions migration planning only | Forces entity, constraint, retention, and isolation questions before code | Must remain documentation and include memberships/RBAC/audit—not generate SQL or a migration | **Recommended now as “Auth schema planning only”** |

## 4. Recommended Next Implementation Path

Choose **Auth schema planning only** as the one next narrow step.

This is safer because it:

1. defines identities, memberships, roles/permissions, sessions, login audit, lifecycle, retention, and tenant ownership before choosing table code;
2. exposes decisions that Founder, Security, Legal/Privacy, and Architecture/Database must review;
3. remains independent of Docker, database availability, Drizzle installation, and real credentials;
4. gives a later database schema shell explicit entities, invariants, foreign keys, uniqueness, indexes, deletion rules, and negative isolation tests;
5. prevents an auth route or generic DB package from becoming the accidental source of truth.

The output should be a table-level conceptual model and decision checklist only—no TypeScript schema, SQL, migration, API contract, cookie, hashing implementation, or install command.

## 5. Database Entry Decision

| Candidate | Status | Decision and rationale |
|---|---|---|
| Documentation-only auth schema model | **Recommended now** | Define conceptual entities, ownership, constraints, lifecycle, retention, audit, and tenant-isolation invariants without executable code |
| `packages/db` | **Postpone** | Re-evaluate after the first approved persistence consumer. If created later, it may own narrow connection/transaction/migration primitives—not business schemas or repositories |
| Drizzle configuration | **Blocked** | Requires accepted PostgreSQL/hosting/runtime configuration, exact dependency approval, schema ownership, migration policy, and a dedicated implementation prompt |
| Executable schema files | **Blocked** | Must wait for reviewed Auth schema planning and tenant-isolation decisions; schema stays module-owned |
| Migration folder/journal | **Blocked** | No generated or handwritten migration until migration naming, immutability, review, rollback/forward-fix, environment, and test rules are approved |
| PostgreSQL connection configuration | **Blocked** | Requires approved local/test/staging approach, secret injection, least-privilege roles, TLS/hosting, pool limits, timeouts, and no production credential in Git |
| Database driver/dependencies | **Blocked** | No installation is authorized; exact packages/versions and supply-chain review belong to a later prompt |
| Users/sessions tables | **Blocked** | Conceptual planning first; no table creation until specialist review and an explicit database schema implementation approval |

### Ownership recommendation

Future identity, membership, role assignment, session, and login-security schemas/repositories should be owned by the `identity-access` business module. A future shared DB package, if justified, should contain technical primitives only. `apps/api` composes adapters and must not own tables or persistence rules.

## 6. Docker Decision

Docker is **not needed** for Auth schema planning and must not be run.

Docker—or an explicitly approved equivalent isolated PostgreSQL service—will be needed only when a later database implementation ticket must verify executable behavior such as:

- migrations apply from an empty database and produce the expected schema;
- foreign keys, unique constraints, check constraints, and indexes work;
- tenant-isolation negative tests reject cross-tenant access;
- session digest uniqueness/revocation queries behave correctly;
- migration journal and rollback/forward-fix procedure can be exercised;
- no validation-only SQL/header/bootstrap is reused as production tooling.

That future prompt must explicitly authorize Docker, name the image/version or managed test service, define synthetic data only, bind locally, prohibit production credentials/data, define teardown/volume handling, and list the exact commands. Docker approval for database tests would not approve production deployment.

## 7. Future First Auth Implementation Boundary

After schema planning, specialist review, database entry approval, and a separately approved implementation ticket, the minimal auth foundation may include:

### Include later

- admin-capable global user identity model with explicit status/lifecycle;
- tenant memberships separate from users;
- fixed roles, permissions, and role assignments with platform/tenant separation;
- opaque server-side sessions storing only approved token digests/references;
- login attempt/security audit records and required durable audit events;
- approved adaptive password hashing and rehash policy;
- approved session-token generation, hashing, rotation, expiry, and revocation;
- HTTP-only session cookie with reviewed Secure, SameSite, CSRF, domain/path, and expiry rules;
- server-side trusted actor/tenant/membership/permission context;
- negative tenant-isolation and authorization tests;
- synthetic internal admin fixtures only if separately approved.

### Exclude

- OAuth, OpenID Connect, social login, passwordless login, SSO, or external identity providers;
- customer wallet, balances, ledger, deposits, transfers, payments, refunds, or settlement;
- provider credentials/access, catalog, pricing, fulfillment, or orders;
- frontend login/admin/customer pages or client-side authorization as truth;
- production users, customer PII, real email/SMS delivery, real secrets, production cookies/domains, or public access;
- AI automation, agents, SMM, FX, stock/manual fulfillment, or any other postponed module.

This scope is not approved by the present document; it is a boundary for future review.

## 8. Auth Schema Planning Deliverables

The next planning document should define, without code:

- conceptual `users`, `memberships`, `roles`, `permissions`, `role_assignments`, `sessions`, `login_attempts`, and required audit-event relationships;
- global versus tenant-owned classification for every entity;
- primary/foreign keys and tenant-aware uniqueness requirements;
- lifecycle/status enums and allowed transitions;
- password-hash/session-digest metadata without secret values;
- session expiry, rotation, revocation, MFA/step-up placeholders, and membership suspension effects;
- soft-delete, anonymization, legal hold, and hard-delete policy by entity;
- minimum indexes and query patterns without choosing executable syntax;
- audit events and data minimization/retention classifications;
- tenant-isolation invariants and negative tests;
- open decisions with required Founder, Legal/Privacy, Security, and Architecture/Database approvers;
- explicit mapping to `AUTH-001` and `AUTH-004`, without implementing either.

It must not generate migrations or settle unapproved choices silently.

## 9. Stop Conditions

Codex must stop when:

- PostgreSQL/database ownership or an ADR decision remains unclear for the requested code step;
- tenant ownership, trusted tenant context, or cross-tenant isolation behavior is ambiguous;
- Docker/database service is required without explicit approval naming its purpose and commands;
- any dependency installation, manifest change, or lockfile mutation is required without explicit approval;
- a migration/schema file would be generated or handwritten without a migration-specific approval;
- password/session hashing algorithm, parameters, cookie/CSRF policy, RBAC model, or audit failure policy is not reviewed for the requested implementation;
- a secret, real credential, production connection string, customer/user data, or production cookie/domain is requested or discovered;
- production access, provider/payment SDK, external email/SMS, or cloud/secret-manager coordination becomes necessary;
- the work would mix database/auth behavior into `apps/api` instead of an approved module/adapter boundary;
- accepted ADRs, current source of truth, specialist review, or requested scope conflict.

When stopped, preserve safe evidence without values, make no destructive cleanup, report the precise missing decision/approval, and do not proceed to another ticket.

## 10. Exact Next Recommended Prompt

**Prompt name:** `Start Phase 1 / Sprint 2 — Auth Schema Planning only.`

That prompt should authorize one documentation file only and explicitly prohibit dependencies, Docker, Drizzle, database/schema/migration code, auth routes, password/session implementation, real users/data/secrets, and all business/frontend work. Its output should be the conceptual deliverables in Section 8 and a human approval checklist.

Do not request “full Auth,” `DB package scaffold`, executable `Database schema shell`, or `Auth contracts` until that plan is reviewed and the relevant ADR/security/privacy/architecture decisions are accepted.
