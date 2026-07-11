# Auth Schema Concept Plan

## Status and purpose

- **Scope:** Conceptual Auth schema planning only.
- **Authorization:** Founder conditional approval for this planning document only.
- **Implementation status:** No database or authentication implementation is approved or created here.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

This document describes candidate entities, fields, relationships, lifecycle rules, and security invariants so they can be reviewed before implementation. It is not executable schema, SQL, TypeScript, Drizzle, a migration, database configuration, or application code. Names and constraints remain conceptual until Founder, Security, Legal/Privacy, and Architecture/Database review the relevant decisions. Proposed ADR 0006 and ADR 0011 are planning inputs, not accepted decisions.

## Model boundaries and invariants

- A `user` is a global identity and gains no tenant authority merely by existing.
- A `tenant_membership` is the explicit, tenant-scoped relationship that grants eligibility for tenant access.
- Effective authorization requires an active user, active tenant, active membership, allowed role/permissions, and contextual policy checks. UI visibility and session claims are never authority.
- Platform-operator authority is separate from tenant authority. A Super Admin is not a Tenant Admin in every tenant.
- Customer identities and platform operators must not be mixed into one operational population or permission path unless a later, explicit design is approved.
- Raw credentials, session tokens, secrets, and unnecessary personal data must never enter logs or audit metadata.

## Core entities and conceptual fields

Field lists below express intent only. Exact types, nullability, constraints, indexes, retention periods, and deletion behavior require later approval.

### `users`

**Purpose:** A platform-global identity record. It holds identity lifecycle state and the password verifier reference, but no tenant role or automatic tenant access.

**Conceptual fields:**

- `id`: stable global identity identifier.
- `email`: normalized login identifier; its uniqueness and customer-isolation rules require Legal/Privacy and Security approval.
- `email_verified_at`: evidence that control of the identifier was verified, if verification is later approved.
- `password_hash`: one-way password verifier only; never plaintext or reversible material.
- `status`: lifecycle such as pending, active, locked, suspended, or closed; exact values require approval.
- `locked_until`: optional temporary lockout boundary.
- `password_changed_at`: supports session-revocation and security decisions.
- `created_at`, `updated_at`: lifecycle timestamps.

**Lifecycle:** Created only through a later approved registration/invitation process; activated after required verification; may be locked or suspended without deleting security evidence; closure, anonymization, and retention require Legal/Privacy policy. User activation alone creates no tenant access.

### `tenant_memberships`

**Purpose:** The explicit relationship between one global user and one tenant. It is the tenant access boundary and carries tenant-specific lifecycle and role assignment.

**Conceptual fields:**

- `id`: stable membership identifier.
- `tenant_id`: owning tenant scope.
- `user_id`: linked global identity.
- `role_id`: tenant-scoped role assigned to the membership for the fixed MVP model; a later approved multi-role design could replace this with a separate assignment relationship.
- `status`: invited, active, suspended, revoked, or another approved lifecycle value.
- `invited_at`, `activated_at`, `suspended_at`, `revoked_at`: relevant lifecycle evidence.
- `created_at`, `updated_at`: record timestamps.

**Lifecycle:** At most one conceptual membership relationship per user and tenant unless a later use case justifies otherwise. Tenant operations require `active` status. Suspension or revocation denies new authorization and triggers the approved session revocation/revalidation policy. Membership removal must preserve required audit evidence.

### `roles`

**Purpose:** A reviewed, named bundle of authority. Roles are explicitly classified as platform or tenant scope; they are not booleans placed on users.

**Conceptual fields:**

- `id`: stable role identifier.
- `role_key`: stable internal key, not accepted from a client as authority.
- `name`: human-readable role name.
- `scope_type`: platform or tenant; the two cannot be substituted.
- `status`: active or retired under an approved lifecycle.
- `description`: safe explanation of intended authority.
- `created_at`, `updated_at`: record timestamps.

**Lifecycle:** Fixed roles are reviewed and provisioned through a controlled process. Retirement blocks new assignments while preserving historical meaning. Arbitrary custom roles are outside this plan.

