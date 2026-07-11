# Authentication, Session, and RBAC Tickets

> Parameters remain subject to Security approval; no ticket is authorized yet.

## AUTH-001 — Model users, memberships, invitations, and consent

- **Goal:** Define global identity and tenant-scoped relationship records and lifecycle.
- **Why it matters:** A login must not grant access to every tenant or confuse staff/customer roles.
- **Scope:** Users, verified identifiers, tenant memberships/status, staff invitations, customer profiles, exact terms/privacy consent.
- **Non-scope:** Social login, SSO, SCIM, phone-first registration, or cross-tenant customer profile sharing beyond approved identity link.
- **Expected files or modules:** Future identity-access and tenancy domain/application/repository/contracts.
- **Data/entities touched:** `users`, `memberships`, `invitations`, `customer_profiles`, `consents`.
- **API groups if relevant:** Registration/verification, invitations, current profile/memberships.
- **Security requirements:** Tenant-bound invitation; enumeration resistance; verified-email checkpoint; least data collection.
- **Tests required:** Duplicate/normalized identity, expired/reused/wrong-tenant invitation, membership suspension, consent versioning, cross-tenant denial.
- **Acceptance criteria:** One user can have different tenant roles without authority merging, and customer owns only their tenant records.
- **Do not do:** Put roles directly on the user or accept tenant ID solely from client input.
- **Notes for Codex:** Legal/Privacy must settle identity/consent assumptions first.

## AUTH-002 — Implementable opaque-session and password-security design

- **Goal:** Specify the future password and server-session lifecycle in exact contracts.
- **Why it matters:** Supports immediate revocation and keeps browser JavaScript away from bearer secrets.
- **Scope:** Argon2id parameters review, high-entropy opaque token/hash, Secure/HttpOnly/SameSite cookie, rotation, expiry, logout/revocation, CSRF/origin checks, recovery.
- **Non-scope:** JWT browser sessions, mobile/API tokens, passkeys, or implementation now.
- **Expected files or modules:** Future identity credential/session application ports, persistence, cookie/CSRF interface adapters.
- **Data/entities touched:** `password_credentials`, `sessions`, `verification_tokens`, `recovery_requests`.
- **API groups if relevant:** Login/logout, password change/reset, sessions list/revoke.
- **Security requirements:** Never log/store recoverable password/token; account-enumeration/rate limits; rotate after privilege/recovery.
- **Tests required:** Fixation, stolen old token, idle/absolute expiry, revocation, CSRF/CORS, reset reuse/expiry, password-hash verification.
- **Acceptance criteria:** Security-approved session/password parameter sheet and complete lifecycle/negative cases.
- **Do not do:** Use local storage/browser JWT, plain/reversible passwords, or stale permission claims as truth.
- **Notes for Codex:** Session store and time limits must be approved before execution.

## AUTH-003 — Define MFA and step-up foundation

- **Goal:** Plan TOTP enrollment/challenge/recovery and recent-auth requirements for privileged roles.
- **Why it matters:** Provider credentials, publication, roles, and money cannot depend on password alone.
- **Scope:** TOTP secret protection, single-use recovery codes, mandatory-role policy, assurance/freshness, privileged reset with independent approval.
- **Non-scope:** Passkeys/WebAuthn, SMS MFA, adaptive risk engine, or optional customer MFA UI.
- **Expected files or modules:** Future identity MFA domain/application/interfaces and approval hooks.
- **Data/entities touched:** `mfa_factors`, `mfa_challenges`, `recovery_codes`, session assurance.
- **API groups if relevant:** MFA enroll/verify/recover/reset; step-up challenge.
- **Security requirements:** Encrypted seed, hashed recovery code, no bypass via recovery/alternate endpoint, audit/notify reset.
- **Tests required:** Enrollment, replay, recovery reuse, lost device, stale assurance, mandatory-role denial, self-approved reset denial.
- **Acceptance criteria:** All privileged actions name required assurance and recovery is not weaker than enrollment.
- **Do not do:** Store/display seed after setup or treat MFA as authorization by itself.
- **Notes for Codex:** “Placeholder” means stable policy/interface, not a fake bypass.

## AUTH-004 — Model roles, permissions, and memberships

- **Goal:** Define fixed MVP roles and stable permission vocabulary.
- **Why it matters:** Catalog, provider, order, support, and financial access need different authority.
- **Scope:** Super Admin, Tenant Admin, Catalog Manager, Order Agent, Support Agent, Customer; permission groups; assignment/delegation; non-delegable keys.
- **Non-scope:** Arbitrary custom-role builder, ABAC policy language, SSO mapping, or commercial Agent as staff role.
- **Expected files or modules:** Future authorization domain/policy/contracts; membership-role repositories.
- **Data/entities touched:** `roles`, `permissions`, `role_permissions`, `membership_roles`.
- **API groups if relevant:** Role/permission read; allowed staff role assignment.
- **Security requirements:** Deny by default; actor cannot delegate absent/non-delegable permission; last-admin protection; field masking.
- **Tests required:** Role allow/deny matrix, privilege escalation, last admin, module disabled, commercial Agent separation.
- **Acceptance criteria:** Every MVP command/field maps to a permission and contextual checks.
- **Do not do:** Rely on hidden UI, create “admin=true,” or grant provider key/profit/balance access broadly.
- **Notes for Codex:** Permission changes must invalidate/refresh affected sessions/caches and audit.

## AUTH-005 — Enforce trusted tenant context and RBAC policy

- **Goal:** Plan one trusted resolver and server-side policy enforcement across HTTP, workers, repositories, jobs, and events.
- **Why it matters:** Most severe SaaS failure is cross-tenant or unauthorized action.
- **Scope:** Domain/membership/scoped credential resolution; actor/tenant/session/permission context; repository-required tenant; worker restoration; policy hooks.
- **Non-scope:** Routine impersonation, global unscoped repositories, or RLS as the only control.
- **Expected files or modules:** Future tenancy/context and authorization application/interfaces/repository conventions.
- **Data/entities touched:** All tenant-owned entities indirectly.
- **API groups if relevant:** Middleware/hooks for every protected group.
- **Security requirements:** Conflicting/missing signals fail closed; Super Admin tenant access explicit/audited; tenant in cache/object/job/event/idempotency.
- **Tests required:** Cross-tenant IDs/list/search/cursor/raw SQL/file/job/event/export/domain; revoked permission/session; worker context leakage.
- **Acceptance criteria:** No protected use case/repository can be called without explicit trusted context and policy decision.
- **Do not do:** Trust `x-tenant-*` from public clients or make missing tenant mean global.
- **Notes for Codex:** RLS is planned defense in depth after pooled-context validation.
