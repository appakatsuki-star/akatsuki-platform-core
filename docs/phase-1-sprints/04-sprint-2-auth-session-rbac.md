# Sprint 2 — Authentication, Sessions, and RBAC

## Tickets

- `AUTH-001` — Users, memberships, invitations, and consent.
- `AUTH-002` — Opaque sessions and password security.
- `AUTH-003` — MFA and step-up foundation.
- `AUTH-004` — Roles and permissions.
- `AUTH-005` — Trusted tenant context and RBAC enforcement.

## Goal

Make identity, sessions, tenant context, and permissions testable before any Super Admin or Tenant Admin business feature.

## Planned work

- Model users, verified identifiers, tenant memberships, invitations, customer profiles, and consent versions.
- Implement approved Argon2id password and hashed opaque Secure/HttpOnly/SameSite session flow.
- Implement session rotation/expiry/revocation, CSRF/origin controls, recovery, and abuse limits.
- Establish MFA policy/interface and approved TOTP/recovery/step-up behavior for privileged roles.
- Model fixed roles/permissions and assignment/delegation boundaries.
- Resolve trusted tenant/actor/session/assurance/permissions context for HTTP and workers.
- Require tenant scope and policy checks in all protected use-case/repository contracts.

## Entry conditions

- Sprint 1 accepted.
- Security-approved session/MFA/recovery parameters.
- Legal-approved identity/consent model.
- Database role/RLS approach and tenant context design accepted.

## Required tests

- Registration/verification/invitation/login/logout/recovery/session rotation/revocation.
- MFA enrollment/challenge/recovery/replay/stale assurance/reset abuse.
- CSRF/CORS/cookie/account-enumeration/rate-limit behavior.
- Fixed-role allow/deny, delegation, last-admin, module/state/ownership conditions.
- Tenant A/B denial across IDs/list/search/cursor/repository/raw SQL/jobs/events/context mismatch.

## Acceptance criteria

- A session is revocable and contains no authoritative stale permission copy.
- Missing/conflicting tenant context fails closed.
- Every protected call requires trusted context and server policy.
- Permission and cross-tenant negative tests pass before Sprint 3.

## Explicit non-scope

- Social login/SSO/passkeys/mobile tokens/custom role builder/impersonation.
- Tenant creation UI, provider, catalog, ledger, order, or storefront product features.

## Stop conditions

- Any tenant-isolation or RBAC bypass.
- Session token/password/MFA material leak.
- Recovery bypasses MFA or privilege policy.
- RLS/pooling context leaks between requests/jobs.
- UI hiding is the only protection for any action.
