# Auth Schema Concept Plan

## Status and purpose

- **Scope:** Conceptual Auth schema planning only.
- **Authorization:** Founder conditional approval for this planning document only.
- **Implementation status:** No database or authentication implementation is approved or created here.
- **Phase 1 status:** Remains **NO-GO** outside explicitly approved work.

This revised document describes candidate entities, fields, relationships, lifecycle rules, and security invariants so they can be reviewed before implementation. It closes the schema-shaping gaps recorded by the first Auth Schema Approval Gate. It is not executable schema, SQL, TypeScript, Drizzle, a migration, database configuration, or application code. Names and constraints remain conceptual until Founder, Security, Legal/Privacy, and Architecture/Database approve them. Proposed ADR 0006 and ADR 0011 are planning inputs, not accepted decisions.

## Model boundaries and invariants

- A `user` is a global identity and gains no tenant authority merely by existing.
- A `tenant_membership` is the explicit, tenant-scoped relationship that grants eligibility for tenant access.
- Effective authorization requires an active user, active tenant, active membership, allowed role/permissions, and contextual policy checks. UI visibility and session claims are never authority.
- Platform-operator authority is separate from tenant authority. A Super Admin is not a Tenant Admin in every tenant.
- MVP tenant membership has exactly one tenant role. Platform roles use a separate assignment relationship and never tenant membership.
- Customer identities and platform operators must not be mixed into one operational population or permission path unless a later, explicit design is approved.
- Raw credentials, session tokens, secrets, and unnecessary personal data must never enter logs or audit metadata.

## Core entities and conceptual fields

Field lists below express intent only. Exact types, nullability, constraints, indexes, retention periods, and deletion behavior require later approval.

### `users`

**Purpose:** A platform-global identity record. It holds identity lifecycle state and the password verifier reference, but no tenant role or automatic tenant access.

**Conceptual fields:**

- `id`: stable global identity identifier.
- `email`: current display/contact form of the verified email; access is restricted as personal data.
- `normalized_email`: canonical login/uniqueness value produced by the policy below.
- `email_verified_at`: evidence that control of the identifier was verified, if verification is later approved.
- `password_hash`: one-way password verifier only; never plaintext or reversible material.
- `status`: exactly `pending`, `active`, `suspended`, or `disabled` for the first model.
- `disabled_at`: time the identity was administratively disabled or closed.
- `locked_until`: optional temporary lockout boundary.
- `password_changed_at`: supports session-revocation and security decisions.
- `created_at`, `updated_at`: lifecycle timestamps.

**Email identity rule:** The first model uses one case-insensitive global email namespace. Before comparison, trim surrounding whitespace, normalize the domain to its canonical ASCII/lowercase form, and lowercase the complete address. The resulting `normalized_email` is globally unique across all users, including customers and operators; this is an intentional product login policy even though Internet mail systems can theoretically treat local-part case differently. The original/current address is not an alternate uniqueness key. Exact Unicode/IDN library behavior and maximum length belong to later schema/implementation review and must have compatibility tests.

Email changes may be added later, but only through a separately approved flow requiring current authentication or step-up, verification of the new address, collision checking on `normalized_email`, notification to the prior trusted address where policy permits, appropriate session revocation/rotation, and enumeration-safe responses. Every requested, completed, rejected, and reverted email change must be audited with actor, subject, outcome, and redacted old/new identifiers; raw full addresses must not be copied into broad audit metadata.

**Lifecycle:** `pending` means the identity exists but cannot authenticate as an active user; `active` permits authentication subject to all other checks; `suspended` is a reversible security/administrative denial; `disabled` is a non-active closed/deletion-style state pending approved retention or anonymization. Temporary login lockout is represented separately by `locked_until` and does not change the lifecycle status. Suspending or disabling a user immediately denies authentication and revokes all active sessions for that user.

Disabling is not deletion: it preserves the stable identifier, security history, membership references, and required audit linkage while preventing use. No user is hard-deleted, cascaded away, or anonymized until a future Legal/Privacy and Security policy approves eligibility, retention, legal hold, reference preservation, and the anonymization procedure. Mutable identity/contact data should be minimized or anonymized when that future policy permits, while required security/audit references remain retained and access-controlled.

