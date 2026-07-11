# Auth Schema Approval Gate

## Status and gate purpose

- **Gate scope:** Review the conceptual Auth schema before any database, SQL, Drizzle, migration, package scaffold, or authentication implementation work.
- **Authorization:** Founder conditional approval for this gate document only.
- **Gate result:** **FAIL — the Auth Schema Concept Plan must be revised before database schema work.**
- **Implementation status:** No database or authentication implementation is approved or created by this gate.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

This gate evaluates whether the conceptual model is sufficiently resolved to become a future database schema plan. It does not approve PostgreSQL, database infrastructure, `packages/db`, schema code, migrations, Drizzle configuration, dependencies, authentication routes, credentials, sessions, cookies, users, or deployment. ADR 0006 and ADR 0011 remain Proposed, while accepted ADR 0005 does not by itself authorize a database package or schema.

## Review checklist

| Area | Result | Review finding |
|---|---|---|
| `users` | Covered | Defined as global identities that grant no tenant access by themselves. Identity lifecycle and password-verifier intent are present. Global email normalization/uniqueness and customer-identity separation remain unresolved schema inputs. |
| `tenant_memberships` | Covered with blocking gap | Defined as the tenant access relationship with `tenant_id`, `user_id`, status, and role reference. Active membership is required. Exact role cardinality and lifecycle/retention rules remain unresolved. |
| `roles` | Covered with blocking gap | Defined as named, reviewed bundles with platform-versus-tenant scope. The plan does not yet settle how platform roles, especially Super Admin, are assigned to identities. |
| `permissions` | Covered | Defined as stable, server-owned keys with reviewed meaning and scope. Client-defined permission authority is forbidden. |
| `role_permissions` | Covered with clarification needed | Defined as role-to-permission links with scope matching and audit requirements. Final permission reference/key strategy and history model remain open. |
| `user_sessions` | Covered with blocking gaps | Defined as server-side opaque-session digest records with expiry, revocation, rotation, and coarse `last_used_at`. Digest/index/rotation representation, tenant-context semantics, store, lifetimes, and retention remain unresolved. |
| `login_attempts` | Covered with blocking gaps | Defined as append-oriented security events with safe outcomes and pseudonymous signals. Identifier fingerprinting, privacy/key management, retention, and safe failure taxonomy remain unresolved. |
| `audit_actor_links` | Covered with blocking gap | Defines a future actor/subject/tenant/membership/session relationship without implementing audit tables. Cardinality, integrity, event ownership, retention, and transactional delivery remain unresolved. |

All required conceptual entities are present. The failure is not missing coverage; it is that several choices change keys, relationships, constraints, or ownership and therefore cannot safely be deferred into database schema work.

## Tenant isolation review

| Requirement | Result | Evidence and assessment |
|---|---|---|
| Never trust client `tenant_id` directly | Confirmed | The plan treats header, body, query, path, cookie, and hidden UI tenant values as untrusted inputs that must be validated against trusted context. |
| Require active membership for tenant actions | Confirmed | Active user, tenant, and membership plus role/permission and contextual checks are required. |
| Separate Super Admin from Tenant Admin | Confirmed in policy; schema representation unresolved | Super Admin is a distinct platform path and does not imply membership in every tenant. The storage/assignment relationship for platform authority is not yet selected. |
| Keep customers separate from operators | Confirmed | Customer users and platform operators must remain distinct in role vocabulary, operational views, assignment paths, and authorization rules unless later explicitly designed. |
| Fail cross-tenant access safely | Confirmed | Missing or conflicting tenant signals are rejected; tenant scope must propagate through repositories, relationships, caches, jobs, events, and audit. Cross-tenant negative tests are required later. |

**Tenant isolation result:** **Policy PASS, schema-readiness FAIL.** The fail-closed rules are clear enough to preserve, but the plan cannot yet encode platform-role assignment or complete tenant-aware relational constraints. ADR 0011 also remains Proposed. No database schema work is approved.

## Session security review

