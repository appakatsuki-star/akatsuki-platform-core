# Authentication and Session Security Checklist

## Identity and credential model

- [ ] Decide whether one platform identity spans tenants or customer identities are isolated; memberships/permissions remain tenant-scoped either way.
- [ ] Normalize identifiers consistently and enforce verified ownership without leaking account existence.
- [ ] Password hashing uses Argon2id with versioned, production-benchmarked memory/time/parallelism parameters and unique salt.
- [ ] Any pepper is separate in the secret manager and rotation/recovery is documented.
- [ ] Enforce an approved minimum password policy and breached-password screening without arbitrary complexity rules that weaken usability.
- [ ] Passwords, hashes, reset tokens, MFA/recovery secrets, and authentication payloads never enter logs, analytics, support, or AI.
- [ ] Staff onboarding is invitation-only; invitation is tenant/role/email/purpose bound, short-lived, single-use, and auditable.

## Session creation and cookies

- [ ] Generate at least 128 bits of cryptographically secure opaque entropy; store only token hash server-side.
- [ ] Cookie uses `Secure`, `HttpOnly`, suitable `SameSite`, narrow Domain/Path, and no sensitive values in URL/local storage.
- [ ] Rotate session token after login, MFA completion, privilege/membership change, recovery, and impersonation boundary.
- [ ] Prevent fixation; the anonymous/pre-auth session cannot become privileged without rotation.
- [ ] Define idle and absolute expiry by actor/risk; enforce server-side rather than trusting cookie expiry.
- [ ] Limit concurrent/admin sessions as approved; provide user/admin session visibility and immediate revocation.
- [ ] Revocation occurs on password reset, account/membership suspension, detected theft, privileged recovery, and required security changes.
- [ ] Session store choice/durability/fail-closed behavior is approved; authorization is not frozen in stale session claims.

## CSRF, CORS, and browser protections

- [ ] Every state-changing cookie-authenticated route has CSRF protection plus Origin/Referer validation where applicable.
- [ ] CORS is an explicit origin allowlist with credentials only where required; wildcard with credentials is prohibited.
- [ ] CSP, HSTS after readiness, frame protection, content-type options, referrer policy, and safe cache headers are set/tested per surface.
- [ ] Sensitive responses and authenticated HTML are not cached publicly.
- [ ] Custom tenant domains cannot broaden cookies or trusted origins across tenants.

## MFA and step-up

- [ ] MFA is mandatory for Super Admin, Tenant Admin, finance approver, secret/provider manager, and other sensitive roles.
- [ ] Approved launch method (TOTP and single-use recovery codes at minimum, or stronger) and enrollment verification are defined.
- [ ] MFA secrets are encrypted; recovery codes are one-way hashed and displayed once.
- [ ] Step-up uses recent authentication for permissions/credentials, refunds/adjustments, exports, impersonation, account recovery, and other high-risk actions.
- [ ] Define assurance freshness; action revalidates permission/state after MFA rather than treating MFA as authorization.
- [ ] MFA reset/recovery is at least as strong as enrollment and privileged reset requires independent approval/notification.

## Registration, verification, and recovery

- [ ] Customer self-registration is tenant-configurable only within platform policy; tenant context is trusted before membership creation.
- [ ] Email/phone verification, invitation, reset, and recovery tokens are purpose/identity/tenant bound, random, short-lived, single-use, and safely stored.
- [ ] Responses/timing avoid account enumeration; rate limits span identifier, IP/device signals, and tenant.
- [ ] Password reset revokes appropriate sessions and sends notification to an existing trusted channel.
- [ ] Email/phone change requires current authentication/step-up, verifies new channel, notifies old channel, and respects transfer/payment review holds.
- [ ] Recovery has anti-social-engineering procedures; support cannot disclose secrets or bypass controls informally.
- [ ] Terms/consents record exact version, tenant, actor, timestamp, and lawful context.

## Authorization integration

- [ ] One trusted resolver establishes user, membership, tenant, session assurance, effective permissions, correlation ID, and origin before use cases.
- [ ] Conflicting domain/membership/credential tenant signals fail closed.
- [ ] Every request rechecks active user/membership, module/tenant state, and contextual permission server-side.
- [ ] Super Admin tenant access is explicit and audited; impersonation, if allowed, displays actor/subject and blocks prohibited actions.
- [ ] Service/API credentials use a separate scoped model; browser cookies are not repurposed as partner/mobile tokens.

## Abuse controls and observability

- [ ] Rate-limit login, registration, verification resend, recovery, invitation accept, MFA, token refresh/rotation, and session listing/revocation.
- [ ] Detect credential stuffing, password spraying, impossible/high-risk changes, repeated MFA failure, session reuse after revocation, and admin recovery.
- [ ] Audit successful/failed privileged auth events with safe metadata; never record secret values.
- [ ] Alert on break-glass, MFA reset for privileged actor, mass session revocation, repeated lockout, and policy/config changes.
- [ ] Clock/time-zone behavior and token expiry are tested around drift and replay windows.

## Mandatory negative tests

- [ ] Stolen/old token after rotation or revocation.
- [ ] CSRF from untrusted origin and CORS preflight abuse.
- [ ] Cross-tenant domain/session/membership mismatch.
- [ ] Invitation/reset/recovery token reuse, expiry, wrong identity, and wrong purpose.
- [ ] Permission revoked while session remains active.
- [ ] MFA bypass via recovery, role change, alternate endpoint, or stale assurance.
- [ ] Enumeration and rate-limit evasion across case/normalization variants.
- [ ] Last Tenant Admin removal and linked-account maker-checker bypass.

## Phase 1 blocking decisions

- Session store, idle/absolute lifetimes, concurrent limits, and cookie/domain design.
- Password algorithm parameters and breached-password service/policy.
- MFA methods, mandatory roles, step-up actions/freshness, and recovery policy.
- Global identity versus per-tenant customer identity.
- Super Admin support/break-glass/impersonation policy.