### `permissions`

**Purpose:** The stable, server-owned vocabulary of allowed actions. Permissions describe capability; contextual rules still decide whether an action is valid for a resource and state.

**Conceptual fields:**

- `id`: stable permission identifier.
- `permission_key`: immutable or deliberately versioned server-defined key.
- `scope_type`: platform or tenant classification.
- `description`: reviewed meaning and boundary.
- `status`: active or retired.
- `created_at`, `updated_at`: record timestamps.

**Lifecycle:** Added, changed, or retired only through reviewed application changes. Permission keys never come dynamically from client input, and retired keys are not silently reassigned new meaning.

### `role_permissions`

**Purpose:** The reviewed link that bundles stable permissions into a role.

**Conceptual fields:**

- `id`: stable link identifier if required by the eventual design.
- `role_id`: linked role.
- `permission_id` or `permission_key`: linked stable permission; the final key strategy is an approval decision.
- `created_at`: assignment timestamp.
- `created_by_user_id`: optional approved actor reference for controlled changes.
- `revoked_at`: optional historical revocation marker if assignments are retained rather than replaced.

**Lifecycle:** Duplicate links are prohibited conceptually. Scope must match: tenant roles cannot absorb platform-only permissions. Changes require authorization, audit, affected-session/cache revalidation, and protection against self-escalation.

### `user_sessions`

**Purpose:** Server-side state for one opaque browser session. It stores a digest of the bearer token, never the raw token, and supports expiry and immediate revocation.

**Conceptual fields:**

- `id`: stable session identifier safe for management views.
- `user_id`: authenticated global identity.
- `tenant_membership_id`: optional selected tenant context; its use must never replace a fresh active-membership check.
- `session_token_digest`: one-way digest used for lookup/verification; the raw token is never stored.
- `status`: active, revoked, expired, or another approved state.
- `created_at`: session creation time.
- `expires_at`: server-enforced absolute expiry.
- `idle_expires_at`: optional server-enforced idle expiry after policy approval.
- `last_used_at`: coarse activity timestamp under the policy below.
- `rotated_from_session_id`: optional predecessor link for fixation/reuse detection.
- `revoked_at`, `revocation_reason`: revocation evidence.
- `ip_hash`, `user_agent_hash`: privacy-reviewed, keyed/pseudonymous security signals; never treated as identity proof.

**Lifecycle:** Created after successful approved authentication, rotated at login and after privilege, membership, credential, recovery, or assurance changes, and invalidated on expiry or revocation. Concurrent-session limits, cleanup, and retention remain approval decisions.

### `login_attempts`

**Purpose:** Security and abuse evidence for successful and failed authentication attempts without storing credentials or enabling account enumeration.

**Conceptual fields:**

- `id`: stable attempt identifier.
- `user_id`: nullable link when an identity is safely resolved; absence must not reveal whether an account exists.
- `email_fingerprint`: optional normalized, keyed fingerprint rather than raw email where feasible.
- `tenant_id`: nullable trusted tenant context when the login surface is tenant-bound.
- `outcome`: success, failure, blocked, or another approved result.
- `failure_reason`: safe internal reason category; never a password, token, or overly revealing response detail.
- `occurred_at`: attempt timestamp.
- `ip_hash`, `user_agent_hash`: privacy-reviewed abuse signals.
- `correlation_id`: safe link to operational/security investigation context.

**Lifecycle:** Append-oriented security evidence with access controls and a defined retention window. It feeds future rate limits, lockout decisions, suspicious-activity detection, and alerting; it does not itself authorize access.

### `audit_actor_links` (conceptual relationship only)

**Purpose:** Preserve who acted and, when different, whose identity or membership was affected by a future append-only audit event. This avoids collapsing operator, subject, tenant, and session into one ambiguous actor field.

**Conceptual fields:**