| Requirement | Result | Evidence and assessment |
|---|---|---|
| Opaque session tokens | Confirmed | High-entropy opaque browser tokens are required. |
| Store only token digest | Confirmed | Only `session_token_digest` is stored; raw bearer tokens must never be persisted or logged. |
| Plan HTTP-only cookies later | Confirmed | A later `Secure`, `HttpOnly`, appropriately scoped `SameSite` cookie with CSRF/origin protection is described but not implemented or approved here. |
| Expiry and revocation | Confirmed in policy | Server-enforced absolute expiry, optional idle expiry, and immediate revocation triggers are covered. Exact lifetimes and state transitions remain unresolved. |
| Rotation | Confirmed in policy | Rotation is recommended at login, MFA/step-up, credential/recovery, and membership/privilege changes, with predecessor invalidation and reuse detection. Exact token-family/data representation is unresolved. |
| `last_used_at` | Confirmed | A coarse, policy-approved update interval is required; it is not identity proof or exact activity history. The interval remains unresolved. |
| JWT excluded as primary session | Confirmed | JWT cannot be the primary browser-session model without separate review and approval. |

**Session security result:** **Policy PASS, schema-readiness FAIL.** Core safety rules are explicit, but database planning still lacks the approved digest lookup/comparison approach, token-family/rotation representation, membership-context semantics, idle/absolute lifetimes, concurrent-session policy, store/durability decision, and retention/cleanup behavior. ADR 0006 remains Proposed.

## Password and login security review

| Requirement | Result | Evidence and assessment |
|---|---|---|
| Forbid plaintext passwords | Confirmed | Only a one-way `password_hash` is allowed; plaintext, reversible storage, hints, and credential payloads in logs/audit are forbidden. |
| Defer hashing algorithm | Confirmed | Algorithm, library, parameters, salt/pepper, benchmarking, rehash, strength, and breach policy are reserved for a later Security decision. |
| Conceptually log login attempts | Confirmed | Safe success, failure, and blocked outcomes plus correlation and privacy-reviewed abuse signals are defined. |
| Lockout/rate-limit concept | Confirmed | Per-identifier, device/network signal, tenant, and global controls plus temporary backoff/lockout are contemplated. Exact policy remains open. |
| Keep notifications and production material excluded | Confirmed | Email/SMS sending, real users, production credentials, and production secrets remain excluded. |

**Password/login result:** **Conceptual PASS, schema details unresolved.** Deferring the hashing implementation is correct for this planning stage. Before schema planning, however, the identity fingerprint, safe failure taxonomy, privacy/key ownership, retention, and user lock fields/transitions must be decided because they affect stored fields and constraints.

## RBAC review

| Requirement | Result | Evidence and assessment |
|---|---|---|
| Stable server-owned permission keys | Confirmed | Permission keys are immutable or deliberately versioned and owned by reviewed server code. |
| Forbid dynamic permission strings from clients | Confirmed | Clients request operations; they cannot supply authoritative role or permission strings. |
| Membership references role | Confirmed, but cardinality unresolved | The current concept uses `tenant_memberships.role_id`, while explicitly leaving open a later membership-role assignment relationship. This must be settled before schema planning. |
| Isolate Super Admin permissions | Confirmed in policy; representation unresolved | Platform-only permissions cannot be acquired through tenant role assignment. The platform-role assignment entity/path is not defined. |
| Audit role changes later | Confirmed | Assignment, removal, delegation denial, and attempted escalation must produce future audit evidence. |

**RBAC result:** **Policy PASS, schema-readiness FAIL.** The authorization principles are safe, but two core relationships remain undecided: one role versus multiple roles per membership, and how global platform roles are assigned without abusing tenant membership or putting role flags directly on `users`.

## Audit readiness review

The concept requires future durable, append-only evidence for all requested Auth actions:

- login success and failure;
- session creation, rotation, logout, expiry handling, and revocation;
- password change, reset, recovery, and privileged credential events;
- role assignment, removal, delegation denial, and escalation attempts;
- membership invitation, activation, suspension, and revocation;
- permission definition and role-permission changes;
- suspicious login activity, revoked-token reuse, repeated failure, and privileged recovery.