### `tenant_memberships`

**Purpose:** The explicit relationship between one global user and one tenant. It is the tenant access boundary and carries tenant-specific lifecycle and role assignment.

**Conceptual fields:**

- `id`: stable membership identifier.
- `tenant_id`: owning tenant scope.
- `user_id`: linked global identity.
- `role_id`: exactly one tenant-scoped role assigned to the membership for the first MVP model.
- `status`: exactly `invited`, `active`, `suspended`, or `revoked` for the first model.
- `invited_at`, `activated_at`, `suspended_at`, `revoked_at`: relevant lifecycle evidence.
- `created_at`, `updated_at`: record timestamps.

**Lifecycle:** There is at most one membership per `(tenant_id, user_id)`. `invited` grants no tenant access; `active` is the only status eligible for tenant-scoped access; `suspended` is a reversible denial; `revoked` is a terminal relationship denial for the first model. Activation requires an active user and later approved invitation/verification rules. Suspension or revocation immediately denies new authorization and revokes every active session bound to that membership; user-level sessions without a bound membership must re-evaluate and cannot select it. Reactivation of a suspended membership requires an authorized, audited transition; a revoked relationship is not silently reactivated.

Membership records are not hard-deleted in the first model. They retain stable tenant/user/role and lifecycle evidence for security investigation and audit correlation. Exact retention/anonymization duration requires future Legal/Privacy and Security approval, but tenant deletion or user disabling must never cascade away required membership or audit evidence.

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

### `platform_role_assignments`

**Purpose:** The separate relationship that assigns a platform-scoped role such as Super Admin to a global user. It is never a tenant membership and grants no implicit Tenant Admin role.

**Conceptual fields:**

- `id`: stable assignment identifier.
- `user_id`: linked active global identity.
- `role_id`: linked platform-scoped role only.
- `status`: active or revoked assignment state.
- `assigned_at`, `revoked_at`: lifecycle evidence.
- `assigned_by_user_id`, `revoked_by_user_id`: authorized platform actors when applicable.
- `reason`: required safe justification for privileged assignment or revocation.

**Lifecycle:** Super Admin authority exists only through an active `platform_role_assignment` to an active platform role and active user. No `is_super_admin` or similar boolean is placed on `users`. Assignment and revocation require strong authorization, later approved MFA/step-up and maker-checker controls, last-Super-Admin protection, immediate session revalidation/rotation or revocation, and immutable audit evidence. Tenant access by a platform operator remains an explicit, reason-bound, audited support/break-glass action; it does not create or simulate tenant membership.

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
- `permission_id`: linked stable permission; `permission_key` remains the server-owned external vocabulary on `permissions`.
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

**Lifecycle:** Created after successful approved authentication, rotated at login and after privilege, membership, credential, recovery, or assurance changes, and invalidated on expiry or revocation. The digest algorithm and exact token-family representation are chosen later through Security review; this does not permit a raw token at rest. Absolute and idle expiry values and concurrent limits are later parameter decisions, but both expiries are server-enforced and fail closed.

`last_used_at` is updated no more frequently than a later Security-approved coarse interval and only after successful session validation; the initial schema plan must expose the field without treating every request as an audit trail. Expired/revoked rows become unusable immediately, are excluded from active lookup, and may be removed from the hot session store after a Security/Legal-approved short operational retention window. Required revocation and audit evidence must survive cleanup in the future audit record. User suspension/disablement revokes all user sessions; membership suspension/revocation revokes sessions bound to that membership and prevents unbound sessions from selecting it.

### `login_attempts`

**Purpose:** Security and abuse evidence for successful and failed authentication attempts without storing credentials or enabling account enumeration.

**Conceptual fields:**

- `id`: stable attempt identifier.
- `user_id`: nullable link when an identity is safely resolved; absence must not reveal whether an account exists.
- `email_fingerprint`: optional normalized, keyed fingerprint rather than raw email where feasible.
- `tenant_id`: nullable trusted tenant context when the login surface is tenant-bound.
- `outcome`: success, failure, blocked, or another approved result.
- `failure_reason`: allowlisted internal category: `invalid_credentials`, `user_inactive`, `membership_inactive`, `rate_limited`, `locked`, `expired_flow`, or `policy_denied`; external responses remain enumeration-safe.
- `occurred_at`: attempt timestamp.
- `ip_hash`, `user_agent_hash`: privacy-reviewed abuse signals.
- `correlation_id`: safe link to operational/security investigation context.