- `id`: stable relationship identifier if the later audit design needs one.
- `audit_event_id`: reference to a future audit event, not implemented by this plan.
- `actor_user_id`: authenticated human actor when applicable.
- `subject_user_id`: affected user when different from the actor.
- `tenant_id`: nullable tenant scope; absent only for explicitly global platform events.
- `tenant_membership_id`: membership through which tenant authority was evaluated, when applicable.
- `user_session_id`: session associated with the action, when safe and applicable.
- `actor_type`: allowlisted human, system, or service classification; no client-defined values.
- `created_at`: relationship timestamp.

**Lifecycle:** Created with a future audit event and retained under the audit policy. The relationship is conceptual only: this document does not create or approve audit tables. Any Super Admin tenant access must record explicit global actor, tenant scope, subject when applicable, reason, and outcome rather than fabricating tenant membership.

## Tenant isolation model

`users`, role/permission definitions classified as platform-global, and other explicitly global reference data may exist without tenant ownership. Their global classification does not grant global access. `tenant_memberships` owns the user-to-tenant relationship and must bind `tenant_id`, `user_id`, role scope, and status consistently.

For every tenant-scoped operation, the server must:

1. resolve tenant context from a trusted domain mapping, authenticated active membership, scoped credential, or trusted internal job/event metadata;
2. reject missing or conflicting tenant signals;
3. recheck active user, tenant, membership, role/permission, module/state, and resource ownership;
4. carry tenant scope through repositories, relationships, uniqueness, caches, jobs, events, audit, and later negative tests.

`tenant_id` supplied directly by a public client is untrusted and cannot select authority. A client header, body, query, path, cookie value, or hidden UI field is only an input to validate against trusted context.

Super Admin access is a separate platform authorization path. It does not imply a membership in every tenant, and tenant access by a platform operator must be explicit, least-privileged, reason-bound, and audited. Tenant Admin authority exists only through an active membership in that tenant. Customer users must remain distinct from platform operators in role vocabulary, operational views, assignment paths, and authorization rules unless a later approved design deliberately links them.

## Session model

- Browser sessions use opaque, high-entropy random tokens. The database stores only `session_token_digest`; raw bearer tokens are never persisted or logged.
- A later implementation would deliver the token in a `Secure`, `HttpOnly`, appropriately scoped `SameSite` cookie with CSRF and origin protections. No cookie is implemented or approved here.
- Expiry is enforced server-side. Exact idle lifetime, absolute lifetime, concurrency limits, and store durability remain Security approval decisions.
- Revocation must be immediate for logout, user or membership suspension, password reset/change as policy requires, detected theft, privileged recovery, and relevant permission changes.
- Recommended rotation policy: issue a new token at successful login and rotate after MFA/step-up completion, password or recovery events, and membership/role/privilege changes. Invalidate the predecessor and detect attempted reuse. Exact rotation mechanics remain unimplemented.
- `last_used_at` should be updated at a coarse, policy-approved interval rather than on every request, to reduce write amplification and unnecessary behavioral tracking. It is useful for idle expiry and session visibility, not proof of the user's identity or exact activity history.
- Effective permissions and membership status are re-evaluated server-side; stale permission snapshots in a session are not authoritative.
- JWT is not the primary browser-session model and must not be introduced unless separately reviewed and approved. Mobile, partner API, and service credentials require a separate scoped design.

## Password and login security

- Store only a one-way `password_hash`; never plaintext, reversible encryption, password hints, or credential payloads in logs/audit.
- The password hashing algorithm, library, parameters, salt/pepper policy, rehash policy, strength/breach policy, and production benchmark are deliberately deferred to Security approval. This plan selects none of them.
- Record safe login-attempt outcomes and abuse signals without recording submitted passwords or exposing account existence.
- Apply a later approved combination of per-identifier, network/device-signal, tenant, and global rate limits. Temporary lockout/backoff must resist credential stuffing and password spraying without creating an easy denial-of-service or enumeration channel.
- Suspicious patterns should later trigger reviewed alerts and session/account protections; hashes such as `ip_hash` and `user_agent_hash` require privacy, key-rotation, access, and retention rules.
- No email or SMS is sent by this plan. There are no real users, production credentials, or production secrets.

## RBAC model

