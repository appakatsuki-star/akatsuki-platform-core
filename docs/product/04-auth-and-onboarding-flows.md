# Authentication and Onboarding Flows

## Purpose

Define secure sign-in, session, recovery, invitation, and onboarding journeys for platform operators, tenant staff, and customers without conflating authentication with authorization.

## Main actors

- Super Admin
- Tenant Admin
- Agent
- Customer
- Identity service/system principal
- Email/SMS notification provider

## Core flows

### Staff invitation and onboarding

1. An authorized admin invites an email address to a specific tenant and role.
2. The recipient verifies control of the address, accepts terms, creates or links an identity, and enrolls required MFA.
3. The system activates the membership and records inviter, role, and acceptance evidence.
4. First-login guidance collects only role-relevant setup information.

### Customer registration

1. The customer begins on a resolved tenant domain.
2. The system verifies the chosen identifier and binds the membership/profile to that tenant.
3. The customer accepts tenant/platform terms and privacy notices, then receives a session.
4. Additional identity verification is requested only when a module or threshold requires it.

### Sign-in and session

1. Credentials are verified without revealing whether an account exists.
2. Risk/rate-limit checks and MFA or step-up checks run as required.
3. A server-side opaque session is issued with tenant and assurance context.
4. Logout, password change, membership suspension, or credential compromise revokes affected sessions.

### Recovery

1. A short-lived, single-use recovery challenge is delivered through a verified channel.
2. Successful recovery rotates relevant credentials/tokens and alerts the user.
3. Administrative recovery requires stronger evidence and an audit trail.

## Required entities

- User, LoginIdentifier, PasswordCredential, Session
- MFAFactor, MFAChallenge, RecoveryCode, RecoveryRequest
- TenantMembership, CustomerProfile, Invitation
- EmailVerification, PhoneVerification, ConsentRecord, TermsVersion
- LoginAttempt, RiskSignal, RateLimitRecord
- TrustedDevice (later), AuditRecord

## Business rules

- Tenant context must be resolved from a trusted domain, membership selection, or scoped credential; arbitrary client tenant headers are insufficient.
- Browser authentication uses server-side opaque sessions with secure, HTTP-only, same-site cookies and CSRF protection.
- Super Admin and Tenant Admin require MFA; sensitive Agent roles and finance approvers also require MFA.
- Passwords, recovery tokens, MFA secrets, and API credentials are never logged or stored in reversible plain text.
- Verification, invitation, and recovery tokens are short-lived, single-use, purpose-bound, and stored safely.
- Authentication responses and recovery flows avoid account enumeration.
- Authorization is reevaluated server-side per request; a valid session does not guarantee a permitted action.
- Session records include creation, expiry, last activity, assurance level, and revocation state.
- Customer verification level is explicit and distinct from account-active status.
- Terms and consent acceptance stores the exact version, time, tenant, and user.

## Edge cases

- An invited email already owns a customer or staff identity.
- The user belongs to multiple tenants and signs in through a custom domain.
- A custom domain changes while its cookies/sessions remain active.
- MFA device loss, reused recovery token, or compromised email account.
- Password reset races with active sessions or an invitation.
- A customer changes email while an order or transfer review is pending.
- Notification delivery fails during verification or recovery.

## MVP scope

- Email/password registration and sign-in, email verification, password reset, and opaque server sessions.
- Invitation-only staff onboarding; customer self-registration can be enabled or disabled per tenant.
- TOTP MFA plus recovery codes for Super Admins and Tenant Admins.
- Session listing/revocation, basic rate limiting, lockout safeguards, consent/version records, and security audit events.
- One explicit tenant context per session/request.

## Later scope

- Passkeys, social login, enterprise SSO, SCIM, phone-first authentication, trusted devices, and adaptive risk scoring.
- Progressive customer KYC, reusable verified identity, parental/guardian flows where required, and delegated office users.
- Passwordless authentication and advanced suspicious-session detection.

## Open questions

- Is customer email verification mandatory before browsing, depositing, ordering, or only before sensitive actions?
- Can one global customer identity span tenants, and what consent/privacy experience follows?
- Which MFA methods and recovery evidence are acceptable per actor?
- What session idle/absolute lifetimes and concurrent-session limits apply?
- Which KYC levels and thresholds are required for deposits, refunds, or verified-office transfers?
- Are tenant-specific terms sufficient, or must platform terms always be accepted separately?