Actor, subject, tenant, membership, session, target, outcome, reason, timestamp, and correlation context are distinguished, and secret material is prohibited.

**Audit readiness result:** **Event coverage PASS, schema-readiness FAIL.** The future relationship is conceptually sound, but audit-event ownership, link cardinality, global-versus-tenant scope integrity, transactional delivery, retention, access control, and tamper-resistance requirements must be settled before database schema planning. No audit table is approved or implemented.

## Blocking gaps and risks

The following are not minor wording clarifications. Each can materially change entities, foreign keys, uniqueness, lifecycle constraints, indexes, or ownership:

1. **Global identity rule:** Decide normalized email uniqueness and whether customer identities share one global login namespace or require an explicitly separated identity model.
2. **User and membership lifecycle:** Approve exact statuses, allowed transitions, verification/lock behavior, suspension effects, deletion/anonymization, and retention.
3. **Membership role cardinality:** Choose exactly one fixed role on `tenant_memberships` or a separate membership-role assignment model; define uniqueness and assignment history.
4. **Platform authority representation:** Define how Super Admin/platform roles are assigned and revoked without tenant membership, role flags on `users`, or implicit tenant access.
5. **Role/permission catalog:** Approve fixed keys, scope rules, non-delegable permissions, last-admin protection, retirement/versioning, and permission-change invalidation behavior.
6. **Session persistence contract:** Decide store/durability/fail-closed behavior, digest/index/comparison policy, token-family/rotation representation, optional membership context, idle/absolute lifetimes, concurrent limits, cleanup, and retention.
7. **Login-attempt privacy contract:** Decide raw-versus-fingerprinted identifier treatment, keyed hash ownership/rotation, safe failure categories, access controls, retention, and aggregation/rate-limit semantics.
8. **Audit relationship contract:** Decide audit event ownership, actor-link cardinality, foreign-key/deletion behavior, global/tenant integrity, transactional delivery, retention, access, and tamper resistance.
9. **Database and tenancy decision status:** ADR 0004, ADR 0006, and ADR 0011 remain Proposed. Accepted ADR 0005 selects a future ORM/migration direction but does not authorize PostgreSQL, `packages/db`, a schema, or migrations.
10. **Ownership boundary:** Decide whether Auth persistence belongs to a future identity-access module and what, if anything, a shared DB package may own. A generic DB package must not become a shared-table dumping ground.

Proceeding while these gaps remain would force the database-planning step to invent security and identity policy, creating a high risk of cross-tenant authority merging, stale-session authorization, difficult migrations, or misleading audit evidence.

## Gate result

**FAIL: must revise Auth Schema Concept Plan first.**

The plan successfully establishes the required security direction, and no core rule should be weakened. It is not yet ready to become a future database schema plan because the blocking decisions above determine the relational model itself. This result does not authorize a DB package scaffold, database schema shell, Auth contracts, full Auth, or any implementation.

## Exact next recommended step

**Revise Auth Schema Concept Plan.**

Create one narrowly approved documentation revision that resolves the blocking identity, membership-role, platform-authority, session-persistence, login-attempt privacy, audit-relationship, and ownership decisions—or records explicit human decisions for each. Do not begin `packages/db`, database schema shell planning, Auth contracts, SQL, Drizzle, migrations, or full Auth before that revised plan passes a new approval gate.

## Explicit exclusions

This gate excludes SQL, executable schema, Drizzle schema/configuration, migrations, Docker/PostgreSQL runtime, `packages/db`, database clients or repositories, Auth routes/contracts/code, password hashing implementation, session generation/digest/cookies implementation, frontend login UI, OAuth/social login/SSO, provider/wallet/ledger/order/payment/catalog/UI/AI work, production users/data/credentials/secrets, dependency installation, manifest/workspace/lockfile changes, deployment, commit, and push.