- Roles are reviewed named bundles; permissions are stable, server-defined action keys; `role_permissions` links them.
- The fixed conceptual membership model references one tenant role through `tenant_memberships.role_id`. If review requires multiple roles, introduce an explicit membership-role assignment concept rather than placing roles on `users`.
- Authorization denies by default and combines the permission with tenant, ownership, resource state, module state, assurance, and maker-checker rules where applicable.
- Platform/Super Admin permissions and roles are isolated from tenant roles and cannot be acquired through tenant role assignment. Super Admin access does not silently bypass tenant boundaries.
- Tenant role assignment requires an active tenant membership, allowed delegation, scope compatibility, last-admin protection, and audit. A commercial Agent relationship grants no staff role automatically.
- Permission keys and role keys are never dynamically accepted from clients as authority. Clients request an operation; server-owned policy resolves whether it is allowed.
- Proposed fixed role vocabulary from the blueprint includes Super Admin, Tenant Admin, Catalog Manager, Order Agent, Support Agent, and Customer, but exact bundles remain an approval item and no roles are seeded here.

## Future audit relationship

Authentication and authorization actions must later produce durable, append-only audit events linked to actor, subject, tenant scope, membership, session, target, outcome, reason, timestamp, and correlation context as applicable. Operational logs do not replace audit evidence.

The future audit catalog must cover at minimum:

- login success and failure, including safely classified block/lockout outcomes;
- session creation, rotation, logout, expiry handling, and administrative or user revocation;
- password change, reset, recovery, and privileged credential events without secret values;
- role assignment, removal, delegation denial, and attempted privilege escalation;
- membership invitation/activation plus status changes such as suspension or revocation;
- permission definition and role-permission changes;
- suspicious login activity, revoked-token reuse, repeated failures, and privileged recovery.

Audit records must never contain passwords, password hashes, raw session tokens, raw recovery material, secrets, or unnecessary personal payloads. Before/after data is allowlisted and redacted. This plan defines only the relationship and event requirements; it does not implement an audit table.

## Decisions required at the approval gate

- Global email normalization/uniqueness and whether customer identity separation changes the global identity model.
- Exact user and membership statuses, transitions, suspension effects, deletion/anonymization, and retention.
- Whether one membership has exactly one fixed role or uses a separate multi-role assignment entity.
- Platform-operator identity storage and the exact Super Admin tenant-access/break-glass model.
- Session store, digest approach, idle/absolute lifetimes, concurrent-session limits, rotation mechanics, and retention.
- Password hashing algorithm and production-benchmarked parameters; lockout, rate-limit, recovery, and breached-password policies.
- Login-attempt and device/network signal collection, keying, access, alerting, and retention under privacy policy.
- Stable role/permission catalog, delegation boundaries, last-admin protection, and permission-change session/cache effects.
- Audit actor/subject relationship shape, event retention, tamper resistance, access control, and transactional delivery.

## Explicit exclusions

This plan explicitly excludes:

- SQL, executable database schema, Drizzle schema/configuration, and migrations;
- Docker or a PostgreSQL runtime;
- `packages/db`, database clients, repositories, connections, or migration journals;
- authentication routes, API contracts, or application/domain implementation;
- password hashing selection or implementation;
- session-token generation/digest implementation and session-cookie implementation;
- frontend login, registration, account, or session UI;
- OAuth, social login, SSO, SCIM, passkeys, mobile tokens, and provider-managed identity integration;
- MFA implementation, invitations, consent implementation, recovery, and notifications;
- provider, wallet, ledger, order, payment, catalog, fulfillment, UI, or AI work;
- production users, customer data, credentials, secrets, provider integration, deployment, or public access;
- dependency installation and changes to package manifests, workspace configuration, or lockfiles.

## Exact next recommended step

**Auth schema approval gate.**

Founder, Security, Legal/Privacy, and Architecture/Database should review this conceptual plan, resolve or explicitly defer the listed decisions, and record one accepted/rejected/amended result. This is the only recommended next step. Do not start full Auth, a DB package scaffold, a database schema shell, Auth contracts, SQL, Drizzle, or migrations from this plan.
