# Auth Schema Approval Gate — Second Review

## Status and gate purpose

- **Gate scope:** Second documentation review after revision of the Auth Schema Concept Plan.
- **Authorization:** Founder conditional approval for this gate document only.
- **Gate result:** **PASS — ready for DB package scaffold only.**
- **Exact next recommended step:** **DB package scaffold only.**
- **Implementation status:** This gate creates no package, database, schema, SQL, Drizzle configuration, migration, or Auth implementation.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

The first gate recorded a FAIL because relational and lifecycle choices were unresolved. The concept plan was revised and this second gate independently checks those resolutions. PASS means only that the conceptual Auth model is sufficiently clear to seek a separately authorized, technical DB package scaffold step. It does not itself approve or create `packages/db`, database connectivity, schema planning, Auth contracts, full Auth, or any production capability.

## Previous FAIL gaps review

| Previous gap | Result | Second-review finding |
|---|---|---|
| Email normalization and global uniqueness | PASS | `normalized_email` uses a documented case-insensitive normalization policy and is globally unique. Email changes are future, verified, collision-checked, session-aware, enumeration-safe, and audited with redacted identifiers. |
| User lifecycle and retention | PASS | `pending`, `active`, `suspended`, and `disabled` are distinct; temporary lockout is separate. Disable is not delete. Hard deletion/anonymization requires future Legal/Privacy and Security approval, with references and required evidence preserved. |
| Membership lifecycle and session effects | PASS | `invited`, `active`, `suspended`, and `revoked` are defined. Only `active` grants tenant eligibility. Suspension/revocation denies access, revokes bound sessions, blocks unbound sessions from selecting the membership, and retains audit evidence. |
| One role per membership for MVP | PASS | `tenant_memberships.role_id` is exactly one tenant role for the first MVP model. This avoids unintended permission union and keeps delegation and last-admin rules reviewable. |
| Future multi-role extension | PASS | A future `membership_role_assignments` relationship and controlled expand/migrate/contract path are described without moving roles onto users or changing stable identifiers. |
| Super Admin representation | PASS | `platform_role_assignments` is separate from tenant membership and assigns only platform-scoped roles. Tenant support/break-glass access remains explicit, reason-bound, least-privileged, and audited. |
| No unsafe user boolean | PASS | `users` has no `is_super_admin` or equivalent authority flag. Platform authority requires an active assignment, active platform role, and active user. |
| Session contract | PASS | Opaque token digest-only storage, idle/absolute expiry, rotation/predecessor handling, immediate revocation, coarse validated `last_used_at`, hot-store cleanup, and durable audit retention are addressed conceptually. |
| Login-attempt privacy and retention | PASS | Minimal allowlisted fields, keyed pseudonymous fingerprints/hashes, enumeration-safe internal failure categories, restricted access, and short configurable approved retention are specified. Raw secrets, passwords, IPs, user agents, tokens, and request bodies are forbidden. |
| Audit ownership and immutability | PASS | Future `audit_logs` own events; Auth-owned `audit_actor_links` associate Auth context. They are durably coupled, immutable to runtime roles, scope-consistent, access-controlled, and retained under the longer audit/legal-hold policy. |
| Auth persistence ownership | PASS | A future Auth/identity-access persistence boundary owns Auth policy and repositories. Any future shared DB package is technical infrastructure only and cannot own Auth policy, expose unscoped Auth repositories, or become a shared-table dumping ground. |

**Previous gaps result:** All schema-shaping gaps that caused the first FAIL are now resolved at the conceptual level. No further concept-plan revision is required by this review.

## Tenant isolation review

| Requirement | Result | Assessment |
|---|---|---|
| Users are global identities | Confirmed | A user grants no tenant authority merely by existing. Global identity records and tenant access are separate. |
| Active membership required | Confirmed | Every tenant-scoped action requires an active user, active tenant, active membership, allowed permission, and contextual policy checks. |
| Never trust client `tenant_id` | Confirmed | Client header, path, body, query, cookie, or hidden UI values cannot select authority; they must be checked against trusted context. Missing or conflicting signals fail closed. |
| Super Admin separate from Tenant Admin | Confirmed | Platform roles use `platform_role_assignments`; Tenant Admin authority comes only from an active membership in that tenant. Platform authority does not imply universal Tenant Admin membership. |
| Customer users excluded for now | Confirmed as an implementation boundary | Customer Auth implementation, customer records, registration, profile, UI, and production users are excluded from this step. The conceptual global namespace reserves safe future compatibility, while customer and platform-operator roles, assignment paths, views, and authorization remain separated. |
| Cross-tenant access fails safely | Confirmed | Tenant scope must be trusted and carried through repositories, relationships, uniqueness, caches, jobs, events, and audit. Missing/mismatched scope is denied, and cross-tenant negative tests are mandatory later. |

**Tenant isolation result:** **PASS for future schema planning.** The ownership and fail-closed rules are clear enough to guide later keys, relationships, repository contracts, and negative tests. ADR 0011 remains Proposed and RLS is still a later decision; neither is silently approved here.

## Session security review