**Privacy and lifecycle:** Store only the fields above and the minimum signals needed for abuse control. Do not store submitted email as a raw duplicate when `email_fingerprint` suffices, exact IP address, raw user agent, password, password hash, token, cookie, MFA/recovery value, request body, or other secret. `ip_hash` and `user_agent_hash` are keyed, pseudonymous, purpose-limited correlations rather than identity proof; key ownership, rotation, truncation, and access require Security/Privacy approval and must prevent use as permanent tracking identifiers.

Login attempts are append-oriented security evidence. The future schema plan must define a short, configurable operational retention window approved by Security and Legal/Privacy, followed by deletion or irreversible aggregation unless an incident/legal hold requires longer retention. Exact duration is a deployment-policy parameter, not invented here. Access is restricted, queries are audited, and public failure responses never reveal which internal category occurred.

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

**Ownership and lifecycle:** Future append-only `audit_logs` own audit events; `audit_actor_links` is an Auth-owned conceptual association attached to one audit event, not a replacement event store and not an independently mutable source of authority. It records the authenticated actor (`actor_user_id`), affected identity (`subject_user_id`), explicit tenant scope (`tenant_id`), evaluated membership (`tenant_membership_id`), and originating session (`user_session_id`) when each applies. System/service events use an allowlisted `actor_type` and controlled principal reference in the later audit design; they never fabricate a human user.

The future relationship must enforce reference/scope consistency without cascading deletion of required history. It is created atomically with, or durably coupled to, its audit event; runtime roles cannot update or delete it. It follows the longer approved security/audit retention and legal-hold policy, even after session cleanup, membership revocation, or identity anonymization. Access to actor links is permissioned and audited. This remains conceptual only: no `audit_logs` or `audit_actor_links` table is implemented or approved here. Any Super Admin tenant access records the global actor, tenant, affected subject when applicable, reason, and outcome rather than fabricating tenant membership.

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
- The digest algorithm, token entropy construction, lookup/index strategy, constant-time verification, and key-rotation method require later Security approval and implementation benchmarking. Password hashing and session-token digesting are separate policies.
- A later implementation would deliver the token in a `Secure`, `HttpOnly`, appropriately scoped `SameSite` cookie with CSRF and origin protections. No cookie is implemented or approved here.
- Both idle and absolute expiry are enforced server-side and fail closed. Exact durations, concurrent limits, and store durability remain Security parameter decisions and cannot be omitted by a later schema plan.
- Revocation must be immediate for logout, user or membership suspension, password reset/change as policy requires, detected theft, privileged recovery, and relevant permission changes.
- Rotation policy: issue a new token at successful login and rotate after MFA/step-up completion, password or recovery events, and membership/role/privilege changes. Invalidate the predecessor, link the rotation family conceptually, and treat predecessor reuse as suspicious activity. Exact mechanics remain unimplemented.
- `last_used_at` is updated only after successful validation and no more frequently than a coarse, policy-approved interval, rather than on every request. It supports idle expiry and session visibility, not identity proof or exact activity history.
- Expired and revoked session rows are unusable immediately. A future cleanup process may remove them from the hot session store after a short approved operational retention window, while durable audit/revocation evidence remains under the audit retention policy.
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
- The first MVP uses exactly one tenant role per membership through `tenant_memberships.role_id`. This is safer than combining multiple grants: effective authority is easier to review, delegation and last-admin rules are unambiguous, and accidental privilege union is avoided.
- Future multi-role support may add a separately reviewed `membership_role_assignments` relationship and migrate each existing `role_id` into one assignment. Stable membership, role, and permission identifiers remain unchanged; no roles move onto `users`. The old single-role field is retired only through a controlled expand/migrate/contract plan after authorization semantics and negative tests are approved.
- Authorization denies by default and combines the permission with tenant, ownership, resource state, module state, assurance, and maker-checker rules where applicable.
- Platform/Super Admin permissions and roles are assigned only through `platform_role_assignments`; they are isolated from tenant roles and cannot be acquired through tenant membership. Super Admin access does not silently bypass tenant boundaries.
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

## Auth persistence ownership

Auth records and repository behavior belong to a future Auth/identity-access persistence boundary. That boundary owns identity, membership, platform-role assignment, RBAC, session, login-attempt, and Auth-to-audit relationship rules; another business module must not query or mutate its tables directly. Tenant context and authorization must remain mandatory at the application and repository boundaries even if database defenses are added later.

`packages/db` is not approved. If a shared database package is later authorized, it may provide narrowly technical connection, transaction, and migration infrastructure; it must not own Auth domain policy, become a shared-table dumping ground, expose global unscoped Auth repositories, or let callers bypass tenant/platform boundaries. Module-owned persistence and migrations must preserve these ownership rules.

No PostgreSQL runtime, SQL, Drizzle schema/configuration, migration, database client, repository, or package is created by this document. ADR 0004, ADR 0006, and ADR 0011 remain Proposed; accepted ADR 0005 does not authorize implementation.

## Remaining parameter approvals

The relational choices that caused the first gate failure are resolved above. A later Approval Gate must still confirm that the decisions are acceptable. Exact implementation/security parameters remain deliberately deferred and must be approved before their relevant implementation ticket:

- password algorithm, library, production-benchmarked parameters, salt/pepper, breach, recovery, and rehash policy;
- session digest algorithm, entropy, exact idle/absolute durations, concurrency limits, storage technology/durability, and cleanup duration;
- login-attempt hash/key implementation and exact retention duration;
- exact fixed role/permission catalog, MFA/step-up parameters, and audit retention duration;
- database technology/hosting, RLS decision, physical types, indexes, constraints, and migration mechanics.

Deferring these numeric or implementation-specific parameters does not reopen the conceptual relationships or permit unsafe defaults.

## Previous FAIL gaps addressed

| Previous gate gap | Resolution in this revision |
|---|---|
| Global identity rule | One globally unique `normalized_email`; trim, canonicalize/lowercase domain, lowercase full address; case-insensitive login namespace; controlled, verified, audited email changes. |
| User lifecycle | Fixed `pending`, `active`, `suspended`, and `disabled` states; lockout is separate; disable is not delete; no hard deletion without Legal/Privacy and Security approval. |
| Membership lifecycle | Fixed `invited`, `active`, `suspended`, and `revoked`; only active grants access; suspension/revocation blocks access and affects sessions; records are retained for audit. |
| Membership role cardinality | Exactly one tenant role per membership for MVP; future multi-role uses a separate assignment relationship and controlled migration. |
| Platform authority representation | New conceptual `platform_role_assignments`; no tenant membership and no boolean on `users`; explicit audited tenant support/break-glass access. |
| Role/permission link | `role_permissions.permission_id` is the conceptual relation; stable server-owned `permission_key` remains on `permissions`; platform/tenant scope cannot mix. |
| Session persistence contract | Digest-only storage, server expiry, rotation family/predecessor, immediate revocation, coarse `last_used_at`, cleanup/retention split, and suspension/revocation effects are fixed conceptually. |
| Login-attempt privacy contract | Minimal allowlisted fields, pseudonymous keyed hashes, fixed safe failure categories, no raw secrets/IP/user-agent, and short configurable approved retention. |
| Audit relationship contract | Future `audit_logs` own events; Auth-owned immutable actor links capture actor/subject/tenant/membership/session, are durably coupled, access-controlled, and retained with audit evidence. |
| Persistence ownership | Future Auth/identity-access persistence owns Auth policy; any shared DB package is technical only and remains unapproved. |

**Readiness statement:** The concept plan should now be ready for another **Auth Schema Approval Gate review**. That gate must independently verify these resolutions; this statement is not a PASS and authorizes no scaffold, schema, contract, or implementation.

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

Founder, Security, Legal/Privacy, and Architecture/Database should re-review this revised conceptual plan and record one accepted/rejected/amended result. This is the only recommended next step. Do not start full Auth, a DB package scaffold, a database schema shell, Auth contracts, SQL, Drizzle, or migrations from this plan.