- Opaque, high-entropy browser session tokens are required.
- Only `session_token_digest` is stored; raw bearer tokens are never persisted or logged.
- A future `Secure`, `HttpOnly`, appropriately scoped `SameSite` cookie with CSRF/origin protections is planned but not implemented or approved here.
- Idle and absolute expiry are server-enforced and fail closed; exact durations are later Security parameters.
- Logout, user suspension/disablement, membership suspension/revocation, credential/recovery events, theft detection, and relevant privilege changes have explicit revocation effects.
- Rotation occurs at login and after MFA/step-up, credential/recovery, membership, role, or privilege changes; predecessor reuse is suspicious activity.
- `last_used_at` changes only after successful validation and no more frequently than a coarse approved interval.
- Expired/revoked rows become unusable immediately; later cleanup can remove hot-store rows while durable audit/revocation evidence follows the approved audit retention policy.
- JWT is excluded as the primary browser-session model unless separately reviewed and approved.

**Session security result:** **PASS for future schema planning.** Digest algorithm, entropy construction, exact lifetimes, store technology, concurrency limits, and cleanup duration are proper future Security/DB planning details, not conceptual blockers. ADR 0006 remains Proposed.

## RBAC review

- Exactly one tenant role per membership is clear for MVP.
- `permissions.permission_key` is a stable, server-owned vocabulary; a retired key cannot silently gain new meaning.
- `role_permissions.permission_id` links a role to a stable permission, with platform/tenant scope compatibility and duplicate prevention required later.
- Dynamic role or permission strings supplied by a client never create authority.
- Super Admin/platform permissions are isolated through `platform_role_assignments` and cannot be acquired through tenant membership.
- The future multi-role path adds `membership_role_assignments` and uses a controlled migration without moving roles to `users`.
- Role/permission changes require authorization, immutable audit evidence, protection from self-escalation, and affected session/cache revalidation.

**RBAC result:** **PASS for future schema planning.** Exact fixed role/permission bundles, delegation matrix, MFA/step-up parameters, and last-admin thresholds remain later approval inputs, not reasons to revise the conceptual relationships again.

## Audit readiness review

- Future append-only `audit_logs` own audit events.
- Auth-owned conceptual `audit_actor_links` associate the event with authenticated actor, affected user, tenant, evaluated membership, and originating session when applicable.
- Login success/failure, session create/rotate/revoke, password change/reset/recovery, role assignment/removal, membership status changes, permission changes, escalation attempts, and suspicious login/revoked-token activity are all required future events.
- Actor links are created atomically with or durably coupled to their event; runtime roles cannot update or delete them.
- References and required history survive session cleanup, membership revocation, and identity anonymization. Retention follows the longer approved security/audit and legal-hold policy; access is permissioned and itself audited.
- Passwords, hashes, raw session/recovery tokens, secrets, and unnecessary personal payloads are forbidden from audit evidence.

**Audit readiness result:** **PASS for future schema planning.** Exact physical event/link shape, audit retention duration, delivery mechanism, tamper-resistant export, and access views remain legitimate future schema/security decisions.

## Remaining gaps and risks

The following remain open but do not require another revision of the conceptual Auth plan:

1. ADR 0004 (database), ADR 0006 (Auth/session), and ADR 0011 (tenant isolation) remain Proposed; this gate does not accept them.
2. Exact password and session digest algorithms, parameters, entropy, constant-time comparison, and key ownership require Security approval and benchmarking.
3. Exact session idle/absolute lifetimes, concurrency limits, store/durability choice, cleanup duration, and fail-closed operational behavior require later planning.
4. Exact login-attempt and audit retention durations, pseudonymization key rotation, lawful basis, legal holds, anonymization, and data-subject handling require Legal/Privacy and Security approval.
5. The fixed role/permission catalog, delegation/non-delegable matrix, MFA/step-up requirements, maker-checker policy, and last-admin/last-Super-Admin rules require explicit approval.
6. A future schema plan must choose physical types, nullability, composite tenant foreign keys, uniqueness, indexes, status checks, deletion behavior, audit coupling, and cross-tenant negative tests.
7. A DB package scaffold needs its own narrow authorization and must define technical ownership without adding schema, migrations, connections, dependencies, secrets, or Auth code unless separately approved.
8. Customer Auth remains excluded from the next step; the global conceptual identity namespace must not be mistaken for approval to create customer users, flows, profiles, or UI.

These are implementation, parameter, specialist-review, or next-step planning risks. None leaves the core identity, tenant isolation, session, RBAC, audit, or persistence ownership relationship ambiguous.

## Gate result

**PASS: ready for DB package scaffold only.**

The revised concept plan closes the prior FAIL gaps and is sufficiently precise for the next safe, separately authorized planning/scaffold boundary. PASS does not authorize database implementation, schema shell planning, SQL, Drizzle, migrations, connections, dependencies, Auth contracts, Auth routes, password/session implementation, production users, or full Auth.

## Exact next recommended step

**DB package scaffold only.**

The next request should be separately scoped and approved to define/create only the minimum technical DB package boundary, preserving Auth/identity-access ownership and all exclusions above. Do not start database schema shell planning, Auth contracts, full Auth, dependencies, Docker, SQL, Drizzle, migrations, runtime connections, production users, or secrets as part of this gate.

## Explicit exclusions

This gate excludes dependency installation; changes to `package.json`, `pnpm-lock.yaml`, or `pnpm-workspace.yaml`; Docker/PostgreSQL runtime; `packages/db` creation; database clients/connections; executable schema; SQL; Drizzle schema/configuration; migrations; repositories; Auth contracts/routes/code; password hashing; session generation/digest/cookies; frontend/customer login UI; OAuth/social login/SSO; provider/wallet/ledger/order/payment/catalog/UI/AI work; production users/data/credentials/secrets; deployment; commit; and push.
